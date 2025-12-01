import google from "../../assets/google.avif";
import PhonePay from "../../assets/pp.png";
import RefundPolicy from "../../assets/refund.png";
import web from "../../assets/internet.webp";

const NumberAtm = () => {
  return (
    <div className="bg-[url(./assets/bg.jpg)] bg-contain bg-center">
      <div className="bg-[#17565DE6] py-8 sm:py-12 px-4">
        <h1 className="text-xl sm:text-3xl font-semibold text-center text-white">
          NumberATM trusted by Elites
        </h1>
        <h2 className=" text-center text-sm sm:text-xl text-white font-medium">
          Reserve your VIP mobile number
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 justify-center px-0 sm:p-8 mx-auto mt-6 sm:mt-0 text-white">
          {/* Card 1: Google Reviews */}
          <div className="bg-black/50 rounded-xl shadow-2xl transition-shadow duration-300 p-2 text-center flex flex-col items-center flex-1 border-2 border-[#F5C037]">
            <h3 className="text-medium p-2 font-semibold">Google</h3>
            <div className="mb-4">
              <img
                src={google}
                alt="Google Reviews"
                className="w-16 h-16 mx-auto rounded-full p-2 bg-white"
              />
            </div>
            <h3 className="text-sm font-semibold leading-relaxed mb-2">
              1000+ Satisfied Google Reviews
            </h3>
          </div>

          {/* Card 3: PhonePe Gateway */}
          <div className="bg-black/50 rounded-xl shadow-2xl transition-shadow duration-300 p-2 text-center flex flex-col items-cente flex-1 border-2 border-[#F5C037]">
            <h3 className="text-medium p-2 font-semibold">PhonePe</h3>
            <div className="mb-4">
              <img
                src={PhonePay}
                alt="PhonePe Verified"
                className="w-16 h-16 mx-auto rounded-full bg-white shadow-lg p-2"
              />
            </div>
            <h3 className="text-sm font-semibold leading-relaxed mb-2">
              PhonePe Verified Payment Gateway
            </h3>
          </div>
          {/* Card 2: Biggest Website */}
          <div className="bg-black/50 rounded-xl shadow-2xl transition-shadow duration-300 p-2 text-center flex flex-col items-center flex-1 border-2 border-[#F5C037]">
            <h3 className="text-medium p-2 font-semibold">Website</h3>
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto rounded-full p-1 bg-white flex items-center justify-center shadow-lg">
                <img
                  src={web}
                  alt="Biggest Website"
                  className="w-14 h-14 rounded-full"
                />
              </div>
            </div>
            <h3 className="text-sm font-semibold leading-relaxed mb-2">
              India's Biggest Website
            </h3>
          </div>

          {/* Card 4: Refund Policy */}
          <div className="bg-black/50 rounded-xl shadow-2xl transition-shadow duration-300 p-2 text-center flex flex-col items-cente flex-1 border-2 border-[#F5C037]">
            <h3 className="text-medium p-2 font-semibold">Refund</h3>
            <div className="mb-4">
              <img
                src={RefundPolicy}
                alt="Refund Policy"
                className="w-16 h-16 mx-auto rounded-full bg-white p-2 shadow-lg"
              />
            </div>
            <h3 className="text-sm font-semibold leading-relaxed pb-2">
              100% Refund Policy
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberAtm;
