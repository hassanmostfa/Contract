import React, { useState, useEffect } from 'react';
import Section from '../Section';
import RichTextEditor from '../RichTextEditor';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

const IntellectualProperty: React.FC = () => {
  const ownershipDefault = `
    <ul>
      <li>يحق للعميل استلام ملفات المشروع كاملة بما فيها الكود المصدري عند الطلب.</li>
      <li>عند تسليم الكود المصدري تنتقل المسؤولية التقنية إلى العميل مباشرة.</li>
    </ul>
  `;

  const confidentialityDefault = `
    <p>يلتزم الطرف الأول بسرية جميع البيانات ولا يحق نشرها أو مشاركتها إلا بإذن العميل، ويحق للطرف الثاني المطالبة بالتعويض عند الإخلال بذلك.</p>
  `;

  const OWNERSHIP_STORAGE_KEY = 'contract-ownership-content';
  const CONFIDENTIALITY_STORAGE_KEY = 'contract-confidentiality-content';

  const loadSavedOwnership = () => {
    const saved = localStorage.getItem(OWNERSHIP_STORAGE_KEY);
    return saved ? saved : ownershipDefault.trim();
  };

  const loadSavedConfidentiality = () => {
    const saved = localStorage.getItem(CONFIDENTIALITY_STORAGE_KEY);
    return saved ? saved : confidentialityDefault.trim();
  };

  const [ownershipContent, setOwnershipContent] = useState(() => loadSavedOwnership());
  const [ownershipDraft, setOwnershipDraft] = useState(() => loadSavedOwnership());
  const [isEditingOwnership, setIsEditingOwnership] = useState(false);

  const [confidentialityContent, setConfidentialityContent] = useState(() => loadSavedConfidentiality());
  const [confidentialityDraft, setConfidentialityDraft] = useState(() => loadSavedConfidentiality());
  const [isEditingConfidentiality, setIsEditingConfidentiality] = useState(false);

  useEffect(() => {
    if (isEditingOwnership) {
      setOwnershipDraft(ownershipContent);
    }
  }, [isEditingOwnership, ownershipContent]);

  useEffect(() => {
    if (isEditingConfidentiality) {
      setConfidentialityDraft(confidentialityContent);
    }
  }, [isEditingConfidentiality, confidentialityContent]);

  const handleSaveOwnership = () => {
    setOwnershipContent(ownershipDraft);
    localStorage.setItem(OWNERSHIP_STORAGE_KEY, ownershipDraft);
    setIsEditingOwnership(false);
  };

  const handleCancelOwnership = () => {
    setOwnershipDraft(ownershipContent);
    setIsEditingOwnership(false);
  };

  const handleSaveConfidentiality = () => {
    setConfidentialityContent(confidentialityDraft);
    localStorage.setItem(CONFIDENTIALITY_STORAGE_KEY, confidentialityDraft);
    setIsEditingConfidentiality(false);
  };

  const handleCancelConfidentiality = () => {
    setConfidentialityDraft(confidentialityContent);
    setIsEditingConfidentiality(false);
  };

  return (
    <Section title="ملكية المشروع والسرية">
      <div className="obligations-grid">
        <div className="obligation-box">
          <div className="obligation-header">
            <h3>الملكية والكود المصدري</h3>
            {!isEditingOwnership && (
              <IconButton
                size="small"
                className="obligation-edit-icon"
                onClick={() => setIsEditingOwnership(true)}
                title="تعديل"
              >
                <EditIcon fontSize="small" />
              </IconButton>
            )}
          </div>
          {isEditingOwnership ? (
            <div className="obligation-editor">
              <RichTextEditor
                value={ownershipDraft}
                onChange={setOwnershipDraft}
                placeholder="أدخل معلومات الملكية والكود المصدري..."
              />
              <div className="obligation-editor-actions">
                <IconButton
                  aria-label="حفظ"
                  color="primary"
                  onClick={handleSaveOwnership}
                  className="save-btn"
                  title="حفظ"
                >
                  <SaveIcon />
                </IconButton>
                <IconButton
                  aria-label="إلغاء"
                  color="secondary"
                  onClick={handleCancelOwnership}
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
              dangerouslySetInnerHTML={{ __html: ownershipContent }}
            />
          )}
        </div>

        <div className="obligation-box">
          <div className="obligation-header">
            <h3>السرية وعدم الإفشاء</h3>
            {!isEditingConfidentiality && (
              <IconButton
                size="small"
                className="obligation-edit-icon"
                onClick={() => setIsEditingConfidentiality(true)}
                title="تعديل"
              >
                <EditIcon fontSize="small" />
              </IconButton>
            )}
          </div>
          {isEditingConfidentiality ? (
            <div className="obligation-editor">
              <RichTextEditor
                value={confidentialityDraft}
                onChange={setConfidentialityDraft}
                placeholder="أدخل معلومات السرية وعدم الإفشاء..."
              />
              <div className="obligation-editor-actions">
                <IconButton
                  aria-label="حفظ"
                  color="primary"
                  onClick={handleSaveConfidentiality}
                  className="save-btn"
                  title="حفظ"
                >
                  <SaveIcon />
                </IconButton>
                <IconButton
                  aria-label="إلغاء"
                  color="secondary"
                  onClick={handleCancelConfidentiality}
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
              dangerouslySetInnerHTML={{ __html: confidentialityContent }}
            />
          )}
        </div>
      </div>
    </Section>
  );
};

export default IntellectualProperty;

