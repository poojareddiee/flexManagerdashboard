import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

export default function RatingChart({ data }) {
  if (!data || data.length === 0) return <div className="text-sm text-gray-600">No data</div>
  return (
    <div style={{ width: '100%', height: 200 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis domain={[0, 10]} />
          <Tooltip />
          <Bar dataKey="avg" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
