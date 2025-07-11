import React from 'react';
import { useModal } from '../../context/ModalContext';
import { modalRegistry } from './modalRegistry';

const ModalManager = ({ handlers = {} }) => {
  const { modals, closeModal, getModalProps } = useModal();

  return (
    <>
      {Object.entries(modals).map(([modalId, { isOpen }]) => {
        if (!isOpen) return null;

        const ModalComponent = modalRegistry[modalId];
        if (!ModalComponent) {
          console.warn(`Modal component not found for ID: ${modalId}`);
          return null;
        }

        const props = getModalProps(modalId);
        const handler = handlers[modalId];

        return (
          <ModalComponent
            key={modalId}
            isOpen={isOpen}
            onClose={() => closeModal(modalId)}
            {...props}
            {...handler}
          />
        );
      })}
    </>
  );
};

export default ModalManager;