import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { FaFilter, FaRegHandPointer, FaWhatsapp } from "react-icons/fa";
import UserAxiosAPI from "../../api/userAxiosAPI";
import { MdOutlineCurrencyRupee, MdOutlinePriceChange, MdOutlineSavedSearch } from "react-icons/md";
import toast from "react-hot-toast";
import AnimatedNumberLink from "../AnimatedNumber";
import { FaSearchPlus } from "react-icons/fa";
const categories = [
  { name: "Numerology Without 2 4 8", count: 10528 },
  { name: "PENTA NUMBERS", count: 372 },
  { name: "HEXA NUMBER", count: 414 },
  { name: "SEPTA (9XY AAA AAA A)", count: 89 },
  { name: "OCTA NUMBERS", count: 8 },
  { name: "ENDING AAAA NUMBERS", count: 684 },
  { name: "AB AB (XXXXXX 1212)", count: 2177 },
  { name: "ABC ABC NUMBERS", count: 3836 },
  { name: "MIRROR NUMBERS", count: 214 },
  { name: "SEMI MIRROR NUMBERS", count: 1373 },
  { name: "123456 NUMBERS", count: 1058 },
  { name: "786 NUMBERS", count: 434 },
  { name: "11 12 13 NUMBERS", count: 552 },
  { name: "UNIQUE NUMBERS", count: 7103 },
  { name: "AAA BBB", count: 947 },
  { name: "XY XY XY NUMBERS", count: 1364 },
  { name: "DOUBLING NUMBERS", count: 485 },
  { name: "ENDING AAA NUMBERS", count: 3458 },
  { name: "AB XYXYXYXY", count: 80 },
  { name: "ABCD ABCD NUMBERS", count: 1245 },
  { name: "abc abc abc", count: 52 },
  { name: "AAAA BBBB NUMBERS", count: 43 },
  { name: "3 DIGITS NUMBER", count: 83 },
  { name: "AB AB XY XY", count: 2641 },
  { name: "AAA XY AAA", count: 286 },
  { name: "AOOB COOD / ABOO CDOO / OOOAB", count: 1616 },
  { name: "AAAA middle", count: 2699 },
  { name: "AO BO CO DO EO", count: 473 },
  { name: "AAA Middle", count: 2049 },
  { name: "Start & Middle PENTA", count: 385 },
  { name: "AOO BOO / AOO BOO COO", count: 598 },
  { name: "START A OOO B END A OOO B", count: 309 },
  { name: "AAAA XY AAAA", count: 0 },
];

