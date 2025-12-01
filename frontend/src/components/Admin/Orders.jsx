import React, { useEffect, useState } from 'react'
import axiosAPI from '../../api/axiosAPI';
import OrdersTable from './OrderPage';

export default function Orders() {
    const axios = axiosAPI();

    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [limit,setLimit] = useState(25); // items per page
    const [total, setTotal] = useState(0);
    const renderPageNumbers = () => {
        const pageNumbers = [];

        const maxVisible = 7; // total number of buttons shown (including current, prev/next, …)
        const sidePages = 3; // how many to show on either side of current

        let startPage = Math.max(1, page - sidePages);
        let endPage = Math.min(pages, page + sidePages);

        // adjust if near the start
        if (page <= sidePages) {
            endPage = Math.min(pages, maxVisible);
        }

        // adjust if near the end
        if (page > pages - sidePages) {
            startPage = Math.max(1, pages - maxVisible + 1);
        }

        // always show first page
        if (startPage > 1) {
            pageNumbers.push(
                <button
                    key={1}
                    onClick={() => setPage(1)}
                    className={`px-3 py-1 rounded ${page === 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                    1
                </button>
            );

            if (startPage > 2) {
                pageNumbers.push(
                    <span key="start-ellipsis" className="px-2">
                        ...
                    </span>
                );
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => setPage(i)}
                    className={`px-3 py-1 rounded ${page === i ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                    {i}
                </button>
            );
        }

        if (endPage < pages) {
            if (endPage < pages - 1) {
                pageNumbers.push(
                    <span key="end-ellipsis" className="px-2">
                        ...
                    </span>
                );
            }

            pageNumbers.push(
                <button
                    key={pages}
                    onClick={() => setPage(pages)}
                    className={`px-3 py-1 rounded ${page === pages ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                    {pages}
                </button>
            );
        }

        return pageNumbers;
    };

     const loadOrders = async (params) => {
    try {
        // const params = {
        //     page,
        //     limit,
        // };
        const res = await axios.get('/orders', { params });
        if (res.data.success) {
            setOrders(res.data.orders);
            setTotal(res.data.total);
        }
    } catch (err) {
        console.error(err);
    }
};

    useEffect(() => {
        loadOrders();
    }, []);

    const pages = Math.ceil(total / limit);
    return (
        <>
            <OrdersTable orders={orders} setLimit={setLimit} setOrders={setOrders} page={page} limit={limit} setTotal={setTotal} getOrders={loadOrders} />
            <div className="flex justify-center mt-4 gap-2">
                <div className="flex justify-center mt-4 gap-1 flex-wrap">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                    >
                        Prev
                    </button>

                    {renderPageNumbers()}

                    <button
                        disabled={page === pages}
                        onClick={() => setPage((p) => Math.min(pages, p + 1))}
                        className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>

            </div>
        </>
    )
}
