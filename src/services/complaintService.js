import api from "./api";

// Complaint save karo.
export const submitComplaint = async (userID, subject, description) => {
  const res = await api.post("/complaints/submit_complaint.php", {
    userID,
    subject,
    description,
  });
  return res.data;
};
