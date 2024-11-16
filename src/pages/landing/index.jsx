import { Link } from 'react-router-dom'
import '../../styles/output.css'

export default function Landing() {
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
                        <span>GREAT</span>
                    </div>
                    <div className=''>
                        <img src='/icons/safetyscore_great.png' alt='greatsafety' />
                    </div>
                </div>
            </div>
            <div className='w-1/2 h-[14dvh] flex justify-center items-center'>
                <div className='w-[20%] h-full rounded-xl px-4 bg-dashboardGradient shadow-dashboard-shadow m-4 flex items-center justify-center'>
                    <img src="/icons/logo.png" alt="logo" className='w-1/2 h-1/2 object-cover' />
                </div>
                <Link to='/img' className='w-[80%] h-full rounded-xl px-4 bg-customWhite m-4 cursor-pointer z-10 opacity-80'>
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