import { motion } from 'framer-motion'
import { CheckCircle, Clock, AlertCircle, XCircle } from 'lucide-react'

interface Pipeline {
  id: string
  name: string
  source: string
  target: string
  status: 'active' | 'pending' | 'error' | 'inactive'
  lastRun: string
  uptime: string
}

const pipelines: Pipeline[] = [
  { id: '1', name: 'Stripe → Salesforce', source: 'Stripe API', target: 'Salesforce CRM', status: 'active', lastRun: '2 min ago', uptime: '99.8%' },
  { id: '2', name: 'Plaid → QuickBooks', source: 'Plaid Banking', target: 'QuickBooks', status: 'active', lastRun: '5 min ago', uptime: '99.2%' },
  { id: '3', name: 'Twilio → HubSpot', source: 'Twilio SMS', target: 'HubSpot CRM', status: 'pending', lastRun: '12 min ago', uptime: '97.5%' },
  { id: '4', name: 'PayPal → NetSuite', source: 'PayPal Payments', target: 'NetSuite ERP', status: 'error', lastRun: '1 hr ago', uptime: '95.1%' },
  { id: '5', name: 'Braintree → Xero', source: 'Braintree', target: 'Xero Accounting', status: 'inactive', lastRun: '3 hr ago', uptime: '98.9%' },
]

const statusConfig = {
  active: { icon: CheckCircle, class: 'text-emerald-400', label: 'Active', dot: 'bg-emerald-400' },
  pending: { icon: Clock, class: 'text-amber-400', label: 'Pending', dot: 'bg-amber-400' },
  error: { icon: AlertCircle, class: 'text-red-400', label: 'Error', dot: 'bg-red-400' },
  inactive: { icon: XCircle, class: 'text-slate-500', label: 'Inactive', dot: 'bg-slate-500' },
}

export default function PipelinesTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden"
    >
      <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
        <h2 className="font-semibold text-white">Active Pipelines</h2>
        <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded-full">{pipelines.length} total</span>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-800">
            <th className="px-6 py-3 text-left text-xs text-slate-500 font-medium">Pipeline</th>
            <th className="px-6 py-3 text-left text-xs text-slate-500 font-medium">Source → Target</th>
            <th className="px-6 py-3 text-left text-xs text-slate-500 font-medium">Status</th>
            <th className="px-6 py-3 text-left text-xs text-slate-500 font-medium">Last Run</th>
            <th className="px-6 py-3 text-left text-xs text-slate-500 font-medium">Uptime</th>
          </tr>
        </thead>
        <tbody>
          {pipelines.map((p, i) => {
            const cfg = statusConfig[p.status]
            const StatusIcon = cfg.icon
            return (
              <motion.tr
                key={p.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-white">{p.name}</td>
                <td className="px-6 py-4 text-slate-400">
                  <span className="text-slate-300">{p.source}</span>
                  <span className="text-slate-600 mx-2">→</span>
                  <span className="text-slate-300">{p.target}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`flex items-center gap-1.5 ${cfg.class}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} ${p.status === 'active' ? 'animate-pulse' : ''}`}></span>
                    <StatusIcon className="w-3.5 h-3.5" />
                    {cfg.label}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-400">{p.lastRun}</td>
                <td className="px-6 py-4">
                  <span className={`font-medium ${parseFloat(p.uptime) > 99 ? 'text-emerald-400' : parseFloat(p.uptime) > 97 ? 'text-amber-400' : 'text-red-400'}`}>
                    {p.uptime}
                  </span>
                </td>
              </motion.tr>
            )
          })}
        </tbody>
      </table>
    </motion.div>
  )
}
