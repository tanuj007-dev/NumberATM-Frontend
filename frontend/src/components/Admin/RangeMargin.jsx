import { useState, useEffect } from "react";
import { BsCheck, BsPlus } from "react-icons/bs";
import toast from "react-hot-toast";
import axiosAPI from "../../api/axiosAPI";

const PriceBasedMarginsTable = () => {
  const [margins, setMargins] = useState([]);
  const [editedMargins, setEditedMargins] = useState([]);
  const [newMargin, setNewMargin] = useState({ minPrice: "", maxPrice: "", marginPercent: "" });
  const axios = axiosAPI();

  const getMargins = async () => {
    try {
      const { data } = await axios.get("/margins");
      setMargins(data);
      setEditedMargins(data.map((m) => ({ ...m })));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getMargins();
  }, []);

  const handleMarginChange = (index, field, value) => {
    setEditedMargins((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const handleNewMarginChange = (field, value) => {
    setNewMargin((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveClick = async () => {
    if (!confirm("Are you sure you want to update margins?")) return;

    try {
      await Promise.all(
        editedMargins.map((margin) =>
          axios.put(`/margins/${margin._id}`, {
            minPrice: margin.minPrice,
            maxPrice: margin.maxPrice,
            marginPercent: margin.marginPercent,
          })
        )
      );
      toast.success("Margins updated successfully!");
      getMargins();
    } catch (e) {
      toast.error("Update failed.");
      console.error(e);
    }
  };

  const handleAddMargin = async () => {
    const { minPrice, maxPrice, marginPercent } = newMargin;
    if (!minPrice || !maxPrice || !marginPercent) {
      return toast.error("Please fill all fields.");
    }

    try {
      await axios.post("/margins", newMargin);
      toast.success("Margin added!");
      setNewMargin({ minPrice: "", maxPrice: "", marginPercent: "" });
      getMargins();
    } catch (e) {
      toast.error("Failed to add margin.");
      console.error(e);
    }
  };

  return (
    <div className="overflow-auto max-w-full p-3 mt-6">
    <div className="overflow-x-auto">
      <table className="w-full overflow-auto border border-gray-200 rounded-lg shadow-md text-gray-800">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="p-4 border">Min Price</th>
            <th className="p-4 border">Max Price</th>
            <th className="p-4 border">Margin %</th>
          </tr>
        </thead>
        <tbody>
          {editedMargins?.map((m, index) => (
            <tr key={m._id} className="border bg-white hover:bg-gray-50">
              <td className="p-4 border">
                <input
                  type="number"
                  value={m.minPrice}
                  onChange={(e) => handleMarginChange(index, "minPrice", e.target.value)}
                  className="border rounded px-2 py-1"
                />
              </td>
              <td className="p-4 border">
                <input
                  type="number"
                  value={m.maxPrice}
                  onChange={(e) => handleMarginChange(index, "maxPrice", e.target.value)}
                  className="border rounded px-2 py-1"
                />
              </td>
              <td className="p-4 border">
                <input
                  type="number"
                  value={m.marginPercent}
                  onChange={(e) => handleMarginChange(index, "marginPercent", e.target.value)}
                  className="border rounded px-2 py-1"
                />
              </td>
            </tr>
          ))}

          {/* New Margin Row */}
          <tr className="border">
            <td className="p-4 border">
              <input
                type="number"
                value={newMargin.minPrice}
                onChange={(e) => handleNewMarginChange("minPrice", e.target.value)}
                className="border rounded px-2 py-1"
                placeholder="Min"
              />
            </td>
            <td className="p-4 border">
              <input
                type="number"
                value={newMargin.maxPrice}
                onChange={(e) => handleNewMarginChange("maxPrice", e.target.value)}
                className="border rounded px-2 py-1"
                placeholder="Max"
              />
            </td>
            <td className="p-4 border flex items-center gap-2">
              <input
                type="number"
                value={newMargin.marginPercent}
                onChange={(e) => handleNewMarginChange("marginPercent", e.target.value)}
                className="border rounded px-2 py-1"
                placeholder="%"
              />
              <button
                onClick={handleAddMargin}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                <BsPlus size={18} />
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-end mt-4">
        <button
          onClick={handleSaveClick}
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          <BsCheck /> Save Changes
        </button>
      </div>
    </div>
    </div>
  );
};

export default PriceBasedMarginsTable;
