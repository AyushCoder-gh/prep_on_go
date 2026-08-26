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

export const getQuestions = async () => {
  const response = await apiClient.get("/questions");
  return response.data;
};

export const getAdminQuestions = async () => {
  const response = await apiClient.get("/admin/questions");
  return response.data;
};

export const submitQuiz = async (answers) => {
  const response = await apiClient.post("/quiz/submit", {
    answers,
  });

  return response.data;
};

export const createQuestion = async (questionData) => {
  const response = await apiClient.post("/questions", questionData);
  return response.data;
};

export const updateQuestion = async (questionId, questionData) => {
  const response = await apiClient.put(
    `/questions/${questionId}`,
    questionData
  );

  return response.data;
};

export const deleteQuestion = async (questionId) => {
  const response = await apiClient.delete(
    `/questions/${questionId}`
  );

  return response.data;
};