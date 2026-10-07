import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Home() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = 'StudyNook | Home'
  }, [])

  useEffect(() => {
    async function fetchLatestRooms() {
      try {
        const response = await axios.get(
          `/api/rooms/latest`
        )

        setRooms(response.data.rooms)
      } catch (error) {
        console.error('Failed to load latest rooms:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLatestRooms()
  }, [])

  return (
    <main className="bg-[#f7f4ef] text-[#172033]">
      {/* HERO */}
      <section className="relative min-h-[720px] overflow-hidden">
        <img
          src="https://images.pexels.com/photos/6333732/pexels-photo-6333732.jpeg"
          alt="Warm library with wooden study tables"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#101a27]/90 via-[#182334]/70 to-[#182334]/25" />

        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#d69a63]/20 blur-3xl" />

        <div className="relative mx-auto flex min-h-[720px] max-w-7xl items-center px-6 py-24 lg:px-8">
          <div className="grid w-full gap-14 lg:grid-cols-[1fr_430px] lg:items-center">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-[#d9a06e]" />
                A quieter way to study
              </div>

              <h1 className="mt-7 max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl lg:text-[5.8rem]">
                Find your space.
                <span className="block text-[#e4b486]">
                  Focus on what matters.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-8 text-white/80 sm:text-xl">
                Discover comfortable study rooms built for deep focus,
                group work, and the moments when you simply need some quiet.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                {/* EXPLORE ROOMS */}
                <Link
                  to="/rooms"
                  className="rounded-full bg-[#e1a56f] px-7 py-3.5 text-sm font-semibold text-[#172033] shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-[#efb982] hover:shadow-xl"
                >
                  Explore Rooms
                </Link>

                {/* CREATE ACCOUNT */}
                <Link
                  to="/register"
                  className="rounded-full bg-[#f7f1e8] px-7 py-3.5 text-sm font-semibold text-[#172033] shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-xl"
                >
                  Create an Account
                </Link>
              </div>

              <div className="mt-12 flex flex-wrap gap-x-10 gap-y-5 border-t border-white/20 pt-6">
                <div>
                  <p className="text-2xl font-semibold text-white">
                    Flexible
                  </p>

                  <p className="mt-1 text-sm text-white/60">
                    Hourly booking
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-semibold text-white">
                    Focused
                  </p>

                  <p className="mt-1 text-sm text-white/60">
                    Study-friendly spaces
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-semibold text-white">
                    Simple
                  </p>

                  <p className="mt-1 text-sm text-white/60">
                    Easy reservations
                  </p>
                </div>
              </div>
            </div>

            {/* HERO BOOKING CARD */}
            <div className="hidden lg:block">
              <div className="rounded-[2rem] border border-white/30 bg-white/90 p-6 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a7564]">
                      StudyNook
                    </p>

                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#172033]">
                      Find your study space
                    </h2>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f0e1d2] text-xl">
                    📚
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="rounded-2xl border border-[#e4ddd4] bg-[#faf8f5] p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#9b8979]">
                      What do you need?
                    </p>

                    <p className="mt-1 text-sm font-medium text-[#293346]">
                      Quiet room, group space, or somewhere to focus
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-[#e4ddd4] bg-[#faf8f5] p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#9b8979]">
                        Duration
                      </p>

                      <p className="mt-1 text-sm font-medium text-[#293346]">
                        By the hour
                      </p>
                    </div>

                    <div className="rounded-2xl border border-[#e4ddd4] bg-[#faf8f5] p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#9b8979]">
                        Booking
                      </p>

                      <p className="mt-1 text-sm font-medium text-[#293346]">
                        Simple & flexible
                      </p>
                    </div>
                  </div>
                </div>

                {/* BROWSE AVAILABLE ROOMS */}
                <Link
                  to="/rooms"
                  className="mt-5 flex items-center justify-between rounded-2xl bg-[#e1a56f] px-5 py-4 text-sm font-semibold text-[#172033] shadow-md transition duration-200 hover:bg-[#efb982] hover:shadow-lg"
                >
                  Browse available rooms
                  <span className="text-lg">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EDITORIAL INTRO */}
      <section className="bg-[#f7f4ef]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:px-8 lg:py-28">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a06f4e]">
              Make room for better work
            </p>

            <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#172033] sm:text-5xl">
              Your environment changes the way you work.
            </h2>
          </div>

          <div className="max-w-2xl">
            <p className="text-lg leading-8 text-[#596273]">
              Whether you need a quiet corner for reading, a room for
              group projects, or a focused space before an exam,
              StudyNook makes finding the right place simple.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full bg-[#e6eee4] px-4 py-2 text-sm font-medium text-[#58705b]">
                Quiet spaces
              </span>

              <span className="rounded-full bg-[#eadfd5] px-4 py-2 text-sm font-medium text-[#805f49]">
                Flexible booking
              </span>

              <span className="rounded-full bg-[#dfe6ef] px-4 py-2 text-sm font-medium text-[#53657e]">
                Study-ready
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED ROOMS */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[#c8875b]" />

                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a06f4e]">
                  Featured spaces
                </p>
              </div>

              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#172033] sm:text-5xl">
                Recently added rooms.
              </h2>

              <p className="mt-4 max-w-xl leading-7 text-[#687182]">
                Explore the newest spaces added to StudyNook and find
                somewhere that fits the way you like to study.
              </p>
            </div>

            <Link
              to="/rooms"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-[#d9d2c9] px-5 py-2.5 text-sm font-semibold text-[#3e495b] transition duration-200 hover:border-[#c8875b] hover:bg-[#c8875b] hover:text-white"
            >
              View All Rooms
              <span>→</span>
            </Link>
          </div>

          {loading ? (
            <div className="flex min-h-[350px] items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#e8e1d9] border-t-[#c8875b]" />

                <p className="mt-4 text-sm text-[#7d8796]">
                  Finding available spaces...
                </p>
              </div>
            </div>
          ) : rooms.length === 0 ? (
            <div className="mt-12 rounded-[2rem] border border-[#e5dfd7] bg-[#faf8f5] px-6 py-20 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e9e1d8] text-2xl">
                📚
              </div>

              <h3 className="mt-5 text-2xl font-semibold text-[#172033]">
                No rooms available yet
              </h3>

              <p className="mx-auto mt-3 max-w-md text-[#697385]">
                New study spaces will appear here as they are added.
              </p>
            </div>
          ) : (
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rooms.map((room, index) => (
                <article
                  key={room._id}
                  className={`group overflow-hidden rounded-[2rem] border border-[#e4ded6] bg-[#faf8f5] shadow-[0_10px_35px_rgba(23,32,51,0.05)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(23,32,51,0.12)] ${
                    index === 1 ? 'lg:translate-y-8' : ''
                  }`}
                >
                  <div className="relative h-64 overflow-hidden bg-[#e9e4dd]">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#101722]/55 via-transparent to-transparent" />

                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-[#344054] shadow-sm backdrop-blur">
                      0{index + 1}
                    </span>

                    {/* USD PRICE */}
                    <span className="absolute bottom-4 right-4 rounded-full bg-white/95 px-3.5 py-2 text-xs font-bold text-[#172033] shadow-lg">
                      ${room.hourlyRate}/hr
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold tracking-[-0.025em] text-[#172033]">
                      {room.name}
                    </h3>

                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#697385]">
                      {room.description}
                    </p>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-white p-3.5">
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#a06f4e]">
                          Floor
                        </p>

                        <p className="mt-1 text-sm font-semibold text-[#293346]">
                          {room.floor}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-white p-3.5">
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#a06f4e]">
                          Capacity
                        </p>

                        <p className="mt-1 text-sm font-semibold text-[#293346]">
                          {room.capacity} people
                        </p>
                      </div>
                    </div>

                    {room.amenities?.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {room.amenities.slice(0, 3).map((amenity) => (
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

                    <div className="mt-6 flex items-center justify-between border-t border-[#e5dfd7] pt-5">
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
        </div>
      </section>

      {/* FIND YOUR KIND OF FOCUS */}
      <section className="overflow-hidden bg-[#172033]">
        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="pointer-events-none absolute -right-24 top-12 h-64 w-64 rounded-full border border-[#e1a56f]/30" />

          <div className="pointer-events-none absolute -bottom-32 left-20 h-72 w-72 rounded-full bg-[#78917c]/10 blur-3xl" />

          <div className="relative grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#e1a56f]">
                Find your kind of focus
              </p>

              <h2 className="mt-5 max-w-xl text-4xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                Different work needs different spaces.
              </h2>
            </div>

            <div>
              <p className="max-w-2xl text-lg leading-8 text-white/65">
                From solo reading sessions to collaborative projects,
                choose a room that matches the way you work best.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/80">
                  📖 Deep reading
                </span>

                <span className="rounded-full border border-white/15 bg-[#a96f50]/40 px-4 py-2 text-sm text-white/80">
                  👥 Group projects
                </span>

                <span className="rounded-full border border-white/15 bg-[#728873]/30 px-4 py-2 text-sm text-white/80">
                  💻 Focused work
                </span>

                <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/80">
                  ✏️ Exam prep
                </span>
              </div>
            </div>
          </div>

          <div className="relative mt-20 border-t border-white/10 pt-10">
            <p className="max-w-5xl text-2xl font-light leading-relaxed tracking-[-0.02em] text-white/85 sm:text-3xl">
              A good study space doesn't just give you a desk.
              <span className="text-[#e1a56f]">
                {' '}
                It gives you room to think.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative overflow-hidden bg-[#f0ebe4]">
        {/* DECORATIVE SHAPES */}
        <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full border border-[#c8875b]/30" />

        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#78917c]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          {/* SECTION HEADER */}
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[#c8875b]" />

                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a06f4e]">
                  How it works
                </p>
              </div>

              <h2 className="mt-5 max-w-lg text-5xl font-semibold leading-[0.95] tracking-[-0.05em] text-[#172033] sm:text-6xl">
                Three steps.
                <span className="block text-[#a06f4e]">
                  Zero hassle.
                </span>
              </h2>
            </div>

            <div className="lg:pb-2">
              <p className="max-w-xl text-lg leading-8 text-[#697385]">
                From finding the right room to settling into your seat,
                StudyNook keeps the whole process simple.
              </p>
            </div>
          </div>

          {/* STEPS */}
          <div className="mt-20 grid gap-5 lg:grid-cols-3">
            {/* STEP 01 */}
            <div className="group relative min-h-[420px] overflow-hidden rounded-[2rem] bg-[#253148] p-8 transition duration-300 hover:-translate-y-2 hover:shadow-2xl sm:p-10">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-white/10 transition duration-500 group-hover:scale-125" />

              <div className="absolute bottom-[-40px] right-[-20px] text-[11rem] font-semibold leading-none tracking-[-0.08em] text-white/[0.035]">
                01
              </div>

              <div className="relative flex h-full flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#e1a56f]">
                      Step one
                    </span>

                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-lg text-white/70 transition group-hover:border-[#e1a56f] group-hover:text-[#e1a56f]">
                      ↗
                    </span>
                  </div>

                  <p className="mt-16 text-7xl font-light tracking-[-0.08em] text-white/20">
                    01
                  </p>

                  <h3 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-white">
                    Find a room.
                  </h3>

                  <p className="mt-4 max-w-sm text-base leading-7 text-white/60">
                    Browse available study spaces and find one that fits
                    your needs, schedule, and budget.
                  </p>
                </div>

                <Link
                  to="/rooms"
                  className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#e1a56f] px-5 py-2.5 text-sm font-semibold text-[#172033] transition duration-200 hover:bg-[#efb982]"
                >
                  Explore rooms
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* STEP 02 */}
            <div className="group relative min-h-[420px] overflow-hidden rounded-[2rem] bg-[#d7e1d5] p-8 transition duration-300 hover:-translate-y-2 hover:shadow-xl sm:p-10 lg:translate-y-8">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#78917c]/20 transition duration-500 group-hover:scale-110" />

              <div className="absolute bottom-[-45px] right-[-20px] text-[11rem] font-semibold leading-none tracking-[-0.08em] text-[#78917c]/15">
                02
              </div>

              <div className="relative flex h-full flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#58705b]">
                      Step two
                    </span>

                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#78917c]/30 text-lg text-[#58705b] transition group-hover:border-[#58705b]">
                      ↗
                    </span>
                  </div>

                  <p className="mt-16 text-7xl font-light tracking-[-0.08em] text-[#78917c]/40">
                    02
                  </p>

                  <h3 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-[#172033]">
                    Choose your time.
                  </h3>

                  <p className="mt-4 max-w-sm text-base leading-7 text-[#596b5c]">
                    Pick a date and time that works for you and see
                    the total cost before confirming.
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#78917c] text-sm text-white">
                    ✓
                  </span>

                  <span className="text-sm font-semibold text-[#4f6553]">
                    Flexible hourly booking
                  </span>
                </div>
              </div>
            </div>

            {/* STEP 03 */}
            <div className="group relative min-h-[420px] overflow-hidden rounded-[2rem] bg-[#c8875b] p-8 transition duration-300 hover:-translate-y-2 hover:shadow-xl sm:p-10">
              <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full border-[35px] border-white/10 transition duration-500 group-hover:scale-110" />

              <div className="absolute bottom-[-40px] right-[-20px] text-[11rem] font-semibold leading-none tracking-[-0.08em] text-white/[0.08]">
                03
              </div>

              <div className="relative flex h-full flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
                      Step three
                    </span>

                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-lg text-white transition group-hover:bg-white group-hover:text-[#c8875b]">
                      ↗
                    </span>
                  </div>

                  <p className="mt-16 text-7xl font-light tracking-[-0.08em] text-white/30">
                    03
                  </p>

                  <h3 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-white">
                    Get focused.
                  </h3>

                  <p className="mt-4 max-w-sm text-base leading-7 text-white/75">
                    Arrive, settle in, and spend your time doing what
                    matters most.
                  </p>
                </div>

                <div className="mt-8">
                  <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                    Your time. Your focus.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM STATEMENT */}
          <div className="mt-28 flex flex-col gap-6 border-t border-[#d5cbc0] pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-xl font-medium leading-8 tracking-[-0.02em] text-[#4c5667] sm:text-2xl">
              Less time searching.
              <span className="text-[#a06f4e]">
                {' '}
                More time studying.
              </span>
            </p>

            <div className="flex items-center gap-3 text-sm font-semibold text-[#687182]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#78917c]" />
              Simple from start to finish
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#f7f4ef]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#253148]">
            <div className="grid lg:grid-cols-[1fr_0.9fr]">
              <div className="flex items-center px-7 py-16 sm:px-12 lg:px-16 lg:py-20">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#e1a56f]">
                    Your next study session
                  </p>

                  <h2 className="mt-5 max-w-xl text-4xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-5xl">
                    Find somewhere you can really focus.
                  </h2>

                  <p className="mt-5 max-w-lg text-lg leading-8 text-white/65">
                    Explore available rooms and find a comfortable
                    place to study, work, and get things done.
                  </p>

                  <Link
                    to="/rooms"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#e1a56f] px-6 py-3.5 text-sm font-semibold text-[#172033] transition duration-200 hover:bg-[#efb982]"
                  >
                    Explore Rooms
                    <span>→</span>
                  </Link>
                </div>
              </div>

              <div className="relative min-h-[360px]">
                <img
                  src="https://images.pexels.com/photos/3747486/pexels-photo-3747486.jpeg"
                  alt="Student studying at a desk"
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-[#253148] via-[#253148]/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home