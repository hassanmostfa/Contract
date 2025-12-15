import React, { useState, useEffect } from 'react';
import Section from '../Section';
import RichTextEditor from '../RichTextEditor';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

const WorkExtension: React.FC = () => {
  const workIncreaseDefault = `
    <p>أي مهام غير مذكورة في نطاق العمل الأصلي تعتبر خارج الاتفاق ويتم تسعيرها بشكل مستقل.</p>
  `;

  const executionPeriodDefault = `
    <p>مدة تنفيذ المشروع وفق الاتفاق (مثال: 30 يوم عمل + 10 أيام للاختبارات). في حال تسبب الطرف الأول بتأخير غير مبرر يحق للعميل استرجاع المبالغ المدفوعة.</p>
    <p>في حال كان التأخير بسبب العميل أو عدم توفير البيانات فلا يتحمل الطرف الأول أي مسؤولية عن تمديد مدة التسليم.</p>
  `;

  const WORK_INCREASE_STORAGE_KEY = 'contract-work-increase-content';
  const EXECUTION_PERIOD_STORAGE_KEY = 'contract-execution-period-content';

  const loadSavedWorkIncrease = () => {
    const saved = localStorage.getItem(WORK_INCREASE_STORAGE_KEY);
    return saved ? saved : workIncreaseDefault.trim();
  };

  const loadSavedExecutionPeriod = () => {
    const saved = localStorage.getItem(EXECUTION_PERIOD_STORAGE_KEY);
    return saved ? saved : executionPeriodDefault.trim();
  };

  const [workIncreaseContent, setWorkIncreaseContent] = useState(() => loadSavedWorkIncrease());
  const [workIncreaseDraft, setWorkIncreaseDraft] = useState(() => loadSavedWorkIncrease());
  const [isEditingWorkIncrease, setIsEditingWorkIncrease] = useState(false);

  const [executionPeriodContent, setExecutionPeriodContent] = useState(() => loadSavedExecutionPeriod());
  const [executionPeriodDraft, setExecutionPeriodDraft] = useState(() => loadSavedExecutionPeriod());
  const [isEditingExecutionPeriod, setIsEditingExecutionPeriod] = useState(false);

  useEffect(() => {
    if (isEditingWorkIncrease) {
      setWorkIncreaseDraft(workIncreaseContent);
    }
  }, [isEditingWorkIncrease, workIncreaseContent]);

  useEffect(() => {
    if (isEditingExecutionPeriod) {
      setExecutionPeriodDraft(executionPeriodContent);
    }
  }, [isEditingExecutionPeriod, executionPeriodContent]);

  const handleSaveWorkIncrease = () => {
    setWorkIncreaseContent(workIncreaseDraft);
    localStorage.setItem(WORK_INCREASE_STORAGE_KEY, workIncreaseDraft);
    setIsEditingWorkIncrease(false);
  };

  const handleCancelWorkIncrease = () => {
    setWorkIncreaseDraft(workIncreaseContent);
    setIsEditingWorkIncrease(false);
  };

  const handleSaveExecutionPeriod = () => {
    setExecutionPeriodContent(executionPeriodDraft);
    localStorage.setItem(EXECUTION_PERIOD_STORAGE_KEY, executionPeriodDraft);
    setIsEditingExecutionPeriod(false);
  };

  const handleCancelExecutionPeriod = () => {
    setExecutionPeriodDraft(executionPeriodContent);
    setIsEditingExecutionPeriod(false);
  };

  return (
    <Section title="زيادة الأعمال ومدة التنفيذ">
      <div className="obligations-grid">
        <div className="obligation-box">
          <div className="obligation-header">
            <h3>زيادة الأعمال</h3>
            {!isEditingWorkIncrease && (
              <IconButton
                size="small"
                className="obligation-edit-icon"
                onClick={() => setIsEditingWorkIncrease(true)}
                title="تعديل"
              >
                <EditIcon fontSize="small" />
              </IconButton>
            )}
          </div>
          {isEditingWorkIncrease ? (
            <div className="obligation-editor">
              <RichTextEditor
                value={workIncreaseDraft}
                onChange={setWorkIncreaseDraft}
                placeholder="أدخل معلومات زيادة الأعمال..."
              />
              <div className="obligation-editor-actions">
                <IconButton
                  aria-label="حفظ"
                  color="primary"
                  onClick={handleSaveWorkIncrease}
                  className="save-btn"
                  title="حفظ"
                >
                  <SaveIcon />
                </IconButton>
                <IconButton
                  aria-label="إلغاء"
                  color="secondary"
                  onClick={handleCancelWorkIncrease}
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
              dangerouslySetInnerHTML={{ __html: workIncreaseContent }}
            />
          )}
        </div>

        <div className="obligation-box">
          <div className="obligation-header">
            <h3>مدة التنفيذ</h3>
            {!isEditingExecutionPeriod && (
              <IconButton
                size="small"
                className="obligation-edit-icon"
                onClick={() => setIsEditingExecutionPeriod(true)}
                title="تعديل"
              >
                <EditIcon fontSize="small" />
              </IconButton>
            )}
          </div>
          {isEditingExecutionPeriod ? (
            <div className="obligation-editor">
              <RichTextEditor
                value={executionPeriodDraft}
                onChange={setExecutionPeriodDraft}
                placeholder="أدخل معلومات مدة التنفيذ..."
              />
              <div className="obligation-editor-actions">
                <IconButton
                  aria-label="حفظ"
                  color="primary"
                  onClick={handleSaveExecutionPeriod}
                  className="save-btn"
                  title="حفظ"
                >
                  <SaveIcon />
                </IconButton>
                <IconButton
                  aria-label="إلغاء"
                  color="secondary"
                  onClick={handleCancelExecutionPeriod}
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
              dangerouslySetInnerHTML={{ __html: executionPeriodContent }}
            />
          )}
        </div>
      </div>
    </Section>
  );
};

export default WorkExtension;

