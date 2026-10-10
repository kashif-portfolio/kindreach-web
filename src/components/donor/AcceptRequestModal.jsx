import React from 'react';
import ConfirmModal from '../common/ConfirmModal';

export default function AcceptRequestModal({ isOpen, onClose, onAccept, request }) {
  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={() => onAccept?.(request?.id)}
      title="Accept Request"
      description="You are about to accept this donation request. The needy person will be notified."
      confirmText="Accept"
      variant="success"
    />
  );
}