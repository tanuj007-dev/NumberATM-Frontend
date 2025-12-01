import { createContext, useState, Suspense, lazy } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import("quill/dist/quill.snow.css");
// Layouts
import MainLayout from "./components/layouts/MainLayout";
import AdminLayout from "./components/layouts/AdminLayout";

// Static or shared
import Loader from "./components/Loader";
import NotFoundPage from "./components/Pages/NotFound";
import AdminLoginPage from "./components/Admin/AdminLoginPage";
import FamilyPack from "./components/Pages/FamilyPack";

// Context
export const Appstate = createContext();

// Lazy loaded components
const HomePage = lazy(() => import("./components/HomePage"));
const CreateAccount = lazy(() => import("./components/CreateAccount"));
const Login = lazy(() => import("./components/Login"));
const CartCheckoutStepper = lazy(() => import("./components/Checkout/Steps"));
const OrdersList = lazy(() => import("./components/Checkout/MyOrders"));
const NumberDetails = lazy(() => import("./components/NumberDetails"));
const AboutUs = lazy(() => import("./components/Pages/AboutUs"));
const Services = lazy(() => import("./components/Pages/Services"));
const NumerologySearch = lazy(() =>
  import("./components/Pages/NumerologySearch")
);
const HowItWorks = lazy(() => import("./components/Pages/HowItWorks"));
const ContactUs = lazy(() => import("./components/Pages/ContactUs"));
const PublicClientLogos = lazy(() => import("./components/Pages/OurClients"));
const ProfilePage = lazy(() => import("./components/CompleteProfile"));
const FavoriteVIPNumbers = lazy(() => import("./components/Pages/Favorites"));
const VipNumberCards = lazy(() => import("./components/Pages/BlogPage"));
const VipArticleDetail = lazy(() =>
  import("./components/Pages/ArticlesDetails")
);
const VipNumbersByCity = lazy(() =>
  import("./components/Pages/VipNumbersByCIty")
);
const PaymentSuccess = lazy(() =>
  import("./components/Checkout/PaymentSuccess")
);
const PaymentFailed = lazy(() => import("./components/Checkout/PaymentFailed"));
const PaymentInProgress = lazy(() =>
  import("./components/Checkout/PaymentInProgress")
);
const PaymentCancelled = lazy(() =>
  import("./components/Checkout/PaymentCancelled")
);
const SitemapPage = lazy(() => import("./components/Pages/Sitemap"));
const VIPPhoneNumbers = lazy(() => import("./components/Pages/WhyUseVIP"));
const BestTelecomNetwork = lazy(() => import("./components/Pages/BestTelecom"));
const TipsAndTrick = lazy(() => import("./components/Pages/TipsAndTricks"));
const GetAirtel = lazy(() => import("./components/Pages/GetAirtel"));
const ChoiceNumber = lazy(() => import("./components/Pages/ChoiceNumber"));
const UniqueNumber = lazy(() => import("./components/Pages/UniqueNumber"));
const ExpensiveNumbers = lazy(() =>
  import("./components/Pages/ExpensiveNumbers")
);
const TermsAndCondition = lazy(() =>
  import("./components/Pages/Terms&Condition")
);
const RefundPolicy = lazy(() => import("./components/Pages/RefundPolicy"));
const PrivacyPolicy = lazy(() => import("./components/Pages/PrivacyPolicy"));

