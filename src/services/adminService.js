import api from './api';

export const getAllDonors = async () => {
  const response = await api.get('/admin/get_all_donors.php');
  return response.data;
};

export const approveDonor = async (userID) => {
  const response = await api.post('/admin/approve_donor.php', { userID });
  return response.data;
};

export const blockDonor = async (userID) => {
  const response = await api.post('/admin/block_donor.php', { userID });
  return response.data;
};

export const getAllNeedy = async () => {
  const response = await api.get('/admin/get_all_needy.php');
  return response.data;
};

export const verifyNeedy = async (needyID) => {
  const response = await api.post('/admin/verify_needy.php', { needyID });
  return response.data;
};

export const getAllRequests = async () => {
  const response = await api.get('/admin/get_all_requests.php');
  return response.data;
};

export const rejectNeedy = async (needyID) => {
  const response = await api.post('/admin/reject_needy.php', { needyID });
  return response.data;
};

export const deleteNeedy = async (needyID) => {
  const response = await api.post('/admin/delete_needy.php', { needyID });
  return response.data;
};

export const getDonationTypes = async () => {
  const response = await api.get('/admin/get_donation_types.php');
  return response.data;
};

export const addDonationType = async (typeName, description) => {
  const response = await api.post('/admin/add_donation_type.php', {
    typeName,
    description,
  });
  return response.data;
};

export const deleteDonationType = async (typeID) => {
  const response = await api.post('/admin/delete_donation_type.php', { typeID });
  return response.data;
};

export const updateRequestStatus = async (requestID, status) => {
  const response = await api.post("/admin/update_request_status.php", {
    requestID,
    status,
  });
  return response.data;
};

export const getAllDonations = async () => {
  const response = await api.get("/admin/get_all_donations.php");
  return response.data;
};

export const assignDonation = async (donationID, needyID) => {
  const response = await api.post("/admin/assign_donation.php", {
    donationID,
    needyID,
  });
  return response.data;
};

export const generateReport = async (reportType, fromDate, toDate) => {
  const response = await api.post("/admin/generate_report.php", {
    reportType,
    fromDate,
    toDate,
  });
  return response.data;
};

export const sendNotification = async (title, message, sendTo) => {
  const response = await api.post("/admin/send_notification.php", {
    title,
    message,
    sendTo,
  });
  return response.data;
};

// MUST be userID 
export const getNotifications = async (userID) => {
  const url =
    userID != null && userID !== ""
      ? `/admin/get_notifications.php?userID=${userID}`
      : `/admin/get_notifications.php`;
  const response = await api.get(url);
  return response.data;
};

export const getComplaints = async () => {
  const res = await api.get("/admin/get_complaints.php");
  return res.data;
};

export const resolveComplaint = async (complaintID, adminNote = "") => {
  const res = await api.post("/admin/resolve_complaint.php", {
    complaintID,
    adminNote,
  });
  return res.data;
};
export const updateDonor = async (donor) => (await api.post('/admin/update_donor.php', {
  userID: donor.id, name: donor.name, email: donor.email, phone: donor.phone, address: donor.location,
})).data;
export const deleteDonor = async (userID) => (await api.post('/admin/delete_donor.php', { userID })).data;
export const updateDonationType = async (item) => (await api.post('/admin/update_donation_type.php', {
  typeID: item.id, typeName: item.title, description: item.description,
})).data;
export const registerNeedyByAdmin = async (data) => (await api.post('/admin/register_needy.php', data)).data;
