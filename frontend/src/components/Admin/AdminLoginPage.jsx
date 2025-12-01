import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axiosApi from '../../api/axiosAPI';
import Navbar from '../Navbar';
import admin from '../../assets/admin.png';
const AdminLoginPage = ({ setAdmin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };
  const axios = axiosApi();
  const checkAdmin = async()=>{
    
    const {data} = await axios.get('admin/check');
    if(data.success){
      setAdmin(true);
    }
  }
  const handleLogin = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post('admin/login',credentials)
      if (data.success) {
        toast.success('Logged in successfully!');
        localStorage.setItem('NAAdminToken',data.token)
        setAdmin(true);
      } else {
        toast.error('Invalid username or password!');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally{
      setLoading(false);
    }
  };

  useEffect(()=>{
    checkAdmin();
  },[])
 return (
  <>
    <Navbar/>

    <div className="flex flex-col md:flex-row h-[60vh] sm:h-[70vh] md:h-[80vh] w-full bg-white   ">

      {/* LEFT SIDE — FORM */}
      <div className="flex items-center justify-center w-full md:w-1/2 bg-gray-200 px-6">
        <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-center mb-6 justify-center text-[#17565D] flex gap-2">
            <Link to="/"></Link>
            NumberAtm Admin Login
          </h2>

          <div className="space-y-4">
            {/* Username */}
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
              value={credentials.username}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border border-gray-500 rounded-lg text-gray-700 focus:outline-none"
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter password"
                value={credentials.password}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-500 rounded-lg text-gray-700 focus:outline-none"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className={`w-full px-4 py-2 ${
                loading
                  ? "bg-[#17565D] cursor-not-allowed"
                  : "bg-[#17565D] hover:bg-[#F5C037]"
              } text-white rounded-lg hover:opacity-90`}
            >
              {loading ? "Logging In..." : "Log In"}
            </button>
          </div>

          <p className="mt-6 text-center flex gap-1 items-center text-sm text-gray-600">
            © {new Date().getFullYear()} NumberAtm. All Rights Reserved.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE — IMAGE */}
      <div className="hidden md:block w-1/2 h-full">
        <img
          src={admin} 
          alt="Admin Login Visual"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  </>
);

};

export default AdminLoginPage;
