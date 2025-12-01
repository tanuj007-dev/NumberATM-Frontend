// import React, { useState } from "react";
// import axios from "axios";

// const PaymentButton = () => {
//   const [loading, setLoading] = useState(false);

//   const handlePayment = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.post("http://localhost:5000/create-payment", {
//         amount: "1000", // Amount in INR
//         currency: "INR",
//         email: "user@example.com",
//         phone: "9876543210"
//       });

//       if (response.data.success) {
//         window.location.href = response.data.payment_url; // Redirect to Airpay
//       } else {
//         alert("Payment failed!");
//       }
//     } catch (error) {
//       console.error("Error initiating payment:", error);
//       alert("Something went wrong!");
//     }
//     setLoading(false);
//   };

//   return (
//     <button
//       onClick={handlePayment}
//       className="bg-blue-600 text-white px-4 py-2 rounded"
//       disabled={loading}
//     >
//       {loading ? "Processing..." : "Pay Now"}
//     </button>
//   );
// };

// export default PaymentButton;
