import type { Filtro, ResumenFlota } from '@/lib/resumen'
import { cn } from '@/lib/utils'

interface KpiBarProps {
  resumen: ResumenFlota
  filtro: Filtro
  onFiltro: (f: Filtro) => void
}

interface Indicador {
  filtro: Filtro
  label: string
  shortLabel: string
  valor: number
  color: string
}

/** Banda compacta de estado; cada celda filtra la flota. */
export function KpiBar({ resumen, filtro, onFiltro }: KpiBarProps) {
  const indicadores: Indicador[] = [
    { filtro: 'todos', label: 'Total', shortLabel: 'Total', valor: resumen.total, color: '#071D33' },
    { filtro: 'lleno', label: 'Para retiro', shortLabel: 'Retiro', valor: resumen.llenos, color: '#D62027' },
    { filtro: 'medio', label: 'En vigilancia', shortLabel: 'Vigilar', valor: resumen.medios, color: '#C59A31' },
    { filtro: 'bajo', label: 'Disponibles', shortLabel: 'Libres', valor: resumen.bajos, color: '#319966' },
    { filtro: 'bateria', label: 'Batería baja', shortLabel: 'Batería', valor: resumen.bateriaBaja, color: '#8D6C20' },
    { filtro: 'offline', label: 'Sin señal', shortLabel: 'Sin señal', valor: resumen.offline, color: '#748493' },
  ]

  return (
    <div className="grid grid-cols-3 border-t border-line bg-white sm:grid-cols-6">
      {indicadores.map((item, index) => {
        const activo = filtro === item.filtro
        return (
          <button
            key={item.filtro}
            onClick={() => onFiltro(activo && item.filtro !== 'todos' ? 'todos' : item.filtro)}
            className={cn(
              'focus-ring relative flex h-[3.65rem] min-w-0 items-center gap-2.5 border-l border-line px-3 text-left transition-colors first:border-l-0 sm:h-[3.4rem] sm:px-4',
              index >= 3 && 'border-t sm:border-t-0',
              activo ? 'bg-[#EDF1F3]' : 'hover:bg-mist',
            )}
          >
            <span className="h-5 w-[2px] shrink-0" style={{ background: item.color }} />
            <span className="min-w-0">
              <strong className="block font-mono text-lg font-semibold leading-none tabular text-navy">{item.valor}</strong>
              <span className="mt-1 block truncate text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-slate">
                <span className="sm:hidden lg:inline">{item.label}</span>
                <span className="hidden sm:inline lg:hidden">{item.shortLabel}</span>
              </span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
