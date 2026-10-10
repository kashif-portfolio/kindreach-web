import React from 'react';
import ConfirmModal from '../common/ConfirmModal';

const VerifyApplicantModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Verify Applicant"
      description="This needy person will be marked as verified and can request help."
      confirmText="Verify"
      variant="success"
    />
  );
};

export default VerifyApplicantModal;