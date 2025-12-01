// import React, { useState, useEffect, useContext } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../../redux/cart/cartSlice";
// import { useNavigate } from "react-router-dom";
// import UserAxiosAPI from "../../api/userAxiosAPI";
// import toast from "react-hot-toast";
// import { fbqTrack } from "../utils/fbq";
// import FamilyPackCard from "../FamilyPackCard";
// import { safeDecrypt } from '../../utils/encryption';
// import { Appstate } from "../../App";

// const FamilyPackNumber = () => {
//   const [familyPackData, setFamilyPackData] = useState([]);
//   const [selections, setSelections] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedPackSize, setSelectedPackSize] = useState(3);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const user = useSelector((state) => state.user.user);
//   const cart = useSelector((state) => state.cart?.items);
//   const axios = UserAxiosAPI();
//   const { margins } = useContext(Appstate);

//   // Decrypt a single pack's numbers
//   const decryptPackNumbers = async (pack) => {
//     try {
//       const decryptedNumbers = await Promise.all(
//         pack.numbers.map(async (num) => {
//           try {
//             // Decrypt all encrypted fields
//             const price = await safeDecrypt(num.price);
//             const view = await safeDecrypt(num.view);
//             const stock = await safeDecrypt(num.stock);
//             const sum = await safeDecrypt(num.sum);
//             const total = await safeDecrypt(num.total);
//             const sum2 = await safeDecrypt(num.sum2);

//             // Decrypt owner fields
//             const ownerDiscount = num?.owner?.discount
//               ? await safeDecrypt(num.owner.discount)
//               : 0;
//             const ownerShowCased = num?.owner?.showCased
//               ? await safeDecrypt(num.owner.showCased)
//               : null;
//             const ownerName = num?.owner?.name
//               ? await safeDecrypt(num.owner.name)
//               : '';

//             return {
//               ...num,
//               price: parseFloat(price),
//               view,
//               stock: parseInt(stock),
//               sum: parseInt(sum),
//               total: parseInt(total),
//               sum2: parseInt(sum2),
//               owner: {
//                 ...num.owner,
//                 discount: parseFloat(ownerDiscount),
//                 showCased: ownerShowCased,
//                 name: ownerName
//               }
//             };
//           } catch (error) {
//             console.error('Error decrypting number:', error);
//             return num; // Return original if decryption fails
//           }
//         })
//       );

//       return {
//         ...pack,
//         numbers: decryptedNumbers
//       };
//     } catch (error) {
//       console.error('Error decrypting pack:', error);
//       return pack;
//     }
//   };

//   // Fetch family pack data
//   const fetchFamilyPackData = async () => {
//     try {
//       setLoading(true);

//       const api = UserAxiosAPI();
//       const response = await api.get("/vip-numbers/family-pack", {
//         params: {
//           familyPack: selectedPackSize,
//           page: 1,
//           limit: 10,
//           sortbyprice: "low-high",
//         },
//       });

//       if (response.data.success && response.data.data) {
//         const packs = response.data.data;

//         // Decrypt the total field if needed
//         if (response.data.total) {
//           try {
//             await safeDecrypt(response.data.total);
//           } catch (error) {
//             console.error('Error decrypting total:', error);
//           }
//         }

//         // Decrypt all packs
//         const decryptedPacks = await Promise.all(
//           packs.map(pack => decryptPackNumbers(pack))
//         );

//         setFamilyPackData(decryptedPacks);

//         const initialSelections = decryptedPacks.reduce((acc, pack, index) => {
//           acc[`pack${index}`] = pack.numbers.map((num) => num._id);
//           return acc;
//         }, {});
//         setSelections(initialSelections);
//       }

//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching family pack data:", error);
//       setError("Failed to load family pack data");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     setFamilyPackData([]);
//     setSelections({});
//     fetchFamilyPackData();
//   }, [selectedPackSize]);

//   const handleSelectionChange = (packId, selectedItems) => {
//     setSelections((prev) => ({
//       ...prev,
//       [packId]: selectedItems,
//     }));
//   };

//   const handlePackSizeChange = (e) => {
//     setSelectedPackSize(Number(e.target.value));
//   };

//   const handleLoadMore = () => {
//     navigate("/family-pack");
//   };

//   // Handle adding multiple numbers to cart
//   const handleBuyNow = async (selectedNumbers) => {
//     try {
//       let successCount = 0;
//       let failCount = 0;

//       for (const num of selectedNumbers) {
//         try {
//           // Calculate final price with margins
//           const originalPrice = num.price;
//           const ownerDiscount = num?.owner?.discount || 0;
//           const discountedPrice = originalPrice - originalPrice * ownerDiscount * 0.01;

