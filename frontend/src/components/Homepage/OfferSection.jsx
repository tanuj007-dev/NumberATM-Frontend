import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import offer1 from "../../assets/offer/1.jpg"
import offer2 from "../../assets/offer/2.jpg"
import offer3 from "../../assets/offer/3.jpg"
import offer4 from "../../assets/offer/4.jpg"
import offer5 from "../../assets/offer/5.jpg"

const offers = [
    {
        img: offer1,
        link: "#",
    },
   
    {
        img: offer2,
        link: "#",
    },
   
    {
        img: offer3,
        link: "#",
    },
   
    {
        img: offer4,
        link: "#",
    },
   
    {
        img: offer5,
        link: "#",
    },
   
];

const OfferSection = () => {
    return (
        <section className="p-4 my-4 lg:p-6 bg-[rgb(243,251,250)]">
            <div className="">
                <div className="container mx-auto">
                    {/* Heading */}
                    <div className="text-center">
                        <h2 className="text-xl sm:text-3xl font-semibold text-[#000000] leading-tight">
                            Numberatm <span className="text-[#17565D]  inline-block px-2">
                                Offer Zone
                            </span>
                        </h2>

                    </div>

                    {/* Swiper Slider */}
                    <Swiper
                        modules={[Autoplay]}
                        slidesPerView={1.05}
                        spaceBetween={12}
                        loop={true}
                        autoplay={{ delay: 2500, disableOnInteraction: false }}
                        breakpoints={{
                            360: { slidesPerView: 2 },
                            480: { slidesPerView: 2 },
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                            1280: { slidesPerView: 4 },
                        }}
                        className="relative"
                    >
                        {offers.map((offer, i) => (
                            <SwiperSlide key={i}>
                                <a
                                    href={offer.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block my-4 sm:my-6"
                                >
                                    <div className="relative group overflow-hidden rounded-xl">
                                        <div className="w-full h-[150px] sm:h-[170px] md:h-[200px] lg:h-[220px] bg-gray-100">
                                            <img
                                                src={offer.img}
                                                alt="Offer"
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </div>
                                </a>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default OfferSection;
