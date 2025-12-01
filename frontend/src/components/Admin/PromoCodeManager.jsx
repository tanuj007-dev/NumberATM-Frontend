import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axiosAPI from "../../api/axiosAPI";

const PromoManagement = () => {
    const [promos, setPromos] = useState([]);
    const [form, setForm] = useState({ code: "", discount: "", type: "fixed", expiryDate: "", usageLimit: "", minCartValue: "", maxDiscount: "" });
    const [editingId, setEditingId] = useState(null);
    const [filters, setFilters] = useState({ search: "", type: "", minCartValue: "", usageLimit: "", expiryDate: "" });
    const axios = axiosAPI();

    useEffect(() => {
        fetchPromos();
    }, []);

    const fetchPromos = async () => {
        try {
            const { data } = await axios.get("/promo/search", { params: filters });
            setPromos(data);
        } catch (error) {
            toast.error("Failed to load promos");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`/promo/${editingId}`, form);
                toast.success("Promo updated successfully");
            } else {
                await axios.post("/promo", form);
                toast.success("Promo created successfully");
            }
            fetchPromos();
            setEditingId(null);
            setForm({ code: "", discount: "", type: "fixed", expiryDate: "", usageLimit: "", minCartValue: "", maxDiscount: "" });
        } catch (error) {
            toast.error("Failed to save promo");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await axios.delete(`/promo/${id}`);
            toast.success("Promo deleted");
            fetchPromos();
        } catch (error) {
            toast.error("Failed to delete promo");
        }
    };

    const handleEdit = (promo) => {
        setEditingId(promo._id);
        setForm({
            ...promo,
            expiryDate: promo.expiryDate ? new Date(promo.expiryDate).toISOString().split("T")[0] : "",
        });
    };
    

    return (
        <div className="max-w-6xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Promo Code Management</h2>

            <div className="grid grid-cols-4 gap-4 mb-6">
                <input type="text" placeholder="Search Code" value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} className="p-2 border border-gray-500 rounded" />
                <select value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value })} className="p-2 border border-gray-500 rounded">
                    <option value="">All Types</option>
                    <option value="fixed">Fixed</option>
                    <option value="percentage">Percentage</option>
                </select>
                <input type="number" placeholder="Min Cart Value" value={filters.minCartValue} onChange={(e) => setFilters({ ...filters, minCartValue: e.target.value })} className="p-2 border border-gray-500 rounded" />
                <input type="date" placeholder="Expiry Date" value={filters.expiryDate} onChange={(e) => setFilters({ ...filters, expiryDate: e.target.value })} className="p-2 border border-gray-500 rounded" />
                {/* <input type="number" placeholder="Usage Limit" value={filters.usageLimit} onChange={(e) => setFilters({ ...filters, usageLimit: e.target.value })} className="p-2 border border-gray-500 rounded" /> */}
                <button onClick={fetchPromos} className="bg-blue-600 text-white p-2 rounded w-full">Apply Filters</button>
            </div>
            {editingId && (
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6 bg-gray-100 p-4 rounded">
                    <input type="text" placeholder="Code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} className="p-2 border rounded" required />
                    <input type="number" placeholder="Discount" value={form.discount} onChange={(e) => setForm({ ...form, discount: e.target.value })} className="p-2 border rounded" required />
                    <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="p-2 border rounded">
                        <option value="fixed">Fixed</option>
                        <option value="percentage">Percentage</option>
                    </select>
                    <input type="date" value={form.expiryDate} onChange={(e) => setForm({ ...form, expiryDate: e.target.value })} className="p-2 border rounded" required />
                    <input type="number" value={form.maxDiscount} onChange={(e) => setForm({ ...form, maxDiscount: e.target.value })} className="p-2 border rounded" required />
                    <input type="number" placeholder="Usage Limit" value={form.usageLimit} onChange={(e) => setForm({ ...form, usageLimit: e.target.value })} className="p-2 border rounded" />
                    <input type="number" placeholder="Min Cart Value" value={form.minCartValue} onChange={(e) => setForm({ ...form, minCartValue: e.target.value })} className="p-2 border  rounded" />
                    <div className="flex gap-3"><button type="button" onClick={() => { setEditingId(null) }} className="col-span-2 bg-red-500 text-white p-2 rounded">Cancel Update</button>
                        <button type="submit" className="col-span-2 bg-blue-600 text-white p-2 rounded">Update Promo</button></div>
                </form>
            )}
            <div className="mt-4">
                {promos.length === 0 ? (
                    <p className="text-gray-600 text-center">No promo codes found</p>
                ) : (
                    <table className="w-full text-nowrap border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="p-2 border border-gray-500">Code</th>
                                <th className="p-2 border border-gray-500">Discount</th>
                                <th className="p-2 border border-gray-500">Type</th>
                                <th className="p-2 border border-gray-500">Expiry</th>
                                <th className="p-2 border border-gray-500">Min Cart Value</th>
                                <th className="p-2 border border-gray-500">Max Discount</th>
                                <th className="p-2 border border-gray-500">Created At</th>
                                <th className="p-2 border border-gray-500">Usage Limit</th>
                                <th className="p-2 border border-gray-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {promos?.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt))?.map((promo) => (
                                <tr key={promo._id} className="text-center border">
                                    <td className="p-2 border border-gray-500">{promo.code}</td>
                                    <td className="p-2 border border-gray-500">{promo.type === "percentage" ? `${promo.discount}%` : `₹${promo.discount}`}</td>
                                    <td className="p-2 border border-gray-500">{promo.type}</td>
                                    <td className="p-2 border border-gray-500">{new Date(promo?.expiryDate).toLocaleString('en-Us', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                                    {/* <td className="p-2 border border-gray-500">₹{promo.minCartValue}</td> */}
                                    {promo.minCartValue?<td className="p-2 border border-gray-500">₹{promo.minCartValue}</td>:<td className="p-2 text-red-500 border border-gray-500">0</td>}
                                    {promo.maxDiscount?<td className="p-2 border border-gray-500">₹{promo.maxDiscount}</td>:<td className="p-2 text-red-500 border border-gray-500">Not Fixed</td>}
                                    <td className="p-2 border border-gray-500">{new Date(promo?.createdAt).toLocaleString('en-Us', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                                    <td className="p-2 border border-gray-500">{promo.usageLimit}</td>
                                    <td className="p-2 border border-gray-500 ">
                                        <div className="flex justify-center space-x-2">
                                        <button onClick={() => handleEdit(promo)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                                        <button onClick={() => handleDelete(promo._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default PromoManagement;

{/* <p className="text-sm text-gray-600">Expiry: {new Date(promo?.expiryDate).toLocaleString('en-Us', { day: '2-digit', month: 'short', year: 'numeric' })}</p> */}
// {
//     editingId && (
//         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6 bg-gray-100 p-4 rounded">
//             <input type="text" placeholder="Code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} className="p-2 border border-gray-500 rounded" required />
//             <input type="number" placeholder="Discount" value={form.discount} onChange={(e) => setForm({ ...form, discount: e.target.value })} className="p-2 border border-gray-500 rounded" required />
//             <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="p-2 border border-gray-500 rounded">
//                 <option value="fixed">Fixed</option>
//                 <option value="percentage">Percentage</option>
//             </select>
//             <input type="date" value={form.expiryDate} onChange={(e) => setForm({ ...form, expiryDate: e.target.value })} className="p-2 border border-gray-500 rounded" required />
//             <input type="number" placeholder="Usage Limit" value={form.usageLimit} onChange={(e) => setForm({ ...form, usageLimit: e.target.value })} className="p-2 border border-gray-500 rounded" />
//             <input type="number" placeholder="Min Cart Value" value={form.minCartValue} onChange={(e) => setForm({ ...form, minCartValue: e.target.value })} className="p-2 border border-gray-500 rounded" />
//             <div className="flex gap-3"><button type="button" onClick={() => { setEditingId(null) }} className="col-span-2 bg-red-500 text-white p-2 rounded">Cancel Update</button>
//                 <button type="submit" className="col-span-2 bg-blue-600 text-white p-2 rounded">Update Promo</button></div>
//         </form>
//     )
// }
// const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//         if (editingId) {
//             await axios.put(`/promo/${editingId}`, form);
//             toast.success("Promo updated successfully");
//         }
//         fetchPromos();
//         setEditingId(null);
//         setForm({ code: "", discount: "", type: "fixed", expiryDate: "", usageLimit: "", minCartValue: "" });
//     } catch (error) {
//         toast.error("Failed to save promo");
//     }
// };