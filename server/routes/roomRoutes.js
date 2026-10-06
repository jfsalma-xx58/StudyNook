const express = require('express')
const { ObjectId } = require('mongodb')
const authenticateUser = require('../middleware/authMiddleware')
const {
  getRoomsCollection,
  getBookingsCollection,
  getUsersCollection,
} = require('../models')

const router = express.Router()

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// Get all rooms with search and filters
router.get('/', async (req, res) => {
  try {
    const rooms = getRoomsCollection()

    const {
      search,
      amenity,
      floor,
      minRate,
      maxRate,
    } = req.query

    const filter = {}

    // Search by room name
    if (search && search.trim()) {
      filter.name = {
        $regex: escapeRegex(search.trim()),
        $options: 'i',
      }
    }

    // Filter by amenities
    if (amenity) {
      const amenities = Array.isArray(amenity)
        ? amenity
        : amenity.split(',')

      const cleanedAmenities = amenities
        .map((item) => item.trim())
        .filter(Boolean)

      if (cleanedAmenities.length > 0) {
        filter.amenities = {
          $all: cleanedAmenities,
        }
      }
    }

    // Filter by floor
    if (floor && floor.trim()) {
      filter.floor = floor.trim()
    }

    // Filter by minimum hourly rate
    if (minRate !== undefined && minRate !== '') {
      const minimumRate = Number(minRate)

      if (!Number.isNaN(minimumRate)) {
        filter.hourlyRate = {
          $gte: minimumRate,
        }
      }
    }

    // Filter by maximum hourly rate
    if (maxRate !== undefined && maxRate !== '') {
      const maximumRate = Number(maxRate)

      if (!Number.isNaN(maximumRate)) {
        filter.hourlyRate = {
          ...(filter.hourlyRate || {}),
          $lte: maximumRate,
        }
      }
    }

    const allRooms = await rooms
      .find(filter)
      .sort({
        createdAt: -1,
      })
      .toArray()

    res.json({
      rooms: allRooms,
    })
  } catch (error) {
    console.error('Getting rooms failed:', error)

    res.status(500).json({
      message: 'Failed to get rooms.',
    })
  }
})

// Get latest 6 rooms
router.get('/latest', async (req, res) => {
  try {
    const rooms = getRoomsCollection()

    const latestRooms = await rooms
      .find({})
      .sort({
        createdAt: -1,
      })
      .limit(6)
      .toArray()

    res.json({
      rooms: latestRooms,
    })
  } catch (error) {
    console.error('Getting latest rooms failed:', error)

    res.status(500).json({
      message: 'Failed to get latest rooms.',
    })
  }
})

// Get current user's rooms
router.get('/my-rooms', authenticateUser, async (req, res) => {
  try {
    if (!ObjectId.isValid(req.user.id)) {
      return res.status(401).json({
        message: 'Invalid user ID.',
      })
    }

    const rooms = getRoomsCollection()

    const myRooms = await rooms
      .find({
        ownerId: new ObjectId(req.user.id),
      })
      .sort({
        createdAt: -1,
      })
      .toArray()

    res.json({
      rooms: myRooms,
    })
  } catch (error) {
    console.error('Getting user rooms failed:', error)

    res.status(500).json({
      message: 'Failed to get your listings.',
    })
  }
})

// Get one room by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid room ID.',
      })
    }

    const rooms = getRoomsCollection()

    const room = await rooms.findOne({
      _id: new ObjectId(id),
    })

    if (!room) {
      return res.status(404).json({
        message: 'Room not found.',
      })
    }

    res.json({
      room,
    })
  } catch (error) {
    console.error('Getting room failed:', error)

    res.status(500).json({
      message: 'Failed to get room.',
    })
  }
})

// Create a new room
router.post('/', authenticateUser, async (req, res) => {
  try {
    const {
      name,
      description,
      image,
      floor,
      capacity,
      hourlyRate,
      amenities,
    } = req.body

    if (
      !name ||
      !description ||
      !image ||
      !floor ||
      capacity === undefined ||
      capacity === '' ||
      hourlyRate === undefined ||
      hourlyRate === ''
    ) {
      return res.status(400).json({
        message: 'Please fill in all required room fields.',
      })
    }

    const numericCapacity = Number(capacity)
    const numericHourlyRate = Number(hourlyRate)

    if (
      !Number.isFinite(numericCapacity) ||
      numericCapacity < 1
    ) {
      return res.status(400).json({
        message: 'Capacity must be a valid number greater than 0.',
      })
    }

    if (
      !Number.isFinite(numericHourlyRate) ||
      numericHourlyRate < 0
    ) {
      return res.status(400).json({
        message: 'Hourly rate must be a valid number.',
      })
    }

    if (!ObjectId.isValid(req.user.id)) {
      return res.status(401).json({
        message: 'Invalid user ID.',
      })
    }

    const cleanedName = name.trim()
    const cleanedDescription = description.trim()
    const cleanedImage = image.trim()
    const cleanedFloor = floor.trim()

    if (
      !cleanedName ||
      !cleanedDescription ||
      !cleanedImage ||
      !cleanedFloor
    ) {
      return res.status(400).json({
        message: 'Please fill in all required room fields.',
      })
    }

    const room = {
      name: cleanedName,
      description: cleanedDescription,
      image: cleanedImage,
      floor: cleanedFloor,
      capacity: numericCapacity,
      hourlyRate: numericHourlyRate,
      amenities: Array.isArray(amenities) ? amenities : [],
      ownerId: new ObjectId(req.user.id),
      bookingCount: 0,
      createdAt: new Date(),
    }

    const rooms = getRoomsCollection()

    const result = await rooms.insertOne(room)

    res.status(201).json({
      message: 'Room created successfully.',
      room: {
        id: result.insertedId,
        ...room,
      },
    })
  } catch (error) {
    console.error('Creating room failed:', error)

    res.status(500).json({
      message: 'Failed to create room.',
    })
  }
})

