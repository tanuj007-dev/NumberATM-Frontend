import { useState } from "react";
import UserAxiosAPI from "../../api/userAxiosAPI";
import { useSelector } from "react-redux";
import Confetti from "react-confetti";
import { MdOutlineLocalOffer } from "react-icons/md";
import { LuBadgePercent } from "react-icons/lu";
import { useAlert } from "../../context/AlertContext";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
const ApplyPromoCode = ({ cartValue, setDiscount, promoCode, isApplied, setIsApplied, setPromoCode }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const user = useSelector((state) => state.user.user);
  const axios = UserAxiosAPI(); // path as per your project
  const { showAlert } = useAlert();
  const applyPromo = async () => {
    if (!promoCode) {
      await showAlert({
        title: "Invalid Entry!",
        message: "Please enter a promo code ❌",
        type: "error",
      });
      return;
    }

    try {
      const validateResponse = await axios.post("/promo/validate", {
        code: promoCode,
        userId: user._id,
        cartValue,
      });

      if (validateResponse.status !== 200) {
        await showAlert({
          title: "Invalid Code!",
          message: "Try another one 🚫",
          type: "error",
        });
        return;
      }

      const { data } = await axios.post("/promo/apply", {
        code: promoCode,
        userId: user._id,
        cartValue,
      });

      setDiscount(data.discount);
      setIsApplied(true);
      setShowConfetti(true);

      await showAlert({
        title: "Boom! 🎉",
        message: `₹${data.discount} Discount Applied!`,
        type: "success",
      });

      setTimeout(() => setShowConfetti(false), 3000);
    } catch (error) {
      await showAlert({
        title: "Something Went Wrong!",
        message: error.response?.data?.message || "Please try again later.",
        type: "error",
      });
    }
  };

  return (
    <div className="relative bg-transparent bg-opacity-55 border border-gray-800 p-6 rounded-xl shadow-xl text-[#f1f1f1]">
      {showConfetti && <Confetti />}
      <h3 className="text-xl font-bold flex items-center gap-2 mb-3 text-gray-700">
        <MdOutlineLocalOffer className="text-yellow-400" size={24} />
        Got a Promo Code?
      </h3>
      <div className="flex flex-wrap justify-center gap-3">
        <div className="relative  w-full md:w-2/3">
          <input
            type="text"
            placeholder="Enter Code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className={`p-3 pl-10 w-full text-black  border ${isApplied ? 'bg-gray-200' : 'bg-white'} border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500`}
            disabled={isApplied}
          />
          <LuBadgePercent className="absolute left-3 top-4  text-green-600" size={20} />
        </div>
        <button
          onClick={applyPromo}
          className={`p-3 px-5 w-full md:w-1/4 rounded-lg font-light flex items-center justify-center gap-2 transition-all ${isApplied ? "bg-green-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500"
            }`}
          disabled={isApplied}
        >
          {isApplied && <IoMdCheckmarkCircleOutline className=" left-3 top-4  text-white" size={20} />}
          {isApplied ? "Applied" : "Apply"}
        </button>
      </div>
    </div>
  );
};

export default ApplyPromoCode;
