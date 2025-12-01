import { useEffect, useState } from "react";
const XLSX = await import("xlsx");
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import axiosAPI from "../../api/axiosAPI";

const VIPNumberExcelUploadWithVendor = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewData, setPreviewData] = useState([]);
  const [vendors, setVendors] = useState([]);
  const axios = axiosAPI();

  const getVendors = async () => {
    try {
      const { data } = await axios.get("/vendors");
      setVendors(data);
    } catch (err) {
      console.error("Error fetching vendors:", err);
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
    if (!previewData.length) {
      toast.error("No data to upload.");
      return;
    }

    setLoading(true);

    try {
      const vendorMap = {};
      let formData;

      for (let row of previewData) {
        if (!row.number || !row.price || !row.vendor) {
          toast.error("Missing required fields in some rows.");
          // console.log(row.number, row.price, row.vendor);
          return;
        }

        const vendorName = row.vendor.trim().toLowerCase();

        if (!vendorMap[vendorName]) {
          const existing = vendors.find(
            (v) => v.name.trim().toLowerCase() === vendorName
          );

          if (existing) {
            vendorMap[vendorName] = existing._id;
          } else {
            const { data: newVendor } = await axios.post("/vendors", {
              name: row.vendor.trim(),
            });
            vendorMap[vendorName] = newVendor._id;
            setVendors((prev) => [...prev, newVendor]);
          }
        }

        formData = new FormData();
        formData.append("file", file);
      }

      const { data } = await axios.post(
        "/vip-numbers/upload/vendor",
        formData
      );
      toast.success(
        `${data.message}\nInserted: ${data.inserted}\nSkipped: ${data.skipped}`
      );
      setFile(null);
      setPreviewData([]);
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Upload VIP Numbers (with Vendor)</h2>

      <div
        {...getRootProps()}
        className="border-2 border-dashed border-blue-400 rounded-lg p-6 cursor-pointer text-center mb-4 bg-blue-50 hover:bg-blue-100"
      >
        <input type="file" accept=".xlsx, .xls" {...getInputProps()} />
        <FaCloudUploadAlt className="text-4xl text-blue-500 mx-auto mb-2" />
        <p className="text-gray-700">Drag & drop Excel file here, or click to select</p>
      </div>

      {previewData.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2">Number</th>
                <th className="border px-3 py-2">View</th>
                <th className="border px-3 py-2">Price</th>
                <th className="border px-3 py-2">Vendor</th>
                <th className="border px-3 py-2">Category</th>
              </tr>
            </thead>
            <tbody>
              {previewData.slice(0, 5).map((row, index) => (
                <tr key={index}>
                  <td className="border px-3 py-2">{row.number || row.Number}</td>
                  <td className="border px-3 py-2">{row.view || row.View}</td>
                  <td className="border px-3 py-2">{row.price || row.Price}</td>
                  <td className="border px-3 py-2">{row.vendor || row.Vendor}</td>
                  <td className="border px-3 py-2">{row.category || row.Category}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-gray-500 mt-2 text-sm">Showing first 5 rows...</p>
        </div>
      )}

      <button
        onClick={handleUpload}
        className={`mt-4 w-full py-3 ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white font-semibold rounded-lg`}
        disabled={!file || loading}
      >
        {loading ? 'Uploading...' : 'Upload Data'}
      </button>
    </div>
  );
};

export default VIPNumberExcelUploadWithVendor;
