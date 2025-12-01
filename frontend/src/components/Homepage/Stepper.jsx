

const Stepper = ({ steps }) => {
  return (
    <div className="flex flex-col md:w-1/2 justify-center items-center gap-y-8">
      {steps.map((step, index) => (
        <div key={step.id} className="relative flex items-center w-full  max-w-xl">
          
          {/* Step Number */}
          <div
            className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#FF8C00] to-[#FF4500] text-white font-extrabold text-xl shadow-lg border-4 border-white ring-4 ring-gray-200"
            whileHover={{ scale: 1.15 }}
          >
            {step.id}
          </div>

          {/* Dotted Line */}
          {index < steps.length - 1 && (
            <div className="absolute left-6 top-[4.5rem] h-[60%] border-dashed border-gray-400 border-[2px]"></div>
          )}

          {/* Step Content */}
          <div
            className="ml-6 flex items-center gap-4 w-full min-w-[18rem] min-h-20 max-w-[28rem] bg-white shadow-xl rounded-xl px-6 py-4 border border-gray-300 transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
            whileHover={{ y: -3 }}
          >
            {step.icon}
            <p className="text-gray-800 text-sm font-semibold leading-6">{step.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
