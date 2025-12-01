import React, { useRef, useState, useEffect, Suspense } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import TrustedByElites from "./Homepage/TrustedBy";
import NumberAtm from "./Homepage/NumberAtm";
import Vip from "./Homepage/Vip";
import MobCategory from "./Homepage/MobCategory";
import TrackDrivenSol from "./Homepage/TrackDrivenSol";
import UserAxiosAPI from "../api/userAxiosAPI";
import "lite-youtube-embed/src/lite-yt-embed.css";
import { YouTubeFacade } from "./YoutubeFacade";
import TawkWidget from "./TawkWidget";
import Mbanner1 from "../assets/banner1.png";
import Mbanner2 from "../assets/banner2.png";
import WhyHigh from "./Homepage/WhyHigh";
import Marquee from "./marquee/Marquee";
import StatsCounter from "./Homepage/Counter";
import PartnersSection from "./Homepage/PartnerSection";
import OfferSection from "./Homepage/OfferSection";

// Lazy loaded components
const PremiumVIPNumbers = React.lazy(() => import("./Homepage/Shop"));
const HowItWorks = React.lazy(() => import("./Homepage/HowItWorks"));
const VIPNumberScroller = React.lazy(() => import("./Homepage/NumberSlider"));
const FeaturedVipNumbers = React.lazy(() =>
  import("./Homepage/FeaturedNumbers")
);
const ReviewSlider = React.lazy(() => import("./Homepage/GoogleReviews"));

const PosterSkeleton = () => (
  <div className="w-full max-h-[550] md:max-h-[700] bg-slate-200 animate-pulse rounded-md" />
);

