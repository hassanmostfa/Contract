import React from 'react';
import PartiesDefinition from './sections/PartiesDefinition';
import ContractSubject from './sections/ContractSubject';
import ExecutionPeriod from './sections/ExecutionPeriod';
import Obligations from './sections/Obligations';
import WorkExtension from './sections/WorkExtension';
import Payments from './sections/Payments';
import Confidentiality from './sections/Confidentiality';
import Hosting from './sections/Hosting';
import IntellectualProperty from './sections/IntellectualProperty';
import Support from './sections/Support';
import AdditionalTerms from './sections/AdditionalTerms';

interface ContractBodyProps {
  clientName: string;
  projectDescription: string;
  isEditingScope?: boolean;
  setIsEditingScope?: (value: boolean) => void;
}

const ContractBody: React.FC<ContractBodyProps> = ({
  clientName,
  projectDescription,
  isEditingScope = false,
  setIsEditingScope
}) => {
  if (isEditingScope) {
    return (
      <main className="contract-body">
        <ContractSubject 
          projectDescription={projectDescription}
          isEditing={isEditingScope}
          setIsEditing={setIsEditingScope || (() => {})}
        />
      </main>
    );
  }

  return (
    <main className="contract-body">
      <PartiesDefinition
        clientName={clientName}
      />
      <ContractSubject projectDescription={projectDescription} />
      <ExecutionPeriod />
      <Payments />
      <Obligations />
      <Confidentiality />
      <WorkExtension />
      <Support />
      <IntellectualProperty />
      <Hosting />
      <AdditionalTerms />
    </main>
  );
};

export default ContractBody;

