import { useMemo, useState } from 'react'
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
import { Button } from '@/components/ui/button'
import { KpiBar } from '@/components/KpiBar'
import { ContainerDetail } from '@/components/ContainerDetail'
import { Sheet, SheetDescription, SheetTitle } from '@/components/ui/sheet'
import { MapView } from './MapView'
import { RouteLayer } from './RouteLayer'

function LiveDot() {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-verde" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-verde" />
      </span>
      En vivo
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

  const now = Date.now()
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
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[800] p-3 sm:p-4">
        <div className="pointer-events-auto mx-auto max-w-5xl">
          <div className="rounded-2xl border border-line/70 bg-paper/85 p-2.5 shadow-card backdrop-blur-md">
            <div className="mb-2.5 flex items-center justify-between px-1">
              <div className="md:hidden">
                <Brand />
              </div>
              <h1 className="hidden text-sm font-semibold text-navy md:block">
                Monitoreo de contenedores · Osorno
              </h1>
              <LiveDot />
            </div>
            <KpiBar resumen={resumen} filtro={filtro} onFiltro={setFiltro} />
          </div>
        </div>
      </div>

      {/* Leyenda */}
      <div className="absolute bottom-16 left-3 z-[800] rounded-xl border border-line/70 bg-paper/85 px-3 py-2 shadow-card backdrop-blur-md md:bottom-4">
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
              className="shadow-float"
            >
              <Route size={16} />
              Planificar retiro
              <span className="ml-0.5 rounded-full bg-paper/20 px-1.5 py-0.5 font-mono text-xs">
                {paraRetiro.length}
              </span>
            </Button>
          ) : (
            <span className="rounded-xl border border-line/70 bg-paper/85 px-3 py-2 text-xs font-medium text-slate shadow-card backdrop-blur-md">
              Sin retiros pendientes
            </span>
          )
        ) : (
          <div className="w-64 rounded-2xl border border-line/70 bg-paper/90 p-3.5 shadow-float backdrop-blur-md animate-fade-up">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-navy text-paper">
                  <Route size={17} />
                </span>
                <div>
                  <p className="text-sm font-semibold leading-tight text-navy">Ruta de retiro</p>
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
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-slate transition-colors hover:bg-soft-neutral hover:text-ink"
              >
                <X size={15} />
                <span className="sr-only">Cerrar ruta</span>
              </button>
            </div>

            {/* Alcance */}
            <p className="mt-3 mb-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-slate">
              Incluir
            </p>
            <div className="flex rounded-lg border border-line/70 bg-white/60 p-0.5">
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
            <p className="mt-3 mb-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-slate">
              Camiones
            </p>
            <div className="flex rounded-lg border border-line/70 bg-white/60 p-0.5">
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

            <p className="mt-2.5 border-t border-line/60 pt-2 text-[0.7rem] leading-relaxed text-guide">
              {sol?.aproximada
                ? 'Ruta aproximada (sin conexión al servicio de ruteo).'
                : 'Optimizado por calles desde el Vertedero Curaco, respetando sentidos; cada camión parte y vuelve a la base.'}
            </p>
          </div>
        )}
      </div>

      {/* Detalle */}
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
