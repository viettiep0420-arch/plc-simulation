import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  Button,
  Divider,
  Box,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  FileOpen,
  Save,
  SaveAlt,
  GetApp,
  Upload,
  History,
  Undo,
  Redo,
  ContentCut,
  ContentCopy,
  ContentPaste,
  Delete,
  SelectAll,
  FindInPage,
  ZoomIn,
  ZoomOut,
  Fullscreen,
  GridOn,
  Straighten,
  ViewList,
  Build,
  PlayArrow,
  Stop,
  SkipNext,
  CheckCircle,
  Settings,
  Help,
  Info,
} from '@mui/icons-material';
import { Store } from '../../interface';
import { 
  UNDO, REDO, LOAD_EMPTY, LOAD_SAMPLE, DELETE_OBJECT,
  SAVE_PROJECT, SAVE_PROJECT_AS, EXPORT_PROJECT, IMPORT_PROJECT_FILE,
  CUT_SELECTION, COPY_SELECTION, PASTE_SELECTION, SELECT_ALL, FIND_REPLACE,
  ZOOM_IN, ZOOM_OUT, FIT_TO_SCREEN, TOGGLE_GRID, TOGGLE_RULER, 
  TOGGLE_VARIABLES_PANEL, TOGGLE_TOOLBOX, TOGGLE_FULLSCREEN,
  START_SIMULATION, STOP_SIMULATION, STEP_THROUGH, CHECK_SYNTAX, 
  VALIDATE_LOGIC, OPEN_SETTINGS,
  OPEN_DOCUMENTATION, OPEN_TUTORIALS, OPEN_EXAMPLES, OPEN_SHORTCUTS, OPEN_ABOUT
} from '../../store/types';
import { BG_MENU } from '../../consts/colors';
import firebase from 'firebase/compat/app';
import 'firebase/compat/analytics';

interface MenuBarProps {
  mobileUI?: boolean;
}

