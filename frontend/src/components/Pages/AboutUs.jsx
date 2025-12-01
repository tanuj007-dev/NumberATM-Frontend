import { useContext, useEffect, useState } from "react";
import UserAxiosAPI from "../../api/userAxiosAPI";
import("quill/dist/quill.snow.css");
import { Appstate } from "../../App";
import aboutus from "../../assets/about1.png";
import atmcard from "../../assets/atm.png"
import { FaPhoneAlt } from "react-icons/fa";
import Marquee from "../marquee/Marquee.jsx";
import Counter1 from "../Homepage/Counter1.jsx";
const AboutUs = () => {
  const [meta, setMeta] = useState({ title: "", tags: "", description: "", content:"" });
  const {getOptimizedImage} = useContext(Appstate);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const axios = UserAxiosAPI();
  useEffect(() => {
    axios.get(`/meta/About Us`).then(({ data }) => {
      setMeta(data || { title: "", tags: "", description: "",  content:"" });
    });
  }, []);
  return (
    <>
      {/* <Helmet> 
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.tags} />
      </Helmet> */}
      <div className=" text-[#17565D] bg-white  w-full min-h-screen ">
      {meta?.breadcum&&<img className='my-3 md:mb-8 w-full' src={getOptimizedImage(meta?.breadcum)} />}
       <div className="w-full flex justify-center">
        <div
          className="w-full max-w-[1300px]  /* Increased width */
      mx-auto
      bg-[#E4F0EE] 
      rounded-2xl 
      px-8 sm:px-12 md:px-16  
      py-6 sm:py-10 md:py-14
      flex flex-col md:flex-row 
      items-center justify-between 
      gap-10 relative"
        >
          {/* LEFT SIDE */}
          <div className="w-full md:w-1/2 space-y-3 text-center md:text-left">
            <h1 className="text-[#17565D]  font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight">
              About Us
            </h1>

            <p
              className="text-[#17565D] text-[15px]  md:text-[20px] leading-[1.3] text-justify max-w-[520px] md:max-w-[580px]
 mx-auto md:mx-0"
            >
              NumberATM is dedicated to making premium mobile numbers
              accessible, simple, and reliable for everyone. Our goal is to
              remove the confusion from choosing a VIP number and replace it
              with a smooth, transparent experience. With verified listings,
              genuine pricing, and trusted customer support, we help individuals
              and businesses secure their perfect VIP number effortlessly.
            </p>
          </div>

          {/* RIGHT SIDE CARD */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="w-[300px] sm:w-[350px] md:w-[420px] rounded-xl  overflow-hidden shadow-2xl">
              <img
                src={atmcard}
                alt="ATM Card"
                className="w-full h-full object-cover shadow-xl md:scale-[1.05]"
              />
            </div>
          </div>
        </div>
      </div>
 <section className="px-4 sm:px-6 md:px-12 lg:px-16 py-10 bg-white w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8 items-start">
          {/* LEFT IMAGE */}
          <div className="w-full">
            <img
              src={aboutus}
              alt="About NumberATM"
              className="
          w-full 
          h-50          /* Mobile */
          sm:h-52       /* Small screens */
          md:h-64       /* Tablets */
          lg:h-80       /* Desktop */
          xl:h-[400px]  /* Larger desktop */
          object-cover 
          rounded-2xl 
          shadow-md
        "
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="space-y-4 text-gray-700">
            <p className="text-sm sm:text-base leading-relaxed">
              NumberATM is a Delhi-based business that strives to provide
              easy-to-remember VIP phone numbers for anyone and everyone—from
              private individuals to the biggest of companies.
            </p>

            <p className="text-sm sm:text-base leading-relaxed">
              It was founded in <span className="font-semibold">2010</span> by
              <span className="font-semibold"> Ashish Yadav</span>, who was
              personally passionate about VIP numbers.
            </p>

            <p className="text-sm sm:text-base leading-relaxed">
              Our philosophy is simple: take a complicated process and make it
              as easy and seamless as possible for our customers. You can
              acquire and start using your new VIP number within hours.
            </p>

            <p className="text-sm sm:text-base leading-relaxed">
              We understand that buying a VIP number can feel overwhelming.
              That's why we are always ready to guide you through the entire
              process.
            </p>

            <p className="text-sm sm:text-base leading-relaxed">
              If you have any questions or want more information about the
              thousands of VIP phone numbers we offer, feel free to contact us
              at:
            </p>

            <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#17565D] flex items-center gap-2">
              <FaPhoneAlt /> +91 97111 97111
            </p>

            <p className="text-sm sm:text-base md:text-lg leading-relaxed">
              Easy to remember, right? A premium number like this can be yours
              in almost no time at all.
            </p>

            <p className="text-sm sm:text-base md:text-lg font-semibold">
              GST: 06AAECV9458Q2ZB
            </p>
          </div>
        </div>
      </section>
      {/* 2nd section meta breadcum data */}
       {/* <section className="px-4 sm:px-6 md:px-10 lg:px-12 py-2 bg-white w-full">
  <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 items-center">
    
    {/* FULL-SIZE IMAGE (More Height + Clean Look) */}
    {/* <div className="w-full">
      <img
        src={aboutus}
        alt="About NumberATM"
        className="
          w-full 
          h-48 sm:h-56 md:h-64 lg:h-72 xl:h-96 
          object-cover 
          rounded-xl 
          shadow-md
        "
      />
    </div> */}

    {/* TEXT SECTION */}
    {/* <div className="py-2 flex flex-col justify-start">
      {meta.content === "" ? (
        <>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            Welcome to <span className="text-yellow-500">Number ATM Store!</span>
          </h1>

         <div className="space-y-1 text-gray-700">
            <p className="text-sm sm:text-base leading-relaxed">
              NumberATM is a Delhi-based business that strives to provide
              easy-to-remember VIP phone numbers for anyone and everyone—from
              private individuals to the biggest of companies.
            </p>

            <p className="text-sm sm:text-base leading-relaxed">
              It was founded in <span className="font-semibold">2010</span> by
              <span className="font-semibold"> Ashish Yadav</span>, who was
              personally passionate about VIP numbers.
            </p>

            <p className="text-sm sm:text-base leading-relaxed">
              Our philosophy is simple: take a complicated process and make it
              as easy and seamless as possible for our customers. You can
              acquire and start using your new VIP number within hours.
            </p>

            <p className="text-sm sm:text-base leading-relaxed">
              We understand that buying a VIP number can feel overwhelming.
              That's why we are always ready to guide you through the entire
              process.
            </p>

            <p className="text-sm sm:text-base leading-relaxed">
              If you have any questions or want more information about the
              thousands of VIP phone numbers we offer, feel free to contact us
              at:
            </p>

            <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#17565D] flex items-center gap-2">
              <FaPhoneAlt /> +91 97111 97111
            </p>

            <p className="text-sm sm:text-base md:text-lg leading-relaxed">
              Easy to remember, right? A premium number like this can be yours
              in almost no time at all.
            </p>

            <p className="text-sm sm:text-base md:text-lg font-semibold">
              GST: 06AAECV9458Q2ZB
            </p>
          </div>
        </>
      ) : (
        <div className="rounded-md">
          <div
            className="ql-editor ql-editor-custom"
            dangerouslySetInnerHTML={{ __html: meta.content }}
          />
        </div>
      )}
    </div>
  </div> */} 
{/* </section> */}

      <Marquee />
       <Counter1 />
         </div> 
     
      </>
  );
};

export default AboutUs;
