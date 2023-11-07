import axios from "./customize-axios";

const getAllUsersApi = () => {
  return axios.get("/users");
};

const getAllUserById = (id) => {
  return axios.get(`/users/${id}`);
};

const sortUser = (sortBy) => {
  return axios.get(`/users?sort=${sortBy}`);
};

const loginUserApi = ({ username, password }) => {
  return axios.post("/auth/login", { username, password });
};

export { loginUserApi, getAllUsersApi, getAllUserById, sortUser };
