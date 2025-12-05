import { useEffect, useRef, useState } from "react";
 
import { FaSearch, FaTimes, FaTrashAlt } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
import UserAxiosAPI from "../../api/userAxiosAPI";
import { useAlert } from "../../context/AlertContext";

export default function FeaturedNumbers() {
  const axios = UserAxiosAPI();
  const { showAlert } = useAlert();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filteredNumbers, setFilteredNumbers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const [featuredRows, setFeaturedRows] = useState([]);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);

  const searchWrapperRef = useRef(null);

  const fetchNumbersBySearch = async (term) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/featured/vip-numbers/featured?search=${term}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching numbers:", error);
      return { data: [] };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    const loadNumbers = async () => {
      if (!debouncedSearch || debouncedSearch.trim().length === 0) {
        setFilteredNumbers([]);
        return;
      }

      const data = await fetchNumbersBySearch(debouncedSearch);

      if (data && Array.isArray(data)) {
        setFilteredNumbers(data);
      } else if (data && data.data && Array.isArray(data.data)) {
        setFilteredNumbers(data.data);
      } else if (data && data.numbers && Array.isArray(data.numbers)) {
        setFilteredNumbers(data.numbers);
      } else {
        setFilteredNumbers([]);
      }
    };

    loadNumbers();
  }, [debouncedSearch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredNumbers([]);
    setShowDropdown(false);
  };

  const handleAddFromSearch = (number) => {
    if (!number || !number.number) return;
    setFeaturedRows((prev) => {
      const exists = prev.some((row) => row.number === number.number);
      if (exists) return prev;
      return [
        ...prev,
        {
          id: number._id || `${number.number}-${Date.now()}`,
          number: number.number,
          startTime: "",
          endTime: "",
        },
      ];
    });
    clearSearch();
  };

  const handleUpdateRowTime = (id, field, value) => {
    setFeaturedRows((prev) =>
      prev.map((row) =>
        row.id === id
          ? {
              ...row,
              [field]: value,
            }
          : row
      )
    );
  };

  const handleDeleteRow = (id) => {
    setFeaturedRows((prev) => prev.filter((row) => row.id !== id));
  };

  const handleSaveAll = async () => {
    const featuredNumbers = featuredRows
      .filter((row) => row.startTime && row.endTime)
      .map((row) => {
        const [startDate, startTime] = row.startTime.split("T");
        const [expiresDate, expiresTime] = row.endTime.split("T");

        return {
          number: row.number,
          startDate,
          startTime: startTime?.slice(0, 5) || "00:00",
          expiresDate,
          expiresTime: expiresTime?.slice(0, 5) || "23:59",
          active: true,
        };
      });

    const payload = { featuredNumbers };
    console.log("Saving featured numbers payload:", payload);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/featured/sync",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Featured numbers saved successfully:", response.data);
      await showAlert({
        title: "Success",
        message: "Saved Successfully",
      });
    } catch (error) {
      console.error("Error saving featured numbers:", error);
    }
  };

  return (
    <div className="p-3 sm:p-4 md:p-6">
      <h1 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-[#17565D]">
        Add Featured Number
      </h1>

      <div className="max-w-6xl w-full">
        <div className="relative" ref={searchWrapperRef}>
          <div className="bg-[#F3FBFA] p-1 flex items-center rounded-md pl-2 sm:pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600 pr-2 w-full">
            <div className="shrink-0 text-sm sm:text-base text-gray-500 select-none">
              <FaSearch className="text-base sm:text-lg" />
            </div>
            <input
              type="text"
              placeholder="Search VIP Numbers..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowDropdown(true);
              }}
              className="block min-w-0 grow py-1.5 pr-2 pl-1 text-sm sm:text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
            />

            {searchTerm && (
              <button
                type="button"
                onClick={clearSearch}
                className="mx-2 text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            )}
            <div className="grid shrink-0 grid-cols-1 focus-within:relative">
              <CiBoxList className="text-lg sm:text-xl" />
            </div>
          </div>

          {showDropdown && searchTerm && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-[400px] overflow-y-auto z-10">
              {loading ? (
                <div className="p-6 text-center text-gray-500">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#17565D] mx-auto"></div>
                  <p className="mt-2 text-sm">Searching for numbers...</p>
                </div>
              ) : filteredNumbers.length > 0 ? (
                <div className="py-1">
                  <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
                    <p className="text-xs text-gray-600 font-medium">
                      Found {filteredNumbers.length} number
                      {filteredNumbers.length > 1 ? "s" : ""}
                    </p>
                  </div>
                  {filteredNumbers.map((number, index) => (
                    <div
                      key={number._id || index}
                      className="flex items-center justify-between gap-4 p-4 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-100"
                    >
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-base font-semibold text-[#17565D] mb-1 text-nowrap"
                          dangerouslySetInnerHTML={{
                            __html: number.highLightedNumber || number.number,
                          }}
                        />
                      </div>
                      {number.price && (
                        <div className="text-right flex-shrink-0">
                          <p className="text-sm font-bold text-[#F5C037]">
                            ₹{number.price.toLocaleString("en-IN")}
                          </p>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => handleAddFromSearch(number)}
                        className="px-2 sm:px-4 py-1 sm:py-2 bg-[#17565D] text-white text-sm font-semibold rounded-md"
                      >
                        Add
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-gray-500">
                  <p className="text-sm">
                    No numbers found matching "{searchTerm}"
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Try searching with different digits
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {featuredRows.length > 0 && (
        <>
          <div className="mt-6 sm:mt-8 overflow-x-auto -mx-2 sm:mx-0">
            <table className="min-w-full border border-[#17565D] text-xs sm:text-sm">
              <thead className="bg-[#17565D] text-white text-xs sm:text-sm">
                <tr>
                  <th className="px-4 py-2 border border-[#17565D] text-left">
                    Number
                  </th>
                  <th className="px-4 py-2 border border-[#17565D] text-left">
                    Start Time
                  </th>
                  <th className="px-4 py-2 border border-[#17565D] text-left">
                    End Time
                  </th>
                  <th className="px-4 py-2 border border-[#17565D] text-center">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {featuredRows.map((row) => (
                  <tr key={row.id} className="">
                    <td className="px-2 sm:px-4 py-2 border border-[#17565D] font-semibold whitespace-nowrap">
                      {row.number}
                    </td>
                    <td className="px-2 sm:px-4 py-2 border border-[#17565D] min-w-[140px] sm:min-w-[180px]">
                      <input
                        type="datetime-local"
                        value={row.startTime}
                        onChange={(e) =>
                          handleUpdateRowTime(row.id, "startTime", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-md px-1 sm:px-2 py-1 text-[10px] sm:text-xs"
                      />
                    </td>
                    <td className="px-2 sm:px-4 py-2 border border-[#17565D] min-w-[140px] sm:min-w-[180px]">
                      <input
                        type="datetime-local"
                        value={row.endTime}
                        onChange={(e) =>
                          handleUpdateRowTime(row.id, "endTime", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-md px-1 sm:px-2 py-1 text-[10px] sm:text-xs"
                      />
                    </td>
                    <td className="px-2 sm:px-4 py-2 border border-[#17565D] text-center">
                      <button
                        type="button"
                        onClick={() => setDeleteTargetId(row.id)}
                        className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                      >
                        <FaTrashAlt size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 sm:mt-6">
            <button
              type="button"
              onClick={() => setShowSaveConfirm(true)}
              className="px-4 sm:px-6 py-2 bg-[#17565D] text-white text-sm sm:text-base font-semibold rounded-md w-full sm:w-auto"
            >
              Save
            </button>
          </div>
        </>
      )}

      {deleteTargetId && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-3">
          <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 w-full max-w-sm">
            <h2 className="text-base sm:text-lg font-semibold text-[#17565D] mb-2">
              Delete Featured Number?
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mb-4">
              Are you sure you want to remove this number from the featured grid?
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteTargetId(null)}
                className="px-3 sm:px-4 py-1.5 rounded-md border border-gray-300 text-xs sm:text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (deleteTargetId) {
                    handleDeleteRow(deleteTargetId);
                  }
                  setDeleteTargetId(null);
                }}
                className="px-3 sm:px-4 py-1.5 rounded-md bg-red-600 text-white text-xs sm:text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showSaveConfirm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-3">
          <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 w-full max-w-sm">
            <h2 className="text-base sm:text-lg font-semibold text-[#17565D] mb-2">
              Save Featured Numbers?
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mb-4">
              Do you want to save all featured numbers and their timings?
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowSaveConfirm(false)}
                className="px-3 sm:px-4 py-1.5 rounded-md border border-gray-300 text-xs sm:text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  await handleSaveAll();
                  setShowSaveConfirm(false);
                }}
                className="px-3 sm:px-4 py-1.5 rounded-md bg-[#17565D] text-white text-xs sm:text-sm"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}