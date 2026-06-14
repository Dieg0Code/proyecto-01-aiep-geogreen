import { useQuery } from '@tanstack/react-query'
import { telemetry } from '@/lib/telemetry'
import { derivarAlertas } from '@/lib/status'

/** Intervalo de refresco — simula el envío periódico del dispositivo. */
const REFRESH_MS = 10_000

export function useContenedores() {
  return useQuery({
    queryKey: ['contenedores'],
    queryFn: () => telemetry.getContenedores(),
    refetchInterval: REFRESH_MS,
  })
}

export function useContenedor(id: string | undefined) {
  return useQuery({
    queryKey: ['contenedor', id],
    queryFn: () => telemetry.getContenedor(id!),
    enabled: Boolean(id),
    refetchInterval: REFRESH_MS,
  })
}

export function useHistorial(id: string | undefined) {
  return useQuery({
    queryKey: ['historial', id],
    queryFn: () => telemetry.getHistorial(id!, { horas: 24, puntos: 48 }),
    enabled: Boolean(id),
    refetchInterval: REFRESH_MS,
  })
}

export function useAlertas() {
  return useQuery({
    queryKey: ['contenedores'],
    queryFn: () => telemetry.getContenedores(),
    refetchInterval: REFRESH_MS,
    select: (contenedores) => derivarAlertas(contenedores),
  })
}
