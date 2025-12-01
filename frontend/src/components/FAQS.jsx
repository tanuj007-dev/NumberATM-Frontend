"use client";
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { Link } from "react-router-dom";
 const faqs = [
  {
    question: "Do VIP numbers work on prepaid and postpaid plans?",
    answer: "Yes. You can add your premium line to either plan without extra steps.",
  },
  {
    question: "Can I move my VIP number to another network later?",
    answer: "Absolutely. Use the standard Mobile Number Portability process at any time.",
  },
  {
    question: "Are installment plans available?",
    answer: "Indeed. Flexible payment options let you spread the cost while locking the number right now.",
  },
   {
  question: "Ready to Upgrade?",
  answer: (
    <div>
      Turn every call into a branding moment. Secure your unique sequence with Numberatm services today.
      <br />
      <Link
        to="/vip-numbers"
        className="inline-block mt-4 px-6 py-3 rounded-full font-semibold 
                bg-[#F5C037] text-[#17565D]
                shadow-md transition-all duration-300
                hover:bg-[#17565DE6] hover:text-white hover:scale-105"
      >
        Explore VIP Numbers Now
      </Link>
    </div>
  ),
}
];


export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
     <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
                <h2 className="md:text-3xl text-lg  m-2 md:m-2    text-center font-semibold">
                  Frequently Asked Questions (FAQ)
                </h2>
                <p className=" md:text-lg text-md m-2 text-center md:m-2 text-gray-700">
                  Can't find the answer here? Check out our <span className="underline underline-offset-8">Help Center.</span>
                </p>
                <div className="space-y-3 md:space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border-b bg-transparent pb-2">
                      <p
                        className="flex justify-between p-3 md:p-4 cursor-pointer w-full text-left font-semibold bg-white text-base md:text-xl text-md  text-[#000000] py-2 md:py-3 rounded-md hover:bg-gray-50 transition-colors"
                        onClick={() => toggleFAQ(index)}
                      >
                        {faq.question}
                        {openIndex === index ? <FiChevronUp className="flex-shrink-0 ml-2" /> : <FiChevronDown className="flex-shrink-0 ml-2" />}
                      </p>
                      {openIndex === index && (
                        <p className="text-gray-600 mt-2 md:mt-3 p-3 md:p-4 rounded-md text-sm md:text-base">{faq.answer}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
  );
}
