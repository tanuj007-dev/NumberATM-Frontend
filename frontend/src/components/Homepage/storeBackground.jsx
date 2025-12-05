import { useState } from "react";
import { FaHeart, FaRegHeart, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cart/cartSlice";
import UserAxiosAPI from "../../api/userAxiosAPI";
import toast from "react-hot-toast";
import { IoHeartDislike } from "react-icons/io5";
import { addToFavs, removeFromFavs } from "../../redux/favorites/favSlice";
import { useRef, useEffect } from "react";
import { fbqTrack } from "../utils/fbq";
import { NumberCardSkeleton } from "./NumberSkeleton";
import { useContext } from "react";
import { Appstate } from "../../App";
const highlighterSearch = (num, searchTerm) => {
    if (!searchTerm || !num.includes(searchTerm)) return num; // Return the original number if no match

    // Step 1: Highlight the search term directly (no spacing)
    const highlightedSearchTerm = `<span className="text-orange-500 mx-1.5 font-bold">${searchTerm}</span>`;

    // Step 2: Replace the search term in the number with the highlighted version
    const result = num.replace(new RegExp(searchTerm, "g"), highlightedSearchTerm);

    return result;
};


const BackgroundEffect = ({ resetFilters, total, page, setPage, filteredNumbers, loading, searchParams }) => {
    const loadMoreRef = useRef();
    const {margins, setMargins} = useContext(Appstate);
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
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const cart = useSelector((state) => state.cart?.items);
    const fav = useSelector((state) => state.fav?.items);
    const width = window.innerWidth;
    const itemsToShow = width > 1024 ? 15 : width > 768 ? 12 : width > 440 ? 8 : 6;
    // State to track visible items
    const [visibleCount, setVisibleCount] = useState(itemsToShow);
    useEffect(() => {
        setVisibleCount(page * itemsToShow);
    }, [page]);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    // Load next page
                    if (total > filteredNumbers?.length && total > 1) {
                        setPage((prevPage) => {
                            if (prevPage < 2) {
                                return prevPage + 1;
                            }
                            return prevPage;
                        });
                    }
                }
            },
            {
                threshold: 1,
            }
        );

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => {
            if (loadMoreRef.current) {
                observer.unobserve(loadMoreRef.current);
            }
        };
    }, [filteredNumbers.length]);

    const handleAddToCart = async (item) => {
        if (window.gtag) {
            window.gtag('event', 'conversion', {
                send_to: 'AW-16838705843/l-w1CJnEtpcaELOFqd0-',
                value: item?.roundedFinalPrice,
                currency: 'INR'
            });
        }
        try {
            dispatch(addToCart(item));
            const isPresent = cart.find((it) => it._id === item._id);
            if (user && !isPresent) {
                await axios.post("/cart/add", { vipNumberId: item?._id });
            }

            fbqTrack('AddToCart');
        } catch (e) {
            toast.error(e?.response?.data?.message || "Failed to Add to Cart!");
            // console.log(e);
        }
    };
    const removeFavItem = async (item) => {
        try {
            if (user) {
                await axios.post("/fav/remove", { vipNumberId: item?._id });
            }
            dispatch(removeFromFavs(item?._id));
            toast(`Removed ${item.number} from Favourites`, { icon: <IoHeartDislike className="text-lg" /> })
        } catch (error) {
            console.error(error);
            toast.error("Failed to remove item. Please try again!");
        }
    };
    const handleAddToFav = async (item) => {
        // console.log("Favers")
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
    // console.log(filteredNumbers)
    if (loading) {
        return (
            <div className="grid grid-cols-2 sm2:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 xl3:grid-cols-6 gap-1.5 sm:gap-2.5 md:gap-2.5 2xl:gap-2.5 lg:mx-4">
                {Array.from({ length: 40 }).map((_, index) => (
                    <NumberCardSkeleton key={index} />
                ))}
            </div>
        );
    }

    const pricedNumbers = filteredNumbers?.map((item) => {
        const originalPrice = item?.price;
        const ownerDiscount = item?.owner?.discount || 0;
        const discountedPrice = originalPrice - (originalPrice * ownerDiscount * 0.01);
        const marginData = margins?.find(
            (margin) => originalPrice >= margin.minPrice && originalPrice <= margin.maxPrice
        );
        // console.log(marginData,item)
        const marginPercent = marginData ? marginData.marginPercent : 0;
        const marginAmount = (originalPrice * marginPercent) / 100;
        const finalPrice = discountedPrice + marginAmount;
        const roundedFinalPrice = Math.round(finalPrice / 10) * 10;
        const roundedOriginalPrice = Math.round((originalPrice + marginAmount) / 10) * 10;
        const displayedDiscount = ((roundedOriginalPrice - roundedFinalPrice) / roundedOriginalPrice) * 100;

        return {
            ...item,
            roundedFinalPrice,
            displayedDiscount,
            roundedOriginalPrice,
        };
    });

    return (
        <div className="relative w-full h-auto  overflow-hidden bg-white rounded-t-xl flex justify-center items-start">
            {/* <Starfield /> */}
            <div className="relative pb-6 pt-2">
                <div className="grid grid-cols-2 sm2:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 xl3:grid-cols-6  gap-1.5 sm:gap-2.5 md:gap-2.5 2xl:gap-2.5 lg:mx-4">
                    {filteredNumbers?.length > 0 ?
                        (pricedNumbers?.map((item, index) => {
                            // const isPresent = cart?.find((number) => number._id === item._id);
                            const isFav = fav?.find((number) => number._id === item._id);
                            return (
                                <div
                                    key={index}
                                    className="relative bg-[#274A7B] px-2 md:px-6 p-1.5 sm:p-2 md:p-2.5 shadow-lg rounded-2xl flex flex-col items-center space-y-2 md:space-y-3 border-2 border-transparent transition-all duration-500 ease-in-out hover:shadow-xl hover:border-white hover:text-white"
                                >
                                    <div className="cursor-pointer flex flex-col items-center space-y-1 md:space-y-2 " >
                                        {item?.owner?.discount > 0 && (
                                            <div className="absolute top-0.5 text-[0.65rem] md:text-sm left-1 text-white font-medium px-1 py-0.5  md:py-1 rounded-tl-2xl">
                                                -{item?.displayedDiscount.toFixed(1)}%
                                            </div>
                                        )}
                                        <h2 onClick={() => { navigate(`/vip-number/${item.number}`) }} className="text-sm sm:text-lg pr-1 pt-6 md:pt-3  md:text-2xl text-nowrap font-semibold text-white tracking-wide">
                                            {searchParams.get("searchInput") && item?.number?.includes(searchParams.get("searchInput")) ? <div
                                                className="text-[1.5rem]"
                                                dangerouslySetInnerHTML={{
                                                    __html: highlighterSearch(item.number, searchParams.get("searchInput")
                                                    )
                                                }}
                                            /> : <div
                                                className="text-[1.5rem]"
                                                dangerouslySetInnerHTML={{ __html: item.highLightedNumber }}
                                            />}
                                        </h2>
                                        <p onClick={() => { navigate(`/vip-number/${item.number}`) }} className="text-xs md:text-sm text-gray-300 font-medium">
                                            Sum Total = {" "}
                                            <span className="font-semibold">
                                                {item?.total} -{item?.sum2} -{" "}
                                                {item?.sum}
                                            </span>
                                        </p>
                                        {isFav ? <button onClick={() => { removeFavItem(item) }} className="absolute -top-3 sm:-top-4  -right-1.5 bg-transparent focus:outline-none focus:ring-0 focus:border-0 hover:border-0 ease-in-out">
                                            <FaHeart className="text-[1.5rem] text-white drop-shadow-md" />
                                        </button>
                                            : <button onClick={() => { handleAddToFav(item) }} className="absolute -top-3 sm:-top-4 -right-1.5 bg-transparent focus:outline-none focus:ring-0 focus:border-0 hover:border-0 hover:outline-none hover:ring-0 ease-in-out">
                                                <FaRegHeart className="text-[1.5rem] text-white drop-shadow-md" />
                                            </button>}
                                        <div onClick={() => { navigate(`/vip-number/${item.number}`) }} className="flex gap-1 md:gap-2">
                                            <p className="relative text-nowrap text-xs md:text-sm font-semibold text-white  px-2 py-0.5 md:py-1 rounded-full shadow-sm">
                                                {margins?`₹${roundedFinalPrice.toLocaleString('en-IN')}`:'Calculating...'}
                                            </p>
                                            {item?.owner?.discount > 0 && (
                                                <p className="relative text-nowrap text-xs md:text-sm  font-semibold text-white px-2 py-0.5 md:py-1 rounded-full ">
                                                    ₹ <span className="line-through">{item.roundedOriginalPrice.toLocaleString("en-IN")}</span>
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="relative flex justify-between w-full text-[0.7rem] sm:text-xs gap-1 md:text-sm  mt-4">
                                        {/* {isPresent ? (
                                            <button
                                                className="bg-red-300 text-nowrap px-2 md:px-4 py-0.5 md:py-1 rounded-full border border-[#274A7B] text-[#274A7B] font-medium hover:bg-white hover:border-white hover:text-red-400 transition-all duration-300 ease-in-out flex items-center gap-2 shadow-sm"
                                                onClick={() => removeCartItem(item)}
                                            >
                                                <BsCartDash className="font-bold text-[#274A7B] text-xs sm:text-sm md:text-lg" /> Remove
                                            </button>
                                        ) : ( */}
                                        <button
                                            className="bg-transparent text-nowrap px-5 md:px-6 py-0.5 md:py-1 rounded-full border border-white text-white font-medium hover:bg-white hover:border-white hover:text-[#274A7B] transition-all duration-300 ease-in-out flex items-center gap-2 shadow-sm"
                                            onClick={() => navigate(`/vip-number/${item?.number}`)}
                                        >
                                            Details
                                        </button>
                                        {/* )} */}
                                        <button
                                            className="bg-white text-nowrap px-5 md:px-6 py-0.5 md:py-1 rounded-full border border-white text-[#274A7B] font-medium hover:bg-[#274A7B] hover:border-white hover:text-white transition-all duration-300 ease-in-out flex items-center gap-2 shadow-md"
                                            onClick={() => {
                                                handleAddToCart(item);
                                                navigate("/checkout");
                                            }}
                                        >
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                        ) : (
                            <div className=" min-w-[100%] col-span-2 sm2:col-span-3 md:col-span-2 lg:col-span-3 xl:col-span-4 2xl:col-span-5 xl3:col-span-6 flex c  justify-center px-4 pt-6">
                                <div className="bg-white rounded-2xl shadow-xl max-w-xl p-10 w-full text-center">

                                    <div className="flex items-center justify-center mb-6">
                                        <div className="bg-orange-100 p-4 rounded-full">
                                            <FaSearch className="text-orange-500 text-3xl" />
                                        </div>
                                    </div>

                                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                                        No Results Found
                                    </h2>

                                    <p className="text-gray-500 text-base leading-relaxed mb-6">
                                        Your search didn’t match any results. Adjust your filters to explore more options.
                                    </p>

                                    <button
                                        onClick={resetFilters}
                                        className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-full transition duration-300 transform hover:scale-105"
                                    >
                                        <FaSearch className="text-white text-md" />
                                        Reset Filters
                                    </button>
                                </div>
                            </div>
                        )}
                    <div ref={loadMoreRef}></div>
                </div>

                {/* More Button */}
                {(total > filteredNumbers?.length && total > 1) && (
                    <div className="mt-6 flex justify-center">
                        <button
                            className="bg-[#274A7B] text-white px-6 py-2 rounded-lg hover:bg-white hover:text-[#274A7B]"
                            onClick={() => setPage(page + 1)}
                        >
                            More...
                        </button>
                    </div>
                )}
            </div>

        </div>
    );
};

export default BackgroundEffect;
