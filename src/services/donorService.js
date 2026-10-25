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