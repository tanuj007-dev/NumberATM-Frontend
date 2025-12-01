import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const AnimatedStoreLink = ({toggleMenu}) => {
  const text = "Store";
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % text.length);
    }, 250); // Speed of the wave
    return () => clearInterval(interval);
  }, [text.length]);

  return (
    <Link
      to="/numerology-vip-numbers"
      onClick={toggleMenu}
      className="relative block px-1 bg-[#17565DE6] mt-4 px-4 font-semibold text-gray-700 transition duration-300 transform hover:scale-105"
    >
      <span className="absolute inset-0  *: rounded-full opacity-100 blur-lg animate-pulse -z-10" />
      {text.split("").map((char, i) => (
        <span
          key={i}
          className={`inline-block transition-all duration-200 ${
            i === activeIndex ? "text-orange-500 -translate-y-1" : "text-white"
          }`}
        >
          {char}
        </span>
      ))}
    </Link>
  );
};

export default AnimatedStoreLink;
