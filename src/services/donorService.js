import api from "./api";

// Donation delete karo.
export const deleteDonation = async (donationID) => {
  const response = await api.post("/donor/delete_donation.php", { donationID });
  return response.data;
};

// Nayi donation save karo.
export const addDonation = async (donationData) => {
  const response = await api.post("/donor/add_donation.php", donationData);
  return response.data;
};

// Donation ki changes save karo; owner PHP check karti hai.
export const updateDonation = async (donationData) => {
  const response = await api.post("/donor/update_donation.php", donationData);
  return response.data;
};

// Apni donations ki list
export const getMyDonations = async (donorID) => {
  const response = await api.get(`/donor/get_my_donations.php?donorID=${donorID}`);
  return response.data;
};

// Donor ki requests lao.
export const getDonationRequests = async (donorID) => {
  const response = await api.get(`/donor/get_donation_requests.php?donorID=${donorID}`);
  return response.data;
};

// Request accept karo.
export const acceptRequest = async (requestID) => {
  const response = await api.post("/donor/accept_request.php", { requestID });
  return response.data;
};

// Request reject karo.
export const declineRequest = async (requestID) => {
  const response = await api.post("/donor/decline_request.php", { requestID });
  return response.data;
};

// Accepted requests lao.
export const getAcceptedRequests = async (donorID) => {
  const response = await api.get(`/donor/get_accepted_requests.php?donorID=${donorID}`);
  return response.data;
};

// Delivery ka schedule save karo.
export const scheduleDelivery = async (data) => {
  const response = await api.post("/donor/schedule_delivery.php", data);
  return response.data;
};

// Apni deliveries lao.
export const getSchedules = async (donorID) => {
  const response = await api.get(`/donor/get_schedules.php?donorID=${donorID}`);
  return response.data;
};

// Delivery complete karo.
export const completeDelivery = async (scheduleID) => {
  const response = await api.post("/donor/complete_delivery.php", { scheduleID });
  return response.data;
};

// Delivered donations ki history lao.
export const getDonationHistory = async (donorID) => {
  const response = await api.get("/donor/get_donation_history.php", { params: { donorID } });
  return response.data;
};