//           const marginData = margins?.find(
//             (margin) =>
//               originalPrice >= margin.minPrice && originalPrice <= margin.maxPrice
//           );
//           const marginPercent = marginData ? marginData.marginPercent : 0;
//           const marginAmount = (originalPrice * marginPercent) / 100;
//           const finalPrice = discountedPrice + marginAmount;
//           const roundedFinalPrice = Math.round(finalPrice / 10) * 10;

//           // Add calculated price to the number object
//           const numWithPrice = {
//             ...num,
//             roundedFinalPrice
//           };

//           // Add to Redux cart
//           dispatch(addToCart(numWithPrice));

//           // Check if already in cart
//           const isPresent = cart.find((it) => it._id === num._id);

//           // Track with Facebook Pixel
//           fbqTrack("AddToCart");

//           // Track with Google Analytics
//           if (window.gtag) {
//             window.gtag("event", "conversion", {
//               send_to: "AW-16838705843/l-w1CJnEtpcaELOFqd0-",
//               value: roundedFinalPrice,
//               currency: "INR",
//             });
//           }

//           // Add to backend cart if user is logged in and item not already present
//           if (user && !isPresent) {
//             await axios.post("/cart/add", {
//               vipNumberId: num._id,
//             });
//           }

//           successCount++;
//         } catch (error) {
//           console.error(`Failed to add ${num.number}:`, error);
//           failCount++;
//         }
//       }

//       // Show success message
//       if (successCount > 0) {
//         toast.success(`${successCount} number(s) added to cart!`);
//         // Navigate to cart after a short delay
//         setTimeout(() => {
//           navigate("/checkout");
//         }, 1000);
//       }

//       // Show error message if any failed
//       if (failCount > 0) {
//         toast.error(`Failed to add ${failCount} number(s) to cart`);
//       }
//     } catch (error) {
//       toast.error("Failed to add numbers to cart");
//       console.error("Error adding to cart:", error);
//     }
//   };

//   return (
//     <section className="py-8 bg-gray-50">
//       <div className="w-full sm:container mx-auto px-4">
//         {/* Header Bar */}
//         <div className="bg-gradient-to-r from-[#274A7B] to-[#274A7B] rounded-2xl px-6 py-5 mb-6 flex flex-col sm:flex-row items-center justify-between gap-1">
//           <div className="flex items-center gap-2">
//             <h2 className="text-white text-2xl font-bold">
//               Family Pack
//             </h2>
//             <span className="text-2xl">👨‍👩‍👧‍👦</span>
//           </div>
//           <div className="flex items-center gap-3">
//             <span className="text-white font-semibold text-lg">
//               Family pack of
//             </span>
//             <select
//               value={selectedPackSize}
//               onChange={handlePackSizeChange}
//               className="bg-orange-500 text-gray-900 font-bold text-lg px-4 py-2 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               disabled={loading}
//             >
//               <option value={2}>2</option>
//               <option value={3}>3</option>
//               <option value={4}>4</option>
//               <option value={5}>5</option>
//               <option value={6}>6</option>
//               <option value={7}>7</option>
//             </select>
//           </div>
//         </div>

//         {/* Cards Grid with Loading/Error States */}
//         {loading ? (
//           <div className="text-center py-12">
//             <p className="text-gray-600 text-lg">Loading family packs...</p>
//           </div>
//         ) : error ? (
//           <div className="text-center py-12">
//             <p className="text-red-600 text-lg">{error}</p>
//           </div>
//         ) : familyPackData.length === 0 ? (
//           <div className="text-center py-12">
//             <p className="text-gray-600 text-lg">No family packs available</p>
//           </div>
//         ) : (
//           <>
//             <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2">
//               {familyPackData.map((pack, index) => {
//                 const packId = `pack${index}`;
//                 return (
//                   <FamilyPackCard
//                     key={packId}
//                     packData={pack}
//                     selectedItems={selections[packId] || []}
//                     onSelectionChange={(selected) =>
//                       handleSelectionChange(packId, selected)
//                     }
//                     onBuyNow={handleBuyNow}
//                   />
//                 );
//               })}
//             </div>

//             {/* Load More Button */}
//             <div className="mt-6 flex justify-center">
//               <button
//                 onClick={handleLoadMore}
//                 className="bg-[#274A7B] text-white px-6 py-2 rounded-lg hover:bg-white hover:text-[#274A7B] border-2 border-[#274A7B] transition-colors"
//               >
//                 More...
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </section>
//   );
// };

// export default FamilyPackNumber;

// import React, { useState, useEffect, useContext } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../../redux/cart/cartSlice";
// import { useNavigate } from "react-router-dom";
// import UserAxiosAPI from "../../api/userAxiosAPI";
// import toast from "react-hot-toast";
// import { fbqTrack } from "../utils/fbq";
// import FamilyPackCard from "../FamilyPackCard";
// import { safeDecrypt } from "../../utils/encryption";
// import { Appstate } from "../../App";

