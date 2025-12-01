import { useState } from "react";
import UserAxiosAPI from "../../api/userAxiosAPI";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
export const useAirpayPayment = (user, formData) => {
    const [loading, setLoading] = useState(false);
    const axios = UserAxiosAPI();
    const [paymentResponse, setPaymentResponse] = useState(null);
    const [error, setError] = useState(null);
    const { cart } = useSelector((state) => state.cart.items);
    const generateOrderId = () => {
        return `NA-${(Date.now() % 1000000).toString()}${Math.floor(100 + Math.random() * 900)}`;
    };

    const showOutOfStockToast = (message, outOfStockNumbers) => {
        return toast.error(
            <div>
                <p className="font-semibold">❗ Some numbers were just sold out</p>
                <p className="text-sm">{message}</p>
                <ul className="mt-1 list-disc list-inside text-sm text-red-700">
                    {outOfStockNumbers.map((num, idx) => (
                        <li key={idx}>{num}</li>
                    ))}
                </ul>
            </div>,
            { duration: 5000 }
        );
    };

    const initiatePayment = async (amount, gst, price, promoCode, isApplied, discount) => {
        const order_id = generateOrderId();
        
        setLoading(true);
        setError(null);
        const cartIds = cart?.map((data) => data.vipNumberId)
        try {
            
            const payload = {
                formData,
                buyerEmail: formData.email.trim(),
                buyerPhone: formData.phone.trim(),
                buyerFirstName: formData.firstName.trim(),
                buyerLastName: formData.lastName.trim(),
                buyerAddress: formData.streetAddress.trim(),
                buyerCity: formData.city.trim(),
                buyerState: formData.state.trim(),
                buyerCountry: "India",
                buyerPinCode: formData.pincode.trim(),
                orderid: order_id,
                amount: parseFloat(amount).toFixed(2),
                vpa: "geooorge@hdfcbank",
                apiName: "collectVPA",
                mode: "vpa",
                channel: "upi",
                txnsubtype: "2",
                currency: "356",
                isocurrency: "INR",
                id: user._id,
                gst, price, promoCode, isApplied, discount, cartIds
            };
            // Send to backend (Port 3000)
            const response = await axios.post('airpay/sendtoairpay', payload)
            const data = await response.data;
            if (data.redirectUrl) {
                window.location.href = data.redirectUrl; // 🔄 Redirect to `/sendtoairpay`
            }
        } catch (err) {
            console.error("❌ Payment Error:", err);
            setError(err.message || "Payment failed");
            if(err?.response?.status === 400 && !err?.response?.data?.outOfStockNumbers){
                toast.error(err?.response?.data?.message);
                return;
            }
            showOutOfStockToast(err?.response?.data?.message, err?.response?.data?.outOfStockNumbers)
        } finally {
            setLoading(false);
        }
    };


    return {
        loading,
        paymentResponse,
        error,
        initiatePayment,
    };
};
