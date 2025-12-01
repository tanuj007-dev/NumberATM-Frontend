// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
// import Cart from "./Cart";
// import Shipping from "./Shipping";
// import Review from "./Review";
// import UserAxiosAPI from "../../api/userAxiosAPI";
// import toast from "react-hot-toast";
// import { clearCart } from "../../redux/cart/cartSlice";
// import Loading from "./Loading";
// import { useAirpayPayment } from "./useAirpay";

// const CartCheckoutStepper = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [discount, setDiscount] = useState(0);
//     const [formData, setFormData] = useState({
//         operator: "Airtel",
//         simType: "Prepaid",
//         firstName: "",
//         lastName: "",
//         country: "India",
//         streetAddress: "",
//         landmark: "",
//         state: "",
//         city: "",
//         pincode: "",
//         phone: "",
//         email: ""
//     });
//     const [showConf, setShow] = useState(false);
//     const [payment, setPayment] = useState(0);
//     const cart = useSelector((state) => state.cart.items);
//     const user = useSelector((state) => state.user?.user);
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [address, setAddress] = useState("");
//     const [order, setOrder] = useState(null);
//     const [step, setStep] = useState(1);
//     const [promoCode, setPromoCode] = useState("");
//     const [isApplied, setIsApplied] = useState(false);
//     // const [loading, setLoading] = useState(false);

//     const nextStep = () => step < 3 && setStep(step + 1);
//     const prevStep = () => step > 1 && setStep(step - 1);
//     const location = useLocation();
//     const [meta, setMeta] = useState({ title: "", tags: "", description: "" });
//     const axios = UserAxiosAPI();
//     const { loading, error, initiatePayment } = useAirpayPayment(user, formData);
//     useEffect(() => {
//         axios.get(`/meta/Checkout`).then(({ data }) => {
//             setMeta(data || { title: "", tags: "", description: "" });
//         });
//     }, []);
//     useEffect(() => {
//         return () => {
//             setPayment(0); // Reset payment when leaving the page
//         };
//     }, [location.pathname]);
//     const createOrder = async () => {
//         try {
//             const { data: order } = await axios.post("/payment/create-order", { amount, cartIds });


//         } catch (error) {
//             if (error.response && error.response.data) {
//                 // Extract the message and out-of-stock numbers
//                 const { message, outOfStockNumbers } = error.response.data;

//                 // Show error notification
//                 toast.error(`${message} ${outOfStockNumbers ? `Out of stock: ${outOfStockNumbers.join(", ")}` : ""}`);
//             } else {
//                 toast.error("Something went wrong. Please try again.");
//             }
//         }
//     };
//     const handleCheckout = async (amount, gst, price, cart) => {
//         try {
//             // setLoading(true);
//             setShow(false);
//             const cartIds = cart?.map((data) => data.vipNumberId)
//             // Step 1: Get Razorpay Key
//             const { data: { key } } = await axios.get("/payment/getkey");

//             // Step 2: Create Order
//             const { data: order } = await axios.post("/payment/create-order", { amount, cartIds });

//             // Step 3: Initialize Razorpay Payment
//             const options = {
//                 key,
//                 amount: order.amount,
//                 currency: order.currency,
//                 name: "NumberAtm",
//                 description: "Payment for your order at NumberAtm",
//                 image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsCDtWoYE7hbo5LZIP6DJIbvmhAVo5J1hR5KQsjcIdnvg_UQhbMgnTqnoKnshT-N6rkC0&usqp=CAU",
//                 order_id: order.id,
//                 handler: async (response) => {
//                     try {
//                         // Step 4: Verify Payment
//                         const {data:orderData} = await axios.post("/payment/verify-payment", {
//                             paymentId: response.razorpay_payment_id,
//                             orderId: response.razorpay_order_id,
//                             signature: response.razorpay_signature,
//                             amount, gst, price, promoCode, isApplied, discount, formData
//                         });
//                         toast.success("Payment Successful!");
//                         dispatch(clearCart());
//                         setPayment(amount);
//                         setOrder(orderData.order);
//                     } catch (error) {
//                         console.error("Payment Verification Failed", error);
//                         toast.error("Payment Verification Failed!");
//                     }
//                 },
//                 prefill: {
//                     name,
//                     email,
//                     contact: user?.phone || "9999999999",
//                 },
//                 theme: { color: "#2278bc" },
//             };

