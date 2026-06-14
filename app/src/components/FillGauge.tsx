import { ESTADO_META, estadoLlenado } from '@/lib/status'

interface FillGaugeProps {
  llenado: number
  size?: number
}

/** Medidor circular de llenado, coloreado según el semáforo. */
export function FillGauge({ llenado, size = 168 }: FillGaugeProps) {
  const meta = ESTADO_META[estadoLlenado(llenado)]
  const stroke = 12
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c * (1 - llenado / 100)

  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#EDE6DA" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={meta.hex}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.6s cubic-bezier(0.22, 1, 0.36, 1)' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-mono text-4xl font-semibold tabular text-navy">{Math.round(llenado)}</span>
        <span className="-mt-1 text-sm font-medium text-slate">% lleno</span>
      </div>
    </div>
  )
}

/** Barra de llenado lineal compacta (listas, popups). */
export function FillBar({ llenado }: { llenado: number }) {
  const meta = ESTADO_META[estadoLlenado(llenado)]
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-soft-neutral">
      <div
        className="h-full rounded-full transition-[width] duration-500"
        style={{ width: `${llenado}%`, background: meta.hex }}
      />
    </div>
  )
}
