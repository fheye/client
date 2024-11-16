import '../../styles/output.css'
import '../../styles/map.css'
import MapBox from './map'
import Layout from '../../components/Layout'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowRight, faChevronRight, faChevronLeft, faFaceSmileBeam, faFaceMeh, faFaceFrown } from '@fortawesome/free-solid-svg-icons';

const EmojiStates = {
    HAPPY: "HAPPY",
    NORMAL: "NORMAL",
    SAD: "SAD",
};

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

    const [isExpanded, setIsExpanded] = useState(false);

    const [emojiState, setEmojiState] = useState(EmojiStates.HAPPY);

    const emojiIcons = {
        [EmojiStates.HAPPY]: faFaceSmileBeam,
        [EmojiStates.NORMAL]: faFaceMeh,
        [EmojiStates.SAD]: faFaceFrown,
    };
    return (
        <Layout>
            <div className='flex flex-col justify-center items-center w-full h-full'>
                <div
                    className={`relative w-full h-[70dvh] flex justify-center items-center bg-dark-blue transition-all duration-300`}
                >
                    <div
                        className={`p-2 mr-4 rounded-xl ${isExpanded ? 'w-[70%]' : 'w-[38%]'} h-full transition-all duration-300 bg-bgDark text-bgDark relative `}

                    >
                        <MapBox id="map-container" coordinates={coordinates} />
                        <button className='absolute bottom-0 left-0 w-full' onClick={() => setIsExpanded(!isExpanded)}>
                            {
                                isExpanded ?
                                    <div className='w-full flex flex-col justify-end items-end text-left text-2xl p-4 mr-4'>
                                        <span>Back</span>
                                        <span>
                                            <FontAwesomeIcon icon={faChevronLeft} size="1x" style={{ ccolor: "var(--color-emoji-dark)" }} />
                                        </span>
                                    </div>
                                    :
                                    <div className='flex flex-col justify-start items-start text-left text-2xl p-4 ml-4'>
                                        <span>Go</span>
                                        <span>
                                            Map View
                                            <FontAwesomeIcon icon={faChevronRight} size="1x" style={{ color: "var(--color-emoji-dark)", paddingLeft: '14px' }} />
                                        </span>
                                    </div>
                            }

                        </button>
                    </div>
                    <div
                        className={`h-full p-4 text-center text-2xl rounded-xl flex flex-col bg-bgDark text-customLight  justify-around items-start transition-all duration-300 ${isExpanded ? 'w-[30%]' : 'w-[62%]'
                            }`}
                    >
                        <div className='w-full'>
                            <span>Hello Vovo</span>
                        </div>
                        <div className='w-full'>
                            <span>Show my safety range</span>
                        </div>
                        <div className='w-full'>
                            <span>Show Notifications</span>
                        </div>
                        <div className='w-full flex flex-col items-center justify-center'>
                            <span>Your Safety</span>
                            <span>Score Now</span>
                            {340}
                        </div>
                        <div className='w-full flex flex-col items-center justify-center'>
                            <span>HIGH</span>
                            <span>

                                <FontAwesomeIcon
                                    icon={emojiIcons[emojiState]}
                                    size="2x"
                                    style={{ color: "var(--color-emoji-light)" }}
                                />
                            </span>
                        </div>
                    </div>
                </div>
                <button className="relative m-4 w-full h-[15dvh] rounded-xl bg-customLight text-bgDark text-2xl flex items-center">
                    <div className="absolute left-12">
                        <FontAwesomeIcon icon={faCircleArrowRight} size="2x" style={{ color: "var(--color-emoji-dark)", stroke: "var(--color-emoji-dark)" }} />
                    </div>
                    <div className="mx-auto">
                        MAKE SUBMISSION
                    </div>
                </button>


            </div>
        </Layout>
    )
}
