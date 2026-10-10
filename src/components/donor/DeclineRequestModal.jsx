import React from 'react';
import ConfirmModal from '../common/ConfirmModal';

export default function DeclineRequestModal({ isOpen, onClose, onDecline, request }) {
  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={() => onDecline?.(request?.id)}
      title="Decline Request"
      description="This person will be notified that their request was not accepted."
      confirmText="Decline"
      variant="danger"
    />
  );
}