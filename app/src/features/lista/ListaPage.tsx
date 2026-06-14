import { useMemo, useState } from 'react'
import { Search, ChevronRight, ArrowUpDown } from 'lucide-react'
import type { ContenedorConLectura } from '@/lib/types'
import { ESTADO_META, estadoLlenado, estaOffline } from '@/lib/status'
import { tiempoRelativo } from '@/lib/format'
import { useContenedores } from '@/hooks/useTelemetry'
import { ContainerDetail } from '@/components/ContainerDetail'
import { FillBar } from '@/components/FillGauge'
import { BatteryBadge, SignalBadge } from '@/components/Indicators'
import { Sheet, SheetDescription, SheetTitle } from '@/components/ui/sheet'

type Orden = 'llenado' | 'bateria' | 'lectura' | 'nombre'

const ORDENES: { value: Orden; label: string }[] = [
  { value: 'llenado', label: 'Más lleno' },
  { value: 'bateria', label: 'Menos batería' },
  { value: 'lectura', label: 'Reporte más antiguo' },
  { value: 'nombre', label: 'Nombre' },
]

function ordenar(a: ContenedorConLectura, b: ContenedorConLectura, orden: Orden): number {
  switch (orden) {
    case 'llenado':
      return b.llenado - a.llenado
    case 'bateria':
      return a.bateria - b.bateria
    case 'lectura':
      return new Date(a.ultimaLectura).getTime() - new Date(b.ultimaLectura).getTime()
    case 'nombre':
      return a.nombre.localeCompare(b.nombre, 'es')
  }
}

export function ListaPage() {
  const { data: contenedores = [] } = useContenedores()
  const [q, setQ] = useState('')
  const [orden, setOrden] = useState<Orden>('llenado')
  const [selectedId, setSelectedId] = useState<string>()

  const filtrados = useMemo(() => {
    const term = q.trim().toLowerCase()
    return contenedores
      .filter(
        (c) =>
          !term ||
          c.nombre.toLowerCase().includes(term) ||
          c.sector.toLowerCase().includes(term) ||
          c.id.toLowerCase().includes(term),
      )
      .sort((a, b) => ordenar(a, b, orden))
  }, [contenedores, q, orden])

  return (
    <div className="h-full overflow-y-auto scroll-slim pb-20 md:pb-6">
      <div className="mx-auto max-w-3xl px-4 pt-6 sm:px-6">
        <h1 className="mb-4 text-2xl font-extrabold tracking-tight text-navy">Contenedores</h1>

        {/* Controles */}
        <div className="mb-4 flex flex-col gap-2.5 sm:flex-row">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-guide" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por nombre, sector o ID…"
              className="h-10 w-full rounded-xl border border-line/70 bg-white/80 pl-9 pr-3 text-sm text-ink placeholder:text-guide focus:border-navy/40 focus:outline-none focus:ring-2 focus:ring-navy/20"
            />
          </div>
          <div className="relative">
            <ArrowUpDown size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate" />
            <select
              value={orden}
              onChange={(e) => setOrden(e.target.value as Orden)}
              className="h-10 w-full appearance-none rounded-xl border border-line/70 bg-white/80 pl-9 pr-8 text-sm font-medium text-ink focus:border-navy/40 focus:outline-none focus:ring-2 focus:ring-navy/20 sm:w-52"
            >
              {ORDENES.map((o) => (
                <option key={o.value} value={o.value}>
                  Ordenar: {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Lista */}
        {filtrados.length === 0 ? (
          <p className="mt-12 text-center text-sm text-slate">
            Sin resultados para “{q}”.
          </p>
        ) : (
          <ul className="space-y-2.5">
            {filtrados.map((c) => {
              const offline = estaOffline(c)
              const meta = ESTADO_META[estadoLlenado(c.llenado)]
              return (
                <li key={c.id}>
                  <button
                    onClick={() => setSelectedId(c.id)}
                    className="group flex w-full items-center gap-3.5 rounded-2xl border border-line/70 bg-white/80 p-3.5 text-left shadow-card transition-all duration-200 hover:border-navy/30 hover:bg-white"
                  >
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ background: offline ? '#96A3B2' : meta.hex }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-semibold text-navy">{c.nombre}</p>
                        <span className="font-mono text-[0.7rem] text-guide">{c.id}</span>
                      </div>
                      <p className="text-xs text-slate">
                        {c.sector} · {tiempoRelativo(c.ultimaLectura)}
                      </p>
                      <div className="mt-2 max-w-[16rem]">
                        <FillBar llenado={c.llenado} />
                      </div>
                    </div>
                    <div className="hidden shrink-0 flex-col items-end gap-1 sm:flex">
                      <span className="font-mono text-lg font-semibold tabular" style={{ color: offline ? '#96A3B2' : meta.hex }}>
                        {Math.round(c.llenado)}%
                      </span>
                      <div className="flex items-center gap-2">
                        <BatteryBadge nivel={c.bateria} withLabel={false} />
                        <SignalBadge rssi={c.rssi} offline={offline} />
                      </div>
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
