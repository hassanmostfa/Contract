import React, { useState } from 'react';
import { Button } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import './Contract.css';
import ContractHeader from './components/ContractHeader';
import ContractBody from './components/ContractBody';
import ContractFooter from './components/ContractFooter';

interface ContractProps {
  clientName?: string;
  freelancerName?: string;
  projectDescription?: string;
  contractDate?: string;
  paymentAmount?: string;
  deliveryDate?: string;
}

const Contract: React.FC<ContractProps> = ({
  clientName = '{{client_name}}',
  freelancerName = '{{freelancer_name}}',
  projectDescription = '{{project_description}}',
  contractDate = '{{contract_date}}',
  paymentAmount = '{{payment_amount}}',
  deliveryDate = '{{delivery_date}}'
}) => {
  const [isEditingScope, setIsEditingScope] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="contract-container">
      <Button
        className="fixed-print-button"
        variant="contained"
        startIcon={<PrintIcon />}
        onClick={handlePrint}
        aria-label="طباعة العقد"
      >
        طباعة
      </Button>
      {!isEditingScope ? (
        <>
          <ContractHeader />
          <ContractBody
            clientName={clientName}
            freelancerName={freelancerName}
            projectDescription={projectDescription}
            paymentAmount={paymentAmount}
            deliveryDate={deliveryDate}
            isEditingScope={isEditingScope}
            setIsEditingScope={setIsEditingScope}
          />
          <ContractFooter
            clientName={clientName}
            freelancerName={freelancerName}
            contractDate={contractDate}
          />
        </>
      ) : (
        <ContractBody
          clientName={clientName}
          freelancerName={freelancerName}
          projectDescription={projectDescription}
          paymentAmount={paymentAmount}
          deliveryDate={deliveryDate}
          isEditingScope={isEditingScope}
          setIsEditingScope={setIsEditingScope}
        />
      )}
    </div>
  );
};

export default Contract;
