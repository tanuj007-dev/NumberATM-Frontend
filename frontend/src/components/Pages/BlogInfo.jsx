import vip from "../../assets/vip.png";
import Marquee from "../marquee/Marquee";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Description } from "@headlessui/react";

const VipNumberArticle = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  const stats = [
    {
      label: "Enhanced Brand Image:",
      Description:
        "A VIP number boosts credibility and memorability for businesses.",
    },
    {
      label: "Personal Differentiation",
      Description:
        "Stand out with a number that reflects your style and identity.",
    },
    {
      label: "Investment Potential",
      Description: "Rare numbers appreciate in value over time.",
    },
  ];
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
    <div className="bg-white ">
      <div className=" mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-[url(./components/assets/HIW.jpg)] bg-cover bg-center px-4 ">
          <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center md:items-start gap-6">
            {/* LEFT SIDE – IMAGE (BOTTOM ON MOBILE, LEFT ON DESKTOP) */}
            <div className="w-full md:w-1/2 flex md:flex justify-center md:justify-start mt-2 md:mt-0">
  <img
    src={vip}
    alt="VIP Mobile Numbers"
    className="w-full sm:w-[500px] md:w-[600px] lg:w-[800px] drop-shadow-xl rounded-xl"
  />
</div>


            {/* RIGHT SIDE – TEXT CONTENT (TOP ON MOBILE, RIGHT ON DESKTOP) */}
           <div className="w-full md:w-1/2 py-4 md:py-12 px-2 md:px-0 text-center md:text-left">
  
  <h1 className="text-lg sm:text-xl md:text-4xl text-[#17565D] font-bold leading-snug">
    Elevate Your Status: Buy Exclusive
    <span className="text-[#FBBF24]"> VIP Mobile Numbers </span>
    in India
  </h1>

  <p
    className="
      mt-2
      text-gray-600
      text-sm sm:text-base md:text-[1rem]
      leading-[1.4]
      text-justify
      m-0 p-0
      w-full
    "
  >
    A premium VIP number is more than just digits — it’s a symbol of
    prestige, identity, and personal branding. The right number can
    instantly elevate your image, reflect your individuality, and make
    you stand out with exclusivity and style. It adds value, and gives you a distinct presence wherever you go.
  </p>
  <p className="
      mt-2
      text-gray-600
      text-sm sm:text-base md:text-[1rem]
      leading-[1.4]
      text-justify
      m-0 p-0
      w-full
    ">A well-chosen VIP number becomes a part of your lifestyle — something people instantly associate with you. It carries a sense of luxury and exclusivity that sets you apart in both personal and professional circles. Whether you're an entrepreneur, influencer, or someone who values uniqueness, a premium number gives you an edge that ordinary numbers simply can’t offer.</p>

  <p className="
      mt-2
      text-gray-600
      text-sm sm:text-base md:text-[1rem]
      leading-[1.4]
      text-justify
      m-0 p-0
      w-full
    ">Beyond prestige, a VIP number also enhances trust and recognition. It’s easier to remember, simpler to share, and creates a lasting impression whenever someone interacts with you. In a world where first impressions matter, your number becomes your signature — a smart investment that reflects class, confidence, and status.</p>

</div>

          </div>
        </div>

        <Marquee />
        {/* Content */}
        <div className=" text-gray-800">
          {/* Why Go VIP? */}
          {/* <div className="mt-6">
            <h3 className="text-xl font-bold text-gray-900">Why Go VIP?</h3>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              <li>
                <strong>Enhanced Brand Image:</strong> A VIP number boosts
                credibility and memorability for businesses.
              </li>
              <li>
                <strong>Personal Differentiation:</strong> Stand out with a
                number that reflects your style and identity.
              </li>
              <li>
                <strong>Investment Potential:</strong> Rare numbers appreciate
                in value over time.
              </li>
            </ul>
          </div> */}
          <div
            ref={ref}
            className="bg-[url(./assets/bg.jpg)] bg-contain bg-center"
          >
            <div className="relative w-full py-8 sm:py-16 bg-[#17565DE6]">
              <h1 className="text-xl sm:text-3xl font-semibold text-center text-white px-4 [text-shadow:2px_2px_2px_#000]">
                Why Go VIP?
              </h1>

              {/* ✅ Cards with animations */}
              <div className="relative max-w-7xl mt-8 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 text-center px-4">
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
                    <p className="text-[#FBBF24] text-sm sm:text-2xl mt-2 [text-shadow:2px_2px_2px_#000]">
                      {stat.label}
                    </p>
                    <p className="text-white text-sm sm:text-sm mt-2 [text-shadow:2px_2px_2px_#000]">
                      {" "}
                      {stat.Description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Finding Your Match */}
          {/* <div className="mt-6">
            <h3 className="text-xl font-bold text-gray-900">
              Finding Your Match:
            </h3>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              <li>
                <strong>Define your budget:</strong> VIP numbers vary in price.
              </li>
              <li>
                <strong>Match your personality:</strong> Choose a number that
                suits you.
              </li>
              <li>
                <strong>Consider practicality:</strong> Ensure easy recall.
              </li>
              <li>
                <strong>Buy from a trusted dealer:</strong> Avoid scams.
              </li>
            </ul>
          </div> */}

          {/* Call to Action */}
          {/* <div className="mt-8 text-center py-5">
            <a
              href="#"
              className="bg-gradient-to-r from-red-500 to-yellow-400 hover:text-white text-white px-6 py-3 rounded-full text-lg font-medium shadow-md hover:opacity-90 transition"
            >
              Get Your VIP Number Now
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default VipNumberArticle;
