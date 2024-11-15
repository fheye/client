import '../../styles/output.css'
import '../../styles/map.css'
import MapBox from './map'
import Layout from '../../components/Layout'
import Card from '../../components/Card'
import { useState } from 'react'

export default function Map() {
    const bangkokCenter = {
        lat: 13.7563,
        lng: 100.5018,
    }

    const generateRandomCoordinate = () => {
        const radius = 0.5
        const random_angle = Math.random() * Math.PI * 2
        const random_radius = Math.sqrt(Math.random()) * radius

        return {
            lat: bangkokCenter.lat + random_radius * Math.cos(random_angle),
            lng: bangkokCenter.lng + random_radius * Math.sin(random_angle),
        }
    }

    const coordinates = Array.from({ length: 10 }, (_, i) => {
        const randomCoord = generateRandomCoordinate()
        return {
            lat: randomCoord.lat,
            lng: randomCoord.lng,
            title: `Location ${i + 1}`,
            body: `This is location ${i + 1} in Bangkok`,
        }
    })

    const statistics = [
        { label: 'Total Locations', value: coordinates.length },
        { label: 'Total Users', value: 100 },
        { label: 'Total Orders', value: 1000 },
    ]

    return (
        <Layout>
            <div className="relative w-full h-[70dvh] p-2 border-2 border-gray flex justify-center items-center bg-dark-blue">
                <div className="w-4/5 h-full p-2">
                    <MapBox id="map-container" coordinates={coordinates} />
                </div>
                <div className="w-1/5 h-full p-4 flex flex-col justify-around items-start text-white">
                    {statistics.map((stat, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <div className="w-4 h-4 rounded-full bg-blue-400"></div>
                            <div className="text-sm font-medium">
                                {stat.label}: <span className="font-bold">{stat.value}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}
