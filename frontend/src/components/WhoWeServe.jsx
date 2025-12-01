 "use client";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

export default function WhoWeServe() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const stats = [
  {
    title: "Personal Clients",
    desc: "Many individuals across India rely on NumberATM to secure a custom phone number that resonates with their personality or interests. Whether it’s a lucky number, a repeated digit pattern, or a memorable sequence, we empower personal users to stand out with their phone numbers."
  },
  {
    title: "Businesses & Corporates",
    desc: "Businesses rely heavily on branding, and a VIP or vanity phone number is a crucial element in their marketing strategy. Our corporate clientele includes small businesses, startups, and established companies that use custom numbers to enhance their branding and make it easier for clients to remember their contact details."
  },
  {
    title: "Professionals",
    desc: "Professionals in industries such as real estate, law, finance, and healthcare often choose VIP numbers for their exclusive appeal. A memorable phone number not only reflects professionalism but also aids in networking and client acquisition."
  },
  {
    title: "Celebrities, Influencers, and High-Profile Individuals",
    desc: "Our VIP clientele includes celebrities, influencers, and high-profile individuals from various fields who use custom phone numbers to maintain privacy, exclusivity, and a unique identity."
  }
];


  // ✅ Animation Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

return (
  <div ref={ref} className="bg-[url(./assets/bg.jpg)] bg-cover bg-center">
    <div className="w-full py-8 sm:py-14 bg-[#17565DD9]">

      {/* Heading */}
      <h1 className="text-2xl sm:text-4xl font-semibold text-center text-white px-4 [text-shadow:2px_2px_2px_#000]">
        Who We Serve
      </h1>

      {/* Cards Grid */}
      <div
        className="
          max-w-6xl mx-auto mt-8
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-2
          gap-4 sm:gap-6
          px-3 sm:px-4
        "
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            whileHover={{ scale: 1.03 }}
            className="
              bg-black/40 backdrop-blur-md 
              p-4 sm:p-5 md:p-6 
              rounded-xl 
              shadow-lg 
              border border-[#f5c037]
              transition-transform
            "
          >
            {/* Title */}
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#f5c037] leading-tight [text-shadow:1px_1px_2px_#000]">
              {stat.title}
            </h3>

            {/* Description */}
            <p className="text-white mt-2 text-sm sm:text-base leading-relaxed [text-shadow:1px_1px_2px_#000]">
              {stat.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Bottom Text */}
      <p className="text-lg sm:text-xl text-center pt-8 text-[#f5c037] font-semibold">
        Your Trusted Partner for VIP Numbers
      </p>

    </div>
  </div>
);

}
