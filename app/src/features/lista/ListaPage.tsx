import { useEffect, useMemo, useState } from 'react'
import { ArrowUpDown, ChevronRight, Search, SlidersHorizontal, X } from 'lucide-react'
import type { ContenedorConLectura, EstadoLlenado } from '@/lib/types'
import { BATERIA_BAJA, ESTADO_META, estadoLlenado, estaOffline } from '@/lib/status'
import { tiempoRelativo } from '@/lib/format'
import { useContenedores } from '@/hooks/useTelemetry'
import { LazyContainerDetail } from '@/components/LazyContainerDetail'
import { FillBar } from '@/components/FillGauge'
import { BatteryBadge, SignalBadge } from '@/components/Indicators'
import { TelemetryTrace } from '@/components/ProductGlyphs'
import { Sheet, SheetDescription, SheetTitle } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

type Orden = 'prioridad' | 'llenado' | 'bateria' | 'lectura' | 'nombre'
type VistaEstado = 'todos' | EstadoLlenado | 'offline'

const ORDENES: { value: Orden; label: string }[] = [
  { value: 'prioridad', label: 'Prioridad operacional' },
  { value: 'llenado', label: 'Mayor llenado' },
  { value: 'bateria', label: 'Menor batería' },
  { value: 'lectura', label: 'Reporte más antiguo' },
  { value: 'nombre', label: 'Nombre' },
]

const ESTADOS: { value: VistaEstado; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'lleno', label: 'Para retiro' },
  { value: 'medio', label: 'En vigilancia' },
  { value: 'bajo', label: 'Disponibles' },
  { value: 'offline', label: 'Sin señal' },
]

function prioridad(c: ContenedorConLectura): number {
  if (!estaOffline(c) && estadoLlenado(c.llenado) === 'lleno') return 0
  if (estaOffline(c)) return 1
  if (c.bateria <= BATERIA_BAJA) return 2
  if (estadoLlenado(c.llenado) === 'medio') return 3
  return 4
}

function ordenar(a: ContenedorConLectura, b: ContenedorConLectura, orden: Orden): number {
  if (orden === 'prioridad') return prioridad(a) - prioridad(b) || b.llenado - a.llenado
  if (orden === 'llenado') return b.llenado - a.llenado
  if (orden === 'bateria') return a.bateria - b.bateria
  if (orden === 'lectura') return new Date(a.ultimaLectura).getTime() - new Date(b.ultimaLectura).getTime()
  return a.nombre.localeCompare(b.nombre, 'es')
}

function usePersistentInspector() {
  const [enabled, setEnabled] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 1280px)').matches)

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1280px)')
    const update = () => setEnabled(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return enabled
}

