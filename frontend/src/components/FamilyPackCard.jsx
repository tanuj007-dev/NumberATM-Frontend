// import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { Appstate } from "../App";

// const FamilyPackCard = ({
//   packData,
//   onSelectionChange,
//   selectedItems,
//   onBuyNow,
// }) => {
//   const { margins } = useContext(Appstate);
//   const navigate = useNavigate();

//   const toggleItem = (itemId) => {
//     const newSelected = selectedItems.includes(itemId)
//       ? selectedItems.filter((id) => id !== itemId)
//       : [...selectedItems, itemId];
//     onSelectionChange(newSelected);
//   };

//   const toggleAll = () => {
//     // Get the first number's ID
//     const firstNumberId = packData.numbers[0]?._id;

//     if (selectedItems.length === packData.numbers.length) {
//       // When unchecking "All", keep only the first number selected
//       onSelectionChange([firstNumberId]);
//     } else {
//       // When checking "All", select all numbers
//       onSelectionChange(packData.numbers.map((item) => item._id));
//     }
//   };

//   // Calculate price with margins and discounts for each number
//   const calculatePrice = (num) => {
//     const originalPrice = num.price;
//     const ownerDiscount = num?.owner?.discount || 0;

//     // Apply owner discount
//     const discountedPrice =
//       originalPrice - originalPrice * ownerDiscount * 0.01;

//     // Determine applicable margin
//     const marginData = margins?.find(
//       (margin) =>
//         originalPrice >= margin.minPrice && originalPrice <= margin.maxPrice
//     );
//     const marginPercent = marginData ? marginData.marginPercent : 0;

//     // Calculate final price
//     const marginAmount = (originalPrice * marginPercent) / 100;
//     const finalPrice = discountedPrice + marginAmount;

//     // Round to nearest ten
//     const roundedFinalPrice = Math.round(finalPrice / 10) * 10;

//     return roundedFinalPrice;
//   };

//   // Calculate total price based on selected items
//   const totalPrice = packData.numbers
//     .filter((item) => selectedItems.includes(item._id))
//     .reduce((sum, item) => sum + calculatePrice(item), 0);

//   const allSelected = selectedItems.length === packData.numbers.length;

//   const handleBuyNow = () => {
//     const selectedNumbers = packData.numbers.filter((num) =>
//       selectedItems.includes(num._id)
//     );
//     onBuyNow(selectedNumbers);
//   };

//   return (
//     <div className="w-full bg-white rounded-3xl shadow-lg overflow-hidden">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-[#274A7B] to-[#274A7B] px-5 py-4 flex items-center justify-between">
//         <label className="flex items-center gap-2 text-white font-semibold text-lg cursor-pointer">
//           <input
//             type="checkbox"
//             checked={allSelected}
//             onChange={toggleAll}
//             className="w-6 h-6 rounded-full cursor-pointer accent-orange-500"
//           />
//           <span>All</span>
//         </label>
//       </div>

//       {/* Items List */}
//       <div className="bg-white">
//         {packData.numbers.map((item, index) => {
//           const itemPrice = calculatePrice(item);
//           return (
//             <div key={item._id}>
//               <label className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer">
//                 <div className="flex items-center gap-3">
//                   <input
//                     type="checkbox"
//                     checked={selectedItems.includes(item._id)}
//                     onChange={() => toggleItem(item._id)}
//                     className="w-5 h-5 rounded cursor-pointer accent-orange-500"
//                   />
//                   <span className="font-bold text-lg text-gray-900">
//                     {item.view}
//                   </span>
//                 </div>
//                 <span className="font-semibold text-gray-700">
//                   ₹{itemPrice.toLocaleString("en-IN")}
//                 </span>
//               </label>
//               {index < packData.numbers.length - 1 && (
//                 <div className="mx-5 border-b border-gray-200"></div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* Footer */}
//       <div className="bg-white px-5 py-5 flex items-center justify-between">
//         <div>
//           <div className="text-[#274A7B] font-bold text-2xl">
//             ₹{totalPrice.toLocaleString("en-IN")}
//           </div>
//           <div className="text-gray-600 text-sm mt-1">
//             Selected {selectedItems.length}/{packData.numbers.length}
//           </div>
//         </div>
//         <button
//           onClick={handleBuyNow}
//           className="border-2 border-[#274A7B] bg-white text-[#274A7B] hover:bg-[#274A7B] hover:text-white font-semibold px-4 py-2 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           disabled={selectedItems.length === 0}
//         >
//           Buy Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FamilyPackCard;

// import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { Appstate } from "../App";
// import { safeDecrypt } from '../utils/encryption';

