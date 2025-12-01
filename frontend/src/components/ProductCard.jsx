// import { useState } from "react";
// import { FaHeart, FaRegHeart } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../redux/cart/cartSlice";
// import UserAxiosAPI from "../api/userAxiosAPI";
// import toast from "react-hot-toast";
// import { IoHeartDislike } from "react-icons/io5";
// import { addToFavs, removeFromFavs } from "../redux/favorites/favSlice";
// import { fbqTrack } from "./utils/fbq";
// import { useContext, useEffect } from "react";
// import { Appstate } from "../App";
// import { safeDecrypt } from "../utils/decryptAES";

// const ProductCard = ({ item, searchTerm = "" }) => {
//   const navigate = useNavigate();
//   const axios = UserAxiosAPI();
//   const dispatch = useDispatch();
//   const { margins } = useContext(Appstate);
//   const user = useSelector((state) => state.user.user);
//   const cart = useSelector((state) => state.cart?.items);
//   const fav = useSelector((state) => state.fav?.items);

//   const [decryptedItem, setDecryptedItem] = useState(null);
//   const [isDecrypting, setIsDecrypting] = useState(true);

//   // Decrypt item data
//   useEffect(() => {
//     const decryptData = async () => {
//       setIsDecrypting(true);
//       try {
//         const originalPrice = await safeDecrypt(item?.price);
//         const stock = await safeDecrypt(item?.stock);
//         const sum = await safeDecrypt(item?.sum);
//         const sum2 = await safeDecrypt(item?.sum2);
//         const total = await safeDecrypt(item?.total);
//         const view = await safeDecrypt(item?.view);

//         const ownerDiscount = item?.owner?.discount
//           ? await safeDecrypt(item.owner.discount)
//           : 0;
//         const ownerShowCased = item?.owner?.showCased
//           ? await safeDecrypt(item.owner.showCased)
//           : null;

//         const discountedPrice =
//           originalPrice - originalPrice * ownerDiscount * 0.01;

//         const marginData = margins?.find(
//           (margin) =>
//             originalPrice >= margin.minPrice && originalPrice <= margin.maxPrice
//         );

//         const marginPercent = marginData ? marginData.marginPercent : 0;
//         const marginAmount = (originalPrice * marginPercent) / 100;
//         const finalPrice = discountedPrice + marginAmount;
//         const roundedFinalPrice = Math.round(finalPrice / 10) * 10;
//         const roundedOriginalPrice =
//           Math.round((originalPrice + marginAmount) / 10) * 10;
//         const displayedDiscount =
//           ((roundedOriginalPrice - roundedFinalPrice) / roundedOriginalPrice) *
//           100;

//         setDecryptedItem({
//           ...item,
//           price: originalPrice,
//           stock,
//           sum,
//           sum2,
//           total,
//           view,
//           owner: {
//             ...item.owner,
//             discount: ownerDiscount,
//             showCased: ownerShowCased,
//           },
//           roundedFinalPrice,
//           displayedDiscount,
//           roundedOriginalPrice,
//         });
//       } catch (error) {
//         console.error("Error decrypting item:", error);
//         setDecryptedItem(item);
//       } finally {
//         setIsDecrypting(false);
//       }
//     };

//     decryptData();
//   }, [item, margins]);

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

//   const highlighterSearch = (num, searchTerm) => {
//     if (!searchTerm || !num.includes(searchTerm)) return num;
//     const highlightedSearchTerm = `<span class="text-orange-500 mx-1.5 font-bold">${searchTerm}</span>`;
//     const result = num.replace(
//       new RegExp(searchTerm, "g"),
//       highlightedSearchTerm
//     );
//     return result;
//   };

//   if (isDecrypting || !decryptedItem) {
//     return (
//       <div className="relative bg-gray-200 animate-pulse px-2 md:px-6 p-1.5 sm:p-2 md:p-2.5 shadow-lg rounded-2xl flex flex-col items-center space-y-2 md:space-y-3 min-h-[200px]">
//         <div className="w-full h-8 bg-gray-300 rounded"></div>
//         <div className="w-3/4 h-6 bg-gray-300 rounded"></div>
//         <div className="w-1/2 h-6 bg-gray-300 rounded"></div>
//       </div>
//     );
//   }

//   const isFav = fav?.find((number) => number._id === decryptedItem._id);

