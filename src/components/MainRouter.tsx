import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import OriginalIDEWrapper from './OriginalIDEWrapper';
import GXWorks2Wrapper from './GXWorks2Wrapper';
import InterfaceSwitcher from './InterfaceSwitcher';

const MainRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <InterfaceSwitcher />
      <Routes>
        <Route path="/original-ide" element={<OriginalIDEWrapper />} />
        <Route path="/gx-works2" element={<GXWorks2Wrapper />} />
        <Route path="/" element={<Navigate to="/original-ide" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
