import React from 'react';
import Modal from './Modal';

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmStyle = "bg-blue-600 hover:bg-blue-700",
  cancelStyle = "border border-gray-300 text-gray-700 hover:bg-gray-50",
  image = null
}) => (
  <Modal isOpen={isOpen} onClose={onClose} className="w-[300px] md:w-[500px]">
    {image && (
      <img src={image} alt={title} className="w-40 mx-auto mb-4" />
    )}
    <h3 className="text-lg font-semibold text-center mb-2">{title}</h3>
    <p className="text-center text-gray-600 mb-6">{message}</p>
    <div className="flex justify-end gap-4">
      <button
        onClick={onClose}
        className={`px-4 py-2 rounded-full ${cancelStyle}`}
      >
        {cancelText}
      </button>
      <button
        onClick={onConfirm}
        className={`px-4 py-2 rounded-full text-white ${confirmStyle}`}
      >
        {confirmText}
      </button>
    </div>
  </Modal>
);

export default ConfirmationModal;