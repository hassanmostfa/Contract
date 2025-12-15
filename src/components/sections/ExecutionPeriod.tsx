import React, { useState, useEffect } from 'react';
import RichTextEditor from '../RichTextEditor';
import Section from '../Section';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

interface ExecutionPeriodProps {
  deliveryDate?: string;
}

const ExecutionPeriod: React.FC<ExecutionPeriodProps> = () => {
  const defaultContent = `
    <p>يتم تحديد المهام التفصيلية والسعر النهائي والعرض الفني والمالي في ملحق مستقل (عرض السعر) ويعتبر جزءًا من هذا العقد.</p>
  `;

  const STORAGE_KEY = 'contract-project-specs-content';

  const loadSavedContent = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? saved : defaultContent.trim();
  };

  const [content, setContent] = useState(() => loadSavedContent());
  const [draftContent, setDraftContent] = useState(() => loadSavedContent());
  const [internalIsEditing, setInternalIsEditing] = useState(false);

  const isEditing = internalIsEditing;
  const setIsEditing = setInternalIsEditing;

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

  if (isEditing) {
    return (
      <Section title="مواصفات المشروع وتسعيرته">
        <div className="project-description-box no-bg">
          <div className="rich-editor-wrapper">
            <RichTextEditor
              value={draftContent}
              onChange={setDraftContent}
              placeholder="أدخل مواصفات المشروع وتسعيرته..."
            />
            <div className="quill-editor-actions">
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
        </div>
      </Section>
    );
  }

  return (
    <div className="scope-of-work-wrapper">
      <section className="contract-section scope-section">
        <div className="scope-title-wrapper">
          <h2 className="section-title">
            مواصفات المشروع وتسعيرته
          </h2>
          <IconButton 
            aria-label="تعديل مواصفات المشروع وتسعيرته" 
            className="scope-edit-icon"
            onClick={() => setIsEditing(true)}
            title="تعديل مواصفات المشروع وتسعيرته"
          >
            <EditIcon />
          </IconButton>
        </div>
        <div className="section-content">
          <div className="scope-of-work-section">
            <div className="project-description-box no-bg">
              <div className="project-content-display">
                <div 
                  className="project-content-html" 
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExecutionPeriod;

