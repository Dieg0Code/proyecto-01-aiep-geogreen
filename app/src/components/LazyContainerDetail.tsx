import { lazy, Suspense } from 'react'

const ContainerDetail = lazy(() =>
  import('./ContainerDetail').then((module) => ({ default: module.ContainerDetail })),
)

export function LazyContainerDetail({ id }: { id: string }) {
  return (
    <Suspense
      fallback={
        <div className="grid h-full place-items-center bg-white text-sm text-slate">
          Cargando información…
        </div>
      }
    >
      <ContainerDetail id={id} />
    </Suspense>
  )
}
