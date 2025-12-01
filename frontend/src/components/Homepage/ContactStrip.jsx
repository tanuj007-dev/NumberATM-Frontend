import { FiPhoneCall } from "react-icons/fi";

export default function ContactStrip() {
  return (
    <div className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white my-3 py-4 px-4 md:px-16 flex flex-col md:flex-row items-center justify-between shadow-lg text-sm md:text-base">
      <div className="flex items-center gap-6 mt-2 md:mt-0">
        <div className="flex items-center gap-2">
          <FiPhoneCall className="text-xl text-yellow-400" />
          <span className="font-semibold">Call us at: +91 95111 95111</span>
        </div>
        <div className="flex items-center gap-2">
          <FiPhoneCall className="text-xl text-yellow-400" />
          <span className="font-semibold">+91 95111 95111</span>
        </div>
      </div>
    </div>
  );
}
