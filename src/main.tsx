import React from 'react';
import ReactDOM from 'react-dom/client';
import Contract from './Contract';
import './Contract.css';

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <Contract
      clientName=""
      freelancerName=""
      projectDescription=""
      contractDate=""
      paymentAmount=""
      deliveryDate=""
    />
  </React.StrictMode>
);

