import React from 'react';
import { ConfirmationModal } from '../base';
import submitalert from '../../../assets/images/are-you-sure.png';

const SubmitTestModal = ({ isOpen, onClose, onConfirm }) => (
  <ConfirmationModal
    isOpen={isOpen}
    onClose={onClose}
    onConfirm={onConfirm}
    title="Submit Test"
    message="Are you sure you want to submit the test?"
    confirmText="Submit"
    cancelText="Cancel"
    confirmStyle="bg-blue-600 hover:bg-blue-700"
    cancelStyle="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
    image={submitalert}
  />
);

export default SubmitTestModal;