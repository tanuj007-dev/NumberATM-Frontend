import { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
  import { Autoplay } from "swiper/modules";
  import "swiper/css";
  import "swiper/css/autoplay";
import UserAxiosAPI from "../../api/userAxiosAPI";
import ConfirmationModal from "../Confirmation";
import { removeFromCart, setPrice } from "../../redux/cart/cartSlice";
 import { FaMoneyBillWave, FaHeadset, FaComments, FaBolt, FaInfoCircle, FaShieldAlt } from "react-icons/fa";
import { PiCheckCircle } from "react-icons/pi";
import { FaTimes } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
   import { BsFillCartPlusFill } from "react-icons/bs";
import { IoIosLock } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
 
 
 

export default function Cart({ setStep }) {
  const cart = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const user = useSelector((state) => state.user?.user);

  const axios = UserAxiosAPI();
  const dispatch = useDispatch();

  const [item, setItem] = useState(null);
  const [showConfirmation, setShow] = useState(false);
  const [showRemovePopup, setShowRemovePopup] = useState(false);
const [selectedItem, setSelectedItem] = useState(null);

  const [loading, setLoading] = useState(false);

  const subtotal = totalPrice;

  const removeCartItem = async (item) => {
    setLoading(true);
    try {
      let response = null;

      if (user) {
        response = await axios.post("/cart/remove", {
          vipNumberId: item?._id,
        });
      }

      dispatch(removeFromCart(item?._id));

      // Update price using backend response
      dispatch(setPrice(response?.data?.totalPrice));

      setShow(false);
    } catch (error) {
      console.error(error);
      toast.error("Unable to remove item. Try again.");
    } finally {
      setLoading(false);
    }
  };
const removePopupUI = () => (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl shadow-2xl w-[90%] max-w-md p-6 relative animate-fadeIn">

      <div className="relative mb-6">
        <div className="h-[3px] w-full bg-[#F5C037]"></div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-10 h-10 bg-[#F5C037] rounded-full flex items-center justify-center shadow-md">
            <RiDeleteBin6Line size={25} className="text-[#17565D]"/>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H7"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12h4"
              />
         
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-[#17565D] text-center mb-2">
        Remove This Number?
      </h2>

      <p className="text-gray-600 text-center mb-6">
        Are you sure you want to remove <br />
        <strong>{selectedItem?.number}</strong> ?
      </p>

      <div className="flex justify-center gap-4">
        <button
          className="px-6 py-2 rounded-md bg-[#F5C037]   text-[#17565D] font-semibold"
          onClick={() => setShowRemovePopup(false)}
        >
          Cancel
        </button>

        <button
          className="px-6 py-2 rounded-md bg-[#F5C037] text-[#17565D] font-semibold"
          onClick={() => {
            removeCartItem(selectedItem);
            setShowRemovePopup(false);
          }}
        >
          Remove
        </button>
      </div>

      <button
        onClick={() => setShowRemovePopup(false)}
        className="absolute top-1 right-2 bg-[#F5C037] text-[#17565D] px-2 py-1 rounded-lg"
      >
        ✕
      </button>

    </div>
  </div>
);

  return (
    <div className="mx-auto">
      <h1 className="text-2xl md:text-3xl font-semibold text-[#17565D] mb-6 flex mt-5 items-center justify-center gap-2 text-center">
        <BsFillCartPlusFill size={35} className="text-[#17565D]" />
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-center min-h-40 justify-center flex items-center text-gray-600">
          Your cart is empty.
        </p>
      ) : (
        <div className="flex flex-col md:flex-row gap-4">
          {/* Cart Items Table */}
          <div className="w-full rounded-t-lg">
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse border-b border-gray-500 text-center">
                <thead>
                  <tr className="bg-[#F5C037] text-[#17565D]">
                    <th className="p-3 border-b">VIP Number</th>
                    <th className="p-3 border-b">Price</th>
                  
                   
                    <th className="p-3 border-b">Available</th>
                    <th className="p-3 border-b">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {cart.map((num, index) => {
                    const original = num?.originalPrice;
                    const final = num?.price;
                    const discount = num?.displayedDiscount || 0;

                    return (
                      <tr key={index} className="border-b">
                        <td className="p-3">{num.number}</td>

                        <td className="p-3">
                          ₹{original?.toLocaleString("en-IN")}
                        </td>

                        

                       

                        <td className="p-3 flex justify-center">
                          {num.stock !== 0 ? (
                            <PiCheckCircle className="text-3xl text-teal-500" />
                          ) : (
                            <FaTimes className="text-3xl text-red-500" />
                          )}
                        </td>

                        <td className="p-3">
                          <button
                            type="button"
                          onClick={() => {
  setSelectedItem(num);
  setShowRemovePopup(true);
}}

                            className="bg-white p-2 rounded-md transition"
                          >
                            <RiDeleteBin6Line
                              size={24}
                              className="text-red-500"
                            />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-3 mt-4">
              {cart.map((num, index) => {
                const original = num?.originalPrice;
                const final = num?.price;
                const discount = num?.displayedDiscount || 0;

                return (
                  <div
                    key={index}
                    className="border rounded-lg p-3 shadow-sm bg-white"
                  >
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">
                        VIP Number
                      </span>
                      <span className="font-bold text-[#17565D]">
                        {num.number}
                      </span>
                    </div>

                    <div className="flex justify-between mt-1">
                      <span className="text-gray-500">Price</span>
                      <span>₹{original?.toLocaleString("en-IN")}</span>
                    </div>

                  

                   

                    <div className="flex justify-between mt-2">
                      <span className="text-gray-500">Available</span>
                      {num.stock !== 0 ? (
                        <PiCheckCircle className="text-2xl text-teal-500" />
                      ) : (
                        <FaTimes className="text-2xl text-red-500" />
                      )}
                    </div>

                    <div className="flex justify-between mt-2">
                       <span className="text-gray-500">Action</span>
                      <button
                        type="button"
                        onClick={() => {
  setSelectedItem(num);
  setShowRemovePopup(true);
}}

                        className="bg-white p-2 rounded-md transition"
                      >
                        <RiDeleteBin6Line
                          size={22}
                          className="text-red-500"
                        />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Confirmation Modal */}
          {/* {showConfirmation && (
            <ConfirmationModal
              message={
                <>
                  Do you want to remove?
                  <br />
                  <strong>{item?.number}</strong>
                </>
              }
              loading={loading}
              onCancel={() => setShow(false)}
              onConfirm={() => removeCartItem(item)}
            />
          )} */}

          {/* Order Summary */}
          <div className="w-full md:w-1/3">
            <div className="bg-white shadow-lg rounded-xl border-2 border-gray-200   p-6 sticky top-24">
              
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-yellow-400">
                <h2 className="text-lg text-[#17565D] font-bold">
                  Order Summary
                </h2>
                <IoIosLock className="text-green-600 text-xl" />
              </div>

             <div className="flex justify-between text-gray-700 mb-3">
  <span>Items</span>
  <span>{cart?.length}</span>
</div>

              <div className="flex justify-between text-gray-700 mb-3">
                <span>Subtotal</span>
                <span>
                  ₹
                  {subtotal?.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>

              <hr className="my-3" />

              <div className="flex justify-between font-semibold text-[#17565D] text-lg mb-2">
                <span>Total</span>
                <span>
                  ₹
                  {subtotal?.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
 <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 text-sm text-green-800">
                    <IoIosLock className="text-lg" />
                    <span className="font-medium">Secure Checkout</span>
                  </div>
                  <p className="text-xs text-green-700 mt-1">
                    Your payment information is encrypted and secure
                  </p>
                </div>
           <button
  className="mt-4 w-full bg-[#17565D] text-sm text-white py-3 shadow-lg rounded-xl hover:bg-[#F5C037] hover:text-[#17565D] transition font-semibold flex items-center justify-center gap-2 whitespace-nowrap"
  onClick={() => {
    const hasUnavailable = cart.find((num) => num.stock === 0);

    if (hasUnavailable) {
      toast.error(
        "Unavailable (Sold Out) numbers are in your cart. Remove them first."
      );
      return;
    }

    setStep(2);
  }}
>
  <IoIosLock className="text-lg" />
  Proceed to Secure Checkout
</button> 
{showRemovePopup && removePopupUI()}

               {/* Trust Badges */}
              
            </div>
          </div>
        </div>
      )}
         {/* TRUST BADGES & SECURITY SECTION */}
        {/* <div className="w-full mt-8 bg-[#E4F0EE] rounded-xl p-6 border border-blue-100">
          <h3 className="text-center text-lg font-semibold text-[#17565D] mb-6">
        Your Trusted VIP Number Partner
          </h3>
          
          <Swiper
            modules={[Autoplay]}
            loop={true}
            spaceBetween={30}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            speed={800}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="trust-badges-swiper"
          >
          <SwiperSlide>
  <div className="flex flex-col items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
    <div className="w-16 h-16 bg-[#F5C037] rounded-full flex items-center justify-center">
      <FaMoneyBillWave className="text-3xl text-[#17565D]" />
    </div>
    <span className="text-sm font-semibold text-[#17565D] text-center">
      100% Refund Policy
    </span>
    <span className="text-xs text-gray-600 text-center">
      Buy confidently — risk-free shopping
    </span>
  </div>
</SwiperSlide>

<SwiperSlide>
  <div className="flex flex-col items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
    <div className="w-16 h-16 bg-[#F5C037] rounded-full flex items-center justify-center">
      <FaHeadset className="text-3xl text-[#17565D]" />
    </div>
    <span className="text-sm font-semibold text-[#17565D] text-center">
      Support You Can Trust
    </span>
    <span className="text-xs text-gray-600 text-center">
      Call us anytime: <strong>9711197111</strong>
    </span>
  </div>
</SwiperSlide>

<SwiperSlide>
  <div className="flex flex-col items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
    <div className="w-16 h-16 bg-[#F5C037] rounded-full flex items-center justify-center">
      <FaComments className="text-3xl text-[#17565D]" />
    </div>
    <span className="text-sm font-semibold text-[#17565D] text-center">
      Live Chat Assistance
    </span>
    <span className="text-xs text-gray-600 text-center">
      Instant chat support available
    </span>
  </div>
</SwiperSlide>

<SwiperSlide>
  <div className="flex flex-col items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
    <div className="w-16 h-16 bg-[#F5C037] rounded-full flex items-center justify-center">
      <FaBolt className="text-3xl text-[#17565D]" />
    </div>
    <span className="text-sm font-semibold text-[#17565D] text-center">
      Instant Activation
    </span>
    <span className="text-xs text-gray-600 text-center">
      Fast delivery with zero delays
    </span>
  </div>
</SwiperSlide>

<SwiperSlide>
  <div className="flex flex-col items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
    <div className="w-16 h-16 bg-[#F5C037] rounded-full flex items-center justify-center">
      <FaInfoCircle className="text-3xl text-[#17565D]" />
    </div>
    <span className="text-sm font-semibold text-[#17565D] text-center">
      Transparent Pricing
    </span>
    <span className="text-xs text-gray-600 text-center">
      No hidden fees — everything upfront
    </span>
  </div>
</SwiperSlide>

<SwiperSlide>
  <div className="flex flex-col items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
    <div className="w-16 h-16 bg-[#F5C037] rounded-full flex items-center justify-center">
      <FaShieldAlt className="text-3xl text-[#17565D]" />
    </div>
    <span className="text-sm font-semibold text-[#17565D] text-center">
      Privacy Guaranteed
    </span>
    <span className="text-xs text-gray-600 text-center">
      Your personal data stays safe with us
    </span>
  </div>
</SwiperSlide>

          </Swiper>

          {/* Additional Trust Indicators */}
          {/* <div className="mt-6 pt-6 border-t border-[#17565D]">
            <div className="flex flex-wrap justify-center items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <FaCheckCircle className="text-[#17565D]" />
                <span>50,000+ Happy Customers</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <FaCheckCircle className="text-[#17565D]" />
                <span>PCI DSS Certified</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <FaCheckCircle className="text-[#17565D]" />
                <span>Instant Activation</span>
              </div>
            </div>
          </div> */}
        {/* </div> */} 
    </div>
  );
}