//   return (
//     <div className="relative bg-[#274A7B] px-2 md:px-6 p-1.5 sm:p-2 md:p-2.5 shadow-lg rounded-2xl flex flex-col items-center space-y-2 md:space-y-3 border-2 border-transparent transition-all duration-500 ease-in-out hover:shadow-xl hover:border-white hover:text-white min-h-[80px]">
//       <div className="cursor-pointer flex flex-col items-center space-y-1 md:space-y-2 w-full">
//         {/* Discount Badge */}
//         <div className="absolute top-0.5 left-1 text-white font-medium px-1 py-0.5 md:py-1 rounded-tl-2xl min-h-[20px]">
//           {decryptedItem?.owner?.discount > 0 ? (
//             <>-{decryptedItem?.displayedDiscount.toFixed(1)}%</>
//           ) : (
//             <>&nbsp;</>
//           )}
//         </div>

//         {/* Number Display */}
//         <Link
//           to={`/vip-number/${decryptedItem.number}`}
//           className="text-sm sm:text-lg pr-1 hover:text-white pt-6 md:pt-3 md:text-2xl text-nowrap font-semibold text-white tracking-wide min-h-[40px] flex justify-center items-center"
//         >
//           {searchTerm && decryptedItem?.number?.includes(searchTerm) ? (
//             <div
//               className="text-[1.5rem]"
//               dangerouslySetInnerHTML={{
//                 __html: highlighterSearch(decryptedItem.number, searchTerm),
//               }}
//             />
//           ) : (
//             <div
//               className="text-[1.5rem]"
//               dangerouslySetInnerHTML={{
//                 __html: decryptedItem.highLightedNumber || decryptedItem.number,
//               }}
//             />
//           )}
//         </Link>

//         {/* Sum Total */}
//         <Link
//           to={`/vip-number/${decryptedItem.number}`}
//           className="text-xs md:text-sm hover:text-white text-gray-300 font-medium min-h-[20px]"
//         >
//           Sum Total =
//           <span className="font-semibold">
//             {" "}
//             {decryptedItem?.total} - {decryptedItem?.sum2} -{" "}
//             {decryptedItem?.sum}
//           </span>
//         </Link>

//         {/* Favorite Icon */}
//         <span
//           aria-label="Favorite"
//           onClick={() =>
//             isFav ? removeFavItem(decryptedItem) : handleAddToFav(decryptedItem)
//           }
//           className="absolute top-0.5 sm:top-1 right-2 bg-transparent focus:outline-none cursor-pointer"
//         >
//           {isFav ? (
//             <FaHeart className="text-[1.5rem] hover:ring-none text-white hover:border-0 hover:border-none hover:border-transparent hover:ring-0 drop-shadow-md" />
//           ) : (
//             <FaRegHeart className="text-[1.5rem] hover:ring-none text-white hover:border-0 hover:border-none hover:border-transparent hover:ring-0 drop-shadow-md" />
//           )}
//         </span>

//         {/* Price Display */}
//         <Link
//           to={`/vip-number/${decryptedItem.number}`}
//           className="flex gap-1 md:gap-2 min-h-[24px]"
//         >
//           {margins ? (
//             <p className="relative text-nowrap text-xs md:text-sm font-semibold hover:text-white text-white px-2 py-0.5 md:py-1 rounded-full shadow-sm">
//               ₹ {decryptedItem.roundedFinalPrice.toLocaleString("en-IN")}
//             </p>
//           ) : (
//             <p className="relative text-nowrap text-xs md:text-sm font-semibold text-white px-2 py-0.5 md:py-1 rounded-full shadow-sm">
//               Calculating...
//             </p>
//           )}
//           {decryptedItem?.owner?.discount > 0 && (
//             <p className="relative text-nowrap text-xs md:text-sm font-semibold text-white px-2 py-0.5 md:py-1 rounded-full">
//               ₹{" "}
//               <span className="line-through">
//                 {decryptedItem.roundedOriginalPrice.toLocaleString("en-IN")}
//               </span>
//             </p>
//           )}
//         </Link>
//       </div>

