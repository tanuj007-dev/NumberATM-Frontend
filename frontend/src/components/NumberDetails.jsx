import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { BsCart3, BsCartDash } from "react-icons/bs";

import UserAxiosAPI from "../api/userAxiosAPI";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/cart/cartSlice";
import toast from "react-hot-toast";

import Details from "./Details";
import NumberCards from "./Pages/Images";
import ContactPopup from "./ContactPopup";
import { fbqTrack } from "./utils/fbq";

import trustedseller from "../components/assets/ts.png";
import card1 from "../components/assets/card2.png";
import logo from "../assets/logo.webp";
import Sim from "../components/assets/sim.png";
import HowItWorks from "./Homepage/HowItWorks";
import NumberAtm from "./Homepage/NumberAtm";

const NumberDetails = () => {
  const { id: number } = useParams();
  const [numberData, setNumberData] = useState(null);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart.items);
  const axios = UserAxiosAPI();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch number from backend
  const getNumber = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`vip-numbers/${number}`);
      setNumberData(data.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    getNumber();
  }, [number]);

  // Add to cart
  const handleAddToCart = async (item, price) => {
    try {
      dispatch(addToCart(item));

      const isPresent = cart.find((it) => it._id === item._id);
      fbqTrack("AddToCart");

      if (user && !isPresent) {
        await axios.post("/cart/add", { vipNumberId: item?._id });
      }
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed!");
    }
  };

  // Remove cart item
  const removeCartItem = async (item) => {
    try {
      if (user) {
        await axios.post("/cart/remove", { vipNumberId: item?._id });
      }
      dispatch(removeFromCart(item?._id));
      toast(`Removed ${item.number} from Cart`, {
        icon: <BsCartDash className="text-lg" />,
      });
    } catch {
      toast.error("Failed to remove item!");
    }
  };

  const isPresent = cart?.find((n) => n._id === numberData?._id);

  // Loading
  if (loading) {
    return (
      <div className="text-center min-h-screen flex items-center justify-center text-4xl py-10">
        Loading...
      </div>
    );
  }

  // Number not found
  if (!numberData) {
    return (
      <div className="flex flex-col items-center justify-center w-full py-16 text-center">
        <p className="text-xl md:text-2xl text-gray-500 mb-4">
          Oops! Number not found.
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6">
          Discover Premium Numbers
        </h2>
        <NumberCards woman={false} />
      </div>
    );
  }

  return (
    <>
     <div className="container mx-auto">
  <div className="flex flex-col justify-center items-center bg-white sm:p-18 w-full p-2 ">
    
    {/* Header Section */}
    <div className="bg-[url(./assets/bg.jpg)] bg-contain bg-center shadow-2xl rounded-2xl overflow-hidden m-2">
      <div className="flex flex-wrap w-full justify-center lg:justify-between bg-[#17565DE6] relative p-4 md:p-12 gap-4 md:gap-16">
        
        {/* Left Section (The Card) */}
        <div>
          
          {/* Mobile Heading */}
          <div className="block md:hidden text-white">
            <p className="text-xl font-semibold mb-2 text-center sm:text-left">
              VIP Mobile Numbers - Buy Exclusive Numbers at NumberATM
            </p>
            <p className="text-sm opacity-80 mb-6 text-center sm:text-left">
              Grab this exclusive VIP number now!
            </p>
          </div>

          {/* CARD START */}
          <div
            className="relative w-full max-w-[500px] h-auto rounded-xl shadow-2xl text-black p-4 md:p-8 flex flex-col overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: `url(${card1})` }}
          >
            {/* Top Section with Logo and SIM */}
            <div className="flex justify-between gap-8">
              <div className="w-2/3">
                <img src={logo} alt="Logo" className="object-contain" />
              </div>
              <div className="w-1/3">
                <img src={Sim} alt="SIM Card" className="object-contain" />
              </div>
            </div>

            {/* Center Number */}
            <div className="m-2">
              <h1 className="text-2xl md:text-4xl sm:text-5xl text-[#17565D] font-bold tracking-widest leading-snug">
                {numberData?.view || numberData?.number || numberData?.mobile || "N/A"}
              </h1>
            </div>

            {/* Bottom Details */}
            <div className="flex text-xs md:text-sm mt-2 gap-4">
              
              {/* PRICE → ONLY BACKEND PRICE */}
              <div className="w-1/3">
                <p className="font-light text-xs opacity-80">PRICE</p>
                <p className="text-xl md:text-2xl sm:text-3xl text-[#17565D] font-bold mt-1">
                  ₹{numberData?.price?.toLocaleString("en-IN")}
                </p>
              </div>

              {/* SUM */}
              <div className="w-1/3">
                <p className="font-light text-xs opacity-80">SUM TOTAL</p>
                <p className="text-base md:text-lg sm:text-2xl text-[#17565D] font-bold mt-1">
                  {numberData.total} - {numberData.sum}
                </p>
              </div>

              {/* Trusted Seller */}
              <div className="w-1/3 flex justify-center">
                <img
                  src={trustedseller}
                  alt="Chip"
                  className="object-contain h-16"
                  style={{ filter: "drop-shadow(0 0 2px yellow)" }}
                />
              </div>
            </div>
          </div>
          {/* CARD END */}

        </div>

        {/* Right Section */}
        <div className="flex flex-col md:block w-full md:w-1/2 text-white">

          {/* Desktop Heading */}
          <div className="hidden md:block">
            <p className="text-xl md:text-3xl font-semibold mb-2">
              VIP Mobile Numbers - Buy Exclusive Numbers at NumberATM
            </p>
            <p className="text-sm md:text-base opacity-80 mb-6">
              Grab this exclusive VIP number now!
            </p>
          </div>

          {/* Buttons Row */}
          <div className="flex sm:mx-auto md:mx-0 sm:flex-row gap-3 md:gap-4 w-full max-w-[500px]"> 
            
            {isPresent ? (
              <button
                onClick={() => removeCartItem(numberData)}
                className="flex-1 flex items-center justify-center gap-2 border-2 border-white text-black px-4 md:px-6 py-2 md:py-3 rounded-full shadow-md font-semibold hover:bg-white hover:text-black"
              >
                <BsCartDash /> Remove
              </button>
            ) : (
              <button
                onClick={() => handleAddToCart(numberData)}
                className="flex-1 flex items-center text-xs sm:text-md md:text-lg justify-center gap-2 bg-transparent border-2 border-white text-white px-1 sm:px-3 md:px-6 py-2 md:py-3 rounded-full shadow-md font-semibold hover:bg-white hover:text-[#17565D]"
              >
                <BsCart3 /> Add to cart
              </button>
            )}

            <button
              onClick={() => {
                handleAddToCart(numberData, numberData.price);
                navigate("/checkout");
              }}
              className="flex-1 flex items-center text-xs sm:text-md md:text-lg justify-center gap-2 bg-[#F5C037] text-[#124B51] px-4 md:px-6 py-2 md:py-3 rounded-full shadow-md font-semibold hover:opacity-95"
            >
              <AiOutlineThunderbolt size={25} /> Buy Now
            </button>
          </div>

          {/* WhatsApp + Enquiry */}
          <div className="flex sm:mx-auto md:mx-0 text-xs sm:text-md md:text-lg sm:flex-row gap-3 mt-4 md:gap-4 w-full max-w-[500px]">
            <a
              href="https://wa.me/919722297222"
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-[#00C853] text-white rounded-full font-semibold py-3"
            >
              <FaWhatsapp size={25} /> WhatsApp
            </a>

            <div className="flex-1">
              <ContactPopup />
            </div>
          </div>
        </div>
      </div>
    </div>

    <Details />
  </div>
</div>


      <HowItWorks />
      <NumberAtm />
    </>
  );
};

export default NumberDetails;
