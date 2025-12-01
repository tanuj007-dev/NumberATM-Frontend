import { useState, useEffect } from "react";
import UserAxiosAPI from "../../api/userAxiosAPI";
import brand from "../../assets/brands.png"
import yellow from "../../assets/yellow.png";
import WhoWeServe from "../WhoWeServe";
import { motion } from "framer-motion";
 import Testimonial from "../testimonials"
 import {
  FiSearch,
  FiCheckCircle,
  FiCreditCard,
  FiMail,
  FiSmartphone,
  FiSmile,
} from "react-icons/fi";
import { MdRealEstateAgent } from "react-icons/md";
import {
  FaShoppingCart,
  FaHotel,
  FaHospitalUser,
  FaFilm,
} from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";
import Marquee from "../marquee/Marquee";
import Marquee1 from "../marquee/Marquee1";
import iphone from "../../assets/mobile.png"
export default function PublicClientLogos() {
  const [logos, setLogos] = useState([]);
  const axios = UserAxiosAPI();
  useEffect(() => {
    fetchLogos();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

const [visibleCount, setVisibleCount] = useState(10); //load more and less buttons 
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};
const loadMore = () => {
  setVisibleCount(logos.length); // All logos show
};

const loadLess = () => {
  setVisibleCount(10);  
  scrollToTop(); // ✔ Automatically scroll up
};



const industries = [
    {
      title: "Real Estate",
      desc: "VIP numbers build strong client trust and create memorable first impressions.",
      icon: <MdRealEstateAgent className="text-4xl text-[#17565D]" />,
    },
    {
      title: "Retail & E-Commerce",
      desc: "Vanity numbers help improve customer service and brand visibility.",
      icon: <FaShoppingCart className="text-4xl text-[#17565D]" />,
    },
    {
      title: "Hospitality",
      desc: "Hotels & restaurants use VIP numbers for reliable guest communication.",
      icon: <FaHotel className="text-4xl text-[#17565D]" />,
    },
    {
      title: "Healthcare",
      desc: "Clinics & doctors prefer memorable numbers for smooth patient communication.",
      icon: <FaHospitalUser className="text-4xl text-[#17565D]" />,
    },
    {
      title: "Media & Entertainment",
      desc: "Celebrities use VIP numbers to maintain exclusivity and accessibility.",
      icon: <FaFilm className="text-4xl text-[#17565D]" />,
    },
    {
      title: "Media & Entertainment",
      desc: "Celebrities use VIP numbers to maintain exclusivity and accessibility.",
      icon: <FaHandshake className="text-4xl text-[#17565D]" />,
    },
  ];
    const steps = [
    {
      id: 1,
      icon: <FiSearch size={40} className="text-[#17565D]" />,
      title: "Consultation",
      text: "Our team consults with clients to understand their needs and expectations.",
    },
    {
      id: 2,
      icon: <FiCheckCircle size={40} className="text-[#17565D]" />,
      title: "Selection",
      text: "Browse our extensive VIP number database and choose your preferred number.",
    },
    {
      id: 3,
      icon: <FiCreditCard size={40} className="text-[#17565D]" />,
      title: "Confirmation",
      text: "We confirm availability and securely reserve the chosen number for you.",
    },
    {
      id: 4,
      icon: <FiMail size={40} className="text-[#17565D]" />,
      title: "Activation",
      text: "Your VIP number is activated quickly, ready for immediate use.",
    },
  ];
const points = [
  "Repeat customers trust us for upgrades & new numbers",
  "Satisfied clients refer others regularly",
  "Clear pricing and honest communication"
];
  const fetchLogos = async () => {
    const res = await axios.get("/logos");
    setLogos(res.data);
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const [meta, setMeta] = useState({ title: "", tags: "", description: "" });
  useEffect(() => {
    axios.get(`/meta/Clients`).then(({ data }) => {
      setMeta(data || { title: "", tags: "", description: "" });
    });
  }, []);
  
  const getOptimizedImage = (url) =>
  url.replace("/upload/", "/upload/c_fill,w_auto,dpr_auto,f_auto,q_auto/");

  return (
    <>
     <section className="flex-grow bg-white pt-2 sm:pt-4 md:pt-24 lg:pt-2">
      {/* ✅ CONTACT HEADING SECTION */}

    <div className="w-full sm:[200px] md:h-[303px] flex justify-center">
<div
  className="
    w-full max-w-[1400px] mx-auto
    bg-[#E4F0EE] rounded-2xl 
    px-3 sm:px-6 md:px-16  
    py-3 sm:py-6 md:py-12
    flex flex-col-reverse md:flex-row 
    items-center justify-between 
    gap-1 md:gap-10 relative
  "
>

  {/* LEFT SIDE */}
  <div className="w-full md:w-[50%] space-y-2 text-center md:text-left">
    <h1 className="text-[#17565D] font-extrabold 
      text-2xl sm:text-3xl md:text-5xl leading-tight">
      Our Clients
    </h1>

    <p
      className="text-[#17565D] text-[14px] sm:text-[15px] md:text-[19px] 
      leading-[1.4] text-justify 
      mx-auto md:mx-0"
    >
      Trusted by clients nationwide, we deliver reliable VIP number
      services with clear guidance, fast support, and a smooth experience
      at every step, ensuring each customer finds the perfect number
      effortlessly and confidently.
    </p>
  </div>

  {/* RIGHT SIDE CARD */}
{/* RIGHT SIDE IMAGE */}
<div className="w-full flex justify-center relative hidden md:block">
  <div className="w-full h-[350px] relative rounded-xl overflow-hidden">
    <img
      src={brand}
      alt="Brand Logos"
      className="w-full h-full object-cover absolute bottom-0 left-0 "
    />
  </div>
</div>

</div>

</div>


      {/* client section  */}
      {/* client section  */}
      <div
        id="partners-section"
        className=" p-2 sm:p-5 md:p-10 min-h-screen bg-white text-black flex flex-col items-center"
      >
       <h1
  className="
    text-[#17565D] 
    text-2xl sm:text-3xl md:text-4xl 
    font-extrabold 
    tracking-tight 
    text-center
    mb-4 sm:mb-8          /* mobile = almost no margin */
  "
>
  Trusted by <span className="text-[#F5C037]">Our Partners</span>
</h1>

<p
  className="
    text-[#17565D]
    text-[13px] sm:text-[15px] md:text-[19px]
    leading-[1.35]
    text-justify
    m-0 p-0
    mb-6 sm:mb-8 md:mb-15
  "
>
  We are proud to have helped these brands achieve success with our
  expert digital marketing services.
</p>



        {/*logo GRID */}
        
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 w-full">
  {logos.slice(0, visibleCount).map((logo) => (
    <div
      key={logo._id}
      className="relative bg-transparent bg-opacity-15 rounded-xl shadow-lg transform transition-all hover:scale-105 hover:shadow-lg flex items-center justify-center"
    >
      <img
        src={getOptimizedImage(logo.url)}
        alt="Client Logo"
        className="w-auto object-cover transition-opacity duration-300 hover:opacity-80"
      />
    </div>
  ))}
</div>

{/* BUTTONS */}
<div className="flex justify-center mt-6 gap-4">
  
  {/* LOAD MORE (only show if NOT all loaded) */}
  {visibleCount < logos.length && (
    <button
      onClick={loadMore}
      className="bg-transparent mt-6 text-[#17565D] text-lg py-0 sm:py-2 px-4 sm:px-8 border-2  border-[#17565D] rounded-full hover:bg-[#17565D] hover:text-white"
    >
      Load More
    </button>
  )}

  {/* LOAD LESS (only show if ALL loaded) */}
  {visibleCount === logos.length && (
    <button
      onClick={loadLess}
      className="bg-transparent mt-6 text-[#17565D] text-lg py-0 sm:py-2 px-4 sm:px-8 border-2  border-[#17565D] rounded-full hover:bg-[#17565D] hover:text-white"
    >
      Load Less
    </button>
  )}

</div>


        {/* <div className="py-10 text-black overflow-hidden bg-transparent rounded-md">
          <div className="ql-editor" dangerouslySetInnerHTML={{ __html: meta.content }} />
        </div> */}
      </div>
        
          
       
 <div
  className=" bg-[url(./components/assets/HIW.jpg)] bg-cover bg-no-repeat
    grid 
    grid-cols-1 
    md:grid-cols-2 
    gap-6 md:gap-8 
    px-3 md:px-6
    items-center
    min-h-[220px] md:min-h-[230px]
  "
>
  {/* LEFT — Content */}
  <div className="space-y-3 rounded-2xl px-2 md:px-6 py-4">
    <h2 className="text-lg sm:text-2xl md:text-3xl text-[#17565D] font-bold">
      Why Our Clientele Chooses Us
    </h2>

    <p className="text-[13px] sm:text-base leading-tight text-gray-700">
      As a premium provider of VIP and vanity phone numbers, NumberATM has
      earned the trust of thousands of satisfied customers since our
      inception in 2010. Here’s why our clientele continues to choose us:
    </p>

    <div className="space-y-3 sm:space-y-4">
      {/* Point 1 */}
      <div>
        <h3 className="text-base sm:text-xl text-[#17565D] font-bold">
          1. Seamless Experience
        </h3>
        <p className="text-[13px] sm:text-base leading-tight text-gray-700">
          Our clients love the hassle-free process we offer for acquiring
          custom phone numbers. From browsing options to finalizing a number,
          we ensure a smooth experience.
        </p>
      </div>

      {/* Point 2 */}
      <div>
        <h3 className="text-base sm:text-xl text-[#17565D] font-bold">
          2. Exceptional Customer Service
        </h3>
        <p className="text-[13px] sm:text-base leading-tight text-gray-700">
          We believe in building lasting relationships. Our team is available
          at every step to ensure you make the best choice.
        </p>
      </div>

      {/* Point 3 */}
      <div>
        <h3 className="text-base sm:text-xl text-[#17565D] font-bold">
          3. Exclusive Numbers for Ultimate Identity
        </h3>
        <p className="text-[13px] sm:text-base leading-tight text-gray-700">
          Our clientele appreciates the exclusivity of our VIP numbers, built
          to reflect a unique personal or professional identity.
        </p>
      </div>

      {/* Point 4 */}
      
    </div>
  </div>

  {/* RIGHT — Image */}
  <div className="hidden md:flex self-center justify-center">
    <img
      src={yellow}
      alt="Why Choose Us"
      className="w-auto md:w-[480px]  lg:w-[500px]  object-contain drop-shadow-lg"
    />
  </div>
</div>



      <WhoWeServe />
      <Testimonial />
      {/* industries we serve  */}
      <section className="w-full py-12 bg-[url(./assets/bg.jpg)] bg-cover bg-center  bg-no-repeat flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl w-full px-2">
          {industries.map((item, index) => (
            <div
              key={index}
              className="relative p-8 pt-16 rounded-xl shadow-xl hover:shadow-2xl transition 
             bg-white/30 backdrop-blur-lg border-2 border-dotted border-[#17565D]"
            >
              {/* Floating Icon Box */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#F5C037]   shadow-lg p-4 rounded-xl">
                {item.icon}
              </div>

              <h3 className="text-[#17565D] text-xl font-bold text-center mb-2">
                {item.title}
              </h3>
              <p className="text-[1rem] text-gray-600 text-center mb-4">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
      <Marquee />
      {/* steps */}
      <div className="w-full bg-[url(./assets/img1.png)] bg-cover bg-center bg-no-repeat bg-white py-16 px-4">
        {/* TITLE */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#17565D] tracking-wide">
            Step-by-Step <span className="text-[#F5C037]"> Process</span>
          </h2>
        </div>

        {/* MAIN WRAPPER */}
        <div className="relative w-full flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="grid gap-10 
             grid-cols-2        /* ✅ MOBILE: 2 columns */
             md:grid-cols-3     /* ✅ TABLET: 3 columns */
             lg:grid-cols-4     /* ✅ DESKTOP: 4 columns */
             w-full max-w-6xl px-2 md:px-4"
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
                className="flex flex-col items-center text-center"
              >
                {/* Circle */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="w-20 h-20 md:w-28 md:h-28 
                       bg-[#F6D33A] rounded-full 
                       flex items-center justify-center 
                       text-3xl md:text-4xl font-bold"
                >
                  {step.icon}
                </motion.div>

                {/* Text */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.2 + 0.2 }}
                  viewport={{ once: true }}
                  className="mt-4 md:mt-6 w-40 md:w-48"
                >
                  <p className="text-xs md:text-lg  text-[#17565D] font-bold uppercase tracking-wide">
                    {step.id}. {step.title}
                  </p>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                    {step.text}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* trusted by section */}

      <Marquee1 />
      {/* Why VIP Numbers Matter */}
{/* Why VIP Numbers Matter SECTION */}
<section className="w-full py-10 bg-[url(./assets/map.jpg)] bg-contain  sm:py-0 md:py-0 bg-white">
  <div className="max-w-7xl mx-auto px-4">

    <div className="flex flex-col md:flex-row items-start gap-4 sm:gap-6 md:gap-12
">

      {/* LEFT CARD */}
      <div className="flex-1 mt-2 sm:mt5  md:mt-28 bg-white border-2 border-dotted border-[#17565D] rounded-xl p-4 md:p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-[#17565D] mb-3">
          Why <span className="text-[#F5C037]">VIP Numbers</span> Matter
        </h2>

        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          VIP numbers are more than just digits—they're an identity that builds brand recall and trust.
        </p>

        <div className="space-y-3">
          {["Branding", "Exclusivity", "Convenience"].map((t, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="text-[#F5C037] font-bold text-xl">{i + 1}.</span>
              <div>
                <h3 className="font-bold text-[#17565D] text-sm sm:text-base">{t}</h3>
                <p className="text-gray-600 text-sm">
                  {i === 0 && "Strengthens brand recall and customer trust"}
                  {i === 1 && "Offers uniqueness and premium identity"}
                  {i === 2 && "Easy to remember, improves communication"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CENTER IMAGE */}
     {/* MOBILE IMAGE ONLY */}
<div className="flex justify-center items-center sm:hidden">
  <img
    src={iphone}
    alt="VIP Number"
    className="w-[320px] h-[650px] object-cover"
  />
</div>



{/* TABLET + DESKTOP IMAGE ONLY */}
<div className="hidden sm:flex justify-center items-center md:mt-4">
  <img
    src={iphone}
    alt="VIP Number"
    className="w-[330px] md:w-[350px] lg:w-[400px] object-contain"
  />
</div>


      {/* RIGHT CARD */}
      <div className="flex-1 mt-2 sm:mt5  md:mt-28 bg-white border-2 border-dotted border-[#17565D] rounded-xl p-4 md:p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-[#17565D] mb-3">
          Building <span className="text-[#F5C037]">Long-Term</span> Relationships
        </h2>

        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          At NumberATM, we focus on trust, quality service, and customer satisfaction.
        </p>

        <div className="space-y-3">
          {["Customer Loyalty", "Referral Growth", "Transparent Service"].map((t, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="text-[#F5C037] font-bold text-xl">{i + 1}.</span>
              <div>
                <h4 className="font-bold text-[#17565D] text-sm sm:text-base">{t}</h4>
                <p className="text-gray-600 text-sm">
                  {points[i]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>

  </div>
</section>


    </section>
    </>
  );
}
