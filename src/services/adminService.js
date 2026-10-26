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
