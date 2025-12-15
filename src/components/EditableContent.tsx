import React, { useState, useRef, useEffect } from 'react';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

interface EditableContentProps {
  initialContent: string;
  onContentChange?: (content: string) => void;
  placeholder?: string;
  className?: string;
  tag?: 'p' | 'div' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const EditableContent: React.FC<EditableContentProps> = ({
  initialContent,
  onContentChange,
  placeholder,
  className = '',
  tag = 'div'
}) => {
  const [content, setContent] = useState(initialContent);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(initialContent);
  const contentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isEditing && contentRef.current) {
      contentRef.current.focus();
      // Select all text for easy editing
      const range = document.createRange();
      range.selectNodeContents(contentRef.current);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, [isEditing]);

  const saveDraft = () => {
    if (!contentRef.current) return;
    const newContent = contentRef.current.innerText || contentRef.current.textContent || '';
    setContent(newContent);
    setDraft(newContent);
    if (onContentChange) {
      onContentChange(newContent);
    }
    setIsEditing(false);
  };

  const cancelEdit = () => {
    if (contentRef.current) {
      contentRef.current.textContent = draft;
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      saveDraft();
    }
    if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  // Use a dynamic tag while keeping type-safety relaxed for contentEditable
  const Tag = tag as any;
  const WrapperTag = (tag === 'span' ? 'span' : 'div') as any;

  if (isEditing) {
    return (
      <WrapperTag className="editable-wrapper">
        <Tag
          ref={contentRef as any}
          contentEditable
          suppressContentEditableWarning
          onKeyDown={handleKeyDown}
          className={`editable-content-editing ${className}`}
          style={{
            outline: '2px solid var(--blue-bell)',
            outlineOffset: '2px',
            borderRadius: '8px',
            padding: '12px',
            minHeight: '48px',
            backgroundColor: '#E8F4FD',
            boxShadow: '0 4px 12px rgba(34, 75, 184, 0.15)'
          }}
        >
          {draft || placeholder}
        </Tag>
        <WrapperTag className="editable-actions">
          <IconButton aria-label="حفظ" color="primary" size="small" onClick={saveDraft}>
            <SaveIcon fontSize="small" />
          </IconButton>
          <IconButton aria-label="إلغاء" color="secondary" size="small" onClick={cancelEdit}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </WrapperTag>
      </WrapperTag>
    );
  }

  return (
    <WrapperTag className="editable-display-wrapper">
      <Tag
        className={`editable-content-display ${className}`}
        onClick={() => setIsEditing(true)}
        title="انقر للتحرير"
        style={{ cursor: 'pointer', position: 'relative' }}
      >
        {content || placeholder || 'انقر للتحرير'}
      </Tag>
      <IconButton aria-label="تحرير" size="small" className="editable-edit-btn" onClick={() => setIsEditing(true)}>
        <EditIcon fontSize="small" />
      </IconButton>
    </WrapperTag>
  );
};

export default EditableContent;

