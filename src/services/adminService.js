import api from "./api";

// Donors ki list lao.
export const getAllDonors = async () => {
  const response = await api.get("/admin/get_all_donors.php");
  return response.data;
};

// Donor approve karo.
export const approveDonor = async (userID) => {
  const response = await api.post("/admin/approve_donor.php", { userID });
  return response.data;
};

// Donor block karo.
export const blockDonor = async (userID) => {
  const response = await api.post("/admin/block_donor.php", { userID });
  return response.data;
};

// Needy users ki list lao.
export const getAllNeedy = async () => {
  const response = await api.get("/admin/get_all_needy.php");
  return response.data;
};

// Needy profile verify karo.
export const verifyNeedy = async (needyID) => {
  const response = await api.post("/admin/verify_needy.php", { needyID });
  return response.data;
};

// Donation requests lao.
export const getAllRequests = async () => {
  const response = await api.get("/admin/get_all_requests.php");
  return response.data;
};

// Needy profile reject karo.
export const rejectNeedy = async (needyID) => {
  const response = await api.post("/admin/reject_needy.php", { needyID });
  return response.data;
};

// Needy account delete karo.
export const deleteNeedy = async (needyID) => {
  const response = await api.post("/admin/delete_needy.php", { needyID });
  return response.data;
};

// Donation categories lao.
export const getDonationTypes = async () => {
  const response = await api.get("/admin/get_donation_types.php");
  return response.data;
};

// Nayi category save karo.
export const addDonationType = async (typeName, description) => {
  const response = await api.post("/admin/add_donation_type.php", {
    typeName,
    description,
  });
  return response.data;
};

// Category delete karo.
export const deleteDonationType = async (typeID) => {
  const response = await api.post("/admin/delete_donation_type.php", { typeID });
  return response.data;
};

// Request ka status update karo.
export const updateRequestStatus = async (requestID, status) => {
  const response = await api.post("/admin/update_request_status.php", {
    requestID,
    status,
  });
  return response.data;
};

// Sab donations ki list lao.
export const getAllDonations = async () => {
  const response = await api.get("/admin/get_all_donations.php");
  return response.data;
};

// Donation assign karo.
export const assignDonation = async (donationID, needyID) => {
  const response = await api.post("/admin/assign_donation.php", {
    donationID,
    needyID,
  });
  return response.data;
};

// Selected dates ki report lao.
export const generateReport = async (reportType, fromDate, toDate) => {
  const response = await api.post("/admin/generate_report.php", {
    reportType,
    fromDate,
    toDate,
  });
  return response.data;
};

// Notification bhejo.
export const sendNotification = async (title, message, sendTo) => {
  const response = await api.post("/admin/send_notification.php", {
    title,
    message,
    sendTo,
  });
  return response.data;
};

// Yahan user ID bhejein.
export const getNotifications = async (userID) => {
  const url =
    userID != null && userID !== ""
      ? `/admin/get_notifications.php?userID=${userID}`
      : `/admin/get_notifications.php`;
  const response = await api.get(url);
  return response.data;
};

// Complaints ki list lao.
export const getComplaints = async () => {
  const res = await api.get("/admin/get_complaints.php");
  return res.data;
};

// Complaint ka jawab save karo.
export const resolveComplaint = async (complaintID, adminNote = "") => {
  const res = await api.post("/admin/resolve_complaint.php", {
    complaintID,
    adminNote,
  });
  return res.data;
};

// Donor ki details save karo.
export const updateDonor = async (donor) => {
  const response = await api.post("/admin/update_donor.php", {
    userID: donor.id,
    name: donor.name,
    email: donor.email,
    phone: donor.phone,
    address: donor.location,
  });
  return response.data;
};

// Donor account delete karo.
export const deleteDonor = async (userID) => {
  const response = await api.post("/admin/delete_donor.php", { userID });
  return response.data;
};

// Category ki details save karo.
export const updateDonationType = async (item) => {
  const response = await api.post("/admin/update_donation_type.php", {
    typeID: item.id,
    typeName: item.title,
    description: item.description,
  });
  return response.data;
};

// Admin se needy account banao.
export const registerNeedyByAdmin = async (data) => {
  const response = await api.post("/admin/register_needy.php", data);
  return response.data;
};

// Dashboard ka data lao.
export const getDashboard = async () => {
  const response = await api.get("/admin/get_dashboard.php");
  return response.data;
};

// Admin ki donor registration API
export const registerDonorByAdmin = async (data) => {
  const response = await api.post("/admin/register_donor.php", data);
  return response.data;
};
