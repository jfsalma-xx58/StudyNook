const express = require('express')
const { ObjectId } = require('mongodb')
const authenticateUser = require('../middleware/authMiddleware')
const {
  getBookingsCollection,
  getRoomsCollection,
  getUsersCollection,
} = require('../models')
const { getClient } = require('../db')

const router = express.Router()

// Get current user's bookings
router.get('/my-bookings', authenticateUser, async (req, res) => {
  try {
    if (!ObjectId.isValid(req.user.id)) {
      return res.status(401).json({
        message: 'Invalid user ID.',
      })
    }

    const bookings = getBookingsCollection()

    const userBookings = await bookings
      .find({
        userId: new ObjectId(req.user.id),
      })
      .sort({
        date: 1,
        startTime: 1,
      })
      .toArray()

    const rooms = getRoomsCollection()

    const bookingsWithRooms = await Promise.all(
      userBookings.map(async (booking) => {
        const room = await rooms.findOne({
          _id: booking.roomId,
        })

        return {
          ...booking,
          room: room
            ? {
                id: room._id,
                name: room.name,
                image: room.image,
                floor: room.floor,
                capacity: room.capacity,
                hourlyRate: room.hourlyRate,
              }
            : null,
        }
      })
    )

    res.json({
      bookings: bookingsWithRooms,
    })
  } catch (error) {
    console.error('Getting bookings failed:', error)

    res.status(500).json({
      message: 'Failed to get bookings.',
    })
  }
})

// Create a booking
router.post('/', authenticateUser, async (req, res) => {
  const session = getClient().startSession()

  try {
    const {
      roomId,
      date,
      startTime,
      endTime,
      specialNote,
    } = req.body

    // Required fields
    if (!roomId || !date || !startTime || !endTime) {
      return res.status(400).json({
        message:
          'Room, date, start time, and end time are required.',
      })
    }

    // Validate room ID
    if (!ObjectId.isValid(roomId)) {
      return res.status(400).json({
        message: 'Invalid room ID.',
      })
    }

    // Validate user ID
    if (!ObjectId.isValid(req.user.id)) {
      return res.status(401).json({
        message: 'Invalid user ID.',
      })
    }

    // Validate date format
    const datePattern = /^\d{4}-\d{2}-\d{2}$/

    if (!datePattern.test(date)) {
      return res.status(400).json({
        message: 'Invalid booking date.',
      })
    }

    // Convert date safely
    const bookingDate = new Date(`${date}T00:00:00`)

    if (Number.isNaN(bookingDate.getTime())) {
      return res.status(400).json({
        message: 'Invalid booking date.',
      })
    }

    // Get today's date in YYYY-MM-DD format
    const now = new Date()

    const todayYear = now.getFullYear()
    const todayMonth = String(now.getMonth() + 1).padStart(2, '0')
    const todayDay = String(now.getDate()).padStart(2, '0')

    const today = `${todayYear}-${todayMonth}-${todayDay}`

    // Booking date cannot be in the past
    if (date < today) {
      return res.status(400).json({
        message: 'You can only book today or a future date.',
      })
    }

    // Allowed booking hours: 08:00 through 20:00
    const timePattern = /^(0[8-9]|1[0-9]|20):00$/

    if (
      !timePattern.test(startTime) ||
      !timePattern.test(endTime)
    ) {
      return res.status(400).json({
        message:
          'Bookings must use hourly time slots between 08:00 and 20:00.',
      })
    }

    // End time must be after start time
    if (endTime <= startTime) {
      return res.status(400).json({
        message: 'End time must be after start time.',
      })
    }

    // Make sure the booking is at least one hour
    const startHour = Number(startTime.split(':')[0])
    const endHour = Number(endTime.split(':')[0])

    if (endHour - startHour < 1) {
      return res.status(400).json({
        message: 'A booking must be at least one hour.',
      })
    }

    // Special note should always be a string
    const cleanedSpecialNote =
      typeof specialNote === 'string'
        ? specialNote.trim()
        : ''

    const roomObjectId = new ObjectId(roomId)
    const userObjectId = new ObjectId(req.user.id)

    const rooms = getRoomsCollection()
    const bookings = getBookingsCollection()
    const users = getUsersCollection()

    let createdBooking

    await session.withTransaction(
      async () => {
        // Find room inside the transaction
        const room = await rooms.findOne(
          {
            _id: roomObjectId,
          },
          {
            session,
          }
        )

        if (!room) {
          const error = new Error('ROOM_NOT_FOUND')
          throw error
        }

        // Check for overlapping confirmed bookings
        const conflictingBooking = await bookings.findOne(
          {
            roomId: roomObjectId,
            date,
            status: 'confirmed',
            startTime: { $lt: endTime },
            endTime: { $gt: startTime },
          },
          {
            session,
          }
        )

        if (conflictingBooking) {
          const error = new Error('BOOKING_CONFLICT')
          throw error
        }

        // Calculate total cost
        const totalCost =
          (endHour - startHour) * room.hourlyRate

        const booking = {
          roomId: roomObjectId,
          userId: userObjectId,
          date,
          startTime,
          endTime,
          totalCost,
          specialNote: cleanedSpecialNote,
          status: 'confirmed',
          createdAt: new Date(),
        }

        // Save booking inside the transaction
        const result = await bookings.insertOne(
          booking,
          {
            session,
          }
        )

        // Add booking ID to user's bookings
        await users.updateOne(
          {
            _id: userObjectId,
          },
          {
            $push: {
              bookings: result.insertedId,
            },
          },
          {
            session,
          }
        )

        // Increase room booking count
        await rooms.updateOne(
          {
            _id: roomObjectId,
          },
          {
            $inc: {
              bookingCount: 1,
            },
          },
          {
            session,
          }
        )

        createdBooking = {
          id: result.insertedId,
          ...booking,
        }
      },
      {
        readConcern: {
          level: 'snapshot',
        },
        writeConcern: {
          w: 'majority',
        },
      }
    )

    res.status(201).json({
      message: 'Room booked successfully!',
      booking: createdBooking,
    })
  } catch (error) {
    if (error.message === 'ROOM_NOT_FOUND') {
      return res.status(404).json({
        message: 'Room not found.',
      })
    }

    if (error.message === 'BOOKING_CONFLICT') {
      return res.status(409).json({
        message:
          'This room is already booked for part of that time.',
      })
    }

    console.error('Creating booking failed:', error)

    res.status(500).json({
      message: 'Failed to create booking.',
    })
  } finally {
    await session.endSession()
  }
})