// const FamilyPack = () => {
//   const [familyPackData, setFamilyPackData] = useState([]);
//   const [selections, setSelections] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedPackSize, setSelectedPackSize] = useState(3);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [hasMoreData, setHasMoreData] = useState(true);
//   const [totalPages, setTotalPages] = useState(0);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const user = useSelector((state) => state.user.user);
//   const cart = useSelector((state) => state.cart?.items);
//   const axios = UserAxiosAPI();
//   const { margins } = useContext(Appstate);

//   // Decrypt a single pack's numbers
//   const decryptPackNumbers = async (pack) => {
//     try {
//       const decryptedNumbers = await Promise.all(
//         pack.numbers.map(async (num) => {
//           try {
//             // Decrypt all encrypted fields
//             const price = await safeDecrypt(num.price);
//             const view = await safeDecrypt(num.view);
//             const stock = await safeDecrypt(num.stock);
//             const sum = await safeDecrypt(num.sum);
//             const total = await safeDecrypt(num.total);
//             const sum2 = await safeDecrypt(num.sum2);

//             // Decrypt owner fields
//             const ownerDiscount = num?.owner?.discount
//               ? await safeDecrypt(num.owner.discount)
//               : 0;
//             const ownerShowCased = num?.owner?.showCased
//               ? await safeDecrypt(num.owner.showCased)
//               : null;
//             const ownerName = num?.owner?.name
//               ? await safeDecrypt(num.owner.name)
//               : "";

//             return {
//               ...num,
//               price: parseFloat(price),
//               view,
//               stock: parseInt(stock),
//               sum: parseInt(sum),
//               total: parseInt(total),
//               sum2: parseInt(sum2),
//               owner: {
//                 ...num.owner,
//                 discount: parseFloat(ownerDiscount),
//                 showCased: ownerShowCased,
//                 name: ownerName,
//               },
//             };
//           } catch (error) {
//             console.error("Error decrypting number:", error);
//             return num; // Return original if decryption fails
//           }
//         })
//       );

//       return {
//         ...pack,
//         numbers: decryptedNumbers,
//       };
//     } catch (error) {
//       console.error("Error decrypting pack:", error);
//       return pack;
//     }
//   };

//   // Fetch family pack data
//   const fetchFamilyPackData = async (page = 1, append = false) => {
//     try {
//       if (append) {
//         setLoadingMore(true);
//       } else {
//         setLoading(true);
//       }

//       const api = UserAxiosAPI();
//       const response = await api.get("/vip-numbers/family-pack", {
//         params: {
//           familyPack: selectedPackSize,
//           page: page,
//           limit: 10,
//           sortbyprice: "low-high",
//         },
//       });

//       if (response.data.success && response.data.data) {
//         const packs = response.data.data;

//         // Decrypt the total field
//         const decryptedTotal = await safeDecrypt(response.data.total);

//         // Decrypt all packs
//         const decryptedPacks = await Promise.all(
//           packs.map((pack) => decryptPackNumbers(pack))
//         );

//         setTotalPages(response.data.totalPages || 0);
//         setHasMoreData(page < (response.data.totalPages || 0));

//         if (append) {
//           setFamilyPackData((prev) => [...prev, ...decryptedPacks]);

//           const newSelections = decryptedPacks.reduce((acc, pack, index) => {
//             acc[`pack${familyPackData.length + index}`] = pack.numbers.map(
//               (num) => num._id
//             );
//             return acc;
//           }, {});
//           setSelections((prev) => ({ ...prev, ...newSelections }));
//         } else {
//           setFamilyPackData(decryptedPacks);

//           const initialSelections = decryptedPacks.reduce(
//             (acc, pack, index) => {
//               acc[`pack${index}`] = pack.numbers.map((num) => num._id);
//               return acc;
//             },
//             {}
//           );
//           setSelections(initialSelections);
//         }
//       }

//       if (append) {
//         setLoadingMore(false);
//       } else {
//         setLoading(false);
//       }
//     } catch (error) {
//       console.error("Error fetching family pack data:", error);
//       setError("Failed to load family pack data");
//       setLoading(false);
//       setLoadingMore(false);
//     }
//   };

//   useEffect(() => {
//     setCurrentPage(1);
//     setFamilyPackData([]);
//     setSelections({});
//     fetchFamilyPackData(1, false);
//   }, [selectedPackSize]);

//   const handleSelectionChange = (packId, selectedItems) => {
//     setSelections((prev) => ({
//       ...prev,
//       [packId]: selectedItems,
//     }));
//   };

//   const handlePackSizeChange = (e) => {
//     setSelectedPackSize(Number(e.target.value));
//   };

//   const handleLoadMore = () => {
//     const nextPage = currentPage + 1;
//     setCurrentPage(nextPage);
//     fetchFamilyPackData(nextPage, true);
//   };

