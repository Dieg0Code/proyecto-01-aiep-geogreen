/** Estado de llenado según el semáforo del dispositivo (umbrales 40 / 80). */
export type EstadoLlenado = 'bajo' | 'medio' | 'lleno'

/** Datos fijos de un contenedor georreferenciado. */
export interface Contenedor {
  id: string
  nombre: string
  sector: string
  lat: number
  lon: number
}

/** Lectura de telemetría que envía el dispositivo. */
export interface Lectura {
  /** Nivel de llenado 0–100 %. */
  llenado: number
  /** Carga de batería 0–100 %. */
  bateria: number
  /** Intensidad de señal en dBm (ej: -55 fuerte, -95 débil). */
  rssi: number
  /** Marca de tiempo de la última lectura recibida (ISO 8601). */
  ultimaLectura: string
}

/** Contenedor con su última lectura asociada (lo que consume la UI). */
export type ContenedorConLectura = Contenedor & Lectura

/** Punto de la serie histórica de llenado. */
export interface PuntoHistorial {
  /** Marca de tiempo (ISO 8601). */
  t: string
  llenado: number
}

/** Tipo de alerta accionable. */
export type TipoAlerta = 'lleno' | 'bateria-baja' | 'sin-senal'

export interface Alerta {
  id: string
  contenedorId: string
  contenedorNombre: string
  sector: string
  tipo: TipoAlerta
  /** Momento en que la alerta pasó a estar activa (ISO 8601). */
  desde: string
}
