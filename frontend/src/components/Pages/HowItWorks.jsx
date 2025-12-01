import React, { useContext, useEffect, useState } from "react";
import UserAxiosAPI from "../../api/userAxiosAPI";
import { Appstate } from "../../App";
import Timeline from "../Timeline";
import FAQS1 from "../FAQS1";
const faqs = [
    { q: "Does the number I purchase belong to me?", a: "Yes. It belongs to you the same way your current number belongs to you. You can take it with you to any phone provider you like whenever you want." },
    { q: "Are these numbers currently under contract?", a: "NO" },
    { q: "What is number porting?", a: "It is the process used by users to change service providers, when you transfer your phone number from one provider to another (e.g., Jio to Vodafone, Airtel to MTNL, etc.)." },
    { q: "What kind of guarantee do you offer?", a: "We offer a 100% money-back guarantee. If you are unable to port the number or get it activated to your carrier within 15 days, we will refund you the full amount." },
    { q: "What is UPC (Unique Porting Code) for MNP Process?", a: "UPC consists of 8 characters, where the first two specify the service provider’s name and service area code." },
    { q: "What does RTP (Ready To Port) mean?", a: "RTP numbers are unique and easy-to-remember numbers that are readily up for transfer by changing the network or circle." },
    { q: "Can there be a transfer of ownership of the SIM card?", a: "Yes, via MNP service which changes the name & operator. Inter-Operator transfer depends on the provider and whether your connection is prepaid or postpaid." },
    { q: "What documents are needed to buy a SIM card?", a: "We strictly require original documents like Passport, Aadhar card, etc., along with live biometric presence for SIM delivery." }
];

const HowItWorks = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const [loadVideo, setLoadVideo] = useState(false);
    const { getOptimizedImage } = useContext(Appstate);
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
    const axios = UserAxiosAPI();
    const [meta, setMeta] = useState({ title: "", tags: "", description: "", content: "" });
    useEffect(() => {
        axios.get(`/meta/How It Works`).then(({ data }) => {
            setMeta(data || { title: "", tags: "", description: "", content: "" });
        });
    }, []);
    return (
        <>
            <div className="">
                {/* {meta?.breadcum && <img className=' ' src={getOptimizedImage(meta?.breadcum)} />} */}
                {/* Header */}
               

                {/* Steps */}
                {!meta.content ? <>    <Timeline />
                 {/* <div className="space-y-8">
                    {[
                        { step: "01", title: "SELECTION", description: "Send us a HI using WhatsApp on 95111-95111 to get a list of paid VIP Numbers." },
                        { step: "02", title: "AVAILABILITY", description: "Confirm the availability of your NEW VIP NUMBER." },
                        { step: "03", title: "BOOKING", description: "We book your choice by Advance payment only. Use PAYTM and reserve your number on 95111-95111." },
                        { step: "04", title: "SCHEDULE", description: "Our team will call you & fix an appointment as per your schedule." },
                        { step: "05", title: "THE DELIVERY", description: "Done! We are always on time." }
                    ].map((item, index) => (
                        <div key={index} className="flex flex-col md:flex-row items-center gap-5 p-6 shadow-lg rounded-lg bg-white border border-gray-300">
                            <div className="text-4xl font-bold text-orange-600">STEP {item.step}</div>
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-800">{item.title}</h2>
                                <p className="text-gray-700">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div> */}

                    {/* FAQ Section */}
                    {/* <div className="mt-10 flex flex-col md:flex-row gap-10">
                        <div className="md:w-1/2">
                            <h2 className="text-2xl md:text-3xl font-bold text-center text-orange-600 mb-5">Frequently Asked Questions</h2>
                            <div className="space-y-5">
                                {faqs.map((faq, index) => (
                                    <div key={index} className="border border-gray-300 rounded-lg overflow-hidden">
                                        <button
                                            className="w-full p-4 text-left font-semibold bg-gray-100 hover:bg-gray-200 focus:outline-none"
                                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                        >
                                            {faq.q}
                                        </button>
                                        {openIndex === index && (
                                            <div className="p-4 bg-white text-gray-700">{faq.a}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Video Section */}
                        {/* <div className="md:w-1/2">
                            <h2 className="text-3xl font-bold text-orange-600 mb-5">Watch How It Works</h2>
                            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg">
                                <div
                                    className="absolute top-0 left-0 w-full h-full cursor-pointer group"
                                    onClick={() => setLoadVideo(true)}
                                >
                                    {loadVideo ? (
                                        <iframe
                                            src={`https://www.youtube.com/embed/8KPQb9KLiyc?autoplay=1`}
                                            title="Vip number kaise le | How to Buy vip number | VIP Numbers by Ashish Yadav Numberatm"
                                            loading="lazy"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                            className="w-full h-full"
                                        />
                                    ) : (
                                        <>
                                            <img
                                                src="https://img.youtube.com/vi/8KPQb9KLiyc/hqdefault.jpg"
                                                alt="YouTube thumbnail"
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <svg
                                                    className="w-16 h-16 text-white"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                        </div> */}
                    {/* </div> */} 
  <FAQS1/>
                    {/* Privacy Section */}
                    {/* <div className="mt-10 p-5 bg-gray-100 text-gray-900 rounded-lg">
                        <h2 className="text-xl font-semibold">Privacy</h2>
                        <p>We do not store your credit card or other payment information. And we do not share your information with anyone else.</p>
                    </div> */}
                    
                    </> : <div className="py-6 bg-transparent rounded-md">
                    <div className="ql-editor" dangerouslySetInnerHTML={{ __html: meta.content }} />
                </div>}
            </div>
        </>
    );
};

export default HowItWorks;
