import { BsPatchCheck } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import UserAxiosAPI from "../../api/userAxiosAPI";

const PaymentSuccess = () => {
    const [order, setOrder] = useState(null);
    const [dateTime, setDateTime] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const transactionId = searchParams.get("transactionId");
    const time = searchParams.get("time");
    const navigate = useNavigate();
    const axios = UserAxiosAPI();
    useEffect(() => {
        if (!order) return;

        // Google Ads Conversion Tracking
        if (window.gtag) {
            window.gtag('event', 'conversion', {
                send_to: 'AW-16838705843/nZigCNnHpZUaELOFqd0-',
                value: order.totalPrice || 0,
                currency: 'INR',
                transaction_id: order.orderId || '', // Ensure it's a string
            });
        }

        // Meta Pixel Purchase Event Tracking
        if (typeof window.fbq === 'function') {
            window.fbq('track', 'Purchase', {
                value: order.totalPrice || 0,
                currency: 'INR',
            });
        }
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: "payment_success",
            value: order.totalPrice || 0,
            currency: "INR",
            transaction_id: order.orderId || "",
        });

        console.log("GTM event fired:", {
            event: "payment_success",
            value: order.totalPrice || 0,
            currency: "INR",
            transaction_id: order.orderId || "",
        });
    }, [order]);
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
                    if (response.data.order.paymentStatus !== 'Paid') {
                        navigate(`/payment-failed?transactionId=${transactionId}&time=${time}`)
                    }
                })
                .catch((error) => {
                    console.error("Error fetching order:", error);
                });
        }
    }, [transactionId]);

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

    if (!order) {
        return <div className="flex items-center justify-center min-h-screen text-xl font-semibold">Loading...</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-4">
            <div className="bg-white shadow-xl rounded-3xl p-10 max-w-lg w-full text-center transform hover:scale-105 transition duration-300">
                <BsPatchCheck className="text-green-500 text-[5rem] mx-auto" />
                <h2 className="text-3xl font-bold text-gray-800 mt-4">Payment Successful</h2>
                <p className="text-gray-600 mt-2 text-sm md:text-lg">Your transaction has been completed successfully.</p>
                <p className="text-black my-2 font-bold text-xs md:text-sm">Order ID : {order?.orderId}</p>
                {/* <div>
                    <h3 className="text-sm md:text-lg">Number Bought:</h3>
                    {order.items.map((item) => {
                        return <p key={item?.number}>{item?.vipNumber?.number}</p>
                    })}
                </div> */}
                <div className="mt-2 border-t pt-4">
                    <p className="text-gray-700 text-lg md:text-xl font-semibold">Amount Paid</p>
                    <p id="order-total" className="text-3xl font-bold text-gray-900">Rs. {order?.totalPrice.toFixed(2)}</p>
                </div>
                <div className="mt-4">
                    <p className="text-gray-700 text-lg md:text-xl font-semibold">Transaction Date & Time</p>
                    <p className="text-gray-600 text-sm md:text-lg">{new Date(order.transactionTime).toLocaleString("en-IN", {
                        weekday: "short",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true,
                    })}</p>
                </div>
                <button
                    onClick={() => downloadInvoice(order.orderId)}
                    disabled={loading}
                    className="mt-6 mr-2 bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg transition duration-300"
                >
                    {loading ? "Downloading..." : "Download Receipt"}
                </button>
                <button
                    onClick={() => navigate("/")}
                    className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition duration-300"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccess;
