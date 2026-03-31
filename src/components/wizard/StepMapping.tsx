import { useRef } from 'react'
import { motion } from 'framer-motion'
import SVGConnections from '../SVGConnections'

interface StepMappingProps {
  onNext: () => void
  onBack: () => void
}

const sourceFields = [
  { id: 'src-customer_id', name: 'customer_id', type: 'string' },
  { id: 'src-amount', name: 'amount', type: 'number' },
  { id: 'src-currency', name: 'currency', type: 'string' },
  { id: 'src-status', name: 'status', type: 'enum' },
  { id: 'src-created_at', name: 'created_at', type: 'datetime' },
]

const targetFields = [
  { id: 'tgt-contact_id', name: 'contact_id', type: 'string' },
  { id: 'tgt-deal_value', name: 'deal_value', type: 'decimal' },
  { id: 'tgt-currency_code', name: 'currency_code', type: 'string' },
  { id: 'tgt-stage', name: 'stage', type: 'string' },
  { id: 'tgt-close_date', name: 'close_date', type: 'date' },
]

const connections = [
  { fromId: 'src-customer_id', toId: 'tgt-contact_id', confidence: 0.95 },
  { fromId: 'src-amount', toId: 'tgt-deal_value', confidence: 0.88 },
  { fromId: 'src-currency', toId: 'tgt-currency_code', confidence: 0.97 },
  { fromId: 'src-status', toId: 'tgt-stage', confidence: 0.72 },
  { fromId: 'src-created_at', toId: 'tgt-close_date', confidence: 0.65 },
]

function FieldBadge({ type }: { type: string }) {
  const colors: Record<string, string> = {
    string: 'text-cyan-400 bg-cyan-400/10',
    number: 'text-amber-400 bg-amber-400/10',
    decimal: 'text-amber-400 bg-amber-400/10',
    enum: 'text-violet-400 bg-violet-400/10',
    datetime: 'text-emerald-400 bg-emerald-400/10',
    date: 'text-emerald-400 bg-emerald-400/10',
  }
  return (
    <span className={`text-xs px-1.5 py-0.5 rounded font-mono ${colors[type] || 'text-slate-400 bg-slate-700'}`}>
      {type}
    </span>
  )
}

export default function StepMapping({ onNext, onBack }: StepMappingProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Schema Mapping Studio</h2>
        <p className="text-slate-400 text-sm">AI-suggested field mappings with confidence scores</p>
      </div>

      <div ref={containerRef} className="relative grid grid-cols-2 gap-16 bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        <SVGConnections connections={connections} containerRef={containerRef as React.RefObject<HTMLDivElement>} />

        <div className="space-y-3">
          <h3 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-4">Source (Stripe)</h3>
          {sourceFields.map((f, i) => (
            <motion.div
              key={f.id}
              id={f.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center justify-between bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5"
            >
              <span className="text-sm text-slate-200 font-mono">{f.name}</span>
              <FieldBadge type={f.type} />
            </motion.div>
          ))}
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-4">Target (Salesforce)</h3>
          {targetFields.map((f, i) => (
            <motion.div
              key={f.id}
              id={f.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center justify-between bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5"
            >
              <FieldBadge type={f.type} />
              <span className="text-sm text-slate-200 font-mono">{f.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {connections.map((c, i) => (
          <div key={i} className="bg-slate-800 rounded-lg p-2 text-center border border-slate-700">
            <p className="text-xs text-slate-500 mb-0.5">Confidence</p>
            <p className={`text-sm font-bold ${c.confidence > 0.8 ? 'text-emerald-400' : c.confidence > 0.6 ? 'text-amber-400' : 'text-red-400'}`}>
              {Math.round(c.confidence * 100)}%
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <button onClick={onBack} className="px-4 py-2.5 text-slate-400 hover:text-white text-sm transition-colors">
          ← Back
        </button>
        <button onClick={onNext} className="px-6 py-2.5 bg-cyan-400 text-slate-950 rounded-lg font-semibold text-sm hover:bg-cyan-300 transition-colors">
          Simulate & Deploy →
        </button>
      </div>
    </div>
  )
}
