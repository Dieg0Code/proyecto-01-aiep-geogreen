import type { Filtro, ResumenFlota } from '@/lib/resumen'
import { cn } from '@/lib/utils'

interface KpiDef {
  filtro: Filtro
  label: string
  valor: number
  dot?: string
}

interface KpiBarProps {
  resumen: ResumenFlota
  filtro: Filtro
  onFiltro: (f: Filtro) => void
}

/** Fila de KPIs que además actúan como filtros del mapa. */
export function KpiBar({ resumen, filtro, onFiltro }: KpiBarProps) {
  const kpis: KpiDef[] = [
    { filtro: 'todos', label: 'Total', valor: resumen.total },
    { filtro: 'lleno', label: 'Llenos', valor: resumen.llenos, dot: '#D62027' },
    { filtro: 'medio', label: 'Medios', valor: resumen.medios, dot: '#E0BC5A' },
    { filtro: 'bajo', label: 'Bajos', valor: resumen.bajos, dot: '#3FAE6A' },
    { filtro: 'bateria', label: 'Batería baja', valor: resumen.bateriaBaja, dot: '#b08a1f' },
    { filtro: 'offline', label: 'Sin señal', valor: resumen.offline, dot: '#96A3B2' },
  ]

  return (
    <div className="flex gap-2 overflow-x-auto scroll-slim pb-1">
      {kpis.map((k) => {
        const activo = filtro === k.filtro
        return (
          <button
            key={k.filtro}
            onClick={() => onFiltro(activo && k.filtro !== 'todos' ? 'todos' : k.filtro)}
            className={cn(
              'group flex min-w-[5.25rem] shrink-0 flex-col items-start rounded-xl border px-3 py-2 text-left transition-all duration-200',
              activo
                ? 'border-navy bg-navy text-paper shadow-card'
                : 'border-line/70 bg-white/80 text-ink hover:border-navy/40 hover:bg-white',
            )}
          >
            <span className="flex items-center gap-1.5">
              {k.dot && (
                <span
                  className={cn('h-1.5 w-1.5 rounded-full', activo && 'ring-2 ring-paper/40')}
                  style={{ background: k.dot }}
                />
              )}
              <span className="font-mono text-xl font-semibold tabular leading-none">{k.valor}</span>
            </span>
            <span
              className={cn(
                'mt-1 text-[0.7rem] font-medium uppercase tracking-wide',
                activo ? 'text-paper/70' : 'text-slate',
              )}
            >
              {k.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
