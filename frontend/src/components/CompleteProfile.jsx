import { useEffect, useState } from "react";
import { FiEdit3, FiUser, FiLogOut } from "react-icons/fi";
import { BsCardList } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import UserAxiosAPI from "../api/userAxiosAPI";
import { setUser } from "../redux/user/userSlice";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import bgImage from "../assets/bg.jpg"
import { RxHamburgerMenu } from "react-icons/rx";
const ProfilePage = () => {
  const user = useSelector((state) => state.user?.user);
  const [userDetails, setUserDetails] = useState(user);
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const [activeTab, setActiveTab] = useState("profile");
  const [showPopup, setShowPopup] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // ✅ Logout Popup
  const dispatch = useDispatch();
  const navigate = useNavigate();
const [sidebarOpen, setSidebarOpen] = useState(false);
const sidebarMenu = (isMobile = false) => (
  <div className="space-y-3">

    <button
      onClick={() => { setActiveTab("profile"); isMobile && setSidebarOpen(false); }}
      className={`w-full text-left py-3 px-4 rounded-xl text-base font-semibold transition 
      ${activeTab === "profile" ? "bg-[#F5C037]" : "bg-white hover:bg-[#F5C037]/60"}`}
    >
      Personal Information
    </button>

    <button
      onClick={() => { setActiveTab("address"); isMobile && setSidebarOpen(false); }}
      className={`w-full text-left py-3 px-4 rounded-xl text-base font-semibold transition 
      ${activeTab === "address" ? "bg-[#F5C037]" : "bg-white hover:bg-[#F5C037]/60"}`}
    >
      Manage Address
    </button>

   <button
  onClick={() => { setActiveTab("orders"); isMobile && setSidebarOpen(false);  navigate("/orders"); }}
  className={`w-full text-left py-3 px-4 rounded-xl text-base font-semibold transition 
  ${activeTab === "orders" ? "bg-[#F5C037]" : "bg-white hover:bg-[#F5C037]/60"}`}
>
   
    My Orders
  
</button>

<button
  onClick={() => { setActiveTab("favorites"); isMobile && setSidebarOpen(false);  navigate("/favorites"); }}
  className={`w-full text-left py-3 px-4 rounded-xl text-base font-semibold transition 
  ${activeTab === "favorites" ? "bg-[#F5C037]" : "bg-white hover:bg-[#F5C037]/60"}`}
>
   
    My Favorites
   
</button>


    <button
      onClick={() => { setShowLogoutModal(true); isMobile && setSidebarOpen(false); }}
      className="w-full text-left py-3 px-4 rounded-xl text-base font-semibold bg-white hover:bg-[#F5C037]/60 transition"
    >
      Logout
    </button>
  </div>
);

  // Address Fields
  const [addressData, setAddressData] = useState({
    postalCode: "",
    address: "",
    city: "",
    state: "",
  });

  const profileUI = () => (
  <>
    <div className="space-y-5">
      {["name", "phone", "email"].map((field) => (
        <div key={field}>
          <label className="block text-black text-lg font-medium mb-2 capitalize">
            {field}
          </label>

          <div className="flex items-center gap-3">
            {editingField === field ? (
              <input
                type="text"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                className="flex-1 border rounded-lg px-4 py-2 text-black focus:ring-2 focus:outline-none"
              />
            ) : (
              <input
                type="text"
                value={userDetails?.[field] || "Not Set"}
                readOnly
                className="flex-1 border rounded-lg px-4 py-2 bg-white text-black"
              />
            )}

            <button
              onClick={() =>
                editingField === field ? handleSave() : handleEdit(field)
              }
              className="p-2 rounded-full border bg-white hover:bg-[#F5C037] transition"
            >
              {editingField === field ? "✔" : <FiEdit3 size={18} />}
            </button>
          </div>
        </div>
      ))}
    </div>

    <div className="mt-8">
      <button
        onClick={handleSave}
        className="w-full py-3 bg-[#17565D] text-white font-semibold rounded-lg hover:bg-[#F5C037] hover:text-[#17565D] transition-all"
      >
        Save Profile
      </button>
    </div>
  </>
);

const addressUI = () => (
  <>
    <div className="space-y-5">
      {["postalCode", "address", "city", "state"].map((field) => (
        <div key={field}>
          <label className="block text-black text-lg font-medium mb-2 capitalize">
            {field.replace(/([A-Z])/g, " $1")}
          </label>

          <input
            type="text"
            name={field}
            value={addressData[field]}
            onChange={handleAddressChange}
            placeholder={`Enter your ${field}`}
            className="w-full border rounded-lg px-4 py-2 bg-white focus:ring-2 focus:outline-none"
          />
        </div>
      ))}
    </div>

    <div className="mt-8">
      <button
        onClick={handleAddressSave}
        className="w-full py-3 bg-[#F5C037] text-green-900 font-semibold rounded-lg hover:bg-[#17565D] hover:text-white transition-all"
      >
        Save Address
      </button>
    </div>
  </>
);


const logoutModalUI = () => (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl shadow-2xl w-[90%] max-w-md p-6 relative animate-fadeIn">

      {/* Top Icon */}
      <div className="flex justify-center relative mb-4">
        <div className="absolute top-1/2 left-0 w-full h-[3px] bg-[#F5C037] rounded-full"></div>
        <div className="bg-[#F5C037] text-white rounded-full p-3 z-10">
          <FiLogOut size={24} />
        </div>
      </div>

      <h2 className="text-xl font-bold text-[#17565D] text-center mb-2">
        Log Out Your Account?
      </h2>

      <p className="text-gray-700 text-center mb-6">
        Are you sure you want to log out?
      </p>

      <div className="flex gap-4 justify-center">
        <button
          onClick={() => setShowLogoutModal(false)}
          className="border-2 border-[#17565D] rounded-md px-6 py-2 bg-[#F5C037] font-semibold hover:bg-[#17565D] hover:text-white transition"
        >
          Cancel
        </button>

        <button
          onClick={handleLogoutConfirm}
          className="border-2 border-[#17565D] rounded-md px-6 py-2 bg-[#F5C037] font-semibold hover:bg-[#17565D] hover:text-white transition"
        >
          Log Out
        </button>
      </div>

      {/* Close Button */}
      <button
        onClick={() => setShowLogoutModal(false)}
        className="absolute top-1 right-2 bg-[#F5C037] text-gray-700 p-1 rounded-full"
      >
        <RxCross2 size={20} />
      </button>
    </div>
  </div>
);


  const handleAddressChange = (e) => {
    setAddressData({ ...addressData, [e.target.name]: e.target.value });
  };

  const handleAddressSave = async () => {
    try {
      const axios = UserAxiosAPI();
      await axios.put("/user/address", addressData);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    } catch (err) {
      console.error("Error saving address:", err);
      toast.error("Failed to update address. Try again.");
    }
  };

  const handleEdit = (field) => {
    setEditingField(field);
    setTempValue(userDetails[field]);
  };

  const validateField = (field, value) => {
    if (!value.trim()) return `${field} cannot be empty`;
    if (field === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "Invalid email address";
    }
    if (field === "phone") {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(value)) return "Phone number must be 10 digits";
    }
    return null;
  };

  const handleSave = async () => {
    const error = validateField(editingField, tempValue);
    if (error) {
      toast.error(error);
      return;
    }

    try {
      const updatedDetails = { ...userDetails, [editingField]: tempValue };
      setUserDetails(updatedDetails);
      const axios = UserAxiosAPI();
      const { data } = await axios.put("/user", updatedDetails);
      dispatch(setUser(data));
      setEditingField(null);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Something went wrong while saving.");
    }
  };

  const handleLogoutConfirm = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    setUserDetails(user);
  }, [user]);

  const popupUI = () => (
  <div className="fixed bottom-5 right-5 bg-[#17565D] text-white px-4 py-2 rounded-lg shadow-lg animate-fadeIn z-[9999]">
    Saved Successfully!
  </div>
);

