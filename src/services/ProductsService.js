import axios from "./customize-axios";

const fetchAllProducts = () => {
  return axios.get(`/products`);
};

// const loginUserApi = ({ username, password }) => {
//   return axios.post("/auth/login", { username, password });
// };

export { fetchAllProducts };
