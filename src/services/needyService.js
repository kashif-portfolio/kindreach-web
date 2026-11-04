import api from "./api";

// Available donations ki list
export const getAvailableDonations = async () => {
  const response = await api.get("/needy/get_available_donations.php");
  return response.data;
};

// Donation ke liye request bhejo.
export const sendRequest = async (data) => {
  const response = await api.post("/needy/send_request.php", data);
  return response.data;
};

// Apni requests ki list
export const getMyRequests = async (needyID) => {
  const response = await api.get(`/needy/get_my_requests.php?needyID=${needyID}`);
  return response.data;
};

// General help request bhejo.
export const submitHelpRequest = async (data) => {
  const response = await api.post("/needy/submit_help_request.php", data, {
    headers: { "Content-Type": undefined },
  });
  return response.data;
};
