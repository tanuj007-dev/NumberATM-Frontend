import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axiosApi from "../../api/axiosAPI";

const UpdateVIPNumber = ({ }) => {
    const [form, setForm] = useState({
        number: "",
        price: "",
        oldPrice: "",
        details: "",
        stock: '',
        premium: false,
      });
      const axios = axiosApi();
    const [editId, setEditId] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const vipData = JSON.parse(localStorage.getItem("vipToUpdate")); // Retrieve data from localStorage
        if (vipData) {
          // Convert string booleans to actual booleans
          const convertedData = Object.keys(vipData).reduce((acc, key) => {
            acc[key] = vipData[key] === "true" ? true : vipData[key] === "false" ? false : vipData[key];
            return acc;
          }, {});
          // console.log(vipData)
          setForm(convertedData);
          setEditId(convertedData._id);
        }
      }, []);
      
    
      const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        if(!confirm('Do you want to update the number?')) return;
        try {
            const response = await axios.put(`vip-numbers/${editId}`, form);
            toast.success("VIP number updated successfully!");
            navigate('/admin/vip-numbers')
            localStorage.removeItem("vipToUpdate"); // Clear localStorage after updating
        } catch (err) {
            // Handle error
            console.error("Failed to update VIP number:", err.response?.data || err.message);
            toast.error("An error occurred while updating the VIP number.");
        }
    };
    // console.log(form.premium)
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Update VIP Number</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="number"
          placeholder="Number"
          value={form.number}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="oldPrice"
          placeholder="Old Price"
          value={form.oldPrice}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="details"
          value={form.details}
          onChange={handleChange}
          placeholder="Details"
          className="w-full p-2 border rounded"
        ></textarea>
        {/* <input
            type="number"
            placeholder="Stock"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            className="border p-3 rounded-lg shadow-lg  focus:ring-2 focus:ring-teal-500 focus:outline-none"
          /> */}
          <div className="flex items-center gap-2">
          <label className="text-lg">Premium</label>
          <input
            type="checkbox"
            // placeholder="Old Price"
            value={form.premium}
            checked={form.premium}
            onChange={(e) => setForm({ ...form, premium: e.target.checked })}
            className="border p-3 rounded-lg shadow-lg  focus:ring-0 focus:ring-teal-500 focus:outline-none"
          />
          </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateVIPNumber;
