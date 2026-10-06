const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const { connectDB } = require('./db')
const {
  getUsersCollection,
  getRoomsCollection,
  getBookingsCollection,
} = require('./models')
const authRoutes = require('./routes/authRoutes')
const bookingRoutes = require('./routes/bookingRoutes')
const roomRoutes = require('./routes/roomRoutes')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5175',
  process.env.CLIENT_URL,
].filter(Boolean)

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
)

app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('StudyNook server is running!')
})

app.get('/test', (req, res) => {
  res.send('Test route is working!')
})

app.get('/api/test-db', async (req, res) => {
  try {
    const users = await getUsersCollection().countDocuments()
    const rooms = await getRoomsCollection().countDocuments()
    const bookings = await getBookingsCollection().countDocuments()

    res.json({
      message: 'StudyNook database is working!',
      collections: {
        users,
        rooms,
        bookings,
      },
    })
  } catch (error) {
    console.error('Database test failed:', error)

    res.status(500).json({
      message: 'Database test failed.',
    })
  }
})

app.use('/api/auth', authRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/rooms', roomRoutes)

async function initializeDatabase() {
  try {
    await connectDB()
    console.log('StudyNook database connection ready.')
  } catch (error) {
    console.error('Failed to connect to StudyNook database:', error)
  }
}

initializeDatabase()

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`StudyNook server running on port ${PORT}`)
  })
}

module.exports = app