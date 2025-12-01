
import { useContext, useEffect, useState } from "react";
import UserAxiosAPI from '../../api/userAxiosAPI';
import { Appstate } from '../../App';

const GetAirtel = () => {
    const [meta, setMeta] = useState({ title: "", tags: "", description: "", content: "" });
    const {getOptimizedImage} = useContext(Appstate);
    const axios = UserAxiosAPI();
    useEffect(() => {
        axios.get(`/meta/Get Airtel`).then(({ data }) => {
            setMeta(data || { title: "", tags: "", description: "", content: "" });
        });
    }, []);
    return (
        <>
            <div className="md:max-w-7xl mx-auto p-6 bg-white text-gray-900 shadow-0 py-12">
            {meta?.breadcum&&<img className='my-3 md:mb-8 w-full' src={getOptimizedImage(meta?.breadcum)} />}
                {!meta.content ? <><h1 className="text-xl md:text-2xl font-bold text-left text-black mb-4">
                    How can I get Airtel VIP number?
                </h1>
                    <div className='border-t-[2px] mt-3 mb-4 border-t-black w-80'></div>
                    <p className="text-gray-700 text-base leading-relaxed mb-4">
                        Airtel, like many other mobile service providers, offers VIP or premium numbers that are unique and easy to remember.
                    </p>
                    <p className="text-gray-700 text-base leading-relaxed mb-4">
                        To get an Airtel VIP number, you can follow these steps:
                    </p>
                    <ul className="space-y-3">
                        <li className="p-3 bg-white relative pl-6 rounded-md border border-gray-300">
                            <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-blue-400 to-green-500 rounded-l-lg"></div>
                            <span className="font-semibold">Contact Airtel Customer Care:</span> Reach out to Airtel's customer care helpline or visit their nearest store to inquire about VIP numbers. They will provide you with information on availability, pricing, and any special requirements.
                        </li>
                        <li className="p-3 bg-white relative pl-6 rounded-md border border-gray-300">
                            <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-blue-400 to-green-500 rounded-l-lg"></div>
                            <span className="font-semibold">Check Online Portals:</span> Airtel often collaborates with online portals or third-party sellers who offer VIP numbers. Browse through these portals to find available VIP numbers, compare prices, and select the one that suits your preference.
                        </li>
                        <li className="p-3 bg-white relative pl-6 rounded-md border border-gray-300">
                            <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-blue-400 to-green-500 rounded-l-lg"></div>
                            <span className="font-semibold">Auctions and Special Events:</span> Airtel occasionally conducts auctions or special events where premium numbers are up for grabs. Keep an eye on their official website, social media platforms, or local advertisements to stay informed about such opportunities.
                        </li>
                        <li className="p-3 bg-white relative pl-6 rounded-md border border-gray-300">
                            <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-blue-400 to-green-500 rounded-l-lg"></div>
                            <span className="font-semibold">Premium Number Requests:</span>  In some cases, Airtel allows customers to request a specific VIP number. You can contact Airtel Customer Care and inquire about the process for requesting a specific number. They will guide you through the necessary steps and provide further information.
                        </li>

                    </ul>
                    <p className="text-gray-600 text-sm mt-4 text-left">
                        Remember that VIP numbers are often priced higher than regular numbers due to their exclusivity and uniqueness. The availability of VIP numbers may also vary based on demand and location.
                    </p>
                    <div className="flex justify-center"><img src={"https://res.cloudinary.com/dlvtqiuzt/image/upload/f_auto,q_auto/v1751289366/fhhh9w2f39wdz41mvidi.jpg"} className="w-[40rem] p-6" /></div></> :
                    <div className="py-6 bg-transparent rounded-md">
                        <div className="ql-editor" dangerouslySetInnerHTML={{ __html: meta.content }} />
                    </div>
                }
            </div>
        </>
    );
};

export default GetAirtel;
