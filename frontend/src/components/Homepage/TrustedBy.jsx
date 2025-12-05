import {  FaCaretRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToFavs, removeFromFavs } from "../../redux/favorites/favSlice";
import UserAxiosAPI from "../../api/userAxiosAPI";
import toast from "react-hot-toast";
import { IoHeartDislike } from "react-icons/io5";
import { addToCart } from "../../redux/cart/cartSlice";
import { fbqTrack } from "../utils/fbq";



const TrustedByElites = () => {
  const [numbers, setNumbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
const dispatch = useDispatch();
const fav = useSelector((state) => state.fav?.items);
const cart = useSelector((state) => state.cart?.items);
const user = useSelector((state) => state.user.user);
const axios = UserAxiosAPI();

// SAVE REAL VIP NUMBER ID
const normalizeItem = (item) => ({
  _id: item?._id,
  vipId: item?._id, // Use _id as vipId for consistency
  number: item.number || item.mobile || item.phone || "N/A",
  price: item.roundedFinalPrice ?? item.price ?? 0,
  category: item.category || item.type || "VIP",
  sum: item.total ?? item.sum ?? 0,
  total: item.total ?? 0,
  highLightedNumber: item.highLightedNumber || item.number || item.mobile || "",
  roundedFinalPrice: item.roundedFinalPrice ?? item.price ?? 0,
  roundedOriginalPrice: item.roundedOriginalPrice ?? item.originalPrice ?? 0,
  owner: item.owner || {},
});
const handleAddToFav = async (item) => {
  try {
    dispatch(addToFavs(item));

    const isPresent = fav?.find((it) => it.vipId === item.vipId);

    if (user && !isPresent) {
      await axios.post("/fav/add", { vipNumberId: item.vipId });
    }
  } catch (e) {
    toast.error(e?.response?.data?.message || "Failed to Add to Favourites!");
  }
};

const removeFavItem = async (item) => {
  try {
    if (user) {
      await axios.post("/fav/remove", { vipNumberId: item.vipId });
    }

    dispatch(removeFromFavs(item.vipId));

    toast(`Removed ${item.number} from Favourites`, {
      icon: <IoHeartDislike className="text-lg" />
    });
  } catch (error) {
    toast.error("Failed to remove item. Please try again!");
  }
};

const handleAddToCart = async (item) => {
  const price = item?.price ?? 0;

  try {
    dispatch(addToCart(item));

    const isPresent = cart?.find((it) => it.vipId === item.vipId);

    if (user && !isPresent) {
      await axios.post("/cart/add", { vipNumberId: item.vipId });
    }

    if (window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-16838705843/l-w1CJnEtpcaELOFqd0-",
        value: price,
        currency: "INR",
      });
    }

    if (typeof fbqTrack === "function") {
      fbqTrack("AddToCart", { value: price, currency: "INR" });
    }
  } catch (e) {
    toast.error("Failed to add to cart!");
  }
};

  const truncateWords = (text, limit = 3) => {
    if (!text) return "";
    const words = String(text).trim().split(/\s+/);
    return words.length > limit ? words.slice(0, limit).join(" ") + "..." : words.join(" ");
  };

  // Optional env override for patterns endpoint (Vite): VITE_PATTERNS_API
  const PATTERNS_BASE = import.meta.env.VITE_PATTERNS_API || "http://localhost:5000";

  useEffect(() => {
    let mounted = true;
    const fetchPatterns = async () => {
      try {
        setLoading(true);
        const base = PATTERNS_BASE.replace(/\/$/, "");
        const url = `${base}/api/vip-numbers/patterns`;
        const res = await fetch(url, { headers: { "Content-Type": "application/json" } });
        const data = await res.json();
        const items = data?.data || data?.numbers || data || [];
        if (!mounted) return;
        // lightweight normalization to match previous shape
        const normalized = items.map(normalizeItem);
        setNumbers(normalized);
      } catch (err) {
        console.error("Failed to load patterns:", err);
        setNumbers([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchPatterns();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="w-full max-w-[95vw] mx-auto relative flex justify-center bg-white text-white py-8 sm:py-16 pb-12 sm:pb-24 min-h-[500px]">
      {/* Wrapper */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-start gap-8">

        {/* 1️⃣ Featured Card */}
        <div className="w-full sm:w-1/3 max-w-[280px] bg-white rounded-xl shadow-2xl overflow-hidden relative mx-auto sm:mx-0">
          {/* Dark Header */}
          <div className="bg-[url(./assets/bg.jpg)] bg-cover bg-center">
            <div className="bg-[#17565DE6] h-50 p-6 flex justify-between items-center text-white">
              <p className="text-3xl font-semibold">Featured</p>
               
            </div>
          </div>

          {/* White Body with List */}
          <ul className="space-y-2 text-black text-xs sm:text-sm px-4 sm:px-8 py-6 sm:py-12">
            <li className="flex items-start gap-2"> 
              <FaCaretRight className="w-4 h-4 mt-1 text-[#17565D]" />
              <span>Buy VIP Number online from India's largest inventory</span>
            </li>
            <li className="flex items-start gap-2">
              <FaCaretRight className="w-4 h-4 mt-1 text-[#17565D]" />
              <span>Access to vanity number collections across telecommunications providers</span>
            </li>
            <li className="flex items-start gap-2">
              <FaCaretRight className="w-4 h-4 mt-1 text-[#17565D]" />
              <span>Specialized fancy number in India marketplace with instant availability checks</span>
            </li>
            <li className="flex items-start gap-2">
              <FaCaretRight className="w-4 h-4 mt-1 text-[#17565D]" />
              <span>Premium Buy fancy mobile number services with doorstep delivery</span>
            </li>
          </ul>
        </div>

        {/* 2️⃣ Swiper Section */}
        <div className="w-full  sm:w-2/3">
          <h2 className="text-xl sm:text-3xl text-black text-center mb-0 sm:mb-8 font-semibold">
            <span className="text-[#F5C037]">POPULAR</span> VIP NUMBERS
          </h2>

          {/* Swiper Container */}
          <div className="relative w-full px-2 sm:px-4">

            <button className="next-sl absolute right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-10 p-2 
                bg-[#F3FBFA] text-black rounded-full shadow">
              <FaChevronRight />
            </button>
            <button className="prev-sl absolute left-2 sm:-left-8 top-1/2 -translate-y-1/2 z-10 p-2 bg-[#F3FBFA] text-black rounded-full shadow">
              <FaChevronLeft />
            </button>

          <Swiper
  modules={[Navigation, Autoplay]}
  spaceBetween={20}
  slidesPerView={1}
  grabCursor={true}
  loop={numbers.length > 3}
  autoplay={{ delay: 3000, disableOnInteraction: false }}
  navigation={{
    prevEl: ".prev-sl",
    nextEl: ".next-sl",
  }}
  breakpoints={{
    0: { slidesPerView: 1 },
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  }}
>


              {loading ? (
                <div className="w-full text-center py-8 text-black">Loading...</div>
              ) : numbers.length === 0 ? (
                <div className="w-full text-center py-8 text-black">No numbers found</div>
              ) : (
                numbers.map((item, index) => {
                  const isFav = fav?.some((f) => f.vipId === item.vipId);
                  
                  return (
                  <SwiperSlide key={item.vipId ?? index}>
                     <Link to={`/vip-number/${item.number}`} className="block">
                     
                    
                    <div
                      key={index}
                      className="bg-[#fcfae5] rounded-2xl p-2 border-2 border-[#17565D] min-h-[80px] w-full relative max-w-[300px] mx-auto my-3"
                    >
                      {/* Heart icon positioned at top left */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          isFav ? removeFavItem(item) : handleAddToFav(item);
                        }}
                        className="absolute top-3 left-4 p-1 rounded-full hover:scale-110 transition z-10"
                      >
                        {isFav ? (
                          <FaHeart size={22} className="text-red-500" />
                        ) : (
                          <FaRegHeart size={22} className="text-[#17565D]" />
                        )}
                      </button>
                      
                      <div className="rounded-2xl flex flex-col items-center border-2 border-[rgb(255,207,81)] py-2">
                        <div className="w-full px-2">
                          <div className="flex items-center justify-end text-xs">
                            <div className="border-[#17565D] border-l-2 pl-2 sm:block text-black">
                              <small className=" text-sm block leading-none">Sum Total {item.total}</small>
                            </div>
                          </div>
                        </div>

                        <div
                          className="rounded-2xl overflow-hidden my-5 w-full bg-[length:200%_200%] bg-center"
                          style={{
                            background: "linear-gradient(90deg, rgb(19,52,55),rgb(44,106,108), rgb(19,52,55))",
                          }}
                        >
                         <div className="cursor-pointer flex flex-col items-center pt-4 pb-2 space-y-1 w-full">
  <Link
    to={`/vip-number/${item.number}`}
    className="text-2xl sm:text-3xl [transform:scaleY(1.3)] font-semibold text-center text-[#F5C037] px-2 
               whitespace-nowrap overflow-hidden text-ellipsis"
    style={{ fontFamily: "'Lato', sans-serif" }}
  >
    <div
      className="[text-shadow:0px_0px_12px_black]"
      style={{ fontFamily: "'Lato', sans-serif" }}
      dangerouslySetInnerHTML={{ __html: item.highLightedNumber }}
    />
  </Link>

  <Link
    to={`/vip-number/${item.number}`}
    className="text-xs min-h-[20px] text-[#F5C037] px-1 whitespace-nowrap overflow-hidden text-ellipsis"
  >
    <span className="text-shadow-lg [text-shadow:1px_1px_2px_black]">
      {truncateWords(item.category, 3)}
    </span>
  </Link>
</div>

                        </div>

                        <div className="flex justify-between items-center w-full text-xs sm:text-sm p-2">

  {/* LEFT — PRICE */}
  <Link
    to={`/vip-number/${item.number}`}
    className="text-left text-sm sm:text-xl font-semibold text-[rgb(22,59,62)]"
  >
    <p>₹ {item.roundedFinalPrice.toLocaleString("en-IN")}</p>

    {item.owner?.discount > 0 && (
      <p className="text-nowrap text-xs md:text-sm font-semibold text-black opacity-50">
        ₹ <span className="line-through">
          {item.roundedOriginalPrice.toLocaleString("en-IN")}
        </span>
      </p>
    )}
  </Link>

  {/* RIGHT — BOOK NOW */}
  <button
    aria-label="Add to Cart"
    className="text-nowrap font-semibold px-4 py-1 rounded-full border-2 border-[#F5C037] 
               text-[#17535D] hover:bg-white hover:border-[#17535D] hover:text-[#17535D] 
               transition-all duration-300 ease-in-out flex items-center gap-2 shadow-md"
    style={{
      background: "linear-gradient(180deg, #eba800ff, #f0cd75ff, #eba800ff)",
    }}
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      handleAddToCart(item);
      navigate("/checkout");
    }}
  >
    Book Now
  </button>

</div>

                    </div>
                    </div>
                     </Link>
                  </SwiperSlide>
                  );
                })
              )}
            </Swiper>


          </div>
        </div>
      </div>
    </div>

  );
};
export default TrustedByElites;