const SearchComponent = ({
  numbers,
  seprate,
  setLoading,
  setFilteredNumbers,
  getNumbers,
  setSearch,
  filters,
  setFilters,
  setPage,
  searchParams,
  setSearchParams,
}) => {
  const [activeTab, setActiveTab] = useState(
    seprate ? "digits" : searchParams.get("tab") || "digits"
  );
  const [subTab, setSubTab] = useState(searchParams.get("subTab") || "premium");
  const [searchInput, setSearchInput] = useState(
    searchParams.get("query") || ""
  );
  const [wallpapers, setWallpapers] = useState([]);
  const [exactDigits, setExactDigits] = useState(
    searchParams.get("exactPlace")?.split("") || Array(10).fill("")
  );
  const axios = UserAxiosAPI();
  const getDefaultFilters = (sortType = "") => ({
    startWith: false,
    endsWith: false,
    searchInput: "",
    category: "",
    contains: true,
    startWithDigits: "",
    endsWithDigits: "",
    mustContain: "",
    mustNotContain: "",
    minPrice: "",
    maxPrice: "",
    anyWhere: "",
    anySum: "",
    total: "",
    sum: "",
    sortType: sortType,
    exactPlace: "",
  });

  const getPosters = async () => {
    const { data } = await axios.get("store-images");
    setWallpapers(data);
  };

  const handleSearch = () => {
    const newParams = new URLSearchParams();

    // Exact Digit Placement Search
    if (subTab === "Exact Digit Placement" && activeTab === "digits") {
      const exactPlace = exactDigits.map((d) => d || "*").join("");
      const hasAtLeastOneDigit = exactDigits.some((d) => d !== "");
      if (!hasAtLeastOneDigit) {
        toast.error("Please enter at least one digit");
        return;
      }
      // Add URL params
      newParams.set("exactPlace", exactPlace);
      newParams.set("subTab", "Exact Digit Placement");
      // Only keep sortType + exactPlace
      setFilters(
        getDefaultFilters(filters.sortType, {
          exactPlace,
        })
      );
      if (filters.sortType) newParams.set("sortType", filters.sortType);
    }
    // Normal search
    else {
      const updatedFilters = {
        ...filters,
        exactPlace: "",
      };
      setFilters(updatedFilters);
      if (searchInput) newParams.set("searchInput", searchInput);
      // If a category is selected and the user entered a value, call category endpoint directly
      if (updatedFilters.category && searchInput) {
        // call category endpoint: /vip-numbers/category?category=...&number=
        (async () => {
          try {
            setLoading(true);
            const resp = await axios.get(
              `vip-numbers/category?category=${encodeURIComponent(updatedFilters.category)}&number=${encodeURIComponent(searchInput)}`
            );
            const resultData = resp?.data?.data || resp?.data || [];
            setFilteredNumbers(Array.isArray(resultData) ? resultData : []);
            // set URL params so other components know the category search is active
            newParams.set("category", (updatedFilters.category || "").replace(/\s+/g, "-"));
            setSearchParams(newParams);
            setPage(1);
            setLoading(false);
          } catch (error) {
            setLoading(false);
            toast.error("Search failed. Please try again.");
            // eslint-disable-next-line no-console
            console.error("Category search error:", error);
          }
        })();
        return;
      }
      Object.keys(updatedFilters).forEach((key) => {
        if (updatedFilters[key] && key !== "exactPlace") {
          newParams.set(key, updatedFilters[key]);
        }
      });
    }

    // 🔥 CHECK: prevent duplicate search
    const currentQuery = searchParams.toString();
    const newQuery = newParams.toString();

    if (currentQuery === newQuery) {
      toast.error("Kindly change your search method");
      return;
    }

    // If new search → proceed
    setLoading(true);
    // keep `search` as the actual string for safety
    setSearch(searchInput || "");
    setSearchParams(newParams);
    setPage(1);
  };

  const handleTriggerSearch = () => {
    const updatedParams = new URLSearchParams(searchParams);

   if (filters.category) {
      updatedParams.set("category", filters.category.replace(/\s+/g, "-"));
    } else {
      updatedParams.delete("category");
    }

    if (filters.sortType) {
      updatedParams.set("sortType", filters.sortType);
    } else {
      updatedParams.delete("sortType");
    }

    setSearch(searchInput || "");
    setSearchParams(updatedParams);
  };

  const handleExactDigitInput = (index, value) => {
    const newDigits = [...exactDigits];
    newDigits[index] = value;
    setExactDigits(newDigits);

    // Auto-focus next input if value is entered
    if (value && index < 9) {
      const nextInput = document.getElementById(`otc-${index + 3}`);
      if (nextInput) nextInput.focus();
    }
  };

  useEffect(() => {
    getPosters();
  }, []);

  useEffect(() => {
    console.log("filters ::", filters);
    // Only trigger search for category and sortType if NOT in exact placement mode
    if (subTab !== "Exact Digit Placement") {
      handleTriggerSearch();
    }
  }, [filters.category, filters.sortType]);

  useEffect(() => {
    // Load exact placement from URL on mount
    const exactPlace = searchParams.get("exactPlace");
    if (exactPlace && exactPlace.length === 10) {
      setExactDigits(exactPlace.split(""));
      setSubTab("Exact Digit Placement");
    }
  }, []);

  // ADDED: Clear exactPlace when switching away from Exact Digit Placement
  useEffect(() => {
    if (subTab !== "Exact Digit Placement") {
      // Clear exact digits
      setExactDigits(Array(10).fill(""));

      // Remove exact params from URL
      if (filters.exactPlace) {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete("exactPlace");
        newParams.delete("subTab");
        setSearchParams(newParams);
      }

      // Reset ALL filters when switching subTab
      setFilters(getDefaultFilters(filters.sortType));
    }
  }, [subTab]);

  const handleSearchByTab = (tabName) => {
    setActiveTab(tabName);
    // Reset filters when switching tabs
    setFilters(getDefaultFilters(filters.sortType));
    // Also clear exact input
    setExactDigits(Array(10).fill(""));
  };

  return (
    <div
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          setLoading(true);
          setPage(1);
          handleSearch();
        }
      }}
      className="p-4 md:px-8 bg-transparent rounded-lg text-black w-full lg:max-w-5xl mx-auto"
    >
      {/* <Swiper
        modules={[Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        className="mb-6 rounded-lg overflow-hidden"
      >
        {wallpapers.map((wallpaper, index) => (
          <SwiperSlide key={index}>
            <img
              src={wallpaper?.image}
              alt={`Wallpaper ${index + 1}`}
              className="w-full h-full object-stretch rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper> */}

      {!seprate && filters.category === "" && (
        <div className="flex justify-center space-x-4 mb-4">
  <button
    className={`${activeTab === 'digits'
        ? 'bg-[#F5C037] text-black border-none'
        : 'border-white bg-transparent text-white'
      } whitespace-nowrap text-[10px] sm:text-sm md:text-lg px-4 md:px-5 py-2 rounded-full border-[0.6px] border-white hover:border-white flex items-center gap-2`}
    onClick={() => handleSearchByTab("digits")}
  >
    <FaRegHandPointer /> Search by Digits
  </button>

  <button
    className={`${activeTab === 'price'
        ? 'bg-[#F5C037] text-black border-none'
        : 'border-white bg-transparent text-white'
      } whitespace-nowrap text-[10px] sm:text-sm md:text-lg px-4 md:px-5 py-2 rounded-full border-[0.6px] border-white hover:border-white flex items-center gap-2`}
    onClick={() => handleSearchByTab("price")}
  >
    <MdOutlineCurrencyRupee /> Search by Price
  </button>
</div>

      )}

      {activeTab === "digits" ? (
        <div>
          

          {/* {filters.category === "" && subTab === "premium" && (
            <div className="my-4 text-xs md:text-sm text-white">
              {["startWith", "contains", "endsWith"].map((key) => (
                <label key={key} className="mr-4">
                  <input
                    type="radio"
                    name="filterOption"
                    className="mr-2 w-4 h-4 accent-[#F5C037]"
                    checked={filters[key] === "true" || filters[key] === true}
                    onChange={() =>
                      setFilters((prev) => {
                        const updated = { ...prev };
                        ["startWith", "contains", "endsWith"].forEach((k) => {
                          updated[k] = k === key ? true : false;
                        });
                        return updated;
                      })
                    }
                  />
                    <button
                                    type="submit"
                                    className="absolute top-[3px] right-[5px] bg-[#F5C037] text-black px-3 sm:px-8 py-0.5 sm:py-2 rounded-full  border-white hover:bg-[#] focus-visible:border-0 hover:text-white  flex items-center gap-2 text-xs sm:text-lg"
                                >
                                    <MdOutlineSavedSearch size={25} /> <span>Search</span>
                                </button>
                  {key === "contains"
                    ? "Anywhere"
                    : key === "startWith"
                    ? "Starts With"
                    : key === "endsWith"
                    ? "Ends With"
                    : key}
                </label>
              ))}
            </div>
            
          )} */}
{/* MOBILE UI – shown only below 640px */}
{filters.category === "" && (
<div className="block sm:hidden mb-4">

  {/* 🔶 Row 1 : Start / Anywhere / Ends */}
  <div className="flex justify-center gap-3 mb-4 text-white text-xs">
    {["startWith", "contains", "endsWith"].map((key) => (
      <label key={key} className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full">
        <input
          type="radio"
          name="filterOption"
          className="w-4 h-4 accent-[#F5C037]"
          checked={filters[key] === true}
          onChange={() =>
            setFilters((prev) => {
              const updated = { ...prev };
              ["startWith", "contains", "endsWith"].forEach((k) => {
                updated[k] = k === key;
              });
              return updated;
            })
          }
        />
        <span>
          {key === "contains"
            ? "Anywhere"
            : key === "startWith"
            ? "Starts With"
            : "Ends With"}
        </span>
      </label>
    ))}
  </div>

  {/* 🔶 Row 2: Premium / Advanced / Exact */}
  <div className="flex justify-center gap-5 text-white text-xs font-semibold mb-4">
    
    <button onClick={() => setSubTab("premium")} className="relative pb-1">
      Premium
      {subTab === "premium" && (
        <span className="absolute -bottom-1 left-0 right-0 mx-auto w-full h-[2px] bg-[#F5C037]"></span>
      )}
    </button>

    <button onClick={() => setSubTab("advanced")} className="relative pb-1">
      Advanced
      {subTab === "advanced" && (
        <span className="absolute -bottom-1 left-0 right-0 mx-auto w-full h-[2px] bg-[#F5C037]"></span>
      )}
    </button>

    <button onClick={() => setSubTab("Exact Digit Placement")} className="relative pb-1">
      Exact
      {subTab === "Exact Digit Placement" && (
        <span className="absolute -bottom-1 left-0 right-0 mx-auto w-full h-[2px] bg-[#F5C037]"></span>
      )}
    </button>
  </div>

</div>
)}

{/* DESKTOP UI – original (kept exactly as your UI) */}
{filters.category === "" && (
<div className="hidden sm:flex w-full items-center px-2 mb-4 justify-between">

  {/* LEFT – Start/Any/End */}
  <div className="flex items-center gap-4 text-white text-sm">
    {["startWith", "contains", "endsWith"].map((key) => (
      <label key={key} className="flex items-center gap-1">
        <input
          type="radio"
          name="filterOption"
          className="w-4 h-4 accent-[#F5C037]"
          checked={filters[key] === true}
          onChange={() =>
            setFilters((prev) => {
              const updated = { ...prev };
              ["startWith", "contains", "endsWith"].forEach((k) => {
                updated[k] = k === key;
              });
              return updated;
            })
          }
        />
        <span>
          {key === "contains"
            ? "Anywhere"
            : key === "startWith"
            ? "Starts With"
            : "Ends With"}
        </span>
      </label>
    ))}
  </div>

  {/* RIGHT – Premium/Advanced/Exact */}
  <div className="flex items-center gap-6 text-white text-sm">
    
    <button onClick={() => setSubTab("premium")} className="relative pb-1">
      Premium Search
      {subTab === "premium" && (
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-full h-[2px] bg-[#F5C037]"></span>
      )}
    </button>

    <button onClick={() => setSubTab("advanced")} className="relative pb-1">
      Advanced Search
      {subTab === "advanced" && (
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-full h-[2px] bg-[#F5C037]"></span>
      )}
    </button>

    <button onClick={() => setSubTab("Exact Digit Placement")} className="relative pb-1">
      Exact Digit Placement
      {subTab === "Exact Digit Placement" && (
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-full h-[2px] bg-[#F5C037]"></span>
      )}
    </button>

  </div>

</div>

)}

        {filters.category === "" && subTab === "premium" && (
          
  <div className="w-full relative">
    <input
      inputMode="numeric"
      placeholder="Enter digits"
      className="w-full py-2 sm:py-3 px-4 sm:px-8 pr-[100px] rounded-full border-none bg-white text-black focus:outline-none"
      value={filters.searchInput}
      onChange={(e) => {
        const value = e.target.value;
        const valueWithoutSpaces = value.replace(/\s/g, "");
        if (value < 0) return;
        if (valueWithoutSpaces.length > 10) return;
        if (/^\d{0,10}$/.test(valueWithoutSpaces)) {
          setFilters({ ...filters, searchInput: valueWithoutSpaces });
        }
      }}
    />
 

    {/* 🔥 Search Button inside Input */}
    <button
      onClick={(e) => {
        e.preventDefault();
        setPage(1);
        handleSearch();
      }}
      className="absolute top-1/2 right-[6px] -translate-y-1/2 bg-[#F5C037] text-black px-4 sm:px-6 py-1 sm:py-2 rounded-full flex items-center gap-1 text-xs sm:text-sm font-semibold hover:bg-[#e0ad2f]"
    >
      <MdOutlineSavedSearch size={18} />
      <span className="hidden sm:inline">Search</span>
    </button>
  </div>
)}


          {/* {filters.category === "" && subTab === "premium" && (
            <div className="my-4 text-xs md:text-sm text-white">
              {["startWith", "contains", "endsWith"].map((key) => (
                <label key={key} className="mr-4">
                  <input
                    type="radio"
                    name="filterOption"
                    className="mr-2 border-white text-xs md:text-sm w-4"
                    checked={filters[key] === "true" || filters[key] === true}
                    onChange={() =>
                      setFilters((prev) => {
                        const updated = { ...prev };
                        ["startWith", "contains", "endsWith"].forEach((k) => {
                          updated[k] = k === key ? true : false;
                        });
                        return updated;
                      })
                    }
                  />
                    <button
                                    type="submit"
                                    className="absolute top-[3px] right-[5px] bg-[#F5C037] text-black px-3 sm:px-8 py-0.5 sm:py-2 rounded-full  border-white hover:bg-[#] focus-visible:border-0 hover:text-white  flex items-center gap-2 text-xs sm:text-lg"
                                >
                                    <MdOutlineSavedSearch size={25} /> <span>Search</span>
                                </button>
                  {key === "contains"
                    ? "Anywhere"
                    : key === "startWith"
                    ? "Starts With"
                    : key === "endsWith"
                    ? "Ends With"
                    : key}
                </label>
              ))}
            </div>
          )} */}

          {filters.category === "" && subTab === "advanced" && (
            <div className="mt-6 grid text-xs md:text-sm grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              <input
                inputMode="numeric"
                placeholder="Start With"
                value={filters.startWithDigits}
                onWheel={(e) => e.target.blur()}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value < 0) return;
                  if (/^\d{0,10}$/.test(value)) {
                    setFilters({ ...filters, startWithDigits: value });
                  }
                }}
                className="w-full py-3 px-4 rounded-full border-[0.5px] border-white bg-[#ffffff] text-gray-900 focus:outline-none"
              />

              <input
                inputMode="numeric"
                placeholder="AnyWhere"
                value={filters.anyWhere}
                onWheel={(e) => e.target.blur()}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value < 0) return;
                  if (/^\d{0,10}$/.test(value)) {
                    setFilters({ ...filters, anyWhere: value });
                  }
                }}
                className="w-full py-3 px-4 rounded-full border-[0.5px] border-white bg-[#ffffff] text-gray-900  focus:outline-none"
              />

              <input
                inputMode="numeric"
                placeholder="End With"
                value={filters.endsWithDigits}
                onWheel={(e) => e.target.blur()}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value < 0) return;
                  if (/^\d{0,10}$/.test(value)) {
                    setFilters({ ...filters, endsWithDigits: value });
                  }
                }}
                className="w-full py-3 px-4 rounded-full border-[0.5px] border-white bg-[#ffffff] text-gray-900  focus:outline-none"
              />

              <input
                inputMode="numeric"
                placeholder="Must Contain"
                value={filters.mustContain}
                onWheel={(e) => e.target.blur()}
                onChange={(e) => {
                  let raw = e.target.value.replace(/,/g, "");
                  if (!/^\d*$/.test(raw)) return;
                  if (raw.length > 14) return;
                  const withCommas = raw.split("").join(",");
                  setFilters({ ...filters, mustContain: withCommas });
                }}
                className="w-full py-3 px-4 rounded-full border-[0.5px] border-white bg-[#ffffff] text-gray-900  focus:outline-none"
              />

              <input
                inputMode="numeric"
                placeholder="Not Contain"
                value={filters.mustNotContain}
                onWheel={(e) => e.target.blur()}
                onChange={(e) => {
                  let raw = e.target.value.replace(/,/g, "");
                  if (!/^\d*$/.test(raw)) return;
                  if (raw.length > 14) return;
                  const withCommas = raw.split("").join(",");
                  setFilters({ ...filters, mustNotContain: withCommas });
                }}
                className="w-full py-3 px-4 rounded-full border-[0.5px] border-white bg-[#ffffff] text-gray-900  focus:outline-none"
              />

              <input
                inputMode="numeric"
                placeholder="Total (Eg. 52)"
                value={filters.total}
                onWheel={(e) => e.target.blur()}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value < 0) return;
                  if (/^\d{0,2}$/.test(value)) {
                    setFilters({ ...filters, total: value });
                  }
                }}
                className="py-3 px-4 rounded-full border-[0.5px] border-white bg-[#ffffff] text-gray-900  focus:outline-none"
              />

              <input
                inputMode="numeric"
                placeholder="Sum (Single Eg. 7)"
                value={filters.sum}
                onWheel={(e) => e.target.blur()}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value?.length > 1) return;
                  if (/^\d{0,2}$/.test(value)) {
                    setFilters({ ...filters, sum: value });
                  }
                }}
                className="w-full py-3 px-4 rounded-full border-[0.5px] border-white bg-[#ffffff] text-gray-900  focus:outline-none"
              />
              <div className="col-span-full flex justify-center mt-4">
   <button
    onClick={() => {
      setPage(1);
      handleSearch();
    }}
    className="bg-[#F5C037] text-black px-8 py-3 rounded-full font-semibold hover:bg-[#e0ad2f] flex items-center gap-2"
  >
    <MdOutlineSavedSearch size={20} /> Search
  </button>
