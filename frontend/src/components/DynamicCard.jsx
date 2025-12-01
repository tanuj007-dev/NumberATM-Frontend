import { Link, useNavigate } from "react-router-dom";
import { CiHeart } from "react-icons/ci";

export default function   DynamicCard({
  item,
  isPresent,
  isFav,
  roundedFinalPrice,
  roundedOriginalPrice,
  displayedDiscount,
  margins,
  calculateSums,
  removeCartItem,
  handleAddToCart
}) {
  const navigate = useNavigate();

  return (
   <div className="bg-[#FCFAE5] border-2 border-[#17565D] rounded-2xl p-2 w-full">

      <div className="rounded-2xl border-2 border-[#FFCF51] bg-[#FCFAE5] p-2">

        {/* ✅ TOP ROW */}
        <div className="flex justify-between items-center text-xs mb-3">
          <div className="rounded-full bg-[#1d4a46] border-2 border-[#CE9E3E] px-2 py-0.5 text-white text-[10px]">
            01:36:31 Left
          </div>

          <CiHeart
            size={20}
            className={`cursor-pointer ${
              isFav ? "text-red-500" : "text-[#17565D]"
            }`}
          />

          <div className="hidden sm:flex border-l-2 border-[#17565D] pl-2 text-[10px]">
            <small className="text-sm block leading-none">Sum Total {item?.sum}</small>
          </div>
        </div>

        {/* ✅ NUMBER BOX */}
        <div
          className="rounded-xl py-4 px-3 text-center"
          style={{
            background:
              "linear-gradient(90deg, rgb(19,52,55),rgb(44,106,108), rgb(19,52,55))",
          }}
        >
          <Link
            to={`/vip-number/${item.number}`}
            className="text-3xl text-[#F5C037] font-extrabold tracking-wide block [transform:scaleY(1.2)]"
           dangerouslySetInnerHTML={{ __html: item?.highLightedNumber || item.number }}

          />

      <p
  className="text-xs text-[#F5C037] mt-1 opacity-90"
  style={{ textShadow: "2px 2px 4px #000000, 0 0 6px rgba(0,0,0,0.4)" }}
>
  {item?.category?.[0] || ""}
</p>



        </div>

        {/* ✅ PRICE + BUTTON */}
        <div className="flex justify-between items-center mt-4">

          {/* ✅ PRICE */}
          <div className="text-lg font-semibold text-[#163B3E]">
            ₹ {roundedFinalPrice.toLocaleString("en-IN")}
          </div>

          {/* ✅ BOOK NOW */}
          <button
            className="text-sm font-semibold px-5 py-1 rounded-full text-[#17535D] border-2 border-[#F5C037]"
            style={{
              background: "linear-gradient(180deg, #eba800, #f0cd75, #eba800)",
            }}
            onClick={() => {
              handleAddToCart(item, roundedFinalPrice);
              navigate("/checkout");
            }}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
