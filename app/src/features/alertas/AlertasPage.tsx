import { useMemo, useState } from 'react'
import { BatteryWarning, CheckCircle2, ChevronRight, RadioTower, ShieldAlert, Trash2 } from 'lucide-react'
import type { Alerta, TipoAlerta } from '@/lib/types'
import { ALERTA_META } from '@/lib/status'
import { tiempoRelativo } from '@/lib/format'
import { useAlertas } from '@/hooks/useTelemetry'
import { LazyContainerDetail } from '@/components/LazyContainerDetail'
import { Sheet, SheetDescription, SheetTitle } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const ICONO: Record<TipoAlerta, typeof Trash2> = {
  lleno: Trash2,
  'bateria-baja': BatteryWarning,
  'sin-senal': RadioTower,
}

function GrupoAlertas({ titulo, descripcion, alertas, onSelect }: { titulo: string; descripcion: string; alertas: Alerta[]; onSelect: (id: string) => void }) {
  if (alertas.length === 0) return null
  return (
    <section>
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-navy">{titulo}</h2>
          <p className="mt-0.5 text-xs text-slate">{descripcion}</p>
        </div>
        <span className="font-mono text-xs font-semibold tabular text-guide">{alertas.length}</span>
      </div>
      <ul className="overflow-hidden rounded-lg border border-line bg-white shadow-card">
        {alertas.map((a, index) => {
          const meta = ALERTA_META[a.tipo]
          const Icon = ICONO[a.tipo]
          return (
            <li key={a.id} className={cn(index > 0 && 'border-t border-line')}>
              <button onClick={() => onSelect(a.contenedorId)} className="focus-ring group flex w-full items-center gap-4 px-4 py-4 text-left transition-colors hover:bg-mist sm:px-5">
                <span className={cn('grid h-10 w-10 shrink-0 place-items-center rounded-md', meta.bg, meta.fg)}><Icon size={18} /></span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                    <p className={cn('text-sm font-bold', meta.fg)}>{meta.label}</p>
                    <span className="font-mono text-[0.65rem] text-guide">{a.contenedorId}</span>
                  </div>
                  <p className="mt-0.5 truncate text-sm font-semibold text-navy">{a.contenedorNombre}</p>
                  <p className="mt-1 text-xs text-slate">{a.sector} · {meta.descripcion}</p>
                </div>
                <div className="hidden shrink-0 text-right sm:block">
                  <p className="text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-guide">Activo desde</p>
                  <p className="mt-1 text-xs font-semibold text-slate">{tiempoRelativo(a.desde)}</p>
                </div>
                <ChevronRight size={18} className="shrink-0 text-guide transition-transform group-hover:translate-x-0.5" />
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export function AlertasPage() {
  const { data: alertas = [] } = useAlertas()
  const [selectedId, setSelectedId] = useState<string>()
  const operacionales = useMemo(() => alertas.filter((a) => a.tipo === 'lleno'), [alertas])
  const dispositivos = useMemo(() => alertas.filter((a) => a.tipo !== 'lleno'), [alertas])

  return (
    <div className="h-full overflow-y-auto scroll-slim pb-20 md:pb-8">
      <div className="mx-auto max-w-5xl px-4 pb-8 pt-7 sm:px-7 lg:px-9">
        <header className="mb-7 flex flex-col justify-between gap-4 border-b border-line pb-5 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-semibold tracking-[-0.035em] text-navy">Alertas</h1>
            <p className="mt-1.5 text-sm text-slate">Eventos que requieren atención en la red.</p>
          </div>
          <div className="flex items-center gap-3 border-l-2 border-red px-4 py-1">
            <ShieldAlert size={19} className={alertas.length > 0 ? 'text-red' : 'text-verde'} />
            <div>
              <strong className="font-mono text-xl font-semibold tabular text-navy">{alertas.length}</strong>
              <span className="ml-2 text-xs font-semibold uppercase tracking-[0.09em] text-guide">activas</span>
            </div>
          </div>
        </header>

        {alertas.length === 0 ? (
          <div className="mt-12 flex flex-col items-center rounded-lg border border-line bg-white px-6 py-16 text-center shadow-card">
            <span className="grid h-12 w-12 place-items-center rounded-md bg-verde-soft text-verde"><CheckCircle2 size={25} /></span>
            <p className="mt-4 text-lg font-bold text-navy">Operación normal</p>
            <p className="mt-1 max-w-sm text-sm text-slate">La red no presenta eventos que requieran atención.</p>
          </div>
        ) : (
          <div className="space-y-8">
            <GrupoAlertas titulo="Atención operacional" descripcion="Contenedores que alcanzaron el umbral de retiro." alertas={operacionales} onSelect={setSelectedId} />
            <GrupoAlertas titulo="Estado de dispositivos" descripcion="Conectividad y alimentación de los módulos desplegados." alertas={dispositivos} onSelect={setSelectedId} />
          </div>
        )}
      </div>

      <Sheet open={Boolean(selectedId)} onOpenChange={(o) => !o && setSelectedId(undefined)}>
        <SheetTitle className="sr-only">Detalle del contenedor</SheetTitle>
        <SheetDescription className="sr-only">Nivel, conectividad e histórico del contenedor seleccionado.</SheetDescription>
        {selectedId && <LazyContainerDetail id={selectedId} />}
      </Sheet>
    </div>
  )
}
