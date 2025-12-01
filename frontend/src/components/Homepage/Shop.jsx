import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import UserAxiosAPI from "../../api/userAxiosAPI";
import BackgroundEffect from "./Background";
import { Appstate } from "../../App";
import SearchComponent from "./Searchbar";
import CategoryFilter from "./CategoryFilter";
import AnimatedNumberLink from "../AnimatedNumber";
import { FaWhatsapp } from "react-icons/fa";
import { NumberCardSkeleton } from "./NumberSkeleton";
import BackgroundLay from "../../components/assets/bg.jpg";
const PremiumVIPNumbers = ({ limit, separate }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [numbers, setNumbers] = useState([]);
  const [budget, setBudget] = useState(1000);
  const [total, setTotal] = useState(1);
  const [page, setPage] = useState(1);
  const { filteredNumbers, setFilteredNumbers } = useContext(Appstate);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortType, setSortType] = useState("");
  const axios = UserAxiosAPI();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    searchInput: searchParams.get("searchInput") || "",
    startWith: searchParams.get("startWith") || "",
    endsWith: searchParams.get("endsWith") || "",
    contains:
      searchParams.get("contains") ||
      searchParams.get("endsWith") === "true" ||
      searchParams.get("startWith") === "true"
        ? false
        : true,
    mustContain: searchParams.get("mustContain") || "",
    mustNotContain: searchParams.get("mustNotContain") || "",
    startWithDigits: searchParams.get("startWithDigits") || "",
    endsWithDigits: searchParams.get("endsWithDigits") || "",
    anyWhere: searchParams.get("anyWhere") || "",
    anySum: searchParams.get("anySum") || "",
    total: searchParams.get("total") || "",
    category: (searchParams.get("category") || "").replace(/-/g, " "),
    sum: searchParams.get("sum") || "",
    sortType: searchParams.get("sortType") || "",
    exactPlace: searchParams.get("exactPlace") || "",
  });

  useEffect(() => {
    setFilters((prev) => ({ ...prev, sortType: searchParams.get("sortType") || "" }));
  }, [searchParams.get("sortType")]);

  const getNumbers = async (pgs) => {
    setLoading(true);
    try {
      // Check if exact digit search is active
      const exactPlace = searchParams.get("exactPlace");

      let data;

      if (exactPlace && exactPlace.length === 10) {
        // Call exact placement API
        const sortParam =
          filters.sortType === "lowToHigh"
            ? "low-high"
            : filters.sortType === "highToLow"
            ? "high-low"
            : "";

        const response = await axios.get(
          `vip-numbers/exactPlacement?exactPlace=${exactPlace}&page=${
            pgs || page
          }&limit=${limit || 40}${sortParam ? `&sortbyprice=${sortParam}` : ""}`
        );
        data = response.data;
        // console.log("✅ exactPlace API called with:", exactPlace);
      } else {
        // Call regular search API
        const response = await axios.post("vip-numbers/search/shop", {
          ...filters,
          page: pgs || page,
          limit: limit || 40,
        });
        data = response.data;
        // console.log("✅ Shop API called");
      }

      setNumbers((prevNumbers) => {
        const newNumbers = data.data;
        const existingNumbers = pgs === 1 || page === 1 ? [] : prevNumbers;

        // Filter out numbers that already exist
        const filteredNewNumbers = newNumbers.filter(
          (num) =>
            !existingNumbers.some((existing) => existing.number === num.number)
        );

        return pgs === 1 || page === 1
          ? filteredNewNumbers
          : [...existingNumbers, ...filteredNewNumbers];
      });

      setTotal(data.total);
    } catch (e) {
      console.error("❌ API Error:", e);
    } finally {
      setLoading(false);
    }
  };

  const getNumbersPaginate = async (pgs) => {
    try {
      const exactPlace = searchParams.get("exactPlace");

      let data;

      if (exactPlace && exactPlace.length === 10) {
        const sortParam =
          filters.sortType === "lowToHigh"
            ? "low-high"
            : filters.sortType === "highToLow"
            ? "high-low"
            : "";

        const response = await axios.get(
          `vip-numbers/exactPlacement?exactPlace=${exactPlace}&page=${
            pgs || page
          }&limit=${limit || 40}${sortParam ? `&sortbyprice=${sortParam}` : ""}`
        );
        data = response.data;
        // console.log("exactPlace pagination API called");
      } else {
        const response = await axios.post("vip-numbers/search/shop", {
          ...filters,
          page: pgs || page,
          limit: limit || 40,
        });
        data = response.data;
        // console.log("Shop pagination API called");
      }

      setNumbers((prevNumbers) => {
        const newNumbers = data.data;
        const existingNumbers = pgs === 1 || page === 1 ? [] : prevNumbers;

        const filteredNewNumbers = newNumbers.filter(
          (num) =>
            !existingNumbers.some((existing) => existing.number === num.number)
        );

        return pgs === 1 || page === 1
          ? filteredNewNumbers
          : [...existingNumbers, ...filteredNewNumbers];
      });

      setTotal(data.total);
    } catch (e) {
      console.error(e);
    }
  };

  const resetFilters = () => {
    setFilters({
      startWith: false,
      endsWith: false,
      searchInput: "",
      category: "",
      contains: false,
      startsWithDigits: "",
      endsWithDigits: "",
      mustContain: "",
      mustNotContain: "",
      minPrice: 0,
      maxPrice: 0,
      sortType: "",
      sum: "",
      total: "",
      exactPlace: "",
    });
    setSearchParams({});
    navigate(location.pathname, { replace: true });
  };

  useEffect(() => {
    handleSearchAndFilter();
  }, [search, budget, numbers]);

  const handleSearchAndFilter = () => {
    let results = numbers;

    if (search) {
      results = results.filter((vip) => {
        const number = vip.number.replace(/\s+/g, "");
      });
    }
    setFilteredNumbers(results);
  };

  const backgroundRef = useRef(null);
  const [bgHeight, setBgHeight] = useState(0);

  useEffect(() => {
    if (backgroundRef.current) {
      setBgHeight(backgroundRef.current.offsetHeight);
    }
  }, []);

  // Handle page changes
  useEffect(() => {
    if (page > 1) {
      getNumbersPaginate();
    } else {
      getNumbers(1);
    }
  }, [page]);

  // CRITICAL FIX: Single useEffect to handle search parameter changes
  useEffect(() => {
    const exactPlace = searchParams.get("exactPlace");
    const category = searchParams.get("category");
    const sortType = searchParams.get("sortType");
    
    // Check if any search parameter exists (excluding subTab and tab)
    const hasSearchParams = Array.from(searchParams.keys()).some(
      key => key !== "subTab" && key !== "tab"
    );

    // Only call API if there are actual search parameters
    if (hasSearchParams) {
      // console.log("Search params changed, calling API");
      setPage(1);
      getNumbers(1);
    }
  }, [
    searchParams.get("exactPlace"),
    searchParams.get("category"),
    searchParams.get("sortType"),
    searchParams.get("searchInput"),
    searchParams.get("startWith"),
    searchParams.get("endsWith"),
    searchParams.get("contains"),
    searchParams.get("minPrice"),
    searchParams.get("maxPrice"),
    searchParams.get("mustContain"),
    searchParams.get("mustNotContain"),
    searchParams.get("startWithDigits"),
    searchParams.get("endsWithDigits"),
    searchParams.get("anyWhere"),
    searchParams.get("anySum"),
    searchParams.get("total"),
    searchParams.get("sum"),
  ]);

  return (
    <div>
    <div className="w-full max-w-[95vw] mx-auto">
  
  {/* 🔥 BG only around search container */}
  <div
    style={{ backgroundImage: `url('${BackgroundLay}')` }}
    className="bg-contain  rounded-2xl"
  >
    <div className="bg-[#17565DE6] text-white rounded-xl py-4 sm:py-6 px-4">
      <h1 className="text-center mt-2 sm:mt-5 text-xl md:text-3xl font-medium">
        Search Premium VIP Mobile Numbers
      </h1>

      <SearchComponent
        setSortType={setSortType}
        setLoading={setLoading}
        numbers={numbers}
        getNumbers={getNumbers}
        setSearch={setSearch}
        seprate={separate}
        page={page}
        setPage={setPage}
        setFilteredNumbers={setFilteredNumbers}
        filters={filters}
        setFilters={setFilters}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
    </div>
  </div>

      <div className="flex 
       min-h-[600px] relative mt-3">
        <CategoryFilter
          setPage={setPage}
          filters={filters}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          setFilters={setFilters}
          setLoading={setLoading}
          getNumbers={getNumbers}
          setSearch={setSearch}
        />

        {loading ? (
          <div className="grid grid-cols-2 sm2:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 xl3:grid-cols-6 gap-1.5 sm:gap-2.5 md:gap-2.5 2xl:gap-2.5 lg:mx-4">
            {Array.from({ length: 40 }).map((_, index) => (
              <NumberCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <BackgroundEffect
            ref={backgroundRef}
            loading={loading}
            setLoading={setLoading}
            page={page}
            limit={limit}
            total={total}
            getNumbers={getNumbers}
            filteredNumbers={numbers}
            setPage={setPage}
            resetFilters={resetFilters}
            filters={filters}
            searchParams={searchParams}
            separate={separate}
          />
        )}
      </div>
      </div>

    </div>
  );
};

export default PremiumVIPNumbers;