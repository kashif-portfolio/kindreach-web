import React from 'react';
import ConfirmModal from '../common/ConfirmModal';

const RejectApplicantModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Reject Applicant"
      description="This needy person application will be rejected."
      confirmText="Reject"
      variant="danger"
    />
  );
};

export default RejectApplicantModal;