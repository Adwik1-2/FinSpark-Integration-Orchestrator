import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ExternalLink, CheckCircle, Clock } from 'lucide-react'

const apis = [
  { name: 'Stripe', category: 'Payments', version: 'v3', status: 'active', endpoints: 87, description: 'Payment processing and billing API' },
  { name: 'Plaid', category: 'Banking', version: 'v2', status: 'active', endpoints: 34, description: 'Financial data and bank connectivity' },
  { name: 'Salesforce', category: 'CRM', version: 'v56', status: 'active', endpoints: 120, description: 'CRM and customer data platform' },
  { name: 'QuickBooks', category: 'Accounting', version: 'v3', status: 'active', endpoints: 56, description: 'Accounting and financial management' },
  { name: 'Twilio', category: 'Communications', version: 'v2', status: 'active', endpoints: 45, description: 'SMS, voice, and messaging API' },
  { name: 'HubSpot', category: 'CRM', version: 'v3', status: 'pending', endpoints: 78, description: 'Inbound marketing and sales platform' },
  { name: 'PayPal', category: 'Payments', version: 'v2', status: 'active', endpoints: 62, description: 'Online payment processing' },
  { name: 'NetSuite', category: 'ERP', version: 'v1', status: 'pending', endpoints: 90, description: 'Enterprise resource planning system' },
  { name: 'Xero', category: 'Accounting', version: 'v2', status: 'active', endpoints: 48, description: 'Cloud accounting software' },
]

const categories = ['All', ...Array.from(new Set(apis.map(a => a.category)))]

const categoryColors: Record<string, string> = {
  'Payments': 'bg-emerald-400/10 text-emerald-400',
  'Banking': 'bg-blue-400/10 text-blue-400',
  'CRM': 'bg-violet-400/10 text-violet-400',
  'Accounting': 'bg-amber-400/10 text-amber-400',
  'Communications': 'bg-pink-400/10 text-pink-400',
  'ERP': 'bg-cyan-400/10 text-cyan-400',
}

export default function APIRegistry() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const filtered = apis.filter(
    a => (category === 'All' || a.category === category) &&
    (a.name.toLowerCase().includes(search.toLowerCase()) || a.description.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">API Registry</h1>
          <p className="text-slate-400 text-sm mt-1">Browse and manage connected APIs</p>
        </div>
        <button className="px-4 py-2 bg-cyan-400 text-slate-950 rounded-lg font-semibold text-sm hover:bg-cyan-300 transition-colors">
          + Register API
        </button>
      </div>

      <div className="flex gap-4 flex-wrap items-center">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search APIs..."
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:border-cyan-400/50"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                category === cat ? 'bg-cyan-400/10 border border-cyan-400/30 text-cyan-400' : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((api, i) => (
          <motion.div
            key={api.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-600 transition-colors group"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-white text-lg">{api.name}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[api.category] || 'bg-slate-700 text-slate-400'}`}>
                  {api.category}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {api.status === 'active' ? (
                  <><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                  <CheckCircle className="w-4 h-4 text-emerald-400" /></>
                ) : (
                  <><span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                  <Clock className="w-4 h-4 text-amber-400" /></>
                )}
              </div>
            </div>
            <p className="text-sm text-slate-400 mb-4">{api.description}</p>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-mono bg-slate-800 px-2 py-0.5 rounded">{api.version}</span>
              <span>{api.endpoints} endpoints</span>
              <button className="flex items-center gap-1 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-cyan-300">
                <ExternalLink className="w-3.5 h-3.5" />
                View
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-500">
          <p>No APIs found matching your search.</p>
        </div>
      )}
    </div>
  )
}
