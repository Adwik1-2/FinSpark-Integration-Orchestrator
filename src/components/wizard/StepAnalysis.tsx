import { motion } from 'framer-motion'
import { CheckCircle, Code, Globe, Shield } from 'lucide-react'

interface StepAnalysisProps {
  onNext: () => void
  onBack: () => void
}

const analysisResults = [
  { icon: Globe, label: 'API Type', value: 'REST API v2.3', status: 'success' },
  { icon: Shield, label: 'Auth Method', value: 'Bearer Token (OAuth 2.0)', status: 'success' },
  { icon: Code, label: 'Endpoints Found', value: '47 endpoints detected', status: 'success' },
]

const fields = [
  { name: 'customer_id', type: 'string', description: 'Unique customer identifier' },
  { name: 'amount', type: 'number', description: 'Transaction amount in cents' },
  { name: 'currency', type: 'string', description: 'ISO 4217 currency code' },
  { name: 'status', type: 'enum', description: 'Payment status' },
  { name: 'created_at', type: 'datetime', description: 'Creation timestamp' },
  { name: 'metadata', type: 'object', description: 'Additional key-value data' },
]

export default function StepAnalysis({ onNext, onBack }: StepAnalysisProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">AI Analysis Results</h2>
        <p className="text-slate-400 text-sm">Review the extracted schema and API details</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {analysisResults.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-slate-800 rounded-xl p-4 border border-slate-700"
          >
            <div className="flex items-center gap-2 mb-2">
              <item.icon className="w-4 h-4 text-cyan-400" />
              <span className="text-xs text-slate-500">{item.label}</span>
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 ml-auto" />
            </div>
            <p className="text-sm font-medium text-white">{item.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-700 flex items-center justify-between">
          <h3 className="text-sm font-medium text-white">Extracted Schema Fields</h3>
          <span className="text-xs bg-cyan-400/10 text-cyan-400 px-2 py-0.5 rounded-full">{fields.length} fields</span>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="px-4 py-2 text-left text-xs text-slate-500">Field Name</th>
              <th className="px-4 py-2 text-left text-xs text-slate-500">Type</th>
              <th className="px-4 py-2 text-left text-xs text-slate-500">Description</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((f, i) => (
              <motion.tr
                key={f.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="border-b border-slate-700/50 hover:bg-slate-700/30"
              >
                <td className="px-4 py-2.5 font-mono text-cyan-400 text-xs">{f.name}</td>
                <td className="px-4 py-2.5">
                  <span className="px-1.5 py-0.5 bg-violet-400/10 text-violet-400 rounded text-xs font-mono">{f.type}</span>
                </td>
                <td className="px-4 py-2.5 text-slate-400">{f.description}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between">
        <button onClick={onBack} className="px-4 py-2.5 text-slate-400 hover:text-white text-sm transition-colors">
          ← Back
        </button>
        <button onClick={onNext} className="px-6 py-2.5 bg-cyan-400 text-slate-950 rounded-lg font-semibold text-sm hover:bg-cyan-300 transition-colors">
          Proceed to Mapping →
        </button>
      </div>
    </div>
  )
}
