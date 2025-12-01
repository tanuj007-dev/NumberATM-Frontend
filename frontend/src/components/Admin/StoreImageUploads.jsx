import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BsTrash } from "react-icons/bs";
import axiosAPI from "../../api/axiosAPI";
import { Link } from "react-router-dom";

export default function StoreImageUpload() {
  const [StoreImages, setStoreImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [youtubeLink, setYoutubeLink] = useState("");
  const [loading, setLoading] = useState(false);
  const axios = axiosAPI();

  useEffect(() => {
    fetchStoreImages();
  }, []);

  const fetchStoreImages = async () => {
    try {
      const res = await axios.get("/store-images");
      setStoreImages(res.data);
    } catch (error) {
      console.error("Error fetching StoreImages:", error);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setYoutubeLink(""); // Clear YouTube link if a file is selected
  };

  const handleUpload = async () => {
    if (!selectedFile && !youtubeLink.trim()) {
      return alert("Please select an image, video, or enter a YouTube link!");
    }

    setLoading(true);

    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("StoreImage", selectedFile);
        await axios.post("/store-images/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else if (youtubeLink.trim()) {
        await axios.post("/store-images/upload", { youtubeLink });
      }

      fetchStoreImages(); // Refresh StoreImages
      setSelectedFile(null);
      setYoutubeLink("");
      toast.success("Added StoreImage Successfully");
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete it?")) return;
    try {
      await axios.delete(`/store-images/${id}`);
      fetchStoreImages(); // Refresh StoreImages
      toast("Deleted StoreImage Successfully", { icon: <BsTrash /> });
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gray-900 p-6 text-white">
      <h1 className="text-3xl font-semibold mb-6">StoreImage Management</h1>

      <div className="flex flex-col gap-4 mb-6 w-full max-w-lg bg-gray-900 p-4 rounded-xl shadow-xl border border-gray-700">
        <label className="w-full flex items-center gap-3 bg-gray-800 text-gray-300 p-3 rounded-lg cursor-pointer border border-gray-700 hover:border-blue-500 transition">
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <span className="text-sm text-gray-400">
            {selectedFile ? selectedFile.name : "Upload an image or video"}
          </span>
        </label>

        <input
          type="text"
          placeholder="Or enter a YouTube link"
          value={youtubeLink}
          onChange={(e) => {
            setYoutubeLink(e.target.value);
            setSelectedFile(null); // Clear file if a YouTube link is entered
          }}
          className="w-full p-3 bg-gray-800 text-gray-300 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
        />

        <button
          onClick={handleUpload}
          className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition disabled:bg-gray-600 disabled:cursor-not-allowed"
          disabled={loading || (!selectedFile && !youtubeLink.trim())}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg
                className="w-4 h-4 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              Uploading...
            </span>
          ) : (
            "Upload"
          )}
        </button>
      </div>

      {/* StoreImage Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {StoreImages.length > 0 ? (
          StoreImages.map((StoreImage) => (
            <div
              key={StoreImage._id}
              className="relative group overflow-hidden rounded-xl shadow-lg bg-gray-800"
            >
              {StoreImage.mediaType === "image" ? (
                <img
                  src={StoreImage.image}
                  alt="StoreImage"
                  className="w-full h-auto object-stretch transition-transform duration-300 group-hover:scale-105"
                />
              ) : StoreImage.mediaType === "video" ? (
                <video src={StoreImage.image} controls className="w-full h-auto object-stretch" />
              ) : (
                <Link
                  src={`https://www.youtube.com/embed/${StoreImage.youtubeId}`}
                  title="YouTube video"
                  className="w-full h-56"
                  allowFullScreen
                >Youtube</Link>
              )}

              <button
                onClick={() => handleDelete(StoreImage._id)}
                className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-400 col-span-full text-center">No StoreImages available</p>
        )}
      </div>
    </div>
  );
}
