// import { useState, useEffect, useContext } from "react";
// // import ReactQuill from "react-quill";
// // import "react-quill/dist/quill.snow.css";
// import { FiUpload } from "react-icons/fi";
// import { AdminState } from "../layouts/AdminLayout";
// import { Appstate } from "../../App";
// import axiosAPI from "../../api/axiosAPI";
// // import './quill.css';
// export default function AdminBlog() {
//   const axios = axiosAPI();
//   const { scrollToTop } = useContext(Appstate)
//   const { mainRef } = useContext(AdminState)
//   const getBlogs = () =>
//     axios.get("blogs").then((res) => setBlogs(res.data));
//   const modules = {
//     toolbar: [
//       [{ color: [] }, { background: [] }],
//       [{ align: [] }],
//       [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
//       [{ size: ["small", false, "large", "huge"] }],
//       ["blockquote", "code-block"],
//       [{ script: "sub" }, { script: "super" }],
//       [{ indent: "-1" }, { indent: "+1" }],
//       ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//       [{ list: 'ordered' }, { list: 'bullet' }],
//       [{ direction: "rtl" }],
//       ['link', 'image'],
//       ['clean'],
//     ],
//   };

//   const formats = [
//     'header',
//     'font',
//     'size',
//     'bold',
//     'italic',
//     'underline',
//     'strike',
//     'blockquote',
//     'list',
//     'bullet',
//     'indent',
//     'link',
//     'image',
//     // 'video',
//     'color',       // ✅ Add this
//     'background',  // ✅ Add this
//     'align',
//     'direction'
//   ];
//   const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
//     const byteCharacters = atob(b64Data);
//     const byteArrays = [];

//     for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
//       const slice = byteCharacters.slice(offset, offset + sliceSize);
//       const byteNumbers = new Array(slice.length);

//       for (let i = 0; i < slice.length; i++) {
//         byteNumbers[i] = slice.charCodeAt(i);
//       }

//       const byteArray = new Uint8Array(byteNumbers);
//       byteArrays.push(byteArray);
//     }

//     return new Blob(byteArrays, { type: contentType });
//   };

//   const uploadResource = async (file) => {
//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       const { data } = await axios.post("/meta/quill/upload", formData);

//       return data; // Should return { signed_url: "uploaded_image_url" }
//     } catch (error) {
//       console.error("Upload failed:", error);
//       return null;
//     }
//   };
//   const handleEditorChange = async (content) => {
//     const updatedContent = await handleAllImages(content);
//     setForm({ ...form, content: updatedContent });

//     // onChange({
//     //   target: {
//     //     name,
//     //     value: updatedContent,
//     //   },
//     // });
//   };
//   const handleAllImages = async (content) => {
//     let updatedContent = content;
//     let shouldContinue = true;

//     while (shouldContinue) {
//       const processedContent = await handleImages(updatedContent);

//       if (processedContent === updatedContent) {
//         shouldContinue = false;
//       }

//       updatedContent = processedContent;
//     }

//     return updatedContent;
//   };

//   const handleImages = async (content) => {
//     const regex = /<img[^>]+src="data:image\/([^;]+);base64,([^"]+)"[^>]*>/g;
//     let updatedContent = content;

//     const uploadPromises = [];
//     let match;

//     while ((match = regex.exec(content)) !== null) {
//       const fullMatch = match[0];
//       const type = match[1];
//       const data = match[2];

//       const uploadPromise = new Promise(async (resolve, reject) => {
//         try {
//           const blob = b64toBlob(data, `image/${type}`);
//           const file = new File([blob], `image.${type}`, { type: `image/${type}` });

//           const response = await uploadResource(file);
//           if (response?.url) {
//             updatedContent = updatedContent.replace(fullMatch, `<img src="${response.url}" />`);
//             resolve({ success: true, url: response.url });
//           } else {
//             resolve({ success: false, url: '' });
//           }
//         } catch (error) {
//           console.error('Error uploading image:', error);
//           reject(error);
//         }
//       });

//       uploadPromises.push(uploadPromise);
//     }

//     await Promise.all(uploadPromises);

//     return updatedContent;
//   };
//   const [blogs, setBlogs] = useState([]);
 
//   const [blogToEdit, setBlogToEdit] = useState(null);
//   const [form, setForm] = useState({
//     title: "",
//     link: "",
//     content: "",
//     metaTitle: "",
//     metaDescription: "",
//     metaKeywords: "",
//     image: null,
//     imageUrl: "",
//   });
 

//   useEffect(() => {
//     getBlogs();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("title", form.title);
//     formData.append("link", form.link);
//     formData.append("content", form.content);
//     formData.append("metaTitle", form.metaTitle);
//     formData.append("metaDescription", form.metaDescription);
//     formData.append("metaKeywords", form.metaKeywords);
//     if (form.image) formData.append("image", form.image);
//     else formData.append("imageUrl", form.imageUrl);

