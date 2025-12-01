 import { useState, useEffect, useContext } from "react";
import UserAxiosAPI from "../../api/userAxiosAPI";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, removeFromCart } from "../../redux/cart/cartSlice";
import { BsCartDash } from "react-icons/bs";
import { fbqTrack } from "../utils/fbq";
import { Appstate } from "../../App";
import DynamicCard from "../../components/DynamicCard";
 

export default function VipNumbersByCity() {
  const [visibleCount, setVisibleCount] = useState(20);
  const [data, setData] = useState();
  const cart = useSelector((state) => state.cart.items);
  const fav = useSelector((state) => state.fav.items);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [numbers, setNumbers] = useState([]);
  const { slug } = useParams();
  const axios = UserAxiosAPI();
  const { margins } = useContext(Appstate);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const calculateSums = (number) => {
    if (!number) return;
    const sanitizedNumber = number.replace(/\s+/g, "");
    const sum1 = sanitizedNumber.split("").reduce((a, b) => a + +b, 0);
    const sum2 = sum1.toString().split("").reduce((a, b) => a + +b, 0);
    const sum3 = sum2.toString().split("").reduce((a, b) => a + +b, 0);
    return { sum1, sum2, sum3 };
  };

  const removeCartItem = async (item) => {
    try {
      if (user) {
        await axios.post("/cart/remove", { vipNumberId: item?._id });
      }
      dispatch(removeFromCart(item?._id));
      toast(`Removed ${item.number} from Cart`, {
        icon: <BsCartDash className="text-lg" />,
      });
    } catch (error) {
      toast.error("Failed to remove item. Please try again!");
    }
  };

  const handleAddToCart = async (item, price) => {
    try {
      dispatch(addToCart(item));
      const exists = cart.find((c) => c._id === item._id);
      fbqTrack("AddToCart");

      if (user && !exists) {
        await axios.post("/cart/add", { vipNumberId: item?._id });
      }
    } catch {
      toast.error("Failed to Add to Cart!");
    }
  };

const fetchCity = async () => {
  try {
    const res = await axios.get(`/city/${slug}`);

    if (!res.data || Object.keys(res.data).length === 0) {
      navigate("/not-found");
      return;
    }

    setData(res.data);

  } catch (e) {
    console.log("City fetch failed:", e);
    // ❌ REMOVE TOAST - causes popup on slow request
    // toast.error("Something went wrong, trying again...");
  }
};



  useEffect(() => {
    axios.get(`/vip-numbers/random`).then(({ data }) => setNumbers(data));
  }, []);

  useEffect(() => {
    fetchCity();
  }, [slug]);

  return (
    <>
      <div className="px-2 py-6 min-h-screen bg-white text-[#17565D] flex flex-col justify-center items-center">

        {data?.breadcum && <img className="my-3 w-full" src={data?.breadcum} />}

        <h1 className="text-2xl md:text-4xl font-extrabold mb-12 tracking-wide text-center">
          Exclusive VIP Numbers in {data?.name}
        </h1>

        {/* ✅ ✅ CARDS SECTION */}
      <div className="grid  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-center">

          {numbers.length > 0 ? (
            numbers.slice(0, visibleCount).map((item, index) => {
              const originalPrice = item?.price;
              const ownerDiscount = item?.owner?.discount || 0;

              const discountedPrice =
                originalPrice - originalPrice * ownerDiscount * 0.01;

              const marginData = margins?.find(
                (m) =>
                  originalPrice >= m.minPrice &&
                  originalPrice < m.maxPrice
              );

              const marginPercent = marginData ? marginData.marginPercent : 0;
              const marginAmount = (originalPrice * marginPercent) / 100;

              const finalPrice = discountedPrice + marginAmount;

              const roundedFinalPrice = Math.round(finalPrice / 10) * 10;
              const roundedOriginalPrice = Math.round(
                (originalPrice + marginAmount) / 10
              ) * 10;

              const displayedDiscount =
                ((roundedOriginalPrice - roundedFinalPrice) /
                  roundedOriginalPrice) *
                100;

              const isPresent = cart?.find((n) => n._id === item._id);
              const isFav = fav?.find((n) => n._id === item._id);

              return (
                <DynamicCard
                  key={index}
                  item={item}
                  isPresent={isPresent}
                  isFav={isFav}
                  roundedFinalPrice={roundedFinalPrice}
                  roundedOriginalPrice={roundedOriginalPrice}
                  displayedDiscount={displayedDiscount}
                  margins={margins}
                  calculateSums={calculateSums}
                  removeCartItem={removeCartItem}
                  handleAddToCart={handleAddToCart}
                />
              );
            })
          ) : (
            <div>No Numbers to Show</div>
          )}
        </div>

        {/* ✅ ✅ LOAD MORE BUTTON */}
        {visibleCount < numbers.length && (
          <div className="flex justify-center mt-6">
            <button
              className="bg-transparent text-[#17565D] text-lg py-0 sm:py-2 px-4 sm:px-8 border-2  border-[#17565D] rounded-full hover:bg-[#17565D] hover:text-white"
              onClick={() => setVisibleCount((prev) => prev + 20)}
            >
              Load More
            </button>
          </div>
        )}

        {/* ✅ ✅ CONTENT */}
        <div className="container   border rounded-lg max-w-8xl mx-auto bg-white shadow-lg p-6 md:px-20">
          <div
            className="ql-editor"
            dangerouslySetInnerHTML={{ __html: data?.content }}
          />
        </div>
      </div>
    </>
  );
}