// const FamilyPackCard = ({
//   packData,
//   onSelectionChange,
//   selectedItems,
//   onBuyNow,
// }) => {
//   const { margins } = useContext(Appstate);
//   const navigate = useNavigate();

//   const toggleItem = (itemId) => {
//     const newSelected = selectedItems.includes(itemId)
//       ? selectedItems.filter((id) => id !== itemId)
//       : [...selectedItems, itemId];
//     onSelectionChange(newSelected);
//   };

//   const toggleAll = () => {
//     // Get the first number's ID
//     const firstNumberId = packData.numbers[0]?._id;

//     if (selectedItems.length === packData.numbers.length) {
//       // When unchecking "All", keep only the first number selected
//       onSelectionChange([firstNumberId]);
//     } else {
//       // When checking "All", select all numbers
//       onSelectionChange(packData.numbers.map((item) => item._id));
//     }
//   };

//   // Calculate price with margins and discounts for each number
//   const calculatePrice = (num) => {
//     const originalPrice = num.price;
//     const ownerDiscount = num?.owner?.discount || 0;

//     // Apply owner discount
//     const discountedPrice =
//       originalPrice - originalPrice * ownerDiscount * 0.01;

//     // Determine applicable margin
//     const marginData = margins?.find(
//       (margin) =>
//         originalPrice >= margin.minPrice && originalPrice <= margin.maxPrice
//     );
//     const marginPercent = marginData ? marginData.marginPercent : 0;

//     // Calculate final price
//     const marginAmount = (originalPrice * marginPercent) / 100;
//     const finalPrice = discountedPrice + marginAmount;

//     // Round to nearest ten
//     const roundedFinalPrice = Math.round(finalPrice / 10) * 10;

//     return roundedFinalPrice;
//   };

//   // Calculate total price based on selected items
//   const totalPrice = packData.numbers
//     .filter((item) => selectedItems.includes(item._id))
//     .reduce((sum, item) => sum + calculatePrice(item), 0);

//   const allSelected = selectedItems.length === packData.numbers.length;

//   const handleBuyNow = () => {
//     const selectedNumbers = packData.numbers.filter((num) =>
//       selectedItems.includes(num._id)
//     );
//     onBuyNow(selectedNumbers);
//   };

//   return (
//     <div className="w-full bg-white rounded-3xl shadow-lg overflow-hidden">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-[#274A7B] to-[#274A7B] px-3 sm:px-5 py-3 sm:py-4 flex items-center justify-between">
//         <label className="flex items-center gap-2 text-white font-semibold text-base sm:text-lg cursor-pointer">
//           <input
//             type="checkbox"
//             checked={allSelected}
//             onChange={toggleAll}
//             className="w-5 h-5 sm:w-6 sm:h-6 rounded-full cursor-pointer accent-orange-500"
//           />
//           <span>All</span>
//         </label>
//       </div>

//       {/* Items List */}
//       <div className="bg-white">
//         {packData.numbers.map((item, index) => {
//           const itemPrice = calculatePrice(item);
//           return (
//             <div key={item._id}>
//               <label className="w-full px-3 sm:px-5 py-2 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 hover:bg-gray-50 transition-colors cursor-pointer">
//                 <div className="flex items-center gap-2 sm:gap-3">
//                   <input
//                     type="checkbox"
//                     checked={selectedItems.includes(item._id)}
//                     onChange={() => toggleItem(item._id)}
//                     className="w-4 h-4 sm:w-5 sm:h-5 rounded cursor-pointer accent-orange-500 flex-shrink-0"
//                   />
//                   <span className="font-bold text-base sm:text-lg text-gray-900">
//                     {item.view}
//                   </span>
//                 </div>
//                 <span className="font-semibold text-gray-700 text-sm sm:text-base ml-6 sm:ml-0">
//                   ₹{itemPrice.toLocaleString("en-IN")}
//                 </span>
//               </label>
//               {index < packData.numbers.length - 1 && (
//                 <div className="mx-3 sm:mx-5 border-b border-gray-200"></div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* Footer */}
//       <div className="bg-white px-3 sm:px-5 pb-4 pt-2 sm:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//         <div>
//           <div className="text-[#274A7B] font-bold text-xl sm:text-2xl">
//             ₹{totalPrice.toLocaleString("en-IN")}
//           </div>
//           <div className="text-gray-600 text-xs sm:text-sm mt-1">
//             Selected {selectedItems.length}/{packData.numbers.length}
//           </div>
//         </div>
//         <button
//           onClick={handleBuyNow}
//           className="border-2 border-[#274A7B] bg-white text-[#274A7B] hover:bg-[#274A7B] hover:text-white font-semibold px-2 py-1 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
//           disabled={selectedItems.length === 0}
//         >
//           Buy Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FamilyPackCard;

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Appstate } from "../App";

