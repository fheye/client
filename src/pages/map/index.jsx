import '../../styles/output.css'
import '../../styles/map.css'
import MapBox from './map'

export default function Map() {
    const bangkokCenter = {
        lat: 13.7563,
        lng: 100.5018
    };

    const generateRandomCoordinate = () => {
        const radius = 0.5;
        const random_angle = Math.random() * Math.PI * 2;
        const random_radius = Math.sqrt(Math.random()) * radius;
        
        return {
            lat: bangkokCenter.lat + (random_radius * Math.cos(random_angle)),
            lng: bangkokCenter.lng + (random_radius * Math.sin(random_angle))
        };
    };

    const coordinates = Array.from({ length: 10 }, (_, i) => {
        const randomCoord = generateRandomCoordinate();
        return {
            lat: randomCoord.lat,
            lng: randomCoord.lng,
            title: `Location ${i + 1}`,
            body: `This is location ${i + 1} in Bangkok`,
        };
    });

    return <MapBox id="map-container" coordinates={coordinates} />
}
