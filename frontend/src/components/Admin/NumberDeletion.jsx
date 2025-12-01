import React, { useState } from "react";
const XLSX = await import("xlsx"); // ✅ Use 
import { toast } from "react-hot-toast";
import { FaCloudUploadAlt, FaTrash } from "react-icons/fa";
import axiosAPI from "../../api/axiosAPI";

const NumberDelete = () => {
  const [numbers, setNumbers] = useState([]);
  const [inputText, setInputText] = useState("");
  const axios = axiosAPI();

  const extractNumbers = (text) => {
    const extracted = text.match(/\b\d{10}\b/g);
    setNumbers([...new Set(extracted)] || []);
  };

  const handleTextChange = (e) => {
    setInputText(e.target.value);
    extractNumbers(e.target.value);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const extracted = rows.flatMap((row) =>
        row.flatMap((cell) => String(cell).match(/\b\d{10}\b/g) || [])
      );

      setNumbers([...new Set(extracted)]);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleDelete = async () => {
    if (numbers.length === 0) {
      toast.error("No valid numbers to delete.");
      return;
    }

    try {
      const res = await axios.post("/vip-numbers/sold-update", { numbers });
      toast.success(res.data.message);
      setNumbers([]);
      setInputText("");
    } catch (error) {
      toast.error("Error deleting numbers.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-[100%] flex justify-center flex-col bg-white shadow-lg rounded-xl">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Update with Sold Updates</h2>

      {/* Text Input */}
      <textarea
        className="w-full border border-gray-300 p-3 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        placeholder="Paste numbers here (comma, space, or new line separated)..."
        value={inputText}
        onChange={handleTextChange}
        rows={4}
      />

      {/* File Upload */}
      <div className="flex items-center gap-3 mt-4">
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="hidden"
          id="fileUpload"
        />
        <label
          htmlFor="fileUpload"
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 transition"
        >
          <FaCloudUploadAlt className="text-blue-500 text-2xl" />
          Upload Excel
        </label>
      </div>

      {/* Display Extracted Numbers */}
      {numbers.length > 0 && (
        <div className="bg-gray-50 mt-6 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Extracted Numbers ({numbers.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {numbers.map((num, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white px-3 py-2 rounded-md shadow-md"
              >
                <span className="text-gray-700 font-medium">{num}</span>
                <button
                  onClick={() => setNumbers(numbers.filter((n) => n !== num))}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Confirm & Delete Button */}
      <button
        className={`w-full mt-6 px-4 py-2 rounded-md text-white transition ${
          numbers.length === 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-red-600 hover:bg-red-700"
        }`}
        onClick={handleDelete}
        disabled={numbers.length === 0}
      >
        Confirm & Delete ({numbers.length})
      </button>
    </div>
  );
};

export default NumberDelete;
