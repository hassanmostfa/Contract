import React, { useState, useEffect } from 'react';
import RichTextEditor from '../RichTextEditor';
import Section from '../Section';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

interface ContractSubjectProps {
  projectDescription?: string;
  isEditing?: boolean;
  setIsEditing?: (value: boolean) => void;
}

const ContractSubject: React.FC<ContractSubjectProps> = ({
  isEditing: externalIsEditing,
  setIsEditing: externalSetIsEditing
}) => {
  const defaultContent = `
    <ul>
      <li>إعداد تحليل شامل للنظام حسب البيانات والمحتويات المقدمة من العميل.</li>
      <li>تصميم واجهات UI/UX عبر Figma واعتمادها من الطرف الثاني.</li>
      <li>برمجة المشروع باستخدام التقنيات المحددة: Flutter للتطبيقات، Laravel للمواقع والأنظمة، ولوحة تحكم خاصة.</li>
      <li>ربط أنظمة الدفع الإلكتروني عند توفرها.</li>
      <li>رفع المشروع على السيرفر والاستضافة إذا كانت من الطرف الأول.</li>
    </ul>
  `;

  const STORAGE_KEY = 'contract-scope-of-work-content';

  const loadSavedContent = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? saved : defaultContent.trim();
  };

  const [content, setContent] = useState(() => loadSavedContent());
  const [draftContent, setDraftContent] = useState(() => loadSavedContent());
  const [internalIsEditing, setInternalIsEditing] = useState(false);

  // Use external state if provided, otherwise use internal state
  const isEditing = externalIsEditing !== undefined ? externalIsEditing : internalIsEditing;
  const setIsEditing = externalSetIsEditing || setInternalIsEditing;

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
      <Section title="نطاق العمل">
        <div className="project-description-box no-bg">
          <div className="rich-editor-wrapper">
            <RichTextEditor
              value={draftContent}
              onChange={setDraftContent}
              placeholder="أدخل نطاق العمل..."
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
            نطاق العمل
          </h2>
          <IconButton 
            aria-label="تعديل نطاق العمل" 
            className="scope-edit-icon"
            onClick={() => setIsEditing(true)}
            title="تعديل نطاق العمل"
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

export default ContractSubject;

