import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "quill/dist/quill.snow.css";

import App from './App.jsx'
import { Provider } from 'react-redux';
import store from './store.js';
import ErrorBoundary from './ErrorBoundary.jsx';
import { AlertProvider } from './context/AlertContext.jsx';
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <AlertProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
      </AlertProvider>
  </Provider>
)
