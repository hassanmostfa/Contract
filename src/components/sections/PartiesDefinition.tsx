import React, { useState } from 'react';
import Section from '../Section';

interface PartiesDefinitionProps {
  clientName: string;
}

const PartiesDefinition: React.FC<PartiesDefinitionProps> = ({
  clientName
}) => {
  const [formData, setFormData] = useState({
    clientName: clientName || '',
    fullName: '',
    location: '',
    cityCountry: '',
    representative: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Section title="بيانات الأطراف">
      <div className="party-definition">
        <div className="party-box">
          <h3>الطرف الأول — مقدم الخدمة</h3>
          <div className="party-info">
            <p><strong>الفريق:</strong>Tech Minds Team</p>
            <p><strong>المقر:</strong>مصر</p>
            <p><strong>الممثل:</strong>السيد / علي محمود عليوه</p>
          </div>
        </div>
        <div className="party-box">
          <h3>الطرف الثاني — العميل</h3>
          <div className="client-form">
            <div className="form-field">
              <label htmlFor="clientName">اسم المؤسسة</label>
              <input
                type="text"
                id="clientName"
                name="clientName"
                value={formData.clientName}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-field">
              <label htmlFor="fullName">الاسم الكامل</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="location">المقر</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
              <div className="form-field">
                <label htmlFor="cityCountry">المدينة / الدولة</label>
                <input
                  type="text"
                  id="cityCountry"
                  name="cityCountry"
                  value={formData.cityCountry}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="representative">ممثل العميل</label>
              <input
                type="text"
                id="representative"
                name="representative"
                value={formData.representative}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
          </div>
        </div>
      </div>
      {/* <p className="section-note">
      يقر الطرفان بكامل أهليتهما القانونية للتعاقد ويعد التمهيد جزءًا لا يتجزأ من العقد.
      </p> */}
    </Section>
  );
};

export default PartiesDefinition;

