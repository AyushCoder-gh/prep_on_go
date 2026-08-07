import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const getUsers = async () => {
  const response = await axios.get(`${BASE_URL}/users`);
  return response.data;
};

export const createUser = async (userData) => {
  const response = await axios.post(`${BASE_URL}/users`, userData);
  return response.data;
};