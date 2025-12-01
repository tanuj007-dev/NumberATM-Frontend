import { useState } from "react";
import { FaSort, FaEye, FaSearch, FaTrash, FaDownload } from "react-icons/fa";
import { RiResetLeftFill } from "react-icons/ri";
import OrderDetails from "./OrderDetails";
const XLSX = await import("xlsx");
import axiosAPI from "../../api/axiosAPI";
import { MdDeleteOutline, MdDeleteForever } from "react-icons/md";
import toast from "react-hot-toast";
import { useEffect } from "react";
const OrdersTable = ({ orders, onUpdateOrder, setOrders, setLimit,setTotal, page, limit , getOrders}) => {
  const [sortConfig, setSortConfig] = useState({ key: "createdAt", direction: "desc" });
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPayment, setFilterPayment] = useState("");
  const [filterStartDate, setFilterStartDate] = useState(null);
  const [filterEndDate, setFilterEndDate] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const axios = axiosAPI();
  const loadOrders = async () => {
    try {
      const params = {
        page,
        limit,
        status: filterStatus,
        paymentStatus: filterPayment,
        startDate: filterStartDate,
        endDate: filterEndDate,
        search: searchQuery,
      };
      getOrders(params);
      // if (res.data.success) {
      //   setOrders(res.data.orders);
      //   setTotal(res.data.total);
      // }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    loadOrders();
  }, [page, limit]);
  const handleApiCall = async (apiCallFn) => {
    try {
      const response = await apiCallFn();
      return { success: true, data: response.data };
    } catch (error) {
      console.error("API Error:", error);
      return {
        success: false,
        error: error?.response?.data?.message || error.message || "Unknown error",
      };
    }
  };
  const softDeleteOrder = async (orderId) => {
    return await handleApiCall(() => axios.delete(`/orders/soft/${orderId}`));
  };

  // 5. Hard delete order
  const hardDeleteOrder = async (orderId) => {
    return await handleApiCall(() => axios.delete(`/orders/hard/${orderId}`));
  };
  const handleSoftDelete = async (orderId) => {
    const confirm = window.confirm("Are you sure you want to delete this order, but keep the record?");
    if (!confirm) return;

    try {
      const result = await softDeleteOrder(orderId);
      if (result.success) {
        toast("Deleted order successfully!", { icon: <FaTrash className="text-purple-600" /> });
        await loadOrders();
      } else {
        toast.error(`Soft delete failed: ${result.error}`);
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred during soft delete.");
    }
  };

  const handleHardDelete = async (orderId) => {
    const confirm = window.confirm(
      "⚠️ Are you sure you want to PERMANENTLY delete this order?\nThis cannot be undone!"
    );
    if (!confirm) return;

    try {
      const result = await hardDeleteOrder(orderId);
      if (result.success) {
        toast("Permanently deleted order successfully!", { icon: <FaTrash className="text-red-600" /> });
        await loadOrders();
      } else {
        toast.error(`Hard delete failed: ${result.error}`);
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred during hard delete.");
    }
  };
  const sortedOrders = [...orders]?.sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });
  const exportToExcel = (data) => {
    if (!data || data.length === 0) {
      console.error("No data available to export.");
      return;
    }

    const formattedData = data.map((row) => {
      const {
        firstName,
        orderId,
        numbers,
        items,
        email,
        phone,
        paymentStatus,
        totalPrice,
        createdAt
      } = row;

      const numList =
        numbers?.length > 0
          ? numbers
          : items?.map((item) => item?.vipNumber?.number || "Deleted Number");

      return {
        name: firstName,
        orderId,
        numbers: numList?.join(", "),
        email,
        contact: phone || "N/A",
        paymentStatus,
        totalPrice:
          typeof totalPrice === "number" ? totalPrice.toFixed(2) : "0.00",
        createdAt: new Date(createdAt).toLocaleString("en-US", {
          day: "2-digit",
          year: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit"
        })
      };
    });

    const columns = [
      "name",
      "orderId",
      "numbers",
      "email",
      "contact",
      "paymentStatus",
      "totalPrice",
      "createdAt"
    ];

    const worksheet = XLSX.utils.json_to_sheet(formattedData, { header: columns });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

    const filename = `orders_${new Date().toISOString().slice(0, 10)}.xlsx`;
    XLSX.writeFile(workbook, filename);
  };

  const filteredOrders = orders||[];
  // sortedOrders?.filter((order) =>
  //   (order.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     order.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     order.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     order.orderId.toLowerCase().includes(searchQuery.toLowerCase())) &&
  //   (filterStatus ? order.status === filterStatus : true) &&
  //   (filterPayment ? order.paymentStatus === filterPayment : true)
  // );
