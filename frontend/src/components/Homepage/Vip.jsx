import React, { useEffect, useState } from "react";
import vipimg from "../assets/vid.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import UserAxiosAPI from "../../api/userAxiosAPI";

const Vip = () => {
  const axios = UserAxiosAPI();

  const [vipCards, setVipCards] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch VIP Cards dynamically
  const fetchVipCards = async () => {
    try {
      const res = await axios.get("/blogs"); // Your API route
      setVipCards(res.data);
    } catch (error) {
      console.error("Failed to load VIP cards", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVipCards();
  }, []);

  const slugify = (title) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const limitHtmlWords = (html, maxWords) => {
  if (!html) return "";
  const temp = document.createElement("div");
  temp.innerHTML = html;
  const text = temp.innerText; // remove HTML
  const words = text.split(" ");

  return words.length > maxWords
    ? words.slice(0, maxWords).join(" ") + "..."
    : text;
};


  return (
    <div className="py-6 sm:py-12 bg-[url(./assets/img1.png)] bg-cover bg-center">
      {/* Heading */}
      <h2 className="text-[#17565D] text-center font-semibold text-xl sm:text-3xl">
        Get Our Latest <span className="text-[#F5C037]">Vip Numbers News</span>
      </h2>

      <div className="relative w-full max-w-[95vw] mx-auto py-8">

        {/* Navigation Buttons */}
        <button className="prev-pl absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-[#F3FBFA] text-black rounded-full shadow hover:bg-[#F5C037] hover:text-[#17565D] transition">
          <FaChevronLeft />
        </button>

        <button className="next-pl absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-[#F3FBFA] text-black rounded-full shadow hover:bg-[#F5C037] hover:text-[#17565D] transition">
          <FaChevronRight />
        </button>

        {/* Loading State */}
        {loading && (
          <p className="text-center text-gray-600 py-10">Loading VIP News...</p>
        )}

        {/* If no data */}
        {!loading && vipCards.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            No VIP updates available.
          </p>
        )}

        {/* Swiper Slider */}
        {!loading && vipCards.length > 0 && (
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            navigation={{ prevEl: ".prev-pl", nextEl: ".next-pl" }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: true }}
            spaceBetween={20}
            loop={true}
            grabCursor={true}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            onSwiper={(swiper) => {
              setTimeout(() => {
                if (swiper.params.navigation) {
                  swiper.navigation.init();
                  swiper.navigation.update();
                }
              });
            }}
          >
            {vipCards.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="w-full shadow-[0px_3px_8px_rgba(0,0,0,0.24)] rounded-2xl overflow-hidden bg-white mb-6">

                  {/* Dynamic Image */}
                  <img
                    src={item.imageUrl ? item.imageUrl : vipimg}
                    alt="VIP"
                    className="w-full h-40 object-cover"
                  />

                  {/* Content */}
                  <div className="p-3">
                    <h3 className="text-black font-semibold text-base sm:text-xl text-center px-3">
                     {limitHtmlWords(item.title, 6)} 
                    </h3>

                 <p className="text-[#666666] text-xs sm:text-sm text-center px-3 mb-3">
  {limitHtmlWords(item.content, 4)}  
  
</p>


                   <Link
  to={`/vip-numbers/${slugify(item.title)}`}
  className="bg-[#17565D] text-white px-4 py-1 mx-auto block rounded-full text-center hover:bg-[#F5C037] hover:text-[#17565D] transition"
>
  Read More
</Link>

                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default Vip;
