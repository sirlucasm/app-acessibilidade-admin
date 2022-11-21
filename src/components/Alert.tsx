import Modal, { Props } from "react-modal";
import { useCallback } from 'react';

interface AlertProps extends Props{
  confirmText?: string;
  cancelText?: string;
  title: string;
  message?: string;
  handleFunction(): void;
}

export const Alert = ({
  isOpen,
  onRequestClose,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  title,
  message,
  handleFunction
}: AlertProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        content: {
          width: 350,
          height: 180,
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
        overlay: {
          background: 'rgba(0, 0, 0, .4)'
        }
      }}
    >
      <div className="flex flex-col items-end justify-between" style={{ height: '100%' }}>
        <div className="flex flex-col self-center">
          <div className="self-center">
            <h2 className="text-xl font-semibold">{title}</h2>
          </div>
          <div className="mt-2.5">
            <span>{message}</span>
          </div>
        </div>
        <div className="flex items-center">
          <button
            onClick={onRequestClose}
            className="bg-blue-500 hover:bg-blue-600 w-[110px] py-2 text-white text-sm"
          >
            <span>{cancelText}</span>
          </button>
          <button
            onClick={handleFunction}
            className="bg-red-500 hover:bg-red-600 w-[110px] py-2 text-white text-sm ml-2"
          >
            <span>{confirmText}</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
