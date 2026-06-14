import { useState } from 'react'
import { Trash2, BatteryWarning, WifiOff, ChevronRight, CheckCircle2 } from 'lucide-react'
import type { TipoAlerta } from '@/lib/types'
import { ALERTA_META } from '@/lib/status'
import { tiempoRelativo } from '@/lib/format'
import { useAlertas } from '@/hooks/useTelemetry'
import { ContainerDetail } from '@/components/ContainerDetail'
import { Sheet, SheetDescription, SheetTitle } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const ICONO: Record<TipoAlerta, typeof Trash2> = {
  lleno: Trash2,
  'bateria-baja': BatteryWarning,
  'sin-senal': WifiOff,
}

export function AlertasPage() {
  const { data: alertas = [] } = useAlertas()
  const [selectedId, setSelectedId] = useState<string>()

  return (
    <div className="h-full overflow-y-auto scroll-slim pb-20 md:pb-6">
      <div className="mx-auto max-w-2xl px-4 pt-6 sm:px-6">
        <header className="mb-5 flex items-baseline justify-between">
          <h1 className="text-2xl font-extrabold tracking-tight text-navy">Alertas</h1>
          <span className="font-mono text-sm font-medium tabular text-slate">
            {alertas.length} {alertas.length === 1 ? 'activa' : 'activas'}
          </span>
        </header>

        {alertas.length === 0 ? (
          <div className="mt-16 flex flex-col items-center gap-3 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-verde-soft text-verde">
              <CheckCircle2 size={28} />
            </span>
            <p className="text-lg font-semibold text-navy">Todo en orden</p>
            <p className="max-w-xs text-sm text-slate">
              No hay alertas activas. Los contenedores están dentro de los rangos normales.
            </p>
          </div>
        ) : (
          <ul className="space-y-2.5">
            {alertas.map((a) => {
              const meta = ALERTA_META[a.tipo]
              const Icon = ICONO[a.tipo]
              return (
                <li key={a.id} className="animate-fade-up">
                  <button
                    onClick={() => setSelectedId(a.contenedorId)}
                    className="group flex w-full items-center gap-3.5 rounded-2xl border border-line/70 bg-white/80 p-3.5 text-left shadow-card transition-all duration-200 hover:border-navy/30 hover:bg-white"
                  >
                    <span className={cn('grid h-11 w-11 shrink-0 place-items-center rounded-xl', meta.bg, meta.fg)}>
                      <Icon size={20} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className={cn('text-sm font-semibold', meta.fg)}>{meta.label}</p>
                        <span className="font-mono text-[0.7rem] text-guide">{a.contenedorId}</span>
                      </div>
                      <p className="truncate text-sm font-medium text-navy">{a.contenedorNombre}</p>
                      <p className="text-xs text-slate">
                        {a.sector} · {tiempoRelativo(a.desde)}
                      </p>
                    </div>
                    <ChevronRight size={18} className="shrink-0 text-guide transition-transform group-hover:translate-x-0.5" />
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>

      <Sheet open={Boolean(selectedId)} onOpenChange={(o) => !o && setSelectedId(undefined)}>
        <SheetTitle className="sr-only">Detalle del contenedor</SheetTitle>
        <SheetDescription className="sr-only">
          Nivel de llenado, batería, señal e histórico del contenedor seleccionado.
        </SheetDescription>
        {selectedId && <ContainerDetail id={selectedId} />}
      </Sheet>
    </div>
  )
}
