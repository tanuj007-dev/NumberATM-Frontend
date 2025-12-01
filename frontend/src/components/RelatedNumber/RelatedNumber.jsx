import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import UserAxiosAPI from "../../api/userAxiosAPI";
import ProductCard from "../ProductCard";
import { FaFilter, FaSearch } from "react-icons/fa";

const RelatedNumber = ({ limit = 20 }) => {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [numbers, setNumbers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const axios = UserAxiosAPI();

  console.log("params ::", params);

  const [sortType, setSortType] = useState(
    searchParams.get("sortType") || ""
  );

  const getRelatedNumbers = async (pgs = 1) => {
    if (!params?.id) return;
    
    setLoading(true);
    try {
      const sortParam =
        sortType === "lowToHigh"
          ? "low-high"
          : sortType === "highToLow"
          ? "high-low"
          : "";

      const response = await axios.get(
        `vip-numbers/related-numbers?number=${params?.id}&page=${pgs}&limit=${limit}${
          sortParam ? `&sortbyprice=${sortParam}` : ""
        }`
      );
      
      const data = response.data;

      if (pgs === 1) {
        setNumbers(data.data);
      } else {
        setNumbers((prevNumbers) => {
          const newNumbers = data.data;
          const filteredNewNumbers = newNumbers.filter(
            (num) =>
              !prevNumbers.some((existing) => existing.number === num.number)
          );
          return [...prevNumbers, ...filteredNewNumbers];
        });
      }

      setTotal(data.total);
    } catch (error) {
      console.error("Related Numbers API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    getRelatedNumbers(1);
  }, [params?.id, sortType]);

  useEffect(() => {
    if (page > 1) {
      getRelatedNumbers(page);
    }
  }, [page]);

  const handleSortChange = (newSortType) => {
    setSortType(newSortType);
    const newParams = new URLSearchParams(searchParams);
    if (newSortType) {
      newParams.set("sortType", newSortType);
    } else {
      newParams.delete("sortType");
    }
    setSearchParams(newParams);
  };

  return (
    <div className="w-full py-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-2">
            Related VIP Numbers
          </h2>
          <p className="text-gray-600 text-center text-sm md:text-base">
            Discover similar premium numbers like{" "}
            <span className="font-semibold text-[#274A7B]">{params?.id}</span>
          </p>
        </div>

        {/* Sort Options */}
        {/* <div className="flex justify-center items-center gap-2 mb-6">
          <div className="flex items-center gap-2 text-sm md:text-base">
            <span className="text-gray-700 flex items-center gap-1">
              <FaFilter className="text-[#274A7B]" />
              Sort By:
            </span>
            
            <button
              className={`px-4 py-2 rounded-full border transition-all ${
                sortType === "lowToHigh"
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-gray-700 border-gray-300 hover:border-orange-500"
              }`}
              onClick={() =>
                handleSortChange(sortType === "lowToHigh" ? "" : "lowToHigh")
              }
            >
              Price: Low to High
            </button>

            <button
              className={`px-4 py-2 rounded-full border transition-all ${
                sortType === "highToLow"
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-gray-700 border-gray-300 hover:border-orange-500"
              }`}
              onClick={() =>
                handleSortChange(sortType === "highToLow" ? "" : "highToLow")
              }
            >
              Price: High to Low
            </button>
          </div>
        </div> */}

        {/* Loading State */}
        {loading && page === 1 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: limit }).map((_, index) => (
              <div
                key={index}
                className="bg-gray-200 animate-pulse rounded-2xl h-48"
              ></div>
            ))}
          </div>
        ) : numbers.length > 0 ? (
          <>
            {/* Product Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
              {numbers.map((item, index) => (
                <ProductCard key={item._id || index} item={item} />
              ))}
            </div>

            {/* Load More Button */}
            {total > numbers.length && (
              <div className="mt-8 flex justify-center">
                <button
                  className="bg-[#274A7B] text-white px-8 py-3 rounded-full hover:bg-orange-500 transition-all duration-300 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => setPage(page + 1)}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "More..."}
                </button>
              </div>
            )}

            {/* Results Info */}
            {/* <div className="mt-4 text-center text-gray-600 text-sm">
              Showing {numbers.length} of {total} related numbers
            </div> */}
          </>
        ) : (
          // No Results
          <div className="flex flex-col items-center justify-center py-12">
            <div className="bg-orange-100 p-6 rounded-full mb-4">
              <FaSearch className="text-orange-500 text-4xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No Related Numbers Found
            </h3>
            <p className="text-gray-600">
              We couldn't find any related numbers for {params?.id}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RelatedNumber;