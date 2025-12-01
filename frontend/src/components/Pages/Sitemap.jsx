import  { useEffect, useState } from "react";
import UserAxiosAPI from "../../api/userAxiosAPI";
const sitemapData = {
    index: [
        { name: "Home", url: "/" },
        { name: "VIP Numbers", url: "/vip-numbers" },
        { name: "Numerology VIP Numbers", url: "/numerology-vip-numbers" },
        { name: "Favorites", url: "/favorites" },
        { name: "Orders", url: "/orders" },
        { name: "Profile", url: "/profile" },
        { name: "Clientele", url: "/clientele" },
    ],
    categories: [
        { name: "NUMEROLOGY WITHOUT 2 4 8", url: "/numerology-vip-numbers?category=Numerology-Without-2-4-8" },
        { name: "PENTA NUMBERS", url: "/numerology-vip-numbers?category=PENTA-NUMBERS" },
        { name: "HEXA NUMBER", url: "/numerology-vip-numbers?category=HEXA-NUMBER" },
        { name: "SEPTA 9XY AAA AAA A", url: "/numerology-vip-numbers?category=SEPTA-9XY-AAA-AAA-A" },
        { name: "OCTA NUMBERS", url: "/numerology-vip-numbers?category=OCTA-NUMBERS" },
        { name: "ENDING AAAA NUMBERS", url: "/numerology-vip-numbers?category=ENDING-AAAA-NUMBERS" },
        { name: "AB AB XXXXXX 1212", url: "/numerology-vip-numbers?category=AB-AB-XXXXXX-1212" },
        { name: "ABC ABC NUMBERS", url: "/numerology-vip-numbers?category=ABC-ABC-NUMBERS" },
        { name: "MIRROR NUMBERS", url: "/numerology-vip-numbers?category=MIRROR-NUMBERS" },
        { name: "SEMI MIRROR NUMBERS", url: "/numerology-vip-numbers?category=SEMI-MIRROR-NUMBERS" },
        { name: "123456 NUMBERS", url: "/numerology-vip-numbers?category=123456-NUMBERS" },
        { name: "786 NUMBERS", url: "/numerology-vip-numbers?category=786-NUMBERS" },
        { name: "11 12 13 NUMBERS", url: "/numerology-vip-numbers?category=11-12-13-NUMBERS" },
        { name: "UNIQUE NUMBERS", url: "/numerology-vip-numbers?category=UNIQUE-NUMBERS" },
        { name: "AAA BBB", url: "/numerology-vip-numbers?category=AAA-BBB" },
        { name: "XY XY XY NUMBERS", url: "/numerology-vip-numbers?category=XY-XY-XY-NUMBERS" },
        { name: "DOUBLING NUMBERS", url: "/numerology-vip-numbers?category=DOUBLING-NUMBERS" },
        { name: "ENDING AAA NUMBERS", url: "/numerology-vip-numbers?category=ENDING-AAA-NUMBERS" },
        { name: "AB XYXYXYXY", url: "/numerology-vip-numbers?category=AB-XYXYXYXY" },
        { name: "ABCD ABCD NUMBERS", url: "/numerology-vip-numbers?category=ABCD-ABCD-NUMBERS" },
        { name: "AAAA BBBB NUMBERS", url: "/numerology-vip-numbers?category=AAAA-BBBB-NUMBERS" },
        { name: "3 DIGITS NUMBER", url: "/numerology-vip-numbers?category=3-DIGITS-NUMBER" },
        { name: "AB AB XY XY", url: "/numerology-vip-numbers?category=AB-AB-XY-XY" },
        { name: "AAA XY AAA", url: "/numerology-vip-numbers?category=AAA-XY-AAA" },
        { name: "AOOB COOD / ABOO CDOO / OOOAB", url: "/numerology-vip-numbers?category=AOOB-COOD-ABOO-CDOO-OOOAB" },
        { name: "AAAA MIDDLE", url: "/numerology-vip-numbers?category=AAAA-MIDDLE" },
        { name: "AO BO CO DO EO", url: "/numerology-vip-numbers?category=AO-BO-CO-DO-EO" },
        { name: "AAA MIDDLE", url: "/numerology-vip-numbers?category=AAA-MIDDLE" },
        { name: "AOO BOO / AOO BOO COO", url: "/numerology-vip-numbers?category=AOO-BOO-AOO-BOO-COO" },
        { name: "START A OOO B END A OOO B", url: "/numerology-vip-numbers?category=START-A-OOO-B-END-A-OOO-B" },
        { name: "AAAA XY AAAA", url: "/numerology-vip-numbers?category=AAAA-XY-AAAA" },
    ],
    states: [
        { name: "Andaman & Nicobar", url: "/vip-numbers-in-andaman-and-nicobar" },
        { name: "Andhra Pradesh", url: "/vip-numbers-in-andhra-pradesh" },
        { name: "Arunachal Pradesh", url: "/vip-numbers-in-arunachal-pradesh" },
        { name: "Assam", url: "/vip-numbers-in-assam" },
        { name: "Bihar", url: "/vip-numbers-in-bihar" },
        { name: "Chandigarh", url: "/vip-numbers-in-chandigarh" },
        { name: "Chhattisgarh", url: "/vip-numbers-in-chhattisgarh" },
        { name: "Dadra and Nagar Haveli", url: "/vip-numbers-in-dadra-and-nagar-haveli" },
        { name: "Daman and Diu", url: "/vip-numbers-in-daman-and-diu" },
        { name: "Delhi", url: "/vip-numbers-in-delhi" },
        { name: "Goa", url: "/vip-numbers-in-goa" },
        { name: "Gujarat", url: "/vip-numbers-in-gujarat" },
        { name: "Haryana", url: "/vip-numbers-in-haryana" },
        { name: "Himachal Pradesh", url: "/vip-numbers-in-himachal-pradesh" },
        { name: "Jammu & Kashmir", url: "/vip-numbers-in-jammu-and-kashmir" },
        { name: "Jharkhand", url: "/vip-numbers-in-jharkhand" },
        { name: "Karnataka", url: "/vip-numbers-in-karnataka" },
        { name: "Kerala", url: "/vip-numbers-in-kerala" },
        { name: "Ladakh", url: "/vip-numbers-in-ladakh" },
        { name: "Lakshadweep", url: "/vip-numbers-in-lakshadweep" },
        { name: "Madhya Pradesh", url: "/vip-numbers-in-madhya-pradesh" },
        { name: "Maharashtra", url: "/vip-numbers-in-maharashtra" },
        { name: "Manipur", url: "/vip-numbers-in-manipur" },
        { name: "Meghalaya", url: "/vip-numbers-in-meghalaya" },
        { name: "Mizoram", url: "/vip-numbers-in-mizoram" },
        { name: "Nagaland", url: "/vip-numbers-in-nagaland" },
        { name: "Odisha", url: "/vip-numbers-in-odisha" },
        { name: "Puducherry", url: "/vip-numbers-in-puducherry" },
        { name: "Punjab", url: "/vip-numbers-in-punjab" },
        { name: "Rajasthan", url: "/vip-numbers-in-rajasthan" },
        { name: "Sikkim", url: "/vip-numbers-in-sikkim" },
        { name: "Tamil Nadu", url: "/vip-numbers-in-tamil-nadu" },
        { name: "Telangana", url: "/vip-numbers-in-telangana" },
        { name: "Tripura", url: "/vip-numbers-in-tripura" },
        { name: "Uttar Pradesh", url: "/vip-numbers-in-uttar-pradesh" },
        { name: "Uttarakhand", url: "/vip-numbers-in-uttarakhand" },
        { name: "West Bengal", url: "/vip-numbers-in-west-bengal" },
    ],
    informational: [
        { name: "About Us", url: "/about-us" },
        { name: "Contact Us", url: "/contact" },
        { name: "How it Works", url: "/how-it-works" },
        { name: "Services", url: "/service" },
        { name: "Privacy Policy", url: "/Privacy-Policy" },
        { name: "Terms and Conditions", url: "/Terms-and-Condition" },
        { name: "Returns and Refund Policy", url: "/Returns-and-Refund-Policy" },
    ],
};

const SitemapPage = () => {
    const [blogs, setBlogs] = useState([]);
    const axios = UserAxiosAPI();
    const getBlgs = async () => {
        try {
            const { data } = await axios.get('/blogs');
            setBlogs(data);
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        getBlgs();
    }, []);
    return (
        <div className="w-full bg-white  mx-auto px-4 md:px-16 py-12 text-gray-800">
            <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-700">NumberAtm Sitemap</h1>
            {Object.entries(sitemapData).map(([section, links]) => (
                <div key={section} className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-700 border-b border-gray-200 pb-2 mb-4 capitalize">
                        {section.replace(/([A-Z])/g, " $1")}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {links.map((link) => (
                            <a
                                key={link.url}
                                href={link.url}
                                className="block p-4 rounded-lg shadow-sm hover:shadow-md transition hover:bg-blue-50 border border-gray-100 text-blue-600 font-medium"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>
            ))}
            <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-700 border-b border-gray-200 pb-2 mb-4 capitalize">
                    Blogs
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {blogs?.map((blog) => (
                        <a
                            target="_blank"
                            key={blog?.slug}
                            href={`/vip-numbers/blogs/${blog?.slug}`}
                            className="block p-4 rounded-lg shadow-sm hover:shadow-md transition hover:bg-blue-50 border border-gray-100 text-blue-600 font-medium"
                        >
                            {blog?.title}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SitemapPage;