// Update a room
router.patch('/:id', authenticateUser, async (req, res) => {
  try {
    const { id } = req.params

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid room ID.',
      })
    }

    if (!ObjectId.isValid(req.user.id)) {
      return res.status(401).json({
        message: 'Invalid user ID.',
      })
    }

    const {
      name,
      description,
      image,
      floor,
      capacity,
      hourlyRate,
      amenities,
    } = req.body

    if (
      !name ||
      !description ||
      !image ||
      !floor ||
      capacity === undefined ||
      capacity === '' ||
      hourlyRate === undefined ||
      hourlyRate === ''
    ) {
      return res.status(400).json({
        message: 'Please fill in all required room fields.',
      })
    }

    const numericCapacity = Number(capacity)
    const numericHourlyRate = Number(hourlyRate)

    if (
      !Number.isFinite(numericCapacity) ||
      numericCapacity < 1
    ) {
      return res.status(400).json({
        message: 'Capacity must be a valid number greater than 0.',
      })
    }

    if (
      !Number.isFinite(numericHourlyRate) ||
      numericHourlyRate < 0
    ) {
      return res.status(400).json({
        message: 'Hourly rate must be a valid number.',
      })
    }

    const cleanedName = name.trim()
    const cleanedDescription = description.trim()
    const cleanedImage = image.trim()
    const cleanedFloor = floor.trim()

    if (
      !cleanedName ||
      !cleanedDescription ||
      !cleanedImage ||
      !cleanedFloor
    ) {
      return res.status(400).json({
        message: 'Please fill in all required room fields.',
      })
    }

    const rooms = getRoomsCollection()

    const room = await rooms.findOne({
      _id: new ObjectId(id),
    })

    if (!room) {
      return res.status(404).json({
        message: 'Room not found.',
      })
    }

    // Only the room owner can edit the room
    if (room.ownerId.toString() !== req.user.id) {
      return res.status(403).json({
        message: 'You can only edit your own rooms.',
      })
    }

    const updatedRoom = {
      name: cleanedName,
      description: cleanedDescription,
      image: cleanedImage,
      floor: cleanedFloor,
      capacity: numericCapacity,
      hourlyRate: numericHourlyRate,
      amenities: Array.isArray(amenities) ? amenities : [],
    }

    await rooms.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: updatedRoom,
      }
    )

    res.json({
      message: 'Room updated successfully.',
    })
  } catch (error) {
    console.error('Updating room failed:', error)

    res.status(500).json({
      message: 'Failed to update room.',
    })
  }
})

// Delete a room
router.delete('/:id', authenticateUser, async (req, res) => {
  try {
    const { id } = req.params

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid room ID.',
      })
    }

    if (!ObjectId.isValid(req.user.id)) {
      return res.status(401).json({
        message: 'Invalid user ID.',
      })
    }

    const rooms = getRoomsCollection()
    const bookings = getBookingsCollection()
    const users = getUsersCollection()

    const roomId = new ObjectId(id)

    const room = await rooms.findOne({
      _id: roomId,
    })

    if (!room) {
      return res.status(404).json({
        message: 'Room not found.',
      })
    }

    // Only the room owner can delete the room
    if (room.ownerId.toString() !== req.user.id) {
      return res.status(403).json({
        message: 'You can only delete your own rooms.',
      })
    }

    // Find all bookings associated with this room first
    const roomBookings = await bookings
      .find({
        roomId,
      })
      .project({
        _id: 1,
      })
      .toArray()

    const bookingIds = roomBookings.map(
      (booking) => booking._id
    )

    // Delete all bookings associated with this room
    await bookings.deleteMany({
      roomId,
    })

    // Remove deleted booking IDs from users' booking arrays
    if (bookingIds.length > 0) {
      await users.updateMany(
        {
          bookings: {
            $in: bookingIds,
          },
        },
        {
          $pull: {
            bookings: {
              $in: bookingIds,
            },
          },
        }
      )
    }

    // Finally delete the room
    await rooms.deleteOne({
      _id: roomId,
    })

    res.json({
      message:
        'Room and associated bookings deleted successfully.',
    })
  } catch (error) {
    console.error('Deleting room failed:', error)

    res.status(500).json({
      message: 'Failed to delete room.',
    })
  }
})

module.exports = router