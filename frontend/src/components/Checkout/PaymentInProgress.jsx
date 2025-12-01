import { MdAccessTime } from "react-icons/md";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import UserAxiosAPI from "../../api/userAxiosAPI";

const PaymentInProgress = () => {
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
    return (
      <div className="flex items-center justify-center min-h-screen text-xl font-semibold">
        Fetching order details...
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-yellow-300 to-yellow-500 p-4">
      <div className="bg-white shadow-xl rounded-3xl p-10 max-w-lg w-full text-center transform hover:scale-105 transition duration-300">
        <MdAccessTime className="text-yellow-500 text-[5rem] mx-auto animate-pulse" />
        <h2 className="text-3xl font-bold text-gray-800 mt-4">Payment In Progress</h2>
        <p className="text-gray-600 mt-2 text-sm md:text-lg">We are processing your transaction. Please contact us at +91 95111 95111.</p>
        <p className="text-gray-600 mt-2 text-xs md:text-sm">Order ID : {order?.orderId}</p>
        <div className="mt-6 border-t pt-4">
          <p className="text-gray-700 text-lg md:text-xl font-semibold">Amount</p>
          <p className="text-3xl font-bold text-gray-900">Rs. {order?.totalPrice.toFixed(2)}</p>
        </div>
        <div className="mt-4">
          <p className="text-gray-700 text-lg md:text-xl font-semibold">Transaction Initiated At</p>
          <p className="text-gray-600 text-sm md:text-lg">{dateTime}</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentInProgress;
