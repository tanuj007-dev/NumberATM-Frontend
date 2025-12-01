import { Link } from "react-router-dom";
import CategoriesAndStates from "./CatAndCities";
import { FaFacebook } from "react-icons/fa";
import { BsInstagram, BsYoutube } from "react-icons/bs";

const Footer = () => (
  <footer className="w-full bg-[url(./assets/bg.jpg)] bg-cover bg-center pt-0">
    <div className="w-full h-full bg-[#17565DE6] pt-12 text-white pb-8 md:pb-12 px-4 md:px-6 lg:px-16 xl:px-32">

      <CategoriesAndStates />

      <div className="flex flex-wrap justify-center gap-4 mt-8 md:gap-6 lg:gap-8 text-sm md:text-base">
        
        {/* Company Links */}
        <div className="flex-1">
          <h3 className="font-bold text-base md:text-xl mb-2 md:mb-3">Company</h3>
          <ul className="space-y-2 text-nowrap">
            <li><Link to="/" className="text-gray-200 hover:text-[#F5C037]">Home</Link></li>
            <li><Link to="/about-us" className="text-gray-200 hover:text-[#F5C037]">About Us</Link></li>
            <li><Link to="/service" className="text-gray-200 hover:text-[#F5C037]">Services</Link></li>
            <li><Link to="/how-it-works" className="text-gray-200 hover:text-[#F5C037]">How It Works</Link></li>
            <li><Link to="/contact" className="text-gray-200 hover:text-[#F5C037]">Contact Us</Link></li>
          </ul>
        </div>

        {/* Legal Links */}
        <div className="flex-1">
          <h3 className="font-bold text-base md:text-xl mb-2 md:mb-3">Legal</h3>
          <ul className="space-y-2 text-nowrap">
            <li><Link to="/Returns-and-Refund-Policy" className="text-gray-200 hover:text-[#F5C037]">Return & Refund</Link></li>
            <li><Link to="/Terms-and-Condition" className="text-gray-200 hover:text-[#F5C037]">Terms & Conditions</Link></li>
            <li><Link to="/Privacy-Policy" className="text-gray-200 hover:text-[#F5C037]">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="flex-1">
          <h3 className="font-bold text-base md:text-xl mb-2 md:mb-3">Follow Us</h3>
          <ul className="space-y-2">
            
            <li>
              <Link
                to="https://www.facebook.com/beavvip"
                target="_blank"
                className="text-[#E5E2E2] hover:text-[#F5C037] flex items-center gap-2 "
              >
                <FaFacebook className="text-[#F5C037]" />
                Facebook
              </Link>
            </li>

            <li>
              <Link
                to="https://www.youtube.com/@vvipnumbers"
                target="_blank"
                className=" flex items-center gap-2 text-[#E5E2E2] hover:text-[#F5C037]"
              >
                <BsYoutube className="text-[#F5C037]" />
                YouTube
              </Link>
            </li>

            <li>
              <Link
                to="https://www.instagram.com/vipnumbers_ashishyadav/"
                target="_blank"
                className="text-[#E5E2E2] hover:text-[#F5C037] flex items-center gap-2 "
              >
                <BsInstagram className="text-[#F5C037]" />
                Instagram
              </Link>
            </li>

          </ul>
        </div>

        {/* Address */}
        <div className="flex-1">
          <h3 className="font-bold text-left text-nowrap text-base md:text-xl mb-2 md:mb-3">
            Address
          </h3>

          <p className="text-nowrap">Shop No 18, Sec 5 Chowk</p>
          <p>Sheetla Mata Road, Gurugram - 122001</p>

          <p className="mt-4">
            Email:{" "}
            <Link
              to="mailto:info@numberatm.com"
              target="_blank"
              className="text-[#F5C037] hover:underline"
            >
              info@numberatm.com
            </Link>
          </p>

          <p className="text-nowrap">
            Phone:{" "}
            <Link
              to="https://wa.me/+919511195111"
              target="_blank"
              className="text-[#F5C037] hover:underline"
            >
              +91-95111 95111
            </Link>
          </p>

          <p className="text-nowrap">GST : 06AAECV9458Q2ZB</p>
        </div>

      </div>

      <div className="border-t-[0.6px] border-[#F5C037] mt-6 md:mt-10"></div>

      <div className="text-center mt-6 md:mt-10 text-xs md:text-sm text-gray-200">
        <p>
          &copy; 2012 - {new Date().getFullYear() - 2000} Fine Digits. All rights reserved.
        </p>
      </div>

    </div>
  </footer>
);

export default Footer;
