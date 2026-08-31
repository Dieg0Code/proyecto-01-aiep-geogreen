import { cn } from '@/lib/utils'

/** Sensor ultrasónico sobre un contenedor: isotipo propio de GeoGreen. */
export function GeoGreenMark({ className }: { className?: string }) {
  return (
    <svg className={cn('gg-mark h-7 w-7', className)} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M7 10.5h18l-1.6 15H8.6L7 10.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M5.5 7.5h21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="16" cy="8" r="1.8" fill="currentColor" />
      <path className="gg-mark__wave gg-mark__wave--1" d="M12.6 12.2c.9 1 2 1.5 3.4 1.5s2.5-.5 3.4-1.5" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
      <path className="gg-mark__wave gg-mark__wave--2" d="M10.4 13.8c1.5 1.8 3.4 2.7 5.6 2.7s4.1-.9 5.6-2.7" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
      <path className="gg-mark__level" d="M9.4 21.5h13.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/** Traza mínima de datos recibidos; se usa sólo en el encabezado del mapa. */
export function TelemetryTrace({ className }: { className?: string }) {
  return (
    <svg className={cn('gg-trace h-5 w-[4.5rem]', className)} viewBox="0 0 72 20" fill="none" aria-hidden="true">
      <path d="M1 13h10l4-7 7 11 6-9 6 5h10l4-8 7 12 5-7h11" stroke="currentColor" strokeOpacity=".18" strokeWidth="1.2" />
      <path className="gg-trace__signal" d="M1 13h10l4-7 7 11 6-9 6 5h10l4-8 7 12 5-7h11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle className="gg-trace__dot" cx="71" cy="10" r="2" fill="currentColor" />
    </svg>
  )
}

export function RouteGlyph({ className }: { className?: string }) {
  return (
    <svg className={cn('gg-route-glyph h-4 w-4', className)} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="4" cy="15.5" r="2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16" cy="4.5" r="2" stroke="currentColor" strokeWidth="1.6" />
      <path className="gg-route-glyph__path" d="M5.7 14.5c2.3-1.2 1.2-4.1 3.7-5.1 1.7-.7 3.3.2 4.9-2.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="2.5 2.5" />
    </svg>
  )
}

/** Corte técnico del contenedor: nivel y lectura ultrasónica en una sola pieza. */
export function ContainerTelemetryGlyph({
  level,
  color,
  offline = false,
  className,
}: {
  level: number
  color: string
  offline?: boolean
  className?: string
}) {
  const clamped = Math.max(0, Math.min(100, level))
  const fillHeight = 75 * (clamped / 100)
  const fillY = 105 - fillHeight
  const stateColor = offline ? '#748493' : color

  return (
    <svg className={cn('gg-vessel', className)} viewBox="0 0 126 132" fill="none" aria-hidden="true">
      <defs>
        <clipPath id="gg-vessel-clip">
          <path d="M27 29h66l-5 84H32l-5-84Z" />
        </clipPath>
        <linearGradient id="gg-vessel-fill" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor={stateColor} stopOpacity=".7" />
          <stop offset="1" stopColor={stateColor} />
        </linearGradient>
      </defs>

      <path d="M27 29h66l-5 84H32l-5-84Z" fill="#F8FAFB" stroke="#B8C4CC" strokeWidth="1.5" />
      <g clipPath="url(#gg-vessel-clip)">
        <rect
          className="gg-vessel__fill"
          x="27"
          y={fillY}
          width="66"
          height={fillHeight + 8}
          fill="url(#gg-vessel-fill)"
        />
        <path d={`M27 ${fillY + 2}c12-5 22 5 34 0s22 5 34 0`} stroke="white" strokeOpacity=".65" strokeWidth="1.3" />
      </g>
      <path d="M21 25.5h78" stroke="#071D33" strokeWidth="3" strokeLinecap="round" />
      <path d="M37 18.5h46" stroke="#071D33" strokeWidth="2" strokeLinecap="round" />
      <rect x="55" y="13" width="10" height="8" rx="2" fill="#071D33" />
      <circle cx="60" cy="17" r="1.7" fill="#1EAFC2" />

      <path className="gg-vessel__sonar gg-vessel__sonar--1" d="M53 27c1.9 2.2 4.2 3.3 7 3.3s5.1-1.1 7-3.3" stroke="#1EAFC2" strokeWidth="1.4" strokeLinecap="round" />
      <path className="gg-vessel__sonar gg-vessel__sonar--2" d="M49 29.5c3 3.5 6.7 5.2 11 5.2s8-1.7 11-5.2" stroke="#1EAFC2" strokeWidth="1.25" strokeLinecap="round" />

      <path d="M99 105h8M99 75h8M99 45h8" stroke="#91A0AC" strokeWidth="1" />
      <text x="112" y="108" fill="#91A0AC" fontSize="7" textAnchor="middle">0</text>
      <text x="114" y="78" fill="#91A0AC" fontSize="7" textAnchor="middle">40</text>
      <text x="114" y="48" fill="#91A0AC" fontSize="7" textAnchor="middle">80</text>
      <circle className="gg-vessel__pulse" cx="60" cy="17" r="4.5" stroke="#1EAFC2" strokeWidth="1" />
      <path d="M39 119h42" stroke="#071D33" strokeOpacity=".16" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
