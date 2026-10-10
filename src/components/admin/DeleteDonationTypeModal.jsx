import React from 'react';
import ConfirmModal from '../common/ConfirmModal';

const DeleteDonationTypeModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Delete Donation Type"
      description="This donation type will be permanently removed."
      confirmText="Delete"
      variant="danger"
    />
  );
};

export default DeleteDonationTypeModal;