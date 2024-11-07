import 'leaflet/dist/leaflet.css'
import { TileLayer } from "react-leaflet"
import { StyledMapContainer } from './Map.styled';

export const Map = () => {
    return (
        <StyledMapContainer id="map" center={[54.5260, 15.2551]} zoom={3}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </StyledMapContainer>
    )
}