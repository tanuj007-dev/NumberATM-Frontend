import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

function WhyHigh() {

    const steps = [
        {
            number: 1,
            title: 'Exclusivity and Status',
            desc: 'Our Luxury VIP numbers India collection caters specifically to discerning clients who understand that premium numbers reflect success and sophistication. Each acquisition represents an investment in personal or corporate branding.',
        },
        {
            number: 2,
            title: 'Seamless Experience',
            desc: 'Buy phone Numbers online through our intuitive platform designed for busy professionals. Our streamlined process eliminates traditional bureaucratic hurdles, delivering your chosen number swiftly and securely.',
        },
        {
            number: 3,
            title: 'Comprehensive Selection',
            desc: 'From simple Buy vip mobile numbers to complex pattern requirements, our inventory spans:',
            list: [
                'Sequential number combinations',
                'Repeated digit patterns',
                'Culturally auspicious arrangements',
                'Personalized number matching services',
            ],
        },
        {
            number: 4,
            title: 'Comprehensive Selection',
            desc: 'From simple Buy vip mobile numbers to complex pattern requirements, our inventory spans:',
            list: [
                'Sequential number combinations',
                'Repeated digit patterns',
                'Culturally auspicious arrangements',
                'Personalized number matching services',
            ],
        },
    ];


    return (
        <>


            <div className="bg-[url(./assets/img1.png)] bg-cover bg-bottom pt-4 sm:pt-10 hidden sm:flex flex-col items-center justify-center overflow-hidden">
                {/* Background Image */}

                {/* Heading Section */}
                <div className="text-center mt-4 ">
                    <h2 className="text-xl md:text-3xl font-semibold text-black mb-12 px-4 [text-shadow:2px_2px_2px_#ddd]">Why High Net Worth Individuals Choose NumberATM</h2>
                </div>

                {/* Background grid for layout alignment */}
                <div className="grid grid-cols-1 md:grid-cols-2  gap-12  w-full  max-w-6xl relative pb-4 md:pb-12 px-2 sm:px-0">


                    <div className="flex items-center gap-4 justify-start ">
                        <span className="w-auto font-semibold  text-white">
                            <div className="h-12 w-12 flex justify-center items-center bg-[#17565D] border-2 border-white shadow-[0px_3px_8px_rgba(0,0,0,0.24)] rounded-full">1</div>
                        </span>
                        <div className="w-full px-4 bg-white shadow-[0px_3px_8px_rgba(0,0,0,0.24)] rounded-2xl p-4">
                            <h3 className="font-semibold text-base mb-1 flex items-center gap-2">Exclusivity and Status</h3>
                            <p className="text-xs sm:text-sm text-gray-600">
                                Our Luxury VIP numbers India collection caters specifically to discerning clients who understand that premium numbers reflect success and sophistication. Each acquisition represents an investment in personal or corporate branding.
                            </p>
                        </div>
                    </div>


                    <div className="flex items-center gap-4 justify-start ">
                        <span className="w-auto font-semibold  text-white">
                            <div className="h-12 w-12 flex justify-center items-center bg-[#17565D] border-2 border-white shadow-[0px_3px_8px_rgba(0,0,0,0.24)] rounded-full">2</div>
                        </span>
                        <div className="w-full px-4 bg-white shadow-[0px_3px_8px_rgba(0,0,0,0.24)] rounded-2xl p-4">
                            <h3 className="font-semibold text-base mb-1 flex items-center gap-2">Seamless Experience</h3>
                            <p className="text-xs sm:text-sm text-gray-600">
                                Buy phone Numbers online through our intuitive platform designed for busy professionals. Our streamlined process eliminates traditional bureaucratic hurdles, delivering your chosen number swiftly and securely.
                            </p>
                        </div>
                    </div>


                    <div className="flex items-center gap-4 justify-start ">
                        <span className="w-auto font-semibold  text-white">
                            <div className="h-12 w-12 flex justify-center items-center bg-[#17565D] border-2 border-white shadow-[0px_3px_8px_rgba(0,0,0,0.24)] rounded-full">3</div>
                        </span>
                        <div className="w-full px-4 bg-white shadow-[0px_3px_8px_rgba(0,0,0,0.24)] rounded-2xl p-4">
                            <h3 className="font-semibold text-base mb-1 flex items-center gap-2">Comprehensive Selection</h3>
                            <p className="text-xs sm:text-sm text-gray-600">From simple Buy vip mobile numbers to complex pattern requirements, our inventory spans:</p>

                            <ul className="ml-4 list-disc text-xs sm:text-sm text-gray-600">
                                <li className='mb-0'>Sequential number combinations</li>
                                <li className='mb-0'>Repeated digit patterns</li>
                                <li className='mb-0'>Culturally auspicious arrangements</li>
                                <li className='mb-0'>Personalized number matching services</li>
                            </ul>


                        </div>
                    </div>

                    <div className="flex items-center gap-4 justify-start ">
                        <span className="w-auto font-semibold  text-white">
                            <div className="h-12 w-12 flex justify-center items-center bg-[#17565D] border-2 border-white shadow-[0px_3px_8px_rgba(0,0,0,0.24)] rounded-full">4</div>
                        </span>
                        <div className="w-full px-4 bg-white shadow-[0px_3px_8px_rgba(0,0,0,0.24)] rounded-2xl p-4">
                            <h3 className="font-semibold text-base mb-1 flex items-center gap-2">Comprehensive Selection</h3>
                            <p className="text-xs sm:text-sm text-gray-600">From simple Buy vip mobile numbers to complex pattern requirements, our inventory spans:</p>

                            <ul className="ml-4 list-disc text-xs sm:text-sm text-gray-600">
                                <li className='mb-0'>Sequential number combinations</li>
                                <li className='mb-0'>Repeated digit patterns</li>
                                <li className='mb-0'>Culturally auspicious arrangements</li>
                                <li className='mb-0'>Personalized number matching services</li>
                            </ul>


                        </div>
                    </div>




                </div>



            </div>



            {/* swiper mobile why high  */}
            <div className="bg-[url(./assets/img1.png)] bg-cover bg-center whyhigh bg-white sm:hidden pt-4 sm:pt-12 flex flex-col items-center justify-center bg-white overflow-hidden">

                {/* Heading Section */}
                <div className="text-center mt-4 ">
                    <h2 className="text-xl md:text-3xl font-semibold text-black mb-2 px-4 [text-shadow:2px_2px_2px_#ddd]">Why High Net Worth Individuals Choose NumberATM</h2>
                </div>


                <div className="w-full mx-auto mb-12 px-4">
                    <Swiper
                        modules={[Autoplay,Pagination]}
                        spaceBetween={30}
                        slidesPerView={1}
                        autoplay={{delay: 3000, disableOnInteraction: false }}
                        loop
                        pagination={{ clickable: true }}
                    >
                        {steps.map((step, index) => (
                            <SwiperSlide key={index}>
                                <div className="py-4">
                                    <span className="w-full -bottom-3 relative font-semibold text-white">
                                        <div className="h-12 w-12 flex justify-center items-center bg-[#17565D] border-2 border-white shadow-[0px_3px_8px_rgba(0,0,0,0.24)] rounded-full mx-auto">
                                            {step.number}
                                        </div>
                                    </span>

                                    <div className="w-full px-4 bg-white shadow-[0px_3px_8px_rgba(0,0,0,0.24)] rounded-2xl p-4">
                                        <h3 className="font-semibold text-base mb-1 flex items-center gap-2">
                                            {step.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-gray-600">{step.desc}</p>

                                        {step.list && (
                                            <ul className="mt-2 ml-4 list-disc text-xs sm:text-sm text-gray-600">
                                                {step.list.map((item, i) => (
                                                    <li key={i} className="mb-0">
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>



            </div>




        </>
    )
}

export default WhyHigh
