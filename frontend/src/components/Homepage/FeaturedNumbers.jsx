import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { useDispatch, useSelector } from "react-redux";
import VipNumberModal from "./SelectModal";
import toast from "react-hot-toast";
import UserAxiosAPI from "../../api/userAxiosAPI";
import { addToCart } from "../../redux/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { fbqTrack } from "../utils/fbq";
import smilingWoman from '../../assets/yellow.png';
const VIPSliderSkeleton = () => (
    <div className="relative pt-8 bg-gradient-to-b from-gray-900 to-black text-white rounded-xl shadow-lg p-3 px-2 flex flex-col items-center justify-between border-2 border-yellow-400 min-h-[320px] animate-pulse">
        <div className="w-4/5 flex flex-col space-y-2 items-center justify-center">
            {/* Discount badge */}
            <div className="absolute top-3 left-3 h-5 w-16 bg-slate-600 rounded-md" />

            {/* VIP number */}
            <div className="h-6 w-3/4 bg-slate-700 rounded" />
            <div className="h-4 w-2/3 bg-slate-600 rounded" />

            {/* Price */}
            <div className="flex gap-3 mt-2">
                <div className="h-5 w-20 bg-slate-700 rounded" />
                <div className="h-5 w-20 bg-slate-600 rounded" />
            </div>

            {/* Category tag */}
            <div className="absolute top-2 right-2 h-5 w-20 bg-slate-700 rounded-full" />

            {/* Buy Now button */}
            <div className="h-8 w-32 bg-slate-500 rounded-full mt-5" />
        </div>

        {/* Decorative image block (woman PNG replacement) */}
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-slate-800 rounded-full opacity-30" />
    </div>
);

const VipNumberSlider = ({ }) => {
    const numbers = useSelector((state) => state.number.featured);
    const user = useSelector((state) => state.user.user);
    const cart = useSelector((state) => state.cart?.items);
    const [selectedNumber, setSelectedNumber] = useState(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [margins, setMargins] = useState();
    const navigate = useNavigate();
    const axios = UserAxiosAPI();
    const getMargins = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get("/margins");
            setMargins(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getMargins();
    }, [])
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
            fbqTrack('AddToCart')
            if (user && !isPresent) {
                const { data } = await axios.post('/cart/add', { vipNumberId: item?._id });
                // console.log(data);
            }
        } catch (e) {
            toast.error(e?.response?.data?.message || 'Failed to Add to cart!');
            // console.log(e);
        }
    };
    return (
        <div className="w-full justify-center px-4 py-6">
            <h2 className="text-xl md:text-3xl font-bold text-center text-yellow-400 mb-4">
                ✨ Exclusive VIP Numbers ✨
            </h2>
            <Swiper
                modules={[Autoplay]}
                spaceBetween={20}
                loop={true}
                autoplay={{ delay: 3000 }}
                freeMode={true} // Enables free scroll
                scrollbar={{ draggable: true }}
                speed={1000}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    900: { slidesPerView: 3 },
                    1220: { slidesPerView: 4 },
                }}
                className="pb-6"
            >
                {!loading ? numbers.map((num, index) => {
                    // const originalPrice = num.price;
                    // const ownerDiscount = num?.owner?.discount || 0;
                    // const discountedPrice = originalPrice - (originalPrice * ownerDiscount * 0.01);
                    // const marginData = margins?.find(
                    //     (margin) => originalPrice >= margin.minPrice && originalPrice <= margin.maxPrice
                    // );
                    // const marginPercent = marginData ? marginData.marginPercent : 0;
                    // const marginAmount = (originalPrice * marginPercent) / 100;
                    // const finalPrice = discountedPrice + marginAmount;
                    // const roundedFinalPrice = Math.round(finalPrice / 10) * 10;
                    // const roundedOriginalPrice = Math.round((originalPrice + marginAmount) / 10) * 10;
                    // const displayedDiscount = ((roundedOriginalPrice - roundedFinalPrice) / roundedOriginalPrice) * 100;

                    return (
                        <SwiperSlide key={index}>
                            <div className="relative pt-8 bg-gradient-to-b from-gray-900 to-black text-white rounded-xl shadow-lg p-3 px-2 flex flex-col items-center justify-center border-2 border-yellow-400 transform hover:scale-101 transition-all">
                                <div className="w-4/5 cursor-pointer">

                                    {/* Discount Tag */}
                                    {num.displayedDiscount > 0 && (
                                        <span className="absolute top-3 left-3 text-xs text-white px-3 py-1 rounded-md shadow-md animate-bounce">
                                            -{num.displayedDiscount?.toFixed(1)}%
                                        </span>
                                    )}

                                    <div onClick={() => navigate(`/vip-number/${num.number}`)}>
                                        {/* VIP Number */}
                                        <p className="text-2xl mb-2 text-nowrap font-extrabold tracking-widest text-orange-300">
                                            {num.view ? num.view : num.number}
                                        </p>
                                        <p className="relative text-sm text-green-200 font-medium z-10">
                                            Sum Total = {" "}
                                            <span className="font-semibold">
                                                {num?.total} -{num?.sum2} -{" "}
                                                {num?.sum}
                                            </span>
                                        </p>
                                        {/* Pricing Section */}
                                        <div className="flex gap-2 flex-row md:flex-col items-left lg:flex-row mt-2 mr-6 lg:mr-2">
                                            <p className="text-lg md:text-xl font-semibold text-yellow-400">{`₹${num?.price.toLocaleString('en-IN')}`}</p>
                                            {num?.displayedDiscount > 0 && <p className="text-lg md:text-xl text-gray-400 line-through mr-2">₹{roundedOriginalPrice}</p>}
                                        </div>
                                        <span className="absolute top-1 rotate-0 right-2 bg-transparent text-xs px-4 py-1 rounded shadow-md  ">
                                            {num.category[0]}
                                        </span>
                                    </div>

                                    {/* Buy Now Button */}
                                    <button type="button" onClick={() => {
                                        handleAddToCart(num, num?.price);
                                        setSelectedNumber(num);
                                    }} className="mt-4 px-6 py-2 bg-gradient-to-br from-yellow-500 to-orange-500 text-gray-900 font-semibold rounded-full hover:bg-orange-600 transition">
                                        Buy Now
                                    </button>

                                </div>
                                <div className="w-1/4">
                                    <img
                                        src={smilingWoman}
                                        alt="Woman Smiling"
                                        className="h-[80%] lg:h-[88%] absolute -right-10 lg:-right-8 bottom-0 w-60 md:w-68 z-50 object-contain"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                }) :
                    (
                        Array.from({ length: 4 }).map((_, idx) => (
                            <SwiperSlide key={idx}>
                                <VIPSliderSkeleton />
                            </SwiperSlide>
                        ))
                    )}
            </Swiper>
            {selectedNumber && <VipNumberModal margins={margins} selectedNumber={selectedNumber} setSelectedNumber={setSelectedNumber} />}
        </div>
    );
};

export default VipNumberSlider;
