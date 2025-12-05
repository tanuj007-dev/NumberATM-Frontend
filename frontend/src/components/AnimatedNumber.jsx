import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const AnimatedNumberLink = ({}) => {
  const text = "+91-95111-95111";
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % text.length);
    }, 250); // Speed of the wave
    return () => clearInterval(interval);
  }, [text.length]);

  return (
    <Link
      to="https://wa.me/+919511195111"
      target="_blank"
      className="relative inline-flex px-1 font-semibold text-sm sm:text-lg md:text-xl text-white transition duration-300 transform hover:scale-105"
    >
      <span className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-full opacity-100 blur-lg animate-pulse -z-10" />
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

export default AnimatedNumberLink;
