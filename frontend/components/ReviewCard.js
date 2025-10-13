import { motion } from 'framer-motion'

function ratingColor(r) {
  if (r >= 8) return 'bg-green-100 text-green-800'
  if (r >= 5) return 'bg-yellow-100 text-yellow-800'
  return 'bg-red-100 text-red-800'
}

export default function ReviewCard({ review }) {
  return (
    <motion.div whileHover={{ y: -6 }} className="card">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{review.property}</h3>
          <div className="text-sm text-gray-600">By {review.reviewer} — {new Date(review.submittedAt).toLocaleDateString()}</div>
          <p className="mt-2 text-gray-800">{review.reviewText}</p>
          <div className="mt-3 flex gap-2 text-sm">
            {review.categories.map(c=> (
              <span key={c.category} className="px-2 py-1 rounded-full bg-indigo-50 text-indigo-700">{c.category}</span>
            ))}
          </div>
        </div>
        <div className="text-right space-y-2">
          <div className={`px-3 py-1 rounded-full font-semibold ${ratingColor(review.rating)}`}>{review.rating || '—'}/10</div>
          <div className="text-sm text-gray-500">{review.channel}</div>
        </div>
      </div>
    </motion.div>
  )
}