export function ListaPage() {
  const { data: contenedores = [] } = useContenedores()
  const [q, setQ] = useState('')
  const [orden, setOrden] = useState<Orden>('prioridad')
  const [vista, setVista] = useState<VistaEstado>('todos')
  const [selectedId, setSelectedId] = useState<string>()
  const persistentInspector = usePersistentInspector()

  const conteos = useMemo(() => {
    const base: Record<VistaEstado, number> = { todos: contenedores.length, lleno: 0, medio: 0, bajo: 0, offline: 0 }
    for (const c of contenedores) {
      if (estaOffline(c)) base.offline += 1
      else base[estadoLlenado(c.llenado)] += 1
    }
    return base
  }, [contenedores])

  const filtrados = useMemo(() => {
    const term = q.trim().toLowerCase()
    return contenedores
      .filter((c) => {
        const offline = estaOffline(c)
        const coincideEstado = vista === 'todos' || (vista === 'offline' ? offline : !offline && estadoLlenado(c.llenado) === vista)
        const coincideTexto = !term
          || c.nombre.toLowerCase().includes(term)
          || c.sector.toLowerCase().includes(term)
          || c.direccion.toLowerCase().includes(term)
          || c.id.toLowerCase().includes(term)
        return coincideEstado && coincideTexto
      })
      .sort((a, b) => ordenar(a, b, orden))
  }, [contenedores, q, orden, vista])

  const inspectorVisible = persistentInspector && Boolean(selectedId)

  return (
    <div className="flex h-full min-w-0 overflow-hidden bg-paper">
      <section className="min-w-0 flex-1 overflow-y-auto scroll-slim pb-20 md:pb-8">
        <div className={cn('mx-auto px-4 pb-8 pt-7 sm:px-7 lg:px-9', inspectorVisible ? 'max-w-none' : 'max-w-[84rem]')}>
          <header className="mb-5 flex flex-col justify-between gap-5 border-b border-line pb-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.17em] text-red">Inventario operacional</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-navy">Red de contenedores</h1>
              <p className="mt-1.5 max-w-xl text-sm text-slate">Ubicaciones, llenado y salud técnica de la red desplegada en Osorno.</p>
            </div>
            <div className="flex items-center gap-3 border-l border-line pl-4">
              <TelemetryTrace className="hidden text-cyan sm:block" />
              <div>
                <p className="font-mono text-xl font-semibold tabular text-navy">{contenedores.length}</p>
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-guide">ubicaciones verificadas</p>
              </div>
            </div>
          </header>

          <section className="mb-3 border-y border-line bg-white">
            <div className="flex flex-col gap-3 px-3 py-3 lg:flex-row lg:items-center">
              <div className="relative min-w-0 flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-guide" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Buscar ubicación, dirección, sector o identificador"
                  className="focus-ring h-10 w-full border border-line bg-mist pl-9 pr-3 text-sm text-ink placeholder:text-guide"
                />
              </div>
              <div className="relative shrink-0">
                <ArrowUpDown size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate" />
                <select
                  value={orden}
                  onChange={(e) => setOrden(e.target.value as Orden)}
                  aria-label="Ordenar contenedores"
                  className="focus-ring h-10 w-full appearance-none border border-line bg-white pl-9 pr-9 text-xs font-semibold text-ink lg:w-[13.5rem]"
                >
                  {ORDENES.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-5 overflow-x-auto border-t border-line px-3 scroll-slim">
              {ESTADOS.map((estado) => (
                <button
                  key={estado.value}
                  onClick={() => setVista(estado.value)}
                  className={cn(
                    'focus-ring flex h-10 shrink-0 items-center gap-2 border-b-2 px-1 text-xs font-semibold transition-colors',
                    vista === estado.value ? 'border-navy text-navy' : 'border-transparent text-slate hover:text-navy',
                  )}
                >
                  {estado.label}
                  <span className={cn('font-mono text-[0.64rem] tabular', vista === estado.value ? 'text-navy' : 'text-guide')}>{conteos[estado.value]}</span>
                </button>
              ))}
              <span className="ml-auto hidden shrink-0 items-center text-[0.65rem] text-guide lg:flex">{filtrados.length} resultados</span>
            </div>
          </section>

          <div className={cn(
            'hidden gap-3 px-4 pb-2 pt-3 text-[0.6rem] font-semibold uppercase tracking-[0.13em] text-guide md:grid',
            inspectorVisible
              ? 'grid-cols-[minmax(0,1.35fr)_minmax(6.5rem,.7fr)_minmax(7.5rem,.8fr)_6.5rem_1.5rem]'
              : 'grid-cols-[minmax(0,1.45fr)_minmax(8rem,.8fr)_minmax(9rem,1fr)_8rem_2rem]',
          )}>
            <span>Activo y ubicación</span><span>Respuesta</span><span>Llenado</span><span>Salud</span><span />
          </div>

          {filtrados.length === 0 ? (
            <div className="mt-8 border border-dashed border-line bg-white/60 px-6 py-14 text-center">
              <SlidersHorizontal size={24} className="mx-auto text-guide" />
              <p className="mt-3 text-sm font-semibold text-navy">No hay contenedores en esta vista</p>
              <p className="mt-1 text-xs text-slate">Ajusta los filtros o el término de búsqueda.</p>
            </div>
          ) : (
            <ul className="overflow-hidden border border-line bg-white shadow-card">
              {filtrados.map((c, index) => {
                const offline = estaOffline(c)
                const meta = ESTADO_META[estadoLlenado(c.llenado)]
                const selected = c.id === selectedId
                return (
                  <li key={c.id} className={cn(index > 0 && 'border-t border-line')}>
                    <button
                      onClick={() => setSelectedId((actual) => actual === c.id ? undefined : c.id)}
                      aria-pressed={selected}
                      className={cn(
                        'focus-ring group grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-l-2 px-4 py-4 text-left transition-colors md:gap-3',
                        inspectorVisible
                          ? 'md:grid-cols-[minmax(0,1.35fr)_minmax(6.5rem,.7fr)_minmax(7.5rem,.8fr)_6.5rem_1.5rem]'
                          : 'md:grid-cols-[minmax(0,1.45fr)_minmax(8rem,.8fr)_minmax(9rem,1fr)_8rem_2rem]',
                        selected ? 'border-cyan bg-cyan-soft/45' : 'border-transparent hover:bg-mist',
                      )}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2.5">
                          <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: offline ? '#91A0AC' : meta.hex }} />
                          <p className="truncate text-sm font-bold text-navy">{c.nombre}</p>
                          <span className="shrink-0 font-mono text-[0.66rem] text-guide">{c.id}</span>
                        </div>
                        <p className="mt-1 truncate pl-5 text-xs text-slate">{c.direccion}</p>
                      </div>

                      <ChevronRight size={18} className={cn('text-guide transition-transform md:hidden', selected && 'rotate-90 text-cyan')} />

                      <div className="hidden min-w-0 md:block">
                        <p className="truncate text-xs font-semibold" style={{ color: offline ? '#5D7182' : meta.hex }}>
                          {offline ? 'Verificar conectividad' : meta.accion}
                        </p>
                        <p className="mt-1 truncate text-[0.68rem] text-guide">Reporte {tiempoRelativo(c.ultimaLectura)}</p>
                      </div>

                      <div className={cn('hidden min-w-0 items-center gap-3 md:flex', offline && 'opacity-55')}>
                        <strong className="w-11 shrink-0 font-mono text-base font-semibold tabular text-navy">{Math.round(c.llenado)}%</strong>
                        <FillBar llenado={c.llenado} />
                      </div>

                      <div className="hidden min-w-0 flex-col gap-1 md:flex">
                        <BatteryBadge nivel={c.bateria} className="text-xs" />
                        <SignalBadge rssi={c.rssi} offline={offline} withLabel className="text-[0.68rem]" />
                      </div>

                      <ChevronRight size={18} className={cn('hidden text-guide transition-transform group-hover:translate-x-0.5 md:block', selected && 'text-cyan')} />

                      <div className="col-span-2 mt-1 grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 border-t border-line/70 pt-3 md:hidden">
                        <strong className="font-mono text-xl font-semibold tabular text-navy">{Math.round(c.llenado)}%</strong>
                        <div className="self-center"><FillBar llenado={c.llenado} /></div>
                        <div className="col-span-2 mt-2 flex items-center justify-between gap-3">
                          <span className="truncate text-xs font-semibold" style={{ color: offline ? '#5D7182' : meta.hex }}>
                            {offline ? 'Verificar conectividad' : meta.accion}
                          </span>
                          <span className="flex shrink-0 items-center gap-2">
                            <BatteryBadge nivel={c.bateria} className="text-xs" />
                            <SignalBadge rssi={c.rssi} offline={offline} />
                          </span>
                        </div>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </section>

      {inspectorVisible && selectedId && (
        <aside className="relative hidden w-[30rem] shrink-0 border-l border-line bg-white shadow-[-18px_0_40px_-32px_rgba(7,29,51,0.55)] xl:block animate-slide-in-right">
          <button
            onClick={() => setSelectedId(undefined)}
            className="focus-ring absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-md border border-white/15 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            <X size={18} />
            <span className="sr-only">Cerrar ficha</span>
          </button>
          <LazyContainerDetail id={selectedId} />
        </aside>
      )}

      <Sheet open={!persistentInspector && Boolean(selectedId)} onOpenChange={(open) => !open && setSelectedId(undefined)}>
        <SheetTitle className="sr-only">Detalle del contenedor</SheetTitle>
        <SheetDescription className="sr-only">Nivel, conectividad e histórico del contenedor seleccionado.</SheetDescription>
        {!persistentInspector && selectedId && <LazyContainerDetail id={selectedId} />}
      </Sheet>
    </div>
  )
}
