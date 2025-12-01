import { Link } from "react-router-dom";
import { CiHeart } from "react-icons/ci";

const SimilarNumbersCard = ({ item, navigate, handleAddToCart }) => {
  return (
    <div className="bg-[#fcfae5] rounded-2xl p-2 border-2 border-[#17565D] min-h-[80px] w-full relative max-w-[300px]">
      <div className="rounded-2xl flex flex-col items-center border-2 border-[rgb(255,207,81)] py-2">
        
        {/* Header */}
        <div className="w-full px-2">
          <div className="flex items-center justify-between text-xs">
            <div className="rounded-full bg-[#1d4a46] py-0 px-2 border-2 border-[#ce9e3e] text-white text-[10px]">
              <span>01:36:31 Left</span>
            </div>

            <Link to={`/vip-number/${item.number}`}>
              <CiHeart size={22} className="text-[#17565D]" />
            </Link>

            <div className="border-[#17565D] text-lg border-l-2 pl-2">
              <small>Sum Total {item.total}</small>
            </div>
          </div>
        </div>

        {/* Number Display */}
        <div
          className="rounded-2xl overflow-hidden my-3 w-full"
          style={{
            background:
              "linear-gradient(90deg, rgb(19,52,55), rgb(44,106,108), rgb(19,52,55))",
          }}
        >
          <div className="cursor-pointer flex flex-col items-center pt-4 pb-2 w-full">
            <Link
              to={`/vip-number/${item.number}`}
              className="text-2xl [transform:scaleY(1.3)] font-semibold text-[#F5C037]"
            >
              <div
                className="[text-shadow:0px_0px_12px_black]"
                dangerouslySetInnerHTML={{ __html: item.highLightedNumber }}
              />
            </Link>

            <p className="text-xs text-[#F5C037]">{item.category?.[0]}</p>
          </div>
        </div>

        {/* Price + Book Button */}
        <div className="flex justify-between items-center w-full text-xs sm:text-sm p-2">
          <div>
            <p className="text-xl font-semibold text-[#163B3E]">
              ₹ {Number(item.price).toLocaleString("en-IN")}
            </p>

            {item.originalPrice && (
              <p className="line-through text-gray-500 text-xs">
                ₹ {Number(item.originalPrice).toLocaleString("en-IN")}
              </p>
            )}
          </div>

          <button
            onClick={() => {
              handleAddToCart(item);
              navigate("/checkout");
            }}
            className="px-4 py-1 rounded-full border-2 border-[#F5C037] text-[#17535D] 
                       bg-gradient-to-b from-[#eba800] to-[#f0cd75]
                       hover:border-[#17535D] hover:text-[#17535D] transition-all"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimilarNumbersCard;
