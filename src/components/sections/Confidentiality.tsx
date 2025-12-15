import React, { useState, useEffect } from 'react';
import RichTextEditor from '../RichTextEditor';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

const Confidentiality: React.FC = () => {
  const defaultContent = `
    <ul>
      <li>إذا رغب العميل بإلغاء المشروع بعد البدء بالعمل فلا يحق له استرجاع المبالغ المدفوعة.</li>
      <li>قبل البدء بالتنفيذ يحق للطرف الأول خصم 10% كمصاريف إدارية.</li>
    </ul>
  `;

  const STORAGE_KEY = 'contract-termination-content';

  const loadSavedContent = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? saved : defaultContent.trim();
  };

  const [content, setContent] = useState(() => loadSavedContent());
  const [draftContent, setDraftContent] = useState(() => loadSavedContent());
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isEditing) {
      setDraftContent(content);
    }
  }, [isEditing, content]);

  const handleSave = () => {
    setContent(draftContent);
    localStorage.setItem(STORAGE_KEY, draftContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraftContent(content);
    setIsEditing(false);
  };

  return (
    <div className="termination-wrapper">
      <section className="contract-section termination-section">
        <div className="termination-title-wrapper">
          <h2 className="section-title">إنهاء التعاقد</h2>
          {!isEditing && (
            <IconButton
              size="small"
              className="termination-edit-icon"
              onClick={() => setIsEditing(true)}
              title="تعديل"
            >
              <EditIcon fontSize="small" />
            </IconButton>
          )}
        </div>
        <div className="section-content">
          <div className="obligation-box termination-box">
            {isEditing ? (
              <div className="obligation-editor">
                <RichTextEditor
                  value={draftContent}
                  onChange={setDraftContent}
                  placeholder="أدخل معلومات إنهاء التعاقد..."
                />
                <div className="obligation-editor-actions">
                  <IconButton
                    aria-label="حفظ"
                    color="primary"
                    onClick={handleSave}
                    className="save-btn"
                    title="حفظ"
                  >
                    <SaveIcon />
                  </IconButton>
                  <IconButton
                    aria-label="إلغاء"
                    color="secondary"
                    onClick={handleCancel}
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
                dangerouslySetInnerHTML={{ __html: content }}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Confidentiality;

