import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axiosAPI from "../../api/axiosAPI";
import { useLocation } from 'react-router-dom';
import { FiUpload } from "react-icons/fi";
import { Suspense } from "react";
import ReactQuillWrapper from "./ReactQuill";
const pages = ["Home", "About Us", "Contact Us", "Services", "Orders", "Checkout", "Blog", "Profile", "Number Details", "Get Airtel", "Choice Number", "Expensive Number", "How It Works", "Not Found", "Clients", "Store", "Privacy Policy", "Refund Policy", "Terms And Condition", "Tips And Track", "Unique Number", "Why Use Vip"]; // Predefined pages
const pageRoutes = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about-us" },
    { name: "Contact Us", path: "/contact" },
    { name: "Services", path: "/service" },
    { name: "Orders", path: "/orders" },
    { name: "Checkout", path: "/checkout" },
    { name: "Blog", path: "/vip-numbers" },
    { name: "Profile", path: "/profile" },
    { name: "Number Details", path: "/vip-number/" },
    { name: "Vip Numbers in City", path: "/vip-numbers-in" },
    { name: "Get Airtel", path: "/How-can-I-get-Airtel-VIP-number" },
    { name: "Choice Number", path: "/Can-I-get-the-SIM-number-of-my-choice" },
    { name: "Expensive Number", path: "/Most-Expensive-Mobile-Numbers-in-India" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "Not Found", path: "*" },
    { name: "Clients", path: "/clientele" },
    { name: "Store", path: "/numerology-vip-numbers" },
    { name: "Privacy Policy", path: "/Privacy-Policy" },
    { name: "Refund Policy", path: "/Returns-and-Refund-Policy" },
    { name: "Terms And Condition", path: "/Terms-and-Condition" },
    { name: "Tips And Track", path: "/Tips-tricks-to-get-a-VIP-number-or-fancy-phone-number" },
    { name: "Unique Number", path: "/How-can-I-get-a-unique-mobile-number" },
    { name: "Why Use Vip", path: "/Why-we-should-use-VIP-phone-numbers-in-india" },
];

