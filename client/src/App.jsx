import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Rooms from './pages/Rooms'
import RoomDetails from './pages/RoomDetails'
import Login from './pages/Login'
import Register from './pages/Register'
import About from './pages/About'
import AddRoom from './pages/AddRoom'
import MyBookings from './pages/MyBookings'
import MyListings from './pages/MyListings'
import EditRoom from './pages/EditRoom'
import NotFound from './pages/NotFound'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import ScrollToTop from './components/ScrollToTop'
import PageTitle from './components/PageTitle'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Navbar />

      <Routes>

        {/* Public routes */}

        <Route
          path="/"
          element={
            <>
              <PageTitle title="Home" />
              <Home />
            </>
          }
        />

        <Route
          path="/rooms"
          element={
            <>
              <PageTitle title="Rooms" />
              <Rooms />
            </>
          }
        />

        <Route
          path="/rooms/:id"
          element={
            <>
              <PageTitle title="Room Details" />
              <RoomDetails />
            </>
          }
        />

        <Route
          path="/login"
          element={
            <>
              <PageTitle title="Login" />
              <Login />
            </>
          }
        />

        <Route
          path="/register"
          element={
            <>
              <PageTitle title="Register" />
              <Register />
            </>
          }
        />

        <Route
          path="/about"
          element={
            <>
              <PageTitle title="About" />
              <About />
            </>
          }
        />

        {/* Protected routes */}

        <Route
          path="/add-room"
          element={
            <ProtectedRoute>
              <PageTitle title="Add Room" />
              <AddRoom />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <PageTitle title="My Bookings" />
              <MyBookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-listings"
          element={
            <ProtectedRoute>
              <PageTitle title="My Listings" />
              <MyListings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-room/:id"
          element={
            <ProtectedRoute>
              <PageTitle title="Edit Room" />
              <EditRoom />
            </ProtectedRoute>
          }
        />

        {/* Custom 404 */}

        <Route
          path="*"
          element={
            <>
              <PageTitle title="Page Not Found" />
              <NotFound />
            </>
          }
        />

      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App