// Admin - lazy
const Dashboard = lazy(() => import("./components/Admin/Dashboard"));
const VIPNumbers = lazy(() => import("./components/Admin/VIPNumber"));
const ManageNumbers = lazy(() => import("./components/Admin/ManageNumbers"));
const Orders = lazy(() => import("./components/Admin/Orders"));
const VipNumbersDashboard = lazy(() =>
  import("./components/Admin/NumbersDashboard")
);
const VendorManagement = lazy(() => import("./components/Admin/AddMargins"));
const PosterUpload = lazy(() => import("./components/Admin/PosterUpload"));
const VipNumberUploader = lazy(() =>
  import("./components/Admin/AddTextFormatNumbers")
);
const UploadVendors = lazy(() => import("./components/Admin/AddVendors"));
const VendorDashboard = lazy(() => import("./components/Admin/AllVendors"));
const AdminClientLogos = lazy(() => import("./components/Admin/UploadLogos"));
const AdminPromoForm = lazy(() => import("./components/Admin/PromoCode"));
const PromoManagement = lazy(() =>
  import("./components/Admin/PromoCodeManager")
);
const SoldNumbersDashboard = lazy(() =>
  import("./components/Admin/SoldNumbers")
);
const NumberDelete = lazy(() => import("./components/Admin/NumberDeletion"));
const ContactList = lazy(() => import("./components/Admin/ContactQueries"));
const StoreImageUpload = lazy(() =>
  import("./components/Admin/StoreImageUploads")
);
const VIPNumberUpload = lazy(() =>
  import("./components/Admin/VIPNumberUpload")
);
const VIPNumberExcelUploadWithVendor = lazy(() =>
  import("./components/Admin/VIPNumberUploadWithVendors")
);
const CityManagement = lazy(() => import("./components/Admin/CityManagement"));
const EnquiryList = lazy(() => import("./components/Admin/Enquiry"));
const ForgotPassword = lazy(() => import("./components/Admin/ForgotPassword"));
const PriceBasedMarginsTable = lazy(() =>
  import("./components/Admin/RangeMargin")
);
const MetaManagement = lazy(() => import("./components/Admin/MetaManagement"));
const AddVipBlog = lazy(() => import("./components/Admin/AddBlog"));
const VipBlogList = lazy(() => import("./components/Admin/VipBlogList"));

