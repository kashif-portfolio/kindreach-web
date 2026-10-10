import React from 'react';
import ConfirmModal from '../common/ConfirmModal';

const ApproveRequestModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Approve Request"
      description="This donation request will be approved."
      confirmText="Approve"
      variant="success"
    />
  );
};

export default ApproveRequestModal;