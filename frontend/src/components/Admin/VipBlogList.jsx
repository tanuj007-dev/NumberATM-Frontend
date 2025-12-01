import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import axiosAPI from "../../api/axiosAPI";

export default function AdminBlogList() {
    const axios = axiosAPI();
    // const { mainRef } = useContext(AdminState);
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);

    const fetchBlogs = () => axios.get("blogs").then((r) => setBlogs(r.data));
    useEffect(()=>{fetchBlogs()}, []);

    const handleDelete = async (id) => {
        if (!confirm("Do you really want to delete this blog?")) return;
        await axios.delete(`blogs/${id}`);
        fetchBlogs();
    };

    return (
        <div className="max-w-full mx-auto p-6 space-y-6">
            {/* header */}
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">Manage Blogs</h2>
                <button
                    onClick={() => navigate("/admin/add-blogs")}
                    className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    <FiPlus /> Add Blog
                </button>
            </div>

            {/* table / cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {blogs
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .map((blog) => (
                        <div
                            key={blog._id}
                            className="relative p-4 border rounded-lg bg-white shadow"
                        >
                           

                            <h3 className="font-semibold text-lg flex justify-start mb-1 line-clamp-2">
                                 {blog.imageUrl && (
                                <img
                                    src={blog.imageUrl}
                                    alt={blog.title}
                                    className="w-full h-16 object-contain rounded mb-3"
                                />
                            )} {blog.title}
                            </h3>
                            <p className="text-xs text-gray-500">
                                {new Date(blog.createdAt).toLocaleString()}
                            </p>

                            <div className="mt-3 flex gap-3">
                                <button
                                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                                    onClick={() => {
                                        setTimeout(() => navigate(`/admin/blogs/edit/${blog.slug}`), 50);
                                    }}
                                >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(blog._id)}
                                className="px-3 py-1 bg-red-600 text-white rounded"
                            >
                                Delete
                            </button>
                            
                        </div>
                        </div>
                    ))}
        </div>
        </div >
    );
}
