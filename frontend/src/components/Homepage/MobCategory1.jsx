import React from "react";
import { FaChevronRight, FaChevronUp, FaRupeeSign } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const MobCategory1 = () => {
  // Reusable component for category boxes
  const CategoryBox = ({ title, bgColor, textColor, description, arrowColor }) => {
    const backgroundClass = bgColor;

    const textClass = textColor === "white" ? "text-white" : "text-[#333333]";
    const arrowBg = arrowColor === "dark" ? "bg-[#17565D]" : "bg-[#F5C037]";
    const arrowIconColor =
      arrowColor === "dark" ? "text-[#f5C037]" : "text-[#17565D]";

    return (
      <div
        className={`bg-[url(./assets/img1.png)] bg-cover bg-bottom shadow-[0px_3px_8px_rgba(0,0,0,0.24)]`}
      >

        <div
          className={`relative p-8 rounded-xl h-[220px] w-full flex flex-col items-start justify-start transition-transform duration-300 hover:scale-[1.02] ${backgroundClass}`}
      >
        
  <h2
            className={`text-2xl font-semibold top-2 text-left leading-snug ${textClass}`}
          >
            {title}
          </h2>
 {/* ✅ Description added here */}
        <p className={`mt-2 text-[15px] font-medium ${textClass}`}>
          {description}
        </p>
          <button
            className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rounded-lg ${arrowBg} flex items-center justify-center shadow-md`}
          >
            <FaChevronUp size={20} className={arrowIconColor} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="m-6 p-0 sm:p-6">
      <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {/* Introductory Text Block */}
        <div className="flex flex-col items-start justify-start p-0 sm:p-4">
          {/* <h2 className="w-full text-lg text-[#17565D] font-semibold tracking-wider text-center sm:text-left">
            Our Extensive Inventory
          </h2> */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold w-full mt-1 text-[#333333] text-center sm:text-left">
           How It Works
          </h1>
          <p className="w-full text-[#666666] font-semibold text-xl text-center sm:text-left">
            From selection to delivery, our 5-step process makes getting your VIP number effortless and reliable
          </p>
        </div>

        {/* Ultra-premium eight-zero combinations */}
     <CategoryBox
  title="Selection"
  description="Send us a ‘Hi’ on WhatsApp at 97222-97222 to get a list of VIP numbers."
  bgColor=""
  textColor="dark"
  arrowColor="dark"
/>

<CategoryBox
  title="Availability"
  description="Confirm the availability of your new VIP number."
  bgColor="bg-[#17565DE6]"
  textColor="white"
  arrowColor="light"
/>

<CategoryBox
  title="Booking"
  description="Book your selected number with a quick advance payment using Paytm."
  bgColor=""
  textColor="dark"
  arrowColor="dark"
/>

<CategoryBox
  title="Schedule"
  description="Our team will call you to fix an appointment as per your convenience."
  bgColor="bg-[#17565DE6]"
  textColor="white"
  arrowColor="yellow"
/>

<CategoryBox
  title="Delivery"
  description="Your VIP number is delivered on time—quick and hassle-free."
  bgColor=""
  textColor="dark"
  arrowColor="dark"
/>


      </div>


      <div className="sm:hidden">
        {/* Introductory Text Block */}
        <div className="flex flex-col items-start justify-start p-0 sm:p-4">
          <h2 className="w-full text-lg text-[#17565D] font-semibold tracking-wider text-center sm:text-left">
            Our Extensive Inventory
          </h2>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold w-full mt-1 text-[#333333] text-center sm:text-left">
            Mobile Number <br /> Categories
          </h1>
          <p className="w-full text-[#666666] text-center sm:text-left">
            Our vip mobile number list encompasses:
          </p>
        </div>




        <div className="relative w-full max-w-[95vw] mx-auto py-4 sm:py-16">
 
          <Swiper
            modules={[Autoplay, Pagination]}
            navigation={{ prevEl: ".prev-sl", nextEl: ".next-sl" }}
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{delay:300,disableOnInteraction:true}}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            loop={true}
            grabCursor={true}
            onSwiper={(swiper) => {
              setTimeout(() => {
                if (swiper.params.navigation) {
                  swiper.navigation.init();
                  swiper.navigation.update();
                }
              });
            }}
          >
            {/* Slide 1 */}
            <SwiperSlide>
              <div className="bg-[url(./assets/img1.png)] bg-cover bg-bottom shadow-[0px_3px_8px_rgba(0,0,0,0.24)]  my-8">
                <div className="relative p-12 rounded-xl w-full flex items-center justify-center transition-transform duration-300 hover:scale-[1.02]">
                  <h2 className="text-xl font-semibold text-center text-black leading-snug">
                    Ultra-premium eight-zero combinations
                  </h2>
                  <button className="absolute bottom-1/2 right-3 transform translate-x-1/2 translate-y-1/2 rounded-lg flex items-center justify-center bg-[#17565D] text-[#F5C037] shadow-md">
                    <FaChevronRight size={20} />
                  </button>
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 2 */}
            <SwiperSlide>
              <div className="bg-[url(./assets/img1.png)] bg-cover bg-bottom shadow-[0px_3px_8px_rgba(0,0,0,0.24)] my-8">
                <div className="relative p-12 rounded-xl w-full flex items-center justify-center transition-transform duration-300 hover:scale-[1.02] bg-[#17565DE6]">
                  <h2 className="text-xl font-semibold text-center text-white leading-snug">
                    Lucky seven sequences
                  </h2>
                  <button className="absolute bottom-1/2 right-3 transform translate-x-1/2 translate-y-1/2 rounded-lg flex items-center justify-center bg-white text-[#17565D] shadow-md">
                    <FaChevronRight size={20} />
                  </button>
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 3 */}
            <SwiperSlide>
              <div className="bg-[url(./assets/img1.png)] bg-cover bg-bottom shadow-[0px_3px_8px_rgba(0,0,0,0.24)] my-8">
                <div className="relative p-12 rounded-xl w-full flex items-center justify-center transition-transform duration-300 hover:scale-[1.02]">
                  <h2 className="text-xl font-semibold text-center text-black leading-snug">
                    Business-friendly patterns
                  </h2>
                  <button className="absolute bottom-1/2 right-3 transform translate-x-1/2 translate-y-1/2 rounded-lg flex items-center justify-center bg-[#17565D] text-[#F5C037] shadow-md">
                    <FaChevronRight size={20} />
                  </button>
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 4 */}
            <SwiperSlide>
              <div className="bg-[url(./assets/img1.png)] bg-cover bg-bottom shadow-[0px_3px_8px_rgba(0,0,0,0.24)] my-8">
                <div className="relative p-12 rounded-xl w-full flex items-center justify-center transition-transform duration-300 hover:scale-[1.02] bg-[#17565DE6]">
                  <h2 className="text-xl font-semibold text-center text-white leading-snug">
                    Personal milestone numbers
                  </h2>
                  <button className="absolute bottom-1/2 right-3 transform translate-x-1/2 translate-y-1/2 rounded-lg flex items-center justify-center bg-[#F5C037] text-[#17565D] shadow-md">
                    <FaChevronRight size={20} />
                  </button>
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 5 */}
            <SwiperSlide>
              <div className="bg-[url(./assets/img1.png)] bg-cover bg-bottom shadow-[0px_3px_8px_rgba(0,0,0,0.24)] my-8">
                <div className="relative p-12 rounded-xl w-full flex items-center justify-center transition-transform duration-300 hover:scale-[1.02]">
                  <h2 className="text-xl font-semibold text-center text-black leading-snug">
                    Astrological alignment options
                  </h2>
                  <button className="absolute bottom-1/2 right-3 transform translate-x-1/2 translate-y-1/2 rounded-lg flex items-center justify-center bg-[#17565D] text-[#F5C037] shadow-md">
                    <FaChevronRight size={20} />
                  </button>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>



      </div>



     
    </div>

  );
};

export default MobCategory1;
