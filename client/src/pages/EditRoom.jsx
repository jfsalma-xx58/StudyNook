import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

function EditRoom() {
  const { id } = useParams()
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
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const availableAmenities = [
    'Whiteboard',
    'Projector',
    'Wi-Fi',
    'Power Outlets',
    'Quiet Zone',
    'Air Conditioning',
  ]

  useEffect(() => {
    document.title = 'StudyNook | Edit Room'

    async function fetchRoom() {
      try {
        const response = await axios.get(
          `/api/rooms/${id}`
        )

        const room = response.data.room

        setFormData({
          name: room.name || '',
          description: room.description || '',
          image: room.image || '',
          floor: room.floor || '',
          capacity: room.capacity || '',
          hourlyRate: room.hourlyRate || '',
        })

        setAmenities(room.amenities || [])
      } catch (error) {
        console.error('Failed to load room:', error)

        toast.error(
          error.response?.data?.message ||
            'Failed to load this room.'
        )

        navigate('/my-listings')
      } finally {
        setLoading(false)
      }
    }

    fetchRoom()
  }, [id, navigate])

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
      setSaving(true)

      const response = await axios.patch(
        `/api/rooms/${id}`,
        {
          ...formData,
          amenities,
        },
        {
          withCredentials: true,
        }
      )

      toast.success(response.data.message)

      navigate('/my-listings')
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'Failed to update room. Please try again.'

      toast.error(message)
    } finally {
      setSaving(false)
    }
  }

  /* Loading State */
  if (loading) {
    return (
      <main className="min-h-screen bg-[#f7f4ef]">

        <section className="relative overflow-hidden bg-[#172033]">

          <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full border-[45px] border-[#78917c]/25" />

          <div className="absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-[#c8875b]/20 blur-3xl" />

          <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20 lg:px-8">

            <div className="animate-pulse">

              <div className="h-5 w-40 rounded-full bg-white/10" />

              <div className="mt-6 h-14 w-80 rounded-xl bg-white/10" />

              <div className="mt-5 h-6 w-full max-w-2xl rounded-lg bg-white/10" />

            </div>

          </div>

        </section>

        <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16 lg:px-8">

          <div className="grid gap-7 lg:grid-cols-[280px_1fr]">

            <div className="h-72 animate-pulse rounded-[2rem] bg-[#78917c]" />

            <div className="overflow-hidden rounded-[2rem] bg-white shadow-sm">

              <div className="space-y-7 p-7 sm:p-10">

                <div className="h-7 w-48 animate-pulse rounded-lg bg-[#ebe7e1]" />

                <div className="h-14 animate-pulse rounded-xl bg-[#f1efeb]" />

                <div className="h-32 animate-pulse rounded-xl bg-[#f1efeb]" />

                <div className="h-14 animate-pulse rounded-xl bg-[#f1efeb]" />

                <div className="grid gap-4 sm:grid-cols-3">

                  <div className="h-14 animate-pulse rounded-xl bg-[#f1efeb]" />

                  <div className="h-14 animate-pulse rounded-xl bg-[#f1efeb]" />

                  <div className="h-14 animate-pulse rounded-xl bg-[#f1efeb]" />

                </div>

              </div>

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

        <div className="absolute right-[24%] top-24 h-3 w-3 rounded-full bg-[#e1a56f]" />

        <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-16 sm:pb-16 sm:pt-20 lg:px-8">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#e1a56f] backdrop-blur-sm">

              <span className="h-1.5 w-1.5 rounded-full bg-[#e1a56f]" />

              Manage your space

            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Edit Study Room
              <span className="block text-[#e1a56f]">
                Keep it up to date.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-[#cbd2dc] sm:text-lg">
              Update your room details, pricing, image, and amenities
              so students always know what to expect from your space.
            </p>

          </div>

        </div>

      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16 lg:px-8">

        <div className="grid gap-7 lg:grid-cols-[280px_1fr]">

          {/* Side Information */}
          <aside className="h-fit lg:sticky lg:top-6">

            <div className="overflow-hidden rounded-[2rem] bg-[#78917c] p-7 shadow-[0_15px_45px_rgba(23,32,51,0.08)] sm:p-8">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#172033] text-lg font-bold text-white">
                S
              </div>

              <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                StudyNook listing
              </p>

              <h2 className="mt-3 text-2xl font-bold tracking-tight text-white">
                Make your space work better.
              </h2>

              <p className="mt-4 text-sm leading-6 text-white/80">
                Keep your listing clear, useful, and inviting for
                students looking for their next focused space.
              </p>

              <div className="mt-7 space-y-3">

                <div className="flex items-start gap-3">

                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15 text-xs font-bold text-white">
                    1
                  </span>

                  <p className="text-sm leading-5 text-white/80">
                    Keep your room information accurate.
                  </p>

                </div>

                <div className="flex items-start gap-3">

                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15 text-xs font-bold text-white">
                    2
                  </span>

                  <p className="text-sm leading-5 text-white/80">
                    Use a clear, appealing room image.
                  </p>

                </div>

                <div className="flex items-start gap-3">

                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15 text-xs font-bold text-white">
                    3
                  </span>

                  <p className="text-sm leading-5 text-white/80">
                    Highlight the amenities students care about.
                  </p>

                </div>

              </div>

              <div className="mt-8 h-px bg-white/15" />

              <p className="mt-5 text-xs leading-5 text-white/60">
                Changes will be reflected on your StudyNook listing
                after you save.
              </p>

            </div>

          </aside>

          {/* Form */}
          <div className="overflow-hidden rounded-[2rem] bg-white shadow-[0_15px_50px_rgba(23,32,51,0.06)]">

            <form onSubmit={handleSubmit}>

              {/* Room Information */}
              <div className="border-b border-[#ebe5dd] p-7 sm:p-10">

                <div className="mb-8">

                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c8875b]">
                    Step 01
                  </p>

                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#172033]">
                    Room information
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[#697385]">
                    Update the information students see when browsing
                    your listing.
                  </p>

                </div>

                <div className="space-y-6">

                  {/* Name */}
                  <div>

                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-bold text-[#172033]"
                    >
                      Room name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-[#ddd6cd] bg-[#fcfbf9] px-4 py-3.5 text-[#172033] outline-none transition duration-200 placeholder:text-[#aaa39a] focus:border-[#c8875b] focus:bg-white focus:ring-4 focus:ring-[#c8875b]/10"
                    />

                  </div>

                  {/* Description */}
                  <div>

                    <label
                      htmlFor="description"
                      className="mb-2 block text-sm font-bold text-[#172033]"
                    >
                      Description
                    </label>

                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="5"
                      required
                      className="w-full resize-none rounded-xl border border-[#ddd6cd] bg-[#fcfbf9] px-4 py-3.5 text-[#172033] outline-none transition duration-200 placeholder:text-[#aaa39a] focus:border-[#c8875b] focus:bg-white focus:ring-4 focus:ring-[#c8875b]/10"
                    />

                  </div>

                  {/* Image */}
                  <div>

                    <label
                      htmlFor="image"
                      className="mb-2 block text-sm font-bold text-[#172033]"
                    >
                      Room image URL
                    </label>

                    <input
                      id="image"
                      name="image"
                      type="url"
                      value={formData.image}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-[#ddd6cd] bg-[#fcfbf9] px-4 py-3.5 text-[#172033] outline-none transition duration-200 placeholder:text-[#aaa39a] focus:border-[#c8875b] focus:bg-white focus:ring-4 focus:ring-[#c8875b]/10"
                    />

                    <p className="mt-2 text-xs leading-5 text-[#8b8175]">
                      Update the image URL if you would like to use
                      a different photo.
                    </p>

                    {/* Image Preview */}
                    {formData.image && (
                      <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-[#e5ded6] bg-[#f7f4ef]">

                        <div className="relative h-56 sm:h-72">

                          <img
                            src={formData.image}
                            alt="Room preview"
                            className="h-full w-full object-cover"
                            onError={(event) => {
                              event.currentTarget.style.display = 'none'
                            }}
                          />

                          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#172033]/45 to-transparent" />

                          <div className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/90 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#172033] shadow-sm backdrop-blur-sm">
                            Current image
                          </div>

                        </div>

                      </div>
                    )}

                  </div>

                </div>

              </div>

              {/* Space Details */}
              <div className="border-b border-[#ebe5dd] p-7 sm:p-10">

                <div className="mb-8">

                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c8875b]">
                    Step 02
                  </p>

                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#172033]">
                    Space details
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[#697385]">
                    Adjust the room&apos;s location, capacity, or
                    pricing.
                  </p>

                </div>

                <div className="grid gap-5 sm:grid-cols-3">

                  {/* Floor */}
                  <div>

                    <label
                      htmlFor="floor"
                      className="mb-2 block text-sm font-bold text-[#172033]"
                    >
                      Floor
                    </label>

                    <input
                      id="floor"
                      name="floor"
                      type="text"
                      value={formData.floor}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-[#ddd6cd] bg-[#fcfbf9] px-4 py-3.5 text-[#172033] outline-none transition duration-200 focus:border-[#c8875b] focus:bg-white focus:ring-4 focus:ring-[#c8875b]/10"
                    />

                  </div>

                  {/* Capacity */}
                  <div>

                    <label
                      htmlFor="capacity"
                      className="mb-2 block text-sm font-bold text-[#172033]"
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
                      required
                      className="w-full rounded-xl border border-[#ddd6cd] bg-[#fcfbf9] px-4 py-3.5 text-[#172033] outline-none transition duration-200 focus:border-[#c8875b] focus:bg-white focus:ring-4 focus:ring-[#c8875b]/10"
                    />

                  </div>

                  {/* Hourly Rate */}
                  <div>

                    <label
                      htmlFor="hourlyRate"
                      className="mb-2 block text-sm font-bold text-[#172033]"
                    >
                      Hourly rate
                    </label>

                    <div className="relative">

                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#8b8175]">
                        $
                      </span>

                      <input
                        id="hourlyRate"
                        name="hourlyRate"
                        type="number"
                        min="0"
                        value={formData.hourlyRate}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-[#ddd6cd] bg-[#fcfbf9] py-3.5 pl-9 pr-4 text-[#172033] outline-none transition duration-200 focus:border-[#c8875b] focus:bg-white focus:ring-4 focus:ring-[#c8875b]/10"
                      />

                    </div>

                    <p className="mt-2 text-xs text-[#8b8175]">
                      Price per hour
                    </p>

                  </div>

                </div>

              </div>

              {/* Amenities */}
              <div className="border-b border-[#ebe5dd] p-7 sm:p-10">

                <div className="mb-8">

                  <div className="flex items-start justify-between gap-4">

                    <div>

                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c8875b]">
                        Step 03
                      </p>

                      <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#172033]">
                        Amenities
                      </h2>

                    </div>

                    {amenities.length > 0 && (
                      <span className="rounded-full bg-[#e8eee5] px-3.5 py-2 text-xs font-bold text-[#5f705a]">
                        {amenities.length} selected
                      </span>
                    )}

                  </div>

                  <p className="mt-2 text-sm leading-6 text-[#697385]">
                    Update the features available in this room.
                  </p>

                </div>

                <div className="grid gap-3 sm:grid-cols-2">

                  {availableAmenities.map((amenity) => {

                    const isSelected =
                      amenities.includes(amenity)

                    return (
                      <label
                        key={amenity}
                        className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-4 transition duration-200 ${
                          isSelected
                            ? 'border-[#b8c7b2] bg-[#f1f5ef]'
                            : 'border-[#e5ded6] bg-[#fcfbf9] hover:border-[#cfc5ba] hover:bg-[#f8f6f2]'
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

              {/* Actions */}
              <div className="bg-[#faf9f7] p-7 sm:p-10">

                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

                  <div>

                    <p className="font-bold text-[#172033]">
                      Ready to save your changes?
                    </p>

                    <p className="mt-1 max-w-md text-sm leading-6 text-[#697385]">
                      Your updated listing will appear on StudyNook
                      after you save.
                    </p>

                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">

                    <button
                      type="button"
                      onClick={() => navigate('/my-listings')}
                      disabled={saving}
                      className="inline-flex w-full items-center justify-center rounded-full border border-[#d8d0c6] bg-white px-7 py-3.5 text-sm font-bold text-[#667085] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-[#f7f4ef] hover:text-[#172033] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={saving}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#c8875b] px-7 py-3.5 text-sm font-bold text-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-[#b6734d] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                    >
                      {saving
                        ? 'Saving Changes...'
                        : 'Save Changes'}

                      {!saving && <span>→</span>}
                    </button>

                  </div>

                </div>

              </div>

            </form>

          </div>

        </div>

      </section>

      {/* Bottom CTA */}
      <section className="px-6 pb-14 sm:pb-20 lg:px-8">

        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[#172033] px-7 py-10 sm:px-10 sm:py-12">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

            <div className="max-w-2xl">

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e1a56f]">
                Listing management
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Your space, your way.
              </h2>

              <p className="mt-2 text-sm leading-6 text-white/65">
                Once your changes are saved, you can review your
                updated listing from My Listings.
              </p>

            </div>

            <button
              type="button"
              onClick={() => navigate('/my-listings')}
              disabled={saving}
              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-[#78917c] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-[#6b826b] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
            >
              Back to My Listings
              <span>→</span>
            </button>

          </div>

        </div>

      </section>

    </main>
  )
}

export default EditRoom