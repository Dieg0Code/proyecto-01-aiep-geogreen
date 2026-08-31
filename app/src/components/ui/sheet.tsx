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
            'sm:max-w-[32rem]',
            className,
          )}
        >
          <Dialog.Close className="focus-ring absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-md border border-white/15 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20">
            <X size={18} />
            <span className="sr-only">Cerrar</span>
          </Dialog.Close>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export function SheetTitle(props: Dialog.DialogTitleProps) {
  return <Dialog.Title {...props} />
}

export function SheetDescription(props: Dialog.DialogDescriptionProps) {
  return <Dialog.Description {...props} />
}
