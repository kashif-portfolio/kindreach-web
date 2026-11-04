import api from "./api";

// Feedback save karo.
export const submitFeedback = async (data) => {
  const response = await api.post("/feedback/submit_feedback.php", data);
  return response.data;
};

// Recent feedback lao.
export const getFeedbackList = async () => {
  const response = await api.get("/feedback/get_feedback.php");
  return response.data;
};

// PHP session se user ki completed requests milti hain.
export const getCompletedRequests = async () => {
  const response = await api.get("/feedback/get_completed_requests.php");
  return response.data;
};
