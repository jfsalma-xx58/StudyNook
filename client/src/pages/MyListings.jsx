import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

function MyListings() {
  const navigate = useNavigate()

  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [roomToDelete, setRoomToDelete] = useState(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    document.title = 'StudyNook | My Listings'

    async function fetchMyRooms() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/rooms/my-rooms`,
          {
            withCredentials: true,
          }
        )

        setRooms(response.data.rooms || [])
      } catch (error) {
        console.error('Failed to load your rooms:', error)

        const message =
          error.response?.data?.message ||
          'Failed to load your listings.'

        setError(message)
        toast.error(message)
      } finally {
        setLoading(false)
      }
    }

    fetchMyRooms()
  }, [])

  function openDeleteModal(room) {
    setRoomToDelete(room)
  }

  function closeDeleteModal() {
    if (deleting) {
      return
    }

    setRoomToDelete(null)
  }

  async function handleDeleteRoom() {
    if (!roomToDelete) {
      return
    }

    try {
      setDeleting(true)

      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/rooms/${roomToDelete._id}`,
        {
          withCredentials: true,
        }
      )

      setRooms((previousRooms) =>
        previousRooms.filter(
          (room) => room._id !== roomToDelete._id
        )
      )

      setRoomToDelete(null)

      toast.success(response.data.message)
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'Failed to delete room. Please try again.'

      toast.error(message)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f4ef]">

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#172033]">

        <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full border-[45px] border-[#78917c]/25" />

        <div className="absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-[#c8875b]/20 blur-3xl" />

        <div className="absolute right-[25%] top-24 h-3 w-3 rounded-full bg-[#e1a56f]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-14 pt-16 sm:pb-16 sm:pt-20 lg:px-8">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

            <div className="max-w-3xl">

              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#e1a56f] backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#e1a56f]" />
                Your spaces
              </div>

              <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                My Listings
                <span className="block text-[#e1a56f]">
                  Your spaces, your way.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-[#cbd2dc] sm:text-lg">
                Manage the study rooms you&apos;ve added to StudyNook
                and keep your spaces ready for focused work.
              </p>

            </div>

            <Link
              to="/add-room"
              className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-[#c8875b] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-[#b6734d] hover:shadow-xl"
            >
              <span className="text-lg leading-none">+</span>
              Add a Room
            </Link>

          </div>

          {/* Summary */}
          {!loading && !error && rooms.length > 0 && (
            <div className="mt-10 grid max-w-4xl gap-3 sm:grid-cols-3">

              <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-5 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#aeb7c4]">
                  Total spaces
                </p>

                <p className="mt-2 text-3xl font-bold text-white">
                  {rooms.length}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#78917c] px-5 py-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/75">
                  Available
                </p>

                <p className="mt-2 text-3xl font-bold text-white">
                  {rooms.length}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#e1a56f] px-5 py-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#172033]/60">
                  Collection
                </p>

                <p className="mt-2 text-2xl font-bold text-[#172033]">
                  StudyNook
                </p>
              </div>

            </div>
          )}

        </div>
      </section>

      {/* Listings */}
      <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:px-8">

        {loading ? (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-[2rem] border border-[#e5ded5] bg-white shadow-sm"
              >
                <div className="h-60 animate-pulse bg-[#e9e3db]" />

                <div className="space-y-4 p-6">

                  <div className="h-6 w-3/4 animate-pulse rounded-lg bg-[#e9e3db]" />

                  <div className="h-4 w-full animate-pulse rounded bg-[#e9e3db]" />

                  <div className="h-4 w-5/6 animate-pulse rounded bg-[#e9e3db]" />

                  <div className="grid grid-cols-2 gap-3 pt-2">

                    <div className="h-16 animate-pulse rounded-2xl bg-[#f3f0ec]" />

                    <div className="h-16 animate-pulse rounded-2xl bg-[#f3f0ec]" />

                  </div>

                  <div className="flex gap-2 pt-1">
                    <div className="h-7 w-20 animate-pulse rounded-full bg-[#e9e3db]" />
                    <div className="h-7 w-20 animate-pulse rounded-full bg-[#e9e3db]" />
                  </div>

                  <div className="h-10 w-full animate-pulse rounded-xl bg-[#e9e3db]" />

                </div>
              </div>
            ))}

          </div>
        ) : error ? (

          /* Error */
          <div className="relative overflow-hidden rounded-[2rem] bg-[#172033] px-6 py-20 text-center shadow-[0_18px_55px_rgba(23,32,51,0.10)]">

            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#c8875b]/20 blur-3xl" />

            <div className="relative">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-xl font-bold text-[#e1a56f]">
                !
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#e1a56f]">
                Unable to load
              </p>

              <h2 className="mt-3 text-2xl font-bold text-white">
                Something went wrong
              </h2>

              <p className="mx-auto mt-3 max-w-md leading-7 text-[#cbd2dc]">
                {error}
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-7 rounded-full bg-[#c8875b] px-6 py-3 text-sm font-bold text-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-[#b6734d] hover:shadow-lg"
              >
                Try Again
              </button>

            </div>

          </div>

        ) : rooms.length === 0 ? (

          /* Empty State */
          <div className="relative overflow-hidden rounded-[2rem] bg-[#78917c] px-6 py-20 text-center shadow-[0_18px_55px_rgba(23,32,51,0.08)]">

            <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

            <div className="absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-[#e1a56f]/25 blur-3xl" />

            <div className="relative">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#172033] text-2xl font-bold text-white">
                +
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                Start your collection
              </p>

              <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                You haven&apos;t added any rooms yet.
              </h2>

              <p className="mx-auto mt-4 max-w-md leading-7 text-white/80">
                Add your first study room and let other students
                discover a comfortable place to focus.
              </p>

              <Link
                to="/add-room"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#e1a56f] px-6 py-3.5 text-sm font-bold text-[#172033] shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-[#efb982] hover:shadow-lg"
              >
                Add your first room
                <span>→</span>
              </Link>

            </div>

          </div>

        ) : (

          <>
            {/* Section heading */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c8875b]">
                  Your collection
                </p>

                <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#172033]">
                  Spaces you&apos;ve shared
                </h2>

                <p className="mt-2 text-sm text-[#697385]">
                  {rooms.length}{' '}
                  {rooms.length === 1 ? 'room' : 'rooms'} listed on
                  StudyNook
                </p>
              </div>

              <Link
                to="/rooms"
                className="inline-flex w-fit items-center gap-2 text-sm font-bold text-[#c8875b] transition duration-200 hover:text-[#a96542]"
              >
                Browse all rooms
                <span>→</span>
              </Link>

            </div>

            {/* Room grid */}
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

              {rooms.map((room, index) => (
                <article
                  key={room._id}
                  className={`group overflow-hidden rounded-[2rem] border border-[#e5ded5] bg-white shadow-[0_10px_35px_rgba(23,32,51,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(23,32,51,0.10)] ${
                    index % 3 === 1 ? 'lg:translate-y-6' : ''
                  }`}
                >

                  {/* Image */}
                  <div className="relative h-60 overflow-hidden bg-[#ebe5dd]">

                    <img
                      src={room.image}
                      alt={room.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    />

                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />

                    <div className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/90 px-3.5 py-2 text-xs font-bold text-[#172033] shadow-sm backdrop-blur-sm">
                      Your listing
                    </div>

                    <div className="absolute bottom-4 right-4 rounded-full bg-[#172033]/95 px-4 py-2 text-sm font-bold text-white shadow-lg">
                      ${room.hourlyRate}
                      <span className="ml-1 text-xs font-normal text-white/70">
                        /hr
                      </span>
                    </div>

                  </div>

                  {/* Content */}
                  <div className="p-6">

                    <div className="flex items-start justify-between gap-4">

                      <div className="min-w-0">

                        <h2 className="truncate text-xl font-bold text-[#172033]">
                          {room.name}
                        </h2>

                        <p className="mt-1 text-sm text-[#8b8175]">
                          Floor {room.floor}
                        </p>

                      </div>

                      <span className="shrink-0 rounded-full bg-[#e8eee5] px-3 py-1.5 text-xs font-bold text-[#5f705a]">
                        Listed
                      </span>

                    </div>

                    <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#697385]">
                      {room.description}
                    </p>

                    {/* Details */}
                    <div className="mt-5 grid grid-cols-2 gap-3">

                      <div className="rounded-2xl bg-[#f7f4ef] p-4">
                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8b8175]">
                          Floor
                        </p>

                        <p className="mt-1.5 font-bold text-[#172033]">
                          {room.floor}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-[#f7f4ef] p-4">
                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8b8175]">
                          Capacity
                        </p>

                        <p className="mt-1.5 font-bold text-[#172033]">
                          {room.capacity} people
                        </p>
                      </div>

                    </div>

                    {/* Amenities */}
                    {room.amenities?.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">

                        {room.amenities.slice(0, 3).map((amenity) => (
                          <span
                            key={amenity}
                            className="rounded-full bg-[#eef2ec] px-3 py-1.5 text-xs font-semibold text-[#657361]"
                          >
                            {amenity}
                          </span>
                        ))}

                        {room.amenities.length > 3 && (
                          <span className="rounded-full bg-[#f1ede7] px-3 py-1.5 text-xs font-semibold text-[#7c7267]">
                            +{room.amenities.length - 3} more
                          </span>
                        )}

                      </div>
                    )}

                    {/* Actions */}
                    <div className="mt-6 grid grid-cols-3 gap-2">

                      <Link
                        to={`/rooms/${room._id}`}
                        className="rounded-xl bg-[#c8875b] px-3 py-2.5 text-center text-sm font-bold text-white transition duration-200 hover:bg-[#b6734d]"
                      >
                        View
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/edit-room/${room._id}`)
                        }
                        className="rounded-xl border border-[#d8d0c6] bg-white px-3 py-2.5 text-sm font-bold text-[#4b5563] transition duration-200 hover:border-[#78917c] hover:bg-[#eef2ec] hover:text-[#5f705a]"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => openDeleteModal(room)}
                        className="rounded-xl border border-[#ead0cc] bg-white px-3 py-2.5 text-sm font-bold text-[#b45f56] transition duration-200 hover:border-[#d9aaa4] hover:bg-[#fff5f3]"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </article>
              ))}

            </div>
          </>

        )}

      </section>

      {/* Bottom CTA */}
      {!loading && !error && rooms.length > 0 && (
        <section className="px-6 pb-14 sm:pb-20 lg:px-8">

          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#78917c] px-7 py-10 sm:px-10 sm:py-12">

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

              <div className="max-w-2xl">

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                  Keep exploring
                </p>

                <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Want to find another place to study?
                </h2>

                <p className="mt-2 text-sm leading-6 text-white/80">
                  Browse the full StudyNook collection and discover
                  your next focused space.
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

      {/* Delete Confirmation Modal */}
      {roomToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#172033]/60 px-5 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeDeleteModal()
            }
          }}
        >

          <div className="w-full max-w-md overflow-hidden rounded-[2rem] bg-white shadow-2xl">

            {/* Modal header */}
            <div className="bg-[#172033] px-7 py-7 sm:px-8">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#b45f56] text-lg font-bold text-white">
                !
              </div>

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#e1a56f]">
                Permanent action
              </p>

              <h2 className="mt-2 text-2xl font-bold text-white">
                Delete this room?
              </h2>

            </div>

            {/* Modal body */}
            <div className="p-7 sm:p-8">

              <p className="leading-7 text-[#697385]">
                You&apos;re about to remove{' '}
                <span className="font-bold text-[#172033]">
                  {roomToDelete.name}
                </span>{' '}
                from StudyNook.
              </p>

              <div className="mt-5 rounded-2xl border border-[#ead0cc] bg-[#fff8f7] px-4 py-3.5 text-sm leading-6 text-[#8f5a54]">
                This will permanently delete the room listing and its
                associated bookings.
              </div>

              <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row">

                <button
                  type="button"
                  onClick={closeDeleteModal}
                  disabled={deleting}
                  className="flex-1 rounded-xl border border-[#d8d0c6] bg-white px-5 py-3 font-bold text-[#667085] transition duration-200 hover:bg-[#f7f4ef] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Keep Room
                </button>

                <button
                  type="button"
                  onClick={handleDeleteRoom}
                  disabled={deleting}
                  className="flex-1 rounded-xl bg-[#b45f56] px-5 py-3 font-bold text-white transition duration-200 hover:bg-[#a64f47] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {deleting ? 'Deleting...' : 'Delete Room'}
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

    </main>
  )
}

export default MyListings