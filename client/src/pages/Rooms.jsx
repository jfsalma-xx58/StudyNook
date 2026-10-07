import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Rooms() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState('')
  const [floor, setFloor] = useState('')
  const [minRate, setMinRate] = useState('')
  const [maxRate, setMaxRate] = useState('')
  const [selectedAmenities, setSelectedAmenities] = useState([])

  const availableAmenities = [
    'Whiteboard',
    'Projector',
    'Wi-Fi',
    'Power Outlets',
    'Quiet Zone',
    'Air Conditioning',
  ]

  useEffect(() => {
    document.title = 'StudyNook | Rooms'
  }, [])

  useEffect(() => {
    async function fetchRooms() {
      try {
        setLoading(true)

        const params = {}

        if (search.trim()) {
          params.search = search.trim()
        }

        if (floor) {
          params.floor = floor
        }

        if (minRate) {
          params.minRate = minRate
        }

        if (maxRate) {
          params.maxRate = maxRate
        }

        if (selectedAmenities.length > 0) {
          params.amenity = selectedAmenities.join(',')
        }

        const response = await axios.get(
          `/api/rooms`,
          {
            params,
          }
        )

        setRooms(response.data.rooms || [])
      } catch (error) {
        console.error('Failed to load rooms:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRooms()
  }, [
    search,
    floor,
    minRate,
    maxRate,
    selectedAmenities,
  ])

  function handleAmenityChange(event) {
    const { value, checked } = event.target

    if (checked) {
      setSelectedAmenities((previous) => [
        ...previous,
        value,
      ])
    } else {
      setSelectedAmenities((previous) =>
        previous.filter((amenity) => amenity !== value)
      )
    }
  }

  function clearFilters() {
    setSearch('')
    setFloor('')
    setMinRate('')
    setMaxRate('')
    setSelectedAmenities([])
  }

  const hasFilters =
    search ||
    floor ||
    minRate ||
    maxRate ||
    selectedAmenities.length > 0

  return (
    <main className="min-h-screen bg-[#f7f4ef] text-[#172033]">

      {/* HERO HEADER */}
      <section className="relative overflow-hidden bg-[#172033]">
        <div className="pointer-events-none absolute -right-32 -top-40 h-[500px] w-[500px] rounded-full border border-[#e1a56f]/20" />

        <div className="pointer-events-none absolute -bottom-40 left-10 h-80 w-80 rounded-full bg-[#78917c]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-20 lg:px-8 lg:pb-20 lg:pt-24">
          <div className="max-w-4xl">

            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#e1a56f]" />

              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#e1a56f]">
                Explore spaces
              </p>
            </div>

            <h1 className="mt-6 text-5xl font-semibold leading-[0.95] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
              Find a room that
              <span className="block text-[#e1a56f]">
                fits your focus.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/65 sm:text-xl">
              Browse comfortable study spaces for quiet reading,
              collaborative projects, focused work, and everything
              in between.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white/75">
                Quiet spaces
              </span>

              <span className="rounded-full border border-white/10 bg-[#a96f50]/30 px-4 py-2 text-sm text-white/75">
                Flexible booking
              </span>

              <span className="rounded-full border border-white/10 bg-[#78917c]/25 px-4 py-2 text-sm text-white/75">
                Study-ready
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* SEARCH & FILTERS */}
      <section className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative -mt-8 overflow-hidden rounded-[2rem] border border-[#e1dad1] bg-white shadow-[0_20px_55px_rgba(23,32,51,0.10)]">

          {/* FILTER HEADER */}
          <div className="border-b border-[#eee8e1] bg-[#faf8f5] px-6 py-6 sm:px-8">

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#e8eee5] text-sm">
                    ⌕
                  </span>

                  <h2 className="text-lg font-semibold tracking-tight text-[#172033]">
                    Find your space
                  </h2>
                </div>

                <p className="mt-2 text-sm text-[#697385]">
                  Narrow down rooms by your preferred options.
                </p>
              </div>

              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="w-fit rounded-full border border-[#d9d1c7] bg-white px-4 py-2 text-xs font-semibold text-[#596273] transition duration-200 hover:border-[#c8875b] hover:bg-[#c8875b] hover:text-white"
                >
                  Clear filters
                </button>
              )}

            </div>
          </div>

          <div className="p-6 sm:p-8">

            {/* MAIN FILTERS */}
            <div className="grid gap-5 lg:grid-cols-2">

              {/* SEARCH */}
              <div>
                <label
                  htmlFor="search"
                  className="mb-2.5 block text-xs font-bold uppercase tracking-[0.14em] text-[#7b7167]"
                >
                  Search rooms
                </label>

                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-[#a06f4e]">
                    ⌕
                  </span>

                  <input
                    id="search"
                    type="text"
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Search by room name..."
                    className="w-full rounded-2xl border border-[#ddd5cb] bg-[#faf9f7] py-4 pl-11 pr-4 text-sm text-[#172033] outline-none transition placeholder:text-[#aaa197] focus:border-[#c8875b] focus:bg-white focus:ring-4 focus:ring-[#c8875b]/10"
                  />
                </div>
              </div>

              {/* FLOOR */}
              <div>
                <label
                  htmlFor="floor"
                  className="mb-2.5 block text-xs font-bold uppercase tracking-[0.14em] text-[#7b7167]"
                >
                  Floor
                </label>

                <select
                  id="floor"
                  value={floor}
                  onChange={(event) =>
                    setFloor(event.target.value)
                  }
                  className="w-full rounded-2xl border border-[#ddd5cb] bg-[#faf9f7] px-4 py-4 text-sm text-[#172033] outline-none transition focus:border-[#c8875b] focus:bg-white focus:ring-4 focus:ring-[#c8875b]/10"
                >
                  <option value="">
                    All floors
                  </option>

                  <option value="1st Floor">
                    1st Floor
                  </option>

                  <option value="2nd Floor">
                    2nd Floor
                  </option>

                  <option value="3rd Floor">
                    3rd Floor
                  </option>

                  <option value="4th Floor">
                    4th Floor
                  </option>

                  <option value="5th Floor">
                    5th Floor
                  </option>
                </select>
              </div>

              {/* MINIMUM RATE */}
              <div>
                <label
                  htmlFor="minRate"
                  className="mb-2.5 block text-xs font-bold uppercase tracking-[0.14em] text-[#7b7167]"
                >
                  Minimum hourly rate
                </label>

                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#a06f4e]">
                    $
                  </span>

                  <input
                    id="minRate"
                    type="number"
                    min="0"
                    value={minRate}
                    onChange={(event) =>
                      setMinRate(event.target.value)
                    }
                    placeholder="e.g. 8"
                    className="w-full rounded-2xl border border-[#ddd5cb] bg-[#faf9f7] py-4 pl-10 pr-4 text-sm text-[#172033] outline-none transition placeholder:text-[#aaa197] focus:border-[#c8875b] focus:bg-white focus:ring-4 focus:ring-[#c8875b]/10"
                  />
                </div>
              </div>

              {/* MAXIMUM RATE */}
              <div>
                <label
                  htmlFor="maxRate"
                  className="mb-2.5 block text-xs font-bold uppercase tracking-[0.14em] text-[#7b7167]"
                >
                  Maximum hourly rate
                </label>

                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#a06f4e]">
                    $
                  </span>

                  <input
                    id="maxRate"
                    type="number"
                    min="0"
                    value={maxRate}
                    onChange={(event) =>
                      setMaxRate(event.target.value)
                    }
                    placeholder="e.g. 20"
                    className="w-full rounded-2xl border border-[#ddd5cb] bg-[#faf9f7] py-4 pl-10 pr-4 text-sm text-[#172033] outline-none transition placeholder:text-[#aaa197] focus:border-[#c8875b] focus:bg-white focus:ring-4 focus:ring-[#c8875b]/10"
                  />
                </div>
              </div>
            </div>

            {/* AMENITIES */}
            <div className="mt-8 border-t border-[#eee8e1] pt-7">

              <div className="mb-5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#7b7167]">
                  Amenities
                </p>

                <p className="mt-1.5 text-sm text-[#697385]">
                  Choose the features you want in your room.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {availableAmenities.map((amenity) => {
                  const isSelected =
                    selectedAmenities.includes(amenity)

                  return (
                    <label
                      key={amenity}
                      className={`group flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-4 transition duration-200 ${
                        isSelected
                          ? 'border-[#c8875b] bg-[#f7eee7]'
                          : 'border-[#eee8e1] bg-[#faf9f7] hover:border-[#d7c7b8] hover:bg-[#f5f1ec]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        value={amenity}
                        checked={isSelected}
                        onChange={handleAmenityChange}
                        className="h-4 w-4 accent-[#c8875b]"
                      />

                      <span
                        className={`text-sm ${
                          isSelected
                            ? 'font-semibold text-[#6f4c39]'
                            : 'text-[#596273]'
                        }`}
                      >
                        {amenity}
                      </span>
                    </label>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS HEADER */}
      <section className="mx-auto max-w-7xl px-6 pb-6 pt-20 lg:px-8">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#c8875b]" />

              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a06f4e]">
                Available spaces
              </p>
            </div>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#172033] sm:text-4xl">
              {loading
                ? 'Finding rooms...'
                : `${rooms.length} ${
                    rooms.length === 1
                      ? 'room'
                      : 'rooms'
                  } available`}
            </h2>
          </div>

          {!loading && rooms.length > 0 && (
            <p className="text-sm text-[#7d8796]">
              Choose a space that works for you.
            </p>
          )}
        </div>
      </section>

      {/* ROOMS */}
      <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-8">

        {/* LOADING */}
        {loading ? (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-[2rem] border border-[#e4ded6] bg-white shadow-sm"
              >
                <div className="h-60 animate-pulse bg-[#e9e4dd]" />

                <div className="p-6">
                  <div className="h-6 w-2/3 animate-pulse rounded-lg bg-[#eee9e2]" />

                  <div className="mt-4 h-4 w-full animate-pulse rounded bg-[#f1ede7]" />

                  <div className="mt-2 h-4 w-4/5 animate-pulse rounded bg-[#f1ede7]" />

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="h-16 animate-pulse rounded-2xl bg-[#f5f2ed]" />
                    <div className="h-16 animate-pulse rounded-2xl bg-[#f5f2ed]" />
                  </div>

                  <div className="mt-6 h-11 animate-pulse rounded-full bg-[#f1ede7]" />
                </div>
              </div>
            ))}
          </div>

        ) : rooms.length === 0 ? (

          /* EMPTY STATE */
          <div className="relative overflow-hidden rounded-[2.5rem] border border-[#e4ded6] bg-white px-6 py-24 text-center shadow-sm">

            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#e1a56f]/10 blur-3xl" />

            <div className="relative">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-[#e8eee5] text-3xl">
                ⌕
              </div>

              <h2 className="mt-7 text-3xl font-semibold tracking-[-0.03em] text-[#172033]">
                No rooms found
              </h2>

              <p className="mx-auto mt-4 max-w-md leading-7 text-[#697385]">
                We couldn't find any study rooms matching your
                search or filters. Try changing your selections.
              </p>

              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-8 rounded-full bg-[#c8875b] px-6 py-3 text-sm font-semibold text-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-[#b6734d] hover:shadow-lg"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

        ) : (

          /* ROOM GRID */
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

            {rooms.map((room, index) => (
              <article
                key={room._id}
                className={`group overflow-hidden rounded-[2rem] border border-[#e4ded6] bg-white shadow-[0_10px_35px_rgba(23,32,51,0.05)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(23,32,51,0.12)] ${
                  index === 1
                    ? 'lg:translate-y-6'
                    : ''
                }`}
              >

                {/* IMAGE */}
                <div className="relative h-60 overflow-hidden bg-[#e9e4dd]">

                  <img
                    src={room.image}
                    alt={room.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#101722]/55 via-transparent to-transparent" />

                  {/* ROOM NUMBER */}
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-[#344054] shadow-sm backdrop-blur">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* PRICE */}
                  <span className="absolute bottom-4 right-4 rounded-full bg-white/95 px-3.5 py-2 text-xs font-bold text-[#172033] shadow-lg">
                    ${room.hourlyRate}/hr
                  </span>
                </div>

                {/* CONTENT */}
                <div className="p-6">

                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-xl font-semibold tracking-[-0.025em] text-[#172033]">
                      {room.name}
                    </h2>
                  </div>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#697385]">
                    {room.description}
                  </p>

                  {/* ROOM DETAILS */}
                  <div className="mt-5 grid grid-cols-2 gap-3">

                    <div className="rounded-2xl bg-[#faf8f5] p-3.5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#a06f4e]">
                        Floor
                      </p>

                      <p className="mt-1 text-sm font-semibold text-[#293346]">
                        {room.floor}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#faf8f5] p-3.5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#a06f4e]">
                        Capacity
                      </p>

                      <p className="mt-1 text-sm font-semibold text-[#293346]">
                        {room.capacity} people
                      </p>
                    </div>
                  </div>

                  {/* AMENITIES */}
                  {room.amenities?.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">

                      {room.amenities
                        .slice(0, 3)
                        .map((amenity) => (
                          <span
                            key={amenity}
                            className="rounded-full bg-[#e8eee5] px-3 py-1 text-xs font-medium text-[#5c705f]"
                          >
                            {amenity}
                          </span>
                        ))}

                      {room.amenities.length > 3 && (
                        <span className="rounded-full bg-[#ebe7e1] px-3 py-1 text-xs font-medium text-[#6c6a66]">
                          +{room.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* BOTTOM */}
                  <div className="mt-6 flex items-center justify-between gap-3 border-t border-[#eee8e1] pt-5">

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#a06f4e]">
                        From
                      </p>

                      <p className="mt-0.5 text-lg font-semibold text-[#172033]">
                        ${room.hourlyRate}

                        <span className="ml-1 text-xs font-normal text-[#7d8796]">
                          / hour
                        </span>
                      </p>
                    </div>

                    {/* VIEW DETAILS */}
                    <Link
                      to={`/rooms/${room._id}`}
                      className="rounded-full bg-[#c8875b] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-[#b6734d] hover:shadow-md"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* BOTTOM CTA */}
      <section className="border-t border-[#e3dcd3] bg-[#f0ebe4]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">

          <div className="flex flex-col gap-8 rounded-[2rem] bg-[#d7e1d5] p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:p-12">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#58705b]">
                Still deciding?
              </p>

              <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.04em] text-[#172033] sm:text-4xl">
                Find the space that feels right for your next session.
              </h2>
            </div>

            {/* CREATE ACCOUNT */}
            <Link
              to="/register"
              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-[#c8875b] px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-[#b6734d] hover:shadow-xl"
            >
              Create an Account
              <span>→</span>
            </Link>

          </div>
        </div>
      </section>

    </main>
  )
}

export default Rooms