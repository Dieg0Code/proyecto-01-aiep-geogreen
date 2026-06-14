import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import type { ContenedorConLectura } from '@/lib/types'
import { estaOffline } from '@/lib/status'
import { OSORNO_CENTER } from '@/lib/telemetry'
import { makePin } from './pin'

interface MapViewProps {
  contenedores: ContenedorConLectura[]
  selectedId?: string
  onSelect: (id: string) => void
  now: number
  children?: React.ReactNode
}

export function MapView({ contenedores, selectedId, onSelect, now, children }: MapViewProps) {
  return (
    <MapContainer
      center={OSORNO_CENTER}
      zoom={13}
      minZoom={11}
      zoomControl={false}
      className="h-full w-full"
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        subdomains="abcd"
        maxZoom={20}
      />
      {contenedores.map((c) => (
        <Marker
          key={c.id}
          position={[c.lat, c.lon]}
          icon={makePin(c.llenado, estaOffline(c, now), c.id === selectedId)}
          eventHandlers={{ click: () => onSelect(c.id) }}
        />
      ))}
      {children}
    </MapContainer>
  )
}
