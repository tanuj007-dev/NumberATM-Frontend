import UserAxiosAPI from "../../api/userAxiosAPI";

const axios = UserAxiosAPI();
const fetchNumbers = async (page = 1, limit = 10) => {
    const { data } = await axios.get(`vip-numbers?page=${page}&limit=${limit}`);
    return data;
}
export { fetchNumbers }; 