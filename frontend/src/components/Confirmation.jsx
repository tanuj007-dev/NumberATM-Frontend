
const ConfirmationModal = ({ message, loading, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="mb-4">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            disabled={loading}
            onClick={onCancel}
            className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            disabled={loading}
            onClick={onConfirm}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
