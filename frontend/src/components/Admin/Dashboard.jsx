import { Link } from "react-router-dom";
import React, { useContext } from 'react'
import { AdminState } from "../layouts/AdminLayout";
const PanelLink = ({ to, title, description, onClick }) => (
  <Link onClick={onClick?onClick:()=>{}} to={onClick?'/admin':to} className="bg-white shadow-xl rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300">
    <h2 className="text-2xl font-semibold text-gray-700 mb-4">{title}</h2>
    <p className="text-gray-600 mb-6">{description}</p>
  </Link>
);
function Dashboard() {
  const {setModalVisible} = useContext(AdminState);
  const links = [
    { text: 'Back to Home', path: '/', description: 'Navigate back to the homepage.' },
    { text: 'Number Dashboard', path: '/admin/dashboard', description: 'Analyze VIP Numbers using filters.' },
    {  text: 'Manage Posters', path: '/admin/posters', description: 'Add & manage posters on home page.' },
    { text: 'All Orders', path: '/admin/orders', description: 'View and manage all orders.' },
    { text: 'Add Promo Code', path: '/admin/create-promo', description: 'Create new promotional codes.' },
    { text: 'Promo Codes', path: '/admin/promo-codes', description: 'Manage all available promo codes.' },
    { text: 'Meta Management', path: '/admin/meta-management', description: 'Manage website meta data.' },
    {  text: 'Vendors', path: '/admin/vendors', description: 'View and manage registered vendors.' },
    { text: 'Vendors Dashboard', path: '/admin/all-vendors', description: 'Analyze vendor activities and statistics.' },
    { text: 'Upload Vendors', path: '/admin/add-vendors', description: 'Bulk upload vendor information.' },
    { text: 'Upload Clients', path: '/admin/upload-logos', description: 'Upload client logos and details.' },
    { text: 'Contact Queries', path: '/admin/contact-queries', description: 'Manage and respond to contact inquiries.' },
    { text: 'Add Numbers', path: '/admin/add-vip-number', description: 'Add new VIP numbers to the system.' },
    { text: 'Blogs', path: '/admin/add-blogs', description: 'Create and manage blog posts.' },
    { text: 'Add Raw Numbers', path: '/admin/add-numbers', description: 'Upload raw number data in bulk.' },
    { text: 'Sold Updates', path: '/admin/sold-update', description: 'Update the status of sold numbers.' },
    { text: 'Sold Numbers', path: '/admin/sold-numbers', description: 'View the list of sold VIP numbers.' },
    { text: 'Upload Numbers', path: '/admin/upload-numbers', description: 'Upload VIP numbers in bulk via Excel.' },
    { onClick:()=>setModalVisible(true), text: 'Logout', description: ' the admin panel.' },
  ];
    return (
      <div className="min-h-full flex flex-col items-center bg-[url(./assets/bg.jpg)] bg-cover bg-center   p-8">
        {/* <h1 className="text-4xl font-bold text-gray-800 mb-10"> Dashboard</h1> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-fullbg-[#17565D] ">
          {links // Filter links based on conditions
            .map((link, index) => (
              <PanelLink key={index} onClick={link.onClick} to={link.path} title={link.text} description={link.description} />
            ))}
        </div>
      </div>
    );
  };
  
  export default Dashboard;
  