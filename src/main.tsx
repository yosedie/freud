import React from 'react';
import ReactDOM from 'react-dom/client';
import { FreudProvider } from './context/FreudContext';
import { AppContent } from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FreudProvider>
      <AppContent />
    </FreudProvider>
  </React.StrictMode>
);
