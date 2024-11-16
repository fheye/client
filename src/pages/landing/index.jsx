import { Link } from 'react-router-dom'
import { ethers } from 'ethers'
import '../../styles/output.css'
import { useState, useEffect } from 'react'
import Notifications from '../../components/Notifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmileBeam, faFaceMeh, faFaceFrown } from '@fortawesome/free-solid-svg-icons';
import { PushAPI, CONSTANTS } from '@pushprotocol/restapi';
import { getSafetyScore } from '../../utils'

const EmojiStates = {
    HAPPY: "HAPPY",
    NORMAL: "NORMAL",
    SAD: "SAD",
};

export default function Landing() {
    const [notificationActive, setNotificationActive] = useState(false);
    const [emojiState, setEmojiState] = useState(EmojiStates.NORMAL);
    const [pushUser, setPushUser] = useState(null);
    let initializingPushUser = false;

    async function initializePushUser(params) {
        initializingPushUser = true;

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const pushUser = await PushAPI.initialize(
            signer,
            {
                env: CONSTANTS.ENV.STAGING,
            }
        );
        
        setPushUser(pushUser);
        initializingPushUser = false;
    }

    useEffect(() => {
        if (pushUser !== null || initializingPushUser) return;
        initializePushUser();
    }, []);

    const emojiIcons = {
        [EmojiStates.HAPPY]: faFaceSmileBeam,
        [EmojiStates.NORMAL]: faFaceMeh,
        [EmojiStates.SAD]: faFaceFrown,
    };

    const calculateEmojiState = (score) => {
        if (score === null) {
            setEmojiState(EmojiStates.NORMAL);
        } else if (score > 0.7) {
            setEmojiState(EmojiStates.SAD);
        } else if (score > 0.4) {
            setEmojiState(EmojiStates.NORMAL);
        } else {
            setEmojiState(EmojiStates.HAPPY);
        }
    }

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    let latitudeInt = Math.round(position.coords.latitude * 100)
                    let longitudeInt = Math.round(position.coords.longitude * 100)

                    getSafetyScore(latitudeInt, longitudeInt).then((data) => {
                        calculateEmojiState(data);
                    });
                },
                (error) => {
                    console.error('Error getting user location:', error)
                }
            )
        } else {
            console.error('Geolocation is not supported by this browser.')
        }
    }, [])

    return (
        <div className='w-full h-full flex flex-col justify-center items-center text-customWhite'>
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
            <div className='w-1/2 h-[70dvh] flex justify-center items-center m-4'>
                <Link
                    to='/map'
                    className='w-[40%] h-full rounded-xl m-4 bg-dashboardGradient shadow-dashboard-shadow flex justify-center items-center'
                >
                    <img
                        src='/icons/map_photo.png'
                        alt='map'
                        className='w-full h-full object-cover rounded-xl mix-blend-difference'
                    />
                </Link>
                <div className='w-[60%] h-full rounded-xl px-4 relative m-4 bg-dashboardGradient shadow-dashboard-shadow flex flex-col justify-evenly items-center'>
                    <div className='flex flex-col text-xl text-center'>
                        <span>YOUR SAFETY</span>
                        <span>SCORE NOW</span>
                    </div>
                    <div className='flex flex-col text-6xl text-center'>
                        <span>{emojiState}</span>
                    </div>
                    <div className=''>
                        <FontAwesomeIcon icon={emojiIcons[emojiState]} size='7x' />
                    </div>
                </div>
            </div>
            <div className='w-1/2 h-[14dvh] flex justify-center items-center relative'>
                <div
                    onClick={() => setNotificationActive(!notificationActive)}
                    className={`z-10 cursor-pointer h-full rounded-xl px-4 bg-dashboardGradient shadow-dashboard-shadow m-4 flex items-center justify-center ${notificationActive ? 'absolute right-[84%] w-[60%]' : 'w-[20%]'
                        } transition-width duration-500`}>
                    <img
                        src="icons/logo.png"
                        alt="logo"
                        className={`w-[40px] h-[40px] object-contain ${notificationActive ? 'ml-auto pr-4' : ''}`}
                    />
                    <div className='absolute left-0 bottom-[10dvh]'>
                        {notificationActive && pushUser != null && <Notifications pushUser={pushUser} />}
                    </div>
                </div>

                <Link to='/img' className={`${notificationActive ? 'w-[60%]' : 'w-[80%]'} h-full rounded-xl px-4 bg-customWhite m-4 cursor-pointer z-10 opacity-80`}>
                    <div className='flex flex-row w-full h-full justify-between items-center'>
                        <div className='flex flex-col text-2xl h-full justify-center mx-8 text-black'>
                            <span>MAKE</span>
                            <span>SUBMISSION</span>
                        </div>
                        <div>
                            <img src='/icons/arrow_black.png' alt='arrow-up' />
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}