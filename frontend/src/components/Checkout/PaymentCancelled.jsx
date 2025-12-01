import { BsXCircle } from "react-icons/bs";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const PaymentCancelled = () => {
    const [searchParams] = useSearchParams();
    const transactionId = searchParams.get("transactionId");
    const time = searchParams.get("time");
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const formattedDateTime = time
        ? new Date(time).toLocaleString("en-IN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true,
          })
        : "";

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-400 to-yellow-500 p-4">
            <div className="bg-white shadow-xl rounded-3xl p-10 max-w-lg w-full text-center transform hover:scale-105 transition duration-300">
                <BsXCircle className="text-red-500 text-[5rem] mx-auto" />
                <h2 className="text-3xl font-bold text-gray-800 mt-4">Payment Cancelled</h2>
                <p className="text-gray-600 mt-2 text-sm md:text-lg">Your transaction has been cancelled or failed.</p>
                {transactionId && (
                    <p className="text-black my-2 font-bold text-xs md:text-sm">Transaction ID : {transactionId}</p>
                )}
                {time && (
                    <div className="mt-4">
                        <p className="text-gray-700 text-lg md:text-xl font-semibold">Transaction Date & Time</p>
                        <p className="text-gray-600 text-sm md:text-lg">{formattedDateTime}</p>
                    </div>
                )}
                <button
                    onClick={() => navigate("/")}
                    className="mt-6 bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition duration-300"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default PaymentCancelled;
