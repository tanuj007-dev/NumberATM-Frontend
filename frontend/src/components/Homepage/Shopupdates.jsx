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

const PremiumVIPNumbers = ({ limit, separate }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [numbers, setNumbers] = useState([]);
    const [budget, setBudget] = useState(1000);
    const [total, setTotal] = useState(1);
    const [page, setPage] = useState(1);
    const { filteredNumbers, setFilteredNumbers } = useContext(Appstate);
    const [search, setSearch] = useState('');
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
       contains: searchParams.get("contains") === "true" ? true : false,

        mustContain: searchParams.get("mustContain") || "",
        mustNotContain: searchParams.get("mustNotContain") || "",
        startWithDigits: searchParams.get("startWithDigits") || "",
        endsWithDigits: searchParams.get("endsWithDigits") || "",
        anyWhere: searchParams.get("anyWhere") || "",
        anySum: searchParams.get("anySum") || "",
        total: searchParams.get("total") || "",
        category: (searchParams.get("category") || "").replace(/-/g, ' '),
        sum: searchParams.get("sum") || "",
        sortType: searchParams.get("sortType") || "",
    });
    useEffect(() => {
        setFilters({ ...filters, sortType: searchParams.get("sortType") });
        console.log(filters);
    }, [searchParams])
    const getNumbers = async (pgs) => {
        setLoading(true);
        try {
            const { data } = await axios.post('vip-numbers/search/shop', {
                ...filters,
                page: pgs || page,
                limit: limit || 40,
            });

            setNumbers((prevNumbers) => {
                const newNumbers = data.data;
                const existingNumbers = (pgs === 1 || page === 1) ? [] : prevNumbers;

                // Filter out numbers that already exist
                const filteredNewNumbers = newNumbers.filter(
                    (num) => !existingNumbers.some((existing) => existing.number === num.number)
                );

                return (pgs === 1 || page === 1)
                    ? filteredNewNumbers
                    : [...existingNumbers, ...filteredNewNumbers];
            });

            setTotal(data.total);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };
    const getNumbersPaginate = async (pgs) => {

        // console.log(filters);
        try {
            const { data } = await axios.post('vip-numbers/search/shop', {
                ...filters,
                page: pgs || page,
                limit: limit || 40,
            });

            setNumbers((prevNumbers) => {
                const newNumbers = data.data;
                const existingNumbers = (pgs === 1 || page === 1) ? [] : prevNumbers;

                // Filter out numbers that already exist
                const filteredNewNumbers = newNumbers.filter(
                    (num) => !existingNumbers.some((existing) => existing.number === num.number)
                );

                return (pgs === 1 || page === 1)
                    ? filteredNewNumbers
                    : [...existingNumbers, ...filteredNewNumbers];
            });

            setTotal(data.total);
        } catch (e) {
            console.error(e);
        }
    };

    const resetFilters = () => {
        setFilters({ startWith: false, endsWith: false, searchInput: '', category: '', contains: false, startsWithDigits: '', endsWithDigits: '', mustContain: '', mustNotContain: '', minPrice: 0, maxPrice: 0, sortType: '', sum: '', total: '' });
        setSearchParams({});
        navigate(location.pathname, { replace: true });
    }
    useEffect(() => {
        handleSearchAndFilter();
    }, [search, budget, numbers]);
    const handleSearchAndFilter = () => {
        let results = numbers;

        if (search) {
            results = results.filter((vip) => {
                const number = vip.number.replace(/\s+/g, "")

                // return number.toLowerCase().includes(search?.toLowerCase());
            }
            );
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
    useEffect(() => {
        if (page > 1) {
            getNumbersPaginate();
        }
        else {
            getNumbers();
        }
    }, [page])
   useEffect(() => {
  setPage(1);
  getNumbers(1);
}, [filters.category]);

    return (
        <div className="min-h-screen overflow-x-hidden w-full bg-white">

            <div

                className={`bg-white min-h-[42px] text-[#274A7B] pb-8 ${separate ? '' : 'rounded-t-xl'}`}
            >
                {/* <Link
                    // ref={dropdownRef}
                    to="/numerology-vip-numbers"
                    className="relative cursor-pointer mb-4 justify-center text-center hover:text-[#274A7B] mx-3 lg:ml-6 2xl:ml-12 lg:hidden flex items-center px-4 py-2 bg-orange-500 text-white  font-medium rounded-full shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
                >
                    🚀 Lowest Price Challenge
                </Link> */}
                <div className="container mx-auto min-h-[80px]">
                    <h1 className="text-center mb-3 text-xl md:text-2xl font-semibold">
                        Premium VIP Mobile Numbers
                    </h1>
                    <div className="flex text-lg md:text-xl justify-center mb-4 items-center gap-2">
                        <a
                            href="https://wa.me/+919511195111"
                            target="_blank"
                            aria-label="Whatsapp"
                            rel="noopener noreferrer"
                            className=" bg-green-500 text-white  p-0 z-[100] rounded-full shadow-lg hover:bg-green-600 hover:text-[#274A7B]  transition"
                        >
                            <FaWhatsapp className="text-xl md:text-2xl" />
                        </a>
                        <span className="font-semibold min-h-[30px]"> <AnimatedNumberLink /></span>
                    </div>
                    <div className="border-t-[0.6px] mx-3 border-[#274A7B] max-w-full"></div>
                    <div className="container mx-auto min-h-50px]">
                        {loading && <div className="absolute inset-0 flex justify-center items-center bg-white/50">Loading…</div>}
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
                            className={loading ? 'opacity-50' : ''}
                        />
                    </div>
                </div>
            </div>

            <div className="flex bg-white min-h-[600px] relative">
                {/* <div className="scrollbar-hide" style={{  maxHeight:'auto',overflowY: 'auto' }}> */}
                <CategoryFilter setPage={setPage} filters={filters} searchParams={searchParams}
                    setSearchParams={setSearchParams} setFilters={setFilters} setLoading={setLoading} getNumbers={getNumbers}
                    setSearch={setSearch} />
                {/* </div> */}

                {loading ? <div className="relative mx-auto w-full h-auto overflow-hidden border border-black bg-white rounded-t-xl flex justify-center items-start">
                    <div className="relative flex justify-center w-full flex-wrap pb-6 p-4 pt-4">
                        <div className="min-w-full grid grid-cols-1 sm2:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl2:grid-cols-4 gap-2.5 sm:gap-3.5 md:gap-4 2xl:gap-4 ">
                            {Array.from({ length: 40 }).map((_, index) => (
                                <NumberCardSkeleton key={index} />
                            ))}
                        </div>
                    </div>
                </div> : <BackgroundEffect
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
                />}
            </div>
        </div>
    );
}

export default PremiumVIPNumbers;
