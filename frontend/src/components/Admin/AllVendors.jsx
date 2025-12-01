import React, { useEffect, useState } from "react";
const XLSX = await import("xlsx"); // Lighter alternative to 'xlsx'
import axiosAPI from "../../api/axiosAPI";

const VendorDashboard = () => {
  const [vendors, setVendors] = useState([]);
  const [search, setSearch] = useState("");
  const [filterShowcase, setFilterShowcase] = useState("all");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const axios = axiosAPI();

  useEffect(() => {
    axios.get("/vendors")
      .then((res) => setVendors(res.data))
      .catch((err) => console.error("Error fetching vendors:", err));
  }, []);

  const stopShowcase = (id, status) => {
    axios.put(`/vendors/${id}/stop`, { showCased: status })
      .then(() => {
        setVendors((prev) =>
          prev.map((v) => (v._id === id ? { ...v, showCased: status } : v))
        );
      })
      .catch((err) => console.error("Error updating vendor:", err));
  };

  const renewShowcase = (id, status) => {
    axios.put(`/vendors/${id}/renew`, { showCased: status })
      .then(() => {
        setVendors((prev) =>
          prev.map((v) => (v._id === id ? { ...v, showCased: status } : v))
        );
      })
      .catch((err) => console.error("Error updating vendor:", err));
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils?.json_to_sheet(vendors);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Vendors");
    XLSX.writeFile(workbook, "vendors.xlsx");
  };

  const filteredVendors = vendors.filter((vendor) =>
    vendor.name.toLowerCase().includes(search.toLowerCase()) &&
    (filterShowcase === "all" || vendor.showCased === (filterShowcase === "true"))
  );

  const sortedVendors = [...filteredVendors].sort((a, b) => {
    if (!sortField) return 0;
    return sortOrder === "asc"
      ? a[sortField] > b[sortField] ? 1 : -1
      : a[sortField] < b[sortField] ? 1 : -1;
  });

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Vendor Dashboard</h2>
        <button
          onClick={exportToExcel}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Export to Excel
        </button>
      </div>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name"
          className="border p-2 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={filterShowcase}
          onChange={(e) => setFilterShowcase(e.target.value)}
        >
          <option value="all">All</option>
          <option value="true">Showcased</option>
          <option value="false">Not Showcased</option>
        </select>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border cursor-pointer" onClick={() => setSortField("name")}>Name</th>
            <th className="p-2 border cursor-pointer" onClick={() => setSortField("discount")}>Discount</th>
            <th className="p-2 border">Showcased</th>
            <th className="p-2 border">Margins</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedVendors.map((vendor) => (
            <tr key={vendor._id} className="border hover:bg-gray-100">
              <td className="p-2 border">{vendor.name}</td>
              <td className="p-2 border">{vendor.discount}%</td>
              <td className="p-2 border">{vendor.showCased ? "Yes" : "No"}</td>
              <td className="p-2 border">{vendor.margins.length} tiers</td>
              <td className="p-2 border text-center flex gap-2">
                {vendor.showCased && (
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded"
                    onClick={() => stopShowcase(vendor._id, false)}
                  >
                    Stop Showcase
                  </button>
                )}
                {!vendor.showCased && (
                  <button
                    className="px-3 py-1 bg-green-500 text-white rounded"
                    onClick={() => renewShowcase(vendor._id, true)}
                  >
                    Renew Showcase
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendorDashboard;