//   // Handle adding multiple numbers to cart
//   const handleBuyNow = async (selectedNumbers) => {
//     try {
//       let successCount = 0;
//       let failCount = 0;

//       for (const num of selectedNumbers) {
//         try {
//           // Calculate final price with margins
//           const originalPrice = num.price;
//           const ownerDiscount = num?.owner?.discount || 0;
//           const discountedPrice =
//             originalPrice - originalPrice * ownerDiscount * 0.01;

//           const marginData = margins?.find(
//             (margin) =>
//               originalPrice >= margin.minPrice &&
//               originalPrice <= margin.maxPrice
//           );
//           const marginPercent = marginData ? marginData.marginPercent : 0;
//           const marginAmount = (originalPrice * marginPercent) / 100;
//           const finalPrice = discountedPrice + marginAmount;
//           const roundedFinalPrice = Math.round(finalPrice / 10) * 10;

//           // Add calculated price to the number object
//           const numWithPrice = {
//             ...num,
//             roundedFinalPrice,
//           };

//           // Add to Redux cart
//           dispatch(addToCart(numWithPrice));

//           // Check if already in cart
//           const isPresent = cart.find((it) => it._id === num._id);

//           // Track with Facebook Pixel
//           fbqTrack("AddToCart");

//           // Track with Google Analytics
//           if (window.gtag) {
//             window.gtag("event", "conversion", {
//               send_to: "AW-16838705843/l-w1CJnEtpcaELOFqd0-",
//               value: roundedFinalPrice,
//               currency: "INR",
//             });
//           }

//           // Add to backend cart if user is logged in and item not already present
//           if (user && !isPresent) {
//             await axios.post("/cart/add", {
//               vipNumberId: num._id,
//             });
//           }

//           successCount++;
//         } catch (error) {
//           console.error(`Failed to add ${num.number}:`, error);
//           failCount++;
//         }
//       }

//       // Show success message
//       if (successCount > 0) {
//         toast.success(`${successCount} number(s) added to cart!`);
//         // Navigate to cart after a short delay
//         setTimeout(() => {
//           navigate("/checkout");
//         }, 1000);
//       }

//       // Show error message if any failed
//       if (failCount > 0) {
//         toast.error(`Failed to add ${failCount} number(s) to cart`);
//       }
//     } catch (error) {
//       toast.error("Failed to add numbers to cart");
//       console.error("Error adding to cart:", error);
//     }
//   };

//   return (
//     <section className="py-8 bg-gray-50">
//       <div className="container mx-auto px-4">
//         {/* Header Bar */}
//         <div className="bg-gradient-to-r from-[#274A7B] to-[#274A7B] rounded-2xl px-6 py-5 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <div className="flex items-center gap-2">
//             <h2 className="text-white text-2xl font-bold">
//               Family & Business Pack
//             </h2>
//           </div>
//           <div className="flex items-center gap-3">
//             <span className="text-white font-semibold text-lg">
//               Family pack of
//             </span>
//             <select
//               value={selectedPackSize}
//               onChange={handlePackSizeChange}
//               className="bg-orange-500 text-gray-900 font-bold text-sm px-4 py-2 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               disabled={loading || loadingMore}
//             >
//               <option value={2}>2</option>
//               <option value={3}>3</option>
//               <option value={4}>4</option>
//               <option value={5}>5</option>
//               <option value={6}>6</option>
//               <option value={7}>7</option>
//             </select>

//             <div class="bg-orange-500 text-gray-900 font-bold text-sm px-4 py-2 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-500">
//               <select>
//                 <option value="">Sort by Price</option>
//                 <option value="low-high">Low to High</option>
//                 <option value="high-low">High to Low</option>
//               </select>
//               <svg
//                 stroke="currentColor"
//                 fill="currentColor"
//                 stroke-width="0"
//                 viewBox="0 0 512 512"
//                 class="absolute right-3 top-1/2 transform -translate-y-1/2 text-darktext pointer-events-none"
//                 height="1em"
//                 width="1em"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"></path>
//               </svg>
//             </div>
//           </div>
//         </div>

//         {/* Cards Grid with Loading/Error States */}
//         {loading ? (
//           <div className="text-center py-12">
//             <p className="text-gray-600 text-lg">Loading family packs...</p>
//           </div>
//         ) : error ? (
//           <div className="text-center py-12">
//             <p className="text-red-600 text-lg">{error}</p>
//           </div>
//         ) : familyPackData.length === 0 ? (
//           <div className="text-center py-12">
//             <p className="text-gray-600 text-lg">No family packs available</p>
//           </div>
//         ) : (
//           <>
//             <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//               {familyPackData.map((pack, index) => {
//                 const packId = `pack${index}`;
//                 return (
//                   <FamilyPackCard
//                     key={packId}
//                     packData={pack}
//                     selectedItems={selections[packId] || []}
//                     onSelectionChange={(selected) =>
//                       handleSelectionChange(packId, selected)
//                     }
//                     onBuyNow={handleBuyNow}
//                   />
//                 );
//               })}
//             </div>

