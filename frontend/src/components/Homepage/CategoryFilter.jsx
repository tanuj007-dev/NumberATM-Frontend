// import { FaSearch } from 'react-icons/fa';

// const categories = [
//   { name: '', count: 10528 },
//   { name: 'Numerology Without 2 4 8', count: 10528 },
//   { name: 'PENTA NUMBERS', count: 372 },
//   { name: 'HEXA NUMBER', count: 414 },
//   { name: 'SEPTA (9XY AAA AAA A)', count: 89 },
//   { name: 'OCTA NUMBERS', count: 8 },
//   { name: 'ENDING AAAA NUMBERS', count: 684 },
//   { name: 'AB AB (XXXXXX 1212)', count: 2177 },
//   { name: 'ABC ABC NUMBERS', count: 3836 },
//   { name: 'MIRROR NUMBERS', count: 214 },
//   { name: 'SEMI MIRROR NUMBERS', count: 1373 },
//   { name: '123456 NUMBERS', count: 1058 },
//   { name: '786 NUMBERS', count: 434 },
//   { name: '11 12 13 NUMBERS', count: 552 },
//   { name: 'UNIQUE NUMBERS', count: 7103 },
//   { name: 'AAA BBB', count: 947 },
//   { name: 'XY XY XY NUMBERS', count: 1364 },
//   { name: 'DOUBLING NUMBERS', count: 485 },
//   { name: 'ENDING AAA NUMBERS', count: 3458 },
//   { name: 'AB XYXYXYXY', count: 80 },
//   { name: 'ABCD ABCD NUMBERS', count: 1245 },
//   { name: 'AAAA BBBB NUMBERS', count: 43 },
//   { name: '3 DIGITS NUMBER', count: 83 },
//   { name: 'AB AB XY XY', count: 2641 },
//   { name: 'AAA XY AAA', count: 286 },
//   { name: 'AOOB COOD / ABOO CDOO / OOOAB', count: 1616 },
//   { name: 'AAAA middle', count: 2699 },
//   { name: 'AO BO CO DO EO', count: 473 },
//   { name: 'AAA Middle', count: 2049 },
//   { name: 'Start & Middle PENTA', count: 385 },
//   { name: 'AOO BOO / AOO BOO COO', count: 598 },
//   { name: 'START A OOO B END A OOO B', count: 309 },
//   { name: 'AAAA XY AAAA', count: 0 },
// ];

// export default function CategoryFilter({ filters, setFilters, setPage, setLoading, getNumbers, setSearch, searchParams, setSearchParams }) {
//   // const [selectedCategory, setSelectedCategory] = useState(null);

//   const toggleCategory = (name) => {
//     setPage(1);
//     if (name === "All") {
//       setFilters({ ...filters, category: '' });
//     }
//     else setFilters({ category: name });
//   };
//   const handleSearch = () => {
//     const newParams = new URLSearchParams();
//     setSearch(true);
//     setSearchParams(newParams);
//     getNumbers();
//   };
//   return (
//     <div className="min-h-screen max-w-56 hidden md:block sticky left-0 top-0 bg-[#274A7B] text-white p-2.5 shadow-md">
//       <div className='pb-5 text-left'>
//         <div className="w-full">
//           <label className="text-center block mb-1 text-white">Sum Total</label>
//           <div className="flex items-center bg-transparent rounded-lg border-[0.5px] border-white bg-[#274A7B]">
//             <input
//               inputMode="numeric"
//               placeholder="Sum"
//               value={filters.anySum}
//               onWheel={(e) => e.target.blur()}
//               onChange={(e) => {
//                 const value = e.target.value;
//                 if (/^\d{0,2}$/.test(value)) {
//                   setFilters({ ...filters, anySum: value });
//                 }
//               }}
//               className="w-full py-2 px-4 rounded-l-lg bg-transparent text-white focus:outline-none"
//             />
//             <button
//               onClick={() => {
//                 setLoading(true);
//                 setPage(1);
//                 handleSearch();
//               }}
//               className="p-3 text-white hover:border-0 hover:ring-0 hover:text-gray-300"
//               style={{ backgroundColor: "transparent" }}
//             >
//               <FaSearch className='text-lg' />
//             </button>
//           </div>
//         </div>
//         <h2 className="text-lg font-semibold my-3 pl-2">CATEGORY</h2>
//         <div className="max-h-screen overflow-y-auto scrollbar-hide px-2 space-y-3">

