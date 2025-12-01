import { useContext, useEffect, useRef, useState } from "react";
import UserAxiosAPI from "../../api/userAxiosAPI";
import { Appstate } from "../../App";

export default function RefundPolicy() {
  const { getOptimizedImage } = useContext(Appstate);
  const axios = UserAxiosAPI();

  const [meta, setMeta] = useState({
    title: "",
    tags: "",
    description: "",
    content: "",
  });

  const [toc, setToc] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Fetch refund policy data
  useEffect(() => {
    axios.get(`/meta/Refund Policy`).then(({ data }) => {
      setMeta(data || { title: "", tags: "", description: "", content: "" });
    });
  }, []);

  // Generate table of contents
  useEffect(() => {
    const container = document.getElementById("refund-content");
    if (!container) return;

    const headings = container.querySelectorAll("strong");

    const tocItems = [];
    headings.forEach((h, index) => {
      const id = "section-" + index;
      h.setAttribute("id", id);
      tocItems.push({ id, text: h.innerText });
    });

    setToc(tocItems);
  }, [meta]);

  return (
    <div className="md:px-20 px-5 py-10">

      {/* Breadcum Image */}
      {meta?.breadcum && (
        <img
          className="my-3 md:mb-8 w-full"
          src={getOptimizedImage(meta?.breadcum)}
          alt="Banner"
        />
      )}

      {/* GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">

        {/* LEFT — TABLE OF CONTENTS */}
        <div className="md:col-span-1 relative">
          <div className="sticky top-24 bg-white p-5 rounded-xl">
            <h3 className="font-bold text-lg mb-4">ON THIS PAGE</h3>

            <ul className="space-y-12 text-sm">
              {toc.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-gray-500 leading-snug tracking-tight hover:text-black hover:underline"
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Vertical Line */}
          <div className="hidden md:block absolute top-0 right-0 h-full w-[1px] bg-gray-300"></div>
        </div>

        {/* RIGHT — MAIN CONTENT */}
        <div className="md:col-span-3">
          <div id="refund-content">

            {/* Default Content (If Meta Not Loaded) */}
            {!meta.content ? (
              <>
                <h2 className="text-black text-3xl font-bold">Return & Refund Policy</h2>
                <div className="border-t-4 border-black w-40 mt-3 mb-5"></div>

                <p className="leading-snug tracking-tight text-justify">
                  <strong>Refund Policy</strong>
                </p>

                <p className="leading-snug mt-2">
                  At NumberATM.com, your satisfaction is our priority. This policy outlines when and how refunds are applicable for purchases made on our platform.
                </p>

                <p className="pt-10 leading-snug">
                  <strong>Eligibility for Refund</strong>
                </p>
                <p className="leading-snug">
                You qualify for a refund if you have purchased a VIP mobile number through Numberatm.com.
Refunds are applicable if you do not receive your Unique Porting Code (UPC) within 24–36 working hours post-purchase.
If your order is cancelled by us due to operational issues or system errors, you are eligible for a full refund.
If you cancel your purchase within 1 hour of placing the order, we will refund your payment minus the payment gateway charges (3–5%), which covers transaction processing fees.
No refunds are provided once the UPC has been shared or the number is activated.
Only regular-priced VIP numbers are eligible for refunds. VIP numbers on sale are not refundable unless specified otherwise.​
                </p>

                <p className="pt-10 leading-snug">
                  <strong>Refund Amount</strong>
                </p>
                <p className="leading-snug">
                Full refund (100%) if the order is cancelled by Numberatm.com.
Refund minus payment gateway charges if you cancel within 1 hour of purchase.
Partial refund may be applicable if we are unable to provide your selected UPC and you choose another number.
                </p>

                <p className="pt-10 leading-snug">
                  <strong>Refund Processing Time</strong>
                </p>
                <p className="leading-snug">
               Refunds are processed within 4 to 7 working days after approval.
All refunds are credited to your original payment method. The amount may take up to 7 days to reflect in your bank account, depending on your bank’s policy.​
                </p>

                <p className="pt-10 leading-snug">
                  <strong>How to Request a Refund</strong>
                </p>
                <p className="leading-snug">
                 Contact our support team via email at info@numberatm.com or call +91 9711197111.
Provide your order details for verification.
Upon approval, the refund will be processed as per the above timelines.
                </p>
                <p className="pt-10 leading-snug">
                  <strong>Additional Support</strong>
                </p>
                <p className="leading-snug">
                For any queries not covered here, contact info@numberatm.com or call +91 9411194111.
Our customer service is available Monday to Saturday, 10 AM to 7 PM.
                </p>
                <p className="pt-10 leading-snug">
                  <strong>Important Notes</strong>
                </p>
                <p className="leading-snug">
              o refunds or exchanges are allowed after the UPC is delivered or the number is activated.
If you are unable to port the number within the specified time, inform us immediately. In some cases, we may provide a new UPC, but after several months, we cannot guarantee the availability of the same number due to technical or regulatory issues.
As per TRAI rules, if a customer has more than 9 mobile numbers on their ID proof, the purchase will be automatically terminated. Please check your existing connections before purchasing.​
If a purchased number is not used or recharged for more than 45 days, it may be terminated by the telecom operator, and Numberatm.com is not responsible for such cases.​
Not all numbers are guaranteed to be fresh; some may be recycled and could receive wrong calls. We do not accept returns for this reason.
No exchange of numbers is possible after the UPC is delivered.
                </p>
              </>
            ) : (
              <div
                className="ql-editor"
                dangerouslySetInnerHTML={{ __html: meta.content }}
              />
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