//             const razor = new window.Razorpay(options);
//             razor.open();
//         } catch (error) {
//             console.error("Error during checkout", error);
//             if (error.response && error.response.data) {
//                 const { message, outOfStockNumbers } = error.response.data;
//                 toast.error(`${message} ${outOfStockNumbers ? `Out of stock: ${outOfStockNumbers.join(", ")}` : ""}`);
//             } else {
//                 toast.error("Something went wrong. Please try again.");
//             }
//         }finally{
//             // setLoading(false);
//         }
//     };
//     useEffect(() => {
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//     }, [step]);
//     return (
//         <>
//             {/* <Helmet>
//                 <title>{meta.title || "Checkout"}</title>
//                 <meta name="description" content={meta.description} />
//                 <meta name="keywords" content={meta.tags} />
//             </Helmet> */}
//             <div className="min-h-screen max-w-full  lg:pt-0 overflow-x-hidden bg-white">
//             {loading&&<Loading/>}
//                 <div className=" mx-auto p-4 md:p-6 min-h-screen text-sm md:text-lg shadow-lg bg-white">
//                     {/* <div onClick={() => navigate('/numerology-vip-numbers')} className="m-2 cursor-pointer border-2 border-black rounded-lg h-auto flex justify-center flex-col gap-y-2 text-black items-center bg-[#2278bc]">
//                         <img src={"https://res.cloudinary.com/dlvtqiuzt/image/upload/f_auto,q_auto/v1751290460/pfpysylpaoomqx7lnlwc.jpg"}
//                             className="object-stretch shadow-xl rounded-md w-full h-auto"
//                         />
//                     </div> */}
//                         {/* <h1 className="text-xl md:text-4xl font-bold">NumberAtm</h1> */}

//                     <div className="flex justify-between mt-8 pb-6 border-b border-gray-400">
//                         {["Cart", "Shipping & Checkout", "Review & Confirmation"].map((title, index) => (
//                             <div key={index} className="flex flex-col">
//                                 <div
//                                     className="font-bold px-1.5 md:px-4 py-1 text-nowrap md:py-2.5 cursor-pointer text-black text-[0.7rem] sm:text-xs md:text-sm xl:text-lg bg-transparent border-none focus:ring-0"
//                                     onClick={() => {if(index===1&&cart?.length<1) toast.error("No numbers to proceed"); else setStep(index + 1)}}
//                                     disabled={index === 2 && (!user || name === "" || email === "" || address === "")}
//                                 >
//                                     {index + 1}. {title}
//                                 </div>
//                                 {step === index + 1 && <div className="border border-black max-w-full"></div>}
//                             </div>
//                         ))}
//                     </div>

//                     {step === 1 && <Cart setStep={setStep} />}
//                     {step === 2 && (
//                         <Shipping
//                             formData={formData} setFormData={setFormData}
//                             nextStep={nextStep} setStep={setStep}
//                         />
//                     )}
//                     {step === 3 && (
//                         <Review setStep={setStep} promoCode={promoCode} loading={loading} setPromoCode={setPromoCode} isApplied={isApplied} setIsApplied={setIsApplied} discount={discount} setDiscount={setDiscount} formData={formData} handleCheckout={initiatePayment} showConf={showConf} setShow={setShow} />
//                     )}
//                 </div>
//             </div>
//         </>
//     );
// };

// export default CartCheckoutStepper;
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Cart from "./Cart";
import Shipping from "./Shipping";
import Review from "./Review";
import UserAxiosAPI from "../../api/userAxiosAPI";
import toast from "react-hot-toast";
import { clearCart } from "../../redux/cart/cartSlice";
import Loading from "./Loading";
import { useAirpayPayment } from "./useAirpay";

