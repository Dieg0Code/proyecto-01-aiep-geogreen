import { NavLink, Outlet } from 'react-router-dom'
import { Map, List, Bell, RefreshCw } from 'lucide-react'
import { useAlertas, useContenedores } from '@/hooks/useTelemetry'
import { tiempoRelativo } from '@/lib/format'
import { cn } from '@/lib/utils'
import { Brand } from './Brand'

const NAV = [
  { to: '/', label: 'Mapa', icon: Map, end: true },
  { to: '/lista', label: 'Lista', icon: List, end: false },
  { to: '/alertas', label: 'Alertas', icon: Bell, end: false },
] as const

export function AppLayout() {
  const { data: alertas = [] } = useAlertas()
  const { dataUpdatedAt } = useContenedores()
  const nAlertas = alertas.length

  return (
    <div className="flex h-full">
      {/* Sidebar — desktop */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-line/70 bg-white/50 px-4 py-6 md:flex">
        <Brand className="px-2" />
        <nav className="mt-8 flex flex-col gap-1">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive ? 'bg-navy text-paper shadow-card' : 'text-slate hover:bg-soft-neutral hover:text-ink',
                )
              }
            >
              <Icon size={18} />
              {label}
              {to === '/alertas' && nAlertas > 0 && (
                <span className="ml-auto grid h-5 min-w-5 place-items-center rounded-full bg-red px-1.5 text-xs font-bold text-white">
                  {nAlertas}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
        {dataUpdatedAt > 0 && (
          <p className="mt-auto flex items-center gap-1.5 px-2 text-xs text-guide">
            <RefreshCw size={12} />
            Actualizado {tiempoRelativo(new Date(dataUpdatedAt).toISOString())}
          </p>
        )}
      </aside>

      {/* Contenido */}
      <main className="relative flex-1 overflow-hidden">
        <Outlet />

        {/* Bottom nav — móvil */}
        <nav className="absolute inset-x-0 bottom-0 z-[900] flex border-t border-line/70 bg-paper/95 backdrop-blur-sm md:hidden">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  'relative flex flex-1 flex-col items-center gap-0.5 py-2.5 text-xs font-medium transition-colors',
                  isActive ? 'text-navy' : 'text-slate',
                )
              }
            >
              <Icon size={20} />
              {label}
              {to === '/alertas' && nAlertas > 0 && (
                <span className="absolute right-[28%] top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-red px-1 text-[0.6rem] font-bold text-white">
                  {nAlertas}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </main>
    </div>
  )
}
