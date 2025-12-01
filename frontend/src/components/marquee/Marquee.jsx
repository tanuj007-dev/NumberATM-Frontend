import React from "react";
import "./marquee.css";

function Marquee() {
  const messages = [
    "100% Money-Back Guarantee - Full refund if you don’t receive your UPC!",
    "Fast Delivery - Get your UPCs instantly after purchase.",
    "Trusted by 10,000+ sellers across platforms.",
  ];

  return (
    <div className="bg-[#F5C037] py-2 z-10 overflow-hidden whitespace-nowrap">
      <div className="marquee">
        <div className="marquee-content">
          {/* ORIGINAL CONTENT */}
          {messages.map((msg, i) => (
            <p
              key={i}
              className="text-[#292929] text-xs sm:text-xl font-semibold mx-8"
            >
              {msg}
            </p>
          ))}

          {/* DUPLICATE CONTENT – creates perfect infinite loop */}
          {messages.map((msg, i) => (
            <p
              key={`clone-${i}`}
              className="text-[#292929] text-xs sm:text-xl font-semibold mx-8"
            >
              {msg}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Marquee;