</div>

            </div>
          )}

          {/* Exact Digit Placement */}
          {filters.category === "" && subTab === "Exact Digit Placement" && (
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 md:gap-3 px-4">
                <div className="flex flex-wrap justify-center gap-1.5 md:gap-2">
                  {Array.from({ length: 10 }).map((_, index) => (
                    <input
                      key={index}
                      pattern="[0-9]*"
                      min="0"
                      max="9"
                      maxLength="1"
                      inputMode="numeric"
                      id={`otc-${index + 2}`}
                      type="text"
                      value={exactDigits[index]}
                      onChange={(e) =>
                        handleExactDigitInput(index, e.target.value)
                      }
                      placeholder="*"
                      className="w-10 h-10 md:w-12 md:h-12 text-center text-lg md:text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 bg-white placeholder-gray-400"
                      onInput={(e) => {
                        e.target.value = e.target.value
                          .replace(/[^0-9]/g, "")
                          .slice(0, 1);

                        if (e.target.value && index < 9) {
                          const nextInput = document.getElementById(
                            `otc-${index + 3}`
                          );
                          if (nextInput) nextInput.focus();
                        }
                      }}
                      onKeyDown={(e) => {
                        if (
                          e.key === "Backspace" &&
                          !e.target.value &&
                          index > 0
                        ) {
                          const prevInput = document.getElementById(
                            `otc-${index + 1}`
                          );
                          if (prevInput) prevInput.focus();
                        }
                      }}
                    />
                  ))}
                  
                </div>
              </div>
              <div className="text-center text-xs md:text-sm text-gray-300">
                <p>
                  Enter digits in specific positions. Leave empty (*) for any
                  digit.
                </p>
                <p className="mt-1">
                  Example: 99****11** will find numbers like 99924 81123
                </p>
              </div>
              <div className="flex justify-center mt-4">
  <button
    onClick={() => {
      setPage(1);
      handleSearch();
    }}
    className="bg-[#F5C037] text-black px-8 py-2 rounded-full font-semibold hover:bg-[#e0ad2f] flex items-center gap-2"
  >
    <MdOutlineSavedSearch size={20} /> Search
  </button>
</div>

            </div>
            
          )}
          
        </div>
      ) : (
        filters.category === "" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              inputMode="numeric"
              placeholder="Min Price"
              className="w-full py-2 px-4 rounded-full border-[0.5px] border-white bg-[#ffffff] text-gray-900 focus:outline-none"
              value={filters.minPrice}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,6}$/.test(value)) {
                  setFilters({ ...filters, minPrice: value });
                }
              }}
            />
            <input
              inputMode="numeric"
              placeholder="Max Price"
              className="w-full py-2 px-4 rounded-full border-[0.5px] border-white bg-[#ffffff] text-gray-900  focus:outline-none"
              value={filters.maxPrice}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,8}$/.test(value)) {
                  setFilters({ ...filters, maxPrice: value });
                }
              }}
            />
            <div className="col-span-full flex justify-center mt-4">
  <button
    onClick={() => {
      setPage(1);
      handleSearch();
    }}
    className="bg-[#F5C037] text-black px-8 py-2 rounded-full font-semibold hover:bg-[#e0ad2f] flex items-center gap-2"
  >
    <MdOutlineSavedSearch size={20} /> Search
  </button>
