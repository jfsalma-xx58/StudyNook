import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

function RoomDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [room, setRoom] = useState(null)
  const [loading, setLoading] = useState(true)
  const [bookingLoading, setBookingLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [error, setError] = useState('')

  const [showBookingForm, setShowBookingForm] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const [bookingData, setBookingData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    specialNote: '',
  })

  useEffect(() => {
    document.title = 'StudyNook | Room Details'
  }, [])

  useEffect(() => {
    async function fetchRoom() {
      try {
        setLoading(true)

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/rooms/${id}`
        )

        setRoom(response.data.room)
      } catch (error) {
        console.error('Failed to load room:', error)

        setError(
          error.response?.data?.message ||
            'Failed to load this room.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchRoom()
  }, [id])

  function handleBookingChange(event) {
    const { name, value } = event.target

    setBookingData((previous) => {
      if (name === 'startTime') {
        return {
          ...previous,
          startTime: value,
          endTime: '',
        }
      }

      return {
        ...previous,
        [name]: value,
      }
    })
  }

  function handleBookNow() {
    if (!user) {
      toast.error('Please log in to book a room.')
      navigate('/login')
      return
    }

    setShowBookingForm(true)
  }

  async function handleBookingSubmit(event) {
    event.preventDefault()

    if (!bookingData.date) {
      toast.error('Please select a date.')
      return
    }

    if (!bookingData.startTime || !bookingData.endTime) {
      toast.error('Please select a start and end time.')
      return
    }

    if (bookingData.endTime <= bookingData.startTime) {
      toast.error('End time must be after start time.')
      return
    }

    try {
      setBookingLoading(true)

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/bookings`,
        {
          roomId: id,
          date: bookingData.date,
          startTime: bookingData.startTime,
          endTime: bookingData.endTime,
          specialNote: bookingData.specialNote,
        },
        {
          withCredentials: true,
        }
      )

      toast.success(response.data.message)

      setBookingData({
        date: '',
        startTime: '',
        endTime: '',
        specialNote: '',
      })

      setShowBookingForm(false)

      setRoom((previous) => ({
        ...previous,
        bookingCount: (previous.bookingCount || 0) + 1,
      }))
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'Failed to create booking. Please try again.'

      toast.error(message)
    } finally {
      setBookingLoading(false)
    }
  }

  function calculateTotalCost() {
    if (!bookingData.startTime || !bookingData.endTime) {
      return 0
    }

    const start = Number(
      bookingData.startTime.split(':')[0]
    )

    const end = Number(
      bookingData.endTime.split(':')[0]
    )

    if (end <= start) {
      return 0
    }

    return (end - start) * room.hourlyRate
  }

  async function handleDeleteRoom() {
    try {
      setDeleteLoading(true)

      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/rooms/${id}`,
        {
          withCredentials: true,
        }
      )

      toast.success(response.data.message)

      setShowDeleteModal(false)

      navigate('/my-listings')
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'Failed to delete room. Please try again.'

      toast.error(message)
    } finally {
      setDeleteLoading(false)
    }
  }

  const isOwner =
    user &&
    room &&
    room.ownerId &&
    room.ownerId.toString() === user.id.toString()

  const startHour = bookingData.startTime
    ? Number(bookingData.startTime.split(':')[0])
    : null

  const availableEndHours =
    startHour !== null
      ? Array.from(
          { length: 20 - startHour },
          (_, index) => startHour + index + 1
        )
      : []

  const today = new Date().toISOString().split('T')[0]

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f7f4ef] text-[#172033]">
        <section className="relative overflow-hidden bg-[#172033]">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
            <div className="h-4 w-32 animate-pulse rounded-full bg-white/10" />

            <div className="mt-8 h-12 w-2/3 animate-pulse rounded-xl bg-white/10" />

            <div className="mt-4 h-5 w-1/2 animate-pulse rounded-full bg-white/10" />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="h-[420px] animate-pulse rounded-[2rem] bg-[#e8e2da] sm:h-[560px]" />

            <div className="space-y-5">
              <div className="h-5 w-28 animate-pulse rounded-full bg-[#e8e2da]" />
              <div className="h-12 w-3/4 animate-pulse rounded-xl bg-[#e8e2da]" />
              <div className="h-24 w-full animate-pulse rounded-xl bg-[#e8e2da]" />

              <div className="grid grid-cols-2 gap-4">
                <div className="h-24 animate-pulse rounded-2xl bg-white" />
                <div className="h-24 animate-pulse rounded-2xl bg-white" />
                <div className="h-24 animate-pulse rounded-2xl bg-white" />
                <div className="h-24 animate-pulse rounded-2xl bg-white" />
              </div>
            </div>
          </div>
        </section>
      </main>
    )
  }

  if (error || !room) {
    return (
      <main className="min-h-screen bg-[#f7f4ef] px-6 py-20 text-[#172033]">
        <div className="mx-auto max-w-2xl overflow-hidden rounded-[2.5rem] border border-[#e4ded6] bg-white p-10 text-center shadow-[0_20px_55px_rgba(23,32,51,0.08)] sm:p-14">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-[#f7eee7] text-3xl text-[#a06f4e]">
            ?
          </div>

          <div className="mt-7 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#c8875b]" />

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a06f4e]">
              StudyNook
            </p>

            <span className="h-px w-8 bg-[#c8875b]" />
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#172033] sm:text-4xl">
            Room not found
          </h1>

          <p className="mx-auto mt-4 max-w-md leading-7 text-[#697385]">
            {error ||
              'We could not find the room you were looking for.'}
          </p>

          <Link
            to="/rooms"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#c8875b] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-[#b6734d] hover:shadow-lg"
          >
            <span>←</span>
            Back to Rooms
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f7f4ef] text-[#172033]">

      {/* TOP HERO */}
      <section className="relative overflow-hidden bg-[#172033]">
        <div className="pointer-events-none absolute -right-40 -top-48 h-[600px] w-[600px] rounded-full border border-[#e1a56f]/15" />

        <div className="pointer-events-none absolute -bottom-40 left-20 h-80 w-80 rounded-full bg-[#78917c]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 pb-14 pt-10 lg:px-8 lg:pb-16 lg:pt-12">

          <Link
            to="/rooms"
            className="group inline-flex items-center gap-2 text-sm font-medium text-white/60 transition duration-200 hover:text-[#e1a56f]"
          >
            <span className="transition-transform duration-200 group-hover:-translate-x-1">
              ←
            </span>

            Back to Rooms
          </Link>

          <div className="mt-10 max-w-4xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#e1a56f]" />

              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#e1a56f]">
                StudyNook room
              </p>
            </div>

            <h1 className="mt-5 text-4xl font-semibold leading-[0.98] tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
              {room.name}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/60 sm:text-lg">
              A comfortable space designed to help you settle in,
              stay focused, and make the most of your study time.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-14">

          {/* LEFT */}
          <div>

            {/* IMAGE */}
            <div className="group relative overflow-hidden rounded-[2.5rem] border border-[#e4ded6] bg-white shadow-[0_20px_55px_rgba(23,32,51,0.10)]">

              <img
                src={room.image}
                alt={room.name}
                className="h-[400px] w-full object-cover transition duration-700 group-hover:scale-[1.025] sm:h-[560px]"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#101722]/50 via-transparent to-transparent" />

              {/* IMAGE LABEL */}
              <div className="absolute left-5 top-5 rounded-full border border-white/60 bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#344054] shadow-sm backdrop-blur">
                Study room
              </div>

              {/* PRICE */}
              <div className="absolute bottom-5 right-5 rounded-2xl bg-white/95 px-5 py-4 shadow-xl backdrop-blur">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#a06f4e]">
                  From
                </p>

                <p className="mt-1 text-xl font-bold tracking-tight text-[#172033]">
                  ${room.hourlyRate}

                  <span className="ml-1 text-xs font-normal text-[#697385]">
                    / hour
                  </span>
                </p>
              </div>
            </div>

            {/* TRUST ROW */}
            <div className="mt-5 grid gap-3 sm:grid-cols-2">

              <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#e8eee5] text-sm text-[#58705b]">
                  ✓
                </span>

                <div>
                  <p className="text-sm font-semibold text-[#293346]">
                    Bookable by the hour
                  </p>

                  <p className="mt-0.5 text-xs text-[#7d8796]">
                    Flexible study sessions
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#f7eee7] text-sm text-[#a06f4e]">
                  ✓
                </span>

                <div>
                  <p className="text-sm font-semibold text-[#293346]">
                    Study-ready space
                  </p>

                  <p className="mt-0.5 text-xs text-[#7d8796]">
                    Built for focused work
                  </p>
                </div>
              </div>

            </div>

            {/* DESCRIPTION */}
            <div className="mt-8 rounded-[2rem] border border-[#e4ded6] bg-white p-7 shadow-[0_10px_35px_rgba(23,32,51,0.05)] sm:p-8">

              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#c8875b]" />

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a06f4e]">
                  About this space
                </p>
              </div>

              <p className="mt-5 text-base leading-8 text-[#697385]">
                {room.description}
              </p>
            </div>

          </div>

          {/* RIGHT */}
          <div>

            {/* ROOM OVERVIEW */}
            <div className="rounded-[2rem] border border-[#e4ded6] bg-white p-6 shadow-[0_15px_45px_rgba(23,32,51,0.07)] sm:p-8">

              <div className="flex items-end justify-between gap-4 border-b border-[#eee8e1] pb-6">

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a06f4e]">
                    Room overview
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-[#172033]">
                    Everything you need
                  </h2>
                </div>

                <div className="hidden rounded-2xl bg-[#e8eee5] px-3 py-2 text-xs font-bold text-[#58705b] sm:block">
                  Available
                </div>
              </div>

              {/* STATS */}
              <div className="mt-6 grid grid-cols-2 gap-3">

                <div className="rounded-2xl bg-[#faf8f5] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#a06f4e]">
                    Floor
                  </p>

                  <p className="mt-2 text-base font-semibold text-[#293346]">
                    {room.floor}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#faf8f5] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#a06f4e]">
                    Capacity
                  </p>

                  <p className="mt-2 text-base font-semibold text-[#293346]">
                    {room.capacity} people
                  </p>
                </div>

                <div className="rounded-2xl bg-[#faf8f5] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#a06f4e]">
                    Bookings
                  </p>

                  <p className="mt-2 text-base font-semibold text-[#293346]">
                    {room.bookingCount || 0}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#faf8f5] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#a06f4e]">
                    Rate
                  </p>

                  <p className="mt-2 text-base font-semibold text-[#293346]">
                    ${room.hourlyRate}/hr
                  </p>
                </div>

              </div>

              {/* AMENITIES */}
              <div className="mt-7 border-t border-[#eee8e1] pt-7">

                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold tracking-tight text-[#172033]">
                    Amenities
                  </h3>

                  <span className="text-xs font-medium text-[#98a0aa]">
                    Included
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">

                  {room.amenities?.length > 0 ? (
                    room.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="rounded-full bg-[#e8eee5] px-3.5 py-2 text-xs font-semibold text-[#5c705f]"
                      >
                        {amenity}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-[#697385]">
                      No amenities listed.
                    </p>
                  )}

                </div>
              </div>

            </div>

            {/* OWNER CONTROLS */}
            {isOwner && !showBookingForm && (
              <div className="mt-6 rounded-[2rem] border border-[#e4ded6] bg-[#172033] p-6 shadow-[0_15px_45px_rgba(23,32,51,0.12)] sm:p-7">

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e1a56f]">
                    Owner controls
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-white">
                    Manage this room
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-white/55">
                    Update your listing or remove it from StudyNook.
                  </p>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">

                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/edit-room/${room._id}`)
                    }
                    className="rounded-xl bg-[#e1a56f] px-5 py-3.5 font-semibold text-[#172033] transition duration-200 hover:-translate-y-0.5 hover:bg-[#efb982] hover:shadow-lg"
                  >
                    Edit Room
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowDeleteModal(true)}
                    className="rounded-xl border border-white/15 bg-white/10 px-5 py-3.5 font-semibold text-white/80 transition duration-200 hover:border-[#d98b8b]/50 hover:bg-[#b45353]/20 hover:text-white"
                  >
                    Delete Room
                  </button>

                </div>
              </div>
            )}

            {/* BOOK BUTTON */}
            {!isOwner && !showBookingForm && (
              <div className="mt-6 rounded-[2rem] bg-[#d7e1d5] p-6 sm:p-7">

                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#58705b]">
                  Ready to focus?
                </p>

                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-[#172033]">
                  Reserve your study time.
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#596b5c]">
                  Pick your date and preferred hours. Your time is
                  only confirmed if the slot is still available.
                </p>

                <button
                  type="button"
                  onClick={handleBookNow}
                  className="group mt-6 flex w-full items-center justify-between rounded-2xl bg-[#c8875b] px-5 py-4 text-sm font-semibold text-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-[#b6734d] hover:shadow-lg"
                >
                  <span>
                    {user ? 'Book This Room' : 'Login to Book'}
                  </span>

                  <span className="text-lg transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </button>

                <p className="mt-3 text-center text-xs text-[#687b6b]">
                  Hourly booking • Study-ready space
                </p>

              </div>
            )}

            {/* BOOKING FORM */}
            {showBookingForm && (
              <div className="mt-6 overflow-hidden rounded-[2rem] border border-[#e4ded6] bg-white shadow-[0_20px_55px_rgba(23,32,51,0.10)]">

                {/* FORM HEADER */}
                <div className="bg-[#172033] px-6 py-7 sm:px-8">

                  <div className="flex items-start justify-between gap-4">

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e1a56f]">
                        Reservation
                      </p>

                      <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-white">
                        Book this room
                      </h2>

                      <p className="mt-2 text-sm leading-6 text-white/55">
                        Choose a date and study time that works for you.
                      </p>
                    </div>

                    <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-[#e1a56f] sm:flex">
                      ✓
                    </div>

                  </div>
                </div>

                <form
                  onSubmit={handleBookingSubmit}
                  className="space-y-5 p-6 sm:p-8"
                >

                  {/* DATE */}
                  <div>
                    <label
                      htmlFor="date"
                      className="mb-2.5 block text-xs font-bold uppercase tracking-[0.14em] text-[#7b7167]"
                    >
                      Date
                    </label>

                    <input
                      id="date"
                      name="date"
                      type="date"
                      value={bookingData.date}
                      onChange={handleBookingChange}
                      min={today}
                      required
                      className="w-full rounded-2xl border border-[#ddd5cb] bg-[#faf9f7] px-4 py-4 text-sm text-[#172033] outline-none transition focus:border-[#c8875b] focus:bg-white focus:ring-4 focus:ring-[#c8875b]/10"
                    />
                  </div>

                  {/* TIMES */}
                  <div className="grid gap-5 sm:grid-cols-2">

                    {/* START */}
                    <div>
                      <label
                        htmlFor="startTime"
                        className="mb-2.5 block text-xs font-bold uppercase tracking-[0.14em] text-[#7b7167]"
                      >
                        Start time
                      </label>

                      <select
                        id="startTime"
                        name="startTime"
                        value={bookingData.startTime}
                        onChange={handleBookingChange}
                        required
                        className="w-full rounded-2xl border border-[#ddd5cb] bg-[#faf9f7] px-4 py-4 text-sm text-[#172033] outline-none transition focus:border-[#c8875b] focus:bg-white focus:ring-4 focus:ring-[#c8875b]/10"
                      >
                        <option value="">
                          Select start time
                        </option>

                        {Array.from(
                          { length: 13 },
                          (_, index) => index + 8
                        ).map((hour) => {
                          const value = `${String(
                            hour
                          ).padStart(2, '0')}:00`

                          return (
                            <option
                              key={value}
                              value={value}
                            >
                              {value}
                            </option>
                          )
                        })}
                      </select>
                    </div>

                    {/* END */}
                    <div>
                      <label
                        htmlFor="endTime"
                        className="mb-2.5 block text-xs font-bold uppercase tracking-[0.14em] text-[#7b7167]"
                      >
                        End time
                      </label>

                      <select
                        id="endTime"
                        name="endTime"
                        value={bookingData.endTime}
                        onChange={handleBookingChange}
                        required
                        disabled={!bookingData.startTime}
                        className="w-full rounded-2xl border border-[#ddd5cb] bg-[#faf9f7] px-4 py-4 text-sm text-[#172033] outline-none transition focus:border-[#c8875b] focus:bg-white focus:ring-4 focus:ring-[#c8875b]/10 disabled:cursor-not-allowed disabled:bg-[#f1eee9] disabled:text-[#a3a8ad]"
                      >
                        <option value="">
                          {bookingData.startTime
                            ? 'Select end time'
                            : 'Select start time first'}
                        </option>

                        {availableEndHours.map((hour) => {
                          const value = `${String(
                            hour
                          ).padStart(2, '0')}:00`

                          return (
                            <option
                              key={value}
                              value={value}
                            >
                              {value}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                  </div>

                  {/* ESTIMATED TOTAL */}
                  <div className="rounded-2xl bg-[#f0ebe4] p-5">

                    <div className="flex items-center justify-between gap-4">

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#a06f4e]">
                          Estimated total
                        </p>

                        <p className="mt-1 text-sm text-[#697385]">
                          {bookingData.startTime &&
                          bookingData.endTime
                            ? `${bookingData.startTime} – ${bookingData.endTime}`
                            : 'Select your study time'}
                        </p>
                      </div>

                      <p className="text-2xl font-bold tracking-tight text-[#172033]">
                        ${calculateTotalCost()}
                      </p>

                    </div>
                  </div>

                  {/* SPECIAL NOTE */}
                  <div>
                    <label
                      htmlFor="specialNote"
                      className="mb-2.5 block text-xs font-bold uppercase tracking-[0.14em] text-[#7b7167]"
                    >
                      Special note
                      <span className="ml-1 font-normal normal-case tracking-normal text-[#98a0aa]">
                        (optional)
                      </span>
                    </label>

                    <textarea
                      id="specialNote"
                      name="specialNote"
                      value={bookingData.specialNote}
                      onChange={handleBookingChange}
                      placeholder="Anything you'd like the room owner to know?"
                      rows="4"
                      className="w-full resize-none rounded-2xl border border-[#ddd5cb] bg-[#faf9f7] px-4 py-4 text-sm leading-6 text-[#172033] outline-none transition placeholder:text-[#a3a8ad] focus:border-[#c8875b] focus:bg-white focus:ring-4 focus:ring-[#c8875b]/10"
                    />
                  </div>

                  {/* BUTTONS */}
                  <div className="flex flex-col gap-3 pt-1 sm:flex-row">

                    <button
                      type="submit"
                      disabled={bookingLoading}
                      className="flex-1 rounded-xl bg-[#c8875b] px-6 py-3.5 font-semibold text-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-[#b6734d] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                    >
                      {bookingLoading
                        ? 'Booking...'
                        : 'Confirm Booking'}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setShowBookingForm(false)
                      }
                      disabled={bookingLoading}
                      className="flex-1 rounded-xl border border-[#ddd5cb] bg-white px-6 py-3.5 font-semibold text-[#596273] transition duration-200 hover:bg-[#f7f4ef] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Cancel
                    </button>

                  </div>

                  <p className="pt-1 text-center text-xs leading-5 text-[#98a0aa]">
                    Your booking will be confirmed only if the selected
                    time is still available.
                  </p>

                </form>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* BOTTOM STATEMENT */}
      <section className="border-t border-[#e3dcd3] bg-[#f0ebe4]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a06f4e]">
                Make time for focus
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-[#172033] sm:text-3xl">
                Less searching. More studying.
              </h2>
            </div>

            <Link
              to="/rooms"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-[#c8875b] bg-transparent px-5 py-3 text-sm font-semibold text-[#a06f4e] transition duration-200 hover:bg-[#c8875b] hover:text-white"
            >
              Explore more rooms
              <span>→</span>
            </Link>

          </div>
        </div>
      </section>

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#172033]/55 px-6 backdrop-blur-sm">

          <div className="w-full max-w-md overflow-hidden rounded-[2rem] border border-[#e4ded6] bg-white shadow-[0_25px_80px_rgba(23,32,51,0.25)]">

            <div className="bg-[#172033] px-7 py-7 text-center sm:px-8">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#b45353]/15 text-lg font-bold text-[#e1a56f]">
                !
              </div>

              <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-[#e1a56f]">
                Owner action
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-white">
                Delete this room?
              </h2>

            </div>

            <div className="p-7 sm:p-8">

              <p className="text-center leading-7 text-[#697385]">
                Are you sure you want to delete{' '}
                <span className="font-semibold text-[#172033]">
                  {room.name}
                </span>
                ?
              </p>

              <p className="mt-2 text-center text-sm text-[#98a0aa]">
                This action cannot be undone.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">

                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  disabled={deleteLoading}
                  className="flex-1 rounded-xl border border-[#ddd5cb] bg-white px-5 py-3.5 font-semibold text-[#596273] transition duration-200 hover:bg-[#f7f4ef] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Keep Room
                </button>

                <button
                  type="button"
                  onClick={handleDeleteRoom}
                  disabled={deleteLoading}
                  className="flex-1 rounded-xl bg-[#b45353] px-5 py-3.5 font-semibold text-white transition duration-200 hover:bg-[#9f4646] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {deleteLoading
                    ? 'Deleting...'
                    : 'Delete Room'}
                </button>

              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  )
}

export default RoomDetails