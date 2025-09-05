import React from 'react';
import GXWorks2StyleIDE from './gx-works2/GXWorks2StyleIDE';

/**
 * Wrapper component for GX Works 2 interface
 * Provides CSS isolation for TailwindCSS based IDE
 */
const GXWorks2Wrapper: React.FC = () => {
  return (
    <div className="gx-works2-interface">
      <GXWorks2StyleIDE />
    </div>
  );
};

export default GXWorks2Wrapper;
