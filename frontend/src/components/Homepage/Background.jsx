  // import { useState } from "react";
  // import { FaHeart, FaRegHeart, FaSearch } from "react-icons/fa";
  // import { Link, useNavigate } from "react-router-dom";
  // import { useDispatch, useSelector } from "react-redux";
  // import { addToCart } from "../../redux/cart/cartSlice";
  // import UserAxiosAPI from "../../api/userAxiosAPI";
  // import toast from "react-hot-toast";
  // import { IoHeartDislike } from "react-icons/io5";
  // import { addToFavs, removeFromFavs } from "../../redux/favorites/favSlice";
  // import { useRef, useEffect } from "react";
  // import { fbqTrack } from "../utils/fbq";
  // import { NumberCardSkeleton } from "./NumberSkeleton";
  // import { useContext } from "react";
  // import { Appstate } from "../../App";
  // const highlighterSearch = (num, searchTerm) => {
  //   if (!searchTerm || !num.includes(searchTerm)) return num; // Return the original number if no match

  //   // Step 1: Highlight the search term directly (no spacing)
  //   const highlightedSearchTerm = `<span class="text-orange-500 mx-1.5 font-bold">${searchTerm}</span>`;

  //   // Step 2: Replace the search term in the number with the highlighted version
  //   const result = num.replace(
  //     new RegExp(searchTerm, "g"),
  //     highlightedSearchTerm
  //   );

  //   return result;
  // };

  // const BackgroundEffect = ({
  //   resetFilters,
  //   total,
  //   page,
  //   setPage,
  //   filteredNumbers,
  //   loading,
  //   searchParams,
  //   separate,
  // }) => {
  //   const loadMoreRef = useRef();
  //   const { margins, setMargins } = useContext(Appstate);
  //   // const [margins, setMargins] = useState();
  //   const navigate = useNavigate();
  //   const axios = UserAxiosAPI();
  //   // const getMargins = async () => {
  //   //     try {
  //   //         const { data } = await axios.get("/margins");
  //   //         setMargins(data);
  //   //     } catch (e) {
  //   //         console.error(e);
  //   //     }
  //   // };
  //   // useEffect(() => {
  //   //     getMargins();
  //   // }, [])
  //   const dispatch = useDispatch();
  //   const user = useSelector((state) => state.user.user);
  //   const cart = useSelector((state) => state.cart?.items);
  //   const fav = useSelector((state) => state.fav?.items);
  //   const width = window.innerWidth;
  //   const itemsToShow =
  //     width > 1024 ? 15 : width > 768 ? 12 : width > 440 ? 8 : 6;
  //   // State to track visible items
  //   const [visibleCount, setVisibleCount] = useState(itemsToShow);
  //   useEffect(() => {
  //     setVisibleCount(page * itemsToShow);
  //   }, [page]);
  //   useEffect(() => {
  //     const observer = new IntersectionObserver(
  //       (entries) => {
  //         if (entries[0].isIntersecting) {
  //           // Load next page
  //           if (total > filteredNumbers?.length && total > 1 && separate) {
  //             setPage((prevPage) => {
  //               if (prevPage < 2) {
  //                 return prevPage + 1;
  //               }
  //               return prevPage;
  //             });
  //           }
  //         }
  //       },
  //       {
  //         threshold: 1,
  //       }
  //     );

  //     if (loadMoreRef.current) {
  //       observer.observe(loadMoreRef.current);
  //     }

  //     return () => {
  //       if (loadMoreRef.current) {
  //         observer.unobserve(loadMoreRef.current);
  //       }
  //     };
  //   }, [filteredNumbers.length]);

  //   const handleAddToCart = async (item) => {
  //     if (window.gtag) {
  //       window.gtag("event", "conversion", {
  //         send_to: "AW-16838705843/l-w1CJnEtpcaELOFqd0-",
  //         value: item?.roundedFinalPrice,
  //         currency: "INR",
  //       });
  //     }
  //     try {
  //       dispatch(addToCart(item));
  //       const isPresent = cart.find((it) => it._id === item._id);
  //       if (user && !isPresent) {
  //         await axios.post("/cart/add", { vipNumberId: item?._id });
  //       }

  //       fbqTrack("AddToCart");
  //     } catch (e) {
  //       toast.error(e?.response?.data?.message || "Failed to Add to Cart!");
  //       // console.log(e);
  //     }
  //   };
  //   const removeFavItem = async (item) => {
  //     try {
  //       if (user) {
  //         await axios.post("/fav/remove", { vipNumberId: item?._id });
  //       }
  //       dispatch(removeFromFavs(item?._id));
  //       toast(`Removed ${item.number} from Favourites`, {
  //         icon: <IoHeartDislike className="text-lg" />,
  //       });
  //     } catch (error) {
  //       console.error(error);
  //       toast.error("Failed to remove item. Please try again!");
  //     }
  //   };
  //   const handleAddToFav = async (item) => {
  //     // console.log("Favers")
  //     try {
  //       dispatch(addToFavs(item));
  //       const isPresent = fav?.find((it) => it._id === item._id);
  //       if (user && !isPresent) {
  //         await axios.post("/fav/add", { vipNumberId: item?._id });
  //       }
  //     } catch (e) {
  //       toast.error(e?.response?.data?.message || "Failed to Add to Favourites!");
  //       console.log(e);
  //     }
  //   };
  //   // console.log(filteredNumbers)
  //   if (loading) {
  //     return (
  //       <div className="grid grid-cols-2 sm2:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 xl3:grid-cols-6 gap-1.5 sm:gap-2.5 md:gap-2.5 2xl:gap-2.5 lg:mx-4">
  //         {Array.from({ length: 40 }).map((_, index) => (
  //           <NumberCardSkeleton key={index} />
  //         ))}
  //       </div>
  //     );
  //   }

  //   return (
  //     <div className="relative w-full h-auto overflow-hidden bg-white rounded-t-xl flex justify-center items-start">
  //       <div className="relative pb-6 pt-2">
  //         <div className="grid grid-cols-2 sm2:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 xl3:grid-cols-6 gap-1.5 sm:gap-2.5 md:gap-2.5 2xl:gap-2.5 lg:mx-4 ">
  //           {filteredNumbers?.length > 0 ? (
  //             filteredNumbers?.map((item, index) => {
  //               const isFav = fav?.find((number) => number._id === item._id);
  //               return (
  //                 <div
  //                   key={index}
  //                   className="relative bg-[#274A7B] px-2 md:px-6 p-1.5 sm:p-2 md:p-2.5 shadow-lg rounded-2xl flex flex-col items-center space-y-2 md:space-y-3 border-2 border-transparent transition-all duration-500 ease-in-out hover:shadow-xl hover:border-white hover:text-white min-h-[80px]"
  //                 >
  //                   <div className="cursor-pointer flex flex-col items-center space-y-1 md:space-y-2">
  //                     <div className="absolute top-0.5 left-1 text-white font-medium px-1 py-0.5 md:py-1 rounded-tl-2xl min-h-[20px]">
  //                       {item?.owner?.discount > 0 ? (
  //                         <>-{num?.displayedDiscount.toFixed(1)}%</>
  //                       ) : (
  //                         <>&nbsp;</>
  //                       )}
  //                     </div>

  //                     <Link
  //                       to={`/vip-number/${item.number}`}
  //                       className="text-sm sm:text-lg pr-1 hover:text-white pt-6 md:pt-3 md:text-2xl text-nowrap font-semibold text-white tracking-wide min-h-[40px] flex justify-center items-center"
  //                     >
  //                       {searchParams.get("searchInput") &&
  //                       item?.number?.includes(
  //                         searchParams.get("searchInput")
  //                       ) ? (
  //                         <div
  //                           className="text-[1.5rem]"
  //                           dangerouslySetInnerHTML={{
  //                             __html: highlighterSearch(
  //                               item.number,
  //                               searchParams.get("searchInput")
  //                             ),
  //                           }}
  //                         />
  //                       ) : (
  //                         <div
  //                           className="text-[1.5rem]"
  //                           dangerouslySetInnerHTML={{
  //                             __html: item.highLightedNumber,
  //                           }}
  //                         />
  //                       )}
  //                     </Link>

  //                     <Link
  //                       to={`/vip-number/${item.number}`}
  //                       className="text-xs md:text-sm hover:text-white text-gray-300 font-medium min-h-[20px]"
  //                     >
  //                       Sum Total =
  //                       <span className="font-semibold">
  //                         {" "}
  //                         {item?.total} - {item?.sum2} - {item?.sum}
  //                       </span>
  //                     </Link>

  //                     <span
  //                       aria-label="Favorite"
  //                       onClick={() =>
  //                         isFav ? removeFavItem(item) : handleAddToFav(item)
  //                       }
  //                       className="absolute top-0.5 sm:top-1 right-2 bg-transparent focus:outline-none"
  //                     >
  //                       {isFav ? (
  //                         <FaHeart className="text-[1.5rem] hover:ring-none text-white hover:border-0 hover:border-none hover:border-transparent hover:ring-0 drop-shadow-md" />
  //                       ) : (
  //                         <FaRegHeart className="text-[1.5rem] hover:ring-none text-white hover:border-0 hover:border-none hover:border-transparent hover:ring-0 drop-shadow-md" />
  //                       )}
  //                     </span>

  //                     <Link
  //                       to={`/vip-number/${item.number}`}
  //                       className="flex gap-1 md:gap-2 min-h-[24px]"
  //                     >
  //                       <p className="relative text-nowrap text-xs md:text-sm font-semibold hover:text-white text-white px-2 py-0.5 md:py-1 rounded-full shadow-sm">
  //                         ₹ {item.price.toLocaleString("en-IN")}
  //                       </p>
  //                       {/* // :<p className="relative text-nowrap text-xs md:text-sm font-semibold text-white px-2 py-0.5 md:py-1 rounded-full shadow-sm">
  //                                             //     Calculating...
  //                                             // </p> */}
  //                       {item?.displayedDiscount > 0 && (
  //                         <p className="relative text-nowrap text-xs md:text-sm font-semibold text-white px-2 py-0.5 md:py-1 rounded-full">
  //                           ₹{" "}
  //                           <span className="line-through">
  //                             {item.originalPrice.toLocaleString("en-IN")}
  //                           </span>
  //                         </p>
  //                       )}
  //                     </Link>
  //                   </div>

  //                   <div className="relative flex justify-between w-full text-[0.7rem] sm:text-xs gap-1 md:text-sm mt-4 min-h-[40px]">
  //                     <button
  //                       aria-label={"Details"}
  //                       className="bg-transparent text-nowrap px-5 md:px-6 py-0.5 md:py-1 rounded-full border border-white text-white font-medium hover:bg-white hover:border-white hover:text-[#274A7B] transition-all duration-300 ease-in-out flex items-center gap-2 shadow-sm"
  //                       onClick={() => navigate(`/vip-number/${item?.number}`)}
  //                     >
  //                       Details
  //                     </button>

  //                     <button
  //                       aria-label={"Add to Cart"}
  //                       className="bg-white text-nowrap px-5 md:px-6 py-0.5 md:py-1 rounded-full border border-white text-[#274A7B] font-medium hover:bg-[#274A7B] hover:border-white hover:text-white transition-all duration-300 ease-in-out flex items-center gap-2 shadow-md"
  //                       onClick={() => {
  //                         handleAddToCart(item);
  //                         navigate("/checkout");
  //                       }}
  //                     >
  //                       Buy Now
  //                     </button>
  //                   </div>
  //                 </div>
  //               );
  //             })
  //           ) : (
  //             <div className="min-w-full col-span-full flex justify-center px-4 pt-6">
  //               <div className="bg-white rounded-2xl shadow-xl max-w-xl p-10 w-full text-center min-h-[300px]">
  //                 <div className="flex items-center justify-center mb-6">
  //                   <div className="bg-orange-100 p-4 rounded-full">
  //                     <FaSearch className="text-orange-500 text-3xl" />
  //                   </div>
  //                 </div>

  //                 <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 min-h-[32px]">
  //                   No Results Found
  //                 </h2>

  //                 <p className="text-gray-500 text-base leading-relaxed mb-6 min-h-[48px]">
  //                   Your search didn’t match any results. Adjust your filters to
  //                   explore more options.
  //                 </p>

  //                 <button
  //                   onClick={resetFilters}
  //                   className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-full transition duration-300 transform hover:scale-105"
  //                 >
  //                   <FaSearch className="text-white text-md" />
  //                   Reset Filters
  //                 </button>
  //               </div>
  //             </div>
  //           )}

  //           <div ref={loadMoreRef}></div>
  //         </div>

  //         {total > filteredNumbers?.length && total > 1 && (
  //           <div className="mt-6 flex justify-center">
  //             <button
  //               className="bg-[#274A7B] text-white px-6 py-2 rounded-lg hover:bg-white hover:text-[#274A7B]"
  //               onClick={() => setPage(page + 1)}
  //             >
  //               More...
  //             </button>
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //   );
  // };

  // export default BackgroundEffect;


























  import {
    useState,
    useRef,
    useEffect,
    useContext,
    useCallback,
    useMemo,
  } from "react";
  import { FaHeart, FaRegHeart, FaSearch } from "react-icons/fa";
  import { Link, useNavigate } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
  import { addToCart } from "../../redux/cart/cartSlice";
  import UserAxiosAPI from "../../api/userAxiosAPI";
  import toast from "react-hot-toast";
  import { IoHeartDislike } from "react-icons/io5";
  import { addToFavs, removeFromFavs } from "../../redux/favorites/favSlice";
  import { fbqTrack } from "../utils/fbq";
  import { NumberCardSkeleton } from "./NumberSkeleton";
  import { Appstate } from "../../App";
  import { RiArrowDropDownLine } from "react-icons/ri";
  import { RxCross2 } from "react-icons/rx";
  import { BsCart3 } from "react-icons/bs";
  import { CiHeart } from "react-icons/ci";
  import { safeDecrypt } from "../../utils/decryptAES"; // secure decrypt util

  const highlighterSearch = (num, searchTerm) => {
    if (!searchTerm || !num.includes(searchTerm)) return num; // Return the original number if no match
    const highlightedSearchTerm = `<span class="text-orange-500 mx-1.5 font-bold">${searchTerm}</span>`;
    const result = num.replace(new RegExp(searchTerm, "g"), highlightedSearchTerm);
    return result;
  };

  const DEFAULT_CARD_TIMER_DURATION = 1 * 60 * 60 + 36 * 60 + 31;
  const TIMER_HOUR_PRESETS = [7, 4, 8];

  const hoursToSeconds = (hours) => Math.max(Number(hours) || 0, 1) * 60 * 60;

  const formatTimeLeft = (totalSeconds) => {
    if (!totalSeconds || totalSeconds <= 0) return "00:00:00";
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const pad = (value) => String(value).padStart(2, "0");
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  const BackgroundEffect = ({
    resetFilters,
    total,
    page,
    setPage,
    
    loading,
    searchParams,
    separate,
    filters,
  }) => {
    const loadMoreRef = useRef();
    const { margins, setMargins, filteredNumbers, setFilteredNumbers } = useContext(Appstate);
    const [sortBy, setSortBy] = useState("price_asc");

    const navigate = useNavigate();
    const axios = UserAxiosAPI();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const cart = useSelector((state) => state.cart?.items);
    const fav = useSelector((state) => state.fav?.items);
    const width = typeof window !== "undefined" ? window.innerWidth : 1200;
    const itemsToShow = width > 1024 ? 15 : width > 768 ? 12 : width > 440 ? 8 : 6;

    const [visibleCount, setVisibleCount] = useState(itemsToShow);
    const [decryptedNumbers, setDecryptedNumbers] = useState([]);
    const [isDecrypting, setIsDecrypting] = useState(false);
    const [searchAnything, setSearchAnything] = useState("");
    const [cardTimers, setCardTimers] = useState({});
    const [isInitialLoading, setIsInitialLoading] = useState(true);

    const getTimerKey = useCallback(
      (item, index) => item?._id ?? item?.number ?? `index-${index}`,
      []
    );

    const getComparablePrice = useCallback((item) => {
      const price = item?.roundedFinalPrice ?? item?.price ?? 0;
      return Number(price) || 0;
    }, []);

    const sortedNumbers = useMemo(() => {
      if (!decryptedNumbers?.length) return [];
      const cloned = [...decryptedNumbers];
      cloned.sort((a, b) => {
        const priceA = getComparablePrice(a);
        const priceB = getComparablePrice(b);
        if (sortBy === "price_desc") {
          return priceB - priceA;
        }
        return priceA - priceB;
      });
      return cloned;
    }, [decryptedNumbers, sortBy, getComparablePrice]);

    // Decrypt required fields from backend (we assume backend encrypted these)
    useEffect(() => {
      const decryptData = async () => {
        if (!filteredNumbers || filteredNumbers.length === 0) {
          setDecryptedNumbers([]);
          return;
        }

        setIsDecrypting(true);
        try {
          const decrypted = await Promise.all(
            filteredNumbers.map(async (item) => {
              // Try decrypting the fields we expect backend to provide.
              // If any field absent, fallback to the unencrypted value from item.
              const [
                roundedFinalPrice,
                roundedOriginalPrice,
                displayedDiscount,
                price,
                originalPrice,
                sum,
                sum2,
                totalVal,
              ] = await Promise.all([
                item.roundedFinalPrice ? safeDecrypt(item.roundedFinalPrice) : Promise.resolve(item.roundedFinalPrice ?? item.price),
                item.roundedOriginalPrice ? safeDecrypt(item.roundedOriginalPrice) : Promise.resolve(item.roundedOriginalPrice ?? item.originalPrice),
                item.displayedDiscount ? safeDecrypt(item.displayedDiscount) : Promise.resolve(item.displayedDiscount ?? 0),
                item.price ? safeDecrypt(item.price) : Promise.resolve(item.price ?? 0),
                item.originalPrice ? safeDecrypt(item.originalPrice) : Promise.resolve(item.originalPrice ?? 0),
                item.sum ? safeDecrypt(item.sum) : Promise.resolve(item.sum ?? 0),
                item.sum2 ? safeDecrypt(item.sum2) : Promise.resolve(item.sum2 ?? 0),
                item.total ? safeDecrypt(item.total) : Promise.resolve(item.total ?? 0),
              ]);

              // parse floats/ints and fallback if NaN
              const parsedRoundedFinal = Number(roundedFinalPrice);
              const parsedRoundedOriginal = Number(roundedOriginalPrice);
              const parsedDisplayedDiscount = Number(displayedDiscount);
              const parsedPrice = Number(price);
              const parsedOriginalPrice = Number(originalPrice);

              return {
                ...item,
                roundedFinalPrice: !Number.isNaN(parsedRoundedFinal) ? parsedRoundedFinal : (parsedPrice || 0),
                roundedOriginalPrice: !Number.isNaN(parsedRoundedOriginal) ? parsedRoundedOriginal : (parsedOriginalPrice || 0),
                displayedDiscount: !Number.isNaN(parsedDisplayedDiscount) ? parsedDisplayedDiscount : 0,
                price: !Number.isNaN(parsedPrice) ? parsedPrice : 0,
                originalPrice: !Number.isNaN(parsedOriginalPrice) ? parsedOriginalPrice : 0,
                sum: parseInt(sum) || 0,
                sum2: parseInt(sum2) || 0,
                total: parseInt(totalVal) || 0,
              };
            })
          );
          setDecryptedNumbers(decrypted);
        } catch (error) {
          console.error("Decryption error:", error);
          // If decryption fails, fallback to showing raw items (less secure but visible)
          setDecryptedNumbers(filteredNumbers);
        } finally {
          setIsDecrypting(false);
        }
      };

      decryptData();
    }, [filteredNumbers]);

    useEffect(() => {
      setVisibleCount(page * itemsToShow);
    }, [page, itemsToShow]);

    useEffect(() => {
      if (!decryptedNumbers?.length) {
        setCardTimers({});
        return;
      }

      setCardTimers((prev) => {
        const next = { ...prev };
        const activeKeys = new Set();

        decryptedNumbers.forEach((item, index) => {
          const key = getTimerKey(item, index);
          activeKeys.add(key);
          if (!next[key]) {
            const baseSeconds = hoursToSeconds(
              TIMER_HOUR_PRESETS[index % TIMER_HOUR_PRESETS.length]
            );
            next[key] = { base: baseSeconds, remaining: baseSeconds };
          }
        });

        Object.keys(next).forEach((key) => {
          if (!activeKeys.has(key)) {
            delete next[key];
          }
        });

        return next;
      });
    }, [decryptedNumbers, getTimerKey]);

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            if (total > filteredNumbers?.length && total > 1 && separate) {
              setPage((prevPage) => {
                if (prevPage < 2) {
                  return prevPage + 1;
                }
                return prevPage;
              });
            }
          }
        },
        { threshold: 1 }
      );

      if (loadMoreRef.current) {
        observer.observe(loadMoreRef.current);
      }

      return () => {
        if (loadMoreRef.current) {
          observer.unobserve(loadMoreRef.current);
        }
      };
    }, [filteredNumbers?.length, total, separate, setPage]);

    useEffect(() => {
      const intervalId = setInterval(() => {
        setCardTimers((prev) => {
          const keys = Object.keys(prev || {});
          if (!keys.length) return prev;

          const updated = {};

          keys.forEach((key) => {
            const value = prev[key];
            const timerObj =
              typeof value === "number"
                ? {
                    base: value || DEFAULT_CARD_TIMER_DURATION,
                    remaining: value || DEFAULT_CARD_TIMER_DURATION,
                  }
                : value;
            const base = timerObj.base || DEFAULT_CARD_TIMER_DURATION;
            const remaining = timerObj.remaining > 0 ? timerObj.remaining - 1 : base;
            updated[key] = { base, remaining };
          });

          return updated;
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }, []);

    // Load initial data on page load
    useEffect(() => {
      const loadInitialData = async () => {
        try {
          setIsInitialLoading(true);
          const { data } = await axios.get(
            `http://localhost:5000/api/vip-numbers/category?category=ALL&number=`
          );
          const items = data?.data ?? data ?? [];
          setFilteredNumbers(items);
          setPage(1);
        } catch (error) {
          console.error("Error loading initial data:", error);
        } finally {
          setIsInitialLoading(false);
        }
      };

      loadInitialData();  
    }, []);

  const handleSearchAnywhere = async () => {
    const q = (searchAnything || "").trim();
    if (!q) return;

    try {
      let category = filters?.category || "ALL";

      const { data } = await axios.get(
        `http://localhost:5000/api/vip-numbers/category?category=${encodeURIComponent(
          category
        )}&number=${encodeURIComponent(q)}`
      );

      setFilteredNumbers(data?.data ?? []);
      setPage(1);

    } catch (error) {
      console.log("Search error:", error);
      toast.error("Search failed.");
    }
  };


    const handleAddToCart = async (item) => {
      // Use decrypted roundedFinalPrice if available, else fallback to price
      const analyticsValue = item?.roundedFinalPrice ?? item?.price ?? 0;
      if (window.gtag) {  
        window.gtag("event", "conversion", {
          send_to: "AW-16838705843/l-w1CJnEtpcaELOFqd0-",
          value: analyticsValue,
          currency: "INR",
        });
      }
      try {
        dispatch(addToCart(item));
        const isPresent = cart.find((it) => it._id === item._id);
        if (user && !isPresent) {
          await axios.post("/cart/add", { vipNumberId: item?._id });
        }
        fbqTrack("AddToCart");
      } catch (e) {
        toast.error(e?.response?.data?.message || "Failed to Add to Cart!");
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
        console.error(error);
        toast.error("Failed to remove item. Please try again!");
      }
    };

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

    if (loading || isDecrypting || isInitialLoading) {
      return (
        <div className="grid grid-cols-2 sm2:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 xl3:grid-cols-6 gap-1.5 sm:gap-2.5 md:gap-2.5 2xl:gap-2.5 lg:mx-4 mb-5">
          {Array.from({ length: 40 }).map((_, index) => (
            <NumberCardSkeleton key={index} />
          ))}
        </div>
      );
    }

    return (
      <div className="relative w-full h-auto overflow-hidden bg-white rounded-t-xl pl-0 sm:pl-5">
        <div className="flex flex-col mt-2 space-y-4">
          {/* Search and Sort Section */}
          <div className="flex flex-col sm:flex-row w-full items-center gap-3 sm:gap-4">

            {/* Search Input — Visible on all screens */}
          

            {/* Sort Dropdown */}
            <div className="flex flex-row items-center justify-center sm:justify-end w-full sm:w-auto sm:ml-auto gap-2 flex-nowrap">
              <label
                htmlFor="sort-by"
                className="text-[#191C1F] font-medium whitespace-nowrap text-xs sm:text-base"
              >
                Sort by:
              </label>

              <div className="relative w-full max-w-[170px] sm:w-auto flex justify-center sm:justify-end">
                <select
                  id="sort-by"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="
                    appearance-none 
                    w-full 
                    py-2 
                    pl-3 
                    sm:pr-4 md:pr-8
                    text-gray-800 
                    border border-gray-300 
                    rounded-full 
                    bg-white 
                    focus:outline-none 
                    focus:ring-1 focus:ring-[#17565D]
                    focus:border-[#17565D] 
                    cursor-pointer 
                    transition 
                    duration-150 
                    ease-in-out 
                    font-semibold 
                    text-xs sm:text-sm
                  "
                >
                  <option value="price_asc">Price low to high</option>
                  <option value="price_desc">Price high to low</option>
                </select>

                <RiArrowDropDownLine
                  size={20}
                  className="pointer-events-none absolute top-1/2 -translate-y-1/2 right-3 text-gray-600"
                />
              </div>
            </div>
          </div>

          {/* Active Filters and Results Section */}
          {/* <div className="flex flex-wrap rounded-lg items-center text-xs sm:text-sm justify-center sm:justify-between p-1 sm:p-2 bg-[#F3F9FB] gap-2 sm:gap-0">
            <div className="flex flex-nowrap gap-2 justify-center items-center sm:items-start p-1 whitespace-nowrap overflow-x-auto no-scrollbar">
              <span className="text-[#5F6C72]">Active Filter :</span>
              <span className="text-[#191C1F] inline-flex items-center">
                3 Digit Number
                <span className="ml-0.5 inline"><RxCross2 /></span>
              </span>
            </div>

            <div>
              <span className="text-gray-800">
                <strong className="px-2 py-1 text-black font-semibold rounded-md mr-1 shadow-sm">
                  {decryptedNumbers?.length ?? 0}
                </strong>
                <span className="text-gray-600">Results found.</span>
              </span>
            </div>
          </div> */}
        </div>

        <div className="relative pb-6 pt-8">
          <div className="grid gap-2 sm:gap-4 grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
            {sortedNumbers?.length > 0 ? (
              sortedNumbers.slice(0, visibleCount).map((item, index) => {
                const isFav = fav?.find((number) => number._id === item._id);
                const timerKey = getTimerKey(item, index);
                const timerData = cardTimers[timerKey];
                const timeLeftSeconds =
                  typeof timerData === "number"
                    ? timerData
                    : timerData?.remaining ?? DEFAULT_CARD_TIMER_DURATION;
                console.log("Card Item - Discount Data:", {
                  displayedDiscount: item?.displayedDiscount,
                  roundedOriginalPrice: item?.roundedOriginalPrice,
                  originalPrice: item?.originalPrice,
                  item
                });
                return (
                  <div
                    key={item._id || index}
                    className="bg-[#fcfae5] rounded-2xl p-2 border-2 border-[#17565D] min-h-[80px] w-full relative max-w-[300px] mx-auto"
                  >
                    <div className="rounded-2xl flex flex-col items-center border-2 border-[rgb(255,207,81)] py-2">
                      <div className="w-full px-2">
                        <div className="flex items-center justify-between text-xs">
                        

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              if (isFav) {
                                removeFavItem(item);
                              } else {
                                handleAddToFav(item);
                              }
                            }}
                            className="p-1 rounded-full hover:border-[#FCFAE5] hover:scale-110 bg-[#FCFAE5] transition"
                          >
                            {isFav ? (
                              <FaHeart size={22} className="text-red-500" />
                            ) : (
                              <FaRegHeart size={22} className="text-[#17565D]" />
                            )}
                          </button>

                          <div className="flex border-[#17565D] border-l-2 pl-2">
                            <small className="text-xs sm:text-sm block text-nowrap overflow-hidden  leading-tight">Sum Total {item?.sum}</small>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-2xl overflow-hidden my-3 w-full bg-[length:200%_200%] bg-center" style={{ background: "linear-gradient(90deg, rgb(19,52,55),rgb(44,106,108), rgb(19,52,55))" }}>
                        <div className="cursor-pointer flex flex-col items-center pt-4 pb-2 space-y-1 w-full ">
                          <Link
                            to={`/vip-number/${item.number}`}
                            className="text-xl sm:text-3xl [transform:scaleY(1.3)] font-semibold text-center text-[#F5C037] px-3"
                            style={{ fontFamily: "'Lato', sans-serif" }}
                          >
                            {searchParams.get("searchInput") && item?.number?.includes(searchParams.get("searchInput")) ? (
                              <div
                                className="[text-shadow:0px_0px_12px_black]"
                                style={{ fontFamily: "'Lato', sans-serif" }}
                                dangerouslySetInnerHTML={{ __html: highlighterSearch(item.number, searchParams.get("searchInput")) }}
                              />
                            ) : (
                              <div
                                className="[text-shadow:0px_0px_12px_black]"
                                style={{ fontFamily: "'Lato', sans-serif" }}
                                dangerouslySetInnerHTML={{ __html: item.highLightedNumber }}
                              />
                            )}
                          </Link>

                          <Link to={`/vip-number/${item.number}`} className="text-xs text-center min-h-[20px] text-[#F5C037] px-1">
                            <span className="text-shadow-lg [text-shadow:1px_1px_2px_black]">
                              {item?.category?.[0]}
                            </span>
                          </Link>
                        </div>
                      </div>

                      <div className="relative flex justify-between items-center gap-2 w-full text-xs sm:text-sm p-2">
                        <Link to={`/vip-number/${item.number}`} className="text-center text-sm sm:text-xl font-semibold text-[rgb(22,59,62)]">
                          { /* Show decrypted roundedFinalPrice if available, else fallback to price */ }
                          <p className="">{/* price */}₹ {(item?.roundedFinalPrice ?? item?.price ?? 0).toLocaleString("en-IN")}</p>
                          {item?.displayedDiscount > 0 && (
                            <p className="relative text-nowrap text-xs md:text-sm font-semibold text-black opacity-50 px-2 py-0.5 md:py-1 rounded-full">
                              ₹ <span className="line-through">{(item?.roundedOriginalPrice ?? item?.originalPrice ?? 0).toLocaleString("en-IN")}</span>
                            </p>
                          )}
                        </Link>

                        <button
                          aria-label={"Add to Cart"}
                          className="text-nowrap font-semibold px-4 py-1 w-1/2 max-h-8 justify-center rounded-full border-2 border-[#F5C037] text-[#17535D] font-medium hover:bg-white hover:border-[#17535D] hover:text-[#17535D] transition-all duration-300 ease-in-out flex items-center gap-2 shadow-md"
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
                );
              })
            ) : (
              <div className="min-w-full col-span-full flex justify-center px-4 pt-6">
                <div className="bg-white rounded-2xl shadow-xl max-w-xl p-10 w-full text-center min-h-[300px]">
                  <div className="flex items-center justify-center mb-6">
                    <div className="bg-[#17565D] p-4 rounded-full">
                      <FaSearch className="text-[#F5C037] text-3xl" />
                    </div>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-[#17565D] mb-2 min-h-[32px]">
                    No Results Found
                  </h2>

                  <p className="text-gray-500 text-base leading-relaxed mb-6 min-h-[48px]">
                    Your search didn’t match any results. Adjust your filters to explore more options.
                  </p>

                  <button
                    onClick={resetFilters}
                    className="inline-flex items-center gap-2 bg-[#F5C037] hover:bg-[#17565D] text-[#17565D] hover:text-[#F5C037] font-medium px-6 py-3 rounded-full transition duration-300 transform hover:scale-105"
                  >
                    <FaSearch className="text-[#17565D] hover:text-[#F5C037] text-md" />
                    Reset Filters
                  </button>
                </div>
              </div>
            )}

            <div ref={loadMoreRef}></div>
          </div>

          {total > (filteredNumbers?.length ?? 0) && total > 1 && (
            <div className="mt-3 sm:mt-6 flex justify-center">
              <button
                className="bg-transparent text-[#17565D] text-lg py-0 sm:py-2 px-4 sm:px-8 border-2 border-[#17565D] rounded-full hover:bg-[#17565D] hover:text-white"
                onClick={() => setPage(page + 1)}
              >
                Load More
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row ">
          <div className="flex justify-center -ml-10"></div>
        </div>
      </div>
    );
  };

  export default BackgroundEffect;