//           {categories.map((cat, index) => (
//             <label key={index} className="flex justify-between items-center text-sm cursor-pointer">
//               <div className="flex items-center gap-2.5">
//                 <input
//                   type="checkbox"
//                   checked={filters.category === cat.name}
//                   onChange={() => toggleCategory(cat.name)}
//                   className="accent-orange-500 text-white bg-white w-4 h-4"
//                 />
//                 <span className="text-[0.7rem] text-nowrap text-white">{cat.name === '' ? 'All' : cat.name}</span>
//               </div>
//             </label>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
import { FaSearch } from 'react-icons/fa';
import { useEffect, useState } from 'react';
const categories = [
  { name: '', count: 10528 },
  { name: 'Numerology Without 2 4 8', count: 10528 },
  { name: 'PENTA NUMBERS', count: 372 },
  { name: 'HEXA NUMBER', count: 414 },
  { name: 'SEPTA (9XY AAA AAA A)', count: 89 },
  { name: 'OCTA NUMBERS', count: 8 },
  { name: 'ENDING AAAA NUMBERS', count: 684 },
  { name: 'AB AB (XXXXXX 1212)', count: 2177 },
  { name: 'ABC ABC NUMBERS', count: 3836 },
  { name: 'MIRROR NUMBERS', count: 214 },
  { name: 'SEMI MIRROR NUMBERS', count: 1373 },
  { name: '123456 NUMBERS', count: 1058 },
  { name: '786 NUMBERS', count: 434 },
  { name: '11 12 13 NUMBERS', count: 552 },
  { name: 'UNIQUE NUMBERS', count: 7103 },
  { name: 'AAA BBB', count: 947 },
  { name: 'XY XY XY NUMBERS', count: 1364 },
  { name: 'DOUBLING NUMBERS', count: 485 },
  { name: 'ENDING AAA NUMBERS', count: 3458 },
  { name: 'AB XYXYXYXY', count: 80 },
  { name: 'ABCD ABCD NUMBERS', count: 1245 },
  { name: 'AAAA BBBB NUMBERS', count: 43 },
  { name: '3 DIGITS NUMBER', count: 83 },
  { name: 'AB AB XY XY', count: 2641 },
  { name: 'AAA XY AAA', count: 286 },
  { name: 'AOOB COOD / ABOO CDOO / OOOAB', count: 1616 },
  { name: 'AAAA middle', count: 2699 },
  { name: 'AO BO CO DO EO', count: 473 },
  { name: 'AAA Middle', count: 2049 },
  { name: 'Start & Middle PENTA', count: 385 },
  { name: 'AOO BOO / AOO BOO COO', count: 598 },
  { name: 'START A OOO B END A OOO B', count: 309 },
  { name: 'AAAA XY AAAA', count: 0 },
];

export default function CategoryFilter({
  filters,
  setFilters,
  setPage,
  setLoading,
  getNumbers,
  setSearch,
  searchParams,
  setSearchParams
}) {
const [allCategory, setAllCategory] = useState(false);
 const toggleCategory = (name) => {
    setPage(1);
  if (name === "") {
      setFilters({ ...filters, category: '' });
      setAllCategory(true);
    }
    else  {
      setFilters({ ...filters, category: name });
      setAllCategory(false);
    }
  };
   
  useEffect(() => {
    if (allCategory && filters.category === "") {
      getNumbers();
    }
  }, [allCategory, filters.category]);
 
  const handleSearch = () => {
    const newParams = new URLSearchParams();
    setSearch(true);
    setSearchParams(newParams);
    getNumbers();
  };

  return (
    <div className="h-full overflow-y-auto scrollbar-hide w-1/4 hidden md:flex bg-[#F3FBFA] border-[#17565D] border-[1px] p-4 rounded-xl shadow-md">

      <div className='pb-5 text-left'>
        <h2 className="text-base font-semibold my-3 pl-2">CATEGORY</h2>

        <div className="max-h-screen overflow-y-auto scrollbar-hide px-2 space-y-2">
          {categories.map((cat, index) => (
            <label key={index} className="flex justify-between items-center text-base cursor-pointer">
              <div className="flex items-center gap-2.5">
                <input
                  type="radio"
                  checked={filters.category === cat.name}
                  onChange={() => toggleCategory(cat.name)}
                  className="accent-[#17565D] w-4 h-4"
                />
                <span className="text-[0.7rem] text-nowrap">
                  {cat.name === '' ? 'All' : cat.name}
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>

    </div>
  );
}

     {/* <div className="w-full">
          <label className="text-center block mb-1 text-white">Sum Total</label>
          <div className="flex items-center bg-transparent rounded-lg border-[0.5px] border-white bg-[#274A7B]">
            <input
              inputMode="numeric"
              placeholder="Sum"
              value={filters.anySum}
              onWheel={(e) => e.target.blur()}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,2}$/.test(value)) {
                  setFilters({ ...filters, anySum: value });
                }
              }}
              className="w-full py-2 px-4 rounded-l-lg bg-transparent text-white focus:outline-none"
            />
            <button
              onClick={() => {
                setLoading(true);
                setPage(1);
                handleSearch();
              }}
              className="p-3 text-white hover:border-0 hover:ring-0 hover:text-gray-300"
              style={{ backgroundColor: "transparent" }}
            >
              <FaSearch className='text-lg' />
            </button>
          </div>
        </div> */}