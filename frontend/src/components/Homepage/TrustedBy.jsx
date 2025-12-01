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


const TrustedByElites = () => {
  const [numbers, setNumbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
const dispatch = useDispatch();
const fav = useSelector((state) => state.fav?.items);
const user = useSelector((state) => state.user.user);
const axios = UserAxiosAPI();
const handleAddToFav = async (item) => {
  try {
    dispatch(addToFavs(item));
    const isPresent = fav?.find((it) => it._id === item._id);

    if (user && !isPresent) {
      await axios.post("/fav/add", { vipNumberId: item?._id });
    }
  } catch (e) {
    toast.error(e?.response?.data?.message || "Failed to Add to Favourites!");
    console.log(e);
  }
};

const removeFavItem = async (item) => {
  try {
    if (user) {
      await axios.post("/fav/remove", { vipNumberId: item?._id });
    }
    dispatch(removeFromFavs(item?._id));
    toast(`Removed ${item.number} from Favourites`, {
      icon: <IoHeartDislike className="text-lg" />,
    });
  } catch (error) {
    toast.error("Failed to remove item. Please try again!");
  }
};

  const handleAddToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
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
        const normalized = items.map((it) => ({
          number: it.number || it.mobile || it.phone || "N/A",
          total: it.total ?? it.sum ?? 0,
          category: it.category || it.type || "VIP",
          highLightedNumber: it.highLightedNumber || it.number || it.mobile || "",
          roundedFinalPrice: it.price ?? it.roundedFinalPrice ?? it.amount ?? 0,
          roundedOriginalPrice: it.originalPrice ?? it.roundedOriginalPrice ?? it.mrp ?? 0,
          owner: it.owner || {},
        }));
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
  slidesPerView={2}
  grabCursor={true}
  loop={numbers.length > 3}
  autoplay={{ delay: 3000, disableOnInteraction: false }}
  navigation={{
    prevEl: ".prev-sl",
    nextEl: ".next-sl",
  }}
  breakpoints={{
    0: { slidesPerView: 2 },
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  }}
>


              {loading ? (
                <div className="w-full text-center py-8 text-black">Loading...</div>
              ) : numbers.length === 0 ? (
                <div className="w-full text-center py-8 text-black">No numbers found</div>
              ) : (
                numbers.map((item, index) => (
                  <SwiperSlide key={item.number ?? index}>
                     <Link to={`/vip-number/${item.number}`} className="block">
                     
                    
                    <div
                      key={index}
                      className="bg-[#fcfae5] rounded-2xl p-2 border-2 border-[#17565D] min-h-[80px] w-full relative max-w-[300px] mx-auto my-3"
                    >
                      <div className="rounded-2xl flex flex-col items-center border-2 border-[rgb(255,207,81)] py-2">
                        <div className="w-full px-2">
                          <div className="flex items-center justify-between  text-xs">
                            <div className="rounded-full bg-[#1d4a46] py-0 px-2 border-2 border-[#ce9e3e] text-white text-center text-[10px]">
                              <span>01:36:31 Left</span>
                            </div>
                            
                     <button
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();

    const isFav = fav?.find((f) => f.number === item.number);

    if (isFav) {
      removeFavItem(item);
    } else {
      handleAddToFav(item);
    }
  }}
  className="p-1 rounded-full hover:scale-110 transition"
>
  {fav?.find((f) => f.number === item.number) ? (
    <FaHeart size={22} className="text-red-500" />
  ) : (
    <FaRegHeart size={22} className="text-[#17565D]" />
  )}
</button>


                            <div className="border-[#17565D] border-l-2 pl-2 hidden sm:block text-black">
                              <small className=" text-sm block leading-none">Sum Total {item.total}</small>
                             
                            </div>
                          </div>
                        </div>

                        <div
                          className="rounded-2xl overflow-hidden my-3 w-full bg-[length:200%_200%] bg-center"
                          style={{
                            background: "linear-gradient(90deg, rgb(19,52,55),rgb(44,106,108), rgb(19,52,55))",
                          }}
                        >
                          <div className="cursor-pointer flex flex-col items-center pt-4 pb-2 space-y-1 w-full ">
                            <Link
                              to={`/vip-number/${item.number}`}
                              className="text-2xl sm:text-3xl [transform:scaleY(1.3)] font-semibold text-center text-[#F5C037] px-2 "
                            >
                              <div
                                className="[text-shadow:0px_0px_12px_black]"
                                dangerouslySetInnerHTML={{ __html: item.highLightedNumber }}
                              />
                            </Link>

                            <Link
                              to={`/vip-number/${item.number}`}
                              className="text-xs min-h-[20px] text-[#F5C037] px-1"
                            >
                              <span className="text-shadow-lg [text-shadow:1px_1px_2px_black]">
                                {truncateWords(item.category, 3)}
                              </span>
                            </Link>
                          </div>
                        </div>

                        <div className="relative flex justify-between items-center gap-2 w-full text-xs sm:text-sm p-2">
                          <Link
                            to={`/vip-number/${item.number}`}
                            className="text-center text-sm sm:text-xl font-semibold text-[rgb(22,59,62)]"
                          >
                            <p>₹ {item.roundedFinalPrice.toLocaleString("en-IN")}</p>
                            {item.owner?.discount > 0 && (
                              <p className="relative text-nowrap text-xs md:text-sm font-semibold text-black opacity-50 px-2 py-0.5 md:py-1 rounded-full">
                                ₹ <span className="line-through">{item.roundedOriginalPrice.toLocaleString("en-IN")}</span>
                              </p>
                            )}
                          </Link>

                          <button
                            aria-label={"Add to Cart"}
                            className="text-nowrap font-semibold px-4 py-1 w-1/2 max-h-8 justify-center rounded-full border-2 border-[#F5C037] text-[#17535D] hover:bg-white hover:border-[#17535D] hover:text-[#17535D] transition-all duration-300 ease-in-out flex items-center gap-2 shadow-md"
                            style={{ background: "linear-gradient(180deg, #eba800ff, #f0cd75ff, #eba800ff)" }}
                            onClick={() => {
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
                ))
              )}
            </Swiper>


          </div>
        </div>
      </div>
    </div>

  );
};
export default TrustedByElites;