// Cancel a booking
router.patch('/:id/cancel', authenticateUser, async (req, res) => {
  const session = getClient().startSession()

  try {
    const { id } = req.params

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid booking ID.',
      })
    }

    if (!ObjectId.isValid(req.user.id)) {
      return res.status(401).json({
        message: 'Invalid user ID.',
      })
    }

    const bookingId = new ObjectId(id)
    const userId = new ObjectId(req.user.id)

    const bookings = getBookingsCollection()
    const users = getUsersCollection()
    const rooms = getRoomsCollection()

    let cancellationCompleted = false

    await session.withTransaction(
      async () => {
        const booking = await bookings.findOne(
          {
            _id: bookingId,
          },
          {
            session,
          }
        )

        if (!booking) {
          const error = new Error('BOOKING_NOT_FOUND')
          throw error
        }

        // Only the user who made the booking can cancel it
        if (booking.userId.toString() !== req.user.id) {
          const error = new Error('NOT_BOOKING_OWNER')
          throw error
        }

        // Only confirmed bookings can be cancelled
        if (booking.status !== 'confirmed') {
          const error = new Error('ALREADY_CANCELLED')
          throw error
        }

        // Update booking status
        await bookings.updateOne(
          {
            _id: bookingId,
          },
          {
            $set: {
              status: 'cancelled',
              cancelledAt: new Date(),
            },
          },
          {
            session,
          }
        )

        // Remove booking ID from user's bookings
        await users.updateOne(
          {
            _id: userId,
          },
          {
            $pull: {
              bookings: bookingId,
            },
          },
          {
            session,
          }
        )

        // Decrease room booking count
        await rooms.updateOne(
          {
            _id: booking.roomId,
            bookingCount: { $gt: 0 },
          },
          {
            $inc: {
              bookingCount: -1,
            },
          },
          {
            session,
          }
        )

        cancellationCompleted = true
      },
      {
        readConcern: {
          level: 'snapshot',
        },
        writeConcern: {
          w: 'majority',
        },
      }
    )

    if (cancellationCompleted) {
      return res.json({
        message: 'Booking cancelled successfully.',
      })
    }

    return res.status(500).json({
      message: 'Failed to cancel booking.',
    })
  } catch (error) {
    if (error.message === 'BOOKING_NOT_FOUND') {
      return res.status(404).json({
        message: 'Booking not found.',
      })
    }

    if (error.message === 'NOT_BOOKING_OWNER') {
      return res.status(403).json({
        message: 'You can only cancel your own bookings.',
      })
    }

    if (error.message === 'ALREADY_CANCELLED') {
      return res.status(400).json({
        message: 'This booking has already been cancelled.',
      })
    }

    console.error('Cancelling booking failed:', error)

    res.status(500).json({
      message: 'Failed to cancel booking.',
    })
  } finally {
    await session.endSession()
  }
})

module.exports = router