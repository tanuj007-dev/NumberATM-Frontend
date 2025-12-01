import { Link, Outlet } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import UserAxiosAPI from '../../api/userAxiosAPI';
import { login } from '../../redux/user/userSlice';
import { lazy, Suspense, useContext, useEffect } from 'react';
import { setCart } from '../../redux/cart/cartSlice';
const Navbar = lazy(() => import('../Navbar'));
const Footer = lazy(() => import('../Homepage/Footer'));
const ScrollToTop = lazy(() => import('./ScrollToTop'));
import Cookies from 'js-cookie';
import { setFeaturedNumbers, setNumbers, setOriginalNumbers } from '../../redux/numbers/numberSlice';
import { fetchNumbers } from '../utils/fetchNumbers';
import { Appstate } from '../../App';
import { FaStore, FaWhatsapp } from 'react-icons/fa';
import { setFav } from '../../redux/favorites/favSlice';
const Gst = lazy(()=>import('../Homepage/Gst'));
function MainLayout() {
  const user = useSelector((state) => state?.user?.user);
  const { page, setTotal, setMargins } = useContext(Appstate);
  const dispatch = useDispatch();
  const axios = UserAxiosAPI();

  const fetchFeaturedNumbers = async () => {
    const { data } = await axios.get('vip-numbers/featured');
    dispatch(setFeaturedNumbers(data.data));
  }
  const checkLogin = async () => {
    try {
      const { data } = await axios.get('/user/check-login');
      dispatch(login(data?.user));
    } catch (e) {
      // console.log(e);
      if (Cookies.get('NumberAtmUser')) {
        // toast.error("Your Session Expired, please Login again!");
      }
    }
  }
  const getCart = async () => {
    try {
      const { data } = await axios.get('/cart');

      // Transform items to remove vipNumberId nesting
      const transformedItems = data.cart.items.map(item => ({
        ...item.vipNumberId, // Spread the vipNumberId properties
        _id: item.vipNumberId?._id, // Keep the item's original _id
      }));

      dispatch(setCart({items:transformedItems, totalPrice:data.totalPrice}));
    } catch (e) {
      console.log(e);
    }
  };
  const getFavs = async () => {
    try {
      const { data } = await axios.get('/fav');

      // Transform items to remove vipNumberId nesting
      const transformedItems = data.items.map(item => ({
        _id: item.vipNumberId, // Keep the item's original _id
      }));

      dispatch(setFav(transformedItems));
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (user) {
      getCart();
      getFavs();
    }
  }, [user])
  const currentNumbers = useSelector((state) => state.number.originalValue);
  useEffect(() => {
    const loadNumbers = async () => {
      const data = await fetchNumbers(page);
      dispatch(setOriginalNumbers([
        ...currentNumbers,
        ...data.data.filter(newItem =>
          !currentNumbers.some(existingItem => existingItem._id === newItem._id)
        )
      ]));
      setTotal(data.total)
    };
    loadNumbers();
  }, [page]);
  useEffect(() => {
    const loadNumbers = async () => {
      const data = await fetchNumbers();
      dispatch(setNumbers(data.data));;
    };
    loadNumbers();
  }, []);
  const getMargins = async () => {
    try {
      const { data } = await axios.get("/margins");
      setMargins(data);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getMargins();
  }, [])
  useEffect(() => {
    checkLogin();
    getMargins();
    fetchFeaturedNumbers();
  }, [])
  return (
    <div className="flex font-poppins bg-white flex-col w-full min-h-screen">
      <Suspense fallback={<div className="p-4">Loading Navbar...</div>}>
        <Navbar />
      </Suspense>
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/+919511195111"
        target="_blank"
        aria-label="Chat with us on WhatsApp"
        rel="noopener noreferrer"
        className="fixed bottom-3 right-14 bg-green-500 text-white p-2.5 z-[100] rounded-full shadow-lg hover:bg-green-600 transition"
      >
        <FaWhatsapp className="text-xl md:text-2xl" />
      </a>
      <ScrollToTop />
      <Link
        to="/numerology-vip-numbers"
        aria-label="Our Store"
        className="fixed bottom-3 right-1 bg-orange-500 hover:text-white text-white p-2.5 z-[100] rounded-full shadow-lg hover:scale-110 transition duration-300 before:absolute before:inset-0 before:bg-orange-400 before:blur-xl before:opacity-50 before:-z-10"
      >
        <FaStore className="text-xl md:text-2xl" />
      </Link>
      <Suspense fallback={null}>
        <ScrollToTop />
      </Suspense>

      <main className="flex-grow">
        <Outlet />
      </main>

      <Suspense fallback={<div className="p-4">Loading Footer...</div>}>
      <Gst/>
        <Footer />
      </Suspense>
    </div>
  );
}

export default MainLayout;


