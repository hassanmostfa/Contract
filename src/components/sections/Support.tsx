import React, { useState, useEffect } from 'react';
import Section from '../Section';
import RichTextEditor from '../RichTextEditor';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

const Support: React.FC = () => {
  const freeSupportDefault = `
    <p>دعم فني لمدة 12 شهرًا للأخطاء البرمجية فقط.</p>
  `;

  const notIncludedDefault = `
    <ul>
      <li>إدخال المحتوى أو تغيير التصميم.</li>
      <li>تطوير خصائص جديدة.</li>
      <li>الأعطال الناتجة عن سوء الاستخدام أو أطراف خارجية.</li>
    </ul>
    <p>بعد انتهاء الفترة يتم تقديم باقات دعم وصيانة مدفوعة.</p>
  `;

  const FREE_SUPPORT_STORAGE_KEY = 'contract-free-support-content';
  const NOT_INCLUDED_STORAGE_KEY = 'contract-not-included-content';

  const loadSavedFreeSupport = () => {
    const saved = localStorage.getItem(FREE_SUPPORT_STORAGE_KEY);
    return saved ? saved : freeSupportDefault.trim();
  };

  const loadSavedNotIncluded = () => {
    const saved = localStorage.getItem(NOT_INCLUDED_STORAGE_KEY);
    return saved ? saved : notIncludedDefault.trim();
  };

  const [freeSupportContent, setFreeSupportContent] = useState(() => loadSavedFreeSupport());
  const [freeSupportDraft, setFreeSupportDraft] = useState(() => loadSavedFreeSupport());
  const [isEditingFreeSupport, setIsEditingFreeSupport] = useState(false);

  const [notIncludedContent, setNotIncludedContent] = useState(() => loadSavedNotIncluded());
  const [notIncludedDraft, setNotIncludedDraft] = useState(() => loadSavedNotIncluded());
  const [isEditingNotIncluded, setIsEditingNotIncluded] = useState(false);

  useEffect(() => {
    if (isEditingFreeSupport) {
      setFreeSupportDraft(freeSupportContent);
    }
  }, [isEditingFreeSupport, freeSupportContent]);

  useEffect(() => {
    if (isEditingNotIncluded) {
      setNotIncludedDraft(notIncludedContent);
    }
  }, [isEditingNotIncluded, notIncludedContent]);

  const handleSaveFreeSupport = () => {
    setFreeSupportContent(freeSupportDraft);
    localStorage.setItem(FREE_SUPPORT_STORAGE_KEY, freeSupportDraft);
    setIsEditingFreeSupport(false);
  };

  const handleCancelFreeSupport = () => {
    setFreeSupportDraft(freeSupportContent);
    setIsEditingFreeSupport(false);
  };

  const handleSaveNotIncluded = () => {
    setNotIncludedContent(notIncludedDraft);
    localStorage.setItem(NOT_INCLUDED_STORAGE_KEY, notIncludedDraft);
    setIsEditingNotIncluded(false);
  };

  const handleCancelNotIncluded = () => {
    setNotIncludedDraft(notIncludedContent);
    setIsEditingNotIncluded(false);
  };

  return (
    <Section title="الدعم الفني والصيانة">
      <div className="obligations-grid">
        <div className="obligation-box">
          <div className="obligation-header">
            <h3>الدعم المجاني</h3>
            {!isEditingFreeSupport && (
              <IconButton
                size="small"
                className="obligation-edit-icon"
                onClick={() => setIsEditingFreeSupport(true)}
                title="تعديل"
              >
                <EditIcon fontSize="small" />
              </IconButton>
            )}
          </div>
          {isEditingFreeSupport ? (
            <div className="obligation-editor">
              <RichTextEditor
                value={freeSupportDraft}
                onChange={setFreeSupportDraft}
                placeholder="أدخل معلومات الدعم المجاني..."
              />
              <div className="obligation-editor-actions">
                <IconButton
                  aria-label="حفظ"
                  color="primary"
                  onClick={handleSaveFreeSupport}
                  className="save-btn"
                  title="حفظ"
                >
                  <SaveIcon />
                </IconButton>
                <IconButton
                  aria-label="إلغاء"
                  color="secondary"
                  onClick={handleCancelFreeSupport}
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
              dangerouslySetInnerHTML={{ __html: freeSupportContent }}
            />
          )}
        </div>

        <div className="obligation-box">
          <div className="obligation-header">
            <h3>لا يشمل الدعم</h3>
            {!isEditingNotIncluded && (
              <IconButton
                size="small"
                className="obligation-edit-icon"
                onClick={() => setIsEditingNotIncluded(true)}
                title="تعديل"
              >
                <EditIcon fontSize="small" />
              </IconButton>
            )}
          </div>
          {isEditingNotIncluded ? (
            <div className="obligation-editor">
              <RichTextEditor
                value={notIncludedDraft}
                onChange={setNotIncludedDraft}
                placeholder="أدخل ما لا يشمل الدعم..."
              />
              <div className="obligation-editor-actions">
                <IconButton
                  aria-label="حفظ"
                  color="primary"
                  onClick={handleSaveNotIncluded}
                  className="save-btn"
                  title="حفظ"
                >
                  <SaveIcon />
                </IconButton>
                <IconButton
                  aria-label="إلغاء"
                  color="secondary"
                  onClick={handleCancelNotIncluded}
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
              dangerouslySetInnerHTML={{ __html: notIncludedContent }}
            />
          )}
        </div>
      </div>
    </Section>
  );
};

export default Support;

