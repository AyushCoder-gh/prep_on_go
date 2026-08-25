import apiClient from "./apiClient";

export const getUsers = async () => {
  const response = await apiClient.get("/users");
  return response.data;
};

export const createUser = async (userData) => {
  const response = await apiClient.post("/users", userData);
  return response.data;
};

export const loginUser = async (loginData) => {
  const response = await apiClient.post("/login", loginData);
  return response.data;
};

export const getProfile = async () => {
  const response = await apiClient.get("/profile");
  return response.data;
}

export const deleteUser = async (userId) => {
  const response = await apiClient.delete(`/users/${userId}`);
  return response.data;
};