import { useEffect, useState } from "react";
import VipArticles from "./Articles";
import VipNumberArticle from "./BlogInfo";
import NumberCards from "./Images";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserAxiosAPI from "../../api/userAxiosAPI";
import { useContext } from "react";
import { Appstate } from "../../App";
import womanSmiling from '../../assets/white.png';
const VipNumberCard = ({ category, num, number, price }) => {
    const navigate = useNavigate();
    const calculateSums = (number) => {
        if (!number) return;
        const sanitizedNumber = number.replace(/\s+/g, "");
        const sumOfDigits = sanitizedNumber.split("").reduce((acc, digit) => acc + parseInt(digit, 10), 0);
        const sumOfResultingDigits = sumOfDigits.toString().split("").reduce((acc, digit) => acc + parseInt(digit, 10), 0);
        const finalSum = sumOfResultingDigits.toString().split("").reduce((acc, digit) => acc + parseInt(digit, 10), 0);

        return { sum1: sumOfDigits, sum2: sumOfResultingDigits, sum3: finalSum };
    };
    return (
        <></>
        // <div onClick={() => navigate(`/vip-number/${num.number}`)} className="relative w-full text-nowrap min-w-full max-w-sm bg-black text-white flex rounded-0 shadow-lg overflow-hidden">
        //     {/* Woman Image on the Left Side */}

        //     {/* <div className="w-1/3">
        //         <img
        //             src={womanSmiling}
        //             alt="Woman Smiling"
        //             className="h-full absolute -left-10 top-16 w-full z-50 object-contain"
        //         />
        //     </div> */}

        //     {/* Right Side Content */}
        //     <div className="w-3/4 p-6 px-4 flex flex-col justify-center items-center text-center">
        //         {/* VIP Header Section */}
        //         <div className="text-yellow-400 text-sm font-bold">
        //             <div className="flex items-center text-nowrap justify-center gap-0.5">
        //                 <span className="text-[1rem]">📞</span>
        //                 <p >VIP Numbers Ashish Yadav</p>
        //             </div>
        //             <p className="mt-0.5">95111-95111</p>
        //         </div>

        //         {/* Main Content */}
        //         <div className="mt-6">
        //             {/* <p className="text-lg lg:text-xl  font-semibold">{category?.[0]||category}</p> */}
        //             <p className=" text-xl lg:text-3xl font-bold mt-3">{number}</p>
        //             <p className="text-xs ml-12 mt-3">SUM TOTAL <span className="font-semibold">
        //                 {calculateSums(num?.number)?.sum1} - {calculateSums(num?.number)?.sum2} -{" "}
        //                 {calculateSums(num?.number)?.sum3}
        //             </span></p>
        //             <p className="text-lg lg:text-2xl  font-medium text-yellow-400 ml-10 mt-3">{price}</p>
        //         </div>

        //         {/* Book Now Button */}
        //         <button className="mt-3 w-3/4 ml-4 bg-pink-600 text-white py-1.5 px-3 rounded-lg font-semibold hover:bg-pink-700">
        //             BOOK NOW
        //         </button>

        //         {/* Contact Info */}
        //         <div className="text-yellow-400 mt-4 text-sm">
        //             <p>95111 95111</p>
        //             <p className="text-xs">NUMBERATM.COM</p>
        //         </div>
        //     </div>
        // </div>
    );
};

export default function VipNumberCards() {
    const numbersData = useSelector((state) => state.number.originalValue)
    const { margins, setMargins } = useContext(Appstate);
    const navigate = useNavigate();
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
    const [meta, setMeta] = useState({ title: "", tags: "", description: "", content: "" });
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
    useEffect(() => {
        axios.get(`/meta/Blog`).then(({ data }) => {
            setMeta(data || { title: "", tags: "", description: "", content: "" });
        });
    }, []);
    return (
        <>
            <VipArticles />
            <div className="flex justify-center w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 w-full gap-4 p-3 lg:p-6 place-items-center">

                    {numbersData?.slice(0, 4)?.map((num, index) => {
                       
                        // Step 4: Round to nearest ten
                        const roundedFinalPrice = num?.price;
                        const roundedOriginalPrice = num?.originalPrice;

                        return <VipNumberCard key={index} category={num.category} num={num} sumTotal={2} number={num?.view ? num.view : num.number} price={`₹${roundedFinalPrice.toLocaleString('en-IN')}`} />
                    })}
                </div>
            </div>
            <VipNumberArticle />
            {meta.content && (
                <div className="py-6 text-gray-600 bg-transparent rounded-md">
                    <div
                        className="ql-editor prose prose-gray max-w-none"
                        dangerouslySetInnerHTML={{ __html: meta.content }}
                    />
                </div>
            )}

            <NumberCards />
        </>);
}
