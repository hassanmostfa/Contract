import React, { useState, useEffect } from 'react';
import Section from '../Section';
import RichTextEditor from '../RichTextEditor';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

const Obligations: React.FC = () => {
  const obligationsDefault = `
    <ul>
      <li>تقديم جميع البيانات والمحتويات المطلوبة للتنفيذ.</li>
      <li>الرد واعتماد التصميم خلال مدة لا تتجاوز خمسة أيام عمل.</li>
      <li>أي تأخير من العميل يؤدي لامتداد مدة التسليم دون مسؤولية على الطرف الأول.</li>
    </ul>
  `;

  const modificationsDefault = `
    <ul>
      <li>يحق للعميل طلب ثلاث تعديلات على التصميم قبل اعتماده.</li>
      <li>بعد اعتماد التصميم وبدء البرمجة لا يسمح بالتعديلات الجذرية.</li>
      <li>أي تعديل إضافي يحسب كمهمة جديدة بمقابل مادي.</li>
      <li>عند التسليم يحق للعميل طلب تصحيح الأخطاء فقط.</li>
    </ul>
  `;

  const OBLIGATIONS_STORAGE_KEY = 'contract-obligations-content';
  const MODIFICATIONS_STORAGE_KEY = 'contract-modifications-content';

  const loadSavedObligations = () => {
    const saved = localStorage.getItem(OBLIGATIONS_STORAGE_KEY);
    return saved ? saved : obligationsDefault.trim();
  };

  const loadSavedModifications = () => {
    const saved = localStorage.getItem(MODIFICATIONS_STORAGE_KEY);
    return saved ? saved : modificationsDefault.trim();
  };

  const [obligationsContent, setObligationsContent] = useState(() => loadSavedObligations());
  const [obligationsDraft, setObligationsDraft] = useState(() => loadSavedObligations());
  const [isEditingObligations, setIsEditingObligations] = useState(false);

  const [modificationsContent, setModificationsContent] = useState(() => loadSavedModifications());
  const [modificationsDraft, setModificationsDraft] = useState(() => loadSavedModifications());
  const [isEditingModifications, setIsEditingModifications] = useState(false);

  useEffect(() => {
    if (isEditingObligations) {
      setObligationsDraft(obligationsContent);
    }
  }, [isEditingObligations, obligationsContent]);

  useEffect(() => {
    if (isEditingModifications) {
      setModificationsDraft(modificationsContent);
    }
  }, [isEditingModifications, modificationsContent]);

  const handleSaveObligations = () => {
    setObligationsContent(obligationsDraft);
    localStorage.setItem(OBLIGATIONS_STORAGE_KEY, obligationsDraft);
    setIsEditingObligations(false);
  };

  const handleCancelObligations = () => {
    setObligationsDraft(obligationsContent);
    setIsEditingObligations(false);
  };

  const handleSaveModifications = () => {
    setModificationsContent(modificationsDraft);
    localStorage.setItem(MODIFICATIONS_STORAGE_KEY, modificationsDraft);
    setIsEditingModifications(false);
  };

  const handleCancelModifications = () => {
    setModificationsDraft(modificationsContent);
    setIsEditingModifications(false);
  };

  return (
    <Section title="التزامات العميل والتعديلات">
      <div className="obligations-grid">
        <div className="obligation-box">
          <div className="obligation-header">
            <h3>التزامات العميل</h3>
            {!isEditingObligations && (
              <IconButton
                size="small"
                className="obligation-edit-icon"
                onClick={() => setIsEditingObligations(true)}
                title="تعديل"
              >
                <EditIcon fontSize="small" />
              </IconButton>
            )}
          </div>
          {isEditingObligations ? (
            <div className="obligation-editor">
              <RichTextEditor
                value={obligationsDraft}
                onChange={setObligationsDraft}
                placeholder="أدخل التزامات العميل..."
              />
              <div className="obligation-editor-actions">
                <IconButton
                  aria-label="حفظ"
                  color="primary"
                  onClick={handleSaveObligations}
                  className="save-btn"
                  title="حفظ"
                >
                  <SaveIcon />
                </IconButton>
                <IconButton
                  aria-label="إلغاء"
                  color="secondary"
                  onClick={handleCancelObligations}
                  className="cancel-btn"
                  title="إلغاء"
                >
                  <CloseIcon />
                </IconButton>
              </div>
            </div>
          ) : (
            <div
              className="obligation-content"
              dangerouslySetInnerHTML={{ __html: obligationsContent }}
            />
          )}
        </div>

        <div className="obligation-box">
          <div className="obligation-header">
            <h3>سياسة التعديلات</h3>
            {!isEditingModifications && (
              <IconButton
                size="small"
                className="obligation-edit-icon"
                onClick={() => setIsEditingModifications(true)}
                title="تعديل"
              >
                <EditIcon fontSize="small" />
              </IconButton>
            )}
          </div>
          {isEditingModifications ? (
            <div className="obligation-editor">
              <RichTextEditor
                value={modificationsDraft}
                onChange={setModificationsDraft}
                placeholder="أدخل سياسة التعديلات..."
              />
              <div className="obligation-editor-actions">
                <IconButton
                  aria-label="حفظ"
                  color="primary"
                  onClick={handleSaveModifications}
                  className="save-btn"
                  title="حفظ"
                >
                  <SaveIcon />
                </IconButton>
                <IconButton
                  aria-label="إلغاء"
                  color="secondary"
                  onClick={handleCancelModifications}
                  className="cancel-btn"
                  title="إلغاء"
                >
                  <CloseIcon />
                </IconButton>
              </div>
            </div>
          ) : (
            <div
              className="obligation-content"
              dangerouslySetInnerHTML={{ __html: modificationsContent }}
            />
          )}
        </div>
      </div>
    </Section>
  );
};

export default Obligations;

