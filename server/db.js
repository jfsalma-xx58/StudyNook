const { MongoClient } = require('mongodb')
const dotenv = require('dotenv')

dotenv.config()

const client = new MongoClient(process.env.MONGODB_URI)

let db

async function connectDB() {
  try {
    await client.connect()

    db = client.db('StudyNook')

    console.log('Database selected: StudyNook')

    await createIndexes()

    return db
  } catch (error) {
    console.error('Database connection failed:', error)
    throw error
  }
}

async function createIndexes() {
  try {
    const users = db.collection('users')
    const rooms = db.collection('rooms')
    const bookings = db.collection('bookings')

    // Prevent duplicate user accounts with the same email.
    await users.createIndex(
      { email: 1 },
      {
        unique: true,
        name: 'unique_user_email',
      }
    )

    // Helpful for My Listings and room browsing.
    await rooms.createIndex(
      { ownerId: 1 },
      {
        name: 'rooms_by_owner',
      }
    )

    await rooms.createIndex(
      { createdAt: -1 },
      {
        name: 'rooms_by_created_at',
      }
    )

    // Helpful for booking lookups and conflict checks.
    await bookings.createIndex(
      {
        roomId: 1,
        date: 1,
        status: 1,
      },
      {
        name: 'bookings_by_room_date_status',
      }
    )

    await bookings.createIndex(
      {
        userId: 1,
        date: 1,
      },
      {
        name: 'bookings_by_user_date',
      }
    )

    console.log('StudyNook database indexes are ready.')
  } catch (error) {
    console.error('Database index setup failed:', error)
    throw error
  }
}

function getDB() {
  if (!db) {
    throw new Error('Database is not connected.')
  }

  return db
}

function getClient() {
  return client
}

module.exports = {
  connectDB,
  getDB,
  getClient,
}