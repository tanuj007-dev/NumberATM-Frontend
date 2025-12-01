import { useContext, useEffect, useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useAlert } from "../../context/AlertContext";
import UserAxiosAPI from "../../api/userAxiosAPI";
import { Appstate } from "../../App";
import ConsentForm from "../Admin/Agree";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import phones from "../../assets/phones.png";
import man from "../../assets/man.png";
const ContactUs = () => {
  const { showPrompt, showAlert } = useAlert();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    contact: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { getOptimizedImage } = useContext(Appstate);
  const [errors, setErrors] = useState({});
  const [agree, setAgree] = useState(false);
  const axios = UserAxiosAPI();
  const handleInputChange = (e) => {
    if (e.target.name === "contact") {
      if (e.target.value.length > 10) return;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const validateFormData = (formData) => {
    const errors = {};

    // Name validation
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    // Subject validation
    if (!formData.subject.trim()) {
      errors.subject = "Subject is required";
    }

    // Message validation
    if (!formData.message.trim()) {
      errors.message = "Message is required";
    }

    // Contact (phone) validation
    const phoneRegex = /^[0-9]{10}$/; // Change this if your format differs
    if (!formData.contact.trim()) {
      errors.contact = "Contact number is required";
    } else if (!phoneRegex.test(formData.contact)) {
      errors.contact = "Contact number must be 10 digits";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agree) {
      await showAlert({
        title: "Error",
        message:
          "You must agree to the terms & conditions and privacy policy before submitting.",
      });
      return;
    }
    const validationErrors = validateFormData(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    const captcha = Math.floor(1000 + Math.random() * 9000);
    const input = await showPrompt({
      title: "Captcha Verification",
      message: `Please enter the number <b>${captcha}</b> to verify.`,
      placeholder: "Enter the number",
    });

    if (!input || parseInt(input) !== captcha) {
      await showAlert({
        title: "Failed",
        message: "Incorrect captcha entered.",
      });
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post("/contact", formData);
      await showAlert({ title: "Success", message: res.data.message });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        contact: "",
      });
    } catch (error) {
      await showAlert({
        title: "Error",
        message: error?.response?.data?.error || "Submission failed.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const [meta, setMeta] = useState({
    title: "",
    tags: "",
    description: "",
    breadcum: "",
  });
  useEffect(() => {
    axios.get(`/meta/Contact Us`).then(({ data }) => {
      setMeta(data || { title: "", tags: "", description: "", breadcum: "" });
    });
  }, []);
  return (
    <>
      <div className="bg-gray-50 py-2 px-3 sm:py-3 sm:px-4 md:py-10 md:px-10 leading-tight">
        <div className="container mx-auto max-w-8xl">
          {/* {meta?.breadcum && <img className='my-3 md:mb-8 w-full' src={getOptimizedImage(meta?.breadcum)} />} */}
          {/* contact us heading section */}
          {/* ✅ CONTACT HEADING SECTION */}
          <div className="relative rounded-3xl overflow-hidden">
            {/* 📱📵 HIDE IMAGE ON MOBILE — SHOW ONLY ON TABLET/DESKTOP */}
            <img
              src={phones}
              alt="Contact Support"
              className="hidden sm:block absolute top-[-40px] right-4 md:right-16 lg:right-24 
      w-44 md:w-72 lg:w-[550px] drop-shadow-2xl z-20"
            />

            {/* 🟡 YELLOW CONTENT BOX */}
            <div
              className="relative w-full py-10 sm:py-14 bg-[#E4F0EE]


 rounded-3xl z-10"
            >
              <div className="max-w-7xl mx-auto px-6">
                {/* TEXT CONTENT */}
                <div className="max-w-xl">
                  {/* 🔤 RESPONSIVE HEADING */}
                  <h1
                    className="
          text-2xl      /* mobile */
          sm:text-3xl   /* small screen */
          md:text-4xl   /* tablet */
          lg:text-5xl   /* desktop */
          font-bold leading-tight text-[#17565D] 
        "
                  >
                    Contact Us
                  </h1>

                  {/* 📄 RESPONSIVE PARAGRAPH */}
                  <p
                    className="
          text-xs       /* mobile */
          sm:text-lg      /* small screen */
          md:text-xl      /* tablet */
          lg:text-[15px]/* desktop */
          mt-4 text-[#17565D]
          
        "
                  >
                    Have questions or need assistance choosing the right VIP
                    number? Our support team is here to help anytime. We ensure
                    quick responses, clear guidance, and a smooth experience
                    from inquiry to selection.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-16 mt-6 ">
            {/* LEFT — FORM (same functionality, just ensure equal sizing) */}
            <div className="w-full lg:w-1/2 bg-[#17565D] rounded-3xl p-4 sm:p-5 md:p-8">
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-6 sm:p-5   md:p-10 shadow-2xl border border-white/10 w-full h-full">
                {/* Decorative Circles */}
                <div className="absolute top-0 -left-10 w-32 sm:w-45 h-32 sm:h-40 bg-gradient-to-tr from-[#7cd496] to-[#5cab79] rounded-full blur-3xl opacity-30"></div>
                <div className="absolute bottom-0 -right-10 w-32 sm:w-40 h-32 sm:h-40 bg-gradient-to-bl from-[#5cab79] to-[#7cd496] rounded-full blur-3xl opacity-30"></div>

                <form
                  onSubmit={handleSubmit}
                  className="relative z-10 space-y-6"
                >
                  {/* Title */}
                  <h2 className="text-3xl sm:text-4xl font-bold text-white text-center">
                    Contact <span className="text-[#FBBF24]">Us</span>
                  </h2>
                  <p className="text-center text-gray-200 text-sm sm:text-xs mb-4">
                    We’d love to hear from you! Fill out the form below and
                    we’ll get back to you soon.
                  </p>

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 sm:p-3 text-sm sm:text-base rounded-xl bg-white/20 text-white placeholder-gray-300 
               border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#8de1b3] focus:bg-white/30 transition"
                    />

                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 sm:p-3 text-sm sm:text-base rounded-xl bg-white/20 text-white placeholder-gray-300 
               border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#8de1b3] focus:bg-white/30 transition"
                    />
                  </div>

                  {/* Contact Number */}
                  <input
                    type="number"
                    name="contact"
                    placeholder="Contact Number"
                    value={formData.contact}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 sm:p-3 text-sm sm:text-base rounded-xl bg-white/20 text-white 
             placeholder-gray-300 border border-white/30 focus:outline-none 
             focus:ring-2 focus:ring-[#8de1b3] focus:bg-white/30 transition"
                  />

                  {/* Subject */}
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 sm:p-3 text-sm sm:text-base rounded-xl bg-white/20 text-white 
             placeholder-gray-300 border border-white/30 focus:outline-none 
             focus:ring-2 focus:ring-[#8de1b3] focus:bg-white/30 transition"
                  />

                  {/* Message */}
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows="3"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 sm:p-3 text-sm sm:text-base rounded-xl bg-white/20 text-white 
             placeholder-gray-300 border border-white/30 focus:outline-none 
             focus:ring-2 focus:ring-[#8de1b3] focus:bg-white/30 transition"
                  />

                  {/* Consent */}
                  <div className="text-sm sm:text-base">
                    <ConsentForm agree={agree} setAgree={setAgree} />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-2 sm:py-3 text-sm sm:text-base rounded-xl bg-[#FBBF24] 
             text-[#17565D] font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] 
             active:scale-95 transition-all duration-300 ${
               isLoading ? "opacity-50 cursor-not-allowed" : ""
             }`}
                  >
                    {isLoading ? "Submitting..." : "Submit"}
                  </button>
                </form>
              </div>
            </div>

            {/* RIGHT — GET IN TOUCH */}
            <div className="lg:w-1/2">
              <div className="bg-white rounded-2xl p-8 shadow-xl h-full">
                {/* ✅ TWO COLUMN LAYOUT */}
                <div className="grid grid-cols-1  gap-8 items-center">
                  {/* ✅ LEFT — TEXT CONTENT */}
                  <div>
                    {/* Heading */}
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                      Get In Touch
                    </h2>

                    <p className="text-sm sm:text-base text-gray-600 mt-2 mb-6 leading-relaxed">
                      If you have any questions regarding VIP numbers, number
                      porting, or availability, our team at NumberATM is always
                      ready to assist you. Feel free to reach out to us anytime
                      for reliable and prompt support.
                    </p>

                    {/* ✅ CONTACT GRID */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      {/* Phone */}
                      <div className="flex items-start gap-3">
                        <div className="p-3 bg-[#17565D] rounded-lg">
                          <FaPhoneAlt className="text-[#F5C037] text-xl" />
                        </div>
                        <div>
                          <p className="text-gray-800 font-semibold">Phone</p>
                          <a
                            href="https://wa.me/+919722297222"
                            target="_blank"
                            className="text-gray-600 hover:underline text-sm"
                          >
                            +91-97222 97222
                          </a>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex items-start gap-3">
                        <div className="p-3 bg-[#17565D] rounded-lg">
                          <FaEnvelope className="text-[#F5C037] text-xl" />
                        </div>
                        <div>
                          <p className="text-gray-800 font-semibold">Email</p>
                          <a
                            href="mailto:info@numberatm.com"
                            className="text-gray-600 hover:underline text-sm"
                          >
                            info@numberatm.com
                          </a>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="flex items-start gap-3">
                        <div className="p-3 bg-[#17565D] rounded-lg">
                          <FaMapMarkerAlt className="text-[#F5C037] text-xl" />
                        </div>
                        <div>
                          <p className="text-gray-800 font-semibold">Address</p>
                          <p className="text-gray-600 text-sm">
                            Shop No 18, Sec 5 Chowk, <br />
                            Sheetla Mata Road, Gurugram – 122001
                          </p>
                        </div>
                      </div>
                      <div className="">
                        <p className="font-semibold text-gray-700 mb-3">
                          Social Media
                        </p>
                        <div className="flex gap-4 text-gray-700 text-xl">
                          <FaFacebookF
                            size={30}
                            className="cursor-pointer hover:text-[#F5C037]"
                          />
                          <FaTwitter
                            size={30}
                            className="cursor-pointer hover:text-[#F5C037]"
                          />
                          <FaYoutube
                            size={30}
                            className="cursor-pointer hover:text-[#F5C037]"
                          />
                          <AiFillInstagram
                            size={30}
                            className="cursor-pointer hover:text-[#F5C037]"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="rounded-lg overflow-hidden shadow-lg mt-6 w-full">
                      <iframe
                        title="NumberATm Location"
                        className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src="https://www.google.com/maps?q=Shop+No+18,+Sec+5+Chowk,+Sheetla+Mata+Road,+Gurugram+122001&z=15&output=embed"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ✅ BOTTOM — FULL WIDTH MAP */}
        </div>
      </div>
    </>
  );
};

export default ContactUs;
