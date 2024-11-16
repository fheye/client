import { Link } from 'react-router-dom'
import '../../styles/output.css'

export default function Landing() {
    return (
        <div className='w-full h-full flex flex-col justify-center items-center text-customWhite'>
            <div className='w-1/2 h-[70dvh] flex justify-center items-center m-4'>
                <Link to='/map' className='w-[40%] h-full rounded-xl px-4 m-4 bg-dashboardGradient shadow-dashboard-shadow flex items-end justify-center'>
                    <img
                        src='src/assets/icons/map_photo.png'
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
                        <img src='src/assets/icons/safetyscore_great.png' alt='greatsafety' />
                    </div>
                </div>
            </div>
            <div className='w-1/2 h-[12dvh] flex justify-center items-center'>
                <div className='w-[20%] h-full rounded-xl px-4 bg-[#D9D9D9] m-4'></div>
                <button className='w-[80%] h-full rounded-xl px-4 bg-customWhite m-4 cursor-pointer'>
                    <div className='flex flex-row w-full h-full justify-between items-center '>
                        <div className='flex flex-col text-2xl h-full justify-center mx-8 text-black'>
                            <span>MAKE</span>
                            <span>SUBMISSION</span>
                        </div>
                        <div>
                            <img src='src/assets/icons/arrow_black.png' alt='arrow-up' />
                        </div>
                    </div>
                </button>
            </div>
        </div>
    )
}