import 'leaflet/dist/leaflet.css'
import { TileLayer, Marker } from "react-leaflet"
import { StyledMapContainer } from './Map.styled';
/*import MarkerClusterGroup from "react-leaflet-cluster"; */

export const Map = () => {
    const markers: { geocode: [number, number]; popUp: string }[] = [
        {
          geocode: [48.8667, 2.3167],
          popUp: "Paris"
        },
        {
          geocode: [41.3850639, 2.1734035],
          popUp: "Barcelona"
        },
        {
          geocode: [51.5073509, -0.1277583],
          popUp: "London"
        }
      ];
    return (
        <StyledMapContainer id="map" center={[54.5260, 15.2551]} zoom={3}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/*<MarkerClusterGroup>*/}
                {markers.map((marker, index) => (
                    <Marker key={index} position={marker.geocode} />
                ))}
            {/*</MarkerClusterGroup>*/}
            
        </StyledMapContainer>

    )
}