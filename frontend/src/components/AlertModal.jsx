// components/AlertModal.jsx
import { Dialog } from '@headlessui/react';

export default function AlertModal({ open, onClose, title, message }) {
  return (
    <Dialog open={open} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <Dialog.Panel className="bg-white p-6 rounded shadow-xl max-w-sm w-full">
          <Dialog.Title className="text-lg font-semibold text-gray-800">{title}</Dialog.Title>
          <p className="mt-2 text-gray-600">{message}</p>
          <div className="mt-4 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              OK
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