</div>

          </div>
        )
      )}

      <div className="flex justify-center flex-wrap gap-2 md:gap-4 mt-4">
  <div className="flex justify-between w-full">
    <select
      value={filters.category}
      aria-label="Choose category"
      onChange={(e) => {
        setFilters({ category: e.target.value });
      }}
      className="bg-[#17565D] w-1/2 md:hidden text-white text-xs px-2 py-2 rounded-lg border-[0.6px] border-white hover:bg-[#F5C037] hover:text-[#17565D] focus:outline-none cursor-pointer"
    >
      <option value="">All Categories</option>
      {categories?.map((category, idx) => {
        return (
          <option
            key={idx}
            className="bg-white text-black"
            value={category.name}
          >
            {category.name}
          </option>
        );
      })}
    </select>

    <input
      inputMode="numeric"
      placeholder="Sum Total"
      value={filters.anySum}
      onWheel={(e) => e.target.blur()}
      onChange={(e) => {
        const value = e.target.value;
        if (/^\d{0,2}$/.test(value)) {
          setFilters({ ...filters, anySum: value });
        }
      }}
      className="py-2 px-4 w-[48%] md:hidden text-xs rounded-lg border-[0.5px] border-white bg-[#17565D] text-white focus:outline-none"
    />
  </div>

  {filters.category === "" && (
    <div className="flex flex-col md:flex-row justify-center items-center pt-2 sm:pt-0 gap-4 w-full">

      {/* ⭐ SEARCH BUTTON ON TOP FOR MOBILE */}
     
<button
  onClick={(e) => {
    e.preventDefault();
    setPage(1);
    handleSearch();
  }}
  className="flex items-center justify-center gap-2 md:hidden bg-[#F5C037] text-black px-4 py-1 rounded-full border-[0.6px] border-white hover:bg-[#e0ad2f] hover:text-black transition"
>
  <FaSearchPlus className="text-sm" />
  <span>Search</span>
</button>


      {/* ⭐ WHATSAPP & HELP SECTION BELOW ON MOBILE */}
      <div className="flex justify-center items-center gap-2">
<<<<<<< HEAD
        <span className="text-white text-[13px] sm:text-[18px] md:text-[20px] font-semibold">
=======
        <span className="text-white text-[10px] sm:text-[16px] md:text-[20px] font-semibold">
>>>>>>> 0a10a1f09ce7e325098d8bf3d94b7b724ea90e40
          Need Help?
        </span>

        <a
          href="https://wa.me/+919511195111"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white p-1 rounded-full shadow-lg hover:bg-green-600 transition"
        >
          <FaWhatsapp className="text-xl md:text-2xl" />
        </a>

        <span className="font-semibold min-h-[30px]">
          <AnimatedNumberLink />
        </span>
      </div>
    </div>
  )}
</div>


      {/* <div className="flex text-nowrap justify-center items-center gap-2 text-gray-700 mt-4 font-medium">
        <div className="flex items-center cursor-pointer text-sm md:text-lg text-white">
          <div className="flex gap-1">
            <span
              type="button"
              className="menu-link text-white menu-link_us-s flex justify-center gap-1 items-center fw-medium hover:underline"
            >
              Sort By <FaFilter />
            </span>
            <span className="breadcrumb-separator menu-link fw-medium ps-1 pe-1">
              |
            </span>

            <span
              className={`${
                filters.sortType === "lowToHigh"
                  ? "text-orange-500"
                  : "text-white"
              } hover:text-black hover:underline`}
              onClick={() => setFilters({ ...filters, sortType: "lowToHigh" })}
            >
              Price Low to High
              <input type="hidden" id="orderby_price" value="" />
            </span>
            <span className="breadcrumb-separator menu-link fw-medium ps-1 pe-1">
              |
            </span>

            <span
              className={`${
                filters.sortType === "highToLow"
                  ? "text-orange-500"
                  : "text-white"
              } hover:text-black hover:underline`}
              onClick={() => setFilters({ ...filters, sortType: "highToLow" })}
            >
              Price High to Low
            </span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default SearchComponent;
