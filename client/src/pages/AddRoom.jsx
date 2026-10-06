import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

function AddRoom() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    floor: '',
    capacity: '',
    hourlyRate: '',
  })

  const [amenities, setAmenities] = useState([])
  const [loading, setLoading] = useState(false)

  const availableAmenities = [
    'Whiteboard',
    'Projector',
    'Wi-Fi',
    'Power Outlets',
    'Quiet Zone',
    'Air Conditioning',
  ]

  useEffect(() => {
    document.title = 'StudyNook | Add Room'
  }, [])

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  function handleAmenityChange(event) {
    const { value, checked } = event.target

    if (checked) {
      setAmenities((previous) => [...previous, value])
    } else {
      setAmenities((previous) =>
        previous.filter((amenity) => amenity !== value)
      )
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      setLoading(true)

      const response = await axios.post(
        'http://localhost:5000/api/rooms',
        {
          ...formData,
          amenities,
        },
        {
          withCredentials: true,
        }
      )

      toast.success(response.data.message)

      setFormData({
        name: '',
        description: '',
        image: '',
        floor: '',
        capacity: '',
        hourlyRate: '',
      })

      setAmenities([])

      navigate('/rooms')
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'Failed to create room. Please try again.'

      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f4ef]">

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#172033]">

        {/* Decorative shapes */}
        <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full border-[45px] border-[#78917c]/30" />

        <div className="absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-[#c8875b]/20 blur-3xl" />

        <div className="absolute right-[28%] top-20 h-3 w-3 rounded-full bg-[#e1a56f]" />

        <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-16 sm:pb-16 sm:pt-20 lg:px-8">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#e1a56f] backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e1a56f]" />
              Share your space
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Add a room.
              <span className="block text-[#e1a56f]">
                Make room for focus.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-[#cbd2dc] sm:text-lg">
              Create a welcoming listing for students looking for a
              comfortable place to focus, read, collaborate, or get work done.
            </p>

          </div>

        </div>
      </section>

      {/* Form */}
      <section className="mx-auto max-w-6xl px-6 py-10 sm:py-14 lg:px-8">

        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">

          {/* Side introduction */}
          <aside className="lg:sticky lg:top-8 lg:self-start">

            <div className="rounded-[2rem] bg-[#78917c] p-7 shadow-[0_18px_45px_rgba(23,32,51,0.08)] sm:p-8">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#172033] text-lg font-bold text-white">
                S
              </div>

              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
                Create your listing
              </p>

              <h2 className="mt-3 text-3xl font-bold leading-tight text-[#172033]">
                Give students a place to
                <span className="block text-white">
                  get things done.
                </span>
              </h2>

              <p className="mt-5 text-sm leading-6 text-white/85">
                A great room listing helps students quickly understand
                whether your space is right for their next study session.
              </p>

              <div className="mt-8 space-y-4">

                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-bold text-white">
                    01
                  </div>

                  <div>
                    <p className="font-semibold text-[#172033]">
                      Describe the space
                    </p>

                    <p className="mt-1 text-xs leading-5 text-white/75">
                      Tell students what makes the room useful.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-bold text-white">
                    02
                  </div>

                  <div>
                    <p className="font-semibold text-[#172033]">
                      Add the essentials
                    </p>

                    <p className="mt-1 text-xs leading-5 text-white/75">
                      Set the floor, capacity, rate, and amenities.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-bold text-white">
                    03
                  </div>

                  <div>
                    <p className="font-semibold text-[#172033]">
                      Publish your room
                    </p>

                    <p className="mt-1 text-xs leading-5 text-white/75">
                      Your space will appear in the StudyNook listings.
                    </p>
                  </div>
                </div>

              </div>

            </div>

            <div className="mt-5 rounded-[1.75rem] bg-[#e1a56f] p-6">

              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#172033]/60">
                Keep it clear
              </p>

              <p className="mt-3 text-lg font-bold leading-7 text-[#172033]">
                Good details make choosing a room easier.
              </p>

            </div>

          </aside>

          {/* Main form */}
          <div className="overflow-hidden rounded-[2rem] border border-[#e5ded5] bg-white shadow-[0_18px_55px_rgba(23,32,51,0.07)]">

            <form onSubmit={handleSubmit}>

              {/* Room information */}
              <div className="border-b border-[#eee8e1] p-7 sm:p-10">

                <div className="mb-8 flex items-start gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#172033] text-sm font-bold text-white">
                    01
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c8875b]">
                      Room information
                    </p>

                    <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-[#172033]">
                      Tell us about the room
                    </h2>

                    <p className="mt-1.5 text-sm leading-6 text-[#697385]">
                      Give students a clear idea of what your space is like.
                    </p>
                  </div>

                </div>

                <div className="space-y-6">

                  {/* Room name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-semibold text-[#172033]"
                    >
                      Room name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Quiet Focus Room"
                      required
                      className="w-full rounded-2xl border border-[#ddd6cd] bg-[#faf8f5] px-4 py-3.5 text-[#172033] outline-none transition duration-200 placeholder:text-[#9aa0aa] focus:border-[#c8875b] focus:bg-white focus:ring-4 focus:ring-[#c8875b]/10"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <div className="mb-2 flex items-center justify-between gap-4">

                      <label
                        htmlFor="description"
                        className="block text-sm font-semibold text-[#172033]"
                      >
                        Description
                      </label>

                      <span className="hidden text-xs text-[#9aa0aa] sm:block">
                        Tell students what makes it useful
                      </span>

                    </div>

                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe the room, atmosphere, seating, lighting, and anything else students should know."
                      rows="5"
                      required
                      className="w-full resize-none rounded-2xl border border-[#ddd6cd] bg-[#faf8f5] px-4 py-3.5 text-[#172033] outline-none transition duration-200 placeholder:text-[#9aa0aa] focus:border-[#c8875b] focus:bg-white focus:ring-4 focus:ring-[#c8875b]/10"
                    />
                  </div>

                  {/* Image */}
                  <div>
                    <label
                      htmlFor="image"
                      className="mb-2 block text-sm font-semibold text-[#172033]"
                    >
                      Room image URL
                    </label>

                    <input
                      id="image"
                      name="image"
                      type="url"
                      value={formData.image}
                      onChange={handleChange}
                      placeholder="https://example.com/room.jpg"
                      required
                      className="w-full rounded-2xl border border-[#ddd6cd] bg-[#faf8f5] px-4 py-3.5 text-[#172033] outline-none transition duration-200 placeholder:text-[#9aa0aa] focus:border-[#c8875b] focus:bg-white focus:ring-4 focus:ring-[#c8875b]/10"
                    />

                    <p className="mt-2 text-xs leading-5 text-[#7b8490]">
                      Use a direct image URL so the room photo can be displayed
                      on your listing.
                    </p>

                    {/* Image preview */}
                    {formData.image && (
                      <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-[#e5ded5] bg-[#f7f4ef]">

                        <div className="relative h-56 sm:h-72">

                          <img
                            src={formData.image}
                            alt="Room preview"
                            className="h-full w-full object-cover"
                            onError={(event) => {
                              event.currentTarget.style.display = 'none'
                            }}
                          />

                          <div className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/90 px-3.5 py-2 text-xs font-semibold text-[#172033] shadow-sm backdrop-blur-sm">
                            Image preview
                          </div>

                        </div>

                      </div>
                    )}

                  </div>

                </div>

              </div>

              {/* Space details */}
              <div className="border-b border-[#eee8e1] bg-[#faf8f5] p-7 sm:p-10">

                <div className="mb-8 flex items-start gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#c8875b] text-sm font-bold text-white">
                    02
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c8875b]">
                      Space details
                    </p>

                    <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-[#172033]">
                      Set the essentials
                    </h2>

                    <p className="mt-1.5 text-sm leading-6 text-[#697385]">
                      Help students understand the size and location of your
                      room.
                    </p>
                  </div>

                </div>

                <div className="grid gap-5 sm:grid-cols-3">

                  {/* Floor */}
                  <div>
                    <label
                      htmlFor="floor"
                      className="mb-2 block text-sm font-semibold text-[#172033]"
                    >
                      Floor
                    </label>

                    <input
                      id="floor"
                      name="floor"
                      type="text"
                      value={formData.floor}
                      onChange={handleChange}
                      placeholder="2nd Floor"
                      required
                      className="w-full rounded-2xl border border-[#ddd6cd] bg-white px-4 py-3.5 text-[#172033] outline-none transition duration-200 placeholder:text-[#9aa0aa] focus:border-[#c8875b] focus:ring-4 focus:ring-[#c8875b]/10"
                    />
                  </div>

                  {/* Capacity */}
                  <div>
                    <label
                      htmlFor="capacity"
                      className="mb-2 block text-sm font-semibold text-[#172033]"
                    >
                      Capacity
                    </label>

                    <input
                      id="capacity"
                      name="capacity"
                      type="number"
                      min="1"
                      value={formData.capacity}
                      onChange={handleChange}
                      placeholder="4"
                      required
                      className="w-full rounded-2xl border border-[#ddd6cd] bg-white px-4 py-3.5 text-[#172033] outline-none transition duration-200 placeholder:text-[#9aa0aa] focus:border-[#c8875b] focus:ring-4 focus:ring-[#c8875b]/10"
                    />
                  </div>

                  {/* Hourly rate */}
                  <div>
                    <label
                      htmlFor="hourlyRate"
                      className="mb-2 block text-sm font-semibold text-[#172033]"
                    >
                      Hourly rate
                    </label>

                    <div className="relative">
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#c8875b]">
                        $
                      </span>

                      <input
                        id="hourlyRate"
                        name="hourlyRate"
                        type="number"
                        min="0"
                        value={formData.hourlyRate}
                        onChange={handleChange}
                        placeholder="12"
                        required
                        className="w-full rounded-2xl border border-[#ddd6cd] bg-white py-3.5 pl-9 pr-4 text-[#172033] outline-none transition duration-200 placeholder:text-[#9aa0aa] focus:border-[#c8875b] focus:ring-4 focus:ring-[#c8875b]/10"
                      />
                    </div>

                    <p className="mt-2 text-xs text-[#7b8490]">
                      Price per hour in USD
                    </p>
                  </div>

                </div>

              </div>

              {/* Amenities */}
              <div className="border-b border-[#eee8e1] p-7 sm:p-10">

                <div className="mb-8 flex items-start justify-between gap-5">

                  <div className="flex items-start gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#78917c] text-sm font-bold text-white">
                      03
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#78917c]">
                        Amenities
                      </p>

                      <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-[#172033]">
                        What does it include?
                      </h2>

                      <p className="mt-1.5 text-sm leading-6 text-[#697385]">
                        Select everything your study room offers.
                      </p>
                    </div>

                  </div>

                  {amenities.length > 0 && (
                    <span className="shrink-0 rounded-full bg-[#e8eee5] px-3 py-1.5 text-xs font-bold text-[#5f705a]">
                      {amenities.length} selected
                    </span>
                  )}

                </div>

                <div className="grid gap-3 sm:grid-cols-2">

                  {availableAmenities.map((amenity) => {
                    const isSelected = amenities.includes(amenity)

                    return (
                      <label
                        key={amenity}
                        className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-4 transition duration-200 ${
                          isSelected
                            ? 'border-[#b8c5b3] bg-[#f1f5ef]'
                            : 'border-[#e5ded5] bg-[#faf8f5] hover:border-[#cfc5b9] hover:bg-[#f7f4ef]'
                        }`}
                      >
                        <input
                          type="checkbox"
                          value={amenity}
                          checked={isSelected}
                          onChange={handleAmenityChange}
                          className="h-4 w-4 accent-[#78917c]"
                        />

                        <span
                          className={`text-sm font-semibold ${
                            isSelected
                              ? 'text-[#5f705a]'
                              : 'text-[#4b5563]'
                          }`}
                        >
                          {amenity}
                        </span>

                        {isSelected && (
                          <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-[#78917c] text-xs font-bold text-white">
                            ✓
                          </span>
                        )}

                      </label>
                    )
                  })}

                </div>

              </div>

              {/* Submit */}
              <div className="bg-[#172033] p-7 sm:p-10">

                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

                  <div>
                    <p className="text-lg font-bold text-white">
                      Ready to share your space?
                    </p>

                    <p className="mt-1.5 text-sm leading-6 text-[#cbd2dc]">
                      Your room will be added to the StudyNook listings.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#c8875b] px-7 py-3.5 text-sm font-bold text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-[#b6734d] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    {loading ? 'Adding Room...' : 'Add Room'}
                    {!loading && <span className="text-base">→</span>}
                  </button>

                </div>

              </div>

            </form>

          </div>

        </div>

      </section>

      {/* Bottom statement */}
      <section className="px-6 pb-12 sm:pb-16 lg:px-8">

        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[#e1a56f] px-7 py-10 sm:px-10 sm:py-12">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#172033]/60">
                StudyNook
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#172033] sm:text-3xl">
                Your space could be someone&apos;s perfect study spot.
              </h2>
            </div>

            <button
              type="button"
              onClick={() => navigate('/rooms')}
              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-[#172033]/15 bg-[#172033] px-6 py-3.5 text-sm font-bold text-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-[#253148] hover:shadow-lg"
            >
              Browse Rooms
              <span>→</span>
            </button>

          </div>

        </div>

      </section>

    </main>
  )
}

export default AddRoom