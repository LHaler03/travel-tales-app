import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer } from "react-leaflet"

export const Map = () => {
    return (
        <MapContainer id="map" style={{ height: '100vh', width: '100%' }}center={[43.508133, 16.440193]} zoom={13}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    )
}