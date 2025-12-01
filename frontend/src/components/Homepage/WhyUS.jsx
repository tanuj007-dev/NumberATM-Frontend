import {  FaDesktop, FaUserCheck } from 'react-icons/fa';
import { CiClock2 } from "react-icons/ci";
export default function WhyUS() {
    return (
        <div className='pt-10 bg-white'>
            <h2 className='flex justify-center font-semibold text-orange-400 text-xl  md:text-2xl'>"Why Choose NumberATM"</h2>
            <div className='my-8  mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4'>
                <div className='rounded-md border justify-center flex flex-col gap-2 items-center text-center border-orange-500 p-3 py-5 md:p-5 md:py-10 text-nowrap bg-white shadow-xl '>
                    {/* <MdOutlineElectricBolt className='text-6xl' /> */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12 md:size-20">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                    </svg>

                    <p className='font-medium text-orange-500 text-sm md:text-lg'>Lighting-Fast Results:</p>
                    <p className='font-medium text-gray-700 text-wrap text-xs'>Get the data you need instantly</p>
                </div>
                <div className='rounded-md border flex flex-col gap-2 items-center text-center border-orange-500 p-3 py-5 md:p-5 md:py-10 text-nowrap bg-white shadow-xl '>
                    <FaUserCheck className='text-[2.5rem] md:text-[5rem]' />
                    <p className='font-medium text-orange-500 text-sm md:text-lg'>Accurate Information:</p>
                    <p className='font-medium text-gray-700 text-wrap text-xs'>Trusted By Professionals Worldwide</p>
                </div>
                <div className='rounded-md border flex flex-col gap-2 items-center text-center border-orange-500 p-3 py-5 md:p-5 md:py-10 text-nowrap bg-white shadow-xl '>
                    <FaDesktop className='text-[2.5rem] md:text-[5rem]' />
                    <p className='font-medium text-orange-500 text-sm md:text-lg'>User-Friendly Interface:</p>
                    <p className='font-medium text-gray-700 text-wrap text-xs'>Designed for Simplicity and efficiency</p>
                </div>
                <div className='rounded-md border flex flex-col gap-2 items-center text-center border-orange-500 p-3 py-5 md:p-5 md:py-10 text-nowrap bg-white shadow-xl '>
                    <CiClock2 className='text-[2.5rem] md:text-[5rem]' />
                    <p className='font-medium text-orange-500 text-sm md:text-lg'>24/7 Availability:</p>
                    <p className='font-medium text-gray-700 text-wrap text-xs'>Access anytime, anywhere</p>
                </div>
            </div>
        </div>
    )
}
