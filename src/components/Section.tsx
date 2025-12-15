import React from 'react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <section className="contract-section">
      <h2 className="section-title">{title}</h2>
      <div className="section-content">{children}</div>
    </section>
  );
};

export default Section;

