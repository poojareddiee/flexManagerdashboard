import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function PropertyPage() {
  const router = useRouter()
  const { id } = router.query
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    if (!id) return
    fetch('http://localhost:5000/api/reviews/hostaway?search=' + encodeURIComponent(id))
      .then(r=>r.json()).then(d=> setReviews(d.data || []))
  }, [id])

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="h-44 rounded-xl overflow-hidden mb-6" style={{background: 'linear-gradient(90deg,#7c3aed,#ec4899)'}}>
        <div className="p-6 text-white">
          <h1 className="text-2xl font-bold">Property — {id}</h1>
          <p className="mt-1 opacity-90">Approved reviews are shown below.</p>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.filter(r=>r.approved).map(r => (
          <div key={r.id} className="card">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{r.property}</h3>
                <div className="text-sm text-gray-600">By {r.reviewer} — {new Date(r.submittedAt).toLocaleDateString()}</div>
                <p className="mt-2">{r.reviewText}</p>
              </div>
              <div className="text-right">{r.rating} / 10</div>
            </div>
          </div>
        ))}
        {reviews.filter(r=>r.approved).length === 0 && <div className="card">No approved reviews for this property.</div>}
      </div>
    </div>
  )
}
