import '../../styles/output.css'
import '../../styles/map.css'
import MapBox from './map'
import Layout from '../../components/Layout'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

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

    const [isExpanded, setIsExpanded] = useState(false);


    return (
        <Layout>
            <div className='flex flex-col justify-center items-center w-full h-full'>
                <div
                    className={`relative w-full h-[70dvh] flex justify-center items-center bg-dark-blue transition-all duration-300`}
                >
                    <div
                        className={`p-2 mr-4 rounded-xl ${isExpanded ? 'w-[70%]' : 'w-[38%]'} h-full transition-all duration-300 bg-gray-300 relative `}

                    >
                        <MapBox id="map-container" coordinates={coordinates} />
                        <button className='absolute bottom-0 left-0 w-full' onClick={() => setIsExpanded(!isExpanded)}>
                            {
                                isExpanded ? <div className='flex flex-col justify-start items-start text-left text-2xl p-4'>
                                    <span>Go</span>
                                    <span>Map View</span>

                                </div> :
                                    <div className='w-full flex flex-col justify-end items-end text-right text-2xl p-4'>
                                        <span>Go</span>
                                        <span>
                                            Map View
                                        </span>
                                    </div>
                            }

                        </button>
                    </div>
                    <div
                        className={`h-full p-4 rounded-xl flex flex-col bg-gray-500 justify-around items-start text-white transition-all duration-300 ${isExpanded ? 'w-[30%]' : 'w-[62%]'
                            }`}
                    >
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
                <button className="m-4 w-full h-[15dvh] rounded-xl bg-gray-100 text-2xl flex items-center justify-center space-x-4">
                    <FontAwesomeIcon icon={faArrowRight} size="2x" style={{ color: "black" }} />
                    <span>MAKE SUBMISSION</span>
                </button>

            </div>
        </Layout>
    )
}
