import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-14 h-14 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-700 font-medium text-base tracking-wide">Please wait, loading...</p>
      </div>
    </div>
  );
};

export default Loader;
