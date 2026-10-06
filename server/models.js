const { getDB } = require('./db')

function getUsersCollection() {
  return getDB().collection('users')
}

function getRoomsCollection() {
  return getDB().collection('rooms')
}

function getBookingsCollection() {
  return getDB().collection('bookings')
}

module.exports = {
  getUsersCollection,
  getRoomsCollection,
  getBookingsCollection,
}