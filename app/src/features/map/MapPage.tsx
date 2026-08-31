import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Route, Truck, X } from 'lucide-react'
import { useContenedores } from '@/hooks/useTelemetry'
import { pasaFiltro, resumirFlota, type Filtro } from '@/lib/resumen'
import {
  CAPACIDAD_CAMION_M3,
  COLORES_CAMION,
  contenedoresParaRetiro,
  type AlcanceRuta,
} from '@/lib/ruta'
import { calcularVRP } from '@/lib/routing'
import { cn } from '@/lib/utils'
import { Brand } from '@/components/Brand'
import { RouteGlyph, TelemetryTrace } from '@/components/ProductGlyphs'
import { Button } from '@/components/ui/button'
import { KpiBar } from '@/components/KpiBar'
import { LazyContainerDetail } from '@/components/LazyContainerDetail'
import { Sheet, SheetDescription, SheetTitle } from '@/components/ui/sheet'
import { MapView } from './MapView'
import { RouteLayer } from './RouteLayer'

function LiveDot() {
  return (
    <span className="inline-flex items-center gap-2 text-xs text-slate">
      <TelemetryTrace className="hidden text-navy sm:block" />
      <span className="h-1.5 w-1.5 rounded-full bg-verde" />
      Conectado
    </span>
  )
}

const LEYENDA = [
  { label: 'Bajo', color: '#3FAE6A' },
  { label: 'Medio', color: '#E0BC5A' },
  { label: 'Lleno', color: '#D62027' },
  { label: 'Sin señal', color: '#96A3B2' },
]

export function MapPage() {
  const { data: contenedores = [] } = useContenedores()
  const [filtro, setFiltro] = useState<Filtro>('todos')
  const [selectedId, setSelectedId] = useState<string>()
  const [rutaActiva, setRutaActiva] = useState(false)
  const [alcance, setAlcance] = useState<AlcanceRuta>('medios')
  const [camiones, setCamiones] = useState(1)

  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 30_000)
    return () => window.clearInterval(timer)
  }, [])
  const resumen = useMemo(() => resumirFlota(contenedores, now), [contenedores, now])
  const visibles = useMemo(
    () => contenedores.filter((c) => pasaFiltro(c, filtro, now)),
    [contenedores, filtro, now],
  )
  const paraRetiro = useMemo(
    () => contenedoresParaRetiro(contenedores, alcance, now),
    [contenedores, alcance, now],
  )
  const idsRetiro = paraRetiro.map((c) => c.id).join(',')
  const { data: sol, isFetching: calculando } = useQuery({
    queryKey: ['vrp', alcance, camiones, idsRetiro],
    queryFn: () => calcularVRP(paraRetiro, { camiones, capacidadM3: CAPACIDAD_CAMION_M3 }),
    enabled: rutaActiva && paraRetiro.length > 0,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  })

  const totalParadas = sol?.rutas.reduce((s, r) => s + r.paradas.length, 0) ?? 0

  return (
    <div className="relative h-full">
      <MapView contenedores={visibles} selectedId={selectedId} onSelect={setSelectedId} now={now}>
        {rutaActiva && sol && sol.rutas.length > 0 && (
          <RouteLayer rutas={sol.rutas} aproximada={sol.aproximada} onSelect={setSelectedId} />
        )}
      </MapView>

      {/* Overlay superior */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[800]">
        <div className="pointer-events-auto border-b border-line bg-white/96 shadow-card backdrop-blur-md">
            <div className="flex h-14 items-center justify-between px-4 sm:px-5">
              <div className="md:hidden">
                <Brand />
              </div>
              <div className="hidden items-baseline gap-3 md:flex">
                <h1 className="text-sm font-semibold text-navy">Red de contenedores</h1>
                <span className="text-xs text-guide">Osorno, Los Lagos</span>
              </div>
              <div className="flex items-center gap-3">
                <div>
                  <LiveDot />
                </div>
              </div>
            </div>
            <KpiBar resumen={resumen} filtro={filtro} onFiltro={setFiltro} />
        </div>
      </div>

      {/* Leyenda */}
      <div className="absolute bottom-16 left-3 z-[800] border border-line bg-white/94 px-3 py-2 shadow-card backdrop-blur-md md:bottom-4">
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {LEYENDA.map((l) => (
            <span key={l.label} className="flex items-center gap-1.5 text-xs font-medium text-slate">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: l.color }} />
              {l.label}
            </span>
          ))}
        </div>
      </div>

      {/* Ruta de recolección */}
      <div className="absolute bottom-16 right-3 z-[800] md:bottom-4 md:right-4">
        {!rutaActiva ? (
          paraRetiro.length > 0 ? (
            <Button
              variant="primary"
              onClick={() => {
                setFiltro('todos')
                setRutaActiva(true)
              }}
              className="h-10 rounded-md border border-white/10 px-4 shadow-float"
            >
              <RouteGlyph />
              Planificar retiro
              <span className="ml-0.5 border-l border-white/20 pl-2 font-mono text-xs">
                {paraRetiro.length}
              </span>
            </Button>
          ) : (
            <span className="rounded-md border border-line bg-white/92 px-3 py-2 text-xs text-slate shadow-card backdrop-blur-md">
              Sin retiros pendientes
            </span>
          )
        ) : (
          <div className="w-[18rem] overflow-hidden rounded-lg border border-line bg-white/96 shadow-float backdrop-blur-xl animate-fade-up">
            <div className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <Route size={17} className="text-navy" />
                <div>
                  <p className="text-sm font-bold leading-tight text-navy">Operación de retiro</p>
                  {calculando && !sol ? (
                    <p className="text-xs text-slate">Optimizando ruta…</p>
                  ) : sol ? (
                    <p className="text-xs text-slate">
                      {totalParadas} paradas ·{' '}
                      <span className="font-mono tabular">{sol.distanciaKm.toFixed(1)} km</span>
                      {sol.duracionMin !== null && (
                        <>
                          {' · '}
                          <span className="font-mono tabular">~{Math.round(sol.duracionMin)} min</span>
                        </>
                      )}
                    </p>
                  ) : null}
                </div>
              </div>
              <button
                onClick={() => setRutaActiva(false)}
                className="focus-ring grid h-8 w-8 shrink-0 place-items-center text-slate transition-colors hover:bg-soft-neutral hover:text-ink"
              >
                <X size={15} />
                <span className="sr-only">Cerrar ruta</span>
              </button>
            </div>

            {/* Alcance */}
            <p className="mt-4 mb-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-slate">
              Incluir
            </p>
            <div className="flex rounded-lg border border-line bg-mist p-0.5">
              {([
                ['llenos', 'Llenos'],
                ['medios', '+ Medios'],
                ['todos', 'Todos'],
              ] as const).map(([v, l]) => (
                <button
                  key={v}
                  onClick={() => setAlcance(v)}
                  className={cn(
                    'flex-1 rounded-md px-2 py-1 text-xs font-medium transition-colors',
                    alcance === v ? 'bg-navy text-paper' : 'text-slate hover:text-ink',
                  )}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Camiones */}
            <p className="mt-3 mb-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-slate">
              Camiones
            </p>
            <div className="flex rounded-lg border border-line bg-mist p-0.5">
              {[1, 2, 3].map((k) => (
                <button
                  key={k}
                  onClick={() => setCamiones(k)}
                  className={cn(
                    'flex-1 rounded-md px-2 py-1 font-mono text-xs font-medium transition-colors',
                    camiones === k ? 'bg-navy text-paper' : 'text-slate hover:text-ink',
                  )}
                >
                  {k}
                </button>
              ))}
            </div>

            {/* Desglose por camión */}
            {sol && sol.rutas.length > 0 && (
              <ul className="mt-3 space-y-1.5 border-t border-line/60 pt-2.5">
                {sol.rutas.map((r, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs">
                    <Truck size={13} style={{ color: COLORES_CAMION[r.vehiculo % COLORES_CAMION.length] }} />
                    <span className="font-medium text-ink">Camión {r.vehiculo + 1}</span>
                    <span className="ml-auto font-mono tabular text-slate">
                      {r.paradas.length}p · {r.distanciaKm.toFixed(1)}km
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <p className="mt-3 border-t border-line pt-2.5 text-[0.7rem] leading-relaxed text-slate">
              {sol?.aproximada
                ? 'Recorrido estimado desde la base operacional.'
                : 'Ruta optimizada por calles desde el Vertedero Curaco; cada camión parte y regresa a la base.'}
            </p>
            </div>
          </div>
        )}
      </div>

      {/* Detalle */}
      <Sheet open={Boolean(selectedId)} onOpenChange={(o) => !o && setSelectedId(undefined)}>
        <SheetTitle className="sr-only">Detalle del contenedor</SheetTitle>
        <SheetDescription className="sr-only">
          Nivel de llenado, batería, señal e histórico del contenedor seleccionado.
        </SheetDescription>
        {selectedId && <LazyContainerDetail id={selectedId} />}
      </Sheet>
    </div>
  )
}
