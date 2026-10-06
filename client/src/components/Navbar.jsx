import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }

    return location.pathname.startsWith(path)
  }

  const navLinkClass = (path) =>
    `rounded-full px-3 py-2 text-sm font-semibold transition duration-200 sm:px-4 ${
      isActive(path)
        ? 'bg-[#dfe8dc] text-[#172033]'
        : 'text-[#4b5563] hover:bg-[#edf2ea] hover:text-[#172033]'
    }`

  const handleLogout = async () => {
    try {
      await logout()
      setMenuOpen(false)
      navigate('/')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#e5dfd7] bg-[#f7f4ef]/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="flex h-20 items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="group flex items-center gap-2"
          >
            <svg
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 shrink-0"
              aria-hidden="true"
            >
              <defs>
                <clipPath id="navbar-sparkle-left">
                  <rect x="0" y="0" width="16" height="32" />
                </clipPath>

                <clipPath id="navbar-sparkle-right">
                  <rect x="16" y="0" width="16" height="32" />
                </clipPath>
              </defs>

              {/* Chunky sparkle - terracotta half */}
              <path
                d="M16 1.5
                   L19.1 11.9
                   L30.5 16
                   L19.1 20.1
                   L16 30.5
                   L12.9 20.1
                   L1.5 16
                   L12.9 11.9
                   Z"
                fill="#C8875B"
                clipPath="url(#navbar-sparkle-left)"
              />

              {/* Chunky sparkle - navy half */}
              <path
                d="M16 1.5
                   L19.1 11.9
                   L30.5 16
                   L19.1 20.1
                   L16 30.5
                   L12.9 20.1
                   L1.5 16
                   L12.9 11.9
                   Z"
                fill="#172033"
                clipPath="url(#navbar-sparkle-right)"
              />
            </svg>

            <span className="text-xl font-black tracking-tight sm:text-2xl">
              <span className="text-[#C8875B]">Study</span>
              <span className="text-[#172033]">Nook</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            <Link
              to="/"
              className={navLinkClass('/')}
            >
              Home
            </Link>

            <Link
              to="/rooms"
              className={navLinkClass('/rooms')}
            >
              Rooms
            </Link>

            {user && (
              <>
                <Link
                  to="/add-room"
                  className={navLinkClass('/add-room')}
                >
                  Add Room
                </Link>

                <Link
                  to="/my-listings"
                  className={navLinkClass('/my-listings')}
                >
                  My Listings
                </Link>

                <Link
                  to="/my-bookings"
                  className={navLinkClass('/my-bookings')}
                >
                  My Bookings
                </Link>
              </>
            )}

            <Link
              to="/about"
              className={navLinkClass('/about')}
            >
              About
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 md:flex">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="rounded-full px-4 py-2 text-sm font-semibold text-[#4b5563] transition duration-200 hover:bg-[#edf2ea] hover:text-[#172033]"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="rounded-full bg-[#c8875b] px-5 py-2.5 text-sm font-bold text-white transition duration-200 hover:bg-[#b6734d]"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <div
                ref={menuRef}
                className="relative"
              >
                <button
                  type="button"
                  onClick={() => setMenuOpen((prev) => !prev)}
                  className={`flex items-center gap-2 rounded-full border px-2 py-1.5 transition duration-200 ${
                    menuOpen
                      ? 'border-[#78917c] bg-[#edf2ea]'
                      : 'border-[#e5dfd7] bg-white hover:border-[#78917c] hover:bg-[#edf2ea]'
                  }`}
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.name || 'Profile'}
                      className="h-9 w-9 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#78917c] text-sm font-bold text-white">
                      {user.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  )}

                  <span className="hidden max-w-32 truncate text-sm font-semibold text-[#172033] lg:block">
                    {user.name || 'Account'}
                  </span>

                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`mr-1 h-4 w-4 text-[#697385] transition-transform duration-200 ${
                      menuOpen ? 'rotate-180' : ''
                    }`}
                  >
                    <path
                      d="M5 7.5L10 12.5L15 7.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-[#e5dfd7] bg-white p-2 shadow-[0_20px_50px_rgba(23,32,51,0.12)]">
                    <div className="border-b border-[#eee9e3] px-3 py-3">
                      <p className="truncate text-sm font-bold text-[#172033]">
                        {user.name || 'Account'}
                      </p>

                      <p className="mt-1 truncate text-xs text-[#697385]">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      to="/my-listings"
                      onClick={() => setMenuOpen(false)}
                      className="mt-1 block rounded-xl px-3 py-2.5 text-sm font-semibold text-[#4b5563] transition duration-200 hover:bg-[#edf2ea] hover:text-[#172033]"
                    >
                      My Listings
                    </Link>

                    <Link
                      to="/my-bookings"
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-[#4b5563] transition duration-200 hover:bg-[#edf2ea] hover:text-[#172033]"
                    >
                      My Bookings
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="mt-1 w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-[#b4534a] transition duration-200 hover:bg-[#fdf0ee]"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e5dfd7] bg-white text-[#172033] transition duration-200 hover:bg-[#edf2ea] md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
              >
                <path
                  d="M6 6L18 18M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
              >
                <path
                  d="M4 7H20M4 12H20M4 17H20"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>

        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="border-t border-[#e5dfd7] py-4 md:hidden">
            <nav className="flex flex-col gap-1">

              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className={navLinkClass('/')}
              >
                Home
              </Link>

              <Link
                to="/rooms"
                onClick={() => setMenuOpen(false)}
                className={navLinkClass('/rooms')}
              >
                Rooms
              </Link>

              <Link
                to="/about"
                onClick={() => setMenuOpen(false)}
                className={navLinkClass('/about')}
              >
                About
              </Link>

              {user && (
                <>
                  <Link
                    to="/add-room"
                    onClick={() => setMenuOpen(false)}
                    className={navLinkClass('/add-room')}
                  >
                    Add Room
                  </Link>

                  <Link
                    to="/my-listings"
                    onClick={() => setMenuOpen(false)}
                    className={navLinkClass('/my-listings')}
                  >
                    My Listings
                  </Link>

                  <Link
                    to="/my-bookings"
                    onClick={() => setMenuOpen(false)}
                    className={navLinkClass('/my-bookings')}
                  >
                    My Bookings
                  </Link>
                </>
              )}

              <div className="mt-3 border-t border-[#e5dfd7] pt-3">
                {!user ? (
                  <div className="flex gap-2">
                    <Link
                      to="/login"
                      onClick={() => setMenuOpen(false)}
                      className="flex-1 rounded-full border border-[#ddd6cd] bg-white px-4 py-2.5 text-center text-sm font-semibold text-[#4b5563] transition duration-200 hover:bg-[#edf2ea] hover:text-[#172033]"
                    >
                      Login
                    </Link>

                    <Link
                      to="/register"
                      onClick={() => setMenuOpen(false)}
                      className="flex-1 rounded-full bg-[#c8875b] px-4 py-2.5 text-center text-sm font-bold text-white transition duration-200 hover:bg-[#b6734d]"
                    >
                      Get Started
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 rounded-2xl bg-white p-3">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.name || 'Profile'}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#78917c] text-sm font-bold text-white">
                          {user.name?.charAt(0)?.toUpperCase() || 'U'}
                        </span>
                      )}

                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-[#172033]">
                          {user.name || 'Account'}
                        </p>

                        <p className="truncate text-xs text-[#697385]">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full rounded-full border border-[#ead1cd] bg-white px-4 py-2.5 text-sm font-semibold text-[#b4534a] transition duration-200 hover:bg-[#fdf0ee]"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>

            </nav>
          </div>
        )}

      </div>
    </header>
  )
}

export default Navbar