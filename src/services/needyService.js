import api from './api';

// Available donations (needy browse)
export const getAvailableDonations = async () => {
  const response = await api.get('/needy/get_available_donations.php');
  return response.data;
};

// Send request on a donation
export const sendRequest = async (data) => {
  const response = await api.post('/needy/send_request.php', data);
  return response.data;
};

// My requests (needy)
export const getMyRequests = async (needyID) => {
  const response = await api.get(`/needy/get_my_requests.php?needyID=${needyID}`);
  return response.data;
};