//             {/* Load More Button */}
//             {hasMoreData && (
//               <div className="mt-6 flex justify-center">
//                 <button
//                   onClick={handleLoadMore}
//                   disabled={loadingMore}
//                   className="bg-[#274A7B] text-white px-6 py-2 rounded-lg hover:bg-white hover:text-[#274A7B] border-2 border-[#274A7B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {loadingMore ? "Loading..." : "More..."}
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </section>
//   );
// };

// export default FamilyPack;



















// import React, { useState, useEffect, useContext } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../../redux/cart/cartSlice";
// import { useNavigate } from "react-router-dom";
// import UserAxiosAPI from "../../api/userAxiosAPI";
// import toast from "react-hot-toast";
// import { fbqTrack } from "../utils/fbq";
// import FamilyPackCard from "../FamilyPackCard";
// import { safeDecrypt } from "../../utils/decryptAES";
// import { Appstate } from "../../App";

// const FamilyPackNumber = () => {
//   const [familyPackData, setFamilyPackData] = useState([]);
//   const [selections, setSelections] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedPackSize, setSelectedPackSize] = useState(3);
//   const [sortByPrice, setSortByPrice] = useState("low-high");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [hasMoreData, setHasMoreData] = useState(true);
//   const [totalPages, setTotalPages] = useState(0);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const user = useSelector((state) => state.user.user);
//   const cart = useSelector((state) => state.cart?.items);
//   const axios = UserAxiosAPI();
//   const { margins } = useContext(Appstate);

//   // Decrypt a single pack's numbers
//   const decryptPackNumbers = async (pack) => {
//     try {
//       const decryptedNumbers = await Promise.all(
//         pack.numbers.map(async (num) => {
//           try {
//             // Decrypt all encrypted fields
//             const price = await safeDecrypt(num.price);
//             const view = await safeDecrypt(num.view);
//             const stock = await safeDecrypt(num.stock);
//             const sum = await safeDecrypt(num.sum);
//             const total = await safeDecrypt(num.total);
//             const sum2 = await safeDecrypt(num.sum2);

//             // Decrypt owner fields
//             const ownerDiscount = num?.owner?.discount
//               ? await safeDecrypt(num.owner.discount)
//               : 0;
//             const ownerShowCased = num?.owner?.showCased
//               ? await safeDecrypt(num.owner.showCased)
//               : null;
//             const ownerName = num?.owner?.name
//               ? await safeDecrypt(num.owner.name)
//               : "";

//             return {
//               ...num,
//               price: parseFloat(price),
//               view,
//               stock: parseInt(stock),
//               sum: parseInt(sum),
//               total: parseInt(total),
//               sum2: parseInt(sum2),
//               owner: {
//                 ...num.owner,
//                 discount: parseFloat(ownerDiscount),
//                 showCased: ownerShowCased,
//                 name: ownerName,
//               },
//             };
//           } catch (error) {
//             console.error("Error decrypting number:", error);
//             return num; // Return original if decryption fails
//           }
//         })
//       );

//       return {
//         ...pack,
//         numbers: decryptedNumbers,
//       };
//     } catch (error) {
//       console.error("Error decrypting pack:", error);
//       return pack;
//     }
//   };

//   // Fetch family pack data
//   const fetchFamilyPackData = async (page = 1, append = false) => {
//     try {
//       if (append) {
//         setLoadingMore(true);
//       } else {
//         setLoading(true);
//       }

//       const api = UserAxiosAPI();
//       const response = await api.get("/vip-numbers/family-pack", {
//         params: {
//           familyPack: selectedPackSize,
//           page: page,
//           limit: 10,
//           sortbyprice: sortByPrice,
//         },
//       });

//       if (response.data.success && response.data.data) {
//         const packs = response.data.data;

//         // Decrypt the total field
//         const decryptedTotal = await safeDecrypt(response.data.total);

//         // Decrypt all packs
//         const decryptedPacks = await Promise.all(
//           packs.map((pack) => decryptPackNumbers(pack))
//         );

//         setTotalPages(response.data.totalPages || 0);
//         setHasMoreData(page < (response.data.totalPages || 0));

//         if (append) {
//           setFamilyPackData((prev) => [...prev, ...decryptedPacks]);

//           const newSelections = decryptedPacks.reduce((acc, pack, index) => {
//             acc[`pack${familyPackData.length + index}`] = pack.numbers.map(
//               (num) => num._id
//             );
//             return acc;
//           }, {});
//           setSelections((prev) => ({ ...prev, ...newSelections }));
//         } else {
//           setFamilyPackData(decryptedPacks);

