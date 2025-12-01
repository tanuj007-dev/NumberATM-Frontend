const OrderDetails = ({ selectedOrder, setSelectedOrder }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 px-0 md:px-6 sm:p-6">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl transform transition-all duration-300 scale-100 hover:scale-[1.02] border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Order Details</h2>
        <div className="space-y-2 text-gray-700">
          <p><strong className="text-gray-900">Order ID:</strong> {selectedOrder.orderId}</p>
          <p><strong className="text-gray-900">Name:</strong> {selectedOrder.firstName + " " + selectedOrder.lastName}</p>
          <p><strong className="text-gray-900">Contact:</strong> +91-{selectedOrder.phone}</p>
          <p><strong className="text-gray-900">Email:</strong> {selectedOrder.email}</p>
          <p>
            <strong className="text-gray-900">MRP:</strong> ₹
            {(selectedOrder.totalPrice - (selectedOrder.gst || 0)).toFixed(2)}
          </p>

          {selectedOrder.gst && (
            <p>
              <strong className="text-gray-900">Gst:</strong> ₹
              {selectedOrder.gst.toFixed(2)}
            </p>
          )}

          <p>
            <strong className="text-gray-900">Total Price:</strong> ₹
            {selectedOrder.totalPrice.toFixed(2)}
          </p>

          {/* <p>
              <strong className="text-gray-900">Status:</strong> 
              <span className={`px-2 py-1 rounded-lg text-sm ${selectedOrder.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {selectedOrder.status}
              </span>
            </p> */}
          <p>
            <strong className="text-gray-900">Payment Status:</strong>
            <span className={`px-2 py-1 rounded-lg text-sm ${selectedOrder.paymentStatus === 'Paid' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
              {selectedOrder.paymentStatus}
            </span>
          </p>
          <p><strong className="text-gray-900">Order Time:</strong> {new Date(selectedOrder.createdAt).toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>

          {/* Items Section */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Items ({selectedOrder.items?.length})</h3>
            <div className="max-h-40 overflow-y-auto space-y-2 p-2 border rounded-lg bg-gray-50">
              {selectedOrder?.numberPricePairs?.length > 0 ? selectedOrder.numberPricePairs.map((item, index) => (
                <div key={index} className="p-3 border flex flex-wrap gap-4 gap-y-2 rounded-lg shadow-sm bg-white">
                  <p><strong className="text-gray-900">VIP Number:</strong> {item?.number}</p>
                  {/* <p><strong className="text-gray-900">Category:</strong> {(item?.premium||item.vipNumber?.category==='Premium')?'Premium':'Standard'}</p> */}
                  <p><strong className="text-gray-900">Vendor Price:</strong> ₹{item?.price}</p>
                  {/* {item.vipNumber?.oldPrice && (
                        <p><strong className="text-gray-900">Old Price:</strong> <span className="">₹{item.vipNumber?.oldPrice.toFixed(2)}</span></p>
                    )} */}
                  {/* <p><strong className="text-gray-900">Paid Price:</strong> ₹{selectedOrder.totalPrice.toFixed(2)}</p> */}
                  {/* <p><strong className="text-gray-900">Stock:</strong> {item.vipNumber?.stock}</p> */}
                </div>
              )) : selectedOrder.numbers.map((item, index) => (
                <div key={index} className="p-3 border flex flex-wrap gap-4 gap-y-2 rounded-lg shadow-sm bg-white">
                  <p><strong className="text-gray-900">VIP Number:</strong> {item}</p>
                  {/* <p><strong className="text-gray-900">Category:</strong> {(item?.premium||item.vipNumber?.category==='Premium')?'Premium':'Standard'}</p> */}
                  {/* <p><strong className="text-gray-900">Vendor Price:</strong> ₹{item.price.toFixed(2)}</p> */}
                  {/* {item.vipNumber?.oldPrice && (
                        <p><strong className="text-gray-900">Old Price:</strong> <span className="">₹{item.vipNumber?.oldPrice.toFixed(2)}</span></p>
                    )} */}
                  {/* <p><strong className="text-gray-900">Paid Price:</strong> ₹{selectedOrder.totalPrice.toFixed(2)}</p> */}
                  {/* <p><strong className="text-gray-900">Stock:</strong> {item.vipNumber?.stock}</p> */}
                </div>
              ))}
            </div>
          </div>
        </div>
        <button
          className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
          onClick={() => setSelectedOrder(null)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
