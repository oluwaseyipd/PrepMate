import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { TestResultProvider } from "./context/TestResultContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TestResultProvider>
    <App />
    </TestResultProvider>
  </StrictMode>,
)
