import { useState, useEffect, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BsTrash } from "react-icons/bs";
import axiosAPI from "../../api/axiosAPI";
import { Appstate } from "../../App";

function YouTubeFacade({ videoId }) {
  const [loadVideo, setLoadVideo] = useState(false);

  if (!videoId) return null;

  return (
    <div
      className="relative w-full pb-[56.25%] rounded-lg overflow-hidden cursor-pointer group"
      onClick={() => setLoadVideo(true)}
    >
      {loadVideo ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          loading="lazy"
          title="YouTube video"
          className="absolute top-0 left-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          frameBorder="0"
        ></iframe>
      ) : (
        <>
          <img
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt="YouTube thumbnail"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <svg
              className="w-14 h-14 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </>
      )}
    </div>
  );
}

export default function PosterUpload() {
  const [posters, setPosters] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [youtubeLink, setYoutubeLink] = useState("");
  const [posterLink, setPosterLink] = useState("");
  const [loading, setLoading] = useState(false);
  const { getOptimizedImage } = useContext(Appstate);
  const axios = axiosAPI();

  useEffect(() => {
    fetchPosters();
  }, []);

  const fetchPosters = async () => {
    try {
      const res = await axios.get("/posters");
      setPosters(res.data);
    } catch (error) {
      console.error("Error fetching posters:", error);
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
        formData.append("poster", selectedFile);
        formData.append("posterLink", posterLink);
        await axios.post("/posters/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else if (youtubeLink.trim()) {
        await axios.post("/posters/upload", { youtubeLink });
      }

      fetchPosters(); // Refresh posters
      setSelectedFile(null);
      setYoutubeLink("");
      toast.success("Added Poster Successfully");
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete it?")) return;
    try {
      await axios.delete(`/posters/${id}`);
      fetchPosters(); // Refresh posters
      toast("Deleted Poster Successfully", { icon: <BsTrash /> });
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gray-900 p-6 text-white">
      <h1 className="text-3xl font-semibold mb-6">Poster Management</h1>

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
        <input
          type="text"
          placeholder="Poster Link"
          value={posterLink}
          onChange={(e) => {
            setPosterLink(e.target.value);
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

      {/* Poster Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {posters.length > 0 ? (
          posters.map((poster) => (
            <div
              key={poster._id}
              className="relative group overflow-hidden rounded-xl shadow-lg bg-gray-800"
            >
              {poster.mediaType === "image" ? (
                <img
                  src={getOptimizedImage(poster.image)}
                  alt="Poster"
                  className="w-full h-auto object-stretch transition-transform duration-300 group-hover:scale-105"
                />
              ) : poster.mediaType === "video" ? (
                <video src={getOptimizedImage(poster.image)} controls className="w-full h-auto object-stretch" />
              ) : (
                <YouTubeFacade videoId={poster.youtubeId} />
              )}

              <button
                onClick={() => handleDelete(poster._id)}
                className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-400 col-span-full text-center">No posters available</p>
        )}
      </div>
    </div>
  );
}
