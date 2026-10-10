import React from 'react';
import ConfirmModal from '../common/ConfirmModal';

const ApproveDonorModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Approve Donor Account"
      description="This donor will be able to log in and post donations."
      confirmText="Approve"
      variant="success"
    />
  );
};

export default ApproveDonorModal;