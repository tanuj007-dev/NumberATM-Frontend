import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { FaArrowLeft, FaCheckCircle, FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { FaLock, FaCreditCard, FaStar, FaPhoneAlt, FaFileAlt, FaUniversity, FaBolt, FaSyncAlt, FaShieldAlt, FaMoneyBillWave, FaClock, FaClipboardList } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { useSelector } from "react-redux";
import ConfirmationModal from "../Confirmation";
import UserAxiosAPI from "../../api/userAxiosAPI";
import { Appstate } from "../../App";
import upi from "../../assets/upi.png";
import mastercard from "../../assets/mastercard.png";
import "swiper/css";
import "swiper/css/autoplay";

export default function Review({
  formData,
  discount,
  loading,
  setDiscount,
  address,
  setStep,
  handleCheckout,
  promoCode,
  setPromoCode,
  isApplied,
  setIsApplied,
  showConf,
  setShow,
}) {
  // Keep Appstate the same as Code1 (Code1 used setMargins in context, kept here for parity)
  const { margins, setMargins } = useContext(Appstate);
  const axios = UserAxiosAPI();

  // === KEEP Code-1 selectors & calculations EXACTLY ===
  const cart = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.user.user);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const taxRate = 0.18;
  const gst = totalPrice * taxRate;
  const finalPrice = totalPrice + gst;
  // =====================================================

  useEffect(() => {
    if (!user) {
      setStep((step) => step - 1);
      toast.error("Please Login to Continue.");
    } else if (cart?.length < 1) {
      setStep((step) => step - 1);
      toast.error("No Numbers to Continue.");
    } else if (
      formData.firstName?.length < 2 ||
      formData.lastName?.length < 2 ||
      !formData.streetAddress ||
      !formData.state ||
      !formData.city ||
      !formData.phone ||
      !formData.email ||
      cart.length === 0
    ) {
      setStep((step) => step - 1);
      toast.error("Please fill in your shipping details.");
    }
  }, [setStep]);

  // helper formatting (used in UI displays)
  const formatINR = (val) => `₹${Number(val).toLocaleString("en-IN")}`;

  const fullName = [formData.firstName, formData.lastName].filter(Boolean).join(" ").trim() || "-";
  const contactEmail = formData.email || "-";
  const phoneNumber = formData.phone || "-";
  const addressLine = formData.streetAddress || "-";
  const locationLine = [formData.city, formData.state, formData.pincode].filter(Boolean).join(", ") || "-";

  const shippingInfo = [
    {
      icon: FaUser,
      label: "Contact Person",
      helper: "Full Name",
      value: fullName,
    },
    {
      icon: FaEnvelope,
      label: "Email",
      helper: "Primary Email",
      value: contactEmail,
    },
    {
      icon: FaPhone,
      label: "Phone",
      helper: "Active Number",
      value: phoneNumber,
    },
    {
      icon: FaMapMarkerAlt,
      label: "Delivery Address",
      helper: locationLine,
      value: addressLine,
      variant: "accent",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-white px-1 sm:px-2 md:px-4 lg:px-6">
      {/* Grid: Left (form/summary) 2 cols, Right sidebar 1 col */}
      <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 py-6">
        {/* LEFT SIDE: merged header + order summary + shipping details (uses Code-2 header styling)
            but all price logic and the cart row rendering use Code-1 logic */}
        <div className="lg:col-span-2">
          {/* Header (from Code-2) */}
          <div className="mb-6 pb-4 border-b-2 border-[#F5C037]">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <FaCheckCircle size={24} className="text-green-600" />
                </div>
                <div>
                  <h1 className="text-sm sm:text-lg md:text-2xl font-bold text-[#17565D]">
                    Review & Confirm
                  </h1>
                  <p className="text-xs text-gray-600 mt-1">
                    Please verify your details before payment
                  </p>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
                <IoIosLock className="text-green-600" />
                <span className="text-sm font-semibold text-green-800">
                  Secure Payment
                </span>
              </div>
            </div>

            {/* Payment Icons (UI only) */}
            <div className="flex items-center flex-wrap gap-4 justify-center sm:justify-end p-3 bg-gray-50 rounded-lg">
              <span className="text-xs text-gray-600 font-medium">Accepted Payments:</span>
              <img src={upi} className="h-6 sm:h-8 object-contain" alt="UPI" />
              <img src="https://www.electronicpaymentsinternational.com/wp-content/uploads/sites/4/2021/11/1280px-Rupay-Logo.png" className="h-6 sm:h-8 object-contain" alt="RuPay" />
              <img src={mastercard} className="h-6 sm:h-8 object-contain" alt="Mastercard" />
              <img src="https://i.pinimg.com/736x/43/ed/1d/43ed1d4685a1e776836cf19557cfca73.jpg" className="h-6 sm:h-8 object-contain" alt="Visa" />
            </div>
          </div>

          {/* Main content container (white card) */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-md p-4 sm:p-6">
            {/* Order Summary (table) */}
            <div className="rounded-lg border border-gray-100 mb-4">
              <div className="px-3 py-2 bg-gray-50 border-b flex justify-between">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">Order Summary</h3>
                <span className="text-xs sm:text-sm text-gray-600">
                  {cart.length} item{cart.length > 1 ? "s" : ""}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full table-auto text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-white text-gray-600">
                      <th className="text-left px-3 py-2 border-b">#</th>
                      <th className="text-left px-3 py-2 border-b">VIP Number</th>
                      <th className="text-right px-3 py-2 border-b">Price</th>
                    </tr>
                  </thead>

                  <tbody>
                    {cart.map((num, index) => {
                      // *** THIS IS FROM CODE 1 (kept exactly) ***
                      const roundedFinalPrice = Math.round(num?.price / 10) * 10;
                      const roundedOriginalPrice = Math.round((num?.originialPrice) / 10) * 10;
                      const displayedDiscount = ((roundedOriginalPrice - roundedFinalPrice) / roundedOriginalPrice) * 100;
                      // render using Code-1 rounding logic and formatting
                      return (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="px-3 py-2">{index + 1}</td>
                          <td className="px-3 py-2">{num.number}</td>
                          <td className="px-3 py-2 text-right text-green-700 font-semibold">
                            {`₹${roundedFinalPrice?.toLocaleString("en-IN")}`}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Price block (keeps Code-1 calc & labels) */}
              <div className="px-3 py-3 bg-white">
                <div className="max-w-xs ml-auto space-y-1.5 text-xs sm:text-sm">
                  <div className="flex justify-between text-gray-700">
                    <span>Total Price</span>
                    <span className="font-medium">{formatINR(totalPrice)}</span>
                  </div>

                  <div className="flex justify-between text-gray-700">
                    <span>GST (18%)</span>
                    <span className="font-medium">{formatINR(gst.toFixed(2))}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-gray-700">
                      <span>Promo ({promoCode})</span>
                      <span className="font-medium text-red-600">- {formatINR(discount.toFixed(2))}</span>
                    </div>
                  )}

                  <div className="flex justify-between border-t pt-2 mt-2 text-base font-semibold">
                    <span>Final Amount</span>
                    <span className="text-green-700">{formatINR((finalPrice - discount).toFixed(2))}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Details — refreshed UI */}
            <div className="rounded-2xl border border-gray-100 p-4 sm:p-6 mb-4 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <div>
                  <p className="text-lg sm:text-xl font-bold text-gray-900">Shipping Details</p>
 
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-green-100 shadow-sm">
                  <FaCheckCircle className="text-green-600 text-sm" />
                  <span className="text-xs font-semibold text-green-700">Verified</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {shippingInfo.map(({ icon: Icon, label, helper, value, variant }) => (
                  <div
                    key={label}
                    className={`flex items-start gap-3 rounded-2xl border px-3 py-3 shadow-[0_3px_12px_rgba(23,86,93,0.06)] ${
                      variant === "accent"
                        ? "border-[#ffffff]/70 bg-white/70"
                        : "border-gray-100 bg-white/70"
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center rounded-full w-10 h-10 ${
                        variant === "accent"
                          ? " text-[#17565D]"
                          : " text-[#17565D]"
                      }`}
                    >
                      <Icon />
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-gray-500">{label}</p>
                      <p className="text-base font-semibold text-gray-900 leading-tight">{value}</p>
                      <p className="text-xs text-gray-500">{helper}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Notice (from Code-2) */}
           

            {/* Buttons (keeps Code-1 checkout call and behavior) */}
            <div className="hidden sm:flex justify-between mt-6 gap-4">
              <button
                type="button"
                onClick={() => setStep((prev) => prev - 1)}
                className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-all font-medium"
              >
                <FaArrowLeft /> Back
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={() => handleCheckout(finalPrice - discount, gst, totalPrice, promoCode, isApplied, discount, formData)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-[#17565D] text-white rounded-lg hover:bg-[#F5C037] transition-all font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <IoIosLock className="text-lg" />
                {loading ? "Processing Payment..." : "Confirm & Pay Securely"}
              </button>
            </div>

            {/* Mobile Confirm & Pay Button */}
            <div className="sm:hidden mt-6">
              <button
                type="button"
                disabled={loading}
                onClick={() => handleCheckout(finalPrice - discount, gst, totalPrice, promoCode, isApplied, discount, formData)}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#17565D] text-white rounded-lg hover:bg-green-700 transition-all font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <IoIosLock className="text-lg" />
                {loading ? "Processing Payment..." : "Confirm & Pay Securely"}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE — Full Code-2 sidebar REUSED (UI only) */}
        <div className="space-y-4 sticky top-24">
          {/* Security Badge Card */}
          

          {/* Trust Indicators Card */}
          <div className="bg-white border-2 border-gray-200 rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-[#17565D] to-[#1a6d75] p-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FaCheckCircle />
                Why 16,000k Choose Us
              </h3>
            </div>

            <div className="p-4 space-y-3">
              {[
                { icon: <FaLock className="text-xl text-[#17565D]" />, title: "Secure & Encrypted Payments", desc: "Shop with complete protection & privacy" },
                { icon: <FaCreditCard className="text-xl text-[#17565D]" />, title: "Multiple Payment Options", desc: "UPI, Cards, Net Banking & Wallets supported" },
                { icon: <FaStar className="text-xl text-[#17565D]" />, title: "Trusted by Celebrities", desc: "Preferred by public figures & business leaders" },
                { icon: <FaPhoneAlt className="text-xl text-[#17565D]" />, title: "24/7 Payment Helpline", desc: "Instant support for any payment issues" },
                { icon: <FaFileAlt className="text-xl text-[#17565D]" />, title: "Officially Registered", desc: "Verified company with GST documentation" },
                { icon: <FaUniversity className="text-xl text-[#17565D]" />, title: "Supports All Banks", desc: "HDFC, ICICI, SBI, Axis & all major banks" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <span>{item.icon}</span>
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Important Info Card */}
          <div className="bg-white border-2 rounded-xl shadow-md overflow-hidden">
            <div className="bg-[#17565D] p-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2"><FaClipboardList /> Before You Pay</h3>
            </div>

            <div className="p-4 space-y-4">
              <div className="flex items-start gap-3">
                <FaBolt className="text-xl text-[#17565D]" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Quick Activation</p>
                  <p className="text-xs text-gray-600">Your VIP number activates in 5–10 minutes</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FaPhoneAlt className="text-xl text-[#17565D]" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Post-Order Support Call</p>
                  <p className="text-xs text-gray-600">Our team will contact you after purchase</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FaSyncAlt className="text-xl text-[#17565D]" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Free Replacement</p>
                  <p className="text-xs text-gray-600">Instant replacement if number is unavailable</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FaShieldAlt className="text-xl text-[#17565D]" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Auto Verification</p>
                  <p className="text-xs text-gray-600">Smart verification system to ensure accuracy</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FaMoneyBillWave className="text-xl text-[#17565D]" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Full Refund Guarantee</p>
                  <p className="text-xs text-gray-600">Get 100% refund if allocation fails</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FaClock className="text-xl text-[#17565D]" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Number Reservation</p>
                  <p className="text-xs text-gray-600">Your chosen number is reserved for 15 minutes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Money Back Guarantee */}
        

          {/* Payment Logos */}
              
        </div>
      </div>

      {/* Confirmation modal uses same onConfirm (calls handleCheckout) and onCancel logic */}
      {showConf && (
        <ConfirmationModal
          message={
            <>
              <div className="flex flex-col justify-center">
                You're Confirming your order and proceeding to Payment of Rs. {finalPrice.toFixed(2).toLocaleString("en-IN")}
                <p className="text-center">Total Numbers: {cart.length}</p>
              </div>
            </>
          }
          onCancel={() => {
            setStep(1);
            setShow(false);
          }}
          onConfirm={() => handleCheckout(finalPrice - discount, gst, totalPrice, promoCode, isApplied, discount, formData)}
        />
      )}

      <div className="w-full mt-6" />
    </div>
  );
}
