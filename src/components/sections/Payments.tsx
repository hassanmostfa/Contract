import React, { useState, useEffect, useRef } from 'react';
import Section from '../Section';
import { IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

interface Payment {
  id: string;
  name: string;
  stage: string;
  amount: string;
}

interface PaymentsProps {
  paymentAmount?: string;
}

const Payments: React.FC<PaymentsProps> = () => {
  const [payments, setPayments] = useState<Payment[]>(() => {
    // Initialize state from localStorage
    const savedPayments = localStorage.getItem('contract-payments');
    if (savedPayments) {
      try {
        const parsed = JSON.parse(savedPayments);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch (error) {
        console.error('Error loading payments from localStorage:', error);
      }
    }
    return [];
  });
  const isInitialMount = useRef(true);

  // Save payments to localStorage whenever payments change (but not on initial mount)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    localStorage.setItem('contract-payments', JSON.stringify(payments));
  }, [payments]);

  const handleAddPayment = () => {
    const newPayment: Payment = {
      id: Date.now().toString(),
      name: '',
      stage: '',
      amount: ''
    };
    setPayments([...payments, newPayment]);
  };

  const handleDeletePayment = (id: string) => {
    setPayments(payments.filter(payment => payment.id !== id));
  };

  const handleFieldChange = (id: string, field: keyof Payment, value: string) => {
    setPayments(payments.map(payment => 
      payment.id === id ? { ...payment, [field]: value } : payment
    ));
  };

  return (
    <Section title="الدفعات المالية">
      <div className="payments-table-wrapper">
        <table className="payments-table">
          <thead>
            <tr>
              <th>اسم الدفعة</th>
              <th>المرحلة المرتبطة</th>
              <th>القيمة (نسبة)</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>
                  <input
                    type="text"
                    value={payment.name}
                    onChange={(e) => handleFieldChange(payment.id, 'name', e.target.value)}
                    className="payment-input"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={payment.stage}
                    onChange={(e) => handleFieldChange(payment.id, 'stage', e.target.value)}
                    className="payment-input"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={payment.amount}
                    onChange={(e) => handleFieldChange(payment.id, 'amount', e.target.value)}
                    className="payment-input"
                  />
                </td>
                <td>
                  <IconButton
                    size="small"
                    onClick={() => handleDeletePayment(payment.id)}
                    className="delete-payment-btn"
                    title="حذف"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="payments-actions">
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleAddPayment}
            className="add-payment-btn"
          >
            إضافة دفعة
          </Button>
        </div>
        {/* <p className="payments-note">
          يمكنك إضافة أو حذف الدفعات حسب الحاجة قبل التوقيع.
        </p> */}
      </div>
    </Section>
  );
};

export default Payments;

