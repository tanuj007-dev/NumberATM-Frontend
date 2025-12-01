import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { FiUpload } from "react-icons/fi";
import axiosAPI from "../../api/axiosAPI";
import { AdminState } from "../layouts/AdminLayout";
import ReactQuillWrapper from "./ReactQuill";
import { Appstate } from "../../App";
import toast from "react-hot-toast";

export default function AdminBlogEditor() {
  /* -------------  context / nav ------------- */
  const axios = axiosAPI();
  const { mainRef } = useContext(AdminState);
  // const { scrollToTop } = useContext(Appstate);
  const navigate = useNavigate();
  const { id } = useParams(); // id === undefined  →  “add” mode

  /* -------------  state ------------- */
  const emptyForm = {
    title: "",
    link: "",
    content: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    image: null,
    imageUrl: "",
  };
  const [form, setForm] = useState(emptyForm);
  const [blog, setBlog] = useState();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");

  /* -------------  fetch blog when editing ------------- */
  useEffect(() => {
    if (!id) return;
    axios.get(`blogs/${id}`).then(({ data }) => {
      setForm({
        title: data.title,
        link: data.link,
        content: data.content,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        metaKeywords: data.metaKeywords,
        image: null,
        imageUrl: data.imageUrl,
      });
      setBlog(data._id)
      setPreview(data.imageUrl);
    });
    // jump user to top of form
    // mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  /* -------------  Quill toolbar config ------------- */
  const modules = {
    toolbar: [
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["blockquote", "code-block"],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ direction: "rtl" }],
      ["link", "image"],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "background",
    "align",
    "direction",
  ];

  /* -------------  helpers for base‑64 images ------------- */
  const b64toBlob = (b64, contentType = "", slice = 512) => {
    const byteChars = atob(b64);
    const byteArrays = [];
    for (let off = 0; off < byteChars.length; off += slice) {
      const sliceChars = byteChars.slice(off, off + slice);
      const byteNumbers = Array.from(sliceChars).map((c) => c.charCodeAt(0));
      byteArrays.push(new Uint8Array(byteNumbers));
    }
    return new Blob(byteArrays, { type: contentType });
  };

  const uploadResource = async (file) => {
    const fd = new FormData();
    fd.append("image", file);
    try {
      const { data } = await axios.post("/meta/quill/upload", fd);
      return data; // { url: "https://…" }
    } catch (e) {
      console.error("Upload failed:", e);
      return null;
    }
  };

  /* -------------  Quill change handler (uploads any embedded base‑64) ------------- */
  const handleEditorChange = async (html) => {
    const clean = await stripAndUploadBase64Images(html);
    setForm((f) => ({ ...f, content: clean }));
  };

  const stripAndUploadBase64Images = async (html) => {
    const regex = /<img[^>]+src="data:image\/([^;]+);base64,([^"]+)"[^>]*>/g;
    let updated = html;
    const uploads = [];
    let m;
    while ((m = regex.exec(html))) {
      const [tag, type, b64] = m;
      uploads.push(
        (async () => {
          const blob = b64toBlob(b64, `image/${type}`);
          const file = new File([blob], `image.${type}`, { type: `image/${type}` });
          const res = await uploadResource(file);
          if (res?.url) updated = updated.replace(tag, `<img src="${res.url}" />`);
        })()
      );
    }
    await Promise.all(uploads);
    return updated;
  };

  /* -------------  submit (add or update) ------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (k === "image") {
        if (v) fd.append("image", v);
      } else fd.append(k, v);
    });

    id ? await axios.put(`blogs/${blog}`, fd) : await axios.post("blogs", fd);

    setForm(emptyForm);
    setPreview("");
    id?toast.success("Updated Successfully!"):toast.success("Added Successfully!")
    // scrollToTop?.();
    navigate("/admin/blogs");
    setLoading(false);
  };

  /* -------------  JSX ------------- */
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">
        {id ? "Edit Blog" : "Add New Blog"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-lg shadow"
      >
        {/* title */}
        <Input
          label="Title"
          value={form.title}
          onChange={(v) => setForm((f) => ({ ...f, title: v }))}
        />

        {/* meta title */}
        <Input
          label="Meta Title"
          value={form.metaTitle}
          onChange={(v) => setForm((f) => ({ ...f, metaTitle: v }))}
        />

        {/* meta desc */}
        <Textarea
          label="Meta Description"
          value={form.metaDescription}
          onChange={(v) => setForm((f) => ({ ...f, metaDescription: v }))}
        />

        {/* meta keywords */}
        <Input
          label="Meta Keywords (comma‑separated)"
          value={form.metaKeywords}
          onChange={(v) => setForm((f) => ({ ...f, metaKeywords: v }))}
        />

        {/* content */}
        <label className="block text-gray-700 font-medium mb-1">Content</label>
        <ReactQuillWrapper modules={modules}
          formats={formats}
          theme="snow"
          value={form.content}
          handleEditorChange={handleEditorChange}
        />

        {/* link */}
        <Input
          label="Link"
          value={form.link}
          onChange={(v) => setForm((f) => ({ ...f, link: v }))}
        />

        {/* image upload */}
        <div className="flex flex-col items-center w-full">
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-32 h-32 object-cover rounded mb-3 shadow"
            />
          )}
          <label className="cursor-pointer flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-400 rounded-lg bg-gray-100 hover:bg-gray-200">
            <FiUpload className="text-3xl text-gray-600" />
            <span className="text-sm mt-2">
              {preview ? "Change image" : "Click or drag & drop"}
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                setForm((f) => ({ ...f, image: file }));
                setPreview(URL.createObjectURL(file));
              }}
            />
          </label>
        </div>

        {/* submit */}
        <div className="text-center">
          <button
            type="submit"
            className={`${loading?'bg-gray-400':'bg-blue-600'} text-white px-6 py-3 rounded hover:bg-blue-700`}
          >
            {loading?"Please Wait...":id ? "Update Blog" : "Add Blog"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* ------------  tiny presentational helpers ------------ */
function Input({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-gray-700 font-medium mb-1">{label}</label>
      <input
        className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
function Textarea({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-gray-700 font-medium mb-1">{label}</label>
      <textarea
        className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
