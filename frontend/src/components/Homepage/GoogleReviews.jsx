import { useRef } from "react";
import google from "../../assets/google.avif";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

const reviews = [
  {
    name: "Gaurav Gautam",
    review:
      "I have purchased few numbers and have recommended my friends for the same. One of the best service without any hidden charge and hurdles.",
    rating: 5,
    profileLetter: "G",
  },
  {
    name: "Sanjith Verma",
    review:
      "Excellent and genuine service. We can trust blindly without any doubts. A single destination for all your fancy numbers.",
    rating: 5,
    profileLetter: "S",
  },
  {
    name: "Kanishk Sanduja",
    review:
      "I find this site very good and value for money. You’ll get the best options and fair prices. Highly recommended!",
    rating: 5,
    profileLetter: "K",
  },
  {
    name: "Abhishek Khurana",
    review:
      "I’ve been dealing with Ashish for 4 years — always genuine, transparent, and reliable!",
    rating: 5,
    profileLetter: "A",
  },
  {
    name: "Vipul Mahajan",
    review:
      "Fast, reliable, and hassle-free service. Ashish gets any number-related work done instantly!",
    rating: 5,
    profileLetter: "V",
  },
  {
    name: "Puneet Kakkar",
    review:
      "Trustworthy team. Got 2 VIP numbers from them at fantastic deals. Highly recommended!",
    rating: 5,
    profileLetter: "P",
  },
  {
    name: "Ashish Mantri",
    review:
      "Ashish Yadav is one of the most genuine and professional people I’ve met. Fully satisfied.",
    rating: 5,
    profileLetter: "AM",
  },
  {
    name: "Hitesh Kumar",
    review:
      "Honesty and commitment — Ashish always delivers! Best VIP number service in India.",
    rating: 5,
    profileLetter: "H",
  },
  {
    name: "Ashwin Singh",
    review:
      "Superb experience. Home delivery done, sim activation on time. Great customer service!",
    rating: 5,
    profileLetter: "AS",
  },
  {
    name: "Rohit Sharma",
    review:
      "Amazing service quality and genuine dealings. Got my premium number delivered right on time with perfect activation.",
    rating: 5,
    profileLetter: "R",
  },
  {
    name: "Priya Patel",
    review:
      "Outstanding customer support and transparent pricing. The entire process was smooth and hassle-free.",
    rating: 5,
    profileLetter: "P",
  },
  {
    name: "Amit Kumar",
    review:
      "Best place to get VIP numbers. Professional service and genuine advice throughout the process.",
    rating: 5,
    profileLetter: "AK",
  },
  {
    name: "Sneha Reddy",
    review:
      "Excellent experience from selection to delivery. Highly recommended for anyone looking for fancy numbers.",
    rating: 5,
    profileLetter: "S",
  },
  {
    name: "Vikas Jain",
    review:
      "Trustworthy and reliable service. Got exactly what I wanted at the best price in the market.",
    rating: 5,
    profileLetter: "V",
  },
  {
    name: "Meera Singh",
    review:
      "Fantastic service quality. The team is very professional and delivers on their promises.",
    rating: 5,
    profileLetter: "M",
  },
  {
    name: "Rajesh Gupta",
    review:
      "Smooth process and great customer service. Will definitely recommend to friends and family.",
    rating: 5,
    profileLetter: "RG",
  },
  {
    name: "Anita Desai",
    review:
      "Perfect service for getting premium mobile numbers. Transparent dealings and timely delivery.",
    rating: 5,
    profileLetter: "A",
  },
  {
    name: "Suresh Kumar",
    review:
      "Excellent platform for fancy numbers. Professional approach and genuine service quality.",
    rating: 5,
    profileLetter: "SK",
  },
  {
    name: "Kavita Sharma",
    review:
      "Outstanding experience. Got my VIP number with perfect documentation and activation support.",
    rating: 5,
    profileLetter: "K",
  },
];

// ⭐ Single Review Card Component
const ReviewCard = ({ review }) => (
  <div className="border border-orange-400 p-5 rounded-xl shadow-md bg-white flex flex-col max-h-[220px] mb-1 sm:mb-4">
    <div className="flex items-center mb-3 pb-3 border-b border-gray">
      <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center text-lg font-bold">
        {review.profileLetter}
      </div>
      <div>
        <h3 className="ml-3 text-sm sm:text-lg font-semibold text-gray-900 mb-0">{review.name}</h3>
        <div className="flex ml-3">
          {Array.from({ length: review.rating }).map((_, i) => (
            <span key={i} className="text-yellow-500 text-lg leading-[0.75rem]">★</span>
          ))}
        </div>
      </div>
      <img src={google} alt="Google" className="ml-auto w-6 h-6" />
    </div>



    <p className="text-gray-700 text-sm">{review.review}</p>
  </div>
);

// ⭐ Main Component
const GoogleReviewSlider = () => {
  const swiperRef1 = useRef(null);
  const swiperRef2 = useRef(null);

  return (
    <div className="px-4 mx-auto py-6 sm:py-14 bg-[#F3F9FB]">
      {/* Heading */}
      <div className="text-center mb-10">
        <p className="text-teal-600 font-semibold text-sm sm:text-lg">Client Feedback</p>
        <h2 className="text-xl md:text-3xl font-bold text-gray-800">
          What They Say After Using Our Product
        </h2>
      </div>

      {/* Row 1 - Left to Right */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          reverseDirection: false,
        }}
        speed={2000}
        allowTouchMove={false}
        breakpoints={{
          640: { slidesPerView: 1.2 },
          768: { slidesPerView: 2.5 },
          1024: { slidesPerView: 3.5 },
        }}
        onSwiper={(swiper) => (swiperRef1.current = swiper)}
      >
        {reviews.map((review, i) => (
          <SwiperSlide key={i}>
            <ReviewCard review={review} />
          </SwiperSlide>
        ))}
      </Swiper>
      <br />
      {/* Row 2 - Right to Left */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          reverseDirection: true,
        }}
        speed={2200}
        allowTouchMove={false}
        breakpoints={{
          640: { slidesPerView: 1.2 },
          768: { slidesPerView: 2.5 },
          1024: { slidesPerView: 3.5 },
        }}
        onSwiper={(swiper) => (swiperRef2.current = swiper)}
      >
        {reviews.map((review, i) => (
          <SwiperSlide key={i + 100}>
            <ReviewCard review={review} />
          </SwiperSlide>
        ))}
      </Swiper>
      <br />
      {/* Row 3 - Left to Right */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          reverseDirection: false,
        }}
        speed={2000}
        allowTouchMove={false}
        breakpoints={{
          640: { slidesPerView: 1.2 },
          768: { slidesPerView: 2.5 },
          1024: { slidesPerView: 3.5 },
        }}
        onSwiper={(swiper) => (swiperRef1.current = swiper)}
      >
        {reviews.map((review, i) => (
          <SwiperSlide key={i}>
            <ReviewCard review={review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default GoogleReviewSlider;
