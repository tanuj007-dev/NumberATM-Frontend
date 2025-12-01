import React, { useEffect, useState } from "react";
const XLSX = await import("xlsx");
import axiosAPI from "../../api/axiosAPI";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import UpdateVIPNumber from "./EditNumber";

const VipNumbersDashboard = () => {
    const [data, setData] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [numberId, setNumberId] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const axios = axiosAPI();
    const [filterInput, setFilterInput] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [featuredFilter, setFeaturedFilter] = useState("All");
    const [vendorFilter, setVendorFilter] = useState("All");
    const [sortedData, setSortedData] = useState(data || []);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const getData = async () => {
        setLoading(true)
        try {
            const res = await axios.get("/vip-numbers/admin", {
                params: {
                    page,
                    limit: 200,
                    number: filterInput || undefined,
                    category: categoryFilter !== "All" ? categoryFilter : undefined,
                    featured: featuredFilter !== "All" ? featuredFilter : undefined,
                    vendor: vendorFilter !== "All" ? vendorFilter : undefined
                }
            });
            setData(res.data.data); // Assuming res.data.data is your number array
            setTotalPages(res.data.totalPages || 1); // Backend must return this
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch VIP numbers");
        } finally {
            setLoading(false);
        }
    };

    const getVendors = async () => {
        try {
            const { data } = await axios.get('/vendors');
            setVendors(data);
        } catch (e) {
            console.log(e);
        }
    };

    const markFeatured = async (id) => {
        if (!confirm('Are you sure marking it featured?')) return;
        try {
            const { data } = await axios.put(`/vip-numbers/mark-featured/${id}`);
            toast.success('Marked Featured!');
            getData();
        } catch (e) {
            console.log(e);
        }
    };
    const removeFeatured = async (id) => {
        if (!confirm('Are you sure removing it from featured?')) return;
        try {
            const { data } = await axios.put(`/vip-numbers/remove-featured/${id}`);
            toast.success('Removed From Featured!');
            getData();
        } catch (e) {
            console.log(e);
        }
    };
    const markAllFeatured = async () => {
        if (!confirm("Are you sure you want to mark all visible numbers as featured?")) return;

        const ids = data?.map((item) => item._id); // Get IDs of only sorted/filtered numbers
        // console.log(ids)
        if (ids.length === 0) {
            toast.error("No numbers to mark as featured.");
            return;
        }

        try {
            await axios.put("/vip-numbers/mark-all-featured", { ids }); // Backend should accept an array of IDs
            toast.success("Selected numbers marked as featured!");
            getData();
        } catch (e) {
            console.error(e);
            toast.error("Failed to mark selected numbers as featured.");
        }
    };

    // console.log(data)

    useEffect(() => {
        getVendors();
    }, [])
    useEffect(() => {
        getData();
    }, [page, filterInput, categoryFilter, featuredFilter, vendorFilter]);

    // useEffect(() => {
    //     setSortedData(
    //         data?.filter(item =>
    //             item.number.includes(filterInput) &&
    //             (categoryFilter === "All" || item.category === categoryFilter) &&
    //             (featuredFilter === "All" || item.featured.toString() === featuredFilter) &&
    //             (vendorFilter === "All" || item.owner?.name === vendorFilter)
    //         )
    //     );
    // }, [filterInput, categoryFilter, featuredFilter, vendorFilter, data]);

    const sortTable = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        const sorted = [...sortedData].sort((a, b) => {
            if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
            if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
            return 0;
        });
        setSortedData(sorted);
        setSortConfig({ key, direction });
    };
    const exportToExcel = (data) => {
    if (!data || data.length === 0) {
        console.error("No data available to export.");
        return;
    }

    const formattedData = data.map((row) => {
        const { number, price, featured, stock, owner } = row;
        const vendor = owner?.name || "N/A";
        const margins = owner?.margins || [];

        const applicableMargin = margins.find(
            (margin) => price >= margin.minPrice && price <= margin.maxPrice
        );

        return {
            number,
            price,
            featured,
            vendor,
            stock,
            marginRange: applicableMargin
                ? `${applicableMargin.minPrice} - ${applicableMargin.maxPrice}`
                : "N/A",
            marginPercent: applicableMargin
                ? `${applicableMargin.marginPercent}%`
                : "N/A"
        };
    });

    const columns = [
        "number",
        "price",
        "featured",
        "vendor",
        "stock",
        "marginRange",
        "marginPercent"
    ];

    const worksheet = XLSX.utils.json_to_sheet(formattedData, { header: columns });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "VIP Numbers");

    XLSX.writeFile(workbook, "vip_numbers.xlsx");
};


    const Categories = [...new Set(data?.map((num) => num.category))]
    return (
        <div className="max-w-[100vw] min-h-full p-3 md:p-6 bg shadow-xl text-black">
            <h2 className="text-3xl font-bold mb-6 text-center">VIP Mobile Numbers Dashboard</h2>
            <div className="flex flex-wrap justify-center lg:justify-left w-full gap-3 mb-6">
                <input
                    className="border p-3 rounded-lg text-gray-900 lg:w-[32%] w-full focus:outline-none focus:ring-2 focus:ring-white"
                    value={filterInput}
                    onChange={(e) => setFilterInput(e.target.value)}
                    placeholder="Search by Number..."
                />
                <select
                    className="border p-3 rounded-lg text-gray-900 lg:w-[32%] w-full focus:outline-none focus:ring-2 focus:ring-white"
                    value={categoryFilter}
                    aria-label="Choose category"
                    onChange={(e) => setCategoryFilter(e.target.value)}
                >
                    <option value="All">All Categories</option>
                    {Categories?.map((data, idx) => <option key={idx} value={data}>{data}</option>)}
                    <option value="Mirror Number">Mirror Number</option>
                    <option value="Others">Others</option>
                </select>
                <select
                    className="border p-3 rounded-lg text-gray-900 lg:w-[32%] w-full focus:outline-none focus:ring-2 focus:ring-white"
                    value={featuredFilter}
                    onChange={(e) => setFeaturedFilter(e.target.value)}
                >
                    <option value="All">All</option>
                    <option value={"true"}>Featured</option>
                    <option value={false}>Non-Featured</option>
                </select>
                <select
                    className="border p-3 rounded-lg lg:w-[32%] w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                    value={vendorFilter}
                    onChange={(e) => setVendorFilter(e.target.value)}
                >
                    <option value='All'>All Vendors</option>
                    {vendors?.map((vendor, index) => <option key={index} value={vendor.name}>{vendor?.name}</option>)}
                </select>
                <button
                    className="bg-green-500 text-white lg:w-[32%] w-full hover:bg-green-600 text-nowrap px-6 py-3 rounded-lg transition duration-300 sm:w-auto"
                    onClick={markAllFeatured}
                >
                    Mark All Featured
                </button>
                <button
                    className="bg-green-500 text-white lg:w-[32%] w-full hover:bg-green-600 px-6 py-3 rounded-lg transition duration-300 sm:w-auto"
                    onClick={() => { exportToExcel(data) }}
                >
                    Download Excel
                </button>
            </div>

            <div className="overflow-x-auto">
                {loading ? <div className="flex justify-center w-full">
                        <svg className="w-16 h-16 animate-spin text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                    </div> : <table className="w-full text-nowrap border border-gray-300 text-xs md:text-sm text-center text-black">
                    <thead className="bg-purple-600">
                        <tr>
                            {["Number", "Price",  "Vendor", "Featured", "Action", "Update"].map((header, index) => (
                                <th
                                    key={index}
                                    onClick={() => sortTable(header.toLowerCase().replace(/\s+/g, ""))}
                                    className="p-4 border border-gray-300 cursor-pointer"
                                >
                                    {header} {sortConfig.key === header.toLowerCase().replace(/\s+/g, "") ? (sortConfig.direction === "asc" ? " 🔼" : " 🔽") : ""}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    {data?.length > 0 ? <tbody>
                        {data?.map((row, index) => (
                            <tr key={index} className="border transition duration-200">
                                <td className="p-3 border border-gray-300">{row.number}</td>
                                <td className="p-3 border border-gray-300">{row.price}</td>
                                {/* <td className="p-3 border border-gray-300">{row.category}</td> */}
                                <td className="p-3 border border-gray-300">{row?.owner?.name}</td>
                                <td className="p-3 border border-gray-300">{row.featured ? 'Yes' : 'No'}</td>
                                <td className="p-3 border border-gray-300">{row.featured ? <button onClick={() => { removeFeatured(row._id) }} className="bg-red-400  py-1 px-2.5">Remove Featured</button> : <button onClick={() => { markFeatured(row._id) }} className="bg-green-400  py-1 px-2.5">Mark Featured</button>}</td>
                                <td className="p-3 border border-gray-300"><div onClick={() => {
                                    setNumberId(row.number);
                                    setIsOpen(true);
                                }} className="flex justify-center text-sm cursor-pointer hover:text-blue-400 hover:underline md:text-lg items-center"><FaEdit />Edit</div></td>
                            </tr>
                        ))}
                    </tbody> : <div className="flex text-center justify-center mx-auto place-content-center min-w-full py-3">No Numbers Found...</div>}
                </table>}
            </div>

            <div className="flex justify-center items-center gap-2 my-4">
                <button
                    className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                >
                    Prev
                </button>
                <span>Page {page} of {totalPages}</span>
                <button
                    className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                >
                    Next
                </button>
            </div>

            {isOpen && <UpdateVIPNumber vipId={numberId} onClose={() => setIsOpen(false)} getData={getData} />}
        </div>
    );
};

export default VipNumbersDashboard;
