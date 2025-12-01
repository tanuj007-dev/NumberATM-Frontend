import { useContext, useState } from "react";
import axiosAPI from "../../api/axiosAPI";
import { Appstate } from "../../App";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ForgotPassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [message, setMessage] = useState("");

    const { setIsAdmin } = useContext(Appstate);
    const navigate = useNavigate();
    const axios = axiosAPI();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!oldPassword || !newPassword) {
            setMessage("All fields required.");
            return;
        }

        try {
            const response = await axios.post("/admin/reset-password", { oldPassword, newPassword });
            setMessage(response.data.message);
            toast.success(response.data.message);
            setIsAdmin(false);
            navigate('/admin');
            localStorage.removeItem('NAAdminToken');
        } catch (error) {
            console.log(error)
            setMessage(error.response?.data?.message || "An error occurred while requesting password reset.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Change Password</h2>

            {message && <div className="text-green-500 mb-4">{message}</div>}

            <form onSubmit={handleSubmit}>
                {/* Old Password */}
                <div className="mb-4 relative">
                    <label className="block mb-2">Old Password</label>
                    <input
                        type={showOldPassword ? "text" : "password"}
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="w-full p-2 pr-10 border rounded"
                        required
                    />
                    <span
                        className="absolute right-3 bottom-[20%] cursor-pointer text-gray-500"
                        onClick={() => setShowOldPassword(!showOldPassword)}
                    >
                        {showOldPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </span>
                </div>

                {/* New Password */}
                <div className="mb-4 relative">
                    <label className="block mb-2">New Password</label>
                    <input
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full p-2 pr-10 border rounded"
                        required
                    />
                    <span
                        className="absolute right-3 bottom-[20%] cursor-pointer text-gray-500"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                        {showNewPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </span>
                </div>

                <button
                    type="submit"
                    className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Reset Password
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;
