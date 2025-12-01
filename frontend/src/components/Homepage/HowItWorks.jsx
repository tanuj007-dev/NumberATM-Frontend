import { useState } from "react";
import { CiBarcode } from "react-icons/ci";
import { FaCartPlus, FaSimCard, FaStoreAlt } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import Marquee from "../marquee/Marquee";

const HowItWorks = () => {
  const [loadVideo, setLoadVideo] = useState(false);

  return (
    <>
      <div className="relative bg-[url(./components/assets/HIW.jpg)] pt-4 sm:pt-12 bg-[length:100%_100%] bg-center flex flex-col items-center justify-center bg-white overflow-hidden">
        {/* Background Image */}

        {/* Heading Section */}
        <div className="text-center mt-4 ">
          <h2 className="text-xl md:text-3xl font-semibold text-black mb-2 sm:mb-4">HOW IT WORKS</h2>
          <p className="text-sm md:text-lg text-black px-4 mb-4 sm:mb-0">
            Smooth & Simple Delivery of your VIP Mobile Number
          </p>
        </div>

      

        {/* Background grid for layout alignment */}
        <div className="bg-none md:bg-[url(./components/assets/HIW1.jpg)] bg-conatin bg-bottom bg-no-repeat grid grid-cols-1 md:grid-cols-2  gap-x-2 sm:gap-x-56  w-full pb-24  max-w-6xl relative pb-8 md:pb-12 px-2 sm:px-0">
          {/* Top Left */}
          <div className="flex items-center justify-start bg-white shadow-xl border-2 border-dashed rounded-2xl p-3 mb-4 sm:mb-12">
            <span className="w-auto font-semibold  text-[#17565D]">
              <FaCartPlus size={50} />
            </span>
            <div className="w-full px-4">
              <h3 className="font-semibold text-base mb-1 flex items-center gap-2">

                PLACE YOUR ORDER
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Order through numberatm.com or GPAY/PHONEPAY. Complete your
                payment to confirm your order.
              </p>
            </div>
          </div>

          {/* Top Right */}
          <div className="flex justify-end items-center bg-white shadow-xl border-2 border-dashed rounded-2xl p-3 mt-0 sm:mt-12">
            <span className="w-auto font-semibold  text-[#17565D]">
              <FaStoreAlt size={50} />
            </span>
            <div className="w-full px-4">
              <h3 className="font-semibold text-base mb-1 flex items-center gap-2">

                VISIT YOUR NEAREST STORE
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                AIRTEL/VODAFONE/BSNL/JIO... Take your UPC and valid ID (AADHAR
                CARD) to any nearby mobile retailer to port your number or get....
              </p>
            </div>
          </div>

          {/* Bottom Left */}
          <div className="flex justify-start items-center bg-white shadow-xl border-2 border-dashed rounded-2xl p-3 mb-4 sm:mb-12 mt-4 sm:mt-8">
            <span className="w-auto font-semibold  text-[#17565D]">
              <CiBarcode size={50} />
            </span>
            <div className="w-full px-4">
              <h3 className="font-semibold text-base mb-1 flex items-center gap-2">
                GET YOUR UPC CODE
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Take your UPC and valid ID (AADHAR CARD) to any nearby mobile
                retailer to port your number or get a new SIM card.
              </p>
            </div>
          </div>

          {/* Bottom Right */}
          <div className="flex justify-end items-center bg-white shadow-xl border-2 border-dashed rounded-2xl p-3 mt-0 sm:mt-20">
            <span className="w-auto font-semibold text-[#17565D]">
              <FaSimCard size={50} />
            </span>
            <div className="w-full px-4">
              <h3 className="font-semibold text-base mb-1 flex items-center gap-2">
                ACTIVATION
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Your VIP mobile number will be activated in 4-6 days.Please allow
                12-25 days for Jammuu & Kashmir and North East
              </p>
            </div>
          </div>
        </div>



      </div>


      <Marquee />
    </>
  );
};

export default HowItWorks;
