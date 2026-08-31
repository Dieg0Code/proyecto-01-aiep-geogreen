import { cn } from '@/lib/utils'
import { GeoGreenMark } from './ProductGlyphs'

/** Logotipo propio de GeoGreen (sin marca AIEP, según guía visual interna). */
export function Brand({
  compact = false,
  inverted = false,
  className,
}: {
  compact?: boolean
  inverted?: boolean
  className?: string
}) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <span className={cn('grid h-7 w-7 place-items-center', inverted ? 'text-white' : 'text-navy')}>
        <GeoGreenMark />
      </span>
      {!compact && (
        <span className="text-base font-semibold tracking-[-0.025em]">
          <span className={inverted ? 'text-white' : 'text-navy'}>Geo</span>
          <span className={inverted ? 'text-white' : 'text-navy'}>Green</span>
        </span>
      )}
    </div>
  )
}
