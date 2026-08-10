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

export const loginUser = async (loginData) => {
  const response = await axios.post(
    `${BASE_URL}/login`,
    loginData
  );

  return response.data;
};

export const getProfile = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${BASE_URL}/profile`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deleteUser = async (userId) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(
    `${BASE_URL}/users/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}