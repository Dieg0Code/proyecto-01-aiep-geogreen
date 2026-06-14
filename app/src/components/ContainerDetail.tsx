import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { MapPin, Clock, TrendingUp } from 'lucide-react'
import { useContenedor, useHistorial } from '@/hooks/useTelemetry'
import { formatearProyeccion, proyectarLlenado } from '@/lib/proyeccion'
import {
  ESTADO_META,
  HIGH_LIMIT,
  LOW_LIMIT,
  estadoLlenado,
  estaOffline,
} from '@/lib/status'
import { fechaHora, horaCorta, tiempoRelativo } from '@/lib/format'
import { FillGauge } from './FillGauge'
import { StatusPill } from './StatusPill'
import { BatteryBadge, SignalBadge } from './Indicators'

function Dato({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-line/60 bg-white/70 p-3">
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-slate">{label}</p>
      <div className="mt-1.5">{children}</div>
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
  const textoProy =
    c.llenado >= HIGH_LIMIT && proy.horasParaLlenar === null
      ? 'Listo para retiro'
      : formatearProyeccion(proy.horasParaLlenar)

  return (
    <div className="flex h-full flex-col overflow-y-auto scroll-slim">
      {/* Encabezado */}
      <header className="border-b border-line/60 bg-gradient-to-b from-soft-blue/50 to-transparent px-6 pb-5 pt-6">
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-slate">{c.id}</p>
        <h2 className="mt-1 pr-8 text-xl font-bold leading-tight text-navy">{c.nombre}</h2>
        <p className="mt-0.5 flex items-center gap-1 text-sm text-slate">
          <MapPin size={14} /> {c.sector}, Osorno
        </p>
      </header>

      <div className="space-y-5 p-6">
        {/* Gauge + acción */}
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-line/60 bg-white/70 py-6">
          <FillGauge llenado={c.llenado} />
          <div className="flex flex-col items-center gap-1.5">
            <StatusPill llenado={c.llenado} />
            <p className="text-sm font-medium" style={{ color: meta.hex }}>
              {meta.accion}
            </p>
          </div>
        </div>

        {/* Proyección de llenado */}
        {!offline && (
          <div className="flex items-center gap-2.5 rounded-xl border border-line/60 bg-soft-blue/40 px-3.5 py-2.5">
            <TrendingUp size={16} className="shrink-0 text-navy-soft" />
            <p className="text-sm text-slate">
              Proyección de llenado{' '}
              <span className="font-semibold text-navy">{textoProy}</span>
            </p>
          </div>
        )}

        {/* Datos */}
        <div className="grid grid-cols-2 gap-3">
          <Dato label="Batería">
            <BatteryBadge nivel={c.bateria} className="text-base font-semibold" />
          </Dato>
          <Dato label="Señal">
            <SignalBadge rssi={c.rssi} offline={offline} withLabel className="text-base font-semibold" />
          </Dato>
          <Dato label="Última lectura">
            <span className="flex items-center gap-1.5 text-sm font-medium text-ink">
              <Clock size={14} className="text-slate" /> {tiempoRelativo(c.ultimaLectura)}
            </span>
          </Dato>
          <Dato label="Coordenadas">
            <span className="font-mono text-sm tabular text-ink">
              {c.lat.toFixed(4)}, {c.lon.toFixed(4)}
            </span>
          </Dato>
        </div>

        {/* Histórico */}
        <div className="rounded-2xl border border-line/60 bg-white/70 p-4">
          <div className="mb-3 flex items-baseline justify-between">
            <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-slate">
              Llenado · últimas 24 h
            </h3>
            <span className="text-xs text-guide">{fechaHora(c.ultimaLectura)}</span>
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={serie} margin={{ top: 4, right: 6, left: -22, bottom: 0 }}>
                <defs>
                  <linearGradient id="fillGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={meta.hex} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={meta.hex} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#EDE6DA" vertical={false} />
                <XAxis
                  dataKey="hora"
                  tick={{ fontSize: 10, fill: '#96A3B2' }}
                  tickLine={false}
                  axisLine={false}
                  interval={11}
                  minTickGap={24}
                />
                <YAxis
                  domain={[0, 100]}
                  ticks={[0, 40, 80, 100]}
                  tick={{ fontSize: 10, fill: '#96A3B2' }}
                  tickLine={false}
                  axisLine={false}
                />
                <ReferenceLine y={LOW_LIMIT} stroke="#3FAE6A" strokeDasharray="4 4" strokeOpacity={0.5} />
                <ReferenceLine y={HIGH_LIMIT} stroke="#D62027" strokeDasharray="4 4" strokeOpacity={0.5} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: '1px solid #D8CFC4',
                    fontSize: 12,
                    boxShadow: '0 8px 24px -12px rgba(16,42,67,0.28)',
                  }}
                  labelStyle={{ color: '#52606D' }}
                  formatter={(v) => [`${v}%`, 'Llenado']}
                />
                <Area
                  type="monotone"
                  dataKey="llenado"
                  stroke={meta.hex}
                  strokeWidth={2.5}
                  fill="url(#fillGrad)"
                  dot={false}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
