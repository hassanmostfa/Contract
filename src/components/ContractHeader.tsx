import React, { useState, useEffect, useRef } from 'react';
import Logo from './Logo';

const ContractHeader: React.FC = () => {
  const [contractDate, setContractDate] = useState<string>(() => {
    const savedDate = localStorage.getItem('contract-date-header');
    return savedDate || new Date().toISOString().split('T')[0];
  });
  const isInitialMount = useRef(true);

  // Save date to localStorage whenever it changes
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    localStorage.setItem('contract-date-header', contractDate);
  }, [contractDate]);

  return (
    <header className="contract-header">
      <div className="header-row">
        <div className="header-logo">
          <Logo />
        </div>
        <div className="header-content">
          <h1 className="contract-title">عقد تصميم وبرمجة تطبيقات ومواقع إلكترونية</h1>
          <p className="contract-subtitle">اتفاقية تعاقدية إلكترونية</p>
        </div>
        <div className="header-date">
          <div className="contract-date-input-wrapper">
            <label htmlFor="contract-date" className="date-input-label">
              تاريخ العقد:
            </label>
            <input
              type="date"
              id="contract-date"
              value={contractDate}
              onChange={(e) => setContractDate(e.target.value)}
              className="contract-date-input"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default ContractHeader;

