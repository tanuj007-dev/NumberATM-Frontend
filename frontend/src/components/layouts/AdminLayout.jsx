import { createContext, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { FiMenu, FiChevronLeft, FiHome, FiUsers, FiSettings, FiFileText } from 'react-icons/fi'; // Import icons
import Sidebar from '../Admin/Sidebar';
import toast, { Toaster } from 'react-hot-toast';
import ConfirmationModal from '../Confirmation';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
const AdminState = createContext();
function AdminLayout({setIsAdmin}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const mainRef = useRef(null);
  return (
    <AdminState.Provider value={{scrollToTop,mainRef, setModalVisible}}>
      <div className="flex font-poppins h-screen overflow-hidden">
      <Toaster />
      {/* Sidebar */}
      <div className='relative '>
      <Sidebar sidebarOpen={sidebarOpen} setModalVisible={setModalVisible} sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />
      {sidebarCollapsed?<AiOutlineMenuUnfold onClick={()=>setSidebarCollapsed(!sidebarCollapsed)} className={`absolute  cursor-pointer text-lg md:text-xl text-white z-50 ${sidebarCollapsed?"right-5":'right-2'} top-[5%]`}/>:
      <AiOutlineMenuFold onClick={()=>setSidebarCollapsed(!sidebarCollapsed)} className={`absolute  cursor-pointer text-lg md:text-xl text-white z-50 ${sidebarCollapsed?"right-5":'right-2'} top-[3%]`}/>}
      </div>

      {/* Overlay for small screen */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-[#17565D] bg-opacity-50 sm:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className={`flex-grow flex flex-col transition-all ${sidebarOpen ? 'ml-0' : 'ml-0'} `}>
        {/* Header */}
        <header className="bg-[#F5C037] p-4 text-[#17565D] flex items-center justify-between">
          <h1 className="text-2xl w-full flex justify-center">Admin Dashboard</h1>
          {/* Toggle Sidebar Button (visible on small scr eens) */}
          <button
            className="sm:hidden text-white bg-[#17565D] px-4 py-2 rounded-md"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <FiChevronLeft /> : <FiMenu />}
          </button>
        </header>

        {/* Scrollable Outlet */}
        <main ref={mainRef}  className="flex-grow overflow-auto bg-white">
          <Outlet />
        </main>
      </div>
      {modalVisible && <ConfirmationModal message={'Do you really want to log out?'} onConfirm={() => {
        localStorage.removeItem('NAAdminToken');
        setIsAdmin(false);
        toast.success('Logged Out!')
      }} onCancel={() => { setModalVisible(false) }} />}
    </div>
    </AdminState.Provider>
  );
}
export {AdminState}
export default AdminLayout;
