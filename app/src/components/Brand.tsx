import { Leaf } from 'lucide-react'
import { cn } from '@/lib/utils'

/** Logotipo propio de GeoGreen (sin marca AIEP, según guía visual interna). */
export function Brand({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-navy text-verde shadow-card">
        <Leaf size={18} strokeWidth={2.4} />
      </span>
      {!compact && (
        <span className="text-lg font-extrabold tracking-tight">
          <span className="text-navy">Geo</span>
          <span className="text-verde">Green</span>
        </span>
      )}
    </div>
  )
}