//           const initialSelections = decryptedPacks.reduce(
//             (acc, pack, index) => {
//               acc[`pack${index}`] = pack.numbers.map((num) => num._id);
//               return acc;
//             },
//             {}
//           );
//           setSelections(initialSelections);
//         }
//       }

//       if (append) {
//         setLoadingMore(false);
//       } else {
//         setLoading(false);
//       }
//     } catch (error) {
//       console.error("Error fetching family pack data:", error);
//       setError("Failed to load family pack data");
//       setLoading(false);
//       setLoadingMore(false);
//     }
//   };

//   useEffect(() => {
//     setCurrentPage(1);
//     setFamilyPackData([]);
//     setSelections({});
//     fetchFamilyPackData(1, false);
//   }, [selectedPackSize, sortByPrice]);

//   const handleSelectionChange = (packId, selectedItems) => {
//     setSelections((prev) => ({
//       ...prev,
//       [packId]: selectedItems,
//     }));
//   };

//   const handlePackSizeChange = (e) => {
//     setSelectedPackSize(Number(e.target.value));
//   };

//   const handleSortChange = (e) => {
//     setSortByPrice(e.target.value);
//   };

//   const handleLoadMore = () => {
//     // const nextPage = currentPage + 1;
//     // setCurrentPage(nextPage);
//     // fetchFamilyPackData(nextPage, true);
//     navigate("/family-pack");
//   };

//   // Handle adding multiple numbers to cart
//   const handleBuyNow = async (selectedNumbers) => {
//     try {
//       let successCount = 0;
//       let failCount = 0;

//       for (const num of selectedNumbers) {
//         try {
//           // Calculate final price with margins
//           const originalPrice = num.price;
//           const ownerDiscount = num?.owner?.discount || 0;
//           const discountedPrice =
//             originalPrice - originalPrice * ownerDiscount * 0.01;

//           const marginData = margins?.find(
//             (margin) =>
//               originalPrice >= margin.minPrice &&
//               originalPrice <= margin.maxPrice
//           );
//           const marginPercent = marginData ? marginData.marginPercent : 0;
//           const marginAmount = (originalPrice * marginPercent) / 100;
//           const finalPrice = discountedPrice + marginAmount;
//           const roundedFinalPrice = Math.round(finalPrice / 10) * 10;

//           // Add calculated price to the number object
//           const numWithPrice = {
//             ...num,
//             roundedFinalPrice,
//           };

//           // Add to Redux cart
//           dispatch(addToCart(numWithPrice));

//           // Check if already in cart
//           const isPresent = cart.find((it) => it._id === num._id);

//           // Track with Facebook Pixel
//           fbqTrack("AddToCart");

//           // Track with Google Analytics
//           if (window.gtag) {
//             window.gtag("event", "conversion", {
//               send_to: "AW-16838705843/l-w1CJnEtpcaELOFqd0-",
//               value: roundedFinalPrice,
//               currency: "INR",
//             });
//           }

//           // Add to backend cart if user is logged in and item not already present
//           if (user && !isPresent) {
//             await axios.post("/cart/add", {
//               vipNumberId: num._id,
//             });
//           }

//           successCount++;
//         } catch (error) {
//           console.error(`Failed to add ${num.number}:`, error);
//           failCount++;
//         }
//       }

//       // Show success message
//       if (successCount > 0) {
//         toast.success(`${successCount} number(s) added to cart!`);
//         // Navigate to cart after a short delay
//         setTimeout(() => {
//           navigate("/checkout");
//         }, 1000);
//       }

//       // Show error message if any failed
//       if (failCount > 0) {
//         toast.error(`Failed to add ${failCount} number(s) to cart`);
//       }
//     } catch (error) {
//       toast.error("Failed to add numbers to cart");
//       console.error("Error adding to cart:", error);
//     }
//   };

//   return (
//     <section className="py-8 bg-gray-50">
//       <div className="w-full sm:container mx-auto px-4">
//         {/* Header Bar */}
//         <div className="bg-gradient-to-r from-[#274A7B] to-[#274A7B] rounded-2xl px-6 py-5 mb-6 flex flex-col sm:flex-row items-center justify-between gap-1">
//           <div className="flex items-center gap-2">
//             <h2 className="text-white text-2xl font-bold">Family Pack</h2>
//           </div>
//           <div className="flex items-center justify-center sm:justify-start gap-3 flex-wrap">
//             <span className="text-white font-semibold text-lg">
//               Family pack of
//             </span>
//             <select
//               value={selectedPackSize}
//               onChange={handlePackSizeChange}
//               className="bg-orange-500 text-gray-900 font-bold text-sm px-4 py-2 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               disabled={loading || loadingMore}
//             >
//               <option value={2}>2</option>
//               <option value={3}>3</option>
//               <option value={4}>4</option>
//               <option value={5}>5</option>
//               <option value={6}>6</option>
//               <option value={7}>7</option>
//             </select>

