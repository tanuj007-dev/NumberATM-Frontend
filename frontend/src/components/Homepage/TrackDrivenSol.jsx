// import React from "react";

// const TrackDrivenSol = () => {
//   return (
//     <div className="flex items-center   flex-col  ">
//       <h1 className=" font-semibold p-6 text-5xl">
//         Technology-Driven Solutions
//       </h1>
//       <div className="flex  justify-center mt-12  gap-12  ">
//         <div className="shadow-lg w-1/4 p-6 m-6">
//           <h1 className="font-semibold text-black text-2xl">
//             Online Platform Excellence
//           </h1>
//           <p className="text-black leading-tight">
//             Our VIP mobile number online portal leverages cutting-edge
//             technology to provide:
//             <ul>
//               <li className="text-[#525252]">Real-time inventory updates</li>
//               <li className="text-[#525252]">
//                 Instant availability verification
//               </li>
//               <li className="text-[#525252]">Secure payment processing</li>
//               <li className="text-[#525252]">
//                 Automated delivery coordination
//               </li>
//             </ul>
//           </p>
//         </div>
//         <div className=" items-center w-1/4 justify-center shadow-lg p-6 m-6">
//           <h1 className="font-semibold  text-black text-2xl">
//             Customer Support Framework
//           </h1>
//           <p className="text-[#525252] leading-tight">
//             Dedicated relationship managers assist high-value clients throughout
//             their journey. Our support team understands the unique requirements
//             of affluent customers and provides personalized attention
//             accordingly.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TrackDrivenSol;

import React from "react";
import { IoIosContact } from "react-icons/io";
// You'll need icons. I'm using placeholder colors for the icons' container backgrounds.
// In a real project, you would use an icon library like 'lucide-react' or similar.

// Utility component for the card icon background
const IconBackground = ({ children, colorClass }) => (
  <div
    className={`flex items-center justify-center w-12 h-12 rounded-lg p-2 ${colorClass}`}
  >
    {/* Placeholder for the icon */}
    {children}
  </div>
);

// Component for a single feature card
const FeatureCard = ({ iconBgColor, icon, title, children }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="flex items-start gap-4 mb-4">
      <IconBackground colorClassName={iconBgColor}>
        {/* Placeholder Icon - replace with a real icon library component */}
        <div className="w-6 h-6 bg-white opacity-80 rounded-sm"></div>
      </IconBackground>
      <h2 className="font-semibold text-xl text-gray-900 mt-1">{title}</h2>
    </div>
    <div className="text-gray-600">{children}</div>
  </div>
);

const NetworkPartnerships = () => {
  return (
    <div className="bg-gray-50 py-8 sm:py-16 px-4 sm:px-6 lg:px-8">
      {/* Main Title */}
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="font-bold text-3xl  text-gray-800 tracking-tight">
          NETWORK PARTNERSHIPS
        </h1>
      </div>

      {/* Cards Grid Container */}
      <div className="w-1/4 flex justify-center g mt-12">
        {/* Row 1, Card 1: Telecommunications Alliances */}
        <FeatureCard
          iconBgColor="bg-[#567475]" // Dark Teal-like color
          title="Telecommunications Alliances"
        >
          <p className="leading-relaxed ">
            Strong partnerships with major carriers ensure seamless VIP mobile
            number bsnl activations and cross-network portability. We maintain
            preferred vendor status with leading telecommunications companies
            nationwide.
          </p>
        </FeatureCard>

        {/* Row 1, Card 2: Quality Assurance */}
        <FeatureCard
          iconBgColor="bg-[#E4C563]" // Light Yellow/Gold color
          title="Quality Assurance"
        >
          <ul className="list-disc ml-5 space-y-1">
            <li>Authentic documentation</li>
            <li>Legal ownership transfer</li>
            <li>Activation support</li>
            <li>Post-purchase assistance</li>
          </ul>
        </FeatureCard>

        {/* Row 2, Card 1: Market Leadership Achievements */}
        <FeatureCard
          iconBgColor="bg-[#E4C563]" // Light Yellow/Gold color
          title="Market Leadership Achievements"
        >
          <p className="leading-relaxed">
            Since inception, NumberATM has successfully delivered over 50,000
            premium numbers to satisfied customers. Our client base includes
            celebrities, business leaders, and affluent individuals who trust
            our expertise and reliability.
          </p>
        </FeatureCard>

        {/* Row 2, Card 2: Industry Recognition */}
        <FeatureCard
          iconBgColor="bg-[#567475]" // Dark Teal-like color
          title="Industry Recognition"
        >
          <ul className="list-disc ml-5 space-y-1">
            <li>Recognized as India's fastest-growing VIP number provider</li>
            <li>
              Trusted by Fortune 500 companies for corporate number requirements
            </li>
            <li>Preferred choice among luxury lifestyle brands</li>
          </ul>
        </FeatureCard>
      </div>
    </div>
  );
};

export default NetworkPartnerships;
