import { useEffect } from 'react'
import { Link } from 'react-router-dom'

function About() {
  useEffect(() => {
    document.title = 'StudyNook | About'
  }, [])

  return (
    <main className="min-h-screen bg-[#f7f4ef]">

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#172033]">

        {/* Decorative shapes */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#78917c]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#c8875b]/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">

          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">

            {/* Hero Copy */}
            <div className="max-w-3xl">

              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#dfe8dc]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#c8875b]" />
                About StudyNook
              </div>

              <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl lg:text-7xl">
                A quieter place to get things done.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-[#d9dde5] sm:text-lg">
                StudyNook makes it easier to find comfortable study rooms,
                reserve a time that works for you, and create spaces where
                focused work feels a little easier.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">

                <div className="rounded-full border border-[#dfe8dc]/20 bg-[#dfe8dc]/10 px-4 py-2.5 text-sm font-semibold text-[#dfe8dc]">
                  Thoughtful spaces
                </div>

                <div className="rounded-full border border-[#c8875b]/30 bg-[#c8875b]/10 px-4 py-2.5 text-sm font-semibold text-[#f0c29e]">
                  Simple booking
                </div>

                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-[#d9dde5]">
                  Focus first
                </div>

              </div>

            </div>

            {/* Real Library Image */}
            <div className="relative mx-auto w-full max-w-md">

              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#f7f4ef] shadow-[0_30px_80px_rgba(0,0,0,0.22)]">

                <img
                  src="https://images.pexels.com/photos/4593942/pexels-photo-4593942.jpeg"
                  alt="Quiet library reading hall with wooden study tables and bookshelves"
                  className="h-full w-full object-cover"
                />

                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#172033]/45 via-transparent to-transparent" />

                {/* Floating Labels */}
                <div className="absolute right-5 top-5 rounded-full border border-white/20 bg-white/95 px-3.5 py-2 text-xs font-semibold text-[#7c7267] shadow-lg backdrop-blur-sm">
                  Focus starts here
                </div>

                <div className="absolute bottom-5 left-5 rounded-full border border-white/20 bg-[#172033]/90 px-3.5 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur-sm">
                  Your space, your pace
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* What StudyNook Stands For */}
      <section className="border-b border-[#e5dfd7] bg-white">

        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-10">

          <div className="max-w-2xl">

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c8875b]">
              The StudyNook approach
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#172033] sm:text-4xl">
              Designed around better study moments.
            </h2>

            <p className="mt-4 text-base leading-7 text-[#697385]">
              StudyNook is more than a place to reserve a room. It is
              designed to make the experience of finding, using, and
              sharing a study space feel simple and intentional.
            </p>

          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">

            {/* Designed for Focus */}
            <div className="group rounded-[1.75rem] border border-[#e5dfd7] bg-[#f7f4ef] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#c8875b]/40 hover:shadow-[0_14px_35px_rgba(73,65,56,0.08)]">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8dfd4] text-[#c8875b]">

                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="8" />
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 4v2M20 12h-2M12 18v2M6 12H4" />
                </svg>

              </div>

              <p className="mt-7 text-xs font-bold uppercase tracking-[0.16em] text-[#c8875b]">
                01
              </p>

              <h3 className="mt-2 text-xl font-bold text-[#172033]">
                Designed for Focus
              </h3>

              <p className="mt-3 leading-7 text-[#697385]">
                Comfortable surroundings can make a difference. StudyNook
                brings together spaces intended to help you settle in,
                concentrate, and make the most of your time.
              </p>

            </div>

            {/* Made for Real Schedules */}
            <div className="group rounded-[1.75rem] border border-[#d9e2d6] bg-[#eef3eb] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#78917c]/50 hover:shadow-[0_14px_35px_rgba(73,65,56,0.08)]">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#dfe8dc] text-[#6b826b]">

                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="8" />
                  <path d="M12 7v5l3 2" />
                </svg>

              </div>

              <p className="mt-7 text-xs font-bold uppercase tracking-[0.16em] text-[#6b826b]">
                02
              </p>

              <h3 className="mt-2 text-xl font-bold text-[#172033]">
                Made for Real Schedules
              </h3>

              <p className="mt-3 leading-7 text-[#697385]">
                Students have different classes, commitments, and routines.
                StudyNook keeps room booking straightforward so you can
                choose a time that works for you.
              </p>

            </div>

            {/* Shared Resource */}
            <div className="group rounded-[1.75rem] border border-[#e3cbbd] bg-[#f8e9df] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#c8875b]/50 hover:shadow-[0_14px_35px_rgba(73,65,56,0.08)]">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f0d3c0] text-[#b6734d]">

                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="8" r="3" />
                  <circle cx="17" cy="10" r="2.5" />
                  <path d="M3.5 19c.5-3 2.5-4.5 5.5-4.5s5 1.5 5.5 4.5" />
                  <path d="M15 15c2.5 0 4.2 1.2 5 3.5" />
                </svg>

              </div>

              <p className="mt-7 text-xs font-bold uppercase tracking-[0.16em] text-[#b6734d]">
                03
              </p>

              <h3 className="mt-2 text-xl font-bold text-[#172033]">
                Built as a Shared Resource
              </h3>

              <p className="mt-3 leading-7 text-[#697385]">
                A useful study space does not have to sit empty. StudyNook
                gives room owners a simple way to make their spaces
                available to students who need them.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Mission */}
      <section className="relative overflow-hidden bg-[#172033]">

        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#78917c]/15 blur-3xl" />

        <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#c8875b]/15 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-6 py-20 text-center sm:px-8 sm:py-24">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-[#dfe8dc]">

            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
              <path d="M8 6h8M8 10h8M8 14h5" />
            </svg>

          </div>

          <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-[#c8875b]">
            Our purpose
          </p>

          <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Making focused study time easier to find.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#d9dde5] sm:text-lg">
            StudyNook was created around a simple idea: when students
            have access to the right environment, it becomes easier to
            focus, learn, and make meaningful progress.
          </p>

          <div className="mx-auto mt-8 h-px w-20 bg-[#c8875b]" />

          <p className="mt-7 text-sm font-semibold tracking-wide text-[#dfe8dc]">
            Find your space. Focus on what matters.
          </p>

          {/* CTA */}
          <div className="mt-9 flex justify-center">
            <Link
              to="/rooms"
              className="rounded-full bg-[#c8875b] px-6 py-3 text-sm font-bold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-[#b6734d]"
            >
              Explore Rooms
            </Link>
          </div>

        </div>

      </section>

    </main>
  )
}

export default About