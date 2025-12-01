import React, { useState } from "react";
const XLSX = await import("xlsx");
import { FiUpload, FiTrash2 } from "react-icons/fi";
import UserAxiosAPI from "../../api/userAxiosAPI";
import axiosAPI from "../../api/axiosAPI";

const UploadVendors = () => {
  const [vendorNames, setVendorNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const axios = axiosAPI();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const names = parsedData.flat().filter((name) => typeof name === "string");
      setVendorNames(names);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = async () => {
    if (vendorNames.length === 0) return alert("No vendors to upload!");

    setLoading(true);
    try {
      await axios.post("vendors/excel", { names: vendorNames });
      alert("Vendors added successfully!");
      setVendorNames([]);
    } catch (error) {
      alert("Error adding vendors");
    }
    setLoading(false);
  };

  const removeName = (index) => {
    setVendorNames(vendorNames.filter((_, i) => i !== index));
  };

  return (
    <div className="flex items-center justify-center min-h-[100%] bg-gray-900 text-white">
      <div className="w-full max-w-2xl p-6 bg-gray-800 rounded-xl shadow-xl border border-gray-700">
        <h2 className="text-2xl font-semibold mb-6 text-center">Upload Vendors List</h2>

        <div className="flex gap-4 mb-6 w-full items-center bg-gray-900 p-4 rounded-xl shadow-lg border border-gray-700">
          <label className="w-full flex items-center gap-3 bg-gray-800 text-gray-300 p-3 rounded-lg cursor-pointer border border-gray-700 hover:border-teal-500 transition">
            <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} className="hidden" />
            <FiUpload className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-400">
              {vendorNames.length > 0 ? "File Uploaded" : "Upload Excel File"}
            </span>
          </label>
        </div>

        {vendorNames.length > 0 && (
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h3 className="text-lg font-medium mb-3">Extracted Vendor Names:</h3>
            <ul className="max-h-64 overflow-y-auto space-y-2">
              {vendorNames.map((name, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-700 p-2 rounded-lg">
                  <span className="text-gray-300">{name}</span>
                  <button onClick={() => removeName(index)} className="text-red-500 hover:text-red-600">
                    <FiTrash2 size={18} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading || vendorNames.length === 0}
          className="mt-6 w-full py-3 bg-gradient-to-r from-teal-500 to-purple-500 text-white font-medium rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              Uploading...
            </span>
          ) : (
            "Upload Vendors"
          )}
        </button>
      </div>
    </div>
  );
};

export default UploadVendors;
