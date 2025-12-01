import  { useContext, useEffect, useState } from "react";
import UserAxiosAPI from "../../api/userAxiosAPI";
import { Appstate } from "../../App";
const UniqueNumber = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
    const {getOptimizedImage} = useContext(Appstate);
    const axios = UserAxiosAPI();
    const [meta, setMeta] = useState({ title: "", tags: "", description: "", content: "" });
    useEffect(() => {
        axios.get(`/meta/Unique Number`).then(({ data }) => {
            setMeta(data || { title: "", tags: "", description: "", content: "" });
        });
    }, []);
    return (
        <>
            <div className="md:max-w-7xl mx-auto p-6 bg-white text-gray-900 shadow-0 py-12">
                {meta?.breadcum&&<img className='my-3 md:mb-8 w-full' src={getOptimizedImage(meta?.breadcum)} />}

                {!meta.content ? <><h1 className="text-xl md:text-2xl font-bold text-left text-black mb-4">
                    How can I get a unique mobile number?
                </h1>
                    <div className='border-t-[2px] mt-3 mb-4 border-t-black w-80'></div>
                    <p className="text-gray-700 text-base leading-relaxed mb-4">
                        To get a unique mobile number, you can consider the following options:
                    </p>
                    <ul className="space-y-3">
                        <li className="p-3 bg-white relative pl-6 rounded-md border border-gray-300">
                            <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-blue-400 to-green-500 rounded-l-lg"></div>
                            <span className="font-semibold">Mobile Service Provider: </span>Contact your mobile service provider and inquire about available unique or fancy numbers. They may have specific categories or packages that offer distinctive numbers, such as repeated digits, palindromic numbers, or patterns.
                        </li>
                        <li className="p-3 bg-white relative pl-6 rounded-md border border-gray-300">
                            <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-blue-400 to-green-500 rounded-l-lg"></div>
                            <span className="font-semibold">Online Portals and Websites: </span>Several online portals and websites specialize in selling unique mobile numbers. Browse through these platforms to find available numbers and select the one that matches your preferences. Keep in mind that these numbers may come at a premium cost.
                        </li>
                        <li className="p-3 bg-white relative pl-6 rounded-md border border-gray-300">
                            <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-blue-400 to-green-500 rounded-l-lg"></div>
                            <span className="font-semibold">Auctions and Special Events: </span>Occasionally, mobile service providers or third-party sellers organize auctions or special events where unique mobile numbers are up for bidding or sale. Stay updated with announcements and participate in such events if you're looking for a distinctive number.
                        </li>
                        <li className="p-3 bg-white relative pl-6 rounded-md border border-gray-300">
                            <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-blue-400 to-green-500 rounded-l-lg"></div>
                            <span className="font-semibold">Personalized Number Requests: </span>Some mobile service providers allow customers to request personalized or vanity numbers, which spell out specific words or phrases. Inquire with your provider about their personalized number services and the associated process.
                        </li>
                    </ul>
                    <p className="text-gray-600 text-sm mt-4 text-left">
                        Unique mobile numbers often come with an additional cost due to their exclusivity and desirability. The availability of unique numbers may vary based on demand and specific offerings from mobile service providers or third-party sellers.
                    </p></> : <div className="py-6 text-gray-600 bg-transparent rounded-md">
                    <div className="ql-editor" dangerouslySetInnerHTML={{ __html: meta.content }} />
                </div>}
            </div>
        </>
    );
};

export default UniqueNumber;
