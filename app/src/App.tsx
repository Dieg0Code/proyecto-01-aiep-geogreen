import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppLayout } from '@/components/AppLayout'
import { MapPage } from '@/features/map/MapPage'
import { ListaPage } from '@/features/lista/ListaPage'
import { AlertasPage } from '@/features/alertas/AlertasPage'

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5_000, refetchOnWindowFocus: false } },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<MapPage />} />
            <Route path="/lista" element={<ListaPage />} />
            <Route path="/alertas" element={<AlertasPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