function App() {
  const user = useSelector((state) => state.user.user);
  const [filteredNumbers, setFilteredNumbers] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [margins, setMargins] = useState([]);
  const [scrollToTop, setScrollToTop] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const getOptimizedImage = (url) =>
    url.replace("/upload/", "/upload/c_fill,w_auto,dpr_auto,f_auto,q_auto/");

  return (
    <Appstate.Provider
      value={{
        filteredNumbers,
        margins,
        setMargins,
        getOptimizedImage,
        setFilteredNumbers,
        page,
        setPage,
        total,
        setTotal,
        scrollToTop,
        setIsAdmin,
      }}
    >
      <div className="overflow-hidden font-roboto leading-[30px] text-[15px] bg-gradient-to-l from-[#f2f2f2] via-[#d3d1d1] to-[#f2f2f2] text-black">
        <BrowserRouter>
          <Toaster />
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="/checkout" element={<CartCheckoutStepper />} />
                <Route path="/register" element={<CreateAccount />} />
                <Route path="/service" element={<Services />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/orders" element={<OrdersList />} />
                <Route path="/sitemap" element={<SitemapPage />} />
                <Route
                  path="/profile"
                  element={user ? <ProfilePage /> : <NotFoundPage />}
                />
                <Route
                  path="/favorites"
                  element={user ? <FavoriteVIPNumbers /> : <NotFoundPage />}
                />
                <Route
                  path="/numerology-vip-numbers"
                  element={<NumerologySearch />}
                />
                <Route
                  path="/store"
                  element={<Navigate to="/numerology-vip-numbers" />}
                />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/vip-numbers" element={<VipNumberCards />} />
                <Route path="/vip-numbers/:id" element={<VipArticleDetail />} />
                <Route path="/:slug" element={<VipNumbersByCity />} />
                <Route
                  path="/Why-we-should-use-VIP-phone-numbers-in-india"
                  element={<VIPPhoneNumbers />}
                />
                <Route
                  path="/Which-telephone-network-is-best-in-india"
                  element={<BestTelecomNetwork />}
                />
                <Route
                  path="/Tips-tricks-to-get-a-VIP-number-or-fancy-phone-number"
                  element={<TipsAndTrick />}
                />
                <Route
                  path="/How-can-I-get-Airtel-VIP-number"
                  element={<GetAirtel />}
                />
                <Route
                  path="/Can-I-get-the-SIM-number-of-my-choice"
                  element={<ChoiceNumber />}
                />
                <Route
                  path="/How-can-I-get-a-unique-mobile-number"
                  element={<UniqueNumber />}
                />
                <Route
                  path="/Most-Expensive-Mobile-Numbers-in-India"
                  element={<ExpensiveNumbers />}
                />
                <Route path="/Privacy-Policy" element={<PrivacyPolicy />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route
                  path="/payment-cancelled"
                  element={<PaymentCancelled />}
                />
                <Route path="/payment-failed" element={<PaymentFailed />} />
                <Route
                  path="/payment-in-progress"
                  element={<PaymentInProgress />}
                />
                <Route
                  path="/Returns-and-Refund-Policy"
                  element={<RefundPolicy />}
                />
                <Route
                  path="/Terms-and-Condition"
                  element={<TermsAndCondition />}
                />
                <Route path="/vip-number/:id" element={<NumberDetails />} />
                <Route path="/clientele" element={<PublicClientLogos />} />
                <Route path="/login" element={<Login checkout={false} />} />
                <Route
                  path="/not-found"
                  element={<NotFoundPage back={"/"} />}
                />
                <Route path="*" element={<NotFoundPage back={"/"} />} />
                <Route path="/family-pack" element={<FamilyPack />} />
              </Route>

              <Route
                path="/admin"
                element={
                  isAdmin ? (
                    <AdminLayout isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
                  ) : (
                    <AdminLoginPage setAdmin={setIsAdmin} />
                  )
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="sold-update" element={<NumberDelete />} />
                <Route path="contact-queries" element={<ContactList />} />
                <Route path="enquiries" element={<EnquiryList />} />
                <Route path="sold-numbers" element={<SoldNumbersDashboard />} />
                <Route path="create-promo" element={<AdminPromoForm />} />
                <Route path="promo-codes" element={<PromoManagement />} />
                <Route path="upload-logos" element={<AdminClientLogos />} />
                <Route path="posters" element={<PosterUpload />} />
                <Route path="store-images" element={<StoreImageUpload />} />
                <Route path="change-password" element={<ForgotPassword />} />
                <Route
                  path="range-margins"
                  element={<PriceBasedMarginsTable />}
                />
                <Route path="meta-management" element={<MetaManagement />} />
                <Route path="city-management" element={<CityManagement />} />
                <Route path="upload-numbers" element={<VIPNumberUpload />} />
                <Route
                  path="upload-numbers-with-vendors"
                  element={<VIPNumberExcelUploadWithVendor />}
                />
                <Route path="add-vendors" element={<UploadVendors />} />
                <Route
                  path="add-blogs"
                  element={
                    <Suspense
                      fallback={
                        <div className="p-10 text-center">
                          Loading editor...
                        </div>
                      }
                    >
                      <AddVipBlog />
                    </Suspense>
                  }
                />
                <Route
                  path="blogs/edit/:id"
                  element={
                    <Suspense
                      fallback={
                        <div className="p-10 text-center">
                          Loading editor...
                        </div>
                      }
                    >
                      <AddVipBlog />
                    </Suspense>
                  }
                />
                <Route path="blogs" element={<VipBlogList />} />
                <Route path="all-vendors" element={<VendorDashboard />} />
                <Route path="vendors" element={<VendorManagement />} />
                <Route path="add-numbers" element={<VipNumberUploader />} />
                <Route path="dashboard" element={<VipNumbersDashboard />} />
                <Route path="orders" element={<Orders />} />
                <Route path="vip-numbers" element={<ManageNumbers />} />
                <Route path="add-vip-number" element={<VIPNumbers />} />
                <Route path="*" element={<NotFoundPage back={"/admin"} />} />
              </Route>
              <Route path="*" element={<NotFoundPage back="/" />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </div>
    </Appstate.Provider>
  );
}

export default App;
