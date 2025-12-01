import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserAxiosAPI from "../api/userAxiosAPI";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { login } from "../redux/user/userSlice";
import man from "../assets/man2.png"
export default function CreateAccount() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const axios = UserAxiosAPI();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !password || !confirmPassword) {
      setError("fill the required fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    try {
      const {data} = await axios.post("/user/register", {
        name,
        phone,
        email,
        password,
      });

      Cookies.set("NumberAtmUser", data.token, { expires: 30 }); // Store token for 7 days
      dispatch(login(data?.user));
      navigate("/"); // Redirect to home page
    } catch (err) {
      console.log(err)
      if(err.response?.data?.code===11000){
        setError('This email already exists!');
      }
      else setError(err.response?.data?.message || "Registration failed.");
    }
  };
  return (
  <div className="flex min-h-screen">
    {/* LEFT SIDE - IMAGE SECTION */}
    <div className="hidden md:flex w-1/2 relative items-center justify-center bg-gray-100">
      <img
        src={man} // replace this with your actual image path
        alt="furniture"
        className="w-full h-full object-cover    "
      />

     
    </div>

    {/* RIGHT SIDE - SIGN UP FORM */}
    <div className="flex flex-col justify-center px-8 py-10 w-full md:w-1/2 bg-white">
      <div className="max-w-md mx-auto w-full">
        {/* LOGO + TITLE */}
        {/* <div className="flex items-center mb-6 space-x-2">
          <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-white font-bold text-lg">
            F
          </div>
          <h1 className="text-xl font-semibold text-gray-800">Furniture.</h1>
        </div> */}

        <h2 className="text-4xl font-semibold text-[#17565D] mb-2">Create Account</h2>
        <p className="text-gray-700 text-sm mb-6">
          Please fill in the details to create your account.
        </p>

        {/* EXISTING FUNCTIONAL FORM */}
        {error && (
          <p className="text-red-500 text-sm text-center mb-6">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-700 outline-none"
          />
          <input
            type="text"
            placeholder="Phone Number *"
            value={phone}
            onChange={(e) => {
              if (e.target.value.length > 10) return;
              setPhone(e.target.value);
            }}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-700 outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-700 outline-none"
          />
          <input
            type="password"
            placeholder="Password *"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-700 outline-none"
          />
          <input
            type="password"
            placeholder="Confirm Password *"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-700 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-[#17565D] text-white py-3 rounded-lg mt-2 hover:bg-[#FBBF24] hover:text-[#17565D] transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-[#17565D] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  </div>
);

}
