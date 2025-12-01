import { MdCancel } from "react-icons/md";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import UserAxiosAPI from "../../api/userAxiosAPI";
import { BsWhatsapp } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";

const PaymentFailed = () => {
  const [order, setOrder] = useState(null);
  const [dateTime, setDateTime] = useState("");
  const [searchParams] = useSearchParams();
  const transactionId = searchParams.get("transactionId");
  const time = searchParams.get("time");
  const navigate = useNavigate();
  const axios = UserAxiosAPI();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const now = new Date(time);
    const formattedDateTime = now.toLocaleString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    setDateTime(formattedDateTime);
  }, []);

  useEffect(() => {
    if (transactionId) {
      axios
        .get(`/orders/${transactionId}`)
        .then((response) => {
          setOrder(response.data.order);
        })
        .catch((error) => {
          console.error("Error fetching order:", error);
        });
    }
  }, [transactionId]);

  if (!order) {
    return <div className="flex items-center justify-center min-h-screen text-xl font-semibold">Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-400 to-orange-500 p-4">
      <div className="bg-white shadow-xl rounded-3xl p-10 max-w-lg w-full text-center transform hover:scale-105 transition duration-300">
        <MdCancel className="text-red-500 text-[5rem] mx-auto" />
        <h2 className="text-3xl font-bold text-gray-800 mt-4">Payment Failed</h2>
        <p className="text-gray-600 mt-2 text-sm md:text-lg">Your transaction could not be processed.</p>
        <p className="text-gray-600 mt-2 text-xs md:text-sm">Order ID : {order?.orderId}</p>
        <div className="mt-6 border-t pt-4">
          <p className="text-gray-700 text-lg md:text-xl font-semibold">Amount Attempted</p>
          <p className="text-3xl font-bold text-gray-900">Rs. {order?.totalPrice.toFixed(2)}</p>
        </div>
        <div className="mt-4">
          <p className="text-gray-700 text-lg md:text-xl font-semibold">Transaction Date & Time</p>
          <p className="text-gray-600 text-sm md:text-lg">{dateTime}</p>
        </div>
        <div className="mt-4">
          <p className="text-gray-700 text-lg md:text-xl font-semibold">Please Contact us at:</p>
          <a
            href="https://wa.me/+919511195111"
            target="_blank"
            aria-label="Whatsapp"
            rel="noopener noreferrer"
            className=" bg-green-500 flex justify-center items-center text-white p-0 z-[100] rounded-full shadow-lg hover:bg-green-600 hover:text-white transition"
          >
            <FaWhatsapp className="text-xl md:text-2xl" /> +91 95111-95111
          </a>
        </div>
        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition duration-300"
        >
          Back to Home
        </button>
        <button
          onClick={() => navigate("/checkout")}
          className="mt-2 bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition duration-300"
        >
          Retry Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentFailed;