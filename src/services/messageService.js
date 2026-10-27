import api from './api';

export const sendMessage = async (userID, message) => {
  const response = await api.post('/messages/send_message.php', { userID, message });
  return response.data;
};

export const getMessages = async () => {
  const response = await api.get('/messages/get_messages.php');
  return response.data;
};