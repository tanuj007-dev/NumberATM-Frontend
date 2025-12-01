import { useContext, useEffect, useState } from "react";
import UserAxiosAPI from "../../api/userAxiosAPI";
import { Appstate } from "../../App";

export default function TermsAndCondition() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { getOptimizedImage } = useContext(Appstate);
  const axios = UserAxiosAPI();
  const [meta, setMeta] = useState({
    title: "",
    tags: "",
    description: "",
    content: "",
  });

  useEffect(() => {
    axios.get(`/meta/Terms And Condition`).then(({ data }) => {
      setMeta(data || { title: "", tags: "", description: "", content: "" });
    });
  }, []);

  return (
    <>
     <div className="md:p-36 p-5 md:py-12 text-left flex gap-10">

        {/* ========= LEFT TABLE OF CONTENT ========= */}
        <div className="hidden md:flex w-64 mr-10 sticky top-32 h-full">

  {/* LEFT SIDE – TOC */}
  <div className="pr-6">
    <h3 className="text-lg font-semibold mb-4">ON THIS PAGE</h3>
    <ul className="space-y-4 text-gray-700">
      <li><a href="#dear-customer" className="hover:text-black">Dear Customer</a></li>
      <li><a href="#venue-platform" className="hover:text-black">Website– merely a venue/platform</a></li>
      <li><a href="#eligibility" className="hover:text-black">User(s) eligibility</a></li>
      <li><a href="#user-agreement" className="hover:text-black">User(s) Agreement</a></li>
      <li><a href="#amend-agreement" className="hover:text-black">Amendment to User(s) Agreement</a></li>
      <li><a href="#ipr" className="hover:text-black">Intellectual Property Rights</a></li>
      <li><a href="#copyright" className="hover:text-black">Copyright</a></li>
      <li><a href="#urls-sub-domain" className="hover:text-black">URL's/Sub-Domain</a></li>
      <li><a href="#disclaimer" className="hover:text-black">Disclaimer</a></li>
    </ul>
  </div>

  {/* VERTICAL DIVIDER */}
  <div className="border-r border-gray-300"></div>

</div>

        {/* ========= MAIN CONTENT RIGHT SIDE ========= */}
        <div className="flex-1">
          {meta?.breadcum && (
            <img
              className="my-3 md:mb-8 w-full"
              src={getOptimizedImage(meta?.breadcum)}
            />
          )}

          <h2 className="text-black flex justify-left text-4xl">
            Terms &amp; Conditions
          </h2>
          <div className="border-t-[4px] mt-4 border-t-black w-40"></div>

          {!meta.content ? (
            <>
              {/* 😂 GOOGLE-FRIENDLY IDS ADDED TO HEADINGS */}

              <p className="pt-6 pb-3">
                <strong id="dear-customer" className="pt-6 mt-4 pb-3">
                  Dear Customer,
                </strong>
                <br />
                The following demonstrates terms and conditions of use
                (here-in-after referred to as an "Agreement"), applicable to
                your use of NumberATM (hereinafter referred to as "web site"), w
                !important which promotes business between suppliers and buyers
                globally. It is an agreement between you as the user(s) of the
                web site (the "User(s)") and NumberATM. (hereinafter referred to
                as "NumberATM"). Before you subscribe to and/or begin
                participating in or using web site, NumberATM believes that
                user(s) have fully read, understood and accept the agreement. If
                you do not agree to or wish to be bound by agreement , you may
                not access or otherwise use the web site or and NumberATM wil
                not be responsible for any business activity.
              </p>

              <p className="pt-6 pb-3">
                <strong id="venue-platform" className="pt-6 pb-3">
                  Website- merely a venue/platform
                </strong>
                <br />
                Web site acts as a mere venue/platform for our members to
                negotiate/interact for buying, selling and other business
                services by way of locating companies to trade with, through our
                on-line exchange. We do not take part in the actual transaction
                that takes place between the buyers and sellers and hence are
                not a party to any contract for sale negotiated between buyers
                and sellers. All transactions will be the responsibility of the
                members only. This agreement shall not be deemed to create any
                partnership, joint venture, or other joint business relationship
                between NumberATM and other party.
              </p>

              <p className="pt-6 pb-3">
                <strong id="eligibility" className="pt-6 pb-3">
                  User(s) eligibility
                </strong>
                <br />
                User(s) means any individual or business entity/organization
                that legally operates in india or in other countries, uses and
                has the right to use the services provided by NumberATM. Our
                services are available only to those individuals or companies
                who can form legally binding contracts under the applicable law.
                Therefore, user(s) must not be a minor as per indian law, I. E.
                User(s) must be at least 18 years of age to be eligible to use
                our services. NumberATM advises its users that while accessing
                the web site, they must follow/abide by the related laws.
                NumberATM is not responsible for the possible consequences
                caused by your behaviour during use of web site. NumberATM may,
                in its sole discretion, refuse the service to anyone at any
                time. The service is not available to temporarily or
                indefinitely suspended members of web site.
              </p>

              <p className="pt-6 pb-3">
                <strong id="user-agreement" className="pt-6 pb-3">
                  User(s) Agreement
                </strong>
                <br />
                This agreement applies to user(s) if user(s) are visitors,
                registered - free or paid user(s) who access the web site for
                any purpose. It also applies to any legal entity which may be
                represented by you under actual or apparent authority. User(s)
                may use this site solely for their own personal or internal
                purposes. This agreement applies to all NumberATM services
                offered on the web site, collectively with any additional terms
                and condition that may be applicable to the specific service
                used/accessed by user(s).In the event of a conflict or
                inconsistency between any provision of the terms and conditions
                mentioned herein with those of the particular service, the
                provisions of the terms and conditions applicable to such
                specific services shall prevail.
              </p>

              <p className="pt-6 pb-3">
                <strong id="amend-agreement" className="pt-6 pb-3">
                  Amendment to User(s) Agreement
                </strong>
                <br />
                NumberATM may change, modify, amend, or update this agreement
                from time to time without any prior notification to user(s) and
                the amended and restated terms and conditions of use shall be
                effective immediately on posting. If you do not adhere to the
                changes, you must stop using the service. Your continuous use of
                the service will signify your acceptance of the changed terms.
              </p>

              <p className="pt-6 pb-3">
                <strong id="ipr" className="pt-6 pb-3">
                  Intellectual Property Rights
                </strong>
                <br />
                NumberATM is the sole owner or lawful licensee of all the rights
                to the web site and its content. Web site content means its
                design, layout, text, images, graphics, sound, video etc. The
                web site content embody trade secrets and intellectual property
                rights protected under worldwide copyright and other laws. All
                title, ownership and intellectual property rights in the web
                site and its content shall remain with premium numbers, its
                affiliates or licensor's of premium numbers content, as the case
                may be. All rights, not otherwise claimed under this agreement
                or by premium numbers, are hereby reserved. The information
                contained in this web site is intended, solely to provide
                general information for the personal use of the reader, who
                accepts full responsibility for its use. NumberATM does not
                represent or endorse the accuracy or reliability of any
                information, or advertisements (collectively, the "Content")
                contained on, distributed through, or linked, downloaded or
                accessed from any of the services contained on this web site, or
                the quality of any products, information or other materials
                displayed, or obtained by you as a result of an advertisement or
                any other information or offer in or in connection with the
                service.
              </p>
              <p>
                We accept no responsibility for any errors or omissions, or for
                the results obtained from the use of this information. All
                information in this web site is provided "As is" with no
                guarantee of completeness, accuracy, timeliness or of the
                results obtained from the use of this information, and without
                warranty of any kind, express or implied, including, but not
                limited to warranties of performance, merchantability and
                fitness for a particular purpose. Nothing herein shall to any
                extent substitute for the independent investigations and the
                sound technical and business judgment of the user(s). In no
                event shall NumberATM be liable for any direct, indirect,
                incidental, punitive, or consequential damages of any kind
                whatsoever with respect to the service, the materials, and the
                products. User(s) of this site must hereby acknowledge that any
                reliance upon any content shall be at their sole risk.
              </p>
              <p>
                The information presented here has been compiled from publicly
                aired and published sources. NumberATM respects these sources
                and is in no way trying to infringe on the respective copyrights
                or businesses of these entities. NumberATM reserves the right,
                in its sole discretion and without any obligation, to make
                improvements to, or correct any error or omissions in any
                portion of the service or the materials.
              </p>

              <p className="pt-6 pb-3">
                <strong id="copyright" className="pt-6 pb-3">
                  Copyright
                </strong>
                <br />
                All content on this web site is the copyright of NumberATM
                except the third party content and link to third party web site
                on our website. NumberATM is not an expert in your intellectual
                property rights, and we cannot verify that the users of our
                online marketplace - who post literally tens of thousands of
                trade leads for items on the website each day - have the right
                to sell the goods offered. We will appreciate your assistance in
                identifying listings which may not appear on their face to
                infringe your rights but which you believe are infringing.
                NumberATM is also not an arbiter or judge of disputes about
                intellectual property rights. By taking down a listing, as a
                prudential matter, NumberATM is not endorsing a claim of
                infringement. Neither, in those instances in which NumberATM
                declines to take down a listing, is NumberATM determining that
                the listing is not infringing, nor is NumberATM endorsing the
                sale of goods in such cases.
              </p>
              <p>
                NumberATM respects the intellectual property rights of others,
                and we expect our user(s) to do the same. We believes that
                user(s) agree that they will not copy, download & reproduce any
                information, text, images, video clips, directories, files,
                databases or listings available on or through the web site (the
                "NumberATM content") for the purpose of re-selling or
                re-distributing, mass mailing (via email, wireless text
                messages, physical mail or otherwise), operating a business
                competing with NumberATM, or otherwise commercially exploiting
                the NumberATM content. Systematic retrieval of NumberATM content
                to create or compile, directly or indirectly, a collection,
                compilation, database or directory (whether through robots,
                spiders, automatic devices or manual processes) without written
                permission from NumberATM is prohibited.
              </p>
              <p>
                In addition, use of the content for any purpose not expressly
                permitted in this agreement is prohibited and may invite legal
                action. As a condition of your access to and use of NumberATM
                services, you agree that you will not use the web site service
                to infringe the intellectual property rights of others in any
                way. NumberATM reserves the right to terminate the account of a
                user(s) upon any infringement of the rights of others in
                conjunction with use of the NumberATM service, or if NumberATM
                believes that user(s) conduct is harmful to the interests of
                NumberATM, its affiliates, or other users, or for any other
                reason in NumberATM sole discretion, with or without cause.
              </p>
              <p className="pt-6 pb-3">
                <strong id="urls-sub-domain" className="pt-6 pb-3">
                 URL's/Sub-Domain
                </strong>
                <br />
               Url's/sub-domain names assigned by NumberATM to its users (which includes both paid and free) is the exclusive property of NumberATM and it cannot be assumed to be permanent in any case. NumberATM reserves the right, without prior notice, at any point of time, to suspend or terminate or restrict access to or edit the url's/sub domain names. In such case NumberATM will not be liable to any party for any direct, indirect, special or other consequential damages, including, without limitation, any lost profits, business interruption or otherwise.
              </p>
              <p className="pt-6 pb-3">
                <strong id="disclaimer" className="pt-6 pb-3">
             Disclaimer
                </strong>
                <br />
             NumberATM grants you permission to view this web site and to print individual pages from this web site for your own personal, noncommercial use, provided that you agree to and accept without modification the notices, terms, and conditions set forth in this agreement. You may not modify, copy (except as set forth in the preceding sentence), distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any information, material, software, products or services from this web site. Your use of this web site constitutes your agreement and acceptance without modification of the notices, terms and conditions set forth herein. In addition, as a condition of your use of this web site, you represent and warrant to NumberATM that you will not use this web site for any purpose that is unlawful, immoral, or prohibited by these terms, conditions, and notices. If you do not agree and accept without modification the notices, terms and conditions set forth herein, do not use this website. Other than this agreement, NumberATM will not enter into any agreement with you or obligation to you through this web site, and no attempt to create such an agreement or obligation will be effective. NumberATM website is not selling the mobile numbers itself. It is just a platform to connect you with the dealer.
              </p>
              <p>All sales of vip mobile numbers on NumberATM with no refund or exchange permitted. You are responsible for the mobile number you purchase and all charges that result from those purchases. NumberATM is not responsible for any purchase of mobile for an incorrect/mistakenly mobile number. However, if in a transaction performed by you on the site, money has been charged to your card or bank account and a number is not delivered within 24 hours of your completion of the transaction then you may inform us by sending an email to our customer services email address mentioned on the contact us page or through call. Please include in the email the following details - the mobile number, transaction date and order number. NumberATM team shall investigate the incident and if it is found that money was indeed charged to your card or bank account without delivery of the mobile number then you will be refunded the money within 21 working days from the date of receipt of your email. All refunds will be credited to your bank account. It will take 3-21 days for the money to show in your bank account depending on your bank's policy. Moreover, after placing your order for specific mobile number, the NumberATM team will firstly confirm from the dealer than he confirm you that whether the specific number is available or not. Merely placing your order for number does not mean that you have become the owner of the number. All rights are reserve with the NumberATM team.</p>
              {/* ❗ All remaining long content stays EXACTLY as you provided — unchanged */}
              {/* Paste your remaining <p>, <ul>, etc. below */}
            </>
          ) : (
            <div className="py-6 text-gray-600 bg-transparent rounded-md">
              <div
                className="ql-editor"
                dangerouslySetInnerHTML={{ __html: meta.content }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
