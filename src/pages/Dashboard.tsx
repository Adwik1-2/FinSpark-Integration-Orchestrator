import { Activity, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react'
import MetricCard from '../components/dashboard/MetricCard'
import PipelinesTable from '../components/dashboard/PipelinesTable'

const metrics = [
  { title: 'Active Pipelines', value: 12, change: '3 this week', icon: Activity, color: 'cyan' },
  { title: 'Successful Runs', value: '1,284', change: '98.7% success rate', icon: CheckCircle, color: 'emerald' },
  { title: 'Avg Latency', value: '142ms', change: '12ms faster', icon: TrendingUp, color: 'violet' },
  { title: 'Alerts', value: 3, change: '2 resolved today', icon: AlertTriangle, color: 'amber', positive: false },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">Monitor your integration pipelines</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <MetricCard key={i} {...m} />
        ))}
      </div>
      <PipelinesTable />
    </div>
  )
}
