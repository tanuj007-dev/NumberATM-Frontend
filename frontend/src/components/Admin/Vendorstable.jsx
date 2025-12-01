import { useState } from "react";
import { BsTrash, BsPencilSquare, BsCheck } from "react-icons/bs";
import toast from "react-hot-toast";
import axiosAPI from "../../api/axiosAPI";

const VendorsTable = ({ vendors, getVendors, deleteVendor }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const axios = axiosAPI();
  const handleEditClick = (vendor) => {
    setEditingId(vendor._id);
    setEditedValues({
      discount: vendor.discount,
      margins: vendor.margins.map((m) => ({ ...m })),
    });
  };

  const handleSaveClick = async(vendorId) => {
    if(!confirm('Are you sure updating vendor?')) return;
    try{
        const {data} = await axios.put(`vendors/${vendorId}/all`, editedValues);
        toast.success('Updated Successfully!')
        setEditingId(null);
        getVendors();
    }catch(e){
        toast.error('Something Went Wrong!');
        console.log(e);
    }
  };

  const handleInputChange = (e, field) => {
    setEditedValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleMarginChange = (index, field, value) => {
    setEditedValues((prev) => {
      const newMargins = [...prev.margins];
      newMargins[index][field] = value;
      return { ...prev, margins: newMargins };
    });
  };

  return (
    <div className="overflow-x-auto mt-6">
      <table className="w-full border border-gray-200 rounded-lg shadow-md text-gray-800">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="p-4 border">Name</th>
            <th className="p-4 border">Discount</th>
            <th className="p-4 border">Margins</th>
            <th className="p-4 border">Action</th>
            <th className="p-4 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor._id} className="border bg-white hover:bg-gray-50">
              <td className="p-4 border">{vendor.name}</td>
              <td className="p-4 border">
                {editingId === vendor._id ? (
                  <input
                    type="number"
                    value={editedValues.discount}
                    onChange={(e) => handleInputChange(e, "discount")}
                    className="border rounded px-2 py-1 w-16"
                  />
                ) : (
                  `${vendor.discount}%`
                )}
              </td>
              <td className="p-4 border text-sm">
                {editingId === vendor._id ? (
                  editedValues.margins.map((m, index) => (
                    <div key={index} className="mb-1 flex gap-2">
                      <input
                        type="number"
                        value={m.minPrice}
                        onChange={(e) => handleMarginChange(index, "minPrice", e.target.value)}
                        className="border rounded px-2 py-1 w-16"
                      />
                      -
                      <input
                        type="number"
                        value={m.maxPrice}
                        onChange={(e) => handleMarginChange(index, "maxPrice", e.target.value)}
                        className="border rounded px-2 py-1 w-16"
                      />
                      :
                      <input
                        type="number"
                        value={m.marginPercent}
                        onChange={(e) => handleMarginChange(index, "marginPercent", e.target.value)}
                        className="border rounded px-2 py-1 w-16"
                      />
                      %
                    </div>
                  ))
                ) : (
                  vendor.margins.map((m, index) => (
                    <div key={index} className="mb-1">
                      {m.minPrice}-{m.maxPrice}: {m.marginPercent}%
                    </div>
                  ))
                )}
              </td>
              <td className="p-4 border text-center">
              {editingId === vendor._id ? (
                  <div className="flex justify-center w-full">
                    <BsCheck
                    className="text-xl text-green-500 cursor-pointer"
                    onClick={() => handleSaveClick(vendor._id)}
                  />
                  </div>
                ) : (
                    <div className="flex justify-center w-full"><BsPencilSquare
                    className="text-xl text-blue-500 cursor-pointer"
                    onClick={() => handleEditClick(vendor)}
                  /></div>
                )}
              </td>
              <td className="p-4 text-center border text-sm ">
              <div className="flex justify-center w-full">
                <BsTrash
                  className="text-xl text-red-500 cursor-pointer"
                  onClick={() => deleteVendor(vendor._id)}
                /></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendorsTable;
