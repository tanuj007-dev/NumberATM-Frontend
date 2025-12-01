 import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserAxiosAPI from "../../api/userAxiosAPI";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Appstate } from "../../App";

import smilingWoman from '../../assets/yellow.png';
const NumberCard = ({ num,woman=true }) => {
    const navigate = useNavigate();
     const {margins, setMargins} = useContext(Appstate);
    const axios = UserAxiosAPI();
    // const getMargins = async () => {
    //     try {
    //         const { data } = await axios.get("/margins");
    //         setMargins(data);
    //     } catch (e) {
    //         console.error(e);
    //     }
    // };
    // useEffect(() => {
    //     getMargins();
    // }, [])
    const calculateSums = (number) => {
        if (!number) return;
        const sanitizedNumber = number.replace(/\s+/g, "");
        const sumOfDigits = sanitizedNumber.split("").reduce((acc, digit) => acc + parseInt(digit, 10), 0);
        const sumOfResultingDigits = sumOfDigits.toString().split("").reduce((acc, digit) => acc + parseInt(digit, 10), 0);
        const finalSum = sumOfResultingDigits.toString().split("").reduce((acc, digit) => acc + parseInt(digit, 10), 0);

        return { sum1: sumOfDigits, sum2: sumOfResultingDigits, sum3: finalSum };
    };
    const originalPrice = num.price;
    const ownerDiscount = num?.owner?.discount || 0;

    // Step 1: Apply owner discount
    const discountedPrice = originalPrice - (originalPrice * ownerDiscount * 0.01);

    // Step 2: Determine applicable margin
    const marginData = margins?.find(
        (margin) => originalPrice >= margin.minPrice && originalPrice < margin.maxPrice
    );
    const marginPercent = marginData ? marginData.marginPercent : 0;

    // Step 3: Calculate final price
    const marginAmount = (originalPrice * marginPercent) / 100;
    const finalPrice = discountedPrice + marginAmount;

    // Step 4: Round to nearest ten
    const roundedFinalPrice = Math.round(finalPrice / 10) * 10;
    const roundedOriginalPrice = Math.round((originalPrice + marginAmount) / 10) * 10;
    return (
        <div onClick={() => navigate(`/vip-number/${num.number}`)} className="relative cursor-pointer w-full text-nowrap bg-black text-white p-4 rounded-0 shadow-lg">

            {/* <div className="bg-black text-white p-4 rounded-lg">
                <div className="text-yellow-400 text-sm font-bold">
                    <div className="flex items-center text-nowrap gap-0.5">
                        <span className="text-[1rem]">📞</span>
                        <p >VIP Numbers Ashish Yadav</p>
                    </div>
                    <p className="mt-0.5">97222-97222</p>
                </div>
                <div className="p-4 gap-2">
                    <h3 className="text-lg font-bold">Random Number</h3>
                    <p className="">SUM TOTAL <span className="font-semibold">
                        {calculateSums(num?.number)?.sum1} - {calculateSums(num?.number)?.sum2} -{" "}
                        {calculateSums(num?.number)?.sum3}
                    </span></p>
                    <p className="text-2xl font-bold">{num?.view ? num.view : num.number}</p>
                    <p className="text-yellow-400 font-bold">{margins?`₹${roundedFinalPrice.toLocaleString('en-IN')}`:'Calculating...'}</p>
                    <button className="bg-red-500 text-white px-4 py-2 rounded mt-4">
                        BOOK NOW
                    </button>
                </div>
            </div>
            {woman&&<div className="w-1/3">
                <img
                    src={smilingWoman}
                    alt="Woman Smiling"
                    className="h-[72%] md:h-[83%] absolute -right-12 lg:-right-16  -bottom-0 lg:-bottom-2 z-50 object-contain"
                />
            </div>} */}
        </div>
    );
};


export default function NumberCards({woman}) {
    const numbersData = useSelector((state) => state.number.originalValue);
    const [numbers, setNumbers] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1)
    const axios = UserAxiosAPI();
    const getNumbers = async () => {
        try {
            const { data } = await axios.get(`vip-numbers?page=${page}&limit=${40}`);
            setNumbers(prevNumbers => [...prevNumbers, ...data.data]);
            setTotal(data.total);
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        getNumbers();
    }, [page])
    return (
        <>
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-[100%] overflow-hidden gap-6 p-3 lg:p-6">
                {numbers?.map((item, index) => (
                    <NumberCard woman={woman} number={item.view ? item.view : item.number} num={item} sumTotal={2} price={item.price} />
                ))}
            </div> */}
            {/* {total > numbers?.length && (
                <div className="my-6 flex justify-center">
                    <button
                        className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-400"
                        onClick={() => setPage(page + 1)}
                    >
                        More
                    </button>
                </div>
            )} */}
        </>
    );
}
