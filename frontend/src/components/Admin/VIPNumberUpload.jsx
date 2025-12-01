import { useEffect, useState } from "react";
const XLSX = await import("xlsx");
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import axiosAPI from "../../api/axiosAPI";

const VIPNumberUpload = () => {
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [owner, setOwner] = useState('');
  const [vendors, setVendors] = useState([]);
  const [showNewVendorInput, setShowNewVendorInput] = useState(false);

  const axios = axiosAPI();

  const getVendors = async () => {
    try {
      const { data } = await axios.get('/vendors');
      setVendors(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getVendors();
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setFile(file);
      readExcel(file);
    },
  });

  const readExcel = (file) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setPreviewData(parsedData);
    };
  };

  const handleUpload = async () => {
    if (!file) return toast.error("Please select a file");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("owner", owner);

    try {
      const { data } = await axios.post("/vip-numbers/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(`${data.message}\nInserted: ${data.inserted}\nSkipped: ${data.skipped}`);
      setPreviewData([]);
      setFile(null);
      setOwner("");
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Upload failed, please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[100%] bg-white">
      <div className="max-w-6xl mx-auto p-5 md:p-8 bg-white shadow-xl rounded-xl flex flex-col items-center space-y-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">VIP Number Upload</h2>

        <div className="mb-6 p-4 bg-gray-50 rounded-lg text-left border border-gray-200">
          <h3 className="font-semibold text-gray-700">Expected Excel Format</h3>
          <p className="text-xs md:text-sm text-gray-600">Ensure your Excel file has the following columns:</p>
          <ul className="list-disc list-inside text-xs md:text-sm text-gray-600 mt-2">
            <li><strong>Number</strong> - The VIP number</li>
            <li><strong>Price</strong> - The price of the number</li>
            <li><strong>Category (Optional)</strong> - The category of the number</li>
          </ul>
        </div>

        {/* Owner's Name Input */}
        <div className="mb-3 w-full">
          <label className="block text-gray-700 mb-1">Select Vendor</label>
          {!showNewVendorInput ? (
            <div className="flex flex-wrap items-center gap-2">
              <select
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
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
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
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

        <div
          {...getRootProps()}
          className="w-full p-6 border-2 border-dashed rounded-lg cursor-pointer flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition"
        >
          <input type="file" accept=".xlsx, .xls" {...getInputProps()} />
          <FaCloudUploadAlt className="text-blue-500 text-5xl mb-2" />
          <p className="text-gray-600 font-medium">Drag & drop an Excel file here, or click to select one</p>
        </div>

        {previewData.length > 0 && (
          <div className="w-full overflow-x-auto">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Preview Data</h3>
            <table className="w-full text-left border-collapse border border-gray-300 rounded-lg overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border p-2">Number</th>
                  <th className="border p-2">View</th>
                  <th className="border p-2">Price</th>
                  <th className="border p-2">Category</th>
                </tr>
              </thead>
              <tbody>
                {previewData.slice(0, 5).map((row, index) => (
                  <tr key={index} className="border">
                    <td className="p-2 border">{row.number || row.Number}</td>
                    <td className="p-2 border">{row.view || row.View || row.title || ""}</td>
                    <td className="p-2 border">{row.price || row.Price}</td>
                    <td className="p-2 border">{row.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-gray-500 mt-2 text-sm">Showing first 5 entries...</p>
          </div>
        )}

        <button
          onClick={handleUpload}
          className="w-full py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          disabled={!file}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default VIPNumberUpload;
