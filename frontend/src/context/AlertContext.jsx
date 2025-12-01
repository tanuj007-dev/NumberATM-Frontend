import { createContext, useContext, useState } from 'react';
import AlertModal from '../components/AlertModal';
import ConfirmModal from '../components/ConfirmModal';
import PromptModal from '../components/PromptModal'; // 🔥 Add this

const AlertContext = createContext();
export const useAlert = () => useContext(AlertContext);

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState({ open: false, title: '', message: '', resolve: null });
  const [confirm, setConfirm] = useState({ open: false, title: '', message: '', resolve: null });
  const [prompt, setPrompt] = useState({
    open: false,
    title: '',
    message: '',
    placeholder: '',
    resolve: null,
  });

  const showAlert = ({ title, message }) =>
    new Promise((resolve) => setAlert({ open: true, title, message, resolve }));

  const showConfirm = ({ title, message }) =>
    new Promise((resolve) => setConfirm({ open: true, title, message, resolve }));

  const showPrompt = ({ title, message, placeholder = '' }) =>
    new Promise((resolve) => setPrompt({ open: true, title, message, placeholder, resolve }));

  const closeAlert = () => {
    alert.resolve?.();
    setAlert((a) => ({ ...a, open: false }));
  };

  const handleConfirm = (result) => {
    confirm.resolve?.(result);
    setConfirm((c) => ({ ...c, open: false }));
  };

  const handlePromptSubmit = (value) => {
    prompt.resolve?.(value);
    setPrompt((p) => ({ ...p, open: false }));
  };

  const handlePromptCancel = () => {
    prompt.resolve?.(null);
    setPrompt((p) => ({ ...p, open: false }));
  };

  return (
    <AlertContext.Provider value={{ showAlert, showConfirm, showPrompt }}>
      <div className='bg-white/20 w-full h-full'>
      {children}

      <AlertModal
        open={alert.open}
        onClose={closeAlert}
        title={alert.title}
        message={alert.message}
      />

      <ConfirmModal
        open={confirm.open}
        onCancel={() => handleConfirm(false)}
        onConfirm={() => handleConfirm(true)}
        title={confirm.title}
        message={confirm.message}
      />

      <PromptModal
        open={prompt.open}
        onCancel={handlePromptCancel}
        onSubmit={handlePromptSubmit}
        title={prompt.title}
        message={prompt.message}
        placeholder={prompt.placeholder}
      />
      </div>
    </AlertContext.Provider>
  );
}
