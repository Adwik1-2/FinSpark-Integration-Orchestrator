import { useLocation } from 'react-router-dom'
import { Bell, Search, ChevronRight } from 'lucide-react'

const breadcrumbMap: Record<string, string[]> = {
  '/dashboard': ['Home', 'Dashboard'],
  '/new-integration': ['Home', 'New Integration'],
  '/api-registry': ['Home', 'API Registry'],
  '/configurations': ['Home', 'Configurations'],
}

export default function Header() {
  const location = useLocation()
  const crumbs = breadcrumbMap[location.pathname] || ['Home']

  return (
    <header className="h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6">
      <nav className="flex items-center gap-1 text-sm">
        {crumbs.map((crumb, i) => (
          <span key={crumb} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="w-3 h-3 text-slate-600" />}
            <span className={i === crumbs.length - 1 ? 'text-white font-medium' : 'text-slate-500'}>
              {crumb}
            </span>
          </span>
        ))}
      </nav>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-slate-800 border border-slate-700 rounded-lg pl-8 pr-4 py-1.5 text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 w-48"
          />
        </div>
        <button className="relative p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
        </button>
      </div>
    </header>
  )
}
