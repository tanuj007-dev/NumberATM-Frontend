import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserAxiosAPI from "../../api/userAxiosAPI";
import { Appstate } from "../../App";
import NumberCards from "./Images";
const NotFoundPage = ({ back }) => {
  const { getOptimizedImage } = useContext(Appstate);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const [meta, setMeta] = useState({ title: "", tags: "", description: "" });
  const axios = UserAxiosAPI();
  useEffect(() => {
    axios.get(`/meta/Not Found`).then(({ data }) => {
      setMeta(data || { title: "", tags: "", description: "" });
    });
  }, []);
  return (
    <div className="flex flex-col items-center justify-center px-0 w-[100vw] py-16 text-center">
      <p className="text-xl md:text-2xl text-gray-500 mb-4">
        Oops! We couldn't find the page you're looking for.
      </p>
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6">
        Discover Our Premium Numbers
      </h2>
      <p className="text-base md:text-lg text-gray-600 mb-8 max-w-xl">
        Explore our handpicked collection of exclusive VIP numbers curated just for you.
      </p>
      <NumberCards woman={false} />
    </div>
  );
};

export default NotFoundPage;
