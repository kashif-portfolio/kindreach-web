import React from 'react';
import ConfirmModal from '../common/ConfirmModal';

const DeleteDonorModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Delete Donor Account"
      description="Only unused donor accounts can be deleted. Accounts with donations or complaint history must be blocked instead."
      confirmText="Delete"
      variant="danger"
    />
  );
};

export default DeleteDonorModal;