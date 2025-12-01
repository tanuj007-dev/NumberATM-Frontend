"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import greengirl from "../assets/greengirl.png";
import google from "../assets/google.avif"
const testimonials = [
  {
    name: "Rohit Sharma",
    role: "Business Owner",
    img: "https://i.pinimg.com/736x/a4/1a/97/a41a97e76816e399290c37341a0f4c58.jpg",
    rating: 5,
    review:
      "NumberATM provided me with a premium VIP number that perfectly matches my brand. Amazing service!",
  },
  {
    name: "Anjali Verma",
    role: "Influencer",
    img: "https://i.pinimg.com/736x/90/62/fc/9062fcb8b822b5ce8406eed41d77887b.jpg",
    rating: 4,
    review:
      "Loved the experience! The team helped me choose a unique number that stands out. Highly recommended.",
  },
  {
    name: "Karan Singh",
    role: "Entrepreneur",
    img: "https://i.pinimg.com/736x/84/8f/3b/848f3b92a3e2a6040faccad5888f851e.jpg",
    rating: 5,
    review:
      "Very smooth process and excellent customer support. The VIP number has boosted my business identity.",
  },
];

export default function TestimonialS() {
  return (
    <div className="bg-[url(./assets/img1.png)] bg-cover bg-center bg-no-repeat  px-4 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* ✅ LEFT IMAGE — HIDE ON MOBILE */}
        <div className="hidden md:flex ">
          <img
            src={greengirl}
            alt="Client Testimonial"
            className="w-full max-w-4xl object-contain"
          />
        </div>

        {/* ✅ RIGHT SIDE — RESPONSIVE SWIPER */}
        <div className="w-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold mb-4">
            <span className="text-[#17565D]">What Our</span>{" "}
            <span className="text-[#F5C037]">Clients Say</span>
          </h2>

          <div className="relative w-full">
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 2500 }}
              pagination={{ clickable: true }}
              loop={true}
              slidesPerView={1}
              spaceBetween={20}
              className="pb-10"
            >
              {testimonials.map((t, index) => (
              <SwiperSlide key={index}>
  <div className="
    w-full sm:w-[90%] md:w-[80%] lg:w-[500px]
    max-w-[500px] mx-auto
    border border-orange-500 rounded-xl p-4
    bg-white shadow-[0_2px_6px_rgba(0,0,0,0.06)]
  ">
    
    {/* Top Row */}
    <div className="flex items-center justify-between mb-2">

      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full overflow-hidden">
          <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
        </div>

        <div className="leading-tight">
          <h3 className="font-semibold text-[15px] text-gray-900">{t.name}</h3>
          <div className="flex items-center text-yellow-500 text-[13px]">
            {Array.from({ length: t.rating }).map((_, i) => (
              <span key={i}>★</span>
            ))}
          </div>
        </div>
      </div>

      <img
        src={google}
        alt="Google"
        className="w-5 h-5"
      />
    </div>

    <hr />

    <p className="text-[13px] text-gray-600 leading-relaxed mt-2">
      {t.review}
    </p>

  </div>
</SwiperSlide>

              ))}
            </Swiper>

            {/* Fix pagination spacing */}
            <style>
              {`
                .swiper-pagination {
                  margin-top: 10px !important;
                  position: relative !important;
                }
              `}
            </style>
          </div>
        </div>
      </div>
    </div>
  );
}
