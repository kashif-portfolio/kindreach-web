import React from 'react';
import ConfirmModal from '../common/ConfirmModal';

const DeleteRecordModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Delete Record"
      description="This record will be permanently deleted. This action cannot be undone."
      confirmText="Delete"
      variant="danger"
    />
  );
};

export default DeleteRecordModal;