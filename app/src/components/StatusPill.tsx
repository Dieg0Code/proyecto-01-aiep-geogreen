import { Badge } from '@/components/ui/badge'
import { ESTADO_META, estadoLlenado } from '@/lib/status'
import { cn } from '@/lib/utils'

interface StatusPillProps {
  llenado: number
  className?: string
  showDot?: boolean
}

/** Pill con el estado del semáforo (bajo / medio / lleno). */
export function StatusPill({ llenado, className, showDot = true }: StatusPillProps) {
  const meta = ESTADO_META[estadoLlenado(llenado)]
  return (
    <Badge className={cn(meta.bg, meta.fg, className)}>
      {showDot && <span className="h-1.5 w-1.5 rounded-full" style={{ background: meta.hex }} />}
      {meta.label}
    </Badge>
  )
}
