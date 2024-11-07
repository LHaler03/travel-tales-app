import 'leaflet/dist/leaflet.css';
import { TileLayer, Marker} from 'react-leaflet';
import { StyledMapContainer } from './Map.styled';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const Map = () => {
    const [markers, setMarkers] = useState<{ coordinates: [number, number]; popUp: string }[]>([]);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get('http://localhost:5185/api/locations');
                const locations = response.data.map((location: { latitude: number; longitude: number; name: string }) => ({
                    coordinates: [location.latitude, location.longitude] as [number, number],
                    popUp: location.name,
                }));

                setMarkers(locations);
            } catch (error) {
                console.error("Error fetching locations:", error);
            }
        };

        fetchLocations(); 
    }, []);

    return (
        <StyledMapContainer id="map" center={[54.5260, 15.2551]} zoom={3}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers.map((marker, index) => (
                <Marker key={index} position={marker.coordinates}/>
            ))}
        </StyledMapContainer>
    );
};
