import { lazy, Suspense } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppLayout } from '@/components/AppLayout'

const MapPage = lazy(() => import('@/features/map/MapPage').then((m) => ({ default: m.MapPage })))
const ListaPage = lazy(() => import('@/features/lista/ListaPage').then((m) => ({ default: m.ListaPage })))
const AlertasPage = lazy(() => import('@/features/alertas/AlertasPage').then((m) => ({ default: m.AlertasPage })))

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5_000, refetchOnWindowFocus: false } },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="grid h-full place-items-center bg-paper">
              <div className="flex items-center gap-3 text-sm font-semibold text-navy">
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-cyan" />
                Cargando GeoGreen
              </div>
            </div>
          }
        >
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<MapPage />} />
              <Route path="/lista" element={<ListaPage />} />
              <Route path="/alertas" element={<AlertasPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
