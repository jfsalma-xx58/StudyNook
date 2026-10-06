const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')
const { getUsersCollection } = require('../models')

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
)

function normalizeEmail(email) {
  return email.trim().toLowerCase()
}

function createToken(userId) {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
}

function setAuthCookie(res, token) {
  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })
}

async function register(req, res) {
  try {
    const { name, email, photoURL, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Name, email, and password are required.',
      })
    }

    const trimmedName = name.trim()
    const normalizedEmail = normalizeEmail(email)

    if (!trimmedName) {
      return res.status(400).json({
        message: 'Name is required.',
      })
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: 'Password must be at least 6 characters.',
      })
    }

    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      return res.status(400).json({
        message:
          'Password must contain at least one uppercase and one lowercase letter.',
      })
    }

    const users = getUsersCollection()

    const existingUser = await users.findOne({
      email: normalizedEmail,
    })

    if (existingUser) {
      return res.status(409).json({
        message: 'An account with this email already exists.',
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = {
      name: trimmedName,
      email: normalizedEmail,
      photoURL: photoURL ? photoURL.trim() : '',
      password: hashedPassword,
      bookings: [],
      createdAt: new Date(),
    }

    await users.insertOne(newUser)

    res.status(201).json({
      message: 'Registration successful! Please login.',
    })
  } catch (error) {
    console.error('Registration failed:', error)

    res.status(500).json({
      message: 'Registration failed.',
    })
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required.',
      })
    }

    const normalizedEmail = normalizeEmail(email)

    const users = getUsersCollection()

    const user = await users.findOne({
      email: normalizedEmail,
    })

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password.',
      })
    }

    if (!user.password) {
      return res.status(400).json({
        message:
          'This account uses Google Sign-In. Please continue with Google.',
      })
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.password
    )

    if (!passwordMatches) {
      return res.status(401).json({
        message: 'Invalid email or password.',
      })
    }

    const token = createToken(user._id.toString())

    setAuthCookie(res, token)

    res.json({
      message: 'Login successful.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        photoURL: user.photoURL,
      },
    })
  } catch (error) {
    console.error('Login failed:', error)

    res.status(500).json({
      message: 'Login failed.',
    })
  }
}

async function googleLogin(req, res) {
  try {
    const { credential } = req.body

    if (!credential) {
      return res.status(400).json({
        message: 'Google credential is required.',
      })
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    })

    const payload = ticket.getPayload()

    if (!payload) {
      return res.status(401).json({
        message: 'Invalid Google credential.',
      })
    }

    const {
      sub: googleId,
      email,
      name,
      picture,
      email_verified: emailVerified,
    } = payload

    if (!email || !emailVerified) {
      return res.status(401).json({
        message: 'Google account email could not be verified.',
      })
    }

    const normalizedEmail = normalizeEmail(email)

    const users = getUsersCollection()

    let user = await users.findOne({
      email: normalizedEmail,
    })

    if (!user) {
      const newUser = {
        name: name?.trim() || 'StudyNook User',
        email: normalizedEmail,
        photoURL: picture || '',
        googleId,
        password: null,
        bookings: [],
        createdAt: new Date(),
      }

      const result = await users.insertOne(newUser)

      user = {
        _id: result.insertedId,
        ...newUser,
      }
    } else {
      await users.updateOne(
        {
          _id: user._id,
        },
        {
          $set: {
            googleId,
            photoURL: picture || user.photoURL || '',
          },
        }
      )

      user = {
        ...user,
        googleId,
        photoURL: picture || user.photoURL || '',
      }
    }

    const token = createToken(user._id.toString())

    setAuthCookie(res, token)

    res.json({
      message: 'Google login successful.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        photoURL: user.photoURL,
      },
    })
  } catch (error) {
    console.error('Google login failed:', error)

    res.status(401).json({
      message: 'Google login failed. Please try again.',
    })
  }
}

async function logout(req, res) {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
  })

  res.json({
    message: 'Logout successful.',
  })
}

module.exports = {
  register,
  login,
  googleLogin,
  logout,
}