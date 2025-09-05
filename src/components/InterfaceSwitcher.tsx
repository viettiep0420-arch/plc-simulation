import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Navigation component for switching between Original IDE and GX Works 2 interfaces
 */
const InterfaceSwitcher: React.FC = () => {
  const location = useLocation();

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      zIndex: 1000,
      display: 'flex',
      gap: '8px',
      backgroundColor: 'white',
      padding: '8px 12px',
      borderRadius: '6px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      border: '1px solid #e0e0e0'
    }}>
      <Link 
        to="/original-ide"
        style={{
          padding: '6px 12px',
          borderRadius: '4px',
          textDecoration: 'none',
          fontSize: '14px',
          fontWeight: location.pathname === '/original-ide' ? '600' : '400',
          color: location.pathname === '/original-ide' ? '#1976d2' : '#666',
          backgroundColor: location.pathname === '/original-ide' ? '#e3f2fd' : 'transparent',
          border: location.pathname === '/original-ide' ? '1px solid #1976d2' : '1px solid #ccc'
        }}
      >
        Original IDE
      </Link>
      <Link 
        to="/gx-works2"
        style={{
          padding: '6px 12px',
          borderRadius: '4px',
          textDecoration: 'none',
          fontSize: '14px',
          fontWeight: location.pathname === '/gx-works2' ? '600' : '400',
          color: location.pathname === '/gx-works2' ? '#1976d2' : '#666',
          backgroundColor: location.pathname === '/gx-works2' ? '#e3f2fd' : 'transparent',
          border: location.pathname === '/gx-works2' ? '1px solid #1976d2' : '1px solid #ccc'
        }}
      >
        GX Works 2
      </Link>
    </div>
  );
};

export default InterfaceSwitcher;