function HomePage() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const sliderRef = useRef(null);
  const sliderWrapperRef = useRef(null);
  const youtubePlayers = useRef({});
  const axios = UserAxiosAPI();

  const [posters, setPosters] = useState([]);
  const [meta, setMeta] = useState({
    title: "",
    tags: "",
    description: "",
    content: "",
  });
  const [showBelowFold, setShowBelowFold] = useState(true);

  const getOptimizedImage = (url, width) => {
    if (!url) return "";
    return url.replace(
      "/upload/",
      `/upload/c_fill,w_${width},dpr_auto,f_auto,q_auto/`
    );
  };

  const stopAllVideos = () => {
    document.querySelectorAll("video").forEach((video) => video.pause());
    Object.values(youtubePlayers.current).forEach((player) =>
      player?.pauseVideo?.()
    );
  };

  const initializeYouTubePlayers = () => {
    posters.forEach((poster, index) => {
      if (poster.mediaType === "youtube") {
        const videoId = poster.image.split("v=")[1];
        if (!youtubePlayers.current[index]) {
          youtubePlayers.current[index] = new window.YT.Player(
            `youtube-player-${index}`,
            {
              events: {
                onStateChange: (event) =>
                  handleYouTubeStateChange(event, index),
              },
            }
          );
        }
      }
    });
  };

  const loadYouTubeScript = () => {
    if (window.YT || document.getElementById("youtube-api-script")) return;

    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    script.id = "youtube-api-script";
    document.body.appendChild(script);

    script.onload = () => {
      if (window.YT) {
        initializeYouTubePlayers();
      }
    };
  };

  const handleYouTubeStateChange = (event, index) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      sliderRef.current?.slickPause?.();
    } else if (
      [window.YT.PlayerState.PAUSED, window.YT.PlayerState.ENDED].includes(
        event.data
      )
    ) {
      sliderRef.current?.slickPlay?.();
    }
  };

  const fetchPosters = async () => {
    try {
      const res = await axios.get("/posters");
      setPosters(res.data);

      // Preload first poster image for LCP
      if (res.data.length > 0 && res.data[0].mediaType === "image") {
        const preloadLink = document.createElement("link");
        preloadLink.rel = "preload";
        preloadLink.as = "image";
        preloadLink.href = getOptimizedImage(res.data[0].image);
        preloadLink.fetchPriority = "high";
        document.head.appendChild(preloadLink);
      }
    } catch (error) {
      console.error("Error fetching posters:", error);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchPosters();

    // IntersectionObserver to defer YouTube API
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadYouTubeScript();
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (sliderWrapperRef.current) {
      observer.observe(sliderWrapperRef.current);
    }

    // Load meta content
    axios.get(`/meta/Home`).then(({ data }) => setMeta(data || {}));
  }, []);

  useEffect(() => {
    // Load below-the-fold content after 2 seconds
    const timeout = setTimeout(() => setShowBelowFold(true), 2000);
    return () => clearTimeout(timeout);
  }, []);

  const CustomPrevArrow = () => (
    <button
      ref={prevRef}
      aria-label="Previous"
      className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-[#F3FBFA] text-black rounded-full shadow"
    >
      <FaChevronLeft />
    </button>
  );

  const CustomNextArrow = () => (
    <button
      ref={nextRef}
      aria-label="Next"
      className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-2 
    bg-[#F3FBFA] text-black rounded-full shadow"
    >
      <FaChevronRight />
    </button>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full flex justify-center items-center px-3 py-3">
        <div
          ref={sliderWrapperRef}
          className="
    w-full 
    max-w-full  
    relative 
    rounded-xl 
    overflow-hidden 
    px-2                          last:
    sm:px-0
  "
        >
          {/* Left Arrow */}
          <button
            ref={prevRef}
            aria-label="Previous"
            className="
      absolute left-2 top-1/2 -translate-y-1/2 
      z-10 p-2 sm:p-3 
      bg-white text-black 
      rounded-full shadow 
      hover:bg-gray-100 transition
    "
          >
            <FaChevronLeft size={18} className="sm:size-[20px]" />
          </button>

          {/* Right Arrow */}
          <button
            ref={nextRef}
            aria-label="Next"
            className="
      absolute right-2 top-1/2 -translate-y-1/2 
      z-10 p-2 sm:p-3 
      bg-white text-black 
      rounded-full shadow 
      hover:bg-gray-100 transition
    "
          >
            <FaChevronRight size={18} className="sm:size-[20px]" />
          </button>

          {/* Swiper */}
          <Swiper
            modules={[Autoplay, Navigation]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            speed={600}
            loop={true}
            slidesPerView={1}
            onSwiper={(swiper) => {
              setTimeout(() => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              });
            }}
            className="rounded-xl overflow-hidden shadow-lg"
          >
            {/* MOBILE BANNERS */}
              {window.innerWidth < 500
              ? [Mbanner1, Mbanner2].map((phone, index) => (
                  <SwiperSlide key={index}>
                    <div className="w-full flex justify-center items-center px-1 py-2">
                      <img
                        src={phone}
                        alt={`Mobile Banner ${index + 1}`}
                        className="
                w-full 
                h-[400px]             
                rounded-xl 
                object-cover 
                shadow-sm
              "
                      />
                    </div>
                  </SwiperSlide>
                ))
              : !posters?.length
              ? Array.from({ length: 2 }).map((_, i) => (
                  <SwiperSlide key={i}>
                    <PosterSkeleton />
                  </SwiperSlide>
                ))
              : /* DESKTOP BANNERS */
                posters.map((poster, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={getOptimizedImage(poster.image, 1761)}
                      alt={`Slide ${index + 1}`}
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                      fetchpriority={index === 0 ? "high" : "auto"}
                      className="
              w-full 
              h-[400px] sm:h-[550px] md:h-[500px] 
              object-cover 
              bg-[#F3FBFA]
              rounded-xl
            "
                    />
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>
      </div>

      <OfferSection />

      {/* <Suspense fallback={<div className='flex justify-center items-center w-full'>Loading...</div>}> */}
      <PremiumVIPNumbers limit={40} />
      {/* </Suspense> */}

      {showBelowFold && (
        <>
          {/* <Suspense fallback={<div className='flex justify-center items-center w-full'>Loading...</div>}>
            <FeaturedVipNumbers />
          </Suspense> */}
          {/* <Suspense fallback={<div className='flex justify-center items-center w-full'>Loading...</div>}>
            <VIPNumberScroller pos={1} />
          </Suspense> */}
          <Suspense
            fallback={
              <div className="flex justify-center items-center w-full">
                Loading...
              </div>
            }
          >
            <HowItWorks />
          </Suspense>
          <Suspense
            fallback={
              <div className="flex justify-center items-center w-full">
                Loading...
              </div>
            }
          >
            <WhyHigh />
          </Suspense>
          {/* <Suspense fallback={<div className='flex justify-center items-center w-full'>Loading...</div>}>
            <VIPNumberScroller />
          </Suspense> */}
          <Suspense
            fallback={
              <div className="flex justify-center items-center w-full">
                Loading...
              </div>
            }
          >
            <TrustedByElites />
          </Suspense>
          <Suspense
            fallback={
              <div className="flex justify-center items-center w-full">
                Loading...
              </div>
            }
          >
            <NumberAtm />
          </Suspense>
          <Suspense
            fallback={
              <div className="flex justify-center items-center w-full">
                Loading...
              </div>
            }
          >
            <Vip />
          </Suspense>
          <Suspense
            fallback={
              <div className="flex justify-center items-center w-full">
                Loading...
              </div>
            }
          >
            <ReviewSlider />
          </Suspense>
          <Suspense
            fallback={
              <div className="flex justify-center items-center w-full">
                Loading...
              </div>
            }
          >
            <MobCategory />
          </Suspense>
          <Suspense
            fallback={
              <div className="flex justify-center items-center w-full">
                Loading...
              </div>
            }
          >
            <StatsCounter />
            <Marquee />
          </Suspense>
          {/* <Suspense fallback={<div className='flex justify-center items-center w-full'>Loading...</div>}>
            <TrackDrivenSol />
          </Suspense> */}
          <Suspense
            fallback={
              <div className="flex justify-center items-center w-full">
                Loading...
              </div>
            }
          >
            <PartnersSection />
          </Suspense>
        </>
      )}

      {/* <div className="py-6">
        <div className="ql-editor" dangerouslySetInnerHTML={{ __html: meta.content }} />
      </div> */}
    </div>
  );
}

export default HomePage;



// import React, { useRef, useState, useEffect, Suspense } from "react";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/autoplay";
// import TrustedByElites from "./Homepage/TrustedBy";
// import UserAxiosAPI from "../api/userAxiosAPI";
// import "lite-youtube-embed/src/lite-yt-embed.css";
// import { YouTubeFacade } from "./YoutubeFacade";
// import TawkWidget from "./TawkWidget";
// import FamilyPack from "./FamilyPackNumber/FamilyPackNumber";

// // Lazy loaded components
// const PremiumVIPNumbers = React.lazy(() => import("./Homepage/Shop"));
// const HowItWorks = React.lazy(() => import("./Homepage/HowItWorks"));
// const VIPNumberScroller = React.lazy(() => import("./Homepage/NumberSlider"));
// const FeaturedVipNumbers = React.lazy(() =>
//   import("./Homepage/FeaturedNumbers")
// );
// const ReviewSlider = React.lazy(() => import("./Homepage/GoogleReviews"));

// const PosterSkeleton = () => (
//   <div className="w-full max-h-[550] md:max-h-[700] bg-slate-200 animate-pulse rounded-md" />
// );

// function HomePage() {
//   const prevRef = useRef(null);
//   const nextRef = useRef(null);
//   const sliderRef = useRef(null);
//   const sliderWrapperRef = useRef(null);
//   const youtubePlayers = useRef({});
//   const axios = UserAxiosAPI();

//   const [posters, setPosters] = useState([]);
//   const [meta, setMeta] = useState({
//     title: "",
//     tags: "",
//     description: "",
//     content: "",
//   });
//   const [showBelowFold, setShowBelowFold] = useState(false);

//   const getOptimizedImage = (url, width) => {
//     if (!url) return "";
//     return url.replace(
//       "/upload/",
//       `/upload/c_fill,w_${width},dpr_auto,f_auto,q_auto/`
//     );
//   };

//   const stopAllVideos = () => {
//     document.querySelectorAll("video").forEach((video) => video.pause());
//     Object.values(youtubePlayers.current).forEach((player) =>
//       player?.pauseVideo?.()
//     );
//   };

//   const initializeYouTubePlayers = () => {
//     posters.forEach((poster, index) => {
//       if (poster.mediaType === "youtube") {
//         const videoId = poster.image.split("v=")[1];
//         if (!youtubePlayers.current[index]) {
//           youtubePlayers.current[index] = new window.YT.Player(
//             `youtube-player-${index}`,
//             {
//               events: {
//                 onStateChange: (event) =>
//                   handleYouTubeStateChange(event, index),
//               },
//             }
//           );
//         }
//       }
//     });
//   };

//   const loadYouTubeScript = () => {
//     if (window.YT || document.getElementById("youtube-api-script")) return;

//     const script = document.createElement("script");
//     script.src = "https://www.youtube.com/iframe_api";
//     script.async = true;
//     script.id = "youtube-api-script";
//     document.body.appendChild(script);

//     script.onload = () => {
//       if (window.YT) {
//         initializeYouTubePlayers();
//       }
//     };
//   };

//   const handleYouTubeStateChange = (event, index) => {
//     if (event.data === window.YT.PlayerState.PLAYING) {
//       sliderRef.current?.slickPause?.();
//     } else if (
//       [window.YT.PlayerState.PAUSED, window.YT.PlayerState.ENDED].includes(
//         event.data
//       )
//     ) {
//       sliderRef.current?.slickPlay?.();
//     }
//   };

//   const fetchPosters = async () => {
//     try {
//       const res = await axios.get("/posters");
//       setPosters(res.data);

//       // Preload first poster image for LCP
//       if (res.data.length > 0 && res.data[0].mediaType === "image") {
//         const preloadLink = document.createElement("link");
//         preloadLink.rel = "preload";
//         preloadLink.as = "image";
//         preloadLink.href = getOptimizedImage(res.data[0].image);
//         preloadLink.fetchPriority = "high";
//         document.head.appendChild(preloadLink);
//       }
//     } catch (error) {
//       console.error("Error fetching posters:", error);
//     }
//   };

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//     fetchPosters();

//     // IntersectionObserver to defer YouTube API
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting) {
//           loadYouTubeScript();
//           observer.disconnect();
//         }
//       },
//       { rootMargin: "200px" }
//     );

//     if (sliderWrapperRef.current) {
//       observer.observe(sliderWrapperRef.current);
//     }

//     // Load meta content
//     axios.get(`/meta/Home`).then(({ data }) => setMeta(data || {}));
//   }, []);

//   useEffect(() => {
//     // Load below-the-fold content after 2 seconds
//     const timeout = setTimeout(() => setShowBelowFold(true), 2000);
//     return () => clearTimeout(timeout);
//   }, []);

//   const CustomPrevArrow = () => (
//     <button
//       ref={prevRef}
//       aria-label="Previous"
//       className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/20 hover:bg-white/30 text-white rounded-full shadow"
//     >
//       <FaChevronLeft />
//     </button>
//   );

//   const CustomNextArrow = () => (
//     <button
//       ref={nextRef}
//       aria-label="Next"
//       className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/20 hover:bg-white/30 text-white rounded-full shadow"
//     >
//       <FaChevronRight />
//     </button>
//   );

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="w-full flex justify-center items-center px-3 py-3">
//         <div ref={sliderWrapperRef} className="w-full max-w-[95vw] relative">
//           {/* <TawkWidget/> */}
//           <CustomPrevArrow />
//           <CustomNextArrow />
//           <Swiper
//             modules={[Autoplay, Navigation]}
//             autoplay={{ delay: 3000, disableOnInteraction: false }}
//             speed={500}
//             loop
//             slidesPerView={1}
//             navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
//             onBeforeInit={(swiper) => {
//               swiper.params.navigation.prevEl = prevRef.current;
//               swiper.params.navigation.nextEl = nextRef.current;
//             }}
//             onSlideChangeTransitionStart={stopAllVideos}
//             className="rounded-xl overflow-hidden"
//           >
//             {!posters.length
//               ? Array.from({ length: 2 }).map((_, i) => (
//                   <SwiperSlide key={i}>
//                     <PosterSkeleton />
//                   </SwiperSlide>
//                 ))
//               : posters.map((poster, index) => (
//                   <SwiperSlide key={index}>
//                     {poster.mediaType === "image" && (
//                       <img
//                         src={getOptimizedImage(poster.image, 388)} // fallback for desktops
//                         srcSet={`
//     ${getOptimizedImage(poster.image, 388)} 388w,
//     ${getOptimizedImage(poster.image, 768)} 768w,
//     ${getOptimizedImage(poster.image, 1024)} 1024w,
//     ${getOptimizedImage(poster.image, 1200)} 1200w,
//     ${getOptimizedImage(poster.image, 1761)} 1761w
//   `}
//                         sizes="(max-width: 600px) 388px,
//          (max-width: 768px) 768px,
//          (max-width: 1024px) 1024px,
//          (max-width: 1280px) 1200px,
//          1761px"
//                         alt={`Slide ${index + 1}`}
//                         width="1761"
//                         loading={index === 0 ? "eager" : "lazy"}
//                         decoding="async"
//                         fetchpriority={index === 0 ? "high" : "auto"}
//                         className="w-full h-[550] md:h-[700] object-cover"
//                       />
//                     )}
//                     {poster.mediaType === "video" && (
//                       <video
//                         src={poster.image}
//                         width="1761"
//                         height="778"
//                         controls
//                         loop
//                         className="w-full object-cover"
//                         onPlay={() => sliderRef.current?.slickPause?.()}
//                         onPause={() => sliderRef.current?.slickPlay?.()}
//                       />
//                     )}
//                     {poster.mediaType === "youtube" && (
//                       <YouTubeFacade url={poster.image} />
//                     )}
//                   </SwiperSlide>
//                 ))}
//           </Swiper>
//         </div>
//       </div>

//       <Suspense
//         fallback={
//           <div className="flex justify-center items-center w-full">
//             Loading...
//           </div>
//         }
//       >
//         <PremiumVIPNumbers limit={40} />
//       </Suspense>

//       {showBelowFold && (
//         <>
//           {/* <Suspense fallback={<div className='flex justify-center items-center w-full'>Loading...</div>}>
//             <FeaturedVipNumbers />
//           </Suspense>
//           <Suspense fallback={<div className='flex justify-center items-center w-full'>Loading...</div>}>
//             <VIPNumberScroller pos={1} />
//           </Suspense> */}
//           <Suspense
//             fallback={
//               <div className="flex justify-center items-center w-full">
//                 Loading...
//               </div>
//             }
//           >
//             <FamilyPack />
//           </Suspense>
//           <Suspense
//             fallback={
//               <div className="flex justify-center items-center w-full">
//                 Loading...
//               </div>
//             }
//           >
//             <HowItWorks />
//           </Suspense>
//           <Suspense
//             fallback={
//               <div className="flex justify-center items-center w-full">
//                 Loading...
//               </div>
//             }
//           >
//             <VIPNumberScroller />
//           </Suspense>
//           <Suspense
//             fallback={
//               <div className="flex justify-center items-center w-full">
//                 Loading...
//               </div>
//             }
//           >
//             <TrustedByElites />
//           </Suspense>
//           <Suspense
//             fallback={
//               <div className="flex justify-center items-center w-full">
//                 Loading...
//               </div>
//             }
//           >
//             <ReviewSlider />
//           </Suspense>
//         </>
//       )}

//       <div className="py-6">
//         <div
//           className="ql-editor"
//           dangerouslySetInnerHTML={{ __html: meta.content }}
//         />
//       </div>
//     </div>
//   );
// }

// export default HomePage;