import React from 'react';
import { ConfirmationModal } from '../base';
import submitalert from '../../../assets/images/are-you-sure.png';

const CancelTestModal = ({ isOpen, onClose, onLeave }) => (
  <ConfirmationModal
    isOpen={isOpen}
    onClose={onClose}
    onConfirm={onLeave}
    title="Leave Test"
    message="If you leave this page, your work will not be saved or submitted. Are you sure?"
    confirmText="Leave"
    cancelText="Continue"
    confirmStyle="bg-blue-600 hover:bg-blue-700"
    cancelStyle="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
    image={submitalert}
  />
);

export default CancelTestModal;