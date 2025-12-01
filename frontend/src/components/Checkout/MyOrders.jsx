import { useEffect, useState } from "react";
import UserAxiosAPI from "../../api/userAxiosAPI";
import { IoIosArrowDown } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const OrdersList = () => {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const axios = UserAxiosAPI();

  const getOrders = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("orders/user");
      setOrders(data.orders);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    getOrders();
  }, []);
useEffect(() => {
  if (orders.length > 0) {
    setExpandedOrder(0); // first order open by default
  }
}, [orders]);

  const toggleExpand = (index) => {
    setExpandedOrder(expandedOrder === index ? null : index);
  };

  const [meta, setMeta] = useState({ title: "", tags: "", description: "" });
  useEffect(() => {
    axios.get(`/meta/Orders`).then(({ data }) => {
      setMeta(data || { title: "", tags: "", description: "" });
    });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const downloadInvoice = async (orderId) => {
    setLoading(true);
    try {
      const response = await axios.get(`invoice/${orderId}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice_${orderId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading invoice:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12">

          {/* TITLE */}
          <h3 className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#17565D] mb-10">
            My <span className="text-[#F5C037]">Orders</span>
          </h3>

          {/* LOADING STATE */}
          {loading && !orders.length && (
            <div className="flex justify-center py-20">
              <svg
                className="w-16 h-16 sm:w-20 sm:h-20 animate-spin"
                style={{ color: "#F5C037" }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            </div>
          )}

          {/* NO ORDERS */}
          {!loading && orders.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl sm:text-2xl text-gray-400">No orders found yet.</p>
            </div>
          )}

          {/* ORDERS LIST */}
          {orders.map((order, index) => (
            <div
              key={index}
              className="
                mb-6 sm:mb-8 bg-white/10 backdrop-blur-lg border 
                border-gray-200 rounded-2xl overflow-hidden shadow-xl 
                transition-all duration-500
              "
            >
              {/* HEADER */}
              <div
                onClick={() => toggleExpand(index)}
                className="flex justify-between items-center p-4 sm:p-6 cursor-pointer bg-[#17565D]"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-[#F5C037]">
                  Order #{order.orderId}
                </h2>

                <div className="flex items-center gap-3 sm:gap-5">

                  {/* RECEIPT BUTTON */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadInvoice(order.orderId);
                    }}
                    disabled={loading}
                    className="
                      text-xs sm:text-sm px-3 sm:px-4 py-2 
                      bg-[#F5C037] text-[#17565D] rounded-md 
                      hover:bg-white transition
                    "
                  >
                    {loading ? "Downloading..." : "Receipt"}
                  </button>

                  {/* ICON */}
                  <span className="text-3xl sm:text-4xl text-white">
                    {expandedOrder === index ? <RxCross2 /> : <IoIosArrowDown />}
                  </span>
                </div>
              </div>

              {/* EXPANDED DETAILS */}
              {expandedOrder === index && (
                <div className="px-4 sm:px-6 py-5 bg-[#F5C037] border-t border-gray-300">

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* LEFT BOX */}
                    <div className="bg-white rounded-xl p-4 sm:p-5 border-2 border-[#17565D] shadow-sm">

                      <p className="font-semibold text-gray-700">VIP Number:</p>
                      {order.items.map((item, idx) => (
                        <p key={idx} className="text-xl font-mono text-gray-800">
                          {item.vipNumber?.number}
                        </p>
                      ))}

                      <p className="mt-4 text-sm font-semibold text-gray-700">
                        Ordered On:
                      </p>
                      <p className="text-gray-800">
                        {new Date(order.createdAt).toLocaleString("en-IN")}
                      </p>

                      <hr className="my-3 border-gray-300" />

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="font-semibold text-gray-700">Order Status:</p>
                          <p className="text-green-600 font-bold text-lg">{order.status}</p>
                        </div>

                        <div>
                          <p className="font-semibold text-gray-700">Payment Status:</p>
                          <p className="text-yellow-600 font-bold text-lg">{order.paymentStatus}</p>
                        </div>
                      </div>

                      <hr className="my-3 border-gray-300" />

                      <p className="font-semibold mb-1 text-gray-700">Customer Details:</p>
                      <p className="text-gray-800">Name: <b>{order.name}</b></p>
                      <p className="text-gray-800">Email: <b>{order.email}</b></p>
                    </div>

                    {/* RIGHT BOX */}
                    <div className="bg-white rounded-xl p-4 sm:p-5 border-2 border-[#17565D] shadow-sm">

                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
                        Order Summary
                      </h3>

                      <div className="space-y-3 text-gray-700">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span>₹{order.price.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between">
                          <span>GST</span>
                          <span>₹{order.gst.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between">
                          <span>Discount</span>
                          <span>₹0.00</span>
                        </div>

                        <hr className="border-gray-300" />

                        <div className="flex justify-between text-lg font-bold text-gray-800">
                          <span>Total Paid</span>
                          <span>₹{order.totalPrice.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OrdersList;
