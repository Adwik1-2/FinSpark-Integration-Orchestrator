import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, GitMerge, Rocket, CheckCircle } from 'lucide-react'
import Confetti from '../Confetti'

interface StepSimulateProps {
  onBack: () => void
}

const mockLogs = [
  { time: '09:31:01', level: 'INFO', msg: 'Initializing integration pipeline...' },
  { time: '09:31:02', level: 'INFO', msg: 'Connecting to Stripe API v2.3...' },
  { time: '09:31:02', level: 'SUCCESS', msg: 'Stripe connection established' },
  { time: '09:31:03', level: 'INFO', msg: 'Authenticating with Salesforce OAuth...' },
  { time: '09:31:04', level: 'SUCCESS', msg: 'Salesforce auth token received' },
  { time: '09:31:05', level: 'INFO', msg: 'Running schema validation...' },
  { time: '09:31:06', level: 'INFO', msg: 'Field mapping: customer_id → contact_id ✓' },
  { time: '09:31:06', level: 'INFO', msg: 'Field mapping: amount → deal_value ✓' },
  { time: '09:31:07', level: 'WARN', msg: 'Type coercion needed: datetime → date' },
  { time: '09:31:08', level: 'INFO', msg: 'Simulating 100 test records...' },
  { time: '09:31:10', level: 'SUCCESS', msg: '100/100 records processed successfully' },
  { time: '09:31:11', level: 'SUCCESS', msg: 'All validations passed. Ready to deploy!' },
]

const diffLines = [
  { type: 'context', content: '  integration:' },
  { type: 'added', content: '+   name: stripe-salesforce-prod' },
  { type: 'added', content: '+   version: "1.0.0"' },
  { type: 'removed', content: '-   name: stripe-salesforce-dev' },
  { type: 'context', content: '  source:' },
  { type: 'context', content: '    api: stripe' },
  { type: 'added', content: '+   endpoint: /v1/charges' },
]

export default function StepSimulate({ onBack }: StepSimulateProps) {
  const [visibleLogs, setVisibleLogs] = useState<typeof mockLogs>([])
  const [simulating, setSimulating] = useState(false)
  const [deployed, setDeployed] = useState(false)
  const [tab, setTab] = useState<'console' | 'diff'>('console')

  const startSimulation = () => {
    setSimulating(true)
    setVisibleLogs([])
    mockLogs.forEach((log, i) => {
      setTimeout(() => {
        setVisibleLogs(prev => [...prev, log])
        if (i === mockLogs.length - 1) setSimulating(false)
      }, i * 300)
    })
  }

  const handleDeploy = () => {
    setDeployed(true)
    setTimeout(() => setDeployed(false), 5000)
  }

  const levelColors: Record<string, string> = {
    INFO: 'text-slate-400',
    SUCCESS: 'text-emerald-400',
    WARN: 'text-amber-400',
    ERROR: 'text-red-400',
  }

  return (
    <div className="space-y-6">
      {deployed && <Confetti />}

      <div>
        <h2 className="text-xl font-bold text-white mb-1">Simulation & Deployment</h2>
        <p className="text-slate-400 text-sm">Test your integration and deploy to production</p>
      </div>

      <div className="flex gap-2 border-b border-slate-700">
        {(['console', 'diff'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex items-center gap-2 px-4 py-2 text-sm border-b-2 -mb-px transition-colors ${
              tab === t ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-500 hover:text-white'
            }`}
          >
            {t === 'console' ? <Terminal className="w-3.5 h-3.5" /> : <GitMerge className="w-3.5 h-3.5" />}
            {t === 'console' ? 'Simulation Console' : 'Config Diff'}
          </button>
        ))}
      </div>

      {tab === 'console' && (
        <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-amber-500/60" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
            </div>
            <span className="text-xs text-slate-500 font-mono">simulation.log</span>
          </div>
          <div className="p-4 font-mono text-xs space-y-1 min-h-[200px] max-h-[280px] overflow-y-auto">
            <AnimatePresence>
              {visibleLogs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex gap-3"
                >
                  <span className="text-slate-600">{log.time}</span>
                  <span className={`w-14 ${levelColors[log.level]}`}>[{log.level}]</span>
                  <span className="text-slate-300">{log.msg}</span>
                </motion.div>
              ))}
            </AnimatePresence>
            {simulating && (
              <div className="flex gap-1 mt-2">
                <span className="text-cyan-400 animate-pulse">▊</span>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === 'diff' && (
        <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
          <div className="px-4 py-2 border-b border-slate-800 bg-slate-900">
            <span className="text-xs text-slate-500 font-mono">integration.config.yaml</span>
          </div>
          <div className="p-4 font-mono text-xs space-y-0.5">
            {diffLines.map((line, i) => (
              <div
                key={i}
                className={`px-2 py-0.5 rounded ${
                  line.type === 'added' ? 'bg-emerald-900/30 text-emerald-400' :
                  line.type === 'removed' ? 'bg-red-900/30 text-red-400' :
                  'text-slate-400'
                }`}
              >
                {line.content}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <button onClick={onBack} className="px-4 py-2.5 text-slate-400 hover:text-white text-sm transition-colors">
          ← Back
        </button>
        <div className="flex gap-3">
          <button
            onClick={startSimulation}
            disabled={simulating}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm transition-colors disabled:opacity-50"
          >
            <Terminal className="w-4 h-4 text-cyan-400" />
            {simulating ? 'Running...' : 'Run Simulation'}
          </button>
          <button
            onClick={handleDeploy}
            disabled={visibleLogs.length === 0 || simulating}
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-lg font-semibold text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {deployed ? <CheckCircle className="w-4 h-4" /> : <Rocket className="w-4 h-4" />}
            {deployed ? 'Deployed!' : 'Deploy to Production'}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {deployed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="bg-emerald-900/30 border border-emerald-500/30 rounded-xl p-4 flex items-center gap-3"
          >
            <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0" />
            <div>
              <p className="font-semibold text-emerald-400">Successfully Deployed! 🎉</p>
              <p className="text-sm text-slate-400">Your integration is now live in production.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
