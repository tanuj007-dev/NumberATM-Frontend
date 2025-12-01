import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import axiosApi from "../../api/axiosAPI";
import axiosAPI from "../../api/axiosAPI";


const VIPNumbers = () => {
  const [vipNumbers, setVipNumbers] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [showNewVendorInput, setShowNewVendorInput] = useState(false);
  const [formData, setFormData] = useState({
    number: "",
    price: "",
    owner: ""
  });
  const axios = axiosAPI();
  const getVendors = async () => {
    try {
      const { data } = await axios.get('/vendors');
      setVendors(data);
    } catch (e) {
      console.log(e);
    }
  };
  const [editId, setEditId] = useState(null);
  const fetchVIPNumbers = async () => {
    try {
      const res = await axios.get("vip-numbers/admin");
      setVipNumbers(res.data.data);
    } catch (err) {
      toast.error("Failed to fetch VIP numbers.");
      console.error(err);
    }
  };
  useEffect(() => {
    fetchVIPNumbers();
    getVendors();
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!confirm('Do you really want to add the number?')) return;
    try {
      await axios.post(`vip-numbers`, formData);
      toast.success("VIP number updated successfully.");
      setFormData({ number: "", price: "", oldPrice: "", details: "" });
      setEditId(null);
      fetchVIPNumbers();
    } catch (err) {
      toast.error(err?.response?.data?.error||"An error occurred while saving the VIP number.");
      console.error(err);
    }
  };



  return (
    <div className="container mx-auto p-4">
      <Toaster />
      <h1 className="text-3xl font-bold mb-6 text-teal-600">Add VIP Numbers</h1>

      <form className="mb-8 p-4 rounded-lg shadow-lg  bg-gray-50" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Number"
            value={formData.number}
            onChange={(e) => setFormData({ ...formData, number: e.target.value })}
            className="border p-3 rounded-lg shadow-lg  focus:ring-2 focus:ring-teal-500 focus:outline-none"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="border p-3 rounded-lg shadow-lg  focus:ring-2 focus:ring-teal-500 focus:outline-none"
            required
          />

        </div>
        <div className="my-3">
          <label className="block text-gray-700 mb-1">Select Vendor</label>
          {!showNewVendorInput ? (
            <div className="flex flex-wrap items-center gap-2">
              <select
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                value={formData.owner}
                onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
              >
                <option value="">Select a Vendor</option>
                {vendors.map((vendor) => (
                  <option key={vendor._id} value={vendor._id}>
                    {vendor.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="px-3 py-2 text-nowrap bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={() => setShowNewVendorInput(true)}
              >
                Add New Vendor
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Enter new vendor name"
                value={formData.owner}
                onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
              />
              <button
                type="button"
                className="px-3 py-2 text-nowrap bg-teal-500 text-white rounded-md hover:bg-blue-600"
                onClick={() => setShowNewVendorInput(false)}
              >
                Choose Vendor
              </button>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-teal-500 text-white px-6 py-2 rounded-lg shadow-lg  mt-4 hover:bg-teal-600 focus:ring-2 focus:ring-teal-400 focus:outline-none"
        >
          {editId ? "Update" : "Add"} VIP Number
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vipNumbers.map((vip) => (
          <div
            key={vip._id}
            className="border p-6 rounded shadow-lg bg-gray-50 hover:shadow-xl transition-shadow duration-200"
          >
            <h2 className="text-xl font-bold text-teal-600">{vip.number}</h2>
            <p className="text-gray-700">Price: ₹{vip.price}</p>
            <p className="text-gray-700">Vendor: {vip?.owner?.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VIPNumbers;