const FamilyPackCard = ({
  packData,
  onSelectionChange,
  selectedItems,
  onBuyNow,
}) => {
  const { margins } = useContext(Appstate);
  const navigate = useNavigate();

//   console.log("packData ::", packData);

  const toggleItem = (itemId) => {
    const newSelected = selectedItems.includes(itemId)
      ? selectedItems.filter((id) => id !== itemId)
      : [...selectedItems, itemId];
    onSelectionChange(newSelected);
  };

  const toggleAll = () => {
    const firstNumberId = packData.numbers[0]?._id;

    if (selectedItems.length === packData.numbers.length) {
      onSelectionChange([firstNumberId]);
    } else {
      onSelectionChange(packData.numbers.map((item) => item._id));
    }
  };

  // Calculate price with margins and discounts for each number
  // Data is already decrypted from parent component
  const calculatePrice = (num) => {
    const originalPrice = num.price; // Already decrypted
    const ownerDiscount = num?.owner?.discount || 0; // Already decrypted

    // Apply owner discount
    const discountedPrice =
      originalPrice - originalPrice * ownerDiscount * 0.01;

    // Determine applicable margin
    const marginData = margins?.find(
      (margin) =>
        originalPrice >= margin.minPrice && originalPrice <= margin.maxPrice
    );
    const marginPercent = marginData ? marginData.marginPercent : 0;

    // Calculate final price
    const marginAmount = (originalPrice * marginPercent) / 100;
    const finalPrice = discountedPrice + marginAmount;

    // Round to nearest ten
    const roundedFinalPrice = Math.round(finalPrice / 10) * 10;

    return roundedFinalPrice;
  };

  // Calculate total price based on selected items
  const totalPrice = packData.numbers
    .filter((item) => selectedItems.includes(item._id))
    .reduce((sum, item) => sum + calculatePrice(item), 0);

  const allSelected = selectedItems.length === packData.numbers.length;

  const handleBuyNow = () => {
    const selectedNumbers = packData.numbers.filter((num) =>
      selectedItems.includes(num._id)
    );
    onBuyNow(selectedNumbers);
  };

  return (
    <div className="w-full bg-white rounded-md sm:rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-[#274A7B] px-3 sm:px-5 py-3 sm:py-4 flex items-center justify-between">
        <label className="flex items-center gap-2 text-white font-semibold text-base sm:text-lg cursor-pointer">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={toggleAll}
            className="w-5 h-5 sm:w-6 sm:h-6 rounded-full cursor-pointer accent-orange-500"
          />
          <span>All</span>
        </label>
      </div>

      {/* Items List */}
      <div className="bg-white">
        {packData.numbers.map((item, index) => {
          const itemPrice = calculatePrice(item);
          return (
            <div key={item._id}>
              <label className="w-full px-2 sm:px-5 py-2 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap- sm:gap0-2 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex justify-between sm:justify-start flex-row-reverse sm:flex-row items-center gap-2 sm:gap-3">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item._id)}
                    onChange={() => toggleItem(item._id)}
                    className="w-4 h-4 sm:w-5 sm:h-5 rounded cursor-pointer accent-orange-500 flex-shrink-0"
                  />
                  <span className="font-bold text-base sm:text-lg text-gray-900">
                    {item.view}
                  </span>
                </div>
                <span className="font-semibold text-gray-700 text-sm sm:text-base">
                  ₹{itemPrice.toLocaleString("en-IN")}
                </span>
              </label>
              {index < packData.numbers.length - 1 && (
                <div className="mx-0 sm:mx-5 border-b border-gray-200"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="bg-white px-3 sm:px-5 pb-4 pt-0 sm:pt-2 flex items-center justify-between gap-3">
        <div>
          <div className="text-[#274A7B] font-bold text-md md:text-xl xl:text-2xl">
            ₹{totalPrice.toLocaleString("en-IN")}
          </div>
          <div className="text-gray-600 text-xs sm:text-sm mt-0 sm:mt-1">
            Selected {selectedItems.length}/{packData.numbers.length}
          </div>
        </div>
        <button
          onClick={handleBuyNow}
          className="w-fit sm:w-auto text-[10px] sm:text-base border-2 border-[#274A7B] bg-white text-[#274A7B] hover:bg-[#274A7B] hover:text-white font-semibold px-2 py-1 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
          disabled={selectedItems.length === 0}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default FamilyPackCard;
