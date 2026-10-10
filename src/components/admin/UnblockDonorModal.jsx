import React from 'react';
import ConfirmModal from '../common/ConfirmModal';

const UnblockDonorModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Unblock Donor"
      description="This donor will regain access to the platform."
      confirmText="Unblock"
      variant="success"
    />
  );
};

export default UnblockDonorModal;