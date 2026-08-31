import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { ArrowUpRight, Clock3, MapPin, RadioTower, TrendingUp } from 'lucide-react'
import { useContenedor, useHistorial } from '@/hooks/useTelemetry'
import { formatearProyeccion, proyectarLlenado } from '@/lib/proyeccion'
import { ESTADO_META, HIGH_LIMIT, LOW_LIMIT, estadoLlenado, estaOffline, minutosDesde } from '@/lib/status'
import { fechaHora, horaCorta, tiempoRelativo } from '@/lib/format'
import { BatteryBadge, SignalBadge } from './Indicators'
import { ContainerTelemetryGlyph, TelemetryTrace } from './ProductGlyphs'

function Metrica({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0 border-l border-line px-4 first:border-l-0 first:pl-0 last:pr-0">
      <p className="text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-guide">{label}</p>
      <div className="mt-2 truncate">{children}</div>
    </div>
  )
}

export function ContainerDetail({ id }: { id: string }) {
  const { data: c } = useContenedor(id)
  const { data: historial = [] } = useHistorial(id)

  if (!c) return null

  const offline = estaOffline(c)
  const meta = ESTADO_META[estadoLlenado(c.llenado)]
  const serie = historial.map((p) => ({ hora: horaCorta(p.t), llenado: p.llenado }))
  const proy = proyectarLlenado(historial, c.llenado)
  const textoProy = c.llenado >= HIGH_LIMIT && proy.horasParaLlenar === null
    ? 'Retiro recomendado'
    : formatearProyeccion(proy.horasParaLlenar)
  const minutosReporte = Math.max(0, Math.round(minutosDesde(c.ultimaLectura)))

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-white scroll-slim">
      <header className="relative shrink-0 overflow-hidden bg-navy px-6 pb-6 pt-6 text-white">
        <TelemetryTrace className="absolute right-14 top-5 text-cyan opacity-35" />
        <div className="relative flex items-center gap-2">
          <span className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white/65">{c.id}</span>
          <span className="h-3 w-px bg-white/20" />
          <span className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: offline ? '#B5C0C9' : meta.hex }}>
            <span className="relative h-1.5 w-1.5 rounded-full" style={{ background: offline ? '#96A3B2' : meta.hex }} />
            {offline ? 'Sin conexión' : meta.label}
          </span>
        </div>
        <h2 className="relative mt-4 max-w-[23rem] pr-7 text-[1.65rem] font-semibold leading-[1.12] tracking-[-0.035em] text-white">{c.nombre}</h2>
        <p className="relative mt-3 flex items-center gap-1.5 text-sm text-white/62"><MapPin size={14} /> {c.sector}, Osorno</p>
      </header>

      <div>
        <section className="grid grid-cols-[1fr_8.75rem] items-center gap-3 border-b border-line bg-mist px-6 py-5">
          <div>
            <div className="flex items-end justify-between gap-5">
            <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-guide">Nivel actual</p>
                <p className="mt-2 font-mono text-[3.9rem] font-medium leading-none tracking-[-0.075em] text-navy">
                  {Math.round(c.llenado)}<span className="ml-1.5 text-xl text-slate">%</span>
                </p>
              </div>
            </div>

            <div className="mt-5 border-l-2 pl-3" style={{ borderColor: offline ? '#748493' : meta.hex }}>
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-guide">Respuesta operativa</p>
              <p className="mt-1 text-sm font-semibold text-navy">
                {offline ? 'Verificar conectividad' : meta.accion}
              </p>
            </div>
          </div>
          <ContainerTelemetryGlyph level={c.llenado} color={meta.hex} offline={offline} className="h-[8.8rem] w-[8.4rem] justify-self-end" />
        </section>

        <section className="grid grid-cols-3 border-b border-line px-6 py-5">
          <Metrica label="Batería"><BatteryBadge nivel={c.bateria} className="text-[0.82rem] font-semibold" /></Metrica>
          <Metrica label="Señal"><SignalBadge rssi={c.rssi} offline={offline} withLabel className="text-[0.82rem] font-semibold" /></Metrica>
          <Metrica label="Último reporte">
            <span className="flex items-center gap-1.5 text-[0.82rem] font-semibold text-ink">
              <Clock3 size={14} className="shrink-0 text-slate" />
              <span className="sm:hidden">{minutosReporte} min</span>
              <span className="hidden sm:inline">{tiempoRelativo(c.ultimaLectura)}</span>
            </span>
          </Metrica>
        </section>

        {!offline && (
          <section className="flex items-center justify-between gap-4 border-b border-line bg-soft-blue/55 px-6 py-3.5">
            <span className="flex items-center gap-2 text-xs font-medium text-slate"><TrendingUp size={15} className="text-navy-soft" /> Proyección de llenado</span>
            <strong className="font-mono text-sm font-semibold tabular text-navy">{textoProy}</strong>
          </section>
        )}

        <section className="px-6 py-5">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-navy">Evolución del llenado</h3>
              <p className="mt-0.5 text-xs text-slate">Últimas 24 horas</p>
            </div>
            <span className="text-right text-[0.65rem] text-guide">{fechaHora(c.ultimaLectura)}</span>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} initialDimension={{ width: 420, height: 192 }}>
              <AreaChart data={serie} margin={{ top: 4, right: 4, left: -18, bottom: 0 }}>
                <defs>
                  <linearGradient id={`fillGrad-${c.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={meta.hex} stopOpacity={0.22} />
                    <stop offset="100%" stopColor={meta.hex} stopOpacity={0.015} />
                  </linearGradient>
                </defs>
                <ReferenceArea y1={0} y2={LOW_LIMIT} fill="#3FAE6A" fillOpacity={0.025} />
                <ReferenceArea y1={LOW_LIMIT} y2={HIGH_LIMIT} fill="#E0BC5A" fillOpacity={0.03} />
                <ReferenceArea y1={HIGH_LIMIT} y2={100} fill="#D62027" fillOpacity={0.03} />
                <CartesianGrid strokeDasharray="2 5" stroke="#E4E9EC" vertical={false} />
                <XAxis dataKey="hora" tick={{ fontSize: 10, fill: '#718290' }} tickLine={false} axisLine={false} interval={11} minTickGap={24} />
                <YAxis domain={[0, 100]} ticks={[0, 40, 80, 100]} tick={{ fontSize: 10, fill: '#718290' }} tickLine={false} axisLine={false} />
                <ReferenceLine y={LOW_LIMIT} stroke="#3FAE6A" strokeDasharray="3 5" strokeOpacity={0.3} />
                <ReferenceLine y={HIGH_LIMIT} stroke="#D62027" strokeDasharray="3 5" strokeOpacity={0.35} />
                <Tooltip contentStyle={{ borderRadius: 4, border: '1px solid #DCE3E8', fontSize: 12, boxShadow: '0 12px 30px -16px rgba(7,29,51,0.35)' }} labelStyle={{ color: '#5D7182' }} formatter={(v) => [`${v}%`, 'Llenado']} />
                <Area type="monotone" dataKey="llenado" stroke={meta.hex} strokeWidth={2} fill={`url(#fillGrad-${c.id})`} dot={false} isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="border-t border-line bg-mist px-6 py-5">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center border border-line bg-white text-navy"><MapPin size={15} /></div>
            <div className="min-w-0 flex-1">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.13em] text-guide">Ubicación verificada</p>
              <p className="mt-1 text-sm font-semibold leading-snug text-navy">{c.direccion}</p>
              <p className="mt-1 font-mono text-[0.67rem] tabular text-slate">{c.lat.toFixed(6)}, {c.lon.toFixed(6)}</p>
            </div>
            <a href={c.osmUrl} target="_blank" rel="noreferrer" className="focus-ring mt-0.5 grid h-8 w-8 shrink-0 place-items-center border border-line bg-white text-navy transition-colors hover:border-cyan hover:text-cyan" aria-label="Abrir ubicación en OpenStreetMap">
              <ArrowUpRight size={15} />
            </a>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-xs text-slate">
            <span className="flex items-center gap-1.5"><RadioTower size={13} /> {offline ? 'Módulo sin conexión' : 'Módulo conectado'}</span>
            <span>Red GeoGreen · Osorno</span>
          </div>
        </section>
      </div>
    </div>
  )
}
