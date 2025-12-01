// components/ConfirmModal.jsx
import { Dialog } from '@headlessui/react';

export default function ConfirmModal({ open, onCancel, onConfirm, title, message }) {
  return (
    <Dialog open={open} onClose={onCancel} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <Dialog.Panel className="bg-white p-6 rounded shadow-xl max-w-sm w-full">
          <Dialog.Title className="text-lg font-semibold text-gray-800">{title}</Dialog.Title>
          <p className="mt-2 text-gray-600">{message}</p>
          <div className="mt-6 flex justify-end gap-2">
            <button
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Confirm
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
