import {
  Battery,
  BatteryLow,
  BatteryMedium,
  BatteryWarning,
  SignalHigh,
  SignalMedium,
  SignalLow,
  WifiOff,
} from 'lucide-react'
import { BATERIA_BAJA, nivelSenal } from '@/lib/status'
import { cn } from '@/lib/utils'

const ICON = 15

interface BatteryProps {
  nivel: number
  className?: string
  withLabel?: boolean
}

/** Indicador de batería con color por nivel. */
export function BatteryBadge({ nivel, className, withLabel = true }: BatteryProps) {
  const baja = nivel <= BATERIA_BAJA
  const Icon = baja ? BatteryWarning : nivel <= 45 ? BatteryLow : nivel <= 75 ? BatteryMedium : Battery
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 tabular text-sm',
        baja ? 'text-rojo' : 'text-slate',
        className,
      )}
    >
      <Icon size={ICON} />
      {withLabel && <span className="font-medium">{Math.round(nivel)}%</span>}
    </span>
  )
}

interface SignalProps {
  rssi: number
  offline?: boolean
  className?: string
  withLabel?: boolean
}

/** Indicador de señal (o "sin señal" si el dispositivo no reporta). */
export function SignalBadge({ rssi, offline, className, withLabel = false }: SignalProps) {
  if (offline) {
    return (
      <span className={cn('inline-flex items-center gap-1 text-sm text-rojo', className)}>
        <WifiOff size={ICON} />
        {withLabel && <span className="font-medium">Sin señal</span>}
      </span>
    )
  }
  const nivel = nivelSenal(rssi)
  const Icon = nivel === 'fuerte' ? SignalHigh : nivel === 'media' ? SignalMedium : SignalLow
  const color = nivel === 'debil' ? 'text-gold' : 'text-slate'
  return (
    <span className={cn('inline-flex items-center gap-1 text-sm tabular', color, className)}>
      <Icon size={ICON} />
      {withLabel && <span className="font-medium">{rssi} dBm</span>}
    </span>
  )
}
