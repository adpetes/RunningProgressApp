import React from 'react';
import App from './App';
import './index.css'
import { createRoot } from 'react-dom/client';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');
const root = createRoot(document.getElementById('root')); // Replace 'root' with the ID of your root element
root.render(<App />);



