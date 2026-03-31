import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Plus, Database, Settings, Zap } from 'lucide-react'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/new-integration', icon: Plus, label: 'New Integration' },
  { to: '/api-registry', icon: Database, label: 'API Registry' },
  { to: '/configurations', icon: Settings, label: 'Configurations' },
]

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-400 flex items-center justify-center">
            <Zap className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white">FinSpark</h1>
            <p className="text-xs text-slate-500">Integration Orchestrator</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`
            }
          >
            <Icon className="w-4 h-4" />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-2 px-3 py-2">
          <div className="w-6 h-6 rounded-full bg-cyan-400/20 flex items-center justify-center">
            <span className="text-xs text-cyan-400 font-bold">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-slate-300 truncate">Admin User</p>
            <p className="text-xs text-slate-500 truncate">admin@finspark.io</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