const MetaManagement = () => {
    const location = useLocation();
    const [preview, setPreview] = useState(null)
    const modules = {
        toolbar: [
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
            [{ size: ["small", false, "large", "huge"] }],
            ["blockquote", "code-block"],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ direction: "rtl" }],
            ['link', 'image'],
            ['clean'],
        ],
    };

    const formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        // 'video',
        'color',       // ✅ Add this
        'background',  // ✅ Add this
        'align',
        'direction'
    ];
    const [loading, setLoading] = useState(false);
    const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
            const byteNumbers = new Array(slice.length);

            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        return new Blob(byteArrays, { type: contentType });
    };

    const uploadResource = async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        try {
            const { data } = await axios.post("/meta/quill/upload", formData);

            return data; // Should return { signed_url: "uploaded_image_url" }
        } catch (error) {
            console.error("Upload failed:", error);
            return null;
        }
    };
    const handleEditorChange = async (content) => {
        const updatedContent = await handleAllImages(content);
        setMeta({ ...meta, content: updatedContent });

        // onChange({
        //     target: {
        //         name,
        //         value: updatedContent,
        //     },
        // });
    };
    const handleAllImages = async (content) => {
        let updatedContent = content;
        let shouldContinue = true;

        while (shouldContinue) {
            const processedContent = await handleImages(updatedContent);

            if (processedContent === updatedContent) {
                shouldContinue = false;
            }

            updatedContent = processedContent;
        }

        return updatedContent;
    };

    const handleImages = async (content) => {
        const regex = /<img[^>]+src="data:image\/([^;]+);base64,([^"]+)"[^>]*>/g;
        let updatedContent = content;

        const uploadPromises = [];
        let match;

        while ((match = regex.exec(content)) !== null) {
            const fullMatch = match[0];
            const type = match[1];
            const data = match[2];

            const uploadPromise = new Promise(async (resolve, reject) => {
                try {
                    const blob = b64toBlob(data, `image/${type}`);
                    const file = new File([blob], `image.${type}`, { type: `image/${type}` });

                    const response = await uploadResource(file);
                    if (response?.url) {
                        updatedContent = updatedContent.replace(fullMatch, `<img src="${response.url}" />`);
                        resolve({ success: true, url: response.url });
                    } else {
                        resolve({ success: false, url: '' });
                    }
                } catch (error) {
                    console.error('Error uploading image:', error);
                    reject(error);
                }
            });

            uploadPromises.push(uploadPromise);
        }

        await Promise.all(uploadPromises);

        return updatedContent;
    };

    const [selectedPage, setSelectedPage] = useState("");
    const [meta, setMeta] = useState({ title: "", tags: "", description: "", content: "", image: "" });
    const axios = axiosAPI();
    useEffect(() => {
        if (selectedPage) {
            axios.get(`/meta/${selectedPage}`).then(({ data }) => {
                // console.log(data)
                setMeta(data || { title: "", tags: "", description: "", content: "", image: '' });
            });
        }
    }, [selectedPage]);

    const handleChange = (e) => {
        setMeta({ ...meta, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const route = pageRoutes.find((pageRoute) => pageRoute.name === selectedPage).path;
            const formData = new FormData();
            formData.append("page", selectedPage);
            formData.append("route", route);
            formData.append("image", meta.image); // this is the File object
            formData.append("title", meta.title);
            formData.append("content", meta.content);
            formData.append("description", meta.description);
            // append other meta fields...

            await axios.post("/meta", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success("Meta details saved!");
        } catch (e) {
            console.log(e)
            toast.error('Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        await axios.delete(`/meta/${selectedPage}`);
        setMeta({ title: "", tags: "", description: "", content: "" });
        toast.success("Meta details deleted!");
    };

    return (
        <div className="p-6 bg-white shadow-lg flex flex-col justify-center rounded-lg mx-auto">
            <h2 className="text-xl font-semibold mb-4">Manage SEO Meta Details</h2>

            <select
                className="w-full p-2 border rounded-md mb-4"
                value={selectedPage}
                onChange={(e) => setSelectedPage(e.target.value)}
            >
                <option value="">Select a Page</option>
                {pages.map((page) => (
                    <option key={page} value={page}>
                        {page}
                    </option>
                ))}
            </select>

            {selectedPage && (
                <div className="space-y-3">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Meta Title"
                            value={meta.title}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Tags (comma-separated)</label>
                        <input
                            type="text"
                            name="tags"
                            placeholder="Meta Tags (comma-separated)"
                            value={meta.tags}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                        /></div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Description</label>
                        <textarea
                            name="description"
                            placeholder="Meta Description"
                            value={meta.description}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                        /></div>
                    <div>

                        <div className="flex flex-col my-3 items-center w-full">
                            {/* Image Preview */}
                            {(preview || meta.breadcum) && (
                                <img
                                    src={preview || meta.breadcum}
                                    alt="Preview"
                                    className="mb-4 object-cover rounded-md shadow-md border border-gray-300"
                                />
                            )}
                            <label className="cursor-pointer flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-400 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
                                <FiUpload className="text-gray-600 text-3xl" />
                                <span className="text-gray-700 text-center text-sm font-semibold mt-2">
                                    {meta.image ? meta.image?.name : "Click to upload or drag & drop"}
                                </span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        setMeta({ ...meta, image: e.target.files[0] });
                                        setPreview(URL.createObjectURL(e.target.files[0]));
                                    }}
                                    className="hidden"
                                />
                            </label>


                        </div>
                        <label className="block text-gray-700 font-medium mb-1">Content</label>
                        <div className="border border-gray-300  resize-y h-auto rounded-md p-2">
                            <Suspense fallback={<div>Loading Editor...</div>}>
                                <ReactQuillWrapper
                                    // ref={quillRef}\
                                    modules={modules}
                                    formats={formats}
                                    theme="snow"
                                    value={meta.content}
                                    handleEditorChange={handleEditorChange}

                                // modules={modules}
                                />
                            </Suspense>

                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={handleSave} disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                            {loading ? 'Saving...' : "Save"}
                        </button>
                        <button onClick={handleDelete} disabled={loading} className="bg-red-500 text-white px-4 py-2 rounded-md">
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MetaManagement;
