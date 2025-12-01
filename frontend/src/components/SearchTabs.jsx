import { useState } from "react";

export default function SearchTabs() {
  const [activeTab, setActiveTab] = useState("premium");

  return (
    <div className="w-full flex justify-center mt-4">
      <div className="flex bg-transparent border-b border-yellow-400 gap-6">

        {/* PREMIUM */}
        <button
          onClick={() => setActiveTab("premium")}
          className={`pb-1 text-sm font-semibold transition-all ${
            activeTab === "premium"
              ? "text-yellow-400 border-b-2 border-yellow-400"
              : "text-white opacity-70 hover:opacity-100"
          }`}
        >
          Premium Search
        </button>

        {/* ADVANCED */}
        <button
          onClick={() => setActiveTab("advanced")}
          className={`pb-1 text-sm font-semibold transition-all ${
            activeTab === "advanced"
              ? "text-yellow-400 border-b-2 border-yellow-400"
              : "text-white opacity-70 hover:opacity-100"
          }`}
        >
          Advanced Search
        </button>

        {/* EXACT */}
        <button
          onClick={() => setActiveTab("exact")}
          className={`pb-1 text-sm font-semibold transition-all ${
            activeTab === "exact"
              ? "text-yellow-400 border-b-2 border-yellow-400"
              : "text-white opacity-70 hover:opacity-100"
          }`}
        >
          Exact Search
        </button>

      </div>
    </div>
  );
}