//       {/* Action Buttons */}
//       <div className="relative flex justify-between w-full text-[0.7rem] sm:text-xs gap-1 md:text-sm mt-4 min-h-[40px]">
//         <button
//           aria-label="Details"
//           className="bg-transparent text-nowrap px-4 md:px-6 py-0.5 md:py-1 rounded-full border border-white text-white font-medium hover:bg-white hover:border-white hover:text-[#274A7B] transition-all duration-300 ease-in-out flex items-center gap-2 shadow-sm"
//           onClick={() => navigate(`/vip-number/${decryptedItem?.number}`)}
//         >
//           Details
//         </button>

//         <button
//           aria-label="Add to Cart"
//           className="bg-white text-nowrap px-4 md:px-6 py-0.5 md:py-1 rounded-full border border-white text-[#274A7B] font-medium hover:bg-[#274A7B] hover:border-white hover:text-white transition-all duration-300 ease-in-out flex items-center gap-2 shadow-md"
//           onClick={() => {
//             handleAddToCart(decryptedItem);
//             navigate("/checkout");
//           }}
//         >
//           Buy Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;





import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cart/cartSlice";
import UserAxiosAPI from "../api/userAxiosAPI";
import toast from "react-hot-toast";
import { IoHeartDislike } from "react-icons/io5";
import { addToFavs, removeFromFavs } from "../redux/favorites/favSlice";
import { fbqTrack } from "./utils/fbq";
import { safeDecrypt } from "../utils/decryptAES";

