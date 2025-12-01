import React from "react";
import { motion } from "framer-motion";
import { FaListCheck } from "react-icons/fa6";
import { MdOutlineVerified } from "react-icons/md";
import { FaRegCreditCard } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { FaTruckFast } from "react-icons/fa6";

const timelineData = [
  {
    step: "STEP 01",
    title: "SELECTION",
    desc: "Send us a HI using WhatsApp on 97222-97222 to get a list of paid VIP Numbers.",
    color: "bg-[#17565D]",
    icon: <FaListCheck size={20} />,
  },
  {
    step: "STEP 02",
    title: "AVAILABILITY",
    desc: "Our team will reach out and arrange an appointment at a time that suits your schedule.",
    color: "bg-[#F5C037]",
    icon: <MdOutlineVerified size={20} />,
  },
  {
    step: "STEP 03",
    title: "BOOKING",
    desc: "We book your choice by Advance payment only. Use PAYTM and reserve your number on 97222–97222.",
    color: "bg-[#17565D]",
    icon: <FaRegCreditCard size={20} />,
  },
  {
    step: "STEP 04",
    title: "SCHEDULE",
    desc: "Our team will call you & fix an appointment as per your schedule.",
    color: "bg-[#F5C037]",
    icon: <MdDateRange size={20} />,
  },
  {
    step: "STEP 05",
    title: "DELIVERY",
    desc: "Done! We are always on time and ensure your number booking is processed quickly through our website.",
    color: "bg-[#17565D]",
    icon: <FaTruckFast size={20} />,
  },
];

export default function Timeline() {
  return (
    <div className="bg-[url(./components/assets/HIW.jpg)] bg-cover bg-no-repeat w-full py-10 px-4">

      {/* Title */}
      <h1 className="text-3xl md:text-4xl text-[#17565D] font-bold text-center mb-10">
        HOW <span className="text-[#F5C037]">IT WORKS</span>
      </h1>

    {/* DESKTOP — EXACT SAME AS SCREENSHOT */}
<div className="hidden md:grid grid-cols-5 gap-y-10 w-full max-w-6xl mx-auto mt-5">

  {/* ================= ROW 1 ================= */}

  {/* 1. SELECTION */}
  <div className="flex flex-col items-center text-center w-full">
    <h3 className="font-bold text-[#17565D] text-xl mb-2">SELECTION</h3>
    <p className="text-gray-600 text-sm leading-tight w-56">
      Send us a HI using WhatsApp on 97222-97222 to get a list of paid VIP Numbers.
    </p>
  </div>

  {/* 2. STEP 02 */}
  <div className="flex justify-center mt-5">
    <div className="w-40 h-20 bg-[#F5C037] text-white rounded-xl -skew-x-12 shadow-lg flex items-center justify-center">
      <div className="skew-x-12 font-semibold flex items-center gap-2">
        <MdOutlineVerified size={28} /> STEP 02
      </div>
    </div>
  </div>

  {/* 3. BOOKING */}
  <div className="flex flex-col items-center text-center w-full">
    <h3 className="font-bold text-[#17565D] text-xl mb-2">BOOKING</h3>
    <p className="text-gray-600 text-sm leading-tight w-56">
      We book your choice by Advance payment only. Use PAYTM and reserve your number on 97222–97222.
    </p>
  </div>

  {/* 4. STEP 04 */}
  <div className="flex justify-center mt-5">
    <div className="w-40 h-20 bg-[#F5C037] text-white rounded-xl -skew-x-12 shadow-lg flex items-center justify-center">
      <div className="skew-x-12 font-semibold flex items-center gap-2">
        <MdDateRange size={28} /> STEP 04
      </div>
    </div>
  </div>

  {/* 5. DELIVERY */}
  <div className="flex flex-col items-center text-center w-full">
    <h3 className="font-bold text-[#17565D] text-xl mb-2">THE DELIVERY</h3>
   <p className="text-gray-600 text-sm leading-tight w-56">
  Done! We are always on time and ensure your number booking is processed
  quickly through our website.
</p>

  </div>


  {/* ================= ROW 2 ================= */}

  {/* STEP 01 */}
  <div className="flex justify-center  ">
    <div className="w-40 h-20 bg-[#17565D] text-white rounded-xl -skew-x-12 shadow-lg flex items-center justify-center">
      <div className="skew-x-12 font-semibold flex items-center gap-2">
        <FaListCheck size={28} /> STEP 01
      </div>
    </div>
  </div>

  {/* AVAILABILITY (FIXED — NOW IN COL 2 ROW 2) */}
  <div className="flex flex-col items-center text-center w-full  ">
    <h3 className="font-bold text-[#17565D] text-xl mb-2">AVAILABILITY</h3>
    <p className="text-gray-600 text-sm leading-tight w-56">
     Our team will reach out and arrange an appointment at a time that suits your schedule.
    </p>
  </div>

  {/* STEP 03 */}
  <div className="flex justify-center mt-[-10px]">
    <div className="w-40 h-20 bg-[#17565D] text-white rounded-xl -skew-x-12 shadow-lg flex items-center justify-center">
      <div className="skew-x-12 font-semibold flex items-center gap-2">
        <FaRegCreditCard  size={28}/> STEP 03
      </div>
    </div>
  </div>

  {/* SCHEDULE */}
  <div className="flex flex-col items-center text-center w-full mt-[-10px]">
    <h3 className="font-bold text-[#17565D] text-xl mb-2">SCHEDULE</h3>
    <p className="text-gray-600 text-sm leading-tight w-56">
      Our team will call you & fix an appointment as per your schedule.
    </p>
  </div>

  {/* STEP 05 */}
  <div className="flex justify-center mt-[-10px]">
    <div className="w-40 h-20 bg-[#17565D] text-white rounded-xl -skew-x-12 shadow-lg flex items-center justify-center">
      <div className="skew-x-12 font-semibold flex items-center gap-2">
        <FaTruckFast size={28} /> STEP 05
      </div>
    </div>
  </div>

</div>




      {/* MOBILE — VERTICAL (Your Sketch Style) */}
      <div className="md:hidden flex flex-col gap-6 mt-4">

        {timelineData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-md border border-[#F5C037]/40"
          >
            {/* Step Box – UPPER like sketch */}
            <div
              className={`w-full h-12 ${item.color} text-white rounded-md -skew-x-12 flex items-center justify-center shadow`}
            >
              <div className="transform skew-x-12 flex items-center gap-2 text-sm font-semibold">
                {item.icon} {item.step}
              </div>
            </div>

            {/* Text under box */}
            <h3 className="mt-3 font-bold text-[#17565D] text-lg">
              {item.title}
            </h3>

            <p className="text-gray-700 text-sm leading-snug mt-1">
              {item.desc}
            </p>
          </motion.div>
        ))}

      </div>
    </div>
  );
}
