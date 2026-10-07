import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { GoogleLogin } from '@react-oauth/google'
import { useAuth } from '../context/AuthContext'

function Login() {
  const navigate = useNavigate()
  const { setUser } = useAuth()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  document.title = 'StudyNook | Login'

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!formData.email || !formData.password) {
      toast.error('Please enter your email and password.')
      return
    }

    try {
      setLoading(true)

      const response = await axios.post(
        `/api/auth/login`,
        formData,
        {
          withCredentials: true,
        }
      )

      setUser(response.data.user)

      toast.success(response.data.message)

      navigate('/')
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'Login failed. Please try again.'

      toast.error(message)

      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogleSuccess(credentialResponse) {
    try {
      setGoogleLoading(true)

      const response = await axios.post(
        `/api/auth/google`,
        {
          credential: credentialResponse.credential,
        },
        {
          withCredentials: true,
        }
      )

      setUser(response.data.user)

      toast.success(response.data.message)

      navigate('/')
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'Google login failed. Please try again.'

      toast.error(message)

      setUser(null)
    } finally {
      setGoogleLoading(false)
    }
  }

  function handleGoogleError() {
    toast.error('Google login failed. Please try again.')
  }

  return (
    <main className="min-h-screen bg-[#f7f4ef] px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-[#e5ded5] bg-white shadow-[0_25px_70px_rgba(23,32,51,0.10)] lg:grid-cols-[0.9fr_1.1fr]">

          <div className="relative hidden overflow-hidden bg-[#172033] p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">

            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[28px] border-[#c8875b]/30" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#78917c]/20" />
            <div className="absolute right-12 top-1/2 h-3 w-3 rounded-full bg-[#e1a56f]" />
            <div className="absolute bottom-24 right-24 h-5 w-5 rounded-full bg-[#78917c]" />

            <div className="relative z-10">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e1a56f] text-xl font-bold text-[#172033]">
                  S
                </div>

                <span className="text-lg font-bold tracking-tight">
                  StudyNook
                </span>
              </div>
            </div>

            <div className="relative z-10 max-w-md">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#e1a56f]">
                Your space awaits
              </p>

              <h2 className="mt-5 text-5xl font-bold leading-[1.05] tracking-tight xl:text-6xl">
                Come back to
                <span className="block text-[#d7e1d5]">
                  focus.
                </span>
              </h2>

              <p className="mt-6 max-w-sm text-base leading-7 text-white/70">
                Find a quiet corner, book your perfect time, and get back to
                what matters.
              </p>
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3">
                <div className="h-2.5 w-2.5 rounded-full bg-[#c8875b]" />
                <p className="text-sm text-white/60">
                  Less searching. More studying.
                </p>
              </div>
            </div>
          </div>

          <div className="px-6 py-10 sm:px-10 sm:py-12 lg:px-12 xl:px-16 xl:py-14">

            <div className="mb-10 flex items-center justify-center gap-3 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e1a56f] text-lg font-bold text-[#172033]">
                S
              </div>

              <span className="text-lg font-bold text-[#172033]">
                StudyNook
              </span>
            </div>

            <div className="mx-auto max-w-md">

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#c8875b]">
                  Welcome back
                </p>

                <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#172033] sm:text-5xl">
                  Log in to
                  <span className="block">StudyNook.</span>
                </h1>

                <p className="mt-5 max-w-sm text-base leading-7 text-[#697385]">
                  Sign in to book a study room and manage your reservations.
                </p>
              </div>

              <div className="mt-9">

                <form onSubmit={handleSubmit} className="space-y-5">

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-[#172033]"
                    >
                      Email address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className="w-full rounded-2xl border border-[#dcd6ce] bg-[#faf8f5] px-4 py-3.5 text-[#172033] outline-none transition duration-200 placeholder:text-[#9aa0aa] focus:border-[#c8875b] focus:bg-white focus:ring-4 focus:ring-[#c8875b]/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-semibold text-[#172033]"
                    >
                      Password
                    </label>

                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                      className="w-full rounded-2xl border border-[#dcd6ce] bg-[#faf8f5] px-4 py-3.5 text-[#172033] outline-none transition duration-200 placeholder:text-[#9aa0aa] focus:border-[#c8875b] focus:bg-white focus:ring-4 focus:ring-[#c8875b]/10"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading || googleLoading}
                    className="w-full rounded-2xl bg-[#c8875b] px-5 py-3.5 font-semibold text-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-[#b6734d] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? 'Logging in...' : 'Log In'}
                  </button>

                </form>

                <div className="my-7 flex items-center gap-4">
                  <div className="h-px flex-1 bg-[#e5dfd7]" />

                  <span className="text-xs font-semibold tracking-[0.15em] text-[#9aa0aa]">
                    OR
                  </span>

                  <div className="h-px flex-1 bg-[#e5dfd7]" />
                </div>

                <div className="flex min-h-10 justify-center">
                  {googleLoading ? (
                    <div className="flex h-10 items-center justify-center text-sm text-[#697385]">
                      Signing in with Google...
                    </div>
                  ) : (
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={handleGoogleError}
                      text="continue_with"
                      shape="rectangular"
                      width="360"
                    />
                  )}
                </div>

              </div>

              <div className="mt-9 rounded-2xl border border-[#d7e1d5] bg-[#eef3eb] px-5 py-4">
                <p className="text-sm leading-6 text-[#536258]">
                  New to StudyNook? Create an account to discover and book
                  study rooms.
                </p>

                <Link
                  to="/register"
                  className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-[#78917c] transition duration-200 hover:text-[#5f7764]"
                >
                  Create your account
                  <span className="text-base">→</span>
                </Link>
              </div>

            </div>
          </div>

        </div>
      </section>
    </main>
  )
}

export default Login