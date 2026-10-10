import React from 'react';
import ConfirmModal from '../common/ConfirmModal';

export default function DeleteDonationModal({ isOpen, onClose, onConfirm }) {
  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Delete Donation"
      description="This donation will be permanently removed from the platform."
      confirmText="Delete"
      variant="danger"
    />
  );
}