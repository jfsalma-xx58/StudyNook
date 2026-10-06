import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

function MyBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [cancellingId, setCancellingId] = useState(null)
  const [bookingToCancel, setBookingToCancel] = useState(null)

  useEffect(() => {
    document.title = 'StudyNook | My Bookings'

    async function fetchBookings() {
      try {
        setLoading(true)
        setError('')

        const response = await axios.get(
          'http://localhost:5000/api/bookings/my-bookings',
          {
            withCredentials: true,
          }
        )

        setBookings(response.data.bookings || [])
      } catch (error) {
        const message =
          error.response?.data?.message ||
          'Failed to load your bookings.'

        setError(message)
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [])

  function openCancelModal(booking) {
    setBookingToCancel(booking)
  }

  function closeCancelModal() {
    if (!cancellingId) {
      setBookingToCancel(null)
    }
  }

  async function handleCancelBooking() {
    if (!bookingToCancel) {
      return
    }

    const bookingId =
      bookingToCancel._id || bookingToCancel.id

    if (!bookingId) {
      toast.error('Unable to identify this booking.')
      return
    }

    try {
      setCancellingId(bookingId)

      await axios.patch(
        `http://localhost:5000/api/bookings/${bookingId}/cancel`,
        {},
        {
          withCredentials: true,
        }
      )

      setBookings((previousBookings) =>
        previousBookings.map((booking) => {
          const currentId = booking._id || booking.id

          if (currentId === bookingId) {
            return {
              ...booking,
              status: 'cancelled',
            }
          }

          return booking
        })
      )

      toast.success('Booking cancelled successfully.')
      setBookingToCancel(null)
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'Failed to cancel booking.'

      toast.error(message)
    } finally {
      setCancellingId(null)
    }
  }

  function formatDate(dateString) {
    if (!dateString) {
      return 'Date unavailable'
    }

    const date = new Date(`${dateString}T00:00:00`)

    if (Number.isNaN(date.getTime())) {
      return dateString
    }

    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }

  function formatTime(timeString) {
    if (!timeString) {
      return ''
    }

    const [hours, minutes] = timeString.split(':')
    const hour = Number(hours)

    if (Number.isNaN(hour)) {
      return timeString
    }

    const suffix = hour >= 12 ? 'PM' : 'AM'
    const twelveHour = hour % 12 || 12

    return `${twelveHour}:${minutes} ${suffix}`
  }

  const confirmedBookings = bookings.filter(
    (booking) => booking.status !== 'cancelled'
  ).length

  const cancelledBookings = bookings.filter(
    (booking) => booking.status === 'cancelled'
  ).length

  /* Loading State */
  if (loading) {
    return (
      <main className="min-h-screen bg-[#f7f4ef]">

        <section className="relative overflow-hidden bg-[#172033]">

          <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full border-[45px] border-[#78917c]/25" />

          <div className="absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-[#c8875b]/20 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">

            <div className="animate-pulse">

              <div className="h-5 w-36 rounded-full bg-white/10" />

              <div className="mt-6 h-14 w-72 rounded-xl bg-white/10" />

              <div className="mt-5 h-6 w-full max-w-2xl rounded-lg bg-white/10" />

              <div className="mt-10 grid gap-3 sm:grid-cols-3">

                <div className="h-28 rounded-2xl bg-white/10" />

                <div className="h-28 rounded-2xl bg-white/10" />

                <div className="h-28 rounded-2xl bg-white/10" />

              </div>

            </div>

          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:px-8">

          <div className="space-y-6">

            <div className="h-72 animate-pulse rounded-[2rem] bg-white" />

            <div className="h-72 animate-pulse rounded-[2rem] bg-white" />

          </div>

        </section>

      </main>
    )
  }

  /* Error State */
  if (error) {
    return (
      <main className="min-h-screen bg-[#f7f4ef]">

        <section className="relative overflow-hidden bg-[#172033]">

          <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full border-[45px] border-[#78917c]/20" />

          <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">

            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e1a56f]">
              StudyNook
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              My Bookings
            </h1>

          </div>

        </section>

        <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:px-8">

          <div className="relative mx-auto max-w-2xl overflow-hidden rounded-[2rem] bg-white p-10 text-center shadow-[0_15px_50px_rgba(23,32,51,0.07)] sm:p-14">

            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#e8eee5] blur-3xl" />

            <div className="relative">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f1ede7] text-2xl font-bold text-[#c8875b]">
                !
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#c8875b]">
                Unable to load
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#172033]">
                Something went wrong
              </h2>

              <p className="mx-auto mt-4 max-w-md leading-7 text-[#697385]">
                {error}
              </p>

              <Link
                to="/rooms"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#c8875b] px-6 py-3.5 font-semibold text-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-[#b6734d] hover:shadow-lg"
              >
                Browse Rooms
                <span>→</span>
              </Link>

            </div>

          </div>

        </section>

      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f7f4ef]">

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#172033]">

        <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full border-[45px] border-[#78917c]/25" />

        <div className="absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-[#c8875b]/20 blur-3xl" />

        <div className="absolute right-[25%] top-24 h-3 w-3 rounded-full bg-[#e1a56f]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-14 pt-16 sm:pb-16 sm:pt-20 lg:px-8">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#e1a56f] backdrop-blur-sm">

              <span className="h-1.5 w-1.5 rounded-full bg-[#e1a56f]" />

              Your reservations

            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              My Bookings
              <span className="block text-[#e1a56f]">
                Your time, reserved.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-[#cbd2dc] sm:text-lg">
              Keep track of your study sessions, revisit your reserved
              spaces, and manage your bookings all in one place.
            </p>

          </div>

          {/* Summary */}
          {bookings.length > 0 && (
            <div className="mt-10 grid max-w-4xl gap-3 sm:grid-cols-3">

              <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-5 backdrop-blur-sm">

                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#aeb7c4]">
                  Total bookings
                </p>

                <p className="mt-2 text-3xl font-bold text-white">
                  {bookings.length}
                </p>

                <p className="mt-1 text-sm text-white/50">
                  All reservations
                </p>

              </div>

              <div className="rounded-2xl border border-white/10 bg-[#78917c] px-5 py-5">

                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
                  Confirmed
                </p>

                <p className="mt-2 text-3xl font-bold text-white">
                  {confirmedBookings}
                </p>

                <p className="mt-1 text-sm text-white/70">
                  Active reservations
                </p>

              </div>

              <div className="rounded-2xl border border-white/10 bg-[#c8875b] px-5 py-5">

                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
                  Cancelled
                </p>

                <p className="mt-2 text-3xl font-bold text-white">
                  {cancelledBookings}
                </p>

                <p className="mt-1 text-sm text-white/70">
                  Cancelled reservations
                </p>

              </div>

            </div>
          )}

        </div>

      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:px-8">

        {/* Empty State */}
        {bookings.length === 0 ? (

          <div className="relative overflow-hidden rounded-[2rem] bg-[#78917c] px-6 py-16 text-center shadow-[0_18px_55px_rgba(23,32,51,0.08)] sm:px-10 sm:py-20">

            <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

            <div className="absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-[#e1a56f]/25 blur-3xl" />

            <div className="relative">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#172033] text-white">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3.75h10.5A1.75 1.75 0 0 1 19 5.5v13A1.75 1.75 0 0 1 17.25 20H6.75A1.75 1.75 0 0 1 5 18.5v-13A1.75 1.75 0 0 1 6.75 3.75Z"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 8.25h7.5M8.25 12h7.5M8.25 15.75h4.5"
                  />
                </svg>

              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                Nothing reserved yet
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Your next focused session starts here.
              </h2>

              <p className="mx-auto mt-4 max-w-lg leading-7 text-white/80">
                You haven&apos;t booked a study room yet. Find a space
                that works for you and reserve a time slot.
              </p>

              <Link
                to="/rooms"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#e1a56f] px-6 py-3.5 font-semibold text-[#172033] shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-[#efb982] hover:shadow-xl"
              >
                Explore Rooms
                <span>→</span>
              </Link>

            </div>

          </div>

        ) : (

          /* Booking List */
          <div>

            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

              <div>

                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c8875b]">
                  Your collection
                </p>

                <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#172033]">
                  Reserved spaces
                </h2>

                <p className="mt-2 text-sm text-[#697385]">
                  {bookings.length}{' '}
                  {bookings.length === 1
                    ? 'reservation'
                    : 'reservations'}{' '}
                  in your StudyNook history
                </p>

              </div>

              <Link
                to="/rooms"
                className="inline-flex w-fit items-center gap-2 text-sm font-bold text-[#c8875b] transition duration-200 hover:text-[#a96542]"
              >
                Find another room
                <span>→</span>
              </Link>

            </div>

            <div className="space-y-7">

              {bookings.map((booking, index) => {

                const bookingId =
                  booking._id || booking.id

                const room =
                  booking.roomId &&
                  typeof booking.roomId === 'object'
                    ? booking.roomId
                    : booking.room

                const roomName =
                  room?.name ||
                  room?.roomName ||
                  'Study Room'

                const roomImage =
                  room?.image ||
                  room?.imageUrl ||
                  room?.photoURL ||
                  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80'

                const isCancelled =
                  booking.status === 'cancelled'

                const totalCost =
                  booking.totalCost ??
                  booking.totalPrice ??
                  booking.price ??
                  0

                return (
                  <article
                    key={bookingId}
                    className={`group overflow-hidden rounded-[2rem] border bg-white shadow-[0_10px_35px_rgba(23,32,51,0.05)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(23,32,51,0.09)] ${
                      isCancelled
                        ? 'border-[#e5dfd7]'
                        : 'border-[#ded7ce]'
                    } ${
                      index % 2 === 1
                        ? 'lg:translate-x-2'
                        : ''
                    }`}
                  >

                    <div className="grid md:grid-cols-[310px_1fr]">

                      {/* Room Image */}
                      <div className="relative h-64 overflow-hidden md:h-full">

                        <img
                          src={roomImage}
                          alt={roomName}
                          className={`h-full w-full object-cover transition duration-700 group-hover:scale-[1.04] ${
                            isCancelled
                              ? 'grayscale-[25%]'
                              : ''
                          }`}
                          onError={(event) => {
                            event.currentTarget.src =
                              'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80'
                          }}
                        />

                        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#172033]/50 to-transparent" />

                        <div className="absolute left-5 top-5 rounded-full border border-white/70 bg-white/90 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#172033] shadow-sm backdrop-blur-sm">
                          Study Room
                        </div>

                        {isCancelled && (
                          <div className="absolute bottom-5 left-5 rounded-full bg-[#172033]/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white">
                            Cancelled
                          </div>
                        )}

                      </div>

                      {/* Booking Details */}
                      <div className="p-6 sm:p-8">

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                          <div>

                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c8875b]">
                              Reservation
                            </p>

                            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#172033] sm:text-3xl">
                              {roomName}
                            </h2>

                          </div>

                          <span
                            className={`inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-2 text-xs font-bold ${
                              isCancelled
                                ? 'bg-[#f1ede7] text-[#7b746b]'
                                : 'bg-[#e8eee5] text-[#5f705a]'
                            }`}
                          >

                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                isCancelled
                                  ? 'bg-[#9b9287]'
                                  : 'bg-[#78917c]'
                              }`}
                            />

                            {isCancelled
                              ? 'Cancelled'
                              : 'Confirmed'}

                          </span>

                        </div>

                        {/* Details */}
                        <div className="mt-7 grid gap-3 sm:grid-cols-3">

                          <div className="rounded-2xl bg-[#f7f4ef] p-4">

                            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8b8175]">
                              Date
                            </p>

                            <p className="mt-2 text-sm font-bold text-[#172033]">
                              {formatDate(booking.date)}
                            </p>

                          </div>

                          <div className="rounded-2xl bg-[#f7f4ef] p-4">

                            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8b8175]">
                              Time
                            </p>

                            <p className="mt-2 text-sm font-bold text-[#172033]">
                              {formatTime(booking.startTime)}{' '}
                              –{' '}
                              {formatTime(booking.endTime)}
                            </p>

                          </div>

                          <div className="rounded-2xl bg-[#f7f4ef] p-4">

                            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8b8175]">
                              Total
                            </p>

                            <p className="mt-2 text-sm font-bold text-[#172033]">
                              ${Number(totalCost).toLocaleString()}
                            </p>

                          </div>

                        </div>

                        {/* Special Note */}
                        {booking.specialNote && (
                          <div className="mt-5 rounded-2xl border border-[#e4ddd5] bg-[#faf9f7] p-4">

                            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8b8175]">
                              Special note
                            </p>

                            <p className="mt-2 text-sm leading-6 text-[#697385]">
                              {booking.specialNote}
                            </p>

                          </div>
                        )}

                        {/* Actions */}
                        <div className="mt-7 flex flex-wrap gap-3">

                          {room?._id || room?.id ? (
                            <Link
                              to={`/rooms/${room._id || room.id}`}
                              className="inline-flex items-center gap-2 rounded-xl bg-[#c8875b] px-5 py-3 font-bold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-[#b6734d] hover:shadow-md"
                            >
                              View Room
                              <span>→</span>
                            </Link>
                          ) : null}

                          {!isCancelled && (
                            <button
                              type="button"
                              onClick={() =>
                                openCancelModal(booking)
                              }
                              disabled={
                                cancellingId === bookingId
                              }
                              className="rounded-xl border border-[#e4c8c5] bg-white px-5 py-3 font-semibold text-[#b45f56] transition duration-200 hover:border-[#d7aaa5] hover:bg-[#fff6f5] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              Cancel Booking
                            </button>
                          )}

                        </div>

                      </div>

                    </div>

                  </article>
                )
              })}

            </div>

          </div>
        )}

      </section>

      {/* Bottom CTA */}
      {bookings.length > 0 && (
        <section className="px-6 pb-14 sm:pb-20 lg:px-8">

          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#78917c] px-7 py-10 sm:px-10 sm:py-12">

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

              <div className="max-w-2xl">

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                  Keep exploring
                </p>

                <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Ready for your next study session?
                </h2>

                <p className="mt-2 text-sm leading-6 text-white/80">
                  Browse more spaces and find the right environment
                  for whatever you&apos;re working on next.
                </p>

              </div>

              <Link
                to="/rooms"
                className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-[#c8875b] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-[#b6734d] hover:shadow-xl"
              >
                Browse Rooms
                <span>→</span>
              </Link>

            </div>

          </div>

        </section>
      )}

      {/* Cancel Confirmation Modal */}
      {bookingToCancel && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#172033]/65 px-5 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeCancelModal()
            }
          }}
        >

          <div className="w-full max-w-md overflow-hidden rounded-[2rem] bg-white shadow-2xl">

            {/* Modal Header */}
            <div className="bg-[#172033] px-7 py-7 sm:px-8">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#b45f56] text-lg font-bold text-white">
                !
              </div>

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#e1a56f]">
                Reservation
              </p>

              <h2 className="mt-2 text-2xl font-bold text-white">
                Cancel this booking?
              </h2>

            </div>

            {/* Modal Body */}
            <div className="p-7 sm:p-8">

              <p className="leading-7 text-[#697385]">
                Are you sure you want to cancel your reservation
                for{' '}
                <span className="font-bold text-[#172033]">
                  {bookingToCancel.room?.name ||
                    bookingToCancel.room?.roomName ||
                    'this study room'}
                </span>
                ?
              </p>

              <div className="mt-5 rounded-2xl border border-[#ead0cc] bg-[#fff8f7] px-4 py-3.5 text-sm leading-6 text-[#8f5a54]">
                Your booking will be marked as cancelled and the
                reservation will no longer be active.
              </div>

              <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row">

                <button
                  type="button"
                  onClick={closeCancelModal}
                  disabled={Boolean(cancellingId)}
                  className="flex-1 rounded-xl border border-[#d8d0c6] bg-white px-5 py-3.5 font-semibold text-[#667085] transition duration-200 hover:bg-[#f7f4ef] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Keep Booking
                </button>

                <button
                  type="button"
                  onClick={handleCancelBooking}
                  disabled={Boolean(cancellingId)}
                  className="flex-1 rounded-xl bg-[#b45f56] px-5 py-3.5 font-bold text-white transition duration-200 hover:bg-[#a64f47] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {cancellingId
                    ? 'Cancelling...'
                    : 'Yes, Cancel'}
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

    </main>
  )
}

export default MyBookings