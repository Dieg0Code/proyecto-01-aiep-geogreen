import { NavLink, Outlet } from 'react-router-dom'
import { Bell, Boxes, Map, RefreshCw } from 'lucide-react'
import { useAlertas, useContenedores } from '@/hooks/useTelemetry'
import { tiempoRelativo } from '@/lib/format'
import { cn } from '@/lib/utils'
import { Brand } from './Brand'

const NAV = [
  { to: '/', label: 'Mapa', icon: Map, end: true },
  { to: '/lista', label: 'Contenedores', icon: Boxes, end: false },
  { to: '/alertas', label: 'Alertas', icon: Bell, end: false },
] as const

export function AppLayout() {
  const { data: alertas = [] } = useAlertas()
  const { dataUpdatedAt } = useContenedores()
  const nAlertas = alertas.length

  return (
    <div className="flex h-full">
      {/* Sidebar — desktop */}
      <aside className="hidden w-48 shrink-0 flex-col bg-navy text-white md:flex">
        <div className="border-b border-white/10 px-5 py-[1.15rem]">
          <Brand inverted />
          <p className="mt-1.5 pl-[2.35rem] text-[0.6rem] font-medium uppercase tracking-[0.16em] text-white/38">Osorno</p>
        </div>
        <nav className="mt-5 flex flex-col">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  'focus-ring relative flex h-11 items-center gap-3 border-l-2 px-[1.15rem] text-sm transition-colors focus-visible:ring-offset-navy',
                  isActive
                    ? 'border-white bg-white/8 font-semibold text-white'
                    : 'border-transparent font-normal text-white/55 hover:bg-white/5 hover:text-white/85',
                )
              }
            >
              <Icon size={18} />
              {label}
              {to === '/alertas' && nAlertas > 0 && (
                <span className="ml-auto grid h-5 min-w-5 place-items-center rounded-sm bg-red px-1.5 font-mono text-[0.65rem] font-semibold text-white">
                  {nAlertas}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
        {dataUpdatedAt > 0 && (
          <div className="mx-5 mt-auto border-t border-white/10 py-4">
            <p className="flex items-center gap-2 text-xs text-white/65">
              <span className="h-1.5 w-1.5 rounded-full bg-verde" /> Sistema conectado
            </p>
            <p className="mt-1.5 flex items-center gap-1.5 text-[0.66rem] text-white/35">
              <RefreshCw size={11} />
              Actualizado {tiempoRelativo(new Date(dataUpdatedAt).toISOString())}
            </p>
          </div>
        )}
      </aside>

      {/* Contenido */}
      <main className="relative flex-1 overflow-hidden">
        <Outlet />

        {/* Bottom nav — móvil */}
        <nav className="absolute inset-x-0 bottom-0 z-[900] flex border-t border-line bg-white/95 shadow-[0_-8px_30px_-18px_rgba(7,29,51,0.32)] backdrop-blur-md md:hidden">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  'focus-ring relative flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 text-xs font-medium transition-colors',
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
