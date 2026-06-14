import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

/** Panel deslizante: lateral derecho en desktop, pantalla completa en móvil. */
export function Sheet({ open, onOpenChange, children, className }: SheetProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[1000] bg-navy/30 backdrop-blur-[2px] animate-fade-in" />
        <Dialog.Content
          className={cn(
            'fixed inset-y-0 right-0 z-[1001] flex w-full flex-col bg-paper shadow-float outline-none animate-slide-in-right',
            'sm:max-w-[26rem]',
            className,
          )}
        >
          <Dialog.Close className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full text-slate transition-colors hover:bg-soft-neutral hover:text-ink">
            <X size={18} />
            <span className="sr-only">Cerrar</span>
          </Dialog.Close>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export const SheetTitle = Dialog.Title
export const SheetDescription = Dialog.Description
