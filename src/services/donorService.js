import api from './api';

// Add new donation
export const addDonation = async (donationData) => {
  const response = await api.post('/donor/add_donation.php', donationData);
  return response.data;
};

// Get my donations
export const getMyDonations = async (donorID) => {
  const response = await api.get(`/donor/get_my_donations.php?donorID=${donorID}`);
  return response.data;
};

export const getDonationRequests = async (donorID) => {
  const response = await api.get(`/donor/get_donation_requests.php?donorID=${donorID}`);
  return response.data;
};

export const acceptRequest = async (requestID) => {
  const response = await api.post('/donor/accept_request.php', { requestID });
  return response.data;
};

export const declineRequest = async (requestID) => {
  const response = await api.post('/donor/decline_request.php', { requestID });
  return response.data;
};

export const getAcceptedRequests = async (donorID) => {
  const response = await api.get(`/donor/get_accepted_requests.php?donorID=${donorID}`);
  return response.data;
};

export const scheduleDelivery = async (data) => {
  const response = await api.post('/donor/schedule_delivery.php', data);
  return response.data;
};

export const getSchedules = async (donorID) => {
  const response = await api.get(`/donor/get_schedules.php?donorID=${donorID}`);
  return response.data;
};