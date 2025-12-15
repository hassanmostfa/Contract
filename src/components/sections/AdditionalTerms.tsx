import React, { useState, useEffect } from 'react';
import RichTextEditor from '../RichTextEditor';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

const AdditionalTerms: React.FC = () => {
  const defaultContent = `
    <p>تم تحرير العقد من نسختين بيد كل طرف نسخة للعمل بموجبها.</p>
    <p>أي ملاحق أو تحديثات لاحقة تعتبر جزءًا لا يتجزأ من هذا العقد.</p>
  `;

  const STORAGE_KEY = 'contract-additional-terms-content';

  // Load saved content from localStorage on mount
  const loadSavedContent = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? saved : defaultContent.trim();
  };

  const [content, setContent] = useState(() => loadSavedContent());
  const [draftContent, setDraftContent] = useState(() => loadSavedContent());
  const [isEditing, setIsEditing] = useState(false);

  // Update draft content when entering edit mode
  useEffect(() => {
    if (isEditing) {
      setDraftContent(content);
    }
  }, [isEditing, content]);

  const handleSave = () => {
    setContent(draftContent);
    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, draftContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraftContent(content);
    setIsEditing(false);
  };

  return (
    <div className="additional-terms-wrapper">
      <section className="contract-section additional-terms-section">
        <div className="additional-terms-title-wrapper">
          <h2 className="section-title">بنود إضافية وتوقيع</h2>
          {!isEditing && (
            <IconButton
              size="small"
              className="additional-terms-edit-icon"
              onClick={() => setIsEditing(true)}
              title="تعديل"
            >
              <EditIcon fontSize="small" />
            </IconButton>
          )}
        </div>
        <div className="section-content">
          {isEditing ? (
            <div className="additional-terms-editor">
              <RichTextEditor
                value={draftContent}
                onChange={setDraftContent}
                placeholder="أدخل البنود الإضافية..."
              />
              <div className="additional-terms-editor-actions">
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
              className="additional-terms-content"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default AdditionalTerms;