const resetFilters = () => {
    setSearchQuery("");
    setFilterStatus("");
    setFilterPayment("");
    setFilterStartDate(null);
    setFilterEndDate(null);
    getOrders();
  };
  const requestSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };
  const handleClick = async (orderId, status) => {
    if (!confirm(`Are you sure mark ${orderId} as ${status} !`)) return;
    setLoading(true);
    try {
      const res = await axios.post("/orders/mark-paid", { orderId, status });
      if (res.data.success) {
        toast.success(res.data.message || "Order status updated successfully");
        loadOrders();
      }
      else {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error(err?.response?.data?.message || "Error updating status");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-4 sm:p-6 bg-white shadow-lg rounded-lg w-auto overflow-auto">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="relative md:w-[24%] sm:w-[48%] w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Search..."
          />
          <FaSearch className="absolute right-3 top-4 text-gray-500" />
        </div>

        {/* <div className="flex flex-wrap gap-2"> */}
        <select
          className="px-4 py-2 border md:w-[24%] sm:w-[48%] w-full border-gray-300 rounded"
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Ordered">Ordered</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>
        <input
          value={filterStartDate || ""}
          onChange={(e) => setFilterStartDate(e.target.value)}
          type={filterStartDate ? "date" : "text"}
          placeholder="Start Date"
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => !filterStartDate && (e.target.type = "text")}
          className="px-4 py-2 border cursor-pointer md:w-[24%] sm:w-[48%] w-full border-gray-300 rounded"
        />
        <input
          value={filterEndDate || ""}
          onChange={(e) => setFilterEndDate(e.target.value)}
          type={filterEndDate ? "date" : "text"}
          placeholder="End Date"
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => !filterEndDate && (e.target.type = "text")}
          className="px-4 py-2 border cursor-pointer md:w-[24%] sm:w-[48%] w-full border-gray-300 rounded"
        />
        <select
          className="px-4 py-2 border md:w-[24%] sm:w-[48%] w-full border-gray-300 rounded"
          onChange={(e) => setFilterPayment(e.target.value)}
        >
          <option value="">All Payment Status</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Refunded">Refunded</option>
          <option value="In Process">In Process</option>
          <option value="Failed">Failed</option>
        </select>
        <select
          className="px-4 py-2 border md:w-[24%] sm:w-[48%] w-full border-gray-300 rounded"
          onChange={(e) => setLimit(Number(e.target.value))}
        >
          <option value="50" selected>Show 50 per page</option>
          <option value="100" >Show 100 per page</option>
          <option value="250">Show 250 per page</option>
          <option value="500">Show 500 per page</option>
          <option value="750">Show 750 per page</option>
          <option value="1000">Show 1000 per page</option>
          <option value="2000">Show 2000 per page</option>
          <option value="5000">Show 5000 per page</option>
        </select>
        <button
          type="button"
          onClick={resetFilters}
          className="md:w-[24%] sm:w-[48%] w-full rounded-lg px-4 py-2 bg-red-500 text-white font-semibold shadow hover:bg-red-600 transition duration-200 border border-red-500 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          <RiResetLeftFill className="inline mr-2" />
          Reset
        </button>
        <button
          type="button"
          onClick={loadOrders}
          className="md:w-[24%] sm:w-[48%] w-full rounded-lg px-4 py-2 bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition duration-200 border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <FaSearch className="inline mr-2" />
          Search
        </button>
        <button
          type="button"
          className="md:w-[24%] sm:w-[48%] w-full rounded-lg px-4 py-2 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white font-semibold shadow-lg hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 transition duration-200 border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          onClick={(e) => exportToExcel(filteredOrders)}
        >
          <FaDownload className="inline mr-2" />
          Export to Excel
        </button>
        {/* </div> */}
      </div>

      {/* Scrollable Table */}
      <div className="w-full max-h-[75vh] overflow-x-auto">
        <div className="max-w-5xl align-middle">
          <table className="w-full text-sm text-left border border-gray-300">
            <thead>
              <tr className="bg-black text-white text-sm">
                {[
                  // "S No.",
                  "Order ID",
                  "Items",
                  "Name",
                  "Email",
                  "Contact No",
                  "Total Price",
                  "Date",
                  "Payment Status",
                  "Update Payment Status",
                  "Actions",
                ].map((header, index) => (
                  <th
                    key={index}
                    className="py-3 px-4 border border-gray-500 text-center whitespace-nowrap cursor-pointer"
                    onClick={() => requestSort(header.toLowerCase().replace(/\s/g, ""))}
                  >
                    {header} <FaSort className="inline ml-1" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredOrders?.map((order, i) => (
                <tr key={order._id} className="border-b hover:bg-gray-50 transition">
                  {/* <td className="py-3 px-4 border border-gray-500 text-center">{i + 1}</td> */}
                  <td className="py-3 px-4 border text-nowrap border-gray-500">{order.orderId}</td>
                  <td className="py-3 px-4 border font-semibold border-gray-500 text-center">
                    {order?.numbers?.length > 0 ? order.numbers?.map((item, index) => (
                      <div key={index}>{item}</div>
                    )) : order.items?.map((item, index) => (
                      <div key={index}>{item?.vipNumber?.number || "Deleted Number"}</div>
                    ))}
                  </td>
                  <td className="py-3 px-4 border border-gray-500">{order.name || order?.firstName}</td>
                  <td className="py-3 px-4 border border-gray-500">{order.email}</td>
                  <td className="py-3 px-4 border border-gray-500">{order.phone}</td>
                  <td className="py-3 px-4 border border-gray-500">₹{order.totalPrice?.toFixed(2)}</td>
                  <td className="py-3 px-4 border border-gray-500 text-nowrap">
                    {new Date(order.createdAt).toLocaleString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="py-3 px-4 border border-gray-500 text-center">
                    <span
                      className={`px-2 py-1 rounded text-white text-xs ${(order.paymentStatus === "Pending" || order.paymentStatus === "Failed")
                        ? "bg-red-500"
                        : order.paymentStatus === "Cancelled" ? "bg-gray-400"
                          : order.paymentStatus === "In Process" ? "bg-purple-500" : order.paymentStatus === "Refunded" ? "bg-yellow-500" : "bg-green-500"
                        }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 border border-gray-500 text-center">
                    <div className="h-full flex justify-center gap-2">
                      <button
                        onClick={() => handleClick(order.orderId, "Paid")}
                        disabled={loading || order.paymentStatus === "Paid"}
                        className={`px-4 py-2 rounded-md font-medium text-nowrap transition duration-300 ${order.paymentStatus === "Paid"
                          ? "bg-green-500 text-white cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                          }`}
                      >
                        {"Mark as Paid"}
                      </button>
                      <button
                        onClick={() => handleClick(order.orderId, "Refunded")}
                        disabled={loading || order.paymentStatus === "Refunded"}
                        className={`px-4 py-2 rounded-md font-medium text-nowrap transition duration-300 ${order.paymentStatus === "Refunded"
                          ? "bg-green-500 text-white cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                          }`}
                      >
                        {order.paymentStatus === "Refunded" ? "Refunded" : "Mark as Refunded"}
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4 border-b  border-gray-500 gap-2 text-center">
                    <div className="h-full flex justify-center gap-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <FaEye />
                      </button>
                      <button
                        className="flex items-center gap-1 text-nowrap bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-3 py-1.5 rounded transition duration-200 shadow-sm"
                        onClick={() => handleSoftDelete(order.orderId)}
                      >
                        <MdDeleteOutline className="text-lg md:text-xl" />
                        Soft Delete
                      </button>
                      <button
                        className="flex items-center gap-1 text-nowrap bg-red-600 hover:bg-red-700 text-white font-medium px-3 py-1.5 rounded transition duration-200 shadow-sm"
                        onClick={() => handleHardDelete(order.orderId)}
                      >
                        <MdDeleteForever className="text-lg md:text-xl" />
                        Hard Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredOrders?.length === 0 && (
            <p className="text-center text-gray-500 mt-4">No orders found.</p>
          )}
        </div>
      </div>

      {/* Order Details Popup */}
      {selectedOrder && (
        <OrderDetails selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} />
      )}
    </div>
  );
};

export default OrdersTable;
