import { useEfect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

function Register() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoURL: '',
    password: '',
  })

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.title = 'StudyNook | Register'
  }, [])

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Please fill in all required fields.')
      return
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters.')
      return
    }

    if (!/[A-Z]/.test(formData.password)) {
      toast.error(
        'Password must contain at least one uppercase letter.'
      )
      return
    }

    if (!/[a-z]/.test(formData.password)) {
      toast.error(
        'Password must contain at least one lowercase letter.'
      )
      return
    }

    try {
      setLoading(true)

      const response = await axios.post(
        `/api/auth/register`,
        formData
      )

      toast.success(response.data.message)

      navigate('/login')
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'Registration failed. Please try again.'

      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f4ef] px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-[#e5ded5] bg-white shadow-[0_25px_70px_rgba(23,32,51,0.10)] lg:grid-cols-[0.9fr_1.1fr]">

          {/* Left panel */}
          <div className="relative hidden overflow-hidden bg-[#78917c] p-10 text-[#172033] lg:flex lg:flex-col lg:justify-between xl:p-14">

            {/* Decorative shapes */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[28px] border-white/20" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#d7e1d5]/40" />
            <div className="absolute right-14 top-1/3 h-4 w-4 rounded-full bg-[#c8875b]" />
            <div className="absolute bottom-28 right-28 h-6 w-6 rounded-full bg-[#e1a56f]" />

            {/* Logo */}
            <div className="relative z-10">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#172033] text-xl font-bold text-white">
                  S
                </div>

                <span className="text-lg font-bold tracking-tight">
                  StudyNook
                </span>
              </div>
            </div>

            {/* Main message */}
            <div className="relative z-10 max-w-md">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white">
                Make room for focus
              </p>

              <h2 className="mt-5 text-5xl font-bold leading-[1.05] tracking-tight xl:text-6xl">
                Your next
                <span className="block text-white">
                  study spot.
                </span>
              </h2>

              <p className="mt-6 max-w-sm text-base leading-7 text-white">
                Create your account, explore available rooms, and find a space
                that works for the way you study.
              </p>
            </div>

            {/* Bottom message */}
            <div className="relative z-10">
              <div className="flex items-center gap-3">
                <div className="h-2.5 w-2.5 rounded-full bg-[#c8875b]" />

                <p className="text-sm text-black">
                  Find your space. Focus on what matters.
                </p>
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="px-6 py-10 sm:px-10 sm:py-12 lg:px-12 xl:px-16 xl:py-14">

            {/* Mobile brand */}
            <div className="mb-10 flex items-center justify-center gap-3 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e1a56f] text-lg font-bold text-[#172033]">
                S
              </div>

              <span className="text-lg font-bold text-[#172033]">
                StudyNook
              </span>
            </div>

            <div className="mx-auto max-w-md">

              {/* Header */}
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#c8875b]">
                  Get started
                </p>

                <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#172033] sm:text-5xl">
                  Create your
                  <span className="block">
                    account.
                  </span>
                </h1>

                <p className="mt-5 max-w-sm text-base leading-7 text-[#697385]">
                  Join StudyNook and find a space where you can focus.
                </p>
              </div>

              {/* Registration form */}
              <div className="mt-9">

                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >

                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-semibold text-[#172033]"
                    >
                      Full name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                      className="w-full rounded-2xl border border-[#dcd6ce] bg-[#faf8f5] px-4 py-3.5 text-[#172033] outline-none transition duration-200 placeholder:text-[#9aa0aa] focus:border-[#c8875b] focus:bg-white focus:ring-4 focus:ring-[#c8875b]/10"
                    />
                  </div>

                  {/* Email */}
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

                  {/* Profile Photo */}
                  <div>
                    <label
                      htmlFor="photoURL"
                      className="mb-2 block text-sm font-semibold text-[#172033]"
                    >
                      Profile photo URL
                      <span className="ml-2 font-normal text-[#9aa0aa]">
                        Optional
                      </span>
                    </label>

                    <input
                      id="photoURL"
                      name="photoURL"
                      type="url"
                      value={formData.photoURL}
                      onChange={handleChange}
                      placeholder="https://example.com/photo.jpg"
                      className="w-full rounded-2xl border border-[#dcd6ce] bg-[#faf8f5] px-4 py-3.5 text-[#172033] outline-none transition duration-200 placeholder:text-[#9aa0aa] focus:border-[#c8875b] focus:bg-white focus:ring-4 focus:ring-[#c8875b]/10"
                    />
                  </div>

                  {/* Password */}
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
                      placeholder="Create a password"
                      required
                      className="w-full rounded-2xl border border-[#dcd6ce] bg-[#faf8f5] px-4 py-3.5 text-[#172033] outline-none transition duration-200 placeholder:text-[#9aa0aa] focus:border-[#c8875b] focus:bg-white focus:ring-4 focus:ring-[#c8875b]/10"
                    />

                    <p className="mt-2.5 text-xs leading-5 text-[#7b8490]">
                      At least 6 characters, including one uppercase and one
                      lowercase letter.
                    </p>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-2xl bg-[#c8875b] px-5 py-3.5 font-semibold text-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-[#b6734d] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading
                      ? 'Creating account...'
                      : 'Create Account'}
                  </button>

                </form>

              </div>

              {/* Login prompt */}
              <div className="mt-9 rounded-2xl border border-[#e7ddd2] bg-[#faf8f5] px-5 py-4">
                <p className="text-sm leading-6 text-[#697385]">
                  Already have an account?
                </p>

                <Link
                  to="/login"
                  className="mt-1 inline-flex items-center gap-2 text-sm font-bold text-[#c8875b] transition duration-200 hover:text-[#a96542]"
                >
                  Log in to StudyNook
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

export default Register