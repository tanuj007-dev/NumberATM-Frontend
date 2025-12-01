import { useState, useEffect } from "react";
const XLSX = await import("xlsx");
import axiosAPI from "../../api/axiosAPI";
import { PiMicrosoftExcelLogoDuotone } from "react-icons/pi";
import toast from "react-hot-toast";

const SoldNumbersDashboard = () => {
  const [soldNumbers, setSoldNumbers] = useState([]);
  const [search, setSearch] = useState("");
  const [owner, setOwner] = useState("");
  const [saleDate, setSaleDate] = useState("");
  const [vendors, setVendors] = useState([]);

  const axios = axiosAPI();

  useEffect(() => {
    axios.get("vendors").then((res) => setVendors(res.data));
  }, []);

  useEffect(() => {
    fetchSoldNumbers();
  }, [search, owner, saleDate]);

  const fetchSoldNumbers = async () => {
    try {
      const { data } = await axios.get("/vip-numbers/sold", {
        params: { search, owner, saleDate },
      });
      setSoldNumbers(data.soldNumbers);
    } catch (error) {
      console.error("Error fetching sold numbers:", error);
    }
  };

  const exportToExcel = () => {
    if (!soldNumbers || soldNumbers.length === 0) {
      toast.error("No data to export!");
      return;
    }

    const ws = XLSX.utils.json_to_sheet(soldNumbers);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sold Numbers");
    XLSX.writeFile(wb, "SoldNumbers.xlsx");
  };

  return (
    <div className="p-4 lg:p-6 min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
      <h1 className="text-4xl font-extrabold mb-6 text-center">📞 Sold Numbers Dashboard</h1>

      <div className="flex flex-wrap justify-center gap-2 xl:gap-4 mb-6">
        <input
          type="text"
          placeholder="Search Number..."
          className="input input-bordered bg-white text-black px-2 lg:px-4 py-2 rounded-lg shadow-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          className="bg-white text-black px-2 lg:px-4 rounded-lg shadow-md"
        >
          <option value="">Select Vendor</option>
          {vendors.map((vendor) => (
            <option key={vendor._id} value={vendor.name}>
              {vendor.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          className="bg-white text-black px-2 lg:px-4 rounded-lg shadow-md"
          onChange={(e) => setSaleDate(e.target.value)}
        />
        <button
          onClick={exportToExcel}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 px-2 lg:px-4 rounded-lg shadow-md"
        >
          <PiMicrosoftExcelLogoDuotone /> Export
        </button>
      </div>

      <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-lg">
        <table className="w-full text-black">
          <thead>
            <tr className="bg-indigo-500 text-white text-lg">
              <th className="p-3 border">S.No</th>
              <th className="p-3 border">Number</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Category</th>
              <th className="p-3 border">Vendor</th>
              <th className="p-3 border">Sale Date</th>
            </tr>
          </thead>
          <tbody>
            {soldNumbers.length > 0 ? (
              soldNumbers.map((num, idx) => (
                <tr key={num._id} className="border-b hover:bg-gray-200">
                  <td className="p-3 border text-center">{idx + 1}</td>
                  <td className="p-3 border text-center">{num.number}</td>
                  <td className="p-3 border text-center">₹{num.price}</td>
                  <td className="p-3 border text-center">{num.category}</td>
                  <td className="p-3 border text-center">{num.owner?.name || "N/A"}</td>
                  <td className="p-3 border text-center">
                    {new Date(num.saleTime).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SoldNumbersDashboard;