export default function MenuBar({ mobileUI = false }: MenuBarProps) {
  const dispatch = useDispatch();
  const canRedo = useSelector((state: Store) => state.temp.canRedo);
  const canUndo = useSelector((state: Store) => state.temp.canUndo);
  
  // Menu states
  const [fileMenuAnchor, setFileMenuAnchor] = useState<null | HTMLElement>(null);
  const [editMenuAnchor, setEditMenuAnchor] = useState<null | HTMLElement>(null);
  const [viewMenuAnchor, setViewMenuAnchor] = useState<null | HTMLElement>(null);
  const [toolsMenuAnchor, setToolsMenuAnchor] = useState<null | HTMLElement>(null);
  const [helpMenuAnchor, setHelpMenuAnchor] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, setAnchor: (anchor: HTMLElement | null) => void) => {
    setAnchor(event.currentTarget);
  };

  const handleMenuClose = (setAnchor: (anchor: HTMLElement | null) => void) => {
    setAnchor(null);
  };

  const dispatchAction = (actionType: string) => {
    firebase.analytics().logEvent('menu_action', { action: actionType });
    dispatch({ type: actionType });
  };

  const handleFileAction = (action: string) => {
    switch (action) {
      case 'new':
        dispatchAction(LOAD_EMPTY);
        break;
      case 'open':
        dispatchAction(LOAD_SAMPLE);
        break;
      case 'save':
        dispatchAction(SAVE_PROJECT);
        break;
      case 'saveAs':
        dispatchAction(SAVE_PROJECT_AS);
        break;
      case 'export':
        dispatchAction(EXPORT_PROJECT);
        break;
      case 'import':
        dispatchAction(IMPORT_PROJECT_FILE);
        break;
    }
    handleMenuClose(setFileMenuAnchor);
  };

  const handleEditAction = (action: string) => {
    switch (action) {
      case 'undo':
        dispatchAction(UNDO);
        break;
      case 'redo':
        dispatchAction(REDO);
        break;
      case 'cut':
        dispatchAction(CUT_SELECTION);
        break;
      case 'copy':
        dispatchAction(COPY_SELECTION);
        break;
      case 'paste':
        dispatchAction(PASTE_SELECTION);
        break;
      case 'delete':
        dispatchAction(DELETE_OBJECT);
        break;
      case 'selectAll':
        dispatchAction(SELECT_ALL);
        break;
      case 'find':
        dispatchAction(FIND_REPLACE);
        break;
    }
    handleMenuClose(setEditMenuAnchor);
  };

  const handleViewAction = (action: string) => {
    switch (action) {
      case 'zoomIn':
        dispatchAction(ZOOM_IN);
        break;
      case 'zoomOut':
        dispatchAction(ZOOM_OUT);
        break;
      case 'fitToScreen':
        dispatchAction(FIT_TO_SCREEN);
        break;
      case 'showGrid':
        dispatchAction(TOGGLE_GRID);
        break;
      case 'showRuler':
        dispatchAction(TOGGLE_RULER);
        break;
      case 'showVariables':
        dispatchAction(TOGGLE_VARIABLES_PANEL);
        break;
      case 'showToolbox':
        dispatchAction(TOGGLE_TOOLBOX);
        break;
      case 'fullscreen':
        dispatchAction(TOGGLE_FULLSCREEN);
        break;
    }
    handleMenuClose(setViewMenuAnchor);
  };

  const handleToolsAction = (action: string) => {
    switch (action) {
      case 'startSimulation':
        dispatchAction(START_SIMULATION);
        break;
      case 'stopSimulation':
        dispatchAction(STOP_SIMULATION);
        break;
      case 'stepThrough':
        dispatchAction(STEP_THROUGH);
        break;
      case 'checkSyntax':
        dispatchAction(CHECK_SYNTAX);
        break;
      case 'validateLogic':
        dispatchAction(VALIDATE_LOGIC);
        break;
      case 'settings':
        dispatchAction(OPEN_SETTINGS);
        break;
    }
    handleMenuClose(setToolsMenuAnchor);
  };

  const handleHelpAction = (action: string) => {
    switch (action) {
      case 'documentation':
        dispatchAction(OPEN_DOCUMENTATION);
        break;
      case 'tutorials':
        dispatchAction(OPEN_TUTORIALS);
        break;
      case 'examples':
        dispatchAction(OPEN_EXAMPLES);
        break;
      case 'shortcuts':
        dispatchAction(OPEN_SHORTCUTS);
        break;
      case 'about':
        dispatchAction(OPEN_ABOUT);
        break;
    }
    handleMenuClose(setHelpMenuAnchor);
  };

  // Mobile version - simplified toolbar
  if (mobileUI) {
    return (
      <AppBar position="static" sx={{ backgroundColor: BG_MENU }}>
        <Toolbar variant="dense">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            PLC Simulator
          </Typography>
          <Tooltip title="Undo">
            <IconButton 
              onClick={() => dispatchAction(UNDO)} 
              disabled={!canUndo}
              color="inherit"
            >
              <Undo />
            </IconButton>
          </Tooltip>
          <Tooltip title="Redo">
            <IconButton 
              onClick={() => dispatchAction(REDO)} 
              disabled={!canRedo}
              color="inherit"
            >
              <Redo />
            </IconButton>
          </Tooltip>
          <Tooltip title="Settings">
            <IconButton 
              onClick={() => handleToolsAction('settings')}
              color="inherit"
            >
              <Settings />
            </IconButton>
          </Tooltip>
          <Tooltip title="Help">
            <IconButton 
              onClick={() => handleHelpAction('documentation')}
              color="inherit"
            >
              <Help />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    );
  }

  // Desktop version - full menu bar
  return (
    <AppBar position="static" sx={{ backgroundColor: BG_MENU }}>
      <Toolbar variant="dense">
        {/* File Menu */}
        <Button
          color="inherit"
          onClick={(e) => handleMenuOpen(e, setFileMenuAnchor)}
          sx={{ textTransform: 'none' }}
        >
          File
        </Button>
        <Menu
          anchorEl={fileMenuAnchor}
          open={Boolean(fileMenuAnchor)}
          onClose={() => handleMenuClose(setFileMenuAnchor)}
        >
          <MenuItem onClick={() => handleFileAction('new')}>
            <FileOpen sx={{ mr: 1 }} />
            New Project
          </MenuItem>
          <MenuItem onClick={() => handleFileAction('open')}>
            <FileOpen sx={{ mr: 1 }} />
            Open Project
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => handleFileAction('save')}>
            <Save sx={{ mr: 1 }} />
            Save Project
          </MenuItem>
          <MenuItem onClick={() => handleFileAction('saveAs')}>
            <SaveAlt sx={{ mr: 1 }} />
            Save As...
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => handleFileAction('export')}>
            <GetApp sx={{ mr: 1 }} />
            Export...
          </MenuItem>
          <MenuItem onClick={() => handleFileAction('import')}>
            <Upload sx={{ mr: 1 }} />
            Import...
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => handleFileAction('recent')}>
            <History sx={{ mr: 1 }} />
            Recent Projects
          </MenuItem>
        </Menu>

        {/* Edit Menu */}
        <Button
          color="inherit"
          onClick={(e) => handleMenuOpen(e, setEditMenuAnchor)}
          sx={{ textTransform: 'none' }}
        >
          Edit
        </Button>
        <Menu
          anchorEl={editMenuAnchor}
          open={Boolean(editMenuAnchor)}
          onClose={() => handleMenuClose(setEditMenuAnchor)}
        >
          <MenuItem onClick={() => handleEditAction('undo')} disabled={!canUndo}>
            <Undo sx={{ mr: 1 }} />
            Undo
          </MenuItem>
          <MenuItem onClick={() => handleEditAction('redo')} disabled={!canRedo}>
            <Redo sx={{ mr: 1 }} />
            Redo
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => handleEditAction('cut')}>
            <ContentCut sx={{ mr: 1 }} />
            Cut
          </MenuItem>
          <MenuItem onClick={() => handleEditAction('copy')}>
            <ContentCopy sx={{ mr: 1 }} />
            Copy
          </MenuItem>
          <MenuItem onClick={() => handleEditAction('paste')}>
            <ContentPaste sx={{ mr: 1 }} />
            Paste
          </MenuItem>
          <MenuItem onClick={() => handleEditAction('delete')}>
            <Delete sx={{ mr: 1 }} />
            Delete
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => handleEditAction('selectAll')}>
            <SelectAll sx={{ mr: 1 }} />
            Select All
          </MenuItem>
          <MenuItem onClick={() => handleEditAction('find')}>
            <FindInPage sx={{ mr: 1 }} />
            Find/Replace...
          </MenuItem>
        </Menu>

        {/* View Menu */}
        <Button
          color="inherit"
          onClick={(e) => handleMenuOpen(e, setViewMenuAnchor)}
          sx={{ textTransform: 'none' }}
        >
          View
        </Button>
        <Menu
          anchorEl={viewMenuAnchor}
          open={Boolean(viewMenuAnchor)}
          onClose={() => handleMenuClose(setViewMenuAnchor)}
        >
          <MenuItem onClick={() => handleViewAction('zoomIn')}>
            <ZoomIn sx={{ mr: 1 }} />
            Zoom In
          </MenuItem>
          <MenuItem onClick={() => handleViewAction('zoomOut')}>
            <ZoomOut sx={{ mr: 1 }} />
            Zoom Out
          </MenuItem>
          <MenuItem onClick={() => handleViewAction('fitToScreen')}>
            <Fullscreen sx={{ mr: 1 }} />
            Fit to Screen
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => handleViewAction('showGrid')}>
            <GridOn sx={{ mr: 1 }} />
            Show Grid
          </MenuItem>
          <MenuItem onClick={() => handleViewAction('showRuler')}>
            <Straighten sx={{ mr: 1 }} />
            Show Ruler
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => handleViewAction('showVariables')}>
            <ViewList sx={{ mr: 1 }} />
            Show Variables Panel
          </MenuItem>
          <MenuItem onClick={() => handleViewAction('showToolbox')}>
            <Build sx={{ mr: 1 }} />
            Show Toolbox
          </MenuItem>
        </Menu>

        {/* Tools Menu */}
        <Button
          color="inherit"
          onClick={(e) => handleMenuOpen(e, setToolsMenuAnchor)}
          sx={{ textTransform: 'none' }}
        >
          Tools
        </Button>
        <Menu
          anchorEl={toolsMenuAnchor}
          open={Boolean(toolsMenuAnchor)}
          onClose={() => handleMenuClose(setToolsMenuAnchor)}
        >
          <MenuItem onClick={() => handleToolsAction('startSimulation')}>
            <PlayArrow sx={{ mr: 1 }} />
            Start Simulation
          </MenuItem>
          <MenuItem onClick={() => handleToolsAction('stopSimulation')}>
            <Stop sx={{ mr: 1 }} />
            Stop Simulation
          </MenuItem>
          <MenuItem onClick={() => handleToolsAction('stepThrough')}>
            <SkipNext sx={{ mr: 1 }} />
            Step Through
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => handleToolsAction('checkSyntax')}>
            <CheckCircle sx={{ mr: 1 }} />
            Check Syntax
          </MenuItem>
          <MenuItem onClick={() => handleToolsAction('validateLogic')}>
            <CheckCircle sx={{ mr: 1 }} />
            Validate Logic
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => handleToolsAction('settings')}>
            <Settings sx={{ mr: 1 }} />
            Settings...
          </MenuItem>
        </Menu>

        {/* Help Menu */}
        <Button
          color="inherit"
          onClick={(e) => handleMenuOpen(e, setHelpMenuAnchor)}
          sx={{ textTransform: 'none' }}
        >
          Help
        </Button>
        <Menu
          anchorEl={helpMenuAnchor}
          open={Boolean(helpMenuAnchor)}
          onClose={() => handleMenuClose(setHelpMenuAnchor)}
        >
          <MenuItem onClick={() => handleHelpAction('documentation')}>
            <Help sx={{ mr: 1 }} />
            Documentation
          </MenuItem>
          <MenuItem onClick={() => handleHelpAction('tutorials')}>
            <Help sx={{ mr: 1 }} />
            Tutorials
          </MenuItem>
          <MenuItem onClick={() => handleHelpAction('examples')}>
            <Help sx={{ mr: 1 }} />
            Examples
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => handleHelpAction('shortcuts')}>
            <Help sx={{ mr: 1 }} />
            Keyboard Shortcuts
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => handleHelpAction('about')}>
            <Info sx={{ mr: 1 }} />
            About
          </MenuItem>
        </Menu>

        <Box sx={{ flexGrow: 1 }} />
        
        {/* Quick Actions */}
        <Tooltip title="Undo">
          <IconButton 
            onClick={() => dispatchAction(UNDO)} 
            disabled={!canUndo}
            color="inherit"
            size="small"
          >
            <Undo />
          </IconButton>
        </Tooltip>
        <Tooltip title="Redo">
          <IconButton 
            onClick={() => dispatchAction(REDO)} 
            disabled={!canRedo}
            color="inherit"
            size="small"
          >
            <Redo />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
