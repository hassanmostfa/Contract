import React, { useState, useEffect, useRef } from 'react';

interface ContractFooterProps {
  clientName?: string;
}

const ContractFooter: React.FC<ContractFooterProps> = ({
  clientName = ''
}) => {
  const [teamNameValue, setTeamNameValue] = useState('السيد / علي محمود عليوه');
  const [clientNameValue, setClientNameValue] = useState(clientName);
  const [footerDate, setFooterDate] = useState<string>(() => {
    const savedDate = localStorage.getItem('contract-date-footer');
    return savedDate || new Date().toISOString().split('T')[0];
  });
  const isInitialMount = useRef(true);

  // Load date from localStorage on mount
  useEffect(() => {
    const savedDate = localStorage.getItem('contract-date-footer');
    if (savedDate) {
      setFooterDate(savedDate);
    }
    isInitialMount.current = false;
  }, []);

  // Save date to localStorage whenever it changes
  useEffect(() => {
    if (!isInitialMount.current) {
      localStorage.setItem('contract-date-footer', footerDate);
    }
  }, [footerDate]);

  return (
    <footer className="contract-footer">
      <div className="footer-content">
        {/* <div className="contract-date-footer-section">
          <div className="contract-date-footer-box">
            <div className="contract-date-footer-label">تاريخ العقد</div>
            <div className="contract-date-footer-value">
              <input
                type="date"
                value={footerDate}
                onChange={(e) => setFooterDate(e.target.value)}
                className="contract-date-footer-input"
              />
            </div>
          </div>
        </div> */}
        <div className="signature-section">
          <div className="signature-box signature-box-client">
            <div className="signature-header">
              <h3>ممثل الفريق</h3>
            </div>
            <div className="signature-body">
              <input
                type="text"
                className="signature-name"
                value={teamNameValue}
                onChange={(e) => setTeamNameValue(e.target.value)}
              />
              <div className="signature-line-wrapper">
                <div className="signature-line"></div>
              </div>
              <p className="signature-label">الامضاء والتوقيع</p>
            </div>
          </div>
          
          <div className="signature-box signature-box-freelancer">
            <div className="signature-header">
              <h3>العميل</h3>
            </div>
            <div className="signature-body">
              <input
                type="text"
                className="signature-name"
                value={clientNameValue}
                onChange={(e) => setClientNameValue(e.target.value)}
              />
              <div className="signature-line-wrapper">
                <div className="signature-line"></div>
              </div>
              <p className="signature-label">الامضاء والتوقيع</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContractFooter;