return (
  <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 py-4">

    {/* MOBILE HAMBURGER BUTTON */}
    <div className="md:hidden flex justify-start mb-3">
     <button
  onClick={() => setSidebarOpen(!sidebarOpen)}
  className="relative w-10 bg-white h-10 flex flex-col justify-between p-2"
>
  <span className={`h-[3px] w-full bg-[#17565D] rounded transition-all duration-300 
    ${sidebarOpen ? "rotate-45 translate-y-3" : ""}`}></span>

  <span className={`h-[3px] w-full bg-[#17565D] rounded transition-all duration-300
    ${sidebarOpen ? "opacity-0" : ""}`}></span>

  <span className={`h-[3px] w-full bg-[#17565D] rounded transition-all duration-300 
    ${sidebarOpen ? "-rotate-45 -translate-y-3" : ""}`}></span>
</button>

    </div>

    {/* PAGE LAYOUT (desktop: row / mobile: column) */}
    <div className="flex flex-col md:flex-row gap-4">

      {/* ================================================================================= */}
      {/* DESKTOP SIDEBAR (VISIBLE ONLY ON MD+) */}
      {/* ================================================================================= */}
      <div className="hidden md:block w-1/3 bg-white/40 backdrop-blur-md p-4 rounded-2xl shadow-lg">
        {sidebarMenu()}
      </div>

      {/* ================================================================================= */}
      {/* MOBILE SIDEBAR OVERLAY (click to close) */}
      {/* ================================================================================= */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[990]"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* ================================================================================= */}
      {/* MOBILE SIDE DRAWER */}
      {/* ================================================================================= */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-white shadow-2xl p-4 rounded-r-2xl z-[999]
          transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300 md:hidden
        `}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="mb-4 p-2 bg-[#17565D] text-white rounded-full"
        >
          <RxCross2 size={20} />
        </button>

        {sidebarMenu(true)}
      </div>

      {/* ================================================================================= */}
      {/* RIGHT SIDE MAIN CONTENT (FULL WIDTH ON MOBILE) */}
      {/* ================================================================================= */}
      <div className="flex-1 bg-white/30 shadow-xl backdrop-blur-md border border-white/30 rounded-2xl p-5 sm:p-8">

        {/* Breadcrumb */}
        <div className="text-sm mb-6 flex items-center gap-2">
          <Link to="/" className="text-[#F5C037] font-medium">Home</Link>
          <span className="text-[#F5C037]">›</span>
          <span className="font-semibold text-[#F5C037] capitalized">{activeTab}</span>
        </div>

        {/* Tabs (make compact on mobile) */}
        <div className="flex justify-around gap-1 sm:gap-2 py-3 mb-8">

          {/* Profile */}
          <button
            onClick={() => setActiveTab("profile")}
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition border-2
            ${activeTab === "profile" ? "bg-[#F5C037]" : "bg-white hover:bg-[#F5C037]/60"} border-black`}
          >
            <FiUser size={22} className="text-green-900" />
          </button>

          {/* Address */}
          <button
            onClick={() => setActiveTab("address")}
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition border-2
            ${activeTab === "address" ? "bg-[#F5C037]" : "bg-white hover:bg-[#F5C037]/60"} border-black`}
          >
            <BsCardList size={22} className="text-green-900" />
          </button>

          {/* Logout */}
          <button
            onClick={() => setShowLogoutModal(true)}
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition border-2
            ${activeTab === "logout" ? "bg-[#F5C037]" : "bg-white hover:bg-[#F5C037]/60"} border-black`}
          >
            <FiLogOut size={22} className="text-green-900" />
          </button>
        </div>

        {/* PROFILE TAB */}
        {activeTab === "profile" && profileUI()}

        {/* ADDRESS TAB */}
        {activeTab === "address" && addressUI()}

      </div>
    </div>

    {/* POPUP */}
    {showPopup && popupUI()}

    {/* LOGOUT MODAL */}
    {showLogoutModal && logoutModalUI()}
  </div>
);

};

