import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaClipboardList,
  FaRegEdit,
  FaArrowRight,
  FaSearch,
  FaRegUser,
} from "react-icons/fa"; // Added hamburger menu icons
import Cookies from "js-cookie";
import CartBadge from "./Homepage/CartBadge";
import { IoShareSocialOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { PiUserCircle } from "react-icons/pi";
import { MdOutlineAttachEmail, MdOutlinePhoneInTalk } from "react-icons/md";
import ConfirmationModal from "./Confirmation";
import { logout } from "../redux/user/userSlice";
import toast from "react-hot-toast";
import { clearCart } from "../redux/cart/cartSlice";
import yellow from "../assets/logo.webp";
import UserAxiosAPI from "../api/userAxiosAPI";
import AnimatedStoreLink from "./AdminStore";
import { CiBoxList, CiUser } from "react-icons/ci";
import { BsCart3 } from "react-icons/bs";
import { IoStorefrontOutline } from "react-icons/io5";
import { MdOutlineShare } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

import { LiaClipboardListSolid } from "react-icons/lia";
import SharePopup from "./SharePopup";
import { FaShareAlt } from "react-icons/fa";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mobileUserPopup, setMobileUserPopup] = useState(false);
  const [params] = useSearchParams();
  const category = params.get("category");

  const [searchTerm, setSearchTerm] = useState("");
  const numbers = useSelector((state) => state?.number?.value);
  const axios = UserAxiosAPI();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const buttonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleShare = async () => {
    const shareData = {
      title: "VIP Number Services – NumberATM",
      text: "Check out this amazing VIP number website!",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log("Share failed:", error);
      }
    } else {
      navigator.clipboard.writeText(shareData.url);
      toast.success("Link copied! Share anywhere 📋");
    }
  };

  const Logout = () => {
    Cookies.remove("NumberAtmUser");
    dispatch(logout());
    dispatch(clearCart());
    navigate("/");
    setShowConf(false);
    toast.success("Logged Out!");
  };
  const dropdownRef = useRef(null);
  const searchDropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      // Close search dropdown when clicking outside
      if (
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(event.target)
      ) {
        setSearchTerm("");
        setFilteredNumbers([]);
      }
    }

    // Attach event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up event listener on unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const fetchNumbersBySearch = async (searchTerm) => {
  setLoading(true);
  try {
   const response = await axios.get(`/vip-numbers/dropdown?q=${searchTerm}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching numbers:", error);
    return { data: [] };
  } finally {
    setLoading(false);
  }
};

  const user = useSelector((state) => {
    return state.user.user;
  });
  const [filteredNumbers, setFilteredNumbers] = useState([]);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500); // Debounce delay of 500ms to avoid frequent API calls

    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    const loadNumbers = async () => {
      if (!debouncedSearch || debouncedSearch.trim().length === 0) {
        setFilteredNumbers([]);
        return;
      }
      const data = await fetchNumbersBySearch(debouncedSearch);
      // Handle different response structures
      if (data && Array.isArray(data)) {
        setFilteredNumbers(data);
      } else if (data && data.data && Array.isArray(data.data)) {
        setFilteredNumbers(data.data);
      } else if (data && data.numbers && Array.isArray(data.numbers)) {
        setFilteredNumbers(data.numbers);
      } else {
        setFilteredNumbers([]);
      }
    };
    loadNumbers();
  }, [debouncedSearch]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target) // ✅ Ensure button is not clicked
      ) {
        // console.log(buttonRef.current)
        setIsOpen(false);
      }
    };
    document.addEventListener("pointerdown", handleClickOutside);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, []);

  const handleToggle = (event) => {
    event.stopPropagation(); // Prevent bubbling
    setTimeout(() => {
      setIsOpen(true);
    }, 0); // Delay toggle so outside click handler doesn't interfere
  };

//logout pop up 
// NEW LOGOUT POPUP (same design as Cart Remove Popup)
const logoutPopupUI = () => (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]">
    <div className="bg-white w-[90%] max-w-md p-6 rounded-xl shadow-2xl relative animate-fadeIn">

      {/* Header Decorative Line + Icon */}
      <div className="relative mb-6">
        <div className="h-[3px] w-full bg-[#F5C037]"></div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-10 h-10 bg-[#F5C037] rounded-full flex items-center justify-center shadow-md">
            <FaRegUser size={22} className="text-[#17565D]" />
          </div>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-[#17565D] text-center mb-2">
        Logout from Account?
      </h2>

      {/* Message */}
      <p className="text-gray-600 text-center mb-6">
        Are you sure you want to logout?
      </p>

      {/* Buttons */}
      <div className="flex justify-center gap-4">
        <button
          className="px-6 py-2 rounded-md bg-[#F5C037] text-[#17565D] font-semibold"
          onClick={() => setShowConf(false)}
        >
          Cancel
        </button>

        <button
          className="px-6 py-2 rounded-md bg-[#F5C037] text-[#17565D] font-semibold"
          onClick={Logout}
        >
          Logout
        </button>
      </div>

      {/* Cross Button */}
      <button
        onClick={() => setShowConf(false)}
        className="absolute top-1 right-2 bg-[#F5C037] text-[#17565D] px-3 py-1 font-semibold  rounded-lg"
      > 
        ✕
      </button>
    </div>
  </div>
);




  return (
    <>
      {/* MOBILE PROFILE POPUP */}
      {mobileUserPopup && (
        <div className="fixed inset-0 px-6 bg-black/40 flex items-center justify-center z-[999]">
          <div className="bg-[#F5C037] w-80 rounded-xl p-5 shadow-xl relative">
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setMobileUserPopup(false)}
              className="absolute top-2 right-2 bg-[#17565D] text-white p-1 rounded-full"
            >
              <RxCross2 size={18} />
            </button>

            {/* USER NAME */}
            <div className="flex items-center gap-2 mb-4">
              <PiUserCircle size={28} className="text-[#17565D]" />
              <p className="text-[#17565D] font-bold text-lg">{user.name}</p>
            </div>

            {/* EDIT PROFILE */}
            <button
              onClick={() => {
                setMobileUserPopup(false);
                setIsMenuOpen(false);
                navigate("/profile?edit=true");
              }}
              className="flex items-center gap-2 bg-[#F5C037] w-full text-left py-2 text-[#17565D] font-semibold"
            >
              <FaRegEdit size={20} className="text-[#17565D]" />
              Edit Profile
            </button>

            {/* PHONE */}
            <div className="flex items-center gap-2 bg-[#F5C037] w-full py-2 text-[#17565D] font-semibold">
              <MdOutlinePhoneInTalk size={20} className="text-[#17565D]" />
              {user.phone}
            </div>

            {/* FAVORITES */}
            <button
              onClick={() => {
                setMobileUserPopup(false);
                setIsMenuOpen(false);
                navigate("/favorites");
              }}
              className="flex items-center gap-2 bg-[#F5C037] w-full text-left py-2 text-[#17565D] font-semibold"
            >
              <FaRegHeart size={20} className="text-[#17565D]" />
              My Favorites
            </button>

            <hr className="border-[#17565D] my-2" />

            {/* ORDERS */}
            <button
              onClick={() => {
                setMobileUserPopup(false);
                setIsMenuOpen(false);
                navigate("/orders");
              }}
              className="flex items-center gap-2 bg-[#F5C037] w-full text-left py-2 text-[#17565D] font-semibold"
            >
              <LiaClipboardListSolid size={20} className="text-[#17565D]" />
              My Orders
            </button>

            {/* LOGOUT */}
            <button
              onClick={() => {
                setMobileUserPopup(false);
                setIsMenuOpen(false);
                setShowConf(true);
              }}
              className="mt-4 flex items-center justify-center w-full bg-[#17565D] text-[#F5C037] py-2 rounded-md font-semibold border border-[#17565D]"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      <div class="bg-[#F5C037] text-center">
        <Link
          ref={dropdownRef}
          to="/numerology-vip-numbers"
          className="relative cursor-pointer text-nowrap text-black justify-center hover:text-[#fff] mx-3 lg:ml-6 2xl:ml-12 flex items-center px-2 lg:px-4 py-2 font-bold rounded-full hover:scale-105 transition-all duration-300 ease-in-out"
        >
          🚀 Lowest Price Challenge <FaArrowRight className="mx-2" />
        </Link>
      </div>

      <nav className="bg-white shadow sticky top-0 w-full z-[150] py-2 px-2 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex">
            <button
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="hidden sm:block text-[#17565D] rounded-lg hover:text-[#17565D] border-[#17565D] bg-[#F3FBFA] border-[2px] hover:border-[#17565D] py-1 px-3 my-2 mr-3"
            >
              <div className="bg-[#17565D] w-[25px] my-2 h-[2px]"></div>
              <div className="bg-[#17565D] w-[20px] mb-2 h-[2px]"></div>
              <div className="bg-[#17565D] w-[15px] mb-2 h-[2px]"></div>
            </button>
            {/* Logo Section */}
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-xl font-bold text-gray-800 hover:text-black"
            >
              <div className="min-w-[150px] mr-4 sm:mr-0 max-w-[250px] sm:max-w-[280px] flex items-center  sm:min-h-[4rem] md:min-w-[250px] md:max-w-[300px] relative">
                <img
                  src={yellow}
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>
          </div>
          {/* <div className="w-full md:w-auto flex-1"> */}

          <div className="hidden sm:block relative" ref={searchDropdownRef}>
            <div class="min-w-[30vw]">
              <div class="bg-[#F3FBFA] p-1 flex items-center rounded-md pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600 pr-2 w-full">
                <div class="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
                  <FaSearch className="text-lg" />
                </div>
                <input
                  id="price"
                  type="text"
                  name="price"
                  placeholder="Search VIP Numbers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                />
                <div class="grid shrink-0 grid-cols-1 focus-within:relative">
                  <CiBoxList className="text-xl" />
                </div>
              </div>

              {/* Search Results Dropdown */}
              {searchTerm && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-[400px] overflow-y-auto z-50">
                  {loading ? (
                    <div className="p-6 text-center text-gray-500">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#17565D] mx-auto"></div>
                      <p className="mt-2 text-sm">Searching for numbers...</p>
                    </div>
                  ) : filteredNumbers.length > 0 ? (
                    <div className="py-1">
                      <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
                        <p className="text-xs text-gray-600 font-medium">
                          Found {filteredNumbers.length} number
                          {filteredNumbers.length > 1 ? "s" : ""}
                        </p>
                      </div>
                      {filteredNumbers.map((number, index) => (
                        <Link
                          key={number._id || index}
                          to={`/vip-number/${number.number}`}
                          onClick={() => {
                            setSearchTerm("");
                            setFilteredNumbers([]);
                          }}
                          className="block px-4 py-3 hover:bg-[#F3FBFA] transition-colors border-b border-gray-100 last:border-b-0 cursor-pointer"
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <p
                                className="text-base font-semibold text-[#17565D] mb-1"
                                dangerouslySetInnerHTML={{
                                  __html:
                                    number.highLightedNumber || number.number,
                                }}
                              />
                              {number.owner?.name && (
                                <p className="text-xs text-gray-500">
                                  {number.owner.name}
                                </p>
                              )}
                            </div>
                            {number.price && (
                              <div className="text-right flex-shrink-0">
                                <p className="text-base font-bold text-[#F5C037]">
                                  ₹{number.price.toLocaleString("en-IN")}
                                </p>
                              </div>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center text-gray-500">
                      <p className="text-sm">
                        No numbers found matching "{searchTerm}"
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Try searching with different digits
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* <div className="hidden flex-1 text-nowrap justify-center items-center text-sm gap-2 xl:gap-5">
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-white hover:text-[#f5C037] transition duration-300">
              Home
            </Link>
            <Link to="/about-us" className="text-white hover:text-[#f5C037] transition duration-300">
              About Us
            </Link>
            <Link to="/service" className="text-white hover:text-[#f5C037] transition duration-300">
              Services
            </Link>
            <AnimatedStoreLink />
            <Link to="/how-it-works" className="text-white hidden xl:block hover:text-[#f5C037] transition duration-300">
              How It Works
            </Link>
            <Link to="/clientele" className="text-white hover:text-[#f5C037] transition duration-300">
              Clientele
            </Link>
            <Link to="/vip-numbers" className="text-white hover:text-[#f5C037] transition duration-300">
              Blog
            </Link>
            <Link to="/contact" className="text-white hover:text-[#f5C037] transition duration-300">
              Contact Us
            </Link>
          </div>
 */}

          {/* Cart, Heart Icons, and Login Button */}
          <div className="flex items-center relative gap-x-2 min-h-[20px]">
            {/* <Link className="text-white bg-transparent hover:text-[#f5C037] transition duration-300">
            <FaRegHeart className="h-6 w-6" />
            </Link> */}

            {/* ////cart link  */}

            {/* share button */}
            {/* Desktop Share Button */}
            <div className="hidden sm:flex">
              <button
                onClick={() => setOpenShare(true)}
                className="flex items-center gap-2 text-[#17565D] bg-white px-2 py-2"
              >
                <IoShareSocialOutline size={22} />
              </button>
            </div>

            {/* Popup */}
            {openShare && (
              <SharePopup
                 url={window.location.origin}
                onClose={() => setOpenShare(false)}
              />
            )}

            <span className="hidden sm:block mx-2 text-lg">|</span>
            <Link
              aria-label="Your Cart"
              className="flex items-center"
              to="/checkout"
            >
              <BsCart3
                style={{ fontSize: "20px" }}
                class="text-[#17565D] text-lg mx-1"
              />
              <span className="text-[#666666] text-xl hidden sm:block">
                {" "}
                Cart
              </span>
            </Link>
            <span className="hidden sm:block mx-2 text-lg">|</span>
            <Link
              aria-label="Your Cart"
              className="flex items-center"
              to="/numerology-vip-numbers"
            >
              <IoStorefrontOutline size={22} class="text-[#17565D] mx-1" />{" "}
              <span className="hidden sm:block text-[#666666] text-xl">
                {" "}
                Store
              </span>
            </Link>

            <span className="hidden sm:block mx-2 text-lg">|</span>
            {user === null ? (
              <Link
                to="/login"
                className="flex items-center text-[#666666] hover:text-black transition duration-300"
              >
                <FaRegUser className="text-lg mx-1 text-[#17565D]" size={20} />
                <span className="hidden sm:block text-lg">
                  Sign Up / Sign In
                </span>
              </Link>
            ) : (
              <div className="relative">
                <p
                  ref={buttonRef}
                  onClick={handleToggle}
                  className="hidden sm:block rounded-full cursor-pointer  transition duration-300"
                >
                  <PiUserCircle
                    className="text-[#17565D] text-lg text-bold"
                    size={30}
                  />
                </p>
                {isOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute -right-1.5 mt-2 w-60 md:w-68 bg-[#F5C037] shadow-lg rounded-xl p-4 border border-gray-500 z-50"
                  >
                    {/* Pointer */}
                    <div className="absolute -top-2 right-4 w-4 h-4 bg-[#F5C037] border border-r-white border-b-white border-l-gray-500 border-t-gray-500 rotate-45"></div>

                    {/* Profile Details */}
                    <div className="text-left space-y-2">
                      {/* Name */}
                      <div
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2 text--[#17565D]"
                      >
                        <PiUserCircle
                          className="text-[#17565D] text-lg md:text-xl"
                          size={24}
                        />
                        <h2 className="text-sm text-[#17565D] md:text-lg font-semibold">
                          {user.name}
                        </h2>
                      </div>

                      {/* Edit Profile */}
                      <Link
                        to="/profile?edit=true"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2 text-gray-800"
                      >
                        <FaRegEdit
                          className="text-[#17565D] text-lg md:text-xl"
                          size={24}
                        />
                        <p className="text-md font-semibold text-[#17565D] ">
                          Edit Profile
                        </p>
                      </Link>
                      {/* Email */}
                      {user?.email && (
                        <div
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-2 text-gray-800"
                        >
                          <MdOutlineAttachEmail
                            className="text-[#17565D] text-lg md:text-xl"
                            size={24}
                          />
                          <p className="text-md font-semibold text-[#17565D]">
                            {user.email}
                          </p>
                        </div>
                      )}

                      {/* Phone */}
                      <div
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2 text-gray-800"
                      >
                        <MdOutlinePhoneInTalk
                          className="text-[#17565D] text-lg md:text-xl"
                          size={24}
                        />
                        <p className="text-md font-semibold text-[#17565D]">
                          {user.phone}
                        </p>
                      </div>

                      <div
                        onClick={() => setIsOpen(false)}
                        className="flex items-center p-0 gap-2 text-gray-800"
                      >
                        <FaRegHeart
                          className="text-[#17565D] text-lg md:text-xl"
                          size={24}
                        />
                        <Link
                          to="/favorites"
                          onClick={() => {
                            setIsOpen(false);
                          }}
                          className="w-full text-md font-semibold text-[#17565D] rounded-md transition"
                        >
                          My Favorites
                        </Link>
                      </div>
                    </div>
                    <hr className="my-2" />
                    <div
                      onClick={() => setIsOpen(false)}
                      className="flex items-center p-0 gap-2 text-gray-800"
                    >
                      <LiaClipboardListSolid
                        className="text-[#17565D] text-lg md:text-xl"
                        size={24}
                      />
                      <Link
                        to="/orders"
                        onClick={() => {
                          setIsOpen(false);
                        }}
                        className="w-full text-md font-semibold text-[#17565D] rounded-md transition"
                      >
                        My Orders
                      </Link>
                    </div>
                    <hr className="my-2" />
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        setShowConf(true);
                      }}
                      className="w-full text-[#F5C037] bg-[#17565D] hover:bg-white hover:text-[#17565D] py-2 text-xs md:text-sm rounded-md transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex sm:hidden items-center">
            <button
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="sm:hidden text-[#17565D] hover:text-[#17565D] border-[#17565D] bg-[#F3FBFA] border-[2px] hover:border-[#17565D] py-2 px-2 ml-3"
            >
              {isMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <>
                  <div className="bg-[#17565D] w-[25px] my-1 h-[2px]"></div>
                  <div className="bg-[#17565D] w-[20px] mb-1 h-[2px]"></div>
                  <div className="bg-[#17565D] w-[15px] mb-1 h-[2px]"></div>
                </>
              )}
            </button>
          </div>
        </div>
      {showConf && logoutPopupUI()}

        {/* Sidebar Menu (Mobile) */}
        <div
          className={`fixed border-2 border-[#17565D] z-[300] top-4 left-0 h-auto w-64 bg-[#F3FBFA] shadow-md transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out rounded-2xl`}
        >
          <div className="p-6 space-y-2 transition-all-2s">
            <div className="flex justify-end">
              <button
                onClick={toggleMenu}
                className="text-right px-2 py-1 rounded-lg text-white bg-[#17565D] hover:text-[#f5C037]"
              >
                <FaTimes size={20} className="text-white" />
              </button>
            </div>
            {/* MOBILE PROFILE SECTION */}
            {/* MOBILE PROFILE SECTION */}
            {/* MOBILE PROFILE SECTION */}
            {/* MOBILE PROFILE SECTION – ONLY MOBILE */}
            {/* MOBILE PROFILE ICON ONLY */}
            <div className="sm:hidden">
              {user && (
                <button
                  onClick={() => setMobileUserPopup(true)}
                  className="flex items-center gap-2 bg-transparent"
                >
                  <PiUserCircle size={32} className="text-[#17565D]" />

                  {/* USER NAME */}
                  <span className="text-[#17565D] font-semibold text-lg">
                    {user?.name}
                  </span>
                </button>
              )}
            </div>

            <Link
              to="/"
              onClick={toggleMenu}
              className="block  text-black mt-12 px-4
               hover:text-white hover:bg-[#17565DE6]  transition duration-300"
            >
              Home
            </Link>
            <AnimatedStoreLink toggleMenu={toggleMenu} />

            <Link
              to="/about-us"
              onClick={toggleMenu}
              className="block  text-black  hover:text-white hover:bg-[#17565DE6] transition duration-300  mt-0 px-4"
            >
              About Us
            </Link>
            <Link
              to="/service"
              onClick={toggleMenu}
              className="block  text-black px-4 hover:text-white hover:bg-[#17565DE6] transition duration-300"
            >
              Services
            </Link>
            <Link
              to="/how-it-works"
              onClick={toggleMenu}
              className="block  text-black px-4 hover:text-white hover:bg-[#17565DE6] transition duration-300"
            >
              How It Works
            </Link>
            <Link
              to="/clientele"
              onClick={toggleMenu}
              className="block  text-black px-4 hover:text-white hover:bg-[#17565DE6] transition duration-300"
            >
              Clientele
            </Link>
            <Link
              to="/vip-numbers"
              onClick={toggleMenu}
              className="block  text-black px-4 hover:text-white hover:bg-[#17565DE6] transition duration-300"
            >
              Blog
            </Link>

            <Link
              to="/contact"
              onClick={toggleMenu}
              className="block  text-black px-4 hover:text-white hover:bg-[#17565DE6] transition duration-300"
            >
              Contact Us
            </Link>
            {/* Mobile Share Button */}
            <button
              onClick={() => {
                setOpenShare(true);
                toggleMenu(); // optional: menu close after click
              }}
              className="flex items-center gap-3 text-black px-4 py-2 bg-[#F3FBFA] hover:bg-[#17565DE6] hover:text-white rounded-lg transition"
            >
              <IoShareSocialOutline size={22} />
              <span>Share</span>
            </button>

            {!user ? (
              <button
                onClick={() => {
                  toggleMenu();
                  navigate("/login");
                }}
                px-4
                className="bg-[#17565D] text-white px-6 py-0 rounded-full hover:bg-[#f5C037E6] transition duration-300"
              >
                Log In
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    toggleMenu();
                    setShowConf(true);
                  }}
                  px-4
                  className=" bg-[#17565D] text-white px-6 py-0 rounded-full hover:bg-[#f5C037E6] transition duration-300"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="bg-white border shadow py-2 sm:py-4">
        <div className="flex flex-grow max-h-[50px] justify-start md:justify-center gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => {
              setMobileUserPopup(false);
              setIsMenuOpen(false);
              navigate("/numerology-vip-numbers?category=PENTA");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="bg-[#17565D] whitespace-nowrap rounded-3xl text-white  px-5 mx-1"
          >
            Penta Numbers
          </button>

          <button
            onClick={() => navigate("/numerology-vip-numbers?category=AAA-BBB")}
            className="bg-[#17565D] whitespace-nowrap rounded-3xl text-white py-0 px-5  mx-1"
          >
            Doubling (AABBBCC)
          </button>

          <button
            onClick={() =>
              navigate("/numerology-vip-numbers?category=XY-XY-XY-NUMBERS")
            }
            className="bg-[#F3F9FB] whitespace-nowrap rounded-3xl text-black py-0 px-5  mx-1"
          >
            XYXYXY
          </button>

          <button
            onClick={() => navigate("/numerology-vip-numbers?category=00XY00")}
            className="bg-[#F3F9FB] whitespace-nowrap rounded-3xl text-black py-0 px-5  mx-1"
          >
            00XY00
          </button>

          <button
            onClick={() => navigate("/numerology-vip-numbers?category=TETRA")}
            className="bg-[#F3F9FB] whitespace-nowrap rounded-3xl text-black py-0 px-5  mx-1"
          >
            Tetra Numbers - XXXX
          </button>

          <button
            onClick={() => navigate("/numerology-vip-numbers?category=XXXYYY")}
            className="bg-[#F3F9FB] whitespace-nowrap rounded-3xl text-black py-0 px-5  mx-1"
          >
            XXXYYY
          </button>

          <button
            onClick={() => navigate("/numerology-vip-numbers?category=MIRROR")}
            className="bg-[#F3F9FB] whitespace-nowrap rounded-3xl text-black py-0 px-5  mx-1"
          >
            Mirror
          </button>

          <button
            onClick={() =>
              navigate("/numerology-vip-numbers?category=SEMI-MIRROR")
            }
            className="bg-[#F3F9FB] whitespace-nowrap rounded-3xl text-black py-0 px-5  mx-1"
          >
            Semi Mirror
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
