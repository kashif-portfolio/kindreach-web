import api from './api';

export const submitFeedback = async (data) => {
  const response = await api.post('/feedback/submit_feedback.php', data);
  return response.data;
};

export const getFeedbackList = async () => {
  const response = await api.get('/feedback/get_feedback.php');
  return response.data;
};