  import { useEffect, useState } from "react";
  import Login from "../Login";
  import { useSelector } from "react-redux";
  import { FaEnvelope, FaPhone } from "react-icons/fa";
  import toast from "react-hot-toast";
  import { stateData } from "./data"
  import { FaShippingFast } from "react-icons/fa";
  import { Swiper, SwiperSlide } from "swiper/react";
  import { Autoplay } from "swiper/modules";
  import "swiper/css";
  import "swiper/css/autoplay";
  import upi from "../../assets/upi.png"
  import { useNavigate } from "react-router-dom";
  import {
  
  FaHeadset,
  FaComments,
  FaBolt,
  FaInfoCircle,
  FaShieldAlt
} from "react-icons/fa";

  import { FaCheckCircle } from "react-icons/fa";
  import mastercard from '../../assets/mastercard.png'
  // ----------------------------
  // ⭐ CUSTOM SELECT COMPONENT
  // ----------------------------
  const CustomSelect = ({ value, onChange, options, name, invalid, placeholder }) => {
    const [open, setOpen] = useState(false);

    const handleSelect = (opt) => {
      onChange({ target: { name, value: opt } });
      setOpen(false);
    };

    return (
      <div className="relative w-full">
        <div
          onClick={() => setOpen(!open)}
          className={`border rounded-md p-3 bg-white cursor-pointer ${
            invalid ? "border-red-500" : ""
          }`}
        >
          {value || placeholder || "Select"}
        </div>

        {open && (
        <ul className="absolute w-full bg-white border mt-1 rounded-md shadow z-50 max-h-48 overflow-y-auto scrollbar-hide">

            {options.map((opt) => (
              <li
                key={opt}
                onClick={() => handleSelect(opt)}
                className="p-3 cursor-pointer hover:bg-yellow-300"
              >
                {opt}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  export default function Shipping({ nextStep, setStep, formData, setFormData }) {
    const user = useSelector((state) => state.user?.user);
    const cart = useSelector((state) => state.cart.items);
    const [error, setError] = useState("");

    const allStates = stateData;

    useEffect(() => {
      const isLegitCart = cart.find((item) => item.stock === 0);
      if (isLegitCart) {
        toast.error("Some items in your cart are unavailable. Please remove them before proceeding.");
        setStep(1);
        return;
      }
    }, []);

    useEffect(() => {
      const savedData = localStorage.getItem("savedShippingInfo");
      if (savedData) {
        setFormData(JSON.parse(savedData));
      } else {
        setFormData((prev) => ({
          ...prev,
          phone: user?.phone || "",
        }));
      }
    }, [user]);

// login navigate
const navigate = useNavigate();

useEffect(() => {
  if (!user) {
    localStorage.setItem("redirectAfterLogin", "/checkout");
    navigate("/login");
  }
}, [user]);

    const [invalidFields, setInvalidFields] = useState([]);

    const validateForm = () => {
      let errors = [];

      if (!formData.firstName.trim() || formData.firstName?.length < 2) errors.push("firstName");
      if (!formData.lastName.trim() || formData.lastName?.length < 2) errors.push("lastName");
      if (!formData.streetAddress.trim()) errors.push("streetAddress");
      if (!formData.state.trim()) errors.push("state");
      if (!formData.city.trim()) errors.push("city");
      if (!formData.pincode.match(/^\d{6}$/)) errors.push("pincode");
      if (!formData.phone.match(/^\d{10}$/)) errors.push("phone");

      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.push("email");
      }

      if (errors.length > 0) {
        setInvalidFields(errors);
        setError("Please correct the highlighted fields.");

        const firstInvalidField = document.querySelector(`[name="${errors[0]}"]`);
        if (firstInvalidField) firstInvalidField.focus();

        return false;
      }

      setError("");
      return true;
    };

    const handleChange = (e) => {
      const { name, value } = e.target;

      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));

      if (value.trim() !== "") {
        setInvalidFields((prev) => prev.filter((field) => field !== name));
      }
    };

    const handleNextStep = () => {
      if (!validateForm()) return;

      const emptyFields = Object.keys(formData).filter(
        (key) => formData[key] === "" && key !== "landmark"
      );

      if (emptyFields.length > 0) {
        setError("Please fill the required fields.");
        setInvalidFields(emptyFields);

        const firstEmptyField = document.querySelector(`[name="${emptyFields[0]}"]`);
        if (firstEmptyField) firstEmptyField.focus();

        return;
      }

      localStorage.setItem("savedShippingInfo", JSON.stringify(formData));
      setError("");
      setInvalidFields([]);
      nextStep();
    };

      return (
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 bg-gray-50 p-0  sm:p-1 md:p-6 rounded-lg">

        {/* LEFT SIDE — SHIPPING FORM */}
        <div className="lg:col-span-2 bg-white border-2 border-[#17565D]/10 shadow-lg rounded-xl p-4  md:p-6">

          {/* Header with Security Badge */}
     <div className="mb-6">
  {/* Heading + Badge */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">

    {/* Left Section */}
    <div className="flex items-center gap-3">
      <FaShippingFast size={30} className="text-[#124B51] sm:size-35" />

      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#124B51] leading-snug">
          Shipping Details
        </h1>
        <p className="text-xs sm:text-sm text-gray-600">
          Secure checkout — your data is protected
        </p>
      </div>
    </div>

    {/* Right Badge */}
    <div className="flex items-center gap-2 px-3 py-1 bg-[#E1F7E3] rounded-full self-start sm:self-auto">
      <FaCheckCircle className="text-[#17565D] text-sm" />
      <span className="text-xs sm:text-sm font-semibold text-[#17565D]">
        Trusted & Secure
      </span>
    </div>
  </div>

  {/* Payment Icons */}
  <div className="
    flex items-center gap-4 flex-wrap
    justify-center sm:justify-start
    mt-4 p-3 bg-white rounded-lg border
  ">
    <span className="text-xs sm:text-sm text-gray-700 font-medium">
      We Accept:
    </span>

    <img src={upi} className="h-6 sm:h-8 object-contain" alt="UPI" />
    <img
      src="https://www.electronicpaymentsinternational.com/wp-content/uploads/sites/4/2021/11/1280px-Rupay-Logo.png"
      className="h-6 sm:h-8 object-contain"
      alt="RuPay"
    />
    <img src={mastercard} className="h-6 sm:h-8 object-contain" alt="Mastercard" />
    <img
      src="https://i.pinimg.com/736x/43/ed/1d/43ed1d4685a1e776836cf19557cfca73.jpg"
      className="h-6 sm:h-8 object-contain"
      alt="Visa"
    />
  </div>
</div>


          {user ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* keep original inputs and selects */}
              <CustomSelect
                name="operator"
                value={formData.operator}
                onChange={handleChange}
                invalid={invalidFields.includes("operator")}
                options={["Airtel", "Jio", "Vi", "BSNL"]}
              />

              <CustomSelect
                name="simType"
                value={formData.simType}
                onChange={handleChange}
                invalid={invalidFields.includes("simType")}
                options={["Prepaid", "Postpaid"]}
              />

              <input
                type="text"
                name="firstName"
                placeholder="First Name*"
                value={formData.firstName}
                onChange={(e) => {
                  const value = e.target.value;
                  if (!value.includes(" ")) {
                    handleChange(e);
                  }
                }}
                className={`w-full p-3 ${invalidFields.includes("firstName") ? "border-red-500" : ""} border rounded-md`}
              />

              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => {
                  const value = e.target.value;
                  if (!value.includes(" ")) {
                    handleChange(e);
                  }
                }}
                className={`w-full p-3 ${invalidFields.includes("lastName") ? "border-red-500" : ""} border rounded-md`}
              />

              <input
                type="text"
                name="country"
                value="India"
                disabled
                className="w-full md:col-span-2 p-3 border rounded-md text-black bg-gray-100"
              />

              <input
                type="text"
                name="streetAddress"
                placeholder="Street Address*"
                value={formData.streetAddress}
                onChange={handleChange}
                className={`w-full md:col-span-2 p-3 border rounded-md bg-white text-black ${
                  invalidFields.includes("streetAddress") ? "border-red-500" : ""
                }`}
              />

              <input
                type="text"
                name="landmark"
                placeholder="Landmark"
                value={formData.landmark}
                onChange={handleChange}
                className={`w-full md:col-span-2 p-3 border rounded-md bg-white text-black ${
                  invalidFields.includes("landmark") ? "border-red-500" : ""
                }`}
              />

              <CustomSelect
                name="state"
                value={formData.state}
                onChange={handleChange}
                invalid={invalidFields.includes("state")}
                placeholder="-- Select State* --"
                options={allStates?.sort((a, b) => a.localeCompare(b))}
              />

              <input
                type="text"
                name="city"
                placeholder="Town/City*"
                value={formData.city}
                onChange={handleChange}
                className={`w-full md:col-span-2 p-3 border rounded-md bg-white text-black ${
                  invalidFields.includes("city") ? "border-red-500" : ""
                }`}
              />

             <input
  type="tel"
  inputMode="numeric"
  name="pincode"
  placeholder="Pincode*"
  value={formData.pincode}
  onChange={(e) => {
    const value = e.target.value.replace(/\D/g, ""); // only digits
    if (value.length <= 6) {
      handleChange({ target: { name: "pincode", value } });
    }
  }}
  className={`w-full md:col-span-2 p-3 border rounded-md bg-white text-black ${
    invalidFields.includes("pincode") ? "border-red-500" : ""
  }`}
/>


              <div className="relative md:col-span-2">
                <FaPhone className="rotate-90 absolute left-3 top-4 text-gray-500" />
                <input
                  type="number"
                  name="phone"
                  placeholder="Phone*"
                  value={formData.phone}
                  onChange={(e) => {
                    if (e.target.value.length > 10) return;
                    handleChange(e);
                  }}
                  className={`w-full pl-10 p-3 border rounded-md bg-white text-black ${
                    invalidFields.includes("phone") ? "border-red-500" : ""
                  }`}
                />
              </div>

              <div className="relative md:col-span-2">
                <FaEnvelope className="absolute left-3 top-4 text-gray-500" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email ID"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 p-3 border rounded-md bg-white text-black ${
                    invalidFields.includes("email") ? "border-red-500" : ""
                  }`}
                />
              </div>

              <div className="md:col-span-2">
                {error && <p className="text-red-500 text-center font-medium mt-2 p-3 bg-red-50 rounded-lg border border-red-200">{error}</p>}
                
                {/* Security Note */}
                <div className="mt-4 p-3 bg-[#E4F0EE] rounded-lg border border-">
                  <div className="flex items-start gap-2 text-sm text-[#17565D]">
                    <FaCheckCircle className="text-xs sm:text-sm md:text-lg mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Your information is safe with us</p>
                      <p className="text-xs text-[#17565D] mt-1">
                        We use industry-standard encryption to protect your personal data
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleNextStep}
                  className="w-full bg-gradient-to-r from-[#17565D] to-[#124B51] text-white font-semibold py-3 rounded-xl mt-4 hover:from-[#124B51] hover:to-[#17565D] transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <FaCheckCircle />
                  Proceed to Review
                </button>
              </div>
            </div>
          ) : (
            <div className="min-h-screen w-full flex flex-col items-center justify-center text-gray-700 p-6 bg-white">

    <p className="mb-4 font-medium text-lg sm:text-xl">
      Please log in to continue.
    </p>

    <div className="w-full max-w-sm">
      <Login checkout={true} />
    </div>

  </div>
          )}
        </div>

        {/* RIGHT SIDE ORDER SUMMARY */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="bg-white border shadow-md rounded-lg p-4 sticky top-24">

            <h2 className="text-lg font-semibold mb-3 text-[#124B51]">Order Summary</h2>

            <div className="space-y-3">
              {cart.map((item, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b">
                  <div>
                    <div className="text-gray-700 font-medium">{item.number}</div>
                    <div className="text-xs text-gray-500">{item.category || "VIP"}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-[#17565D]">₹{Number(item.price ?? item.roundedFinalPrice ?? 0).toLocaleString("en-IN")}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t">
              <div className="flex justify-between text-gray-600 text-sm">
                <span>Subtotal</span>
                <span>₹{Number(cart.reduce((a, b) => a + Number(b.price ?? b.roundedFinalPrice ?? 0), 0)).toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-between font-semibold text-[#17565D] text-base mt-2">
                <span>Total</span>
                <span>₹{Number(cart.reduce((a, b) => a + Number(b.price ?? b.roundedFinalPrice ?? 0), 0)).toLocaleString("en-IN")}</span>
              </div>
            </div>

          </div>
      <div className="w-full max-w-lg bg-white mt-6 rounded-2xl shadow-md p-5 space-y-4">

  {/* Checkpoints */}
  <ul className="space-y-3 text-gray-700 text-sm">

    <li className="flex items-start gap-2">
      <span className="text-[#17656D] text-lg"><FaCheckCircle /></span>
      <span>100% Refund Policy — Buy with Confidence</span>
    </li>

    <li className="flex items-start gap-2">
      <span className="text-[#17656D] text-lg"><FaHeadset /></span>
      <span>Support You Can Count On — Call us at <strong>9711197111</strong></span>
    </li>

    <li className="flex items-start gap-2">
      <span className="text-[#17656D] text-lg"><FaComments /></span>
      <span>Live Chat Support Available</span>
    </li>

    <li className="flex items-start gap-2">
      <span className="text-[#17656D] text-lg"><FaBolt /></span>
      <span>Instant Activation & Fast Delivery</span>
    </li>

    <li className="flex items-start gap-2">
      <span className="text-[#17656D] text-lg"><FaInfoCircle /></span>
      <span>No Hidden Charges — All Offers Displayed Upfront</span>
    </li>

    <li className="flex items-start gap-2">
      <span className="text-[#17656D] text-lg"><FaShieldAlt /></span>
      <span>Privacy Guaranteed — Your Data Stays Safe With Us</span>
    </li>

  </ul>

  {/* Description */}
  <p className="text-gray-500 text-sm leading-relaxed">
    Enjoy a transparent, secure, and support-backed checkout experience with risk-free shopping and instant assistance.
  </p>

  {/* CTA Link */}
  <a
    href="/"
    className="text-[#17565D] text-sm font-medium hover:underline"
  >
    Discover Premium Numbers →
  </a>
</div>



        </div>

        {/* ✅ TRUST SWIPER OUTSIDE THE FORM BOX */}
      
      </div>
    );
  }
