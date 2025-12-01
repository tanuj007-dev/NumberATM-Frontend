import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PartnersSection() {
  // 🔥 Dynamically import all images in the folder using Vite's import.meta.glob
  const images = import.meta.glob("../cleintsimg/assets/*.{jpg,jpeg,png,svg}", {
    eager: true,
  });
  const navigate = useNavigate();
  const handleLoadMore = () => {
    navigate("/clientele"); // ✅ Redirect to OurClients.jsx page
  };

  // Convert imported objects into an array of URLs
  const partners = Object.values(images).map((img) => img.default);

  const [visibleCount, setVisibleCount] = useState(10);

  const handleLoadLess = () => setVisibleCount(10);
  // Convert imported objects into an array of URLs

  // ✅ Replace 4th image with 103.jpg
  const image103 = images["../cleintsimg/assets/103.jpg"]?.default;
  if (image103 && partners.length >= 4) {
    partners[3] = image103;
  }

  return (
    <section className="flex-grow pt-20 sm:pt-20 md:pt-24 lg:pt-20">
      <div className="p-10 min-h-screen bg-white text-black flex flex-col items-center">
        {/* Heading */}
        <h1
          className="
  text-[#17565D]
  text-2xl sm:text-3xl md:text-4xl 
  font-extrabold 
  mb-4 sm:mb-6 md:mb-8 
  tracking-wide 
  text-center
"
        >
          Trusted by <span className="text-[#F5C037]">Our Partners</span>
        </h1>

        <p
          className="
  text-gray-600 
  text-sm sm:text-base 
  max-w-xl mx-auto 
  mb-4 sm:mb-8 
  text-center
  leading-snug  
"
        >
          We are proud to have helped these brands achieve success with our expert digital marketing services.
        </p>

        {/* Partner Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 w-full">
          {partners.slice(0, visibleCount).map((logo, index) => (
            <div
              key={index}
              className=" relative bg-transparent bg-opacity-15 rounded-xl shadow-lg transform transition-all hover:scale-105 hover:shadow-lg flex items-center justify-center"
            >
              <img
                src={logo}
                alt={`Partner ${index + 1}`}
                loading="lazy"
                className=" w-auto object-cover transition-opacity duration-300 hover:opacity-80"
              />
            </div>
          ))}
        </div>

        {/* Load More / Load Less Buttons */}
        <div className="mt-8">
          {visibleCount < partners.length ? (
            <button
              onClick={handleLoadMore}
              
              className="bg-transparent text-[#17565D] text-lg py-0 sm:py-2 px-4 sm:px-8 border-2  border-[#17565D] rounded-full hover:bg-[#17565D] hover:text-white"
            >
           Load More
            </button>
          ) : (
            <button
              onClick={handleLoadLess}
              className="bg-transparent text-[#17565D] text-lg py-0 sm:py-2 px-4 sm:px-8 border-2  border-[#17565D] rounded-full hover:bg-[#17565D] hover:text-white"
            >
              Load Less
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
