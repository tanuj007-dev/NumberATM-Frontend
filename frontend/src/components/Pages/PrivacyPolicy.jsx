 import { useContext, useEffect, useState } from "react";
import UserAxiosAPI from "../../api/userAxiosAPI";
import { Appstate } from "../../App";

export default function PrivacyPolicy() {
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

  // Fetch meta
  useEffect(() => {
    axios.get(`/meta/Privacy Policy`).then(({ data }) => {
      setMeta(data || { title: "", tags: "", description: "", content: "" });
    });
  }, []);

  // Generate Table of Contents from headings
  useEffect(() => {
    const container = document.getElementById("policy-content");
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
            className="text-gray-500 leading-snug tracking-tighter hover:text-black hover:underline"
          >
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  </div>

  {/* 👉 Vertical Line on Right Side */}
  <div className="hidden md:block absolute top-0 right-0 h-full w-[1px] bg-gray-300"></div>
</div>

  
        {/* RIGHT — MAIN CONTENT */}
        <div className="md:col-span-3   ">
          <div id="policy-content">
            {!meta.content ? (
              <>
                <h2 className="text-black text-3xl font-bold">
                  Privacy Policy
                </h2>
                <div className="border-t-4 border-black w-40 mt-3 mb-5"></div>

                <p>
                  <strong>Privacy Policy</strong>
                </p>
                <p className="leading-snug">
                  NumberATM is trading as NumberATM.com (hereinafter referred to
                  as "NumberATM.com" ). NumberATM.com is committed to protecting
                  your privacy. This Statement of privacy applies to the
                  NumberATM.com public website and governs data collection and
                  usage. By using the NumberATM.com public website, you consent
                  to the data practices described in this statement.
                </p>

                <p className="pt-6 leading-snug tracking-tight text-justify ">
                  <strong>COLLECTION OF YOUR PERSONAL INFORMATION</strong>
                </p>
                <p className="leading-snug">
                  NumberATM.com collects personally identifiable information,
                  such as your E-mail Address, Name, Business Name and/or State
                  Location. NumberATM.com also collects anonymous demographic
                  information, which is not unique to you, such as your postcode
                  and product preferences.
                </p>
                <br />
                <p className="leading-snug">
                  NumberATM.com encourages you to review the privacy statements
                  of websites you choose to link to from NumberATM.com so that
                  you can understand how those websites collect, use and share
                  your information. NumberATM.com is not responsible for the
                  privacy statements or other content on websites outside of
                  NumberATM.com and the NumberATM.com family of websites.
                </p>

                <p className="pt-6 leading-snug">
                  <strong>USE OF YOUR PERSONAL INFORMATION</strong>
                </p>
                <p className="leading-snug">
                  NumberATM.com collects and uses your personal information to
                  operate the NumberATM.com website and deliver the services you
                  have requested. NumberATM.com also uses your personally
                  identifiable information to inform you of other products or
                  services available fromⒸ NumberATM.com. NumberATM.com may also
                  contact you via surveys to conduct research about your opinion
                  of current services or of potential new services that may be
                  offered.
                </p>
                    <br />
                <p className="leading-snug">
                  NumberATM.com does not sell, rent or lease its customer lists
                  to third parties. NumberATM.com keeps track of the websites
                  and pages our customers visit within the NumberATM.com
                  website, in order to determine what NumberATM.com services are
                  the most popular. This data is used to deliver customised
                  content and advertising to customers whose behaviour indicates
                  that they are interested in a particular subject area.
                  NumberATM.com websites will disclose your personal
                  information, without notice, only if required to do so by law
                  or in the good faith belief that such action is necessary to:
                  (a) conform to the edicts of the law or comply with legal
                  process served on NumberATM.com or the site; (b) protect and
                  defend the rights or property of NumberATM.com; and, (c) act
                  under exigent circumstances to protect the personal safety of
                  users of NumberATM.com, or the public.
                </p>
                <p className="pt-6">
                  <strong>USE OF COOKIES</strong>
                </p>
                <p className="leading-snug">
                  The NumberATM.com website uses “cookies” to help you
                  personalise your online experience. A cookie is a text file
                  that is placed on your hard disk by a web page server. Cookies
                  cannot be used to run programs or deliver viruses to your
                  computer. Cookies are uniquely assigned to you, and can only
                  be read by a web server in the domain that issued the cookie
                  to you.
                </p>
                    <br />
                <p className="leading-snug">
                  One of the primary purposes of cookies is to provide a
                  convenience feature to save you time. The purpose of a cookie
                  is to tell the web server that you have returned to a specific
                  page. For example, if you register with the Numberwale.com
                  site or services, a cookie helps NumberATM.com to recall your
                  specific information on subsequent visits. You have the
                  ability to accept or decline cookies. Most web browsers
                  automatically accept cookies, but you can usually modify your
                  browser setting to decline cookies if you prefer. If you
                  choose to decline cookies, you may not be able to fully
                  experience the interactive features of the NumberATM.com
                  services or websites you visit.
                </p>
                <p className="pt-6">
                  <strong>SECURITY OF YOUR PERSONAL INFORMATION</strong>
                </p>
                <p className="leading-snug">
                NumberATM.com secures your personal information from unauthorised access, use or disclosure. NumberATM.com secures the personally identifiable information you provide on computer servers in a controlled, secure environment, protected from unauthorised access, use or disclosure.
                </p>

                <p className="pt-6">
                  <strong>CHANGES TO THIS STATEMENT</strong>
                </p>
                <p className="leading-snug">
                 NumberATM.com will occasionally update this Statement of Privacy to reflect company and customer feedback. NumberATM.com encourages you to periodically review this Statement to be informed of how NumberATM.com is protecting your information.
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
