"use client";
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { Link } from "react-router-dom";
import { SiGnuprivacyguard } from "react-icons/si";
const faqs = [
  {
    question: "Does the number I purchase belong to me?",
    answer:
      "Yes. It belongs to you the same way your current number belongs to you. You can take it with you to any phone provider you like whenever you want.",
  },
  {
    question: "Are these numbers currently under contract?",
    answer: "NO",
  },
  {
    question: "What is number porting?",
    answer:
      "It is the process used by users to change service providers when you transfer your phone number from one provider to another (e.g., Jio to Vodafone, Airtel to MTNL, etc.).",
  },
  {
    question: "What kind of guarantee do you offer?",
    answer:
      "We offer a 100% money-back guarantee. If you are unable to port the number or get it activated to your carrier within 15 days, we will refund you the full amount.",
  },
  {
    question: "What is UPC (Unique Porting Code) for MNP Process?",
    answer:
      "UPC consists of 8 characters, where the first two specify the service provider’s name and service area code.",
  },
  {
    question: "What does RTP (Ready To Port) mean?",
    answer:
      "RTP numbers are unique and easy-to-remember numbers that are readily up for transfer by changing the network or circle.",
  },
  {
    question: "Can there be a transfer of ownership of the SIM card?",
    answer:
      "Yes, via MNP service which changes the name & operator. Inter-Operator transfer depends on the provider and whether your connection is prepaid or postpaid.",
  },
  {
    question: "What documents are needed to buy a SIM card?",
    answer:
      "We strictly require original documents like Passport, Aadhar card, etc., along with live biometric presence for SIM delivery.",
  },
];



export default function FAQ1() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md w-full">
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

  {/* ✅ RIGHT — YouTube Video FIRST on Mobile */}
  <div className="w-full h-full space-y-4 order-1 lg:order-2">
    <iframe
      className="w-full h-64 md:h-96 rounded-lg shadow-md"
      src="https://www.youtube.com/embed/8KPQb9KLiyc?autoplay=1"
      title="YouTube video"
      frameBorder="0"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>

    {/* Privacy Card */}
    <div className="p-8 rounded-2xl bg-white relative overflow-hidden border shadow-md flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-[#17565D]/10 text-[#17565D] rounded-full shadow-sm">
          <SiGnuprivacyguard size={30} />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900">Privacy</h2>
      </div>

      <p className="text-gray-700 mt-2 leading-relaxed">
        We do not store your credit card or other payment information.
        And we do not share your information with anyone else.
      </p>
    </div>
  </div>

  {/* ✅ LEFT — FAQ SECTION (comes last on mobile) */}
  <div className="order-2 lg:order-1">
    <h2 className="md:text-2xl text-lg mb-2 font-semibold">
      Frequently Asked Questions (FAQ)
    </h2>

  

    <div className="space-y-3 md:space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="border-b pb-2">
          <p
            className="flex justify-between p-3 md:p-4 cursor-pointer font-semibold bg-white text-base md:text-xl text-[#000] rounded-md hover:bg-gray-50 transition-colors"
            onClick={() => toggleFAQ(index)}
          >
            {faq.question}
            {openIndex === index ? (
              <FiChevronUp className="ml-2" />
            ) : (
              <FiChevronDown className="ml-2" />
            )}
          </p>

          {openIndex === index && (
            <p className="text-gray-600 mt-2 md:mt-3 p-3 md:p-4 text-sm md:text-base">
              {faq.answer}
            </p>
          )}
        </div>
      ))}
    </div>
  </div>
</div>

</div>

  );
}
