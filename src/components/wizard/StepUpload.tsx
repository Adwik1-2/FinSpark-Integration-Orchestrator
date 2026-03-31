import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, FileText, X, Scan } from 'lucide-react'

interface StepUploadProps {
  onNext: () => void
}

export default function StepUpload({ onNext }: StepUploadProps) {
  const [files, setFiles] = useState<File[]>([])
  const [dragging, setDragging] = useState(false)
  const [scanning, setScanning] = useState(false)

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const dropped = Array.from(e.dataTransfer.files)
    setFiles(prev => [...prev, ...dropped])
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(prev => [...prev, ...Array.from(e.target.files!)])
    }
  }

  const handleAnalyze = () => {
    setScanning(true)
    setTimeout(() => {
      setScanning(false)
      onNext()
    }, 2500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Upload API Documentation</h2>
        <p className="text-slate-400 text-sm">Upload PDF, YAML, JSON, or Swagger files for AI analysis</p>
      </div>

      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
          dragging ? 'border-cyan-400 bg-cyan-400/5' : 'border-slate-700 hover:border-slate-600'
        }`}
      >
        <Upload className="w-10 h-10 mx-auto mb-4 text-slate-500" />
        <p className="text-white font-medium mb-1">Drop files here</p>
        <p className="text-slate-500 text-sm mb-4">or click to browse</p>
        <label className="px-4 py-2 bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 rounded-lg text-sm cursor-pointer hover:bg-cyan-400/20 transition-colors">
          Browse Files
          <input type="file" multiple className="hidden" onChange={handleFileInput} accept=".pdf,.yaml,.yml,.json" />
        </label>
      </div>

      <AnimatePresence>
        {files.map((file, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-3 bg-slate-800 rounded-lg px-4 py-3"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span className="flex-1 text-sm text-slate-300 truncate">{file.name}</span>
            <span className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB</span>
            <button onClick={() => setFiles(prev => prev.filter((_, j) => j !== i))} className="text-slate-500 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>

      {files.length === 0 && (
        <button
          onClick={() => {
            setFiles([{ name: 'stripe-api-v2.yaml', size: 45230 } as File])
          }}
          className="text-xs text-slate-600 hover:text-slate-500 underline"
        >
          Use sample file for demo
        </button>
      )}

      <AnimatePresence>
        {scanning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 bg-slate-800 border border-cyan-400/20 rounded-lg px-4 py-3"
          >
            <Scan className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-sm text-cyan-400">AI scanning documents...</span>
            <div className="flex-1 bg-slate-700 rounded-full h-1.5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.5, ease: 'easeInOut' }}
                className="h-full bg-cyan-400 rounded-full"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-end">
        <button
          onClick={handleAnalyze}
          disabled={files.length === 0 || scanning}
          className="px-6 py-2.5 bg-cyan-400 text-slate-950 rounded-lg font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-cyan-300 transition-colors"
        >
          Analyze Documents
        </button>
      </div>
    </div>
  )
}