//             <select
//               value={sortByPrice}
//               onChange={handleSortChange}
//               className="bg-orange-500 text-gray-900 font-bold text-sm px-4 py-2 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               disabled={loading || loadingMore}
//             >
//               <option value="low-high">Low to High</option>
//               <option value="high-low">High to Low</option>
//             </select>
//           </div>
//         </div>

//         {/* Cards Grid with Loading/Error States */}
//         {loading ? (
//           <div className="text-center py-12">
//             <p className="text-gray-600 text-lg">Loading family packs...</p>
//           </div>
//         ) : error ? (
//           <div className="text-center py-12">
//             <p className="text-red-600 text-lg">{error}</p>
//           </div>
//         ) : familyPackData.length === 0 ? (
//           <div className="text-center py-12">
//             <p className="text-gray-600 text-lg">No family packs available</p>
//           </div>
//         ) : (
//           <>
//             <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2">
//               {familyPackData.map((pack, index) => {
//                 const packId = `pack${index}`;
//                 return (
//                   <FamilyPackCard
//                     key={packId}
//                     packData={pack}
//                     selectedItems={selections[packId] || []}
//                     onSelectionChange={(selected) =>
//                       handleSelectionChange(packId, selected)
//                     }
//                     onBuyNow={handleBuyNow}
//                   />
//                 );
//               })}
//             </div>

//             {/* Load More Button */}
//             {hasMoreData && (
//               <div className="mt-6 flex justify-center">
//                 <button
//                   onClick={handleLoadMore}
//                   disabled={loadingMore}
//                   className="bg-[#274A7B] text-white px-6 py-2 rounded-lg hover:bg-white hover:text-[#274A7B] border-2 border-[#274A7B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {loadingMore ? "Loading..." : "More..."}
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </section>
//   );
// };

// export default FamilyPackNumber;






















import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import UserAxiosAPI from "../../api/userAxiosAPI";
import toast from "react-hot-toast";
import { fbqTrack } from "../utils/fbq";
import FamilyPackCard from "../FamilyPackCard";
import { safeDecrypt } from "../../utils/decryptAES";

