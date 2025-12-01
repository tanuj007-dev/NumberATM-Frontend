
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserAxiosAPI from "../api/userAxiosAPI";
import { login } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { clearCart, setCart } from "../redux/cart/cartSlice";
import toast from "react-hot-toast";
import man from "../assets/man.png"
export default function Login({ checkout }) { 
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isOtpLogin, setIsOtpLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const cart = useSelector((state) => state.cart.items)
  const axios = UserAxiosAPI();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authMethod, setAuthMethod] = useState("PHONE");
  const [email, setEmail] = useState("");
  const [verifyId, setVerifyId] = useState("");
  const [token, setToken] = useState(null);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [loginMode, setLoginMode] = useState('phone');

  const handleChange = (event) => {
    setLoginMode(event.target.value);
  };

  const initiateAuth = async () => {
    try {
      const { data } = await axios.post("/auth/send-otp", { phone });
      setOtpSent(true);
      setVerifyId(data.verifyId); // ✅ now real verifyId
      toast.success("OTP sent!");
      setResendTimer(60);
      setIsResendDisabled(true);
      startResendTimer();
    } catch (e) {
      toast.error("Failed to send OTP");
    }
  };

  const startResendTimer = () => {
    let timeLeft = 60;
    const interval = setInterval(() => {
      timeLeft -= 1;
      setResendTimer(timeLeft);
      if (timeLeft <= 0) {
        clearInterval(interval);
        setIsResendDisabled(false);
      }
    }, 1000);
  };
  const addCart = async (userId) => {
    try {
      const vipNumberIds = cart.map((item) => item._id)
      const { data } = await axios.post('/cart/add/login', { userId, vipNumberIds });
      const transformedItems = data.cart.items.map(item => ({
        ...item.vipNumberId, // Spread the vipNumberId properties
        _id: item.vipNumberId?._id, // Keep the item's original _id
      }));

      dispatch(setCart(transformedItems));
      window.location.reload();
    } catch (e) {
      console.log(e);
      dispatch(clearCart());
    }
  }
  const handleOtpLogin = async () => {
    // setLoading(true);
    try {
      const { data } = await axios.post('/user/otp/login', { phone, type: authMethod });
      dispatch(login(data?.user));
      Cookies.set('NumberAtmUser', data?.token, { expires: 30 });
      toast.success("Logged in successfully!");
      if (!checkout) {
        if (!data?.user?.profileCompleted) navigate('/profile');
        else navigate('/');
      }
      if (cart.length > 0) {
        addCart(data?.user?._id);
      }
    } catch (e) {
      console.log(e);
      setError('Something Went Wrong!');
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // if ((!phone && loginMode === "phone") || (!email && loginMode === "email") || (!isOtpLogin && !password) || (isOtpLogin && !otp)) {
    //   setError("All fields are required.");
    //   return;
    // }
    if (!/^[6-9]\d{9}$/.test(phone)) {
      return res.status(400).json({ error: true, message: "Invalid phone number. Must be 10 digits starting with 6-9." });
    }

    try {
      const { data } = await axios.post('/user/login', { phone, password, loginMode, email });

      dispatch(login(data?.user));
      // console.log(data?.user)
      Cookies.set('NumberAtmUser', data?.token, { expires: 30 });
     // 🔵 Redirect Logic
const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";

localStorage.removeItem("redirectAfterLogin");

navigate(redirectPath);

      if (cart.length > 0) {
        addCart(data?.user?._id);
      }
    } catch (e) {
      setError(e?.response?.data?.message);
    } finally {
      setLoading(false);
    }
    // console.log(
    //   isOtpLogin
    //     ? `Logging in with OTP: ${otp}`
    //     : `Logging in with password: ${password}`
    // );

    // Call API here for authentication
  };
  const verifyOTP = async () => {
    try {
      const { data } = await axios.post("/auth/verify-otp", {
        phone,
        otp,
        verifyId, // ✅ used now
      });
      toast.success("OTP Verified!");
      handleOtpLogin();
    } catch (e) {
      toast.error(e?.response?.data?.message || "Invalid OTP");
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [])
  return (
  <div className="flex min-h-screen ">
    {/* LEFT SIDE - FORM */}
    <div className="flex flex-col justify-center px-8 py-5 w-full md:w-1/2 bg-white">
      <div className="max-w-md mx-auto w-full">
        {/* Logo */}
        {/* <div className="flex items-center mb-6 space-x-2">
          <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-white font-bold text-lg">
            F
          </div>
          <h1 className="text-xl font-semibold text-gray-800">Furniture.</h1>
        </div> */}

        <h2 className="text-4xl font-semibold text-[#17565D] mb-2">Login & Register</h2>
        <p className="text-gray-700 text-sm mb-7">Please fill your details to access your account.</p>

        {/* Existing form code */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            {(isOtpLogin || loginMode === "phone") && (
              <>
                <input
                  type="number"
                  placeholder="Phone Number *"
                  value={phone}
                  required={(isOtpLogin || loginMode === "phone")}
                  onChange={(e) => {
                    if (e.target.value?.length > 10) return;
                    setPhone(e.target.value);
                  }}
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#17565D] outline-none"
                />
              </>
            )}
          </div>
{/* 
          {!isOtpLogin && (
            <input
              type="password"
              placeholder="Password *"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-700 outline-none"
            />
          )} */}

          {/* <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2 text-gray-600">
              <input type="checkbox" className="accent-green-700" />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-[#17565D] hover:underline">
              Forgot Password?
            </Link> 
          </div>
           */}

          <button
            type="submit"
            className="w-full bg-[#17565D] text-white py-3 rounded-lg hover:bg-[#FBBF24] hover:text-[#17565D] transition"
          >
            Submit
          </button>

         

          {/* <button
            type="button"
            className="w-full border border-gray-300 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="google"
              className="w-5 h-5"
            />
            Sign In with Google
          </button> */}
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-[#17565D] hover:underline">
            Create Account
          </Link>
        </p>
      </div>
    </div>

    {/* RIGHT SIDE - IMAGE + QUOTE */}
    <div className="hidden md:flex w-1/2 bg-gray-100 relative items-center justify-center">
      <img
        src={man} 
        alt="interior"
        className="w-full h-full object-cover"
      />
    
    </div>
  </div>
);

}
