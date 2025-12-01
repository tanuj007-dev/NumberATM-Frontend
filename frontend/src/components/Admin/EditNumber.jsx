import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axiosAPI from "../../api/axiosAPI";

const UpdateVIPNumber = ({ vipId, onClose, getData }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const axios = axiosAPI();

  useEffect(() => {
    const fetchVIPData = async () => {
      try {
        const { data } = await axios.get(`/vip-numbers/admin/${vipId}`);
        const number = data.data;
        Object.keys(number).forEach((key) => setValue(key, number[key])); // Fixed setValue
      } catch (error) {
        toast.error("Failed to load VIP number details.");
      }
    };

    if (vipId) fetchVIPData();
  }, [vipId, setValue]);

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      await axios.put(`/vip-numbers/${vipId}`, formData);
      toast.success("VIP number updated successfully!");
      getData();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.error || "Update failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Update VIP Number
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                VIP Number
              </label>
              <input
                type="text"
                {...register("number", { required: "Number is required" })}
                className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
              />
              {errors.number && (
                <p className="text-red-500 text-sm">{errors.number.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                View
              </label>
              <input
                type="text"
                {...register("view")}
                className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                {...register("price", { required: "Price is required" })}
                className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <input
                type="text"
                {...register("category")}
                className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Featured
              </label>
              <select
                {...register("featured")}
                className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-4">
            <button
              type="button"
              className="px-4 py-2 text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateVIPNumber;
