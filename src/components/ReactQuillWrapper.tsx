import React, { useEffect, useState } from 'react';

interface ReactQuillWrapperProps {
  value: string;
  onChange: (value: string) => void;
  modules?: any;
  formats?: string[];
  placeholder?: string;
}

const ReactQuillWrapper: React.FC<ReactQuillWrapperProps> = ({
  value,
  onChange,
  modules,
  formats,
  placeholder
}) => {
  const [ReactQuill, setReactQuill] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Dynamically import ReactQuill only on client side
    if (typeof window !== 'undefined') {
      import('react-quill').then((module) => {
        import('react-quill/dist/quill.snow.css');
        setReactQuill(() => module.default);
        setMounted(true);
      });
    }
  }, []);

  if (!mounted || !ReactQuill) {
    return (
      <div style={{ minHeight: '300px', padding: '12px', border: '1px solid #ccc', borderRadius: '4px', direction: 'rtl' }}>
        جاري تحميل المحرر...
      </div>
    );
  }

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      placeholder={placeholder}
    />
  );
};

export default ReactQuillWrapper;

