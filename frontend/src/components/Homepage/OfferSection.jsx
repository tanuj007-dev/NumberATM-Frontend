// OfferSection.jsx
import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import UserAxiosAPI from "../../api/userAxiosAPI";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToFavs, removeFromFavs } from "../../redux/favorites/favSlice";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { useNavigate, Link } from "react-router-dom";
import { addToCart } from "../../redux/cart/cartSlice";
import { IoHeartDislike } from "react-icons/io5";
import { fbqTrack } from "../utils/fbq";

const formatTimeLeft = (totalSeconds) => {
  if (!totalSeconds || totalSeconds <= 0) return "00d 00h 00m";

  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;
  const minutes = totalMinutes % 60;

  const pad = (val) => String(val).padStart(2, "0");

  return `${pad(days)}d ${pad(hours)}h ${pad(minutes)}m`;
};

const formatEndTime = (expiresAt) => {
  if (!expiresAt) return "";

  const date = new Date(expiresAt);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
};

const OfferSection = () => {
  const axios = UserAxiosAPI();
  const [offers, setOffers] = useState([]);
  const [timers, setTimers] = useState({});
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const fav = useSelector((state) => state.fav?.items);
  const cart = useSelector((state) => state.cart?.items);

  const navigate = useNavigate();

  // SAVE REAL VIP NUMBER ID
  const normalizeOffer = (item) => ({
    _id: item?._id, // featured id
    vipId: item?.vipNumber?._id, // REAL VIP NUMBER ID ✔ IMPORTANT
    number: item.vipNumber?.number,
    price: item.vipNumber?.finalPrice ?? item.vipNumber?.price,
    category: Array.isArray(item.vipNumber?.category)
      ? item.vipNumber.category.join(", ")
      : item.vipNumber?.category,
    sum: item.vipNumber?.sum ?? item.sum,
    total: item.vipNumber?.total ?? item.total,
    highLightedNumber: item.vipNumber?.highLightedNumber,
    expiresAt: item.expiresAt
  });

  // --- Favourite handlers ---
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

  // --- Add to cart handler ---
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

  // --- Fetch offers ---
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/featured");

        if (Array.isArray(data)) {
          setOffers(data.map(normalizeOffer));
        } else if (Array.isArray(data?.data)) {
          setOffers(data.data.map(normalizeOffer));
        } else {
          setOffers([]);
        }
      } catch (error) {
        setOffers([]);
      }
    };

    fetchOffers();
  }, []);

  // --- Timer ---
  useEffect(() => {
    if (!offers?.length) return;

    const interval = setInterval(() => {
      const now = Date.now();

      const updated = {};

      offers.forEach((item, i) => {
        const key = item.vipId || item.number || i;
        const end = new Date(item.expiresAt).getTime();

        const diff = Math.max(0, Math.floor((end - now) / 1000));
        updated[key] = diff;
      });

      setTimers(updated);
    }, 1000);

    return () => clearInterval(interval);
  }, [offers]);

  return (
    <section className="p-2 my-8 lg:p-6 bg-[rgb(243,251,250)]">
      <div className="container mx-auto">
        <div className="text-center">
          <h2 className="text-xl sm:text-3xl mb-2 font-semibold text-[#000]">
            Numberatm <span className="text-[#17565D] px-2">Offer Zone</span>
          </h2>
        </div>

        <div className="relative">
          {/* Prev */}
          <button
  ref={prevRef}
  className="flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-20 
    bg-white border rounded-full w-8 h-8 sm:w-9 sm:h-9 shadow"
>
  <MdOutlineKeyboardArrowLeft className="text-2xl" />
</button>


          {/* Next */}
        <button
  ref={nextRef}
  className="flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-20 
    bg-white border rounded-full w-8 h-8 sm:w-9 sm:h-9 shadow"
>
  <MdOutlineKeyboardArrowRight className="text-2xl" />
</button>


          <Swiper
            modules={[Autoplay, Navigation]}
            slidesPerView={1}
            spaceBetween={4}
            loop
            autoplay={{ delay: 2500 }}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            onBeforeInit={(s) => {
              s.params.navigation.prevEl = prevRef.current;
              s.params.navigation.nextEl = nextRef.current;
            }}
            breakpoints={{
              360: { slidesPerView: 2 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {offers.map((offer, i) => {
              const key = offer.vipId;
              const timeLeft = timers[key] ?? 0;

              const isFav = fav?.some((f) => f.vipId === offer.vipId);

              return (
                <SwiperSlide key={key}>
                  <Link to={`/vip-number/${offer.number}`} className="block">
                    <div className="my-2 sm:my-4">
                      <div className="bg-[#fcfae5] border-2 border-[#17565D] rounded-2xl p-2 max-w-[340px] mx-auto h-[230px]">
                        <div className="border-2 border-[#ffcf51] rounded-2xl h-full flex flex-col py-2">
                          {/* Top Row */}
                          <div className="px-2 flex items-center justify-between text-xs flex-shrink-0">

                            {/* Timer */}
                            <div className="flex flex-col gap-0.5">
      <div className="flex items-center gap-1 whitespace-nowrap">
  <span className="text-[#17565D] text-[10px] sm:text-sm font-semibold">
    Time Left
  </span>
  <span className="bg-[#17565D] border-2 border-[#F5C037] text-white 
                 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-2xl">
    {formatTimeLeft(timeLeft)}
  </span>
</div>



                              {offer.expiresAt && (
                                <span className="text-xs sm:text-sm text-nowrap font-semibold text-[#17565D]">
                                  Ends: {formatEndTime(offer.expiresAt)}
                                </span>
                              )}
                            </div>

                            {/* Sum Total */}
          <div className="flex items-center mb-4 text-xs sm:text-sm text-[#17565D] font-semibold whitespace-nowrap">
  <span className="mx-1">|</span>
  <span>Sum Total {offer.sum ?? "-"}</span>
</div>



                            <span className="mx-1 mb-4 text-sm text-[#17565D] font-semibold">|</span>
                            {/* Fav */}
                            <button
                              onClick={(e) =>  {
                                e.preventDefault();
                                e.stopPropagation();
                                isFav ? removeFavItem(offer) : handleAddToFav(offer);
                              }}
                              className="hover:scale-110 mb-4 transition"
                            >
                              {isFav ? (
                                <FaHeart size={24} className="text-red-500" />
                              ) : (
                                <CiHeart size={24} className="text-[#17565D]" />
                              )}
                            </button>
                          </div>

                          {/* Number & Category */}
                          <div className="bg-gradient-to-r from-[#133437] via-[#2c6a6c] to-[#133437] rounded-xl my-2 py-2 flex flex-col items-center justify-center flex-1 min-h-0">
                            <p className="text-[#F5C037] text-4xl text-center font-bold leading-tight">
                              {offer.number}
                            </p>
                            {offer.category && (
                              <p className="text-[12px] text-center text-[#F5C037] font-medium mt-1 truncate max-w-full">
                                {offer.category.length > 30 ? `${offer.category.substring(0, 30)}...` : offer.category}
                              </p>
                            )}
                          </div>

                          {/* Price */}
                          <div className="px-2 mt-2 flex justify-between items-center flex-shrink-0">
                            <p className="font-semibold text-[#163b3e]">
                              ₹ {offer.price?.toLocaleString("en-IN")}
                            </p>

                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleAddToCart(offer);
                                navigate("/checkout");
                              }}
                              className="bg-gradient-to-b from-[#eba800] to-[#f0cd75] border-2 border-[#f5c037] 
                                text-[#17535D] rounded-full px-4 py-1 font-semibold text-sm shadow"
                            >
                              Book Now
                            </button>
                          </div>

                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
