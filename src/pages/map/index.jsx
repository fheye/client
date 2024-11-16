import '../../styles/output.css'
import '../../styles/map.css'
import MapBox from './map'
import { useEffect, useState } from 'react'
import { faFaceSmileBeam, faFaceMeh, faFaceFrown } from '@fortawesome/free-solid-svg-icons';
import { getCloseCriminalCount, getCloseCriminals, getLatestActivityFeeds, getUserDetectedCriminalCount, getUserRevealedImageCount, getUserUploadedImageCount } from '../../utils'

const EmojiStates = {
    HAPPY: "HAPPY",
    NORMAL: "NORMAL",
    SAD: "SAD",
};

export default function Map() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [emojiState, setEmojiState] = useState(EmojiStates.HAPPY);
    const [coordinates, setCoordinates] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [informations , setInformations] = useState([])

    const emojiIcons = {
        [EmojiStates.HAPPY]: faFaceSmileBeam,
        [EmojiStates.NORMAL]: faFaceMeh,
        [EmojiStates.SAD]: faFaceFrown,
    };

    const getInformations = async () => {
        const promises = [];
        const locationNorm = userLocation.map((coord) => Math.round(coord * 100));
        const walletAddress = localStorage.getItem('walletAddress');

        promises.push(getCloseCriminalCount(locationNorm[0], locationNorm[1], 8));
        promises.push(getCloseCriminalCount(locationNorm[0], locationNorm[1], 24));
        if (walletAddress && walletAddress.length > 0) {
            promises.push(getUserUploadedImageCount(walletAddress));
            promises.push(getUserRevealedImageCount(walletAddress));
            promises.push(getUserDetectedCriminalCount(walletAddress));
        }

        return Promise.all(promises).then((data) => {
            const criminalCount8 = data[0];
            const criminalCount24 = data[1];
            const userUploadedImageCount = data[2];
            const userRevealedImageCount = data[3];
            const userDetectedCriminalCount = data[4];

            const newInformations = [
                {
                    title: 'Criminals Nearby',
                    body: `${criminalCount8} criminals within 10km.`,
                },
                {
                    title: 'Criminals Nearby',
                    body: `${criminalCount24} criminals within 30km.`,
                }
            ];

            if (walletAddress && walletAddress.length > 0) {
                newInformations.push({
                    title: 'Your Uploads',
                    body: `Uploaded ${userUploadedImageCount} images.`,
                });

                newInformations.push({
                    title: 'Your Revealed Images',
                    body: `Revealed ${userRevealedImageCount} images.`,
                });

                newInformations.push({
                    title: 'Detected Criminals',
                    body: `Revealed ${userDetectedCriminalCount} criminals.`,
                });
            }

            return newInformations;
        })
    }

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords
                    setUserLocation([longitude, latitude])

                    let latitudeInt = Math.round(position.coords.latitude * 100)
                    let longitudeInt = Math.round(position.coords.longitude * 100)

                    getCloseCriminals(longitudeInt, latitudeInt, 100000).then((data) => {
                        console.log(data)
                        setCoordinates(
                            data.map((item) => ({
                                lng: item.locationX / 100,
                                lat: item.locationY / 100,
                                title: 'Criminal',
                                body: `Last seen: ${new Date(item.timestamp * 1000).toLocaleString()}`,
                            }))
                        )
                    })
                },
                (error) => {
                    console.error('Error getting user location:', error)
                }
            )
        } else {
            console.error('Geolocation is not supported by this browser.')
        }
    }, [])

    useEffect(() => {
        if (!userLocation) return
    
        getInformations().then((data) => {
            setInformations(data)
        })
    }, [userLocation])

    return (
        <div className='flex flex-col justify-center items-center w-full h-full'>
            <video
                className="absolute top-0 left-0 w-full h-full object-cover rounded-lg mix-blend-lighten"
                autoPlay
                loop
                muted
                playsInline
            >
                <source src="/greenbg.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div
                className={`relative w-full h-[70dvh] flex justify-center items-center bg-dark-blue transition-all duration-300`}
            >
                <div
                    className={`p-2 mr-4 rounded-xl w-[70%] h-full relative`}

                >
                    <MapBox id="map-container" coordinates={coordinates} informations={informations} />
                </div>
                <div className='w-[20%] h-full rounded-xl px-4 relative m-4 bg-dashboardGradient shadow-dashboard-shadow flex flex-col justify-evenly items-center text-customWhite'>
                    <div className='flex flex-col text-xl text-center'>
                        <span>YOUR SAFETY</span>
                        <span>SCORE NOW</span>
                    </div>
                    <div className='flex flex-col text-6xl text-center'>
                        <span>GREAT</span>
                    </div>
                    <div className=''>
                        <img src='/icons/safetyscore_great.png' alt='greatsafety' />
                    </div>
                </div>

            </div>
        </div>
    )
}
