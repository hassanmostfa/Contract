import React, { useState, useEffect } from 'react';
import RichTextEditor from '../RichTextEditor';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

const Hosting: React.FC = () => {
  const defaultContent = `
    <ul>
      <li>يوفر الطرف الأول استضافة مجانية لمدة سنة (إن وجدت).</li>
      <li>عند نقل المشروع إلى سيرفر خارجي تنتهي الاستضافة والدعم المجاني ولا يتحمل الطرف الأول أي مسؤولية بعد النقل.</li>
      <li>السيرفرات الخاصة يتم احتسابها بتكاليف مستقلة عند الحاجة.</li>
    </ul>
  `;

  const STORAGE_KEY = 'contract-hosting-content';

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
    <div className="hosting-wrapper">
      <section className="contract-section hosting-section">
        <div className="hosting-title-wrapper">
          <h2 className="section-title">الاستضافة والسيرفرات</h2>
          {!isEditing && (
            <IconButton
              size="small"
              className="hosting-edit-icon"
              onClick={() => setIsEditing(true)}
              title="تعديل"
            >
              <EditIcon fontSize="small" />
            </IconButton>
          )}
        </div>
        <div className="section-content">
          {isEditing ? (
            <div className="hosting-editor">
              <RichTextEditor
                value={draftContent}
                onChange={setDraftContent}
                placeholder="أدخل معلومات الاستضافة والسيرفرات..."
              />
              <div className="hosting-editor-actions">
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
              className="hosting-content"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default Hosting;