export default ProfilePage;


// import { useEffect, useState } from "react";
// import { FiEdit3 } from "react-icons/fi";
// import { useDispatch, useSelector } from "react-redux";
// import UserAxiosAPI from "../api/userAxiosAPI";
// import { setUser } from "../redux/user/userSlice";
// import toast from "react-hot-toast";

// const ProfilePage = () => {
//   const user = useSelector((state) => state.user?.user)
//   const [userDetails, setUserDetails] = useState(user);
//   const [editingField, setEditingField] = useState(null);
//   const [tempValue, setTempValue] = useState("");
//   const handleEdit = (field) => {
//     setEditingField(field);
//     setTempValue(userDetails[field]);
//   };
//   const validateField = (field, value) => {
//     if (!value.trim()) return `${field} cannot be empty`;
  
//     if (field === "email") {
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!emailRegex.test(value)) return "Invalid email address";
//     }
  
//     if (field === "phone") {
//       const phoneRegex = /^[0-9]{10}$/; // Adjust based on your locale
//       if (!phoneRegex.test(value)) return "Phone number must be 10 digits";
//     }
  
//     return null;
//   };
  
//   useEffect(() => {
//     window.scrollTo({top:0, behavior:"smooth"})
//   }, []);
//   useEffect(() => {
//     setUserDetails(user);
//   }, [user]);
//   const dispatch = useDispatch();
//   const handleSave = async () => {
//     const error = validateField(editingField, tempValue);
//     if (error) {
//       toast.error(error); // You can use toast or modal for better UX
//       return;
//     }
  
