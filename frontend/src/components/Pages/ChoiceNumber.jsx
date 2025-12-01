import  { useContext, useEffect, useState } from 'react'
import UserAxiosAPI from '../../api/userAxiosAPI';
import { Appstate } from '../../App';

function ChoiceNumber() {
    const {getOptimizedImage} = useContext(Appstate);
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
    const [meta, setMeta] = useState({ title: "", tags: "", description: "", content: "" });
    const axios = UserAxiosAPI();
    useEffect(() => {
        axios.get(`/meta/Choice Number`).then(({ data }) => {
            setMeta(data || { title: "", tags: "", description: "", content: "" });
        });
    }, []);
    return (
        <>
            <div className="md:max-w-7xl mx-auto p-6 bg-white text-gray-900 shadow-0 py-12">
            {meta?.breadcum&&<img className='my-3 md:mb-8 w-full' src={getOptimizedImage(meta?.breadcum)} />}
                {meta.content ? <><h1 className="text-xl md:text-2xl font-bold text-left text-black mb-4">
                    Can I get the SIM number of my choice?
                </h1>
                    <div className='border-t-[2px] mt-3 mb-4 border-t-black w-80'></div>
                    <p className="text-gray-700 text-base leading-relaxed mb-4">
                        In most cases, you cannot select a specific SIM number as mobile service providers usually allocate SIM numbers sequentially or based on availability.
                    </p>
                    <p className="text-gray-700 text-base leading-relaxed mb-4">
                        However, you can try the following:
                    </p>
                    <ul className="space-y-3">
                        <li className="p-3 bg-white relative pl-6 rounded-md border border-gray-300">
                            <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-blue-400 to-green-500 rounded-l-lg"></div>
                            <span className="font-semibold">Request a Specific Number: </span>Contact your mobile service provider's customer care and inquire if they offer the option to request a specific SIM number. They will inform you about any associated fees or requirements.
                        </li>
                        <li className="p-3 bg-white relative pl-6 rounded-md border border-gray-300">
                            <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-blue-400 to-green-500 rounded-l-lg"></div>
                            <span className="font-semibold">Porting or Switching Providers: </span> If you have a particular number in mind and your current provider cannot fulfill your request, you may consider porting your number to a different service provider that can offer the desired number.
                        </li>
                        <li className="p-3 bg-white relative pl-6 rounded-md border border-gray-300">
                            <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-blue-400 to-green-500 rounded-l-lg"></div>
                            <span className="font-semibold">Special Requests:</span> In rare cases, mobile service providers might have special programs or services that allow customers to request a specific SIM number for an additional fee. Inquire with your provider to see if such options are available.
                        </li>

                    </ul>
                    <p className="text-gray-600 text-sm mt-4 text-left">
                        Remember that the availability of specific SIM numbers depends on factors such as regional numbering regulations and the availability of the desired number sequence.
                    </p></> : <div className="py-6 text-gray-600 bg-transparent rounded-md">
                    <div className="ql-editor" dangerouslySetInnerHTML={{ __html: meta.content }} />
                </div>}
            </div>
        </>
    );
};

export default ChoiceNumber;
