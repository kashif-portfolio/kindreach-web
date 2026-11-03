import React, { useState } from 'react';
import ConfirmModal from '../common/ConfirmModal';

export default function DeleteDonationModal({ isOpen, onClose, donation, onDelete }) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');
  const handleClose = () => { setError(''); onClose(); };
  const handleDelete = async () => {
    if (deleting) return;
    setDeleting(true);
    setError('');
    try {
      await onDelete(donation.id);
      handleClose();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Could not delete donation');
    } finally {
      setDeleting(false);
    }
  };
  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={handleClose}
      onConfirm={handleDelete}
      busy={deleting}
      error={error}
      closeOnConfirm={false}
      title="Delete Donation"
      description="Permanently delete this donation? Only available donations without requests can be deleted."
      confirmText="Delete"
      variant="danger"
    />
  );
}
