import React, { useContext, useEffect, useState } from "react";
import UserAxiosAPI from "../../api/userAxiosAPI";
import { Link } from "react-router-dom";
import { Appstate } from "../../App";
import { motion } from "framer-motion";
import fallbackImage from "../../assets/vid.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const VipArticles = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  // ⭐ PAGINATION STATES
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 26;

  const axios = UserAxiosAPI();
  const { getOptimizedImage } = useContext(Appstate);

  const getBlogs = () => {
    setLoading(true);
    return axios
      .get("/blogs")
      .then((res) => {
        setBlogs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const MAX_WORDS = 20;

  const truncateHtml = (html, maxWords) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const words = tempDiv.innerText.trim().split(/\s+/);
    return (
      words.slice(0, maxWords).join(" ") +
      (words.length > maxWords ? "..." : "")
    );
  };

  const slugify = (title) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .trim()
      .replace(/\s+/g, "-");

  // ⭐ FILTERED + SORTED BLOGS
  const filteredBlogs = blogs
    .filter((b) => b.title.toLowerCase().includes(search.toLowerCase()))
    .filter((b) => (selectedCategory ? b.category === selectedCategory : true))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // ⭐ PAGINATION LOGIC
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const startIndex = (currentPage - 1) * blogsPerPage;
  const paginatedBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + blogsPerPage
  );

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-8xl mx-auto px-2  lg:px-8 py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="px-2 sm:px-0"><h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#17565D] mb-3 md:mb-6">
  Blogs
</h1>

<p className="
  text-gray-700
  text-sm sm:text-base md:text-lg
  leading-[1.2]
  text-justify
  w-full
  m-0 p-0
">
  Searching for a premium VIP mobile number that reflects class, identity, and
  convenience? NumberATM offers a curated selection of exclusive and highly
  memorable VIP numbers tailored to your personal or business needs. With a
  seamless process, verified number options, transparent pricing, and dedicated
  support, NumberATM ensures a smooth and reliable experience for customers
  across India. Choose a number that not only stands out but also strengthens
  your professional presence.
</p>
</div>




         
        </motion.div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 border-4 border-[#17565D] border-t-[#F5C037] rounded-full animate-spin"></div>
              <p className="text-[#17565D] font-semibold">Loading blogs...</p>
            </div>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-gray-500 text-lg">No blogs found.</p>
          </div>
        ) : (
          <>
            {/* MOBILE SWIPER */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:hidden">
  {paginatedBlogs.map((article, index) => (
    <Link
      key={index}
      to={`/vip-numbers/${slugify(article.title)}`}
      className="group block bg-white rounded-lg   transition-shadow duration-300 overflow-hidden"
    >
      <div className="relative w-full h-48 overflow-hidden">
        {/* <div className="absolute top-0 left-0 w-32 h-32 z-10">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path
              d="M 0,0 Q 100,100 0,200 L 0,0 Z"
              fill="#FBBF24"
            />
          </svg>
        </div> */}

        <img
          src={article.imageUrl ? getOptimizedImage(article.imageUrl) : fallbackImage}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-[#17565D] mb-3 line-clamp-2 group-hover:text-[#17565D] transition-colors">
          {article.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
          {truncateHtml(article.content, MAX_WORDS)}
        </p>
      </div>
    </Link>
  ))}
</div>


            {/* DESKTOP LAYOUT */}
            <div className="hidden lg:block">
          {/* BLOG GRID - 3 columns */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 "
          >
            {paginatedBlogs.map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={`/vip-numbers/${slugify(article.title)}`}
                  className="group block bg-white rounded-lg  transition-all duration-300 overflow-hidden h-full"
                >
                  <div className="relative w-full h-56 overflow-hidden">
                    {/* Yellow Curve Overlay */}
                    {/* <div className="absolute top-0 left-0 w-32 h-32 z-10">
                      <svg viewBox="0 0 200 200" className="w-full h-full">
                        <path
                          d="M 0,0 Q 100,100 0,200 L 0,0 Z"
                          fill="#FBBF24"
                        />
                      </svg>
                    </div> */}

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

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#17565D] mb-3 line-clamp-2 group-hover:text-[#F5C037] transition-colors leading-tight">
                      {article.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {truncateHtml(article.content, MAX_WORDS)}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VipArticles;
