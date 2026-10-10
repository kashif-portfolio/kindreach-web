import React from 'react';
import ConfirmModal from '../common/ConfirmModal';

const BlockDonorModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Block Donor"
      description="This donor will no longer be able to post donations or log in."
      confirmText="Block"
      variant="danger"
    />
  );
};

export default BlockDonorModal;