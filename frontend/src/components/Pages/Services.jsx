import { useContext, useEffect, useState } from "react";
import UserAxiosAPI from "../../api/userAxiosAPI";
import("quill/dist/quill.snow.css");
import { Appstate } from "../../App";
import service from "../../assets/serviceimg1.png";
import service1 from "../../assets/serviceimg1.png";
import LogoTypesSection from "../LogoTypesSection.jsx";
import FAQS from "../FAQS";
import { Link } from "react-router-dom";
import {
  FiSearch,
  FiCheckCircle,
  FiCreditCard,
  FiMail,
  FiSmartphone,
  FiSmile,
} from "react-icons/fi";
import { FaCheckCircle, FaPhoneAlt } from "react-icons/fa";
import Marquee from "../marquee/Marquee.jsx";
import { motion } from "framer-motion";
const Services = () => {
  const { getOptimizedImage } = useContext(Appstate);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const axios = UserAxiosAPI();
  const [meta, setMeta] = useState({
    title: "",
    tags: "",
    description: "",
    content: "",
  });
  useEffect(() => {
    axios.get(`/meta/Services`).then(({ data }) => {
      setMeta(data || { title: "", tags: "", description: "", content: "" });
    });
  }, []);
  const steps = [
    {
      id: 1,
      icon: <FiSearch size={60} className="text-[#17565D]" />,
      title: "Search",
      text: "Enter desired pattern or digits.",
    },
    {
      id: 2,
      icon: <FiCheckCircle size={60} className="text-[#17565D]" />,
      title: "Select",
      text: "Compare prices and network compatibility.",
    },
    {
      id: 3,
      icon: <FiCreditCard size={60} className="text-[#17565D]" />,
      title: "Checkout",
      text: "Complete payment through our secure gateway.",
    },
    {
      id: 4,
      icon: <FiMail size={60} className="text-[#17565D]" />,
      title: "Confirm",
      text: "Receive UPC along with a confirmation SMS and email.",
    },
    {
      id: 5,
      icon: <FiSmartphone size={60} className="text-[#17565D]" />,
      title: "Activate",
      text: "Insert the new SIM or port your current one.",
    },
    {
      id: 6,
      icon: <FiSmile size={60} className="text-[#17565D]" />,
      title: "Enjoy",
      text: "Start sharing your unforgettable contact.",
    },
  ];

  // const sanitizedHtml = DOMPurify.sanitize(meta?.content);
  return (
    <>
      {/* <Helmet>
                <title>{meta.title || "Services"}</title>
                <meta name="description" content={meta.description} />
                <meta name="keywords" content={meta.tags} />
            </Helmet> */}
      <div className="min-h-screen bg-white ">
        {meta?.breadcum && (
          <img
            className="my-3 md:mb-8 w-full"
            src={getOptimizedImage(meta?.breadcum)}
          />
        )}

        <div className="container flex flex-col-reverse lg:flex-row bg-[url(./components/assets/HIW.jpg)] bg-cover bg-no-repeat items-center gap-10 py-6 ">
          {/* ✅ Left Image Section (But will appear last on mobile) */}
          <div className="flex-1 flex justify-center lg:justify-start">
           <img
  src={service}
 className="w-[260px] sm:w-[300px] lg:w-[380px] h-auto mx-auto object-cover 
           translate-y-6    /* 🔥 mobile fix */
           lg:translate-y-6"

/>

          </div>

          {/* ✅ Right Content Section (Will appear first on mobile) */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            {/* Rating */}
            <div className="flex items-center justify-center lg:justify-start gap-2 flex-nowrap">
              <span className="text-yellow-500 text-md sm:text-sm">⭐ 4.9</span>

              <p className="text-[#17565D] font-semibold text-xs sm:text-base md:text-lg tracking-tight    ">
                INDIA’S MOST TRUSTED VIP NUMBER PROVIDER
              </p>
            </div>

            {/* Heading */}
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold leading-tight text-[#17565D]">
              Welcome To <span className="text-yellow-500">Number ATM</span>{" "}
              Services!
            </h1>

            {/* Paragraph */}
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed text-justify px-2 sm:px-10 lg:px-4">
              We provide high-value{" "}
              <span className="font-semibold">vanity phone numbers</span>, rare
              and memorable numbers for individuals and corporations. Whether
              you're a high-profile client or a business looking to stand out,
              we have the perfect number for you.
            </p>

            {/* CTA Buttons */}
           <div className="flex flex-row justify-center lg:justify-start gap-3 sm:gap-4 mt-4">
            <Link to={"/"}>
  <button
    className="px-4 py-2 sm:px-4 sm:py-3 text-sm sm:text-base bg-[#17565D] 
               text-white rounded-lg shadow-md font-semibold 
               hover:bg-[#FBBF24] hover:text-[#17565D] transition"
  >
    Browse VIP Numbers
  </button>
 </Link>
<a
  href="tel:+91 97111 97111"
  className="px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base bg-[#FBBF24] 
             text-[#17565D] rounded-lg shadow-md font-semibold 
             hover:bg-[#17565D] hover:text-white transition 
             flex items-center gap-2"
>
  <FaPhoneAlt size={16} className="sm:size-[18px]" />
  Call Now
</a>


</div>

          </div>
        </div>

        {/* Services List */}
        <LogoTypesSection />
        {/* heading box */}
       <div className="px-4 sm:px-6 py-10 sm:py-14 w-full mx-auto">

  {/* MAIN GRID */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">

    {/* LEFT SIDE */}
    <div className="space-y-6 sm:space-y-8">

      {/* Box 1 */}
      <div
        className="
          relative 
          h-56 sm:h-64 
          bg-[#F2F2F2] 
          rounded-3xl 
          overflow-hidden 
          shadow-md 
          transition-all duration-300 
          hover:shadow-xl hover:scale-[1.02] 
          p-4 sm:p-6 lg:p-8
        "
      >
        <div
          className="
            absolute inset-0 
            border-[3px] border-dotted border-[#17565D] 
            rounded-3xl 
            p-4 sm:p-6 lg:p-8 
            flex flex-col justify-center 
            text-black
          "
        >
          <h2 className="text-sm sm:text-md md:text-2xl font-bold mb-1 sm:mb-2 md:mb-3 text-[#374151]">
            Why Choose Numberatm Services?
          </h2>

          <p className="text-xs sm:text-sm md:text-base leading-relaxed text-[#374151]/90">
            Numberatm offers one clear promise. We help you buy VIP numbers quickly
            and safely. Every step is simple. Each customer secures a unique,
            easy-to-recall number that builds instant credibility. Our team handles
            every detail from selection to activation—saving you time while you gain
            a number that stands out everywhere.
          </p>
        </div>
      </div>

      {/* Box 2 */}
    <div
  className="
    relative 
    h-auto sm:h-72
    bg-[#F2F2F2] 
    border-[3px] border-dotted border-[#17565D] 
    rounded-3xl 
    shadow-md 
    transition-all duration-300 
    hover:shadow-xl hover:scale-[1.02] 
    p-4 sm:p-6 lg:p-8
    hidden sm:block        /* ✅ Hide on mobile */
  "
>
  <div className="absolute inset-0 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col justify-center">

    <h3 className="text-base sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-[#374151]">
      Key Benefits of Choice Mobile Numbers
    </h3>

    <ol className="text-sm sm:text-base space-y-1.5 sm:space-y-2 list-decimal list-inside leading-relaxed text-[#374151]/90">
      <li><span className="font-bold">Instant Recall:</span> A catchy line like 99999-00000 boosts responses.</li>
      <li><span className="font-bold">Credibility & Trust:</span> Premium sequences signal success.</li>
      <li><span className="font-bold">Rising Resale Value:</span> VIP numbers appreciate over time.</li>
      <li><span className="font-bold">Brand Differentiation:</span> Unique numbers set you apart from competitors.</li>
      <li><span className="font-bold">Enhanced Customer Engagement:</span> Easy numbers increase inbound calls.</li>
    </ol>

  </div>
</div>


    </div>

    {/* RIGHT SIDE BOX */}
    <div
      className="
        relative 
        bg-[#F2F2F2] 
        border-[3px] border-dotted border-[#17565D] 
        rounded-3xl 
        shadow-md 
        transition-all duration-300 
        hover:shadow-xl hover:scale-[1.02] 
        p-4 sm:p-5 lg:p-6
      "
    >
      <div className="relative">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-[#374151]">
          What We Offer
        </h2>

        <div className="space-y-4 sm:space-y-6 text-sm sm:text-base leading-relaxed text-[#374151]/90">

          {/* Inventory */}
          <div>
            <p className="font-semibold text-lg sm:text-xl text-[#374151]">
              Huge Inventory of Premium Numbers
            </p>

            <div className="space-y-2 sm:space-y-3 mt-3 ml-3 sm:ml-4">
              <div className="flex gap-3"><FaCheckCircle className="text-[#17565D] text-sm sm:text-base mt-1" /><p>VIP number services for every budget</p></div>
              <div className="flex gap-3"><FaCheckCircle className="text-[#17565D] text-sm sm:text-base mt-1" /><p>Mirror patterns, repeated digits & rare sequences</p></div>
              <div className="flex gap-3"><FaCheckCircle className="text-[#17565D] text-sm sm:text-base mt-1" /><p>Available for Jio, Airtel, Vi & BSNL</p></div>
            </div>
          </div>

          {/* Process */}
          <div>
            <p className="font-semibold text-lg sm:text-xl text-[#374151]">Simple Purchase Process</p>
            <p>Browse → Pick your sequence → Checkout in minutes.</p>
          </div>

          {/* Activation */}
          <div>
            <p className="font-semibold text-lg sm:text-xl text-[#374151]">Fast Activation</p>
            <p>Your UPC is generated instantly, and activation is done within hours.</p>
          </div>

          {/* Porting */}
          <div>
            <p className="font-semibold text-lg sm:text-xl text-[#374151]">Effortless Number Porting</p>
            <p>Submit UPC and we handle everything with zero interruption.</p>
          </div>

          {/* Support */}
          <div>
            <p className="font-semibold text-lg sm:text-xl text-[#374151]">Personalized Support</p>
            <p>Available via call, chat & WhatsApp — from purchase to activation.</p>
          </div>

        </div>
      </div>
    </div>

  </div>
</div>

        <Marquee />

        {/* steps sections  */}

       <div className="w-full bg-[url(./assets/img1.png)] bg-cover bg-center bg-no-repeat bg-white py-16 px-4">

  {/* TITLE */}
  <div className="text-center mb-14">
    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#17565D] tracking-wide">
      How To Buy <span className="text-[#F5C037]">Your VIP Number</span>
    </h2>
  </div>

  <div className="relative w-full flex justify-center">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="
        grid grid-cols-2      /* 🔥 2 columns mobile */
        gap-6                 /* mobile spacing */

        sm:flex               /* 🔥 desktop layout */
        sm:justify-between
        sm:items-start
        sm:gap-10

        w-full max-w-6xl 
        relative
      "
    >
      {steps.map((step, i) => (
        <motion.div
          key={step.id}
          initial={{ opacity: 0, y: 50, scale: 0.7 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: i * 0.2,
          }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center h-full"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="w-20 h-20 sm:w-24 sm:h-24 bg-[#F6D33A] rounded-full flex items-center justify-center text-3xl font-bold"
          >
            {step.icon}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 + 0.2 }}
            viewport={{ once: true }}
            className="mt-3 w-32"
          >
            <p className="text-sm sm:text-lg font-semibold text-[#17565D] uppercase">
              {step.id}. {step.title}
            </p>

            <p className="text-[11px] sm:text-[12px] text-gray-600 mt-1 leading-tight">
              {step.text}
            </p>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  </div>
</div>


        {/* dynamic data */}
        {/* <div className="container mx-auto py-8 mt-6 p-2.5 md:p-6">
                    {!meta?.content ? <>
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Why Should You Choose A <span className="text-yellow-500">Fancy/VIP</span> Mobile Number?
                        </h2>
                        <p className="mt-4 text-gray-600">
                            You can match it to any of your special dates, anniversaries, birthdays, etc. You can match your free, lucky or VIP phone number to other numbers like bank accounts or your car’s license plate.
                        </p>
                        <p className="mt-2 text-gray-600">
                            Your family members can pick numbers which are either adjacent or have the same pattern.
                        </p>
                        <p className="mt-2 text-gray-600">
                            And last but not the least, it could purely be based on numerology. Earlier you had to visit stores for your choice of numbers. And sometimes you didn’t even find the number you were looking for due to limited availability. However, with the launch of our services PAN INDIA, a wide range of choices are open to you, making it easy and convenient for you to find a suitable lucky/fancy or <span className="font-bold">VIP mobile number</span>.
                        </p>
                        <p className="mt-2 text-gray-600">
                            The importance of choice numbers in business is also very high. With everything a business does to stay relevant in the modern age, its phone number is an integral part of its personal and product branding. Customers are also more likely to recall a vanity or a <span className="font-bold">VIP/premium number</span> with branding compared to a purely numeric number.
                        </p>
                    </> :
                        <div className="py-6 text-gray-600 overflow-hidden bg-transparent rounded-md">
                            <div className="ql-editor" dangerouslySetInnerHTML={{ __html: meta.content }} />
                        </div>}
                </div> */}
        <FAQS />
      </div>
    </>
  );
};

export default Services;


// import { useContext, useEffect, useState } from "react";
// import UserAxiosAPI from "../../api/userAxiosAPI";
// import("quill/dist/quill.snow.css");
// import { Appstate } from "../../App";
// import service from "../../assets/service.jpg";
// import service1 from "../../assets/service1.jpg";
// const Services = () => {
//     const {getOptimizedImage} = useContext(Appstate);
//     useEffect(() => {
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//     }, []);
//     const axios = UserAxiosAPI();
//     const [meta, setMeta] = useState({ title: "", tags: "", description: "", content: "" });
//     useEffect(() => {
//         axios.get(`/meta/Services`).then(({ data }) => {
//             setMeta(data || { title: "", tags: "", description: "", content: "" });
//         });
//     }, []);
//     // const sanitizedHtml = DOMPurify.sanitize(meta?.content);
//     return (
//         <>
//             {/* <Helmet>
//                 <title>{meta.title || "Services"}</title>
//                 <meta name="description" content={meta.description} />
//                 <meta name="keywords" content={meta.tags} />
//             </Helmet> */}
//             <div className="min-h-screen bg-white p-6">
//                 {meta?.breadcum&&<img className='my-3 md:mb-8 w-full' src={getOptimizedImage(meta?.breadcum)} />}

//                 <div className="container mx-auto flex flex-col lg:flex-row items-center gap-10">
//                     {/* Left Image Section */}
//                     <div className="flex-1">
//                         <img
//                             src={service}
//                             alt="Customer Support"
//                             className="w-full max-w-md mx-auto"
//                         />
//                     </div>

//                     {/* Right Text Section */}
//                     <div className="flex-1 text-center lg:text-left">
//                         <h1 className="text-4xl font-bold text-gray-900">
//                             Welcome To <span className="text-yellow-500">Number ATM</span> Services!
//                         </h1>
//                         <p className="mt-4 text-gray-600 text-lg">
//                             We provide high-value <b>vanity phone numbers</b>, rare and memorable numbers for individuals and corporations.
//                             Whether you're a high-profile client or a business looking to stand out, we have the perfect number for you.
//                         </p>
//                         {/* <button className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-md text-lg font-semibold">
//                             SHOP NOW!
//                         </button> */}
//                     </div>
//                 </div>

//                 {/* Services List */}
//                 <div className="mt-16 container  mx-auto flex flex-col lg:flex-row items-center  gap-10 ">
//                     <div className="flex-1 px-6">
//                         <h2 className="text-2xl font-bold text-gray-900 text-center">
//                             We provide these vanity phone numbers to:
//                         </h2>
//                         <div className="mt-6 bg-white shadow-lg rounded-lg p-6">
//                             <ul className="space-y-3 text-lg text-gray-700">
//                                 <li className="border-b pb-2">Private individuals</li>
//                                 <li className="border-b pb-2">High-profile individuals</li>
//                                 <li className="border-b pb-2">High-net-worth individuals</li>
//                                 <li className="border-b pb-2">Entertainment and sports professionals</li>
//                                 <li className="border-b pb-2">Law firms</li>
//                                 <li>Private equity firms</li>
//                             </ul>
//                         </div>
//                     </div>
//                     <div className="flex-1">
//                         <img
//                             src={service1}
//                             alt="Customer Support"
//                             className="w-full max-w-md mx-auto"
//                         />
//                     </div>
//                 </div>

//                 {/* Bottom Image */}

//                 <div className="container mx-auto py-8 mt-6 p-2.5 md:p-6">
//                     {!meta?.content ? <>
//                         <h2 className="text-2xl font-semibold text-gray-800">
//                             Why Should You Choose A <span className="text-yellow-500">Fancy/VIP</span> Mobile Number?
//                         </h2>
//                         <p className="mt-4 text-gray-600">
//                             You can match it to any of your special dates, anniversaries, birthdays, etc. You can match your free, lucky or VIP phone number to other numbers like bank accounts or your car’s license plate.
//                         </p>
//                         <p className="mt-2 text-gray-600">
//                             Your family members can pick numbers which are either adjacent or have the same pattern.
//                         </p>
//                         <p className="mt-2 text-gray-600">
//                             And last but not the least, it could purely be based on numerology. Earlier you had to visit stores for your choice of numbers. And sometimes you didn’t even find the number you were looking for due to limited availability. However, with the launch of our services PAN INDIA, a wide range of choices are open to you, making it easy and convenient for you to find a suitable lucky/fancy or <span className="font-bold">VIP mobile number</span>.
//                         </p>
//                         <p className="mt-2 text-gray-600">
//                             The importance of choice numbers in business is also very high. With everything a business does to stay relevant in the modern age, its phone number is an integral part of its personal and product branding. Customers are also more likely to recall a vanity or a <span className="font-bold">VIP/premium number</span> with branding compared to a purely numeric number.
//                         </p>
//                     </> :
//                         <div className="py-6 text-gray-600 overflow-hidden bg-transparent rounded-md">
//                             <div className="ql-editor" dangerouslySetInnerHTML={{ __html: meta.content }} />
//                         </div>}
//                 </div>

//             </div>
//         </>
//     );
// };

// export default Services;
