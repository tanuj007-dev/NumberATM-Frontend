import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import UserAxiosAPI from "../../api/userAxiosAPI";
import { FaChevronCircleLeft } from "react-icons/fa";
import { Appstate } from "../../App";
import fallbackImage from "../../components/assets/vid.jpg";
import { motion } from "framer-motion";

const VipArticleDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [toc, setToc] = useState([]);
  const axios = UserAxiosAPI();
  const { getOptimizedImage } = useContext(Appstate);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    // Fetch current blog
    axios.get(`/blogs/${id}`).then((res) => {
      setBlog(res.data);
      generateTOC(res.data.content);
    });

    // Fetch recent blogs for sidebar
    axios.get("/blogs").then((res) => {
      const sortedBlogs = res.data
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 10); // Get 10 most recent
      setRecentBlogs(sortedBlogs);
    });
  }, [id]);

  const slugify = (title) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .trim()
      .replace(/\s+/g, "-");

  // Generate Dynamic Table of Contents
  const generateTOC = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const headings = doc.querySelectorAll("h1, h2, h3, h4");

    const tocItems = [...headings].map((h) => {
      if (!h.id) {
        h.id = h.innerText.replace(/\s+/g, "-").toLowerCase();
      }
      return {
        id: h.id,
        text: h.innerText,
        level: Number(h.tagName.replace("H", "")),
      };
    });

    setToc(tocItems);
  };

  if (!blog)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    );
    

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Main Layout: TOC (Left) + Content (Center) + Recent Articles (Right) */}
<div className="flex flex-col lg:flex-row items-start gap-6">

          {/* LEFT: Table of Contents */}
  {toc.length > 0 && (
  <aside className="hidden lg:block lg:w-64 xl:w-72 h-fit">
    <div className="sticky top-24">
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 shadow-sm">

        <h2 className="text-lg font-bold text-[#17565D] mb-4">
          On This Blog
        </h2>

        <ul className="space-y-2">
          {toc.map((item, idx) => (
            <li key={idx} style={{ marginLeft: `${(item.level - 1) * 12}px` }}>
              <a
                href={`#${item.id}`}
                className="text-sm text-[#17565D] hover:text-[#F5C037] hover:underline transition-colors block"
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>

      </div>
    </div>
  </aside>
)}



          {/* CENTER: Main Content */}
          <div className="flex-1 lg:max-w-2xl xl:max-w-3xl px-2 md:px-0">
            
            {/* Featured Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden mb-8 shadow-lg"
            >
              <img
                src={blog.imageUrl ? getOptimizedImage(blog.imageUrl) : fallbackImage}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              
              {/* Title Overlay on Image */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight drop-shadow-lg">
                  {blog.title}
                </h1>
              </div>
            </motion.div>

            {/* Article Metadata */}
            <div className="mb-6">
              <p className="text-sm md:text-base text-gray-600">
                By <span className="font-semibold text-[#17565D]">NumberATM</span> /{" "}
                {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                  month: "long",
                  day: "2-digit",
                  year: "numeric",
                })}
              </p>
            </div>

            {/* Mobile Table of Contents */}
            {toc.length > 0 && (
              <div className="hidden    bg-gray-50 rounded-lg p-6 mb-8 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">On This Blog</h2>
                <ul className="space-y-3">
                  {toc.map((item, idx) => (
                    <li key={idx} style={{ marginLeft: `${(item.level - 1) * 16}px` }}>
                      <a
                        href={`#${item.id}`}
                        className="text-[#17565D] hover:text-[#F5C037] hover:underline text-sm transition-colors"
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none ql-editor ql-editor-custom">
              <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
            </div>

            {/* Back Button */}
            <div className="mt-12 flex justify-center">
              <Link
                to="/vip-numbers"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#17565D] text-white text-base font-semibold rounded-lg hover:bg-[#F5C037] transition-colors shadow-md"
              >
                <FaChevronCircleLeft /> Back to Blogs
              </Link>
            </div>
          </div>

          {/* RIGHT: Sidebar with Recent Articles */}
          <aside className="lg:w-80 xl:w-96">
            <div className="sticky top-24">
              
              {/* Recent Articles Header */}
              <div className="bg-[#FBBF24] rounded-t-lg px-6 py-4">
                <h2 className="text-xl font-bold text-[#17565D]">Latest Articles</h2>
              </div>

              {/* Recent Articles Grid */}
              <div className="bg-white border border-gray-200 rounded-b-lg p-4">
                <div className="grid grid-cols-2 gap-4 max-h-[800px] overflow-y-auto scrollbar-hide">
                  {recentBlogs
                    .filter((article) => article._id !== blog._id) // Exclude current article
                    .slice(0, 10)
                    .map((article, index) => (
                      <Link
                        key={index}
                        to={`/vip-numbers/${slugify(article.title)}`}
                        className="group block"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                      >
                        <div className="relative w-full h-24 rounded-lg overflow-hidden mb-2 shadow-sm">
                          {/* Yellow Curve Overlay */}
                          <div className="absolute top-0 left-0 w-12 h-12 z-10">
                            <svg viewBox="0 0 200 200" className="w-full h-full">
                              <path
                                d="M 0,0 Q 100,100 0,200 L 0,0 Z"
                                fill="#FBBF24"
                              />
                            </svg>
                          </div>
                          
                          <img
                            src={
                              article.imageUrl
                                ? getOptimizedImage(article.imageUrl)
                                : fallbackImage
                            }
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        
                        <h3 className="text-xs font-semibold text-[#17565D] line-clamp-2 group-hover:text-[#F5C037  ] transition-colors leading-tight">
                          {article.title}
                        </h3>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default VipArticleDetail;