const CartCheckoutStepper = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [discount, setDiscount] = useState(0);
    const [formData, setFormData] = useState({
        operator: "Airtel",
        simType: "Prepaid",
        firstName: "",
        lastName: "",
        country: "India",
        streetAddress: "",
        landmark: "",
        state: "",
        city: "",
        pincode: "",
        phone: "",
        email: ""
    });
    const [showConf, setShow] = useState(false);
    const [payment, setPayment] = useState(0);
    const cart = useSelector((state) => state.cart.items);
    const user = useSelector((state) => state.user?.user);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [order, setOrder] = useState(null);
    const [step, setStep] = useState(1);
    const [promoCode, setPromoCode] = useState("");
    const [isApplied, setIsApplied] = useState(false);
    // const [loading, setLoading] = useState(false);

    const nextStep = () => step < 3 && setStep(step + 1);
    const prevStep = () => step > 1 && setStep(step - 1);
    const location = useLocation();
    const [meta, setMeta] = useState({ title: "", tags: "", description: "" });
    const axios = UserAxiosAPI();
    const { loading, error, initiatePayment } = useAirpayPayment(user, formData);
    useEffect(() => {
        axios.get(`/meta/Checkout`).then(({ data }) => {
            setMeta(data || { title: "", tags: "", description: "" });
        });
    }, []);
    useEffect(() => {
        return () => {
            setPayment(0); // Reset payment when leaving the page
        };
    }, [location.pathname]);
    const createOrder = async () => {
        try {
            const { data: order } = await axios.post("/payment/create-order", { amount, cartIds });


        } catch (error) {
            if (error.response && error.response.data) {
                // Extract the message and out-of-stock numbers
                const { message, outOfStockNumbers } = error.response.data;

                // Show error notification
                toast.error(`${message} ${outOfStockNumbers ? `Out of stock: ${outOfStockNumbers.join(", ")}` : ""}`);
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        }
    };
    const handleCheckout = async (amount, gst, price, cart) => {
        try {
            // setLoading(true);
            setShow(false);
            const cartIds = cart?.map((data) => data.vipNumberId)
            // Step 1: Get Razorpay Key
            const { data: { key } } = await axios.get("/payment/getkey");

            // Step 2: Create Order
            const { data: order } = await axios.post("/payment/create-order", { amount, cartIds });

            // Step 3: Initialize Razorpay Payment
            const options = {
                key,
                amount: order.amount,
                currency: order.currency,
                name: "NumberAtm",
                description: "Payment for your order at NumberAtm",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsCDtWoYE7hbo5LZIP6DJIbvmhAVo5J1hR5KQsjcIdnvg_UQhbMgnTqnoKnshT-N6rkC0&usqp=CAU",
                order_id: order.id,
                handler: async (response) => {
                    try {
                        // Step 4: Verify Payment
                        const {data:orderData} = await axios.post("/payment/verify-payment", {
                            paymentId: response.razorpay_payment_id,
                            orderId: response.razorpay_order_id,
                            signature: response.razorpay_signature,
                            amount, gst, price, promoCode, isApplied, discount, formData
                        });
                        toast.success("Payment Successful!");
                        dispatch(clearCart());
                        setPayment(amount);
                        setOrder(orderData.order);
                    } catch (error) {
                        console.error("Payment Verification Failed", error);
                        toast.error("Payment Verification Failed!");
                    }
                },
                prefill: {
                    name,
                    email,
                    contact: user?.phone || "9999999999",
                },
                theme: { color: "#2278bc" },
            };

            const razor = new window.Razorpay(options);
            razor.open();
        } catch (error) {
            console.error("Error during checkout", error);
            if (error.response && error.response.data) {
                const { message, outOfStockNumbers } = error.response.data;
                toast.error(`${message} ${outOfStockNumbers ? `Out of stock: ${outOfStockNumbers.join(", ")}` : ""}`);
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        }finally{
            // setLoading(false);
        }
    };
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [step]);
    return (
        <>
            {/* <Helmet>
                <title>{meta.title || "Checkout"}</title>
                <meta name="description" content={meta.description} />
                <meta name="keywords" content={meta.tags} />
            </Helmet> */}
            <div className="min-h-screen max-w-full  lg:pt-0 overflow-x-hidden bg-white">
            {loading&&<Loading/>}
                <div className=" mx-auto p-4 md:p-6 min-h-screen text-sm md:text-lg shadow-lg bg-white">
                    {/* <div onClick={() => navigate('/numerology-vip-numbers')} className="m-2 cursor-pointer border-2 border-black rounded-lg h-auto flex justify-center flex-col gap-y-2 text-black items-center bg-[#2278bc]">
                        <img src={"https://res.cloudinary.com/dlvtqiuzt/image/upload/f_auto,q_auto/v1751290460/pfpysylpaoomqx7lnlwc.jpg"}
                            className="object-stretch shadow-xl rounded-md w-full h-auto"
                        />
                    </div> */}
                        {/* <h1 className="text-xl md:text-4xl font-bold">NumberAtm</h1> */}

      <div className="flex items-center justify-center gap-3 sm:gap-8 mt-6 pb-4 
                w-full whitespace-nowrap overflow-hidden">
                  
  {/* Step 1 */}
  <div className="flex items-center gap-1">
    <div
      className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border-[1.5px] flex items-center justify-center ${
        step === 1 ? "border-black" : "border-gray-400"
      }`}
    >
      <div
        className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
          step === 1 ? "bg-black" : "bg-transparent"
        }`}
      ></div>
    </div>
    <span
      className={`text-[10px] sm:text-sm ${
        step === 1 ? "font-semibold text-black" : "text-gray-600"
      }`}
    >
      Cart
    </span>
  </div>

  {/* Divider */}
  <div className="w-10 sm:w-20 h-[1px] bg-gray-300"></div>

  {/* Step 2 */}
  <div className="flex items-center gap-1">
    <div
      className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border-[1.5px] flex items-center justify-center ${
        step === 2 ? "border-black" : "border-gray-400"
      }`}
    >
      <div
        className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
          step === 2 ? "bg-black" : "bg-transparent"
        }`}
      ></div>
    </div>
    <span
      className={`text-[10px] sm:text-sm ${
        step === 2 ? "font-semibold text-black" : "text-gray-600"
      }`}
    >
      Checkout
    </span>
  </div>

  {/* Divider */}
  <div className="w-10 sm:w-20 h-[1px] bg-gray-300"></div>

  {/* Step 3 */}
  <div className="flex items-center gap-1">
    <div
      className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border-[1.5px] flex items-center justify-center ${
        step === 3 ? "border-black" : "border-gray-400"
      }`}
    >
      <div
        className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
          step === 3 ? "bg-black" : "bg-transparent"
        }`}
      ></div>
    </div>
    <span
      className={`text-[10px] sm:text-sm ${
        step === 3 ? "font-semibold text-black" : "text-gray-600"
      }`}
    >
      Order Confirmed
    </span>
  </div>

</div>



                    {step === 1 && <Cart setStep={setStep} />}
                    {step === 2 && (
                        <Shipping
                            formData={formData} setFormData={setFormData}
                            nextStep={nextStep} setStep={setStep}
                        />
                    )}
                    {step === 3 && (
                        <Review setStep={setStep} promoCode={promoCode} loading={loading} setPromoCode={setPromoCode} isApplied={isApplied} setIsApplied={setIsApplied} discount={discount} setDiscount={setDiscount} formData={formData} handleCheckout={initiatePayment} showConf={showConf} setShow={setShow} />
                    )}
                </div>
            </div>
        </>
    );
};

export default CartCheckoutStepper;