const FamilyPackNumber = () => {
  const [familyPackData, setFamilyPackData] = useState([]);
  const [selections, setSelections] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPackSize, setSelectedPackSize] = useState(3);
  const [sortByPrice, setSortByPrice] = useState("low-high");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [totalPages, setTotalPages] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart?.items);
  const axios = UserAxiosAPI();

  // Decrypt a single pack's numbers
  const decryptPackNumbers = async (pack) => {
    try {
      const decryptedNumbers = await Promise.all(
        pack.numbers.map(async (num) => {
          try {
            // Decrypt all encrypted fields in parallel
            const [
              displayedDiscount,
              originalPrice,
              price,
              stock,
              sum,
              sum2,
              total,
              view,
            ] = await Promise.all([
              safeDecrypt(num.displayedDiscount),
              safeDecrypt(num.originalPrice),
              safeDecrypt(num.price),
              safeDecrypt(num.stock),
              safeDecrypt(num.sum),
              safeDecrypt(num.sum2),
              safeDecrypt(num.total),
              safeDecrypt(num.view),
            ]);

            return {
              ...num,
              displayedDiscount: parseFloat(displayedDiscount) || 0,
              originalPrice: parseFloat(originalPrice) || 0,
              price: parseFloat(price) || 0,
              stock: parseInt(stock) || 0,
              sum: parseInt(sum) || 0,
              sum2: parseInt(sum2) || 0,
              total: parseInt(total) || 0,
              view: view || num.number,
            };
          } catch (error) {
            console.error("Error decrypting number:", error);
            return num; // Return original if decryption fails
          }
        })
      );

      // Decrypt pack-level fields
      const [count, totalPrice] = await Promise.all([
        safeDecrypt(pack.count),
        safeDecrypt(pack.totalPrice),
      ]);

      return {
        ...pack,
        count: parseInt(count) || 0,
        totalPrice: parseFloat(totalPrice) || 0,
        numbers: decryptedNumbers,
      };
    } catch (error) {
      console.error("Error decrypting pack:", error);
      return pack;
    }
  };

  // Fetch family pack data
  const fetchFamilyPackData = async (page = 1, append = false) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const api = UserAxiosAPI();
      const response = await api.get("/vip-numbers/family-pack", {
        params: {
          familyPack: selectedPackSize,
          page: page,
          limit: 10,
          sortbyprice: sortByPrice,
        },
      });

      if (response.data.success && response.data.data) {
        const packs = response.data.data;

        // Decrypt all packs
        const decryptedPacks = await Promise.all(
          packs.map((pack) => decryptPackNumbers(pack))
        );

        setTotalPages(response.data.totalPages || 0);
        setHasMoreData(page < (response.data.totalPages || 0));

        if (append) {
          setFamilyPackData((prev) => [...prev, ...decryptedPacks]);

          const newSelections = decryptedPacks.reduce((acc, pack, index) => {
            acc[`pack${familyPackData.length + index}`] = pack.numbers.map(
              (num) => num._id
            );
            return acc;
          }, {});
          setSelections((prev) => ({ ...prev, ...newSelections }));
        } else {
          setFamilyPackData(decryptedPacks);

          const initialSelections = decryptedPacks.reduce(
            (acc, pack, index) => {
              acc[`pack${index}`] = pack.numbers.map((num) => num._id);
              return acc;
            },
            {}
          );
          setSelections(initialSelections);
        }
      }

      if (append) {
        setLoadingMore(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching family pack data:", error);
      setError("Failed to load family pack data");
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    setFamilyPackData([]);
    setSelections({});
    fetchFamilyPackData(1, false);
  }, [selectedPackSize, sortByPrice]);

  const handleSelectionChange = (packId, selectedItems) => {
    setSelections((prev) => ({
      ...prev,
      [packId]: selectedItems,
    }));
  };

  const handlePackSizeChange = (e) => {
    setSelectedPackSize(Number(e.target.value));
  };

  const handleSortChange = (e) => {
    setSortByPrice(e.target.value);
  };

  const handleLoadMore = () => {
    navigate("/family-pack");
  };

  // Handle adding multiple numbers to cart
  const handleBuyNow = async (selectedNumbers) => {
    try {
      let successCount = 0;
      let failCount = 0;

      for (const num of selectedNumbers) {
        try {
          // Add to Redux cart (price is already calculated from backend)
          dispatch(addToCart(num));

          // Check if already in cart
          const isPresent = cart.find((it) => it._id === num._id);

          // Track with Facebook Pixel
          fbqTrack("AddToCart");

          // Track with Google Analytics
          if (window.gtag) {
            window.gtag("event", "conversion", {
              send_to: "AW-16838705843/l-w1CJnEtpcaELOFqd0-",
              value: num.price,
              currency: "INR",
            });
          }

          // Add to backend cart if user is logged in and item not already present
          if (user && !isPresent) {
            await axios.post("/cart/add", {
              vipNumberId: num._id,
            });
          }

          successCount++;
        } catch (error) {
          console.error(`Failed to add ${num.number}:`, error);
          failCount++;
        }
      }

      // Show success message
      if (successCount > 0) {
        toast.success(`${successCount} number(s) added to cart!`);
        // Navigate to cart after a short delay
        setTimeout(() => {
          navigate("/checkout");
        }, 1000);
      }

      // Show error message if any failed
      if (failCount > 0) {
        toast.error(`Failed to add ${failCount} number(s) to cart`);
      }
    } catch (error) {
      toast.error("Failed to add numbers to cart");
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <section className="py-8 bg-gray-50">
      <div className="w-full sm:container mx-auto px-4">
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-[#274A7B] to-[#274A7B] rounded-2xl px-6 py-5 mb-6 flex flex-col sm:flex-row items-center justify-between gap-1">
          <div className="flex items-center gap-2">
            <h2 className="text-white text-2xl font-bold">Family Pack</h2>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-3 flex-wrap">
            <span className="text-white font-semibold text-lg">
              Family pack of
            </span>
            <select
              value={selectedPackSize}
              onChange={handlePackSizeChange}
              className="bg-orange-500 text-gray-900 font-bold text-sm px-4 py-2 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-500"
              disabled={loading || loadingMore}
            >
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
            </select>

            <select
              value={sortByPrice}
              onChange={handleSortChange}
              className="bg-orange-500 text-gray-900 font-bold text-sm px-4 py-2 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-500"
              disabled={loading || loadingMore}
            >
              <option value="low-high">Low to High</option>
              <option value="high-low">High to Low</option>
            </select>
          </div>
        </div>

        {/* Cards Grid with Loading/Error States */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Loading family packs...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 text-lg">{error}</p>
          </div>
        ) : familyPackData.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No family packs available</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2">
              {familyPackData.map((pack, index) => {
                const packId = `pack${index}`;
                return (
                  <FamilyPackCard
                    key={packId}
                    packData={pack}
                    selectedItems={selections[packId] || []}
                    onSelectionChange={(selected) =>
                      handleSelectionChange(packId, selected)
                    }
                    onBuyNow={handleBuyNow}
                  />
                );
              })}
            </div>

            {/* Load More Button */}
            {hasMoreData && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="bg-[#274A7B] text-white px-6 py-2 rounded-lg hover:bg-white hover:text-[#274A7B] border-2 border-[#274A7B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingMore ? "Loading..." : "More..."}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default FamilyPackNumber;