export default function FilterBar({ onFilterChange }) {
  const handle = (e) => {
    const { name, value } = e.target
    onFilterChange(prev => ({ ...prev, [name]: value }))
  }
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <input name="search" onChange={handle} placeholder="Search property, guest or text..." className="p-2 rounded-lg border w-full md:w-1/2" />
      <select name="channel" onChange={handle} className="p-2 rounded-lg border">
        <option value="">All channels</option>
        <option>Airbnb</option>
        <option>Booking.com</option>
      </select>
      <select name="category" onChange={handle} className="p-2 rounded-lg border">
        <option value="">All categories</option>
        <option value="cleanliness">Cleanliness</option>
        <option value="location">Location</option>
        <option value="communication">Communication</option>
      </select>
      <input type="number" name="rating" onChange={handle} placeholder="Min rating" className="p-2 rounded-lg border w-28" />
    </div>
  )
}
