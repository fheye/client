import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css'
import '../../styles/map.css'

const INITIAL_ZOOM = 10.12
const DEFAULT_CENTER = [100.5018, 13.7563] // Bangkok center

export default function MapBox({ coordinates = [] }) {
    const mapRef = useRef(null)
    const mapContainerRef = useRef(null)

    const [center, setCenter] = useState(null)
    const [zoom, setZoom] = useState(INITIAL_ZOOM)

    const initializeMap = (center, userLocationAvailable = true) => {
        setCenter(center)

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            center,
            zoom: INITIAL_ZOOM,
        })

        mapRef.current = map

        if (userLocationAvailable) {
            addMarker({
                location: center,
                title: 'Your Location',
                body: `Latitude: ${center[1].toFixed(4)}, Longitude: ${center[0].toFixed(4)}`,
                color: 'blue',
            })
        }

        coordinates.forEach(({ lng, lat, title, body }) => {
            addMarker({
                location: [lng, lat],
                title,
                body,
                color: 'red',
            })
        })

        map.on('move', () => {
            const mapCenter = map.getCenter()
            setCenter([mapCenter.lng, mapCenter.lat])
            setZoom(map.getZoom())
        })
    }

    const addMarker = ({ location, title, body, color }) => {
        let markerOptions = { color }

        if (color === 'red') {
            const el = document.createElement('div')
            el.style.width = '13px'
            el.style.height = '13px'
            el.style.borderRadius = '50%'
            el.style.backgroundColor = color
            el.style.boxShadow = '0 0 5px rgba(0,0,0,0.5)'
            el.style.cursor = 'pointer'
            markerOptions = { element: el }
        }

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <div style="font-family: Arial, sans-serif; padding: 10px; max-width: 200px;">
                <h3 style="margin: 0; font-size: 16px; color: #333;">${title}</h3>
                <p style="margin: 5px 0 0; font-size: 14px; color: #666;">${body}</p>
            </div>
        `)

        const marker = new mapboxgl.Marker(markerOptions).setLngLat(location).addTo(mapRef.current)

        marker.getElement().addEventListener('mouseenter', () => {
            popup.setLngLat(location).addTo(mapRef.current)
        })

        marker.getElement().addEventListener('mouseleave', () => {
            popup.remove()
        })
    }

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoidDRyMWsiLCJhIjoiY20zajFpOXA2MDc0YzJyc2NvaWFzcTR5cSJ9.TcZ5KBhrCvSNACZ4bG5oxw'
        navigator.geolocation.getCurrentPosition(
            (position) => initializeMap([position.coords.longitude, position.coords.latitude]),
            () => initializeMap(DEFAULT_CENTER, false)
        )

        return () => {
            if (mapRef.current) mapRef.current.remove()
        }
    }, [coordinates])

    useEffect(() => {
        const handleResize = () => {
            if (mapRef?.current) {
                try {
                    mapRef.current.resize();
                } catch (error) {
                }
            }
        };
        const resizeObserver = new ResizeObserver(() => handleResize());
        if (mapContainerRef.current) {
            resizeObserver.observe(mapContainerRef.current);
        }

        return () => {
            if (mapRef?.current) {
                try {
                    mapRef.current.remove();
                } catch (error) {
                }
            }
            if (resizeObserver) resizeObserver.disconnect();
        };
    }, []);



    return (
        <>
            {center && (
                <div className="sidebar">
                    Longitude: {center[0].toFixed(4)} | Latitude: {center[1].toFixed(4)}
                </div>
            )}
            <div id="map-container" ref={mapContainerRef} />
        </>
    )
}
