import { useContext, useEffect, useState } from "react";
import UserAxiosAPI from "../../api/userAxiosAPI";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { removeFromFavs } from "../../redux/favorites/favSlice";
import ConfirmationModal from "../Confirmation";
import Loading from "../Checkout/Loading";
import { IoHeartDislike } from "react-icons/io5";
import { Appstate } from "../../App";
import { BsCart4 } from "react-icons/bs";
const FavoriteVIPNumbers = ({}) => {
  const [vipNumbers, setVipNumbers] = useState([]);
  const { getOptimizedImage, margins, setMargins } = useContext(Appstate);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const cart = useSelector((state) => state.cart.items);
  const fav = useSelector((state) => state.fav.items);
  const user = useSelector((state) => state.user.user);
  // const [] = useState();
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
  const getNumbers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("fav/detailed");
      console.log(data);
      const transformedItems = data?.items?.map((item) => ({
        ...item.vipNumberId, // Spread the vipNumberId properties
        _id: item.vipNumberId?._id, // Keep the item's original _id
      }));
      setVipNumbers(transformedItems ? transformedItems : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  const removeFavItem = async (item) => {
    setLoading(true);
    try {
      if (user) {
        await axios.post("/fav/remove", { vipNumberId: item?._id });
      }
      dispatch(removeFromFavs(item?._id));
      toast(`Removed ${item.number} from Favourites`, {
        icon: <IoHeartDislike className="text-lg" />,
      });
      getNumbers();
      setSelectedItem(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove item. Please try again!");
    } finally {
      setLoading(false);
    }
  };
  const [meta, setMeta] = useState({
    title: "",
    tags: "",
    description: "",
    breadcum: "",
  });
  useEffect(() => {
    axios.get(`/meta/Contact Us`).then(({ data }) => {
      setMeta(data || { title: "", tags: "", description: "", breadcum: "" });
    });
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getNumbers();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-3 md:p-6">
      {meta?.breadcum&&<img className='my-3 md:mb-8 w-full' src={getOptimizedImage(meta?.breadcum)} />}
      <div className="mx-auto">
        <h1 className="text-lg md:text-3xl flex justify-center font-semibold my-4 md:my-8">
          <span className="text-[#17565D]">My Favorite</span>&nbsp;
          <span className="text-[#F5C037]">VIP Numbers</span>
        </h1>

        {loading && <Loading />}
        <div
          className={`${
            vipNumbers?.length === 0
              ? "flex justify-center items-center"
              : "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
          }`}
        >
          {vipNumbers?.length < 1 ? (
            <p className="flex justify-center w-full col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-4">
              No Numbers to Show...
            </p>
          ) : (
            vipNumbers?.map((item) => {
              const originalPrice = item?.price;
              const ownerDiscount = item?.owner?.discount || 0;
              const discountedPrice =
                originalPrice - originalPrice * ownerDiscount * 0.01;
              const marginData = margins?.find(
                (margin) =>
                  originalPrice >= margin.minPrice &&
                  originalPrice <= margin.maxPrice
              );
              const marginPercent = marginData ? marginData.marginPercent : 0;
              const marginAmount = (originalPrice * marginPercent) / 100;
              const finalPrice = discountedPrice + marginAmount;
              const roundedFinalPrice = Math.round(finalPrice / 10) * 10;
              const roundedOriginalPrice =
                Math.round((originalPrice + marginAmount) / 10) * 10;
              const displayedDiscount =
                ((roundedOriginalPrice - roundedFinalPrice) /
                  roundedOriginalPrice) *
                100;
              return (
                <div className="bg-[#FCFAE5] border-2 border-[#17565D] rounded-xl md:rounded-2xl p-1.5 md:p-2 min-h-[80px] w-full relative max-w-[300px] mx-auto">
                  <div
                    key={item._id}
                    className="rounded-xl md:rounded-2xl border-2   border-[#FFCF51] bg-[#FCFAE5] p-1.5 md:p-2"
                  >
                    {/* Top Row: Timer + Heart + Sum Total */}
                    <div className="flex justify-between items-center text-xs mb-2 md:mb-3">
                      <div className="rounded-full bg-[#1d4a46] border-2 border-[#CE9E3E] px-1.5 md:px-2 py-0.5 text-white text-[8px] md:text-[10px]">
                        01:36:31 Left
                      </div>

                      <div className="flex items-center gap-1 md:gap-2">
                        <span className="text-base md:text-xl text-gray-500">
                          <BsCart4 />
                        </span>
                        <span className="text-[10px] md:text-sm font-semibold text-gray-700">
                          | Sum Total {item.sum || ""}
                        </span>
                      </div>
                    </div>

                    {/* Number Box */}
                    <div
                      onClick={() => navigate(`/vip-number/${item.number}`)}
                      className="w-full bg-gradient-to-b from-[#073B3A] to-[#0A292C] text-yellow-300 rounded-lg md:rounded-xl text-center p-1.5 md:p-2 cursor-pointer"
                      style={{
                        background:
                          "linear-gradient(90deg, rgb(19,52,55),rgb(44,106,108), rgb(19,52,55))",
                      }}
                    >
                      <p
                        className="text-xl md:text-3xl font-bold tracking-wider"
                        style={{
                          textShadow:
                            "2px 2px 4px #000000, 0 0 6px rgba(0,0,0,0.4)",
                        }}
                      >
                        {String(item.number)
                          .match(/.{1,3}/g)
                          ?.join(" ")}
                      </p>

                      <p className="text-[8px] md:text-[10px] text-yellow-200 mt-0.5 md:mt-1">
                        {(item.category || "Random Numbers").length > 2
                          ? (item.category || "Random Numbers").slice(0, 3) +
                            "..."
                          : item.category || "Random Numbers"}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="mt-1.5 md:mt-2 text-center">
                      <p className="text-base md:text-xl font-semibold text-[#17565D]">
                        ₹{roundedFinalPrice.toLocaleString("en-IN")}
                      </p>

                      {displayedDiscount > 0 && (
                        <p className="text-xs md:text-sm text-gray-500 line-through">
                          ₹{roundedOriginalPrice.toLocaleString("en-IN")}
                        </p>
                      )}
                    </div>

                    {/* Book Now Button */}
                    {/* Buttons Row */}
                    <div className="flex items-center justify-center gap-1.5 md:gap-3 mt-1.5 md:mt-2 w-full">
                      {/* Remove Favorite Button */}
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="flex-1 md:w-32 bg-[#17565D] text-[#FFCF51] font-semibold py-1.5 md:py-2 rounded-full text-xs md:text-sm hover:bg-gray-300 transition"
                      >
                        Remove
                      </button>
                      {/* Book Now Button */}
                      <button
                        onClick={() => navigate(`/vip-number/${item.number}`)}
                        className="text-xs md:text-sm flex-1 md:w-32 font-semibold px-3 md:px-5 py-1.5 md:py-2 rounded-full text-[#17535D] border-2 border-[#F5C037]"
                        style={{
                          background:
                            "linear-gradient(180deg, #eba800, #f0cd75, #eba800)",
                        }}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {selectedItem && (
          <ConfirmationModal
            message={"This will be removed from favorites, Continue?"}
            onCancel={() => {
              setSelectedItem(null);
            }}
            onConfirm={() => {
              removeFavItem(selectedItem);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default FavoriteVIPNumbers;
