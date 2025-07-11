import React from 'react';
import { ConfirmationModal } from '../base';
import submitalert from '../../../assets/images/are-you-sure.png';

const StartTestModal = ({ isOpen, onClose, onConfirm }) => (
  <ConfirmationModal
    isOpen={isOpen}
    onClose={onClose}
    onConfirm={onConfirm}
    title="Start Test"
    message="Are you sure you want to start the test?"
    confirmText="Start"
    cancelText="Cancel"
    confirmStyle="bg-blue-600 hover:bg-blue-700"
    cancelStyle="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
    image={submitalert}
  />
);

export default StartTestModal;