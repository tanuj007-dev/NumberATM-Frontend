
  // import { useState } from "react";
  // import { FiChevronDown, FiChevronUp } from "react-icons/fi";

  // function YouTubeFacade({ url }) {
  //     const [loadVideo, setLoadVideo] = useState(false);

  //     const getVideoId = (url) => {
  //         const regExp =
  //             /^.*(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([^?&"'>]+)/;
  //         const match = url.match(regExp);
  //         return match && match[1] ? match[1] : null;
  //     };

  //     const videoId = getVideoId(url);
  //     if (!videoId) return null;

  //     return (
  //         <div
  //             className="relative w-full pb-[56.25%] rounded-lg overflow-hidden cursor-pointer"
  //             onClick={() => setLoadVideo(true)}
  //         >
  //             {loadVideo ? (
  //                 <iframe
  //                     src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
  //                     loading="lazy"
  //                     className="absolute top-0 left-0 w-full h-full"
  //                     title="YouTube video"
  //                     frameBorder="0"
  //                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  //                     allowFullScreen
  //                 ></iframe>
  //             ) : (
  //                 <img
  //                     src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
  //                     alt="YouTube thumbnail"
  //                     className="absolute top-0 left-0 w-full h-full object-cover"
  //                 />
  //             )}
  //         </div>
  //     );
  // }

  // const Details = () => {
  //     const [openIndex, setOpenIndex] = useState(null);

  //     const toggleFAQ = (index) => {
  //         setOpenIndex(openIndex === index ? null : index);
  //     };
  //     const faqs = [
  //         {
  //             question: "What is a VIP mobile number?",
  //             answer:
  //                 "A VIP mobile number is a premium or fancy number that is easy to remember, unique, and often used for branding, personal identity, or numerological significance.",
  //         },
  //         {
  //             question: "How do I purchase a VIP number?",
  //             answer:
  //                 "You can select your desired number from our collection, make a secure payment, and get the number transferred to your name.",
  //         },
  //         {
  //             question: "How long does it take to activate the number?",
  //             answer:
  //                 "Once the necessary documents are submitted and verified, activation is usually completed within 24 to 48 hours.",
  //         },
  //         {
  //             question: "Can I choose a specific number?",
  //             answer:
  //                 "Yes! We offer custom VIP numbers based on your preference. Contact us for availability.",
  //         },
  //         {
  //             question: "Are these numbers officially registered?",
  //             answer:
  //                 "Yes, all our numbers are legally registered and transferred as per telecom regulations.",
  //         },
  //         {
  //             question: "Do you offer VIP numbers for all networks?",
  //             answer:
  //                 "Yes, we provide VIP mobile numbers for major telecom providers like Jio, Airtel, Vi, and BSNL.",
  //         },
  //         {
  //             question: "What documents are required for activation?",
  //             answer:
  //                 "You need to provide a valid Aadhaar card, PAN card, and a passport-sized photograph for verification.",
  //         },
  //         {
  //             question: "Can I transfer my VIP number to another person later?",
  //             answer:
  //                 "Yes, you can transfer ownership by following the telecom provider’s official process.",
  //         },
  //         {
  //             question: "Are there any hidden charges?",
  //             answer:
  //                 "No, we believe in complete transparency. The price you see is what you pay.",
  //         },
  //         {
  //             question: "How can I contact you for more details?",
  //             answer:
  //                 "You can Call/WhatsApp us at +91-9511195111 or visit our website www.numberatm.com.",
  //         },
  //     ];
  //     return (
  //         <div className="max-w-8xl mx-auto px-0 md:px-4 py-6 md:py-10">


  //             {/* Video Section */}
  //             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
  //                 <YouTubeFacade url="https://www.youtube.com/watch?v=RMmdObP9xRE" />
  //                 <YouTubeFacade url="https://www.youtube.com/watch?v=QarJNtuolK8" />
  //                 <YouTubeFacade url="https://www.youtube.com/watch?v=8KPQb9KLiyc" />
  //             </div>


  //             {/* Introduction */}
  //             <div className="mb-8">
  //                 <h2 className="text-2xl font-bold">Welcome to VIP Numbers by Ashish Yadav</h2>
  //                 <p className="mt-2 text-gray-700">
  //                     Looking for a premium mobile number that makes a lasting impression? We offer an exclusive
  //                     collection of fancy, VIP, and premium mobile numbers tailored for individuals,
  //                     professionals, and businesses who value uniqueness.
  //                 </p>
  //             </div>

  //             {/* Benefits Section */}
  //             <div className="mb-8 bg-green-100 p-4 md:p-6 rounded-lg">
  //                 <h2 className="text-lg md:text-xl font-bold">✅ Benefits of Owning a VIP Number:</h2>
  //                 <ul className="list-disc text-xs text-left md:text-sm ml-3  mt-2">
  //                     <li className="text-justify"><strong>Easy to Remember:</strong> Perfect for personal and professional use.</li>
  //                     <li><strong>Enhance Your Brand:</strong> A great way to make your business stand out.</li>
  //                     <li><strong>Exclusivity & Prestige:</strong> Limited-edition numbers for a unique identity.</li>
  //                     <li><strong>Lucky & Auspicious Numbers:</strong> Choose from numbers based on numerology or personal significance.</li>
  //                 </ul>
  //             </div>

  //             {/* Explore VIP Numbers */}
  //             <div className="mb-8">
  //                 <h2 className="text-2xl font-bold">Explore Our Premium VIP Numbers</h2>
  //                 <p className="mt-2">We offer a wide range of exclusive numbers, including:</p>
  //                 <ul className="list-disc list-inside mt-2">
  //                     <li>Mirror Numbers (e.g., 9090-9090)</li>
  //                     <li>Repeating Numbers (e.g., 7777-7777)</li>
  //                     <li>Lucky Numbers (as per numerology)</li>
  //                     <li>Golden Numbers (e.g., 99999-00000)</li>
  //                     <li>Unique & Custom Numbers (Based on your preference)</li>
  //                 </ul>
  //             </div>

  //             {/* Why Buy Section */}
  //             <div className="mb-8 bg-gray-100 p-6 rounded-lg">
  //                 <h2 className="text-xl font-bold">Why Buy from VIP Numbers by Ashish Yadav?</h2>
  //                 <ul className="list-disc list-inside mt-2">
  //                     <li>✅ Largest Collection – Find the best selection of VIP mobile numbers.</li>
  //                     <li>✅ 100% Secure & Trusted – Genuine numbers with hassle-free transfer.</li>
  //                     <li>✅ Instant Activation – Get your VIP number quickly & easily.</li>
  //                     <li>✅ Best Prices Guaranteed – Competitive rates with no hidden charges.</li>
  //                     <li>✅ Customer Support – Personalized assistance for all your queries.</li>
  //                 </ul>
  //             </div>

  //             {/* FAQ Section */}
  //             <div className="bg-white p-6 rounded-lg shadow-md mt-6">
  //                 <h2 className="text-2xl mb-4 font-bold">Frequently Asked Questions (FAQ)</h2>
  //                 <div className="space-y-4">
  //                     {faqs.map((faq, index) => (
  //                         <div key={index} className="border-b bg-transparent pb-2">
  //                             <p
  //                                 className="flex justify-between p-4 cursor-pointer w-full text-left bg-white text-lg font-medium text-gray-800 py-2"
  //                                 onClick={() => toggleFAQ(index)}
  //                             >
  //                                 {faq.question}
  //                                 {openIndex === index ? <FiChevronUp /> : <FiChevronDown />}
  //                             </p>
  //                             {openIndex === index && (
  //                                 <p className="text-gray-600 mt-2">{faq.answer}</p>
  //                             )}
  //                         </div>
  //                     ))}
  //                 </div>
  //             </div>

  //             {/* Contact Section */}
  //             <div className="bg-blue-100 mt-8 p-6 rounded-lg text-center">
  //                 <h2 className="text-2xl font-bold">Get Your VIP Number Today!</h2>
  //                 <p className="mt-2">Don't miss out on a unique number that defines your style and exclusivity.</p>
  //                 <p className="mt-2">Visit us at <a href="https://www.numberatm.com" className="text-blue-600 font-semibold">www.numberatm.com</a></p>
  //                 <a className="text-black hover:text-black" href="https://wa.me/919511195111"
  //                     target="_blank">📞 Call/WhatsApp: <strong className="text-blue-500">+91-9511195111</strong></a>
  //             </div>
  //         </div>
  //     );
  // };

  // export default Details;
  import React, { useState, useEffect, useRef } from "react";
    import { FaCheckCircle, FaPlay } from "react-icons/fa";
    import { FiChevronDown, FiChevronUp } from "react-icons/fi";
    import video1 from "../assets/Video.mp4";
    import video2 from "../assets/Video1.mp4";
    import video3 from "../assets/Video2.mp4";
    import { FaRegEye } from "react-icons/fa";

    import { useParams, useNavigate } from "react-router-dom";

    // import headerBg from "./assets/img1.png";
    // import CiCloudOn  from "react-icons/ci";
    import { Swiper, SwiperSlide } from "swiper/react";
  import UserAxiosAPI from  "../api/userAxiosAPI";
  import toast from "react-hot-toast";
  import { IoHeartDislike } from "react-icons/io5";
  import { fbqTrack } from "./utils/fbq";
  import { useDispatch, useSelector } from "react-redux";
  import { addToFavs, removeFromFavs } from "../redux/favorites/favSlice";
  import { FaHeart  } from "react-icons/fa";
  import { addToCart } from "../redux/cart/cartSlice";
  import { CiHeart } from "react-icons/ci";
  import { Link } from "react-router-dom";
  
  const DEFAULT_CARD_TIMER_DURATION = 1 * 60 * 60 + 36 * 60 + 31;

  const formatTimeLeft = (totalSeconds) => {
    if (!totalSeconds || totalSeconds <= 0) return "00:00:00";
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const pad = (value) => String(value).padStart(2, "0");
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };
  function YouTubeFacade({ url }) {
    const [loadVideo, setLoadVideo] = useState(false);

    const getVideoId = (url) => {
      const regExp =
        /^.*(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([^?&"'>]+)/;
      const match = url.match(regExp);
      return match && match[1] ? match[1] : null;
    };

    const videoId = getVideoId(url);
    if (!videoId) return null;

    return (
      <div
        className="relative w-full pb-[56.25%] rounded-lg overflow-hidden cursor-pointer"
        onClick={() => setLoadVideo(true)}
      >
        {loadVideo ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            loading="lazy"
            className="absolute top-0 left-0 w-full h-full"
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <img
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt="YouTube thumbnail"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        )}
      </div>
    );
  }

  const Details = () => {
    const { id: number } = useParams();

    const [similarNumbers, setSimilarNumbers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cardTimer, setCardTimer] = useState(DEFAULT_CARD_TIMER_DURATION);
    const navigate = useNavigate();
    const axios = UserAxiosAPI();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const fav = useSelector((state) => state.fav?.items);

    const handleAddToCart = async (item) => {
  const price = item?.roundedFinalPrice ?? item?.price ?? 0;

  try {
    // 1️⃣ Add to Redux
    dispatch(addToCart(item));

    // 2️⃣ Check duplicate
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const exists = cart.find((p) => p._id === item._id);

    // 3️⃣ Add to localStorage
    if (!exists) {
      cart.push(item);
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    // 4️⃣ Backend API call if logged-in
    if (user && !exists) {
      await axios.post("/cart/add", { vipNumberId: item?._id });
    }

    // 5️⃣ Google conversion tracking
    if (window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-16838705843/l-w1CJnEtpcaELOFqd0-",
        value: price,
        currency: "INR",
      });
    }

    // 6️⃣ Facebook Pixel
    if (typeof fbqTrack === "function") {
      fbqTrack("AddToCart", { value: price, currency: "INR" });
    }

    navigate("/checkout");
  } catch (e) {
    toast.error("Failed to add to cart!");
  }
};

    useEffect(() => {
      const timerId = setInterval(() => {
        setCardTimer((prev) => (prev > 0 ? prev - 1 : DEFAULT_CARD_TIMER_DURATION));
      }, 1000);

      return () => clearInterval(timerId);
    }, []);

    const removeFavItem = async (item) => {
      try {
        if (user) {
          await axios.post("/fav/remove", { vipNumberId: item?._id });
        }
        dispatch(removeFromFavs(item?._id));
        toast(`Removed ${item.number} from favourites`, {
          icon: <IoHeartDislike className="text-lg" />,
        });
      } catch (error) {
        console.error(error);
        toast.error("Failed to remove item. Please try again!");
      }
    };

    const handleAddToFav = async (item) => {
      try {
        dispatch(addToFavs(item));
        const isPresent = fav?.find((it) => it._id === item._id);
        if (user && !isPresent) {
          await axios.post("/fav/add", { vipNumberId: item?._id });
        }
      } catch (e) {
        toast.error(e?.response?.data?.message || "Failed to add to favourites!");
        console.log(e);
      }
    };

    useEffect(() => {
      async function fetchData() {
        try {
          const res = await axios.get(
            `/vip-numbers/similar/${number}`
          );
          const items = res.data?.data || res.data || [];
          // keep only first 10 items
          setSimilarNumbers(items.slice(0, 10)); // backend ke hisaab se adjust karo
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }

      fetchData();
    }, [number]);

      const [openIndex, setOpenIndex] = useState(null);

      const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
      };
      const faqs = [
        {
          question: "What is a VIP mobile number?",
          answer:
            "A VIP mobile number is a premium or fancy number that is easy to remember, unique, and often used for branding, personal identity, or numerological significance.",
        },
        {
          question: "How do I purchase a VIP number?",
          answer:
            "You can select your desired number from our collection, make a secure payment, and get the number transferred to your name.",
        },
        {
          question: "How long does it take to activate the number?",
          answer:
            "Once the necessary documents are submitted and verified, activation is usually completed within 24 to 48 hours.",
        },
        {
          question: "Can I choose a specific number?",
          answer:
            "Yes! We offer custom VIP numbers based on your preference. Contact us for availability.",
        },
        {
          question: "Are these numbers officially registered?",
          answer:
            "Yes, all our numbers are legally registered and transferred as per telecom regulations.",
        },
        {
          question: "Do you offer VIP numbers for all networks?",
          answer:
            "Yes, we provide VIP mobile numbers for major telecom providers like Jio, Airtel, Vi, and BSNL.",
        },
        {
          question: "What documents are required for activation?",
          answer:
            "You need to provide a valid Aadhaar card, PAN card, and a passport-sized photograph for verification.",
        },
        {
          question: "Can I transfer my VIP number to another person later?",
          answer:
            "Yes, you can transfer ownership by following the telecom provider’s official process.",
        },
        {
          question: "Are there any hidden charges?",
          answer:
            "No, we believe in complete transparency. The price you see is what you pay.",
        },
        {
          question: "How can I contact you for more details?",
          answer:
            "You can Call/WhatsApp us at +91-9722297222 or visit our website www.numberatm.com.",
        },
      ];
      const steps = [
        {
          title: "PLACE YOUR ORDER",
          desc: "Order through numberatm.com or GPAY/PHONEPAY. Complete your payment to confirm your order.",
        },
        {
          title: "VISIT YOUR NEAREST STORE",
          desc: "AIRTEL/VODAFONE/BSNL/JIO... Take your UPC and valid ID (AADHAR CARD) to any nearby mobile retailer to port your number or get....",
        },
        {
          title: "GET YOUR UPC CODE",
          desc: "Take your UPC and valid ID (AADHAR CARD) to any nearby mobile retailer to port your number or get a new SIM card.",
        },
        {
          title: "ACTIVATION",
          desc: "Your VIP mobile number will be activated in 4-6 days. Please allow 12-25 days for Jammu & Kashmir and North East.",
        },
      ];


    //   const sampleNumbers = [
    //   {
    //     number: "9876543210",
    //     total: 45,
    //     sum2: 9,
    //     sum: 9,
    //     price: 9999,
    //     originalPrice: 12999,
    //     discount: 23,
    //     category: "3 DIGIT NUMBERS",
    //     highLightedNumber: "9876543210", // for highlighting
    //     owner: {
    //       discount: 23,
    //     },
    //     roundedFinalPrice: 9999,
    //     roundedOriginalPrice: 12999,
    //   },
    //   {
    //     number: "1234567890",
    //     total: 36,
    //     sum2: 3,
    //     sum: 6,
    //     price: 8499,
    //     originalPrice: 9999,
    //     discount: 15,
    //     category: "4 DIGIT NUMBERS",
    //     highLightedNumber: "1234567890",
    //     owner: {
    //       discount: 15,
    //     },
    //     roundedFinalPrice: 8499,
    //     roundedOriginalPrice: 9999,
    //   },
    //   {
    //     number: "5556667777",
    //     total: 50,
    //     sum2: 10,
    //     sum: 5,
    //     price: 14999,
    //     originalPrice: 17999,
    //     discount: 17,
    //     category: "VIP NUMBERS",
    //     highLightedNumber: "5556667777",
    //     owner: {
    //       discount: 17,
    //     },
    //     roundedFinalPrice: 14999,
    //     roundedOriginalPrice: 17999,
    //   },
    //   {
    //     number: "8889990000",
    //     total: 54,
    //     sum2: 12,
    //     sum: 9,
    //     price: 19999,
    //     originalPrice: 24999,
    //     discount: 20,
    //     category: "SPECIAL NUMBERS",
    //     highLightedNumber: "8889990000",
    //     owner: {
    //       discount: 20,
    //     },
    //     roundedFinalPrice: 19999,
    //     roundedOriginalPrice: 24999,
    //   },
    // ];
    
      const videoRefs = useRef([]);

    const handlePlay = (index) => {
        videoRefs.current.forEach((video, i) => {
          if (i !== index && video && !video.paused) {
            video.pause();
          }
        });
      };
      return (
        <div className=" md:m-6  flex flex-col md:p-6">
        <section className="relative flex flex-col md:flex-row justify-between w-full mt-6 sm:mt-0 sm:mb-6">
      {/* LEFT SIDE INSTAGRAM REELS */}
    {/* MAIN WRAPPER */}
    <div className="relative md:w-2/3 w-full">

      {/* DESKTOP GRID (md+) */}
      <div className="hidden md:grid grid-cols-3 gap-6">
        {[
          { src: video1, views: "1.3M" },
          { src: video2, views: "888k" },
          { src: video3, views: "798k" },
        ].map((video, index) => (
          <div
            key={index}
            className="aspect-[9/16] w-full overflow-hidden rounded-xl shadow-md relative"
          >
            <div className="absolute top-2 right-2 bg-black/60 text-white text-sm rounded-full flex items-center px-3 py-1 z-10 backdrop-blur-md">
              <FaRegEye className="text-white text-[14px] mr-2" />
              <span className="font-medium">{video.views}</span>
            </div>

            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={video.src}
              className="h-full w-full object-cover"
            
              controls
              playsInline
              onPlay={() => handlePlay(index)}
            ></video>
          </div>
        ))}
      </div>

      {/* MOBILE SWIPE CAROUSEL */}
      <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory px-2 pb-4">
        {[
          { src: video1, views: "1.3M" },
          { src: video2, views: "888k" },
          { src: video3, views: "798k" },
        ].map((video, index) => (
          <div
            key={index}
            className="min-w-full
    snap-center aspect-[9/16] overflow-hidden rounded-xl shadow-md relative"
          >
            <div className="absolute top-2 right-2 bg-black/60 text-white text-sm rounded-full flex items-center px-3 py-1 z-10 backdrop-blur-md">
              <FaRegEye className="text-white text-[14px] mr-2" />
              <span className="font-medium">{video.views}</span>
            </div>

            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={video.src}
              className="h-full w-full object-cover"
              controls
              playsInline
              onPlay={() => handlePlay(index)}
            ></video>
          </div>
        ))}
      </div>

    </div>


      {/* RIGHT SIDE CARDS */}
      <div className="relative md:absolute md:top-0 md:right-0 md:w-[25%] w-full border-2 border-[#E5E2E2] rounded-2xl p-4 bg-white shadow-md mt-4 md:mt-0 overflow-y-auto hide-scrollbar">
        <h2 className="text-xl text-center sm:text-left font-bold mb-4">More VIP Numbers</h2>

        <div className="flex flex-col items-center space-y-4 h-full overflow-y-auto hide-scrollbar">
      {loading ? (
      <p className="text-gray-600 text-sm">Loading...</p>
    ) : similarNumbers.length === 0 ? (
      <p className="text-gray-600 text-sm">No similar numbers found.</p>
    ) : (
      similarNumbers.map((item, index) => {
        const isFav = fav?.some((favItem) => favItem?._id === item?._id || favItem?.number === item?.number);
        return (

            <div
              key={index}
              className="bg-[#fcfae5] rounded-2xl p-2 border-2 border-[#17565D] min-h-[80px] w-full relative max-w-[300px]"
            >
              <div className="rounded-2xl flex flex-col items-center border-2 border-[rgb(255,207,81)] py-2">
                <div className="w-full px-2">
                  <div className="flex items-center justify-between text-xs">
                    <button
                      type="button"
                      aria-label="Toggle Favorite"
                      className="p-1 rounded-full transition hover:scale-110"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (isFav) {
                          removeFavItem(item);
                        } else {
                          handleAddToFav(item);
                        }
                      }}
                    >
                      {isFav ? (
                        <FaHeart size={18} className="text-red-500" />
                      ) : (
                        <CiHeart size={22} className="text-[#17565D]" />
                      )}
                    </button>
                    <div className="border-[#17565D] text-lg border-r-2 pr-2">
                      <small> Sum Total {item.total}</small>
                    </div>
                  </div>
                </div>

                <div
                  className="rounded-2xl overflow-hidden my-3 w-full bg-[length:200%_200%] bg-center"
                  style={{
                    background: "linear-gradient(90deg, rgb(19,52,55),rgb(44,106,108), rgb(19,52,55))",
                  }}
                >
                  <div className="cursor-pointer flex flex-col items-center pt-4 pb-2 space-y-1 w-full">
                    <Link
                      to={`/vip-number/${item.number}`}
                      className="text-2xl sm:text-3xl [transform:scaleY(1.3)] font-semibold text-center text-[#F5C037]"
                    >
                      <div
                        className="[text-shadow:0px_0px_12px_black]"
                        dangerouslySetInnerHTML={{ __html: item.highLightedNumber }}
                      />
                    </Link>

                    <Link
                      to={`/vip-number/${item.number}`}
                      className="text-xs min-h-[20px] text-[#F5C037]"
                    >
                      <span className="[text-shadow:1px_1px_2px_black]">{item.category[0]}</span>
                    </Link>
                  </div>
                </div>

                <div className="relative flex justify-between items-center gap-2 w-full text-xs sm:text-sm p-2">
                      <Link
                        to={`/vip-number/${item.number}`}
                        className="text-center text-sm sm:text-xl font-semibold text-[rgb(22,59,62)]"
                      >
                        <p>
                        ₹ {Number(item.price ?? item.roundedFinalPrice ?? 0).toLocaleString("en-IN")}
                      </p>

                        {item.owner?.discount > 0 && (
                          <p className="relative text-xs font-semibold text-black opacity-50 line-through">
                            ₹ {(Number(item.originalPrice) ?? 0).toLocaleString("en-IN")}
                          </p>
                        )}
                      </Link>

               <button
  aria-label="Add to Cart"
  className="font-semibold px-4 py-1 w-1/2 rounded-full border-2 border-[#F5C037] 
             text-[#17535D] hover:bg-white hover:border-[#17535D] hover:text-[#17535D] 
             transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
  style={{ background: "linear-gradient(180deg, #eba800, #f0cd75, #eba800)" }}
  onClick={() => handleAddToCart(item)}
>
  Book Now
</button>

                </div>
              </div>
            </div>
        );
      })
      )}
        </div>
      </div>
    </section>


          

          <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12  ">
            {/* Left Column */}
            <div className="flex-1 space-y-6 md:space-y-8">
              {/* Navigation Tabs - Overview, FAQs, Reviews */}
              {/* <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 md:gap-16 p-4 border-b-2 border-gray-200">
              <p className="text-base sm:text-lg text-[#4E5566] pb-2 cursor-pointer hover:text-[#17565D] transition-colors">Overview</p>
              <p className="text-base sm:text-lg text-[#4E5566] pb-2 cursor-pointer hover:text-[#17565D] transition-colors">FAQs</p>
              <p className="text-base sm:text-lg text-[#4E5566] pb-2 cursor-pointer hover:text-[#17565D] transition-colors">Reviews</p>
            </div> */}

              {/* Introduction - Welcome Section */}
              <div className=" p-4 sm:p-0">
                <h2 className="md:text-4xl font-semibold text-xl ">Welcome to VIP Number ATM</h2>
                <p className="mt-2 sm:mt-6 md:text-xl  text-justify   text-md leading-tight text-gray-700">
                  Looking for a premium mobile number that makes a lasting impression?
                  We offer an exclusive collection of fancy, VIP, and premium mobile
                  numbers tailored for individuals, professionals, and businesses who
                  value uniqueness.
                </p>
              </div>

              {/* Benefits Section */}
              <div className="bg-[#E1F7E366] p-8 rounded-2xl">
                <h2 className="md:text-4xl text-xl font-semibold mb-6  text-black">
                  Benefits of Owning a VIP Number
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 text-gray-700 text-base sm:text-lg">
                  <div className="flex items-start md:text-xl text-xs space-x-3">
                    <span className="text-[#17565D] mt-1 md:text-lg text-xs">
                      <FaCheckCircle />
                    </span>
                    <p className="tracking-[-0.05em] leading-tight">
                      <strong>Easy to Remember:</strong> Perfect for personal and
                      professional use.
                    </p>
                  </div>

                  <div className="flex items-start md:text-xl text-xs leading-tight space-x-3">
                    <span className="text-[#17565D] mt-1 md:text-lg text-xs">
                      <FaCheckCircle />
                    </span>
                    <p className="tracking-[-0.05em] leading-tight">
                      <strong>Enhance Your Brand:</strong> A great way to make your
                      business stand out.
                    </p>
                  </div>

                  <div className="flex items-start md:text-xl text-xs leading-tight space-x-3">
                    <span className="text-[#17565D] mt-1 md:text-lg text-xs">
                      <FaCheckCircle />
                    </span>
                    <p className="tracking-[-0.05em] leading-tight">
                      <strong>Exclusivity & Prestige:</strong> Limited-edition numbers
                      for a unique identity.
                    </p>
                  </div>

                  <div className="flex items-start md:text-xl text-xs leading-tight space-x-3">
                    <span className="text-[#17565D] mt-1 md:text-lg text-xs">
                      <FaCheckCircle />
                    </span>
                    <p className="tracking-[-0.05em] leading-tight">
                      <strong>Lucky & Auspicious Numbers:</strong> Choose from numbers
                      based on numerology or personal significance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Explore Our Premium VIP Numbers */}
              <div className="m-4   md:text-left">
                <h2 className="md:text-4xl  text-xl leading-tight text-left   font-semibold mb-3  md:mb-5 text-gray-900 ">
                  Explore Our Premium VIP Numbers
                </h2>
                <p className="text-sm  sm:text-2xl md:text-lg lg:text-xl text-gray-700 mb-3 sm:mb-2 md:mb-5 md:text-left">
                  We offer a wide range of exclusive numbers, including:
                </p>

                <ul className="text-[#525252]  md: pl-4 md:text-xl mt-2 sm:mt-4 ml-0 md:ml-4 list-disc  md:text-left">
                  <li>Mirror Numbers (e.g., 9090-9090)</li>
                  <li>Repeating Numbers (e.g., 7777-7777)</li>
                  <li>Lucky Numbers (as per numerology)</li>
                  <li>Golden Numbers (e.g., 99999-00000)</li>
                  <li>Unique & Custom Numbers (Based on your preference)</li>
                </ul>
              </div>

              {/* Why Buy Section */}
              <div className="bg-[#F2F2F2] p-8 rounded-2xl">
                <h2 className="md:text-4xl text-lg leading-tight text-start   font-semibold mb-6 text-gray-900">
                  Why Buy from VIP Numbers by Ashish Yadav?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xl text-gray-700">
                  <div className="flex items-start md:text-xl text-xs  space-x-3">
                    <span className="text-[#17565D] mt-1 md:text-lg text-xs">
                      <FaCheckCircle />
                    </span>
                    <p className="tracking-[-0.05em] leading-tight">
                      <strong>Largest Collection:</strong> Find the best selection of
                      VIP mobile numbers.
                    </p>
                  </div>

                  <div className="flex items-start md:text-xl text-xs space-x-3">
                    <span className="text-[#17565D] mt-1 md:text-lg text-xs">
                      <FaCheckCircle />
                    </span>
                    <p className="tracking-[-0.05em] leading-tight">
                      <strong>100% Secure & Trusted:</strong> Genuine numbers with
                      hassle-free transfer.
                    </p>
                  </div>

                <div className="flex items-start md:text-xl text-xs space-x-3">
      <span className="text-[#17565D] mt-1 md:text-lg text-xs">
        <FaCheckCircle />
      </span>
      <p className="tracking-[-0.05em] leading-tight">
        <strong>Instant Activation:</strong> Get your VIP number quickly & easily.
      </p>
    </div>


                  <div className="flex items-start md:text-xl text-xs  space-x-3">
                    <span className="text-[#17565D] mt-1 md:text-lg text-xs">
                      <FaCheckCircle />
                    </span>
                    <p className="tracking-[-0.05em] leading-tight">
                      <strong>Best Prices Guaranteed:</strong> Competitive rates with
                      no hidden charges.
                    </p>
                  </div>

                  <div className="flex items-start md:text-xl text-xs   space-x-3">
                    <span className="text-[#17565D] mt-1 md:text-lg text-xs">
                      <FaCheckCircle />
                    </span>
                    <p className="tracking-[-0.05em] leading-tight">
                      <strong>Customer Support:</strong> Personalized assistance for
                      all your queries.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
                <h2 className="md:text-2xl text-lg  m-2 md:m-2    text-left font-semibold">
                  Frequently Asked Questions (FAQ)
                </h2>
                 
                <div className="space-y-3 md:space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border-b bg-transparent pb-2">
                      <p
                        className="flex justify-between p-3 md:p-4 cursor-pointer w-full text-left font-semibold bg-white text-base md:text-xl text-md  text-[#000000] py-2 md:py-3 rounded-md hover:bg-gray-50 transition-colors"
                        onClick={() => toggleFAQ(index)}
                      >
                        {faq.question}
                        {openIndex === index ? <FiChevronUp className="flex-shrink-0 ml-2" /> : <FiChevronDown className="flex-shrink-0 ml-2" />}
                      </p>
                      {openIndex === index && (
                        <p className="text-gray-600 mt-2 md:mt-3 p-3 md:p-4 rounded-md text-sm md:text-base">{faq.answer}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full md:w-80 lg:w-96 xl:w-80 space-y-4 md:space-y-6 lg:space-y-8 px-2 md:px-0">

              {/* Video/Image Section - Top Right */}
              {/* <div className="relative flex justify-center">
              <img
                src={vid}
                alt="Video"
                className="rounded-lg shadow-lg w-full h-auto" // Use w-full for responsiveness
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <FaPlay
                  // Reduced size for mobile, kept 50 for larger screens
                  size={40}
                  className="text-[#17565D] bg-[#F5C037] bg-opacity-80 rounded-full p-2 md:p-3 m-4 hover:bg-opacity-90 transition-all cursor-pointer shadow-lg"
                />
              </div>
            </div> */}

              {/* <section>
              <video src={video1} className="rounded-lg h-[180px] w-full mb-4" poster={vid} controls ></video>
              <video src={video2} className="rounded-lg h-[180px] w-full mb-4" poster={vid} controls ></video>
              <video src={video3} className="rounded-lg h-[180px] w-full mb-4" poster={vid} controls ></video>
            </section> */}

              {/* VIP Number Cards */}
            
              {/* mobile works how it works section  */}


            </div>

          </div>
        </div>
      );
    };

    export default Details;
