import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../../redux/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import UserAxiosAPI from "../../api/userAxiosAPI";
import toast from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import VipNumberModal from "./SelectModal";
import { fbqTrack } from "../utils/fbq";
import { useContext } from "react";
import { Appstate } from "../../App";
const VIPCardSkeleton = () => (
    <div className="min-w-[220px] p-6 py-4 rounded-xl shadow-xl bg-[#274A7B] animate-pulse flex flex-col justify-between">
        <div className="space-y-2">
            {/* Number */}
            <div className="h-6 w-3/4 bg-slate-500 rounded mx-auto" />

            {/* Sum Total */}
            <div className="h-4 w-2/3 bg-slate-400 rounded mx-auto" />

            {/* Prices */}
            <div className="flex justify-center gap-3 mt-2">
                <div className="h-5 w-16 bg-slate-500 rounded" />
                <div className="h-5 w-16 bg-slate-400 rounded" />
            </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
            <div className="h-8 w-24 bg-slate-300 rounded-full" />
            <div className="h-8 w-24 bg-slate-300 rounded-full" />
        </div>
    </div>
);

const VIPNumberScroller = ({ pos }) => {
    const numbers = useSelector((state) => state.number.originalValue);
    const user = useSelector((state) => state.user.user);
    const cart = useSelector((state) => state.cart?.items);
    const [selectedNumber, setSelectedNumber] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(0);
    const {margins, setMargins} = useContext(Appstate);
    const dispatch = useDispatch();
    // const [margins, setMargins] = useState();
    const navigate = useNavigate();
    const axios = UserAxiosAPI();
    // const getMargins = async () => {
    //     try {
    //         const { data } = await axios.get("/margins");
    //         setMargins(data);
    //     } catch (e) {
    //         console.error(e);
    //     }
    // };
    // useEffect(() => {
    //     getMargins();
    // }, [])
    const handleAddToCart = async (item, price) => {
        if (window.gtag) {
            window.gtag('event', 'conversion', {
                send_to: 'AW-16838705843/l-w1CJnEtpcaELOFqd0-',
                value: price,
                currency: 'INR'
            });
        }
        try {
            dispatch(addToCart(item));
            const isPresent = cart.find((it) => it._id === item._id);
            fbqTrack('AddToCart');
            if (user && !isPresent) {
                const { data } = await axios.post('/cart/add', { vipNumberId: item?._id });
                //// console.log(data);
            }
        } catch (e) {
            toast.error(e?.response?.data?.message || 'Failed to Add to cart!');
            //// console.log(e);
        }
    };




    return (
        <div className="relative w-full bg-transparent py-8 px-4 mx-auto">
            {pos === 1 ? <h2 className="text-center text-lg md:text-2xl font-extrabold text-black mb-3 uppercase tracking-widest">
                VIP Numbers
            </h2> : <h2 className="text-center text-lg md:text-2xl font-extrabold text-black mb-3 uppercase tracking-widest">
                Popular VIP Numbers
            </h2>}

            {/* 🔥 Swiper Container */}
            <div className="relative overflow-hidden">
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={20}
                    loop={true}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    freeMode={true} // Enables free scroll
                    scrollbar={{ draggable: true }}
                    speed={1000}
                    // slidesPerView="1"
                    breakpoints={{
                        440: {
                            slidesPerView: 2,
                            spaceBetween: 20
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 30
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 40
                        },
                        1440: {
                            slidesPerView: 5,
                            spaceBetween: 40
                        },
                        1860: {
                            slidesPerView: 6,
                            spaceBetween: 40
                        }
                    }}
                    className="px-6 py-4"
                >
                    {numbers.length > 0 ? (
                        [...numbers].map((num, index) => {
                            // const originalPrice = num.price;
                            // const ownerDiscount = num?.owner?.discount;

                            // // Step 1: Apply owner discount
                            // const discountedPrice = originalPrice - (originalPrice * ownerDiscount * 0.01);

                            // // Step 2: Determine applicable margin
                            // const marginData = margins?.find(
                            //     (margin) => originalPrice >= margin.minPrice && originalPrice <= margin.maxPrice
                            // );
                            // const marginPercent = marginData ? marginData.marginPercent : 0;

                            // // Step 3: Calculate final price
                            // const marginAmount = (originalPrice * marginPercent) / 100;
                            // const finalPrice = discountedPrice + marginAmount;

                            // Step 4: Round to nearest ten
                            const roundedFinalPrice = num?.price;
                            const roundedOriginalPrice = num?.originalPrice;

                            // Step 5: Calculate displayed discount percentage
                            const displayedDiscount = num?.displayedDiscount;
                            return (
                                <SwiperSlide key={index} className="min-w-[220px] relative p-6 py-4 rounded-xl cursor-pointer shadow-xl bg-[#274A7B] text-white transition-all transform hover:scale-105">
                                    {/* <SwiperSlide key={index} className="min-w-[220px] p-6 rounded-xl cursor-pointer relative shadow-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white transition-all transform hover:scale-105"> */}
                                    {/* <h3 className="text-xl font-bold mt-1 tracking-wide"></h3> */}
                                    <div onClick={() => { navigate(`/vip-number/${num.number}`) }}>
                                        <h2 className=" text-xl font-extrabold text-center text-white tracking-wide mt-4 z-10">
                                            <span dangerouslySetInnerHTML={{ __html: num.highLightedNumber }} />
                                            {/* {highlightMobileNumber(num.number) } */}
                                        </h2>

                                        {/* Display Owner's Discount Badge */}
                                        {displayedDiscount > 0 && (
                                            <div className="absolute top-1 rounded-tl-xl left-1  text-white text-[0.8rem] font-medium px-2 py-1 rounded-0">
                                                -{displayedDiscount.toFixed(1)}%
                                            </div>
                                        )}
                                        <p className=" text-sm text-center text-gray-300 font-medium z-10">
                                            Sum Total = {" "}
                                            {<span className="font-semibold">
                                                {num?.total} -{num?.sum2} -{" "}
                                                {num?.sum}
                                            </span>}
                                        </p>
                                        <div className="flex gap-2 justify-center items-center">
                                            {/* Final rounded price */}
                                            <p className="text-sm md:text-[1rem] mt-1 font-semibold">{`₹${num?.price.toLocaleString('en-IN')}`}</p>
                                            

                                            {/* Old price with strike-through */}
                                            {displayedDiscount > 0 && <p className="text-sm md:text-[1rem] mt-1 text-gray-300 line-through">₹ {roundedOriginalPrice.toLocaleString('en-IN')}</p>}
                                        </div>
                                    </div>

                                    <div className="flex justify-between">
                                        <button
                                            onClick={() => {
                                                navigate(`/vip-number/${num.number}`)
                                            }}
                                            className="bg-white px-2 lg:px-5 self-center py-1 rounded-full border border-white text-[#274A7B] font-semibold hover:bg-[#274A7B] hover:text-white hover:border-white transition-all duration-300 mt-2 ease-in-out text-xs md:text-sm flex items-center gap-2 shadow-md"
                                        >
                                            Details
                                        </button>
                                        <button
                                            onClick={() => {
                                                handleAddToCart(num, roundedFinalPrice);
                                                setSelectedPrice(roundedFinalPrice)
                                                setSelectedNumber(num);
                                            }}
                                            className="bg-white px-2 lg:px-5 self-center py-1 rounded-full border border-white text-[#274A7B] font-semibold hover:bg-[#274A7B] hover:text-white hover:border-white transition-all duration-300 mt-2 ease-in-out text-xs md:text-sm flex items-center gap-2 shadow-md"
                                        >
                                            Buy Now
                                        </button>
                                    </div>
                                    {num.category !== "Others" && (
                                        <div className="absolute top-1 right-1 text-white font-semibold text-[0.7rem] px-2 py-1 rotate-0 transform origin-top-right ">
                                            {Array.isArray(num.category) ? num.category[0] : num.category}
                                        </div>
                                    )}

                                    {/* <span className="absolute top-1 right-2 bg-black text-white text-xs px-2 py-1 rounded">
                                        {num.category}
                                    </span> */}
                                </SwiperSlide>
                            );
                        })
                    ) : (
                            Array.from({ length: 5 }).map((_, idx) => (
                                <SwiperSlide key={idx}>
                                    <VIPCardSkeleton />
                                </SwiperSlide>
                            ))
                        )}

                </Swiper>
            </div>
            {selectedNumber && <VipNumberModal selectedNumber={selectedNumber} margins={margins} setSelectedNumber={setSelectedNumber} />}

        </div>
    );
};

export default VIPNumberScroller;
