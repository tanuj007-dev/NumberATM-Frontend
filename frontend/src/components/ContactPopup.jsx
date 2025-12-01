import React, { useState } from "react";
import { AiOutlineCheck, AiOutlinePhone } from "react-icons/ai";
import { FaEnvelope } from "react-icons/fa";

const VipPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  return (
    <>
      {/* Button to open popup */}
     <button
        onClick={openPopup}
        className="flex-1 flex items-center justify-center gap-2 px-1 sm:px-2 md:px-6 py-2 sm:py-1 md:py-3 text-nowrap bg-white text-[#124B51] rounded-full shadow-md font-semibold transition-all w-full text-xs sm:text-md md:text-lg hover:bg-white hover:text-black h-[44px] sm:h-auto"
      >
        <FaEnvelope className="text-black" /> Enquiry Now
      </button>

      {/* Popup */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative transform scale-105 animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={closePopup}
              className="absolute p-2 px-4 top-5 right-2 text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              &times;
            </button>

            {/* Header */}
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
              <AiOutlinePhone className="rotate-90 text-green-500 text-3xl" />
              Ready to Go VIP?
            </h2>

            {/* Call Info */}
            <div className="space-y-3 mb-6 text-gray-700 text-center text-lg">
              <p className="font-medium">Call Now for Assistance:</p>
              <p className="flex items-center justify-center gap-2">
                <AiOutlinePhone className="rotate-90 text-green-500 text-xl" />
                Ashish: <span className="font-semibold text-gray-900">9511195111</span>
              </p>
              <p className="flex items-center justify-center gap-2">
                <AiOutlinePhone className="rotate-90 text-green-500 text-xl" />
                Jatin: <span className="font-semibold text-gray-900">9411194111</span>
              </p>
            </div>

            {/* Features */}
            <ul className="space-y-3 text-gray-600 text-lg">
              <li className="flex items-center gap-3">
                <AiOutlineCheck className="text-green-500 text-2xl" />
                Largest VIP Number Collection
              </li>
              <li className="flex items-center gap-3">
                <AiOutlineCheck className="text-green-500 text-2xl" />
                Instant Activation
              </li>
              <li className="flex items-center gap-3">
                <AiOutlineCheck className="text-green-500 text-2xl" />
                Best Prices Guaranteed
              </li>
            </ul>

            {/* Call to Action */}
            <div className="mt-8 flex justify-center">
              <a
                href="tel:9511195111"
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:text-white hover:to-green-700 text-white font-semibold py-3 px-8 rounded-xl transition-all flex items-center gap-3 text-lg shadow-lg hover:scale-105"
              >
                <AiOutlinePhone className="rotate-90 text-xl" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VipPopup;
