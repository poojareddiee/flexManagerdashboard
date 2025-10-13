import { useEffect, useState, useMemo } from 'react'
import FilterBar from '../components/FilterBar'
import ReviewCard from '../components/ReviewCard'
import RatingChart from '../components/RatingChart'

export default function Dashboard() {
  const [reviews, setReviews] = useState([])
  const [filters, setFilters] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const q = new URLSearchParams(filters).toString()
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/hostaway?${q}`)
      .then(r => r.json())
      .then(d => setReviews(d.data || []))
      .finally(() => setLoading(false))
  }, [filters])

  const avgByProperty = useMemo(() => {
    const map = {}
    reviews.forEach(r => {
      if (!map[r.property]) map[r.property] = { total:0, count:0 }
      map[r.property].total += (r.rating || 0)
      map[r.property].count += 1
    })
    return Object.keys(map).map(k => ({ name: k, avg: +(map[k].total / map[k].count).toFixed(2) }))
  }, [reviews])

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-4 text-indigo-700">Flex Living — Reviews Dashboard</h1>
      <FilterBar onFilterChange={setFilters} />
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loading ? <div className="p-6 card">Loading...</div> :
              reviews.map(r => <ReviewCard key={r.id} review={r} onToggle={() => { /* no-op for mock */ }} />)
            }
          </div>
        </div>

        <aside className="space-y-4">
          <div className="card">
            <h3 className="font-semibold text-lg">Average Rating (by property)</h3>
            <RatingChart data={avgByProperty} />
          </div>

          <div className="card">
            <h3 className="font-semibold text-lg mb-2">Quick Stats</h3>
            <div className="text-sm text-gray-700">Total reviews: <strong>{reviews.length}</strong></div>
            <div className="text-sm text-gray-700 mt-1">Approved: <strong>{reviews.filter(r=>r.approved).length}</strong></div>
          </div>
        </aside>
      </div>
    </div>
  )
}
