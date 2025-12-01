import { useNavigate } from "react-router-dom";

const VipNumberModal = ({ selectedNumber, setSelectedNumber, margins }) => {
  if (!selectedNumber) return null;
  const navigate = useNavigate();
  // const originalPrice = selectedNumber?.price;
  // const ownerDiscount = selectedNumber?.owner?.discount || 0;
  // const discountedPrice = originalPrice - (originalPrice * ownerDiscount * 0.01);
  // const marginData = margins?.find(
  //   (margin) => originalPrice >= margin.minPrice && originalPrice <= margin.maxPrice
  // );
  // const marginPercent = marginData ? marginData.marginPercent : 0;
  // const marginAmount = (originalPrice * marginPercent) / 100;
  // const finalPrice = discountedPrice + marginAmount;
  const roundedFinalPrice = selectedNumber?.price;
  const roundedOriginalPrice = selectedNumber?.originalPrice;
  const displayedDiscount = selectedNumber?.displayedDiscount;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[200] flex justify-end">
      {/* Right-side Sliding Panel */}
      <div className="w-[420px] h-full bg-[#121212] bg-opacity-90 backdrop-blur-xl p-6 pt-24 shadow-2xl text-white transform translate-x-0 transition-all duration-300">

        {/* ❌ Close Button */}
        <button
          className="absolute top-5 right-5 bg-transparent text-2xl focus:ring-0"
          onClick={() => setSelectedNumber(null)}
        >
          ✖
        </button>


        {/* 🎟 VIP Number Card Inside Modal */}
        <div className="p-6 pt-12 rounded-xl relative shadow-lg bg-gradient-to-br from-yellow-400 to-orange-400 text-white text-center border border-yellow-300">
          {/* <h2 className="text-4xl font-extrabold mt-2 tracking-widest drop-shadow-lg">
            {selectedNumber.number}
          </h2> */}
          <p className="text-3xl mb-2 text-nowrap font-bold tracking-widest text-black">
            {selectedNumber.view ? selectedNumber.view : selectedNumber.number}
          </p>
          <p className="relative text-sm text-grey-500 font-medium z-10">
            Sum Total ={" "}
            <span className="font-semibold">
              {selectedNumber?.total} - {selectedNumber?.sum2} - {selectedNumber?.sum}
            </span>
          </p>


          {displayedDiscount > 0 && <div
            className="absolute bg-teal-500 text-white rounded-tl-xl top-0 left-0 p-1.5 text-sm focus:ring-0"
          // onClick={() => setSelectedNumber(null)}
          >
            -{displayedDiscount.toFixed(1)}%
          </div>}
          <div className="flex gap-2 flex-row md:flex-col items-center justify-center lg:flex-row mt-2 mr-6 lg:mr-2">
            <p className="text-lg md:text-xl font-semibold text-black text-center">
              ₹{roundedFinalPrice.toLocaleString("en-IN")}
            </p>
            {displayedDiscount > 0 && (
              <p className="text-lg md:text-xl text-gray-400 line-through mr-2">
                ₹{roundedOriginalPrice}
              </p>
            )}
          </div>

          {selectedNumber?.category && (
            <div className="absolute top-1 right-2 flex flex-wrap gap-1">
              {(Array.isArray(selectedNumber.category)
                ? selectedNumber.category.slice(0, 2)
                : [selectedNumber.category] // agar single string hai toh array bana do
              ).map((cat, idx) => (
                <span
                  key={idx}
                  className="bg-yellow-500 text-black text-xs px-3 py-1 rounded-full shadow-md"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}

        </div>

        {/* 🛒 Checkout Button */}
        <button
          onClick={() => navigate('/checkout')}
          className="w-full mt-6 bg-yellow-500 text-black text-lg font-semibold py-3 shadow-lg rounded-lg hover:bg-yellow-600 transition-all"
        >
          Checkout Now 🚀
        </button>
      </div>
    </div>
  );
};

export default VipNumberModal;