//     try {
//       const updatedDetails = { ...userDetails, [editingField]: tempValue };
//       setUserDetails(updatedDetails);
//       const axios = UserAxiosAPI();
//       const { data } = await axios.put('/user', updatedDetails);
//       dispatch(setUser(data));
//       setEditingField(null);
//       checkProfileCompletion();
//     } catch (err) {
//       console.error("Error updating profile:", err);
//       toast.error("Something went wrong while saving. Please try again.");
//     }
//   };

//   const checkProfileCompletion = () => {
//     if (userDetails?.name && userDetails?.phone) {
//       setUsers((prev) => ({ ...prev, profileCompleted: true }));
//     }
//   };
//   const axios = UserAxiosAPI();
//   const [meta, setMeta] = useState({ title: "", tags: "", description: "" });
//   useEffect(() => {
//     axios.get(`/meta/Profile`).then(({ data }) => {
//       setMeta(data || { title: "", tags: "", description: "" });
//     });
//   }, []);
//   return (
//     <>
//       <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
//         <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
//           <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Profile</h2>
//           <div className="space-y-4">
//             {["name", "phone", "email"].map((field) => (
//               <div key={field} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm">
//                 <span className="text-gray-700 capitalize">{field}:</span>
//                 {editingField === field ? (
//                   <input
//                     type="text"
//                     value={tempValue}
//                     onChange={(e) => setTempValue(e.target.value)}
//                     className="border p-1 rounded focus:outline-none w-2/3"
//                   />
//                 ) : (
//                   <span className="text-gray-900">{userDetails?.[field] || "Not Set"}</span>
//                 )}
//                 <button
//                   className="text-blue-600 bg-white hover:text-blue-800"
//                   onClick={() => (editingField === field ? handleSave() : handleEdit(field))}
//                 >
//                   {editingField === field ? "✔" : <FiEdit3 />}
//                 </button>
//               </div>
//             ))}
//           </div>
//           <div className="mt-6 text-center">
//             <span className={`text-sm font-semibold ${userDetails?.profileCompleted ? "text-green-600" : "text-red-500"}`}>
//               {userDetails?.profileCompleted ? "Profile Completed" : "Profile Incomplete"}
//             </span>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProfilePage;