//     if (blogToEdit) {
//       await axios.put(`blogs/${blogToEdit}`, formData);
//     } else {
//       await axios.post("blogs", formData);
//     }
//     setForm({ title: "", link: "", content: "", metaTitle: "", metaDescription: "", metaKeywords: "", image: null, imageUrl: "" });
//     setBlogToEdit(null);
//     getBlogs();
//   };
//   const [preview, setPreview] = useState(form.imageUrl || "");
//   const handleEdit = (blog) => {
//     setBlogToEdit(blog._id);
//     mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
//     if (blog.imageUrl==='') {
//       setForm({
//         title: blog.title,
//         link: blog.link,
//         content: blog.content,
//         metaTitle: blog.metaTitle,
//         metaDescription: blog.metaDescription,
//         metaKeywords: blog.metaKeywords,
//         image: null,
//         imageUrl:''
//        })
//     } else {
//       setForm({ 
//         title: blog.title,
//         link: blog?.link,
//         content: blog?.content,
//         metaTitle: blog?.metaTitle,
//         metaDescription: blog?.metaDescription,
//         metaKeywords: blog?.metaKeywords,
//         image: null,
//         imageUrl: blog?.imageUrl })
//     }
//     console.log(blog)
// };

//   const handleDelete = async (id) => {
//     if (!confirm('Do you really want to delete this blog?')) return;
//     await axios.delete(`blogs/${id}`);
//     getBlogs();
//   };
// // console.log(form)
//   return (
//     <div id="scrollContainer" className="max-w-6xl overflow-auto mx-auto p-3 md:p-6">
//       <h2 className="text-2xl font-bold mb-4">Manage Blogs</h2>
//       <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
//         <div>
//           <label className="block text-gray-700 font-medium mb-1">Title</label>
//           <input
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             type="text"
//             placeholder="Enter title"
//             value={form.title}
//             onChange={(e) => setForm({ ...form, title: e.target.value })}
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700 font-medium mb-1">Meta Title</label>
//           <input
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             type="text"
//             placeholder="Enter meta title"
//             value={form.metaTitle}
//             onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700 font-medium mb-1">Meta Description</label>
//           <textarea
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter meta description"
//             value={form.metaDescription}
//             onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700 font-medium mb-1">Meta Keywords</label>
//           <input
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             type="text"
//             placeholder="Enter meta keywords (comma-separated)"
//             value={form.metaKeywords}
//             onChange={(e) => setForm({ ...form, metaKeywords: e.target.value })}
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700 font-medium mb-1">Content</label>
//           <div className="border border-gray-300 rounded-md p-2">
//             {/* <ReactQuill
//               // ref={quillRef}\
//               className="min-h-40"
//               modules={modules}
//               formats={formats}
//               theme="snow"
//               value={form.content}
//               onChange={handleEditorChange}

//             // modules={modules}
//             /> */}
//           </div>
//         </div>

//         <div>
//           <label className="block text-gray-700 font-medium mb-1">Link</label>
//           <input
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             type="text"
//             placeholder="Enter link"
//             value={form.link}
//             onChange={(e) => setForm({ ...form, link: e.target.value })}
//           />
//         </div>

//         {/* Image Upload */}
//         <div className="flex flex-col items-center w-full">
//           {/* Image Preview */}
//           {(preview || blogToEdit) && (
//             <img
//               src={preview || form.imageUrl}
//               alt="Preview"
//               className="w-32 h-32 mb-4 object-cover rounded-md shadow-md border border-gray-300"
//             />
//           )}
//           <label className="cursor-pointer flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-400 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
//             <FiUpload className="text-gray-600 text-3xl" />
//             <span className="text-gray-700 text-center text-sm font-semibold mt-2">
//               {preview ? form.image?.name : "Click to upload or drag & drop"}
//             </span>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => {
//                 setForm({ ...form, image: e.target.files[0] });
//                 setPreview(URL.createObjectURL(e.target.files[0]));
//               }}
//               className="hidden"
//             />
//           </label>


//         </div>

//         {/* Submit Button */}
//         <div className="flex justify-center">
//           <button className="bg-blue-500 text-white px-5 py-3 rounded-md font-medium shadow-md hover:bg-blue-600 transition" type="submit">
//             {!blogToEdit ? "Add Blog" : "Update"}
//           </button>
//         </div>
//       </form>


//       <div className="mt-6 gap-4">
//         {blogs?.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt))?.map((blog) => (
//           <div key={blog._id} className="p-4 mb-2 border gap-y-4 rounded-lg">
//             {blog.imageUrl && <img src={blog.imageUrl} alt="Blog" className="w-32 mb-2" />}
//             <h3 className="font-bold mb-2">{blog.title}</h3>
//             {/* <p dangerouslySetInnerHTML={{ __html: blog.content }} /> */}
//             <button className="bg-yellow-400 mt-2 text-white mr-2" onClick={() => { handleEdit(blog) }}>Edit</button>
//             <button className="bg-red-500 mt-2 text-white" onClick={() => handleDelete(blog._id)}>Delete</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
