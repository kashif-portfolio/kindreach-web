import api from './api';

// Logged-in user ki apni conversations.
export const getConversations = async () => {
  const response = await api.get('/messages/get_conversations.php');
  return response.data;
};

// Selected donation request ke private messages.
export const getMessages = async (requestID) => {
  const response = await api.get('/messages/get_messages.php', { params: { requestID } });
  return response.data;
};

// Sender ID backend session se leta hai.
export const sendMessage = async (requestID, message) => {
  const response = await api.post('/messages/send_message.php', { requestID, message });
  return response.data;
};
