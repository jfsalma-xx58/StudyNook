import { useEffect } from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  useEffect(() => {
    document.title = 'StudyNook | 404'
  }, [])

  return (
    <main className="min-h-screen bg-[#f7f4ef] text-[#172033]">

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#172033]">
        {/* Decorative shapes */}
        <div className="pointer-events-none absolute -left-28 -top-28 h-80 w-80 rounded-full bg-[#78917c]/20 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-[#c8875b]/20 blur-3xl" />

        <div className="relative mx-auto flex min-h-[75vh] max-w-6xl items-center justify-center px-6 py-20 sm:px-10 lg:px-16">

          <div className="w-full max-w-3xl text-center">

            {/* Label */}
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#e1a56f] backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e1a56f]" />
              StudyNook
            </div>

            {/* 404 */}
            <h1 className="mt-8 text-[7rem] font-black leading-none tracking-[-0.08em] text-white sm:text-[9rem] md:text-[11rem]">
              404
            </h1>

            {/* Accent */}
            <div className="mx-auto mt-5 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#c8875b]" />
              <span className="h-px w-12 bg-white/20" />
            </div>

            <h2 className="mx-auto mt-8 max-w-2xl text-3xl font-black tracking-[-0.03em] text-white sm:text-4xl">
              Looks like this page is taking a study break.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
              The page you're looking for doesn't exist or may have been
              moved. Let's get you back somewhere a little more productive.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">

              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-full bg-[#c8875b] px-7 py-3.5 text-sm font-bold text-white transition duration-200 hover:bg-[#b6734d]"
              >
                Back to Home
              </Link>

              <Link
                to="/rooms"
                className="inline-flex items-center justify-center rounded-full bg-[#c8875b] px-7 py-3.5 text-sm font-bold text-white transition duration-200 hover:bg-[#b6734d]"
              >
                Browse Rooms
              </Link>

            </div>

          </div>
        </div>
      </section>

      {/* Bottom message */}
      <section className="bg-[#f7f4ef] px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-5xl">

          <div className="grid gap-5 md:grid-cols-3">

            {/* Card 1 */}
            <div className="rounded-[2rem] bg-[#253148] p-7 text-white">
              <p className="text-sm font-bold tracking-[0.2em] text-[#e1a56f]">
                01
              </p>

              <h3 className="mt-8 text-xl font-black">
                Find your space.
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/65">
                Browse available study rooms and find somewhere that fits
                your needs.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-[2rem] bg-[#d7e1d5] p-7 text-[#172033]">
              <p className="text-sm font-bold tracking-[0.2em] text-[#6b826b]">
                02
              </p>

              <h3 className="mt-8 text-xl font-black">
                Choose your time.
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#4f5d52]">
                Pick a time that works for your schedule and reserve your
                room.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-[2rem] bg-[#c8875b] p-7 text-white">
              <p className="text-sm font-bold tracking-[0.2em] text-white/70">
                03
              </p>

              <h3 className="mt-8 text-xl font-black">
                Get focused.
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/80">
                Spend less time searching and more time getting things done.
              </p>
            </div>

          </div>

          <div className="mt-12 text-center">
            <p className="text-2xl font-black tracking-tight text-[#172033] sm:text-3xl">
              Less time searching.
            </p>

            <p className="mt-1 text-2xl font-black tracking-tight text-[#c8875b] sm:text-3xl">
              More time studying.
            </p>
          </div>

        </div>
      </section>

    </main>
  )
}

export default NotFound