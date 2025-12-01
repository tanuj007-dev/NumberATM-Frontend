export const NumberCardSkeleton = () => {
  return (
    <div className="relative bg-[#17565D] min-w-[180px] md:min-w-[240px] px-2 md:px-6 p-1.5 sm:p-2 md:p-2.5 shadow-lg rounded-2xl flex flex-col items-center space-y-2 md:space-y-3 border-2 border-white animate-pulse">
      {/* Discount Placeholder */}
      <div className="absolute top-1 left-2 h-4 w-10 md:w-16 bg-slate-400 rounded"></div>

      {/* Number Placeholder */}
      <div className="h-6 md:h-8 w-24 md:w-36 mt-6 md:mt-3 bg-slate-500 rounded" />

      {/* Sum Total Placeholder */}
      <div className="h-4 w-32 bg-slate-400 rounded" />

      {/* Heart Icon Placeholder */}
      <div className="absolute -top-3 sm:-top-4 -right-1.5 h-6 w-6 bg-slate-500 rounded-full" />

      {/* Price Row Placeholder */}
      <div className="flex gap-2 mt-2">
        <div className="h-5 w-16 bg-slate-500 rounded-full" />
        <div className="h-5 w-16 bg-slate-400 rounded-full" />
      </div>

      {/* Buttons Row */}
      <div className="flex justify-between w-full gap-2 mt-4">
        <div className="h-8 w-full bg-slate-500 rounded-full" />
        <div className="h-8 w-full bg-slate-500 rounded-full" />
      </div>
    </div>
  );
};
