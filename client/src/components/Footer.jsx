import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="border-t border-[#37414a] bg-[#1f2933] text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10">

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.75fr_1fr]">

          {/* Brand */}
          <div>
            <Link
              to="/"
              className="group inline-flex items-center gap-3"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white transition duration-200 group-hover:bg-[#9a8f80]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                >
                  <path
                    d="M4 6.5C4 5.67 4.67 5 5.5 5H11V19H6C4.9 19 4 18.1 4 17V6.5Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 6.5C20 5.67 19.33 5 18.5 5H13V19H18C19.1 19 20 18.1 20 17V6.5Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11 7.5C11.65 7.1 12.35 7.1 13 7.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </span>

              <span className="text-2xl font-bold tracking-tight">
                StudyNook
              </span>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-gray-300">
              A quieter place to get things done. Find comfortable
              study spaces, book with ease, and make every study
              session count.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-gray-300">
              <span className="h-2 w-2 rounded-full bg-[#8a9a86]" />
              Find your quiet place
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-200">
              Explore
            </h3>

            <nav className="mt-5 flex flex-col gap-3.5 text-sm">
              <Link
                to="/"
                className="w-fit text-gray-300 transition duration-200 hover:translate-x-1 hover:text-white"
              >
                Home
              </Link>

              <Link
                to="/rooms"
                className="w-fit text-gray-300 transition duration-200 hover:translate-x-1 hover:text-white"
              >
                Rooms
              </Link>

              <Link
                to="/about"
                className="w-fit text-gray-300 transition duration-200 hover:translate-x-1 hover:text-white"
              >
                About
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-200">
              Contact Us
            </h3>

            <div className="mt-5 space-y-3 text-sm">
              <a
                href="tel:01560017344"
                className="block w-fit text-gray-300 transition duration-200 hover:text-white"
              >
                01560017344
              </a>

              <a
                href="mailto:info@studynook.com"
                className="block w-fit text-gray-300 transition duration-200 hover:text-white"
              >
                info@studynook.com
              </a>

              <p className="text-gray-300">
                Gazipur, Dhaka, Bangladesh
              </p>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-2">

              {/* Facebook */}
              <Link
                to="/not-found"
                aria-label="Facebook"
                title="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition duration-200 hover:-translate-y-0.5 hover:border-[#78917c] hover:bg-[#78917c] hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M14 8h3V4h-3c-3.31 0-5 1.69-5 5v3H6v4h3v4h4v-4h3l1-4h-4V9c0-.67.33-1 1-1Z" />
                </svg>
              </Link>

              {/* X */}
              <Link
                to="/not-found"
                aria-label="X"
                title="X"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition duration-200 hover:-translate-y-0.5 hover:border-[#78917c] hover:bg-[#78917c] hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-[17px] w-[17px]"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817-5.963 6.817H1.684l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
                </svg>
              </Link>

              {/* LinkedIn */}
              <Link
                to="/not-found"
                aria-label="LinkedIn"
                title="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition duration-200 hover:-translate-y-0.5 hover:border-[#78917c] hover:bg-[#78917c] hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M6.5 8.25A2.25 2.25 0 1 0 6.5 3.75a2.25 2.25 0 0 0 0 4.5ZM4.5 9.75h4V21h-4V9.75ZM10.5 9.75h3.84v1.54h.05c.53-1 1.84-2.04 3.79-2.04 4.05 0 4.82 2.67 4.82 6.15V21h-4v-4.96c0-1.18-.02-2.7-1.64-2.7-1.64 0-1.89 1.28-1.89 2.61V21h-4V9.75Z" />
                </svg>
              </Link>

              {/* Instagram */}
              <Link
                to="/not-found"
                aria-label="Instagram"
                title="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition duration-200 hover:-translate-y-0.5 hover:border-[#78917c] hover:bg-[#78917c] hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                >
                  <rect
                    x="3.5"
                    y="3.5"
                    width="17"
                    height="17"
                    rx="5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <circle
                    cx="17.4"
                    cy="6.7"
                    r="1"
                    fill="currentColor"
                  />
                </svg>
              </Link>

            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-gray-400">
            © 2026 StudyNook. All rights reserved.
          </p>

          <p className="text-xs text-gray-500">
            Find your space. Focus on what matters.
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer