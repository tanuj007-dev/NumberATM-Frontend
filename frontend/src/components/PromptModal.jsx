// components/PromptModal.jsx
import React, { useState, useEffect, useRef } from 'react';

const PromptModal = ({ open, title, message, placeholder, onSubmit, onCancel }) => {
  const [input, setInput] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
      setInput('');
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg p-6 max-w-md w-[90%]">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p
          className="mb-4 text-gray-700"
          dangerouslySetInnerHTML={{ __html: message }}
        />
        <input
          ref={inputRef}
          type="text"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSubmit(input);
          }}
        />
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 rounded bg-gray-200" onClick={onCancel}>
            Cancel
          </button>
          <button className="px-4 py-2 rounded bg-blue-600 text-white" onClick={() => onSubmit(input)}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptModal;
