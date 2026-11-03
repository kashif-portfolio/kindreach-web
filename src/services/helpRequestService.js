import api from './api';
export const listHelpRequests = async () => (await api.get('/help_requests/list.php')).data;
export const reviewHelpRequest = async (helpRequestID, status) => (await api.post('/help_requests/review.php', { helpRequestID, status })).data;
export const fulfillHelpRequest = async (helpRequestID, donationID) => (await api.post('/help_requests/fulfill.php', { helpRequestID, donationID })).data;

export const downloadDocument = async (params) => {
  try {
    const response = await api.get('/documents/download.php', { params, responseType: 'blob' });
    const url = URL.createObjectURL(response.data);
    const link = document.createElement('a');
    link.href = url;
    link.download = response.headers['content-disposition']?.match(/filename="([^"]+)"/)?.[1] || 'supporting-document';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch (err) {
    if (err.response?.data instanceof Blob) {
      try { const body = JSON.parse(await err.response.data.text()); throw new Error(body.message); }
      catch (parseError) { throw new Error(parseError.message || 'Could not download document'); }
    }
    throw err;
  }
};
