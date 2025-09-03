import React from 'react';
import { Box } from '@mui/material';
import MenuBar from './MenuBar';

export default function MenuDemo() {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <MenuBar mobileUI={false} />
      <Box sx={{ flex: 1, p: 2, backgroundColor: '#f5f5f5' }}>
        <h2>PLC Simulator - Menu Bar Demo</h2>
        <p>This is a demo of the new GX Works 2 style menu bar.</p>
        <p>Try clicking on the menu items to see the dropdown menus.</p>
        <p>Features implemented:</p>
        <ul>
          <li>File Menu - New, Open, Save, Export, Import</li>
          <li>Edit Menu - Undo, Redo, Cut, Copy, Paste, Delete</li>
          <li>View Menu - Zoom, Grid, Ruler, Panels</li>
          <li>Tools Menu - Simulation, Validation, Settings</li>
          <li>Help Menu - Documentation, Tutorials, About</li>
        </ul>
      </Box>
    </Box>
  );
}