const ProductCard = ({ item, searchTerm = "" }) => {
  const navigate = useNavigate();
  const axios = UserAxiosAPI();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart?.items);
  const fav = useSelector((state) => state.fav?.items);

  const [decryptedItem, setDecryptedItem] = useState(null);
  const [isDecrypting, setIsDecrypting] = useState(true);

  // Decrypt item data
  useEffect(() => {
    const decryptData = async () => {
      if (!item) {
        setDecryptedItem(null);
        setIsDecrypting(false);
        return;
      }

      setIsDecrypting(true);
      try {
        const [
          displayedDiscount,
          originalPrice,
          price,
          stock,
          sum,
          sum2,
          total,
        ] = await Promise.all([
          safeDecrypt(item.displayedDiscount),
          safeDecrypt(item.originalPrice),
          safeDecrypt(item.price),
          safeDecrypt(item.stock),
          safeDecrypt(item.sum),
          safeDecrypt(item.sum2),
          safeDecrypt(item.total),
        ]);

        setDecryptedItem({
          ...item,
          displayedDiscount: parseFloat(displayedDiscount) || 0,
          originalPrice: parseFloat(originalPrice) || 0,
          price: parseFloat(price) || 0,
          stock: parseInt(stock) || 0,
          sum: parseInt(sum) || 0,
          sum2: parseInt(sum2) || 0,
          total: parseInt(total) || 0,
        });
      } catch (error) {
        console.error("Decryption error:", error);
        setDecryptedItem(item);
      } finally {
        setIsDecrypting(false);
      }
    };

    decryptData();
  }, [item]);

  const handleAddToCart = async (item) => {
    if (window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-16838705843/l-w1CJnEtpcaELOFqd0-",
        value: item?.price,
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

  const highlighterSearch = (num, searchTerm) => {
    if (!searchTerm || !num.includes(searchTerm)) return num;
    const highlightedSearchTerm = `<span class="text-orange-500 mx-1.5 font-bold">${searchTerm}</span>`;
    const result = num.replace(
      new RegExp(searchTerm, "g"),
      highlightedSearchTerm
    );
    return result;
  };

  if (isDecrypting || !decryptedItem) {
    return (
      <div className="relative bg-gray-200 animate-pulse px-2 md:px-6 p-1.5 sm:p-2 md:p-2.5 shadow-lg rounded-2xl flex flex-col items-center space-y-2 md:space-y-3 min-h-[200px]">
        <div className="w-full h-8 bg-gray-300 rounded"></div>
        <div className="w-3/4 h-6 bg-gray-300 rounded"></div>
        <div className="w-1/2 h-6 bg-gray-300 rounded"></div>
      </div>
    );
  }

  const isFav = fav?.find((number) => number._id === decryptedItem._id);

  return (
    <div className="relative bg-[#274A7B] px-2 md:px-6 p-1.5 sm:p-2 md:p-2.5 shadow-lg rounded-2xl flex flex-col items-center space-y-2 md:space-y-3 border-2 border-transparent transition-all duration-500 ease-in-out hover:shadow-xl hover:border-white hover:text-white min-h-[80px]">
      <div className="cursor-pointer flex flex-col items-center space-y-1 md:space-y-2 w-full">
        {/* Discount Badge */}
        <div className="absolute top-0.5 left-1 text-white font-medium px-1 py-0.5 md:py-1 rounded-tl-2xl min-h-[20px]">
          {decryptedItem?.displayedDiscount > 0 ? (
            <>-{decryptedItem?.displayedDiscount.toFixed(1)}%</>
          ) : (
            <>&nbsp;</>
          )}
        </div>

        {/* Number Display */}
        <Link
          to={`/vip-number/${decryptedItem.number}`}
          className="text-sm sm:text-lg pr-1 hover:text-white pt-6 md:pt-3 md:text-2xl text-nowrap font-semibold text-white tracking-wide min-h-[40px] flex justify-center items-center"
        >
          {searchTerm && decryptedItem?.number?.includes(searchTerm) ? (
            <div
              className="text-[1.5rem]"
              dangerouslySetInnerHTML={{
                __html: highlighterSearch(decryptedItem.number, searchTerm),
              }}
            />
          ) : (
            <div
              className="text-[1.5rem]"
              dangerouslySetInnerHTML={{
                __html: decryptedItem.highLightedNumber || decryptedItem.number,
              }}
            />
          )}
        </Link>

        {/* Sum Total */}
        <Link
          to={`/vip-number/${decryptedItem.number}`}
          className="text-xs md:text-sm hover:text-white text-gray-300 font-medium min-h-[20px]"
        >
          Sum Total =
          <span className="font-semibold">
            {" "}
            {decryptedItem?.total} - {decryptedItem?.sum2} -{" "}
            {decryptedItem?.sum}
          </span>
        </Link>

        {/* Favorite Icon */}
        <span
          aria-label="Favorite"
          onClick={() =>
            isFav ? removeFavItem(decryptedItem) : handleAddToFav(decryptedItem)
          }
          className="absolute top-0.5 sm:top-1 right-2 bg-transparent focus:outline-none cursor-pointer"
        >
          {isFav ? (
            <FaHeart className="text-[1.5rem] hover:ring-none text-white hover:border-0 hover:border-none hover:border-transparent hover:ring-0 drop-shadow-md" />
          ) : (
            <FaRegHeart className="text-[1.5rem] hover:ring-none text-white hover:border-0 hover:border-none hover:border-transparent hover:ring-0 drop-shadow-md" />
          )}
        </span>

        {/* Price Display */}
        <Link
          to={`/vip-number/${decryptedItem.number}`}
          className="flex gap-1 md:gap-2 min-h-[24px]"
        >
          <p className="relative text-nowrap text-xs md:text-sm font-semibold hover:text-white text-white px-2 py-0.5 md:py-1 rounded-full shadow-sm">
            ₹ {decryptedItem.price.toLocaleString("en-IN")}
          </p>
          {decryptedItem?.displayedDiscount > 0 && (
            <p className="relative text-nowrap text-xs md:text-sm font-semibold text-white px-2 py-0.5 md:py-1 rounded-full">
              ₹{" "}
              <span className="line-through">
                {decryptedItem.originalPrice.toLocaleString("en-IN")}
              </span>
            </p>
          )}
        </Link>
      </div>

      {/* Action Buttons */}
      <div className="relative flex justify-between w-full text-[0.7rem] sm:text-xs gap-1 md:text-sm mt-4 min-h-[40px]">
        <button
          aria-label="Details"
          className="bg-transparent text-nowrap px-4 md:px-6 py-0.5 md:py-1 rounded-full border border-white text-white font-medium hover:bg-white hover:border-white hover:text-[#274A7B] transition-all duration-300 ease-in-out flex items-center gap-2 shadow-sm"
          onClick={() => navigate(`/vip-number/${decryptedItem?.number}`)}
        >
          Details
        </button>

        <button
          aria-label="Add to Cart"
          className="bg-white text-nowrap px-4 md:px-6 py-0.5 md:py-1 rounded-full border border-white text-[#274A7B] font-medium hover:bg-[#274A7B] hover:border-white hover:text-white transition-all duration-300 ease-in-out flex items-center gap-2 shadow-md"
          onClick={() => {
            handleAddToCart(decryptedItem);
            navigate("/checkout");
          }}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;