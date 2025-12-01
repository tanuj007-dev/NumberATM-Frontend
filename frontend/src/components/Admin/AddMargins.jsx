import { useEffect, useState } from "react";
import axiosAPI from "../../api/axiosAPI";
import { BsFillTrash2Fill, BsTrash } from "react-icons/bs";
import toast from "react-hot-toast";
import VendorsTable from "./Vendorstable";

const VendorManagement = () => {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [discount, setDiscount] = useState(0);
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [newVendor, setNewVendor] = useState({ name: "", discount: 0, margins: [] });
  const [margin, setMargin] = useState({ minPrice: "", maxPrice: "", marginPercent: "" });
  
  const axios = axiosAPI();
  const getVendors = ()=>{
    axios.get("vendors").then((res) => setVendors(res.data));
  }
  useEffect(() => {
    getVendors();
  }, []);

  const handleAddVendor = async () => {
    try {
      const res = await axios.post("vendors", newVendor);
      setVendors([...vendors, res.data]);
      setNewVendor({ name: "", discount: 0, margins: [] });
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddMargin = async () => {
    if (!selectedVendor) return alert("Please select a vendor.");
    try {
      const updatedVendor = await axios.put(`vendors/${selectedVendor}/margins`, { margin });
      setVendors(vendors.map(v => v._id === selectedVendor ? updatedVendor.data : v));
      setMargin({ minPrice: "", maxPrice: "", marginPercent: "" });
    } catch (error) {
      console.error(error);
    }
  };
  const deleteVendor = async (id) => {
    if(!confirm("Are you sure, deleting Vendor?")) return;
    try {
      const updatedVendor = await axios.delete(`vendors/${id}`);
      toast('Vendor Deleted',{icon:<BsTrash/>})
      getVendors();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddDiscount = async () => {
    if (!selectedVendor) return alert("Please select a vendor.");
    try {
      const updatedVendor = await axios.put(`vendors/${selectedVendor}/discount`, { discount });
      setVendors(vendors.map(v => v._id === selectedVendor ? updatedVendor.data : v));
      setDiscount(0);
      setShowDiscountInput(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-xl rounded-lg border border-gray-200">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Vendor Management</h1>

      <div className="mb-6">
        <label className="block mb-2 font-semibold text-gray-700">Select Vendor:</label>
        <select
          value={selectedVendor}
          onChange={(e) => setSelectedVendor(e.target.value)}
          className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
        >
          <option value="">Select Vendor</option>
          {vendors.map((vendor) => (
            <option key={vendor._id} value={vendor._id}>{vendor.name}</option>
          ))}
        </select>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setShowDiscountInput(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition w-full"
        >
          Add Discount
        </button>
        <button
          onClick={() => {setShowDiscountInput(false)}}
          className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition w-full"
        >
          Add Margin
        </button>
      </div>

      {selectedVendor && !showDiscountInput && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">Add Margin</h2>
          <div className="grid grid-cols-3 gap-3">
            <input type="number" placeholder="Min Price" value={margin.minPrice} onChange={(e) => setMargin({ ...margin, minPrice: e.target.value })} className="p-3 border rounded-lg w-full" />
            <input type="number" placeholder="Max Price" value={margin.maxPrice} onChange={(e) => setMargin({ ...margin, maxPrice: e.target.value })} className="p-3 border rounded-lg w-full" />
            <input type="number" placeholder="Margin %" value={margin.marginPercent} onChange={(e) => setMargin({ ...margin, marginPercent: e.target.value })} className="p-3 border rounded-lg w-full" />
          </div>
          <button onClick={handleAddMargin} className="bg-green-600 text-white px-6 py-3 mt-4 rounded-lg hover:bg-green-700 transition w-full">
            Add Margin
          </button>
        </div>
      )}

      {showDiscountInput && selectedVendor && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Add Discount</h2>
          <input type="number" placeholder="Discount %" value={discount} onChange={(e) => setDiscount(e.target.value)} className="p-3 border rounded-lg w-full" />
          <button onClick={handleAddDiscount} className="bg-green-600 text-white px-6 py-3 mt-4 rounded-lg hover:bg-green-700 transition w-full">
            Apply Discount
          </button>
        </div>
      )}
  {/* Add New Vendor */}
  {!selectedVendor && (
        <div className="mt-6 bg-gray-50 rounded-lg shadow-md p-3">
          <h2 className="text-lg font-semibold mb-2">Add New Vendor</h2>
          <div className="space-y-2">
            <input
              type="text" placeholder="Vendor Name" value={newVendor.name}
              onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })}
               className="p-3 border rounded-lg w-full"
            />
            <input
              type="number" placeholder="Discount" value={newVendor.discount}
              onChange={(e) => setNewVendor({ ...newVendor, discount: e.target.value })}
               className="p-3 border rounded-lg w-full"
            />
          </div>
          <button onClick={handleAddVendor} className="bg-blue-500 text-white px-6 py-3 mt-2 rounded-lg hover:bg-blue-600 transition w-full">
            Add Vendor
          </button>
        </div>
      )}
      <VendorsTable vendors={vendors} getVendors={getVendors}/>
    </div>
  );
};

export default VendorManagement;
