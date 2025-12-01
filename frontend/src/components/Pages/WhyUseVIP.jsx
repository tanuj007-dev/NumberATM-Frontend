import { useContext, useEffect, useState } from "react";
import UserAxiosAPI from "../../api/userAxiosAPI";
const VipPhoneNumbers = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const {getOptimizedImage} = useContext(Appstate);
  const axios = UserAxiosAPI();
  const [meta, setMeta] = useState({ title: "", tags: "", description: "", content: "" });
  useEffect(() => {
    axios.get(`/meta/Why Use Vip`).then(({ data }) => {
      setMeta(data || { title: "", tags: "", description: "", content: "" });
    });
  }, []);
  return (
    <>
      <div className=" mx-auto p-8 bg-white text-gray-900 shadow-2xl rounded-2xl border border-gray-300">
        {meta?.breadcum&&<img className='my-3 md:mb-8 w-full' src={getOptimizedImage(meta?.breadcum)} />}

        {meta.content ? <><h1 className="text-4xl font-semibold text-center text-black mb-6 uppercase tracking-wide">
          Why We Should Use VIP Phone Numbers in India
        </h1>
          <p className="text-gray-700 text-lg leading-relaxed text-center mb-8">
            VIP phone numbers, also known as fancy or premium numbers, feature unique or easily memorable digit combinations. These numbers are highly sought after and can come at a premium price. Here’s why individuals and businesses in India opt for VIP Mobile numbers:
          </p>
          <div className="space-y-6">
            {[
              {
                title: "Branding and Marketing",
                description:
                  "VIP numbers enhance branding and marketing efforts. They are easy to remember, making it more likely for potential customers to recall and dial the number. This can be particularly advantageous for businesses that rely on phone communication or want to leave a lasting impression."
              },
              {
                title: "Professional Image",
                description:
                  "A VIP phone number establishes a professional image. It signals attention to detail and presents the business or individual as distinctive and exclusive."
              },
              {
                title: "Competitive Advantage",
                description:
                  "In competitive industries, a VIP phone number can differentiate a business from competitors. It attracts more attention, generates leads, and boosts inquiries."
              },
              {
                title: "Personal Preference",
                description:
                  "Some individuals choose VIP numbers based on personal significance, such as lucky digits or favorite combinations. It’s a reflection of their unique personality and style."
              },
              {
                title: "Status Symbol",
                description:
                  "VIP phone numbers symbolize success and affluence. Owning a fancy number can be a statement of prestige, elevating one’s social or business standing."
              },
              {
                title: "Resale Value",
                description:
                  "VIP numbers can appreciate in value over time, especially if they feature desirable digit combinations. Many people invest in them as assets with profitable resale potential."
              }
            ].map((item, index) => (
              <div key={index} className="relative p-6 py-10 my-4 bg-gray-100 rounded-xl shadow-md border border-gray-300">
                {/* Highlight Bar */}
                <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-yellow-400 to-red-500 rounded-l-lg"></div>
                <h2 className="text-2xl font-medium text-black mb-2 pl-4">{item.title}</h2>
                <p className="text-gray-700 text-lg pl-4">{item.description}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-600 text-lg mt-8 text-center italic">
            VIP phone numbers come at a higher cost, so consider the benefits and weigh them against expenses before acquiring one.
          </p></> : <div className="py-6 text-gray-600 bg-transparent rounded-md">
          <div className="ql-editor" dangerouslySetInnerHTML={{ __html: meta.content }} />
        </div>}
      </div>
    </>
  );
};

export default VipPhoneNumbers;
