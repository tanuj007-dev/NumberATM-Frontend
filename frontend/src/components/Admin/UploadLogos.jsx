import { useState, useEffect } from "react";
import { FaTrash, FaCloudUploadAlt } from "react-icons/fa";
import axiosAPI from "../../api/axiosAPI";
import toast from "react-hot-toast";

export default function AdminClientLogos() {
  const [logos, setLogos] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const axios = axiosAPI();
  useEffect(() => {
    fetchLogos();
  }, []);

  const fetchLogos = async () => {
    const res = await axios.get("/logos");
    setLogos(res.data);
  };

  const handleUpload = async () => {
    setLoading(true);
    try {
      if (!file) return;
      const formData = new FormData();
      formData.append("logo", file);

      await axios.post("/logos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFile(null);
      fetchLogos();
    } catch (e) {
      console.error(e);
      toast.error("Upload failed")
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Do you really want to delete it?')) return
    await axios.delete(`/logos/${id}`);
    fetchLogos();
  };

  return (
    <div className="p-8 min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Manage Client Logos</h1>
      <div className="flex gap-4 mb-6 w-full max-w-lg items-center bg-gray-900 p-4 rounded-xl shadow-xl border border-gray-700">
        <label className="w-full flex items-center gap-3 bg-gray-800 text-gray-300 p-3 rounded-lg cursor-pointer border border-gray-700 hover:border-blue-500 transition">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
          />
          <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          <span className="text-sm text-gray-400">
            {file ? file.name : "Upload an image"}
          </span>
        </label>
        <button onClick={handleUpload} disabled={loading || !file} className="px-5 py-2.5 bg-gradient-to-r from-teal-500 to-purple-600 text-nowrap text-white font-light rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition disabled:bg-gray-600 disabled:cursor-not-allowed">
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              Uploading...
            </span>
          ) : (
            "Upload"
          )}
        </button>
      </div>
      <div className="flex justify-center flex-wrap gap-6 w-full max-w-5xl">
        {logos.map((logo) => (
          <div key={logo._id} className="relative group bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 p-2 flex items-center justify-center">
            <img src={logo.url} alt="Client Logo" className="max-h-24 transition-opacity duration-300 group-hover:opacity-75" />
            <button
              className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleDelete(logo._id)}
            >
              <FaTrash size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}