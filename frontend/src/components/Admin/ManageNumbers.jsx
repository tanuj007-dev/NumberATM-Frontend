import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import axiosApi from '../../api/axiosAPI';
export default function ManageNumbers({}) {
    const [vipNumbers, setVipNumbers] = useState([]);
    const [filteredNumbers, setFilteredNumbers] = useState([]);
      const [searchQuery, setSearchQuery] = useState("");
      const [filterPrice, setFilterPrice] = useState("all");
      const [formData, setFormData] = useState({
        number: "",
        price: "",
        oldPrice: "",
        details: "",
      });
      const axios = axiosApi();
      useEffect(() => {
        fetchVIPNumbers();
      }, []);
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
        handleSearchAndFilter();
      }, [searchQuery, filterPrice, vipNumbers]);
      const navigate = useNavigate();
      const handleUpdateClick = (vip) => {
        localStorage.setItem("vipToUpdate", JSON.stringify(vip)); // Store VIP data in localStorage
        navigate("/admin/update-number"); // Navigate to the UpdateVIPNumber component
      };
      const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this VIP number?")) return;
    
        try {
          await axios.delete(`http://localhost:5000/api/vip-numbers/${id}`);
          toast.success("VIP number deleted successfully.");
          fetchVIPNumbers();
        } catch (err) {
          toast.error("Failed to delete the VIP number.");
          console.error(err);
        }
      };
    
      const handleSearchAndFilter = () => {
        let results = vipNumbers;
    
        if (searchQuery) {
          results = results.filter((vip) =>
            vip.number.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
    
        if (filterPrice !== "all") {
          const priceRange = filterPrice.split("-").map(Number);
          results = results.filter(
            (vip) =>
              parseInt(vip.price, 10) >= priceRange[0] &&
              parseInt(vip.price, 10) <= priceRange[1]
          );
        }
    
        setFilteredNumbers(results);
      };
    
      const handleSort = (key) => {
        const sorted = [...filteredNumbers].sort((a, b) => {
          if (key === "price") {
            return parseInt(a.price, 10) - parseInt(b.price, 10);
          }
          if (key === "number") {
            return a.number.localeCompare(b.number);
          }
          return 0;
        });
        setFilteredNumbers(sorted);
      };
  return (
    <div className='p-6 bg-white'>
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <input
          type="text"
          placeholder="Search by number"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-3 rounded w-full md:w-1/3 focus:ring-2 focus:ring-teal-500 focus:outline-none"
        />
        <select
          value={filterPrice}
          onChange={(e) => setFilterPrice(e.target.value)}
          className="border p-3 rounded w-full md:w-1/3 focus:ring-2 focus:ring-teal-500 focus:outline-none"
        >
          <option value="all">All Prices</option>
          <option value="0-50000">₹0 - ₹50000</option>
          <option value="50001-100000">₹50001 - ₹100000</option>
          <option value="100001-200000">₹100001 - ₹200000</option>
        </select>
        <div className="flex gap-2">
          <button
            onClick={() => handleSort("number")}
            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 focus:ring-2 focus:ring-teal-400 focus:outline-none"
          >
            Sort by Number
          </button>
          <button
            onClick={() => handleSort("price")}
            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 focus:ring-2 focus:ring-teal-400 focus:outline-none"
          >
            Sort by Price
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNumbers.map((vip) => (
          <div
            key={vip._id}
            className="border p-6 rounded-xl  bg-orange-100 shadow-xl transition-shadow duration-200"
          >
            <h2 className="text-xl font-bold text-teal-600">{vip.number}</h2>
            <p className="text-gray-700">Price: ₹{vip.price}</p>
            {vip.oldPrice && <p className="text-gray-500 line-through">Old Price: ₹{vip.oldPrice}</p>}
            <p className="text-gray-600">Details: {vip.details}</p>
            <p className="text-gray-600">Category: {vip.category}</p>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleUpdateClick(vip)}
                className="bg-yellow-500 text-white px-3 py-2 rounded-xl flex items-center gap-2 hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              >
                <FaEdit /> Edit
              </button>
              <button
                onClick={() => handleDelete(vip._id)}
                className="bg-red-500 text-white px-3 py-2 rounded-xl flex items-center gap-2 hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:outline-none"
              >
                <FaTrashAlt /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
