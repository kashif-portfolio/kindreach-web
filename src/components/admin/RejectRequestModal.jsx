import React from 'react';
import ConfirmModal from '../common/ConfirmModal';

const RejectRequestModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Reject Request"
      description="This donation request will be rejected."
      confirmText="Reject"
      variant="danger"
    />
  );
};

export default RejectRequestModal;