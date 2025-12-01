import axios from "axios";
import Cookies from 'js-cookie'
const UserAxiosAPI = () => {
  const token =  Cookies.get("NumberAtmUser");
  return axios.create({
    baseURL: window.location.hostname === "localhost"
  ? "https://www.numberatm.com/api" // Local development URL
  : window.location.hostname.includes("vercel")?"https://numberatm.com/api":"/api", 
    headers: {
      Authorization: `Bearer ${token ? `${token}` : ""}`,
    },
  });
};

export default UserAxiosAPI;
