import { useState } from "react";
import { toast } from "react-hot-toast";
import axiosAPI from "../../api/axiosAPI";

const AdminPromoForm = () => {
    const axios = axiosAPI();
    const [promoData, setPromoData] = useState({
        code: "",
        discount: "",
        type: "percentage",
        expiryDate: "",
        minCartValue: "",
        maxDiscount: "",
        usageLimit: "",
    });

    const handleChange = (e) => {
        setPromoData({ ...promoData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/promo/admin/create", promoData);
            toast.success("Promo code created successfully!");
            setPromoData({ code: "", discount: "", type: "percentage", expiryDate: "", minCartValue: "", maxDiscount: "", usageLimit: "" });
        } catch (error) {
            toast.error(error.response?.data?.message || "Error creating promo code");
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg flex flex-col justify-center items-center mt-12 my-6 p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Create Promo Code</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="code" placeholder="Promo Code" value={promoData.code} onChange={handleChange} required className="w-full p-2 border rounded" />
                <input type="number" name="discount" placeholder="Discount Amount" value={promoData.discount} onChange={handleChange} required className="w-full p-2 border rounded" />

                <select name="type" value={promoData.type} onChange={handleChange} className="w-full p-2 border rounded">
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                </select>

                <input type="date" name="expiryDate" value={promoData.expiryDate} onChange={handleChange} required className="w-full p-2 border rounded" />
                <input type="number" name="minCartValue" placeholder="Min Cart Value (Optional)" value={promoData.minCartValue} onChange={handleChange} className="w-full p-2 border rounded" />
                <input type="number" name="maxDiscount" placeholder="Max Discount (Optional)" value={promoData.maxDiscount} onChange={handleChange} className="w-full p-2 border rounded" />
                <input type="number" name="usageLimit" placeholder="Usage Limit" value={promoData.usageLimit} onChange={handleChange} required className="w-full p-2 border rounded" />

                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                    Create Promo Code
                </button>
            </form>
        </div>
    );
};

export default AdminPromoForm;
