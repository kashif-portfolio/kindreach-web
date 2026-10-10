import React from 'react';
import ConfirmModal from '../common/ConfirmModal';

const DeleteDonorModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Delete Donor Account"
      description="This action is permanent. All donor data will be removed."
      confirmText="Delete"
      variant="danger"
    />
  );
};

export default DeleteDonorModal;