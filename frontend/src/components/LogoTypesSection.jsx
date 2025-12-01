 "use client";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

export default function StatsCounter() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const stats = [
    { label: "Private individuals and small businesses" },
    { label: "High-profile individuals and entrepreneurs" },
    { label: "High-net-worth individuals and investors" },
    { label: "Entertainment and sports professionals" },
    { label: "Law firms and legal practitioners" },
    { label: "Private equity firms and investment groups" },
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
    <div ref={ref} className="bg-[url(./assets/bg.jpg)] bg-contain bg-center">
      <div className="relative w-full py-8 sm:py-16 bg-[#17565DE6]">

        <h1 className="text-xl sm:text-3xl font-semibold text-center text-white px-4 [text-shadow:2px_2px_2px_#000]">
 We provide these vanity phone numbers to:
        </h1>
        
        {/* ✅ Cards with animations */}
        <div className="relative max-w-6xl mt-8 mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 text-center px-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              whileHover={{ scale: 1.08 }}
              className="bg-black/50 h-[130px] backdrop-blur-md p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center transition-transform duration-300 border border-[#f5c037]"
            >
              <p className="text-white text-sm sm:text-2xl mt-2 [text-shadow:2px_2px_2px_#000]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
