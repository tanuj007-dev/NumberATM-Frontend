import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaRegListAlt, FaSearch, FaSignOutAlt, FaUserAltSlash, FaUserShield,
} from 'react-icons/fa';
import {
  FiHome, FiUsers, FiSettings,
} from 'react-icons/fi';
import { PiMicrosoftExcelLogoDuotone } from 'react-icons/pi';
import {
  LuBadgePercent, LuCircleUser, LuClipboardList,
  LuContactRound,
  LuImagePlus, LuUsersRound,
} from "react-icons/lu";
import {
  MdContactMail, MdOutlineLocationCity, MdSecurityUpdate, MdSell,
} from 'react-icons/md';
import { CiText } from 'react-icons/ci';
import { BsTagFill } from 'react-icons/bs';
import { IoCreateOutline } from "react-icons/io5";
import { RiArticleLine } from "react-icons/ri";
import { BiChevronDown, BiChevronUp, BiMessageAltDetail, BiSearch } from "react-icons/bi";

const categorizedLinks = [
  {
    category: 'Dashboard',
    links: [
      { icon: <FiHome size={20} />, text: 'Back to Home', path: '/' },
      { icon: <LuClipboardList size={20} />, text: 'Number Dashboard', path: '/admin/dashboard' },
    ],
  },
  {
    category: 'Posters & Images',
    links: [
      { icon: <LuImagePlus size={20} />, text: 'Manage Posters', path: '/admin/posters' },
      { icon: <LuImagePlus size={20} />, text: 'Manage Store Images', path: '/admin/store-images' },
    ],
  },
  {
    category: 'Orders & Promotions',
    links: [
      { icon: <FaRegListAlt size={20} />, text: 'All Orders', path: '/admin/orders' },
      { icon: <IoCreateOutline size={20} />, text: 'Add Promo Code', path: '/admin/create-promo' },
      { icon: <LuBadgePercent size={20} />, text: 'Promo Codes', path: '/admin/promo-codes' },
    ],
  },
  {
    category: 'Margins',
    links: [
      { icon: <FaRegListAlt size={20} />, text: 'Margins', path: '/admin/range-margins' },
    ],
  },
  {
    category: 'Vendors & Clients',
    links: [
      { icon: <LuCircleUser size={20} />, text: 'Vendors', path: '/admin/vendors' },
      { icon: <FaUserShield size={20} />, text: 'Vendors Dashboard', path: '/admin/all-vendors' },
      { icon: <LuUsersRound size={20} />, text: 'Upload Vendors', path: '/admin/add-vendors' },
      { icon: <FaUserAltSlash size={20} />, text: 'Upload Clients', path: '/admin/upload-logos' },
    ],
  },
  {
    category: 'Contact',
    links: [
      { icon: <MdContactMail size={20} />, text: 'Contact Queries', path: '/admin/contact-queries' },
      { icon: <LuContactRound size={20} />, text: 'Number Enquiries', path: '/admin/enquiries' },
    ],
  },
  {
    category: 'Content Management',
    links: [
      { icon: <MdOutlineLocationCity size={20} />, text: 'City/State Management', path: '/admin/city-management' },
      { icon: <BiMessageAltDetail size={20} />, text: 'Meta Management', path: '/admin/meta-management' },
      { icon: <RiArticleLine size={20} />, text: 'Blogs', path: '/admin/blogs' },
    ],
  },
  {
    category: 'Number Management',
    links: [
      { icon: <FiSettings size={20} />, text: 'Add Numbers', path: '/admin/add-vip-number' },
      { icon: <CiText size={20} />, text: 'Add Raw Numbers', path: '/admin/add-numbers' },
      { icon: <MdSell size={20} />, text: 'Sold Updates', path: '/admin/sold-update' },
      { icon: <BsTagFill size={20} />, text: 'Sold Numbers', path: '/admin/sold-numbers' },
      { icon: <PiMicrosoftExcelLogoDuotone size={20} />, text: 'Upload With Vendors', path: '/admin/upload-numbers-with-vendors' },
      { icon: <PiMicrosoftExcelLogoDuotone size={20} />, text: 'Upload Numbers', path: '/admin/upload-numbers' },
    ],
  },
];

export default function Sidebar({ sidebarOpen, setModalVisible, sidebarCollapsed }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const getFilteredLinks = () => {
    if (!search.trim()) return categorizedLinks;

    const lowerSearch = search.toLowerCase();
    return categorizedLinks
      .map(cat => ({
        ...cat,
        links: cat.links.filter(link =>
          link.text.toLowerCase().includes(lowerSearch)
        ),
      }))
      .filter(cat => cat.links.length > 0);
  };

  const filteredCategories = getFilteredLinks();

  return (
    <aside
      className={`fixed sm:static top-0 left-0 h-screen ${sidebarCollapsed ? "w-16" : "w-64"} bg-[#17565D] text-white p-4 transition-transform transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0 max-h-screen z-50 py-6 ${sidebarCollapsed ? '' : 'pb-24'}`}
    >
      {!sidebarCollapsed ? (
        <h2 onClick={() => navigate('/admin')} className="text-xl font-semibold text-center cursor-pointer mb-4">
          NumberAtm
        </h2>
      ) : (
        <div className="mb-10" />
      )}

      {!sidebarCollapsed && (
        <>
          <div className='border-t-[0.2px] border-white w-full mb-3' />
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 rounded-md bg-gray-100 text-white border border-gray-200 pl-4"
            />
            <BiSearch className="absolute top-3 text-lg right-3 text-white" />
          </div>
        </>
      )}

      <ul className="space-y-2 text-xs md:text-sm max-h-full scrollbar-hide pb-8 overflow-y-auto">
        {filteredCategories.map((cat, idx) => (
          <li key={idx}>
            <div
              className="flex justify-between items-center cursor-pointer hover:bg-[#F5C037] p-2 rounded-md"
              onClick={() => toggleCategory(cat.category)}
            >
              {!sidebarCollapsed && <span className="font-medium text-nowrap">{cat.category}</span>}
              {!sidebarCollapsed && (
                <span>{expandedCategories[cat.category] ? <BiChevronUp className='text-sm md:text-lg'/> : <BiChevronDown className='text-sm md:text-lg'/>}</span>
              )}
            </div>
            {(expandedCategories[cat.category] || search) && (
              <ul className="ml-2 mt-1 space-y-1">
                {cat.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      to={link.path}
                      className="flex items-center gap-3 hover:bg-[#274A7B] p-2 rounded-md transition-all text-white"
                    >
                      {link.icon}
                      {!sidebarCollapsed && <span className='text-nowrap'>{link.text}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}

        <li className="mt-4">
          <button
            onClick={() => navigate('/admin/change-password')}
            className="flex items-center bg-transparent gap-3 w-full text-left hover:bg-[#F5C037] p-1 py-2 rounded-md transition-all"
          >
            <MdSecurityUpdate size={20} />
            {!sidebarCollapsed && <span>Change Password</span>}
          </button>
        </li>
        <li className="mt-4">
          <button
            onClick={() => setModalVisible(true)}
            className="flex items-center bg-transparent gap-3 w-full text-left hover:bg-[#F5C037] p-2 rounded-md transition-all"
          >
            <FaSignOutAlt size={20} />
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </li>
      </ul>
    </aside>
  );
}
