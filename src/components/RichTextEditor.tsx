import React, { useRef, useEffect, useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import TitleIcon from '@mui/icons-material/Title';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'أدخل النص...'
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
    handleInput();
  };

  const insertHeading = (level: number) => {
    execCommand('formatBlock', `h${level}`);
  };

  const setAlignment = (align: string) => {
    execCommand('justify' + align.charAt(0).toUpperCase() + align.slice(1));
  };

  const setColor = (type: 'foreColor' | 'backColor') => {
    const color = prompt('أدخل لون (مثال: #000000 أو red):', '#000000');
    if (color) {
      execCommand(type, color);
    }
  };

  return (
    <div className="rich-text-editor">
      <div className="rich-text-toolbar">
        <Tooltip title="تراجع">
          <IconButton
            size="small"
            onClick={() => execCommand('undo')}
          >
            <UndoIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="إعادة">
          <IconButton
            size="small"
            onClick={() => execCommand('redo')}
          >
            <RedoIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <div className="toolbar-divider" />
        
        <Tooltip title="عريض">
          <IconButton
            size="small"
            onClick={() => execCommand('bold')}
          >
            <FormatBoldIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="مائل">
          <IconButton
            size="small"
            onClick={() => execCommand('italic')}
          >
            <FormatItalicIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="تحته خط">
          <IconButton
            size="small"
            onClick={() => execCommand('underline')}
          >
            <FormatUnderlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="خط في المنتصف">
          <IconButton
            size="small"
            onClick={() => execCommand('strikeThrough')}
          >
            <StrikethroughSIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <div className="toolbar-divider" />
        
        <Tooltip title="عنوان 1">
          <IconButton
            size="small"
            onClick={() => insertHeading(1)}
          >
            <TitleIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="عنوان 2">
          <IconButton
            size="small"
            onClick={() => insertHeading(2)}
          >
            <TitleIcon fontSize="small" style={{ fontSize: '16px' }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="عنوان 3">
          <IconButton
            size="small"
            onClick={() => insertHeading(3)}
          >
            <TitleIcon fontSize="small" style={{ fontSize: '14px' }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="عنوان 4">
          <IconButton
            size="small"
            onClick={() => insertHeading(4)}
          >
            <TitleIcon fontSize="small" style={{ fontSize: '12px' }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="عنوان 5">
          <IconButton
            size="small"
            onClick={() => insertHeading(5)}
          >
            <TitleIcon fontSize="small" style={{ fontSize: '10px' }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="عنوان 6">
          <IconButton
            size="small"
            onClick={() => insertHeading(6)}
          >
            <TitleIcon fontSize="small" style={{ fontSize: '8px' }} />
          </IconButton>
        </Tooltip>
        <div className="toolbar-divider" />
        
        <Tooltip title="محاذاة يمين">
          <IconButton
            size="small"
            onClick={() => setAlignment('right')}
          >
            <FormatAlignRightIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="محاذاة وسط">
          <IconButton
            size="small"
            onClick={() => setAlignment('center')}
          >
            <FormatAlignCenterIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="محاذاة يسار">
          <IconButton
            size="small"
            onClick={() => setAlignment('left')}
          >
            <FormatAlignLeftIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="محاذاة كاملة">
          <IconButton
            size="small"
            onClick={() => setAlignment('justify')}
          >
            <FormatAlignJustifyIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <div className="toolbar-divider" />
        
        <Tooltip title="لون النص">
          <IconButton
            size="small"
            onClick={() => setColor('foreColor')}
          >
            <FormatColorTextIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="لون الخلفية">
          <IconButton
            size="small"
            onClick={() => setColor('backColor')}
          >
            <FormatColorFillIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <div className="toolbar-divider" />
        
        <Tooltip title="قائمة نقطية">
          <IconButton
            size="small"
            onClick={() => execCommand('insertUnorderedList')}
          >
            <FormatListBulletedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="قائمة مرقمة">
          <IconButton
            size="small"
            onClick={() => execCommand('insertOrderedList')}
          >
            <FormatListNumberedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </div>
      <div
        ref={editorRef}
        contentEditable
        className="rich-text-content"
        onInput={handleInput}
        onPaste={handlePaste}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        data-placeholder={placeholder}
        suppressContentEditableWarning
        style={{
          minHeight: '300px',
          padding: '15px',
          border: isFocused ? '2px solid var(--blue-bell)' : '1px solid #ddd',
          borderRadius: '4px',
          outline: 'none',
          direction: 'rtl',
          textAlign: 'right',
          fontFamily: "'Almarai', 'Cairo', 'Segoe UI', sans-serif",
          fontSize: '1.1rem',
          lineHeight: '1.8',
          backgroundColor: '#fff'
        }}
      />
    </div>
  );
};

export default RichTextEditor;

