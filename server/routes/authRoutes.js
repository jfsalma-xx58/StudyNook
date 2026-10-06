const express = require('express')
const { ObjectId } = require('mongodb')
const {
  register,
  login,
  googleLogin,
  logout,
} = require('../controllers/authController')
const authenticateUser = require('../middleware/authMiddleware')
const { getUsersCollection } = require('../models')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/google', googleLogin)

router.get('/me', authenticateUser, async (req, res) => {
  try {
    const users = getUsersCollection()

    const user = await users.findOne(
      { _id: new ObjectId(req.user.id) },
      {
        projection: {
          password: 0,
          bookings: 0,
        },
      }
    )

    if (!user) {
      return res.status(404).json({
        message: 'User not found.',
      })
    }

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        photoURL: user.photoURL,
      },
    })
  } catch (error) {
    console.error('Getting current user failed:', error)

    res.status(500).json({
      message: 'Failed to get current user.',
    })
  }
})

router.post('/logout', logout)

module.exports = router