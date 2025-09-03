import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { ADD_ELEMENT } from '../../store/types';
import Diagram from '../diagram/Diagram';
import { coil as coilBlock, contact as contactBlock, counter as counterBlock, math as mathBlock, timer as timerBlock, compare as compareBlock, move as moveBlock } from '../toolbox/elements';
import { XIO } from '../../consts/elementTypes';
import { 
  FileText, 
  FolderOpen, 
  Save, 
  Printer, 
  HelpCircle,
  Scissors, 
  Copy, 
  Clipboard, 
  Undo, 
  Redo,
  Search,
  Play,
  Square,
  Monitor,
  Settings,
  Navigation,
  List,
  Eye,
  Crosshair,
  Watch,
  Brain,
  Search as Find,
  Zap,
  Minus,
  Plus,
  Trash2,
  Edit3,
  MessageSquare,
  Bookmark,
  ZoomIn,
  ZoomOut,
  Wifi,
  WifiOff,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Circle
} from 'lucide-react';

interface GXWorks2IDEProps {
  // Props interface for GX Works2 IDE
}

export default function GXWorks2IDE(props: GXWorks2IDEProps) {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('MAIN');
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected'>('disconnected');
  const [compileStatus, setCompileStatus] = useState<'success' | 'error' | 'warning'>('success');
  const [errorCount, setErrorCount] = useState(0);
  const [warningCount, setWarningCount] = useState(0);
  const [showInstrPicker, setShowInstrPicker] = useState(false);

  const addElement = (blockTemplate: any) => {
    // Clone to avoid mutating shared templates
    const block = JSON.parse(JSON.stringify(blockTemplate));
    dispatch({ type: ADD_ELEMENT, payload: { block, blockId: nanoid() } });
  };

  const handleOpenContact = () => addElement(contactBlock); // XIC
  const handleCloseContact = () => {
    const nc = JSON.parse(JSON.stringify(contactBlock));
    nc.type = XIO; // Normally Closed
    addElement(nc);
  };
  const handleCoil = () => addElement(coilBlock);

  const instructionOptions = useMemo(
    () => ([
      { key: 'timer', label: 'Timer (TON)', block: timerBlock },
      { key: 'counter', label: 'Counter (CTU)', block: counterBlock },
      { key: 'math', label: 'Math (ADD)', block: mathBlock },
      { key: 'compare', label: 'Compare (EQU)', block: compareBlock },
      { key: 'move', label: 'Move (MOVE)', block: moveBlock },
    ]),
    []
  );

  const handlePickInstruction = (key: string) => {
    const item = instructionOptions.find((o) => o.key === key);
    if (item) addElement(item.block);
    setShowInstrPicker(false);
  };

  const tabs = ['MAIN', 'Parameter', 'Device Comment', 'Label'];

  return (
    <div className="h-screen bg-gray-100 flex flex-col font-sans text-sm">
      {/* Header - Main Menu Bar */}
      <header className="bg-white border-b border-gray-300 h-8 flex items-center px-2">
        <div className="flex space-x-6 text-xs">
          <button className="hover:bg-gray-200 px-2 py-1 rounded">Project</button>
          <button className="hover:bg-gray-200 px-2 py-1 rounded">Edit</button>
          <button className="hover:bg-gray-200 px-2 py-1 rounded">Find/Replace</button>
          <button className="hover:bg-gray-200 px-2 py-1 rounded">Compile</button>
          <button className="hover:bg-gray-200 px-2 py-1 rounded">View</button>
          <button className="hover:bg-gray-200 px-2 py-1 rounded">Online</button>
          <button className="hover:bg-gray-200 px-2 py-1 rounded">Debug</button>
          <button className="hover:bg-gray-200 px-2 py-1 rounded">Diagnostics</button>
          <button className="hover:bg-gray-200 px-2 py-1 rounded">Tool</button>
          <button className="hover:bg-gray-200 px-2 py-1 rounded">Window</button>
          <button className="hover:bg-gray-200 px-2 py-1 rounded">Help</button>
        </div>
      </header>

      {/* Standard Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 h-10 flex items-center px-2 space-x-1">
        <button className="flex items-center space-x-1 px-2 py-1 hover:bg-gray-200 rounded text-xs">
          <FileText size={14} />
          <span>New</span>
        </button>
        <button className="flex items-center space-x-1 px-2 py-1 hover:bg-gray-200 rounded text-xs">
          <FolderOpen size={14} />
          <span>Open</span>
        </button>
        <button className="flex items-center space-x-1 px-2 py-1 hover:bg-gray-200 rounded text-xs">
          <Save size={14} />
          <span>Save</span>
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        <button className="flex items-center space-x-1 px-2 py-1 hover:bg-gray-200 rounded text-xs">
          <Printer size={14} />
          <span>Print</span>
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        <button className="flex items-center space-x-1 px-2 py-1 hover:bg-gray-200 rounded text-xs">
          <HelpCircle size={14} />
          <span>Help</span>
        </button>
      </div>

      {/* Program Common Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 h-10 flex items-center px-2 space-x-1">
        <button className="flex items-center space-x-1 px-2 py-1 hover:bg-gray-200 rounded text-xs">
          <Scissors size={14} />
          <span>Cut</span>
        </button>
        <button className="flex items-center space-x-1 px-2 py-1 hover:bg-gray-200 rounded text-xs">
          <Copy size={14} />
          <span>Copy</span>
        </button>
        <button className="flex items-center space-x-1 px-2 py-1 hover:bg-gray-200 rounded text-xs">
          <Clipboard size={14} />
          <span>Paste</span>
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        <button className="flex items-center space-x-1 px-2 py-1 hover:bg-gray-200 rounded text-xs">
          <Undo size={14} />
          <span>Undo</span>
        </button>
        <button className="flex items-center space-x-1 px-2 py-1 hover:bg-gray-200 rounded text-xs">
          <Redo size={14} />
          <span>Redo</span>
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        <button className="flex items-center space-x-1 px-2 py-1 hover:bg-gray-200 rounded text-xs">
          <Search size={14} />
          <span>Find Device</span>
        </button>
        <button className="flex items-center space-x-1 px-2 py-1 hover:bg-gray-200 rounded text-xs">
          <Search size={14} />
          <span>Find Instruction</span>
        </button>
        <button className="flex items-center space-x-1 px-2 py-1 hover:bg-gray-200 rounded text-xs">
          <Search size={14} />
          <span>Find Contact/Coil</span>
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        <button className="flex items-center space-x-1 px-2 py-1 hover:bg-gray-200 rounded text-xs">
          <Play size={14} />
          <span>Write to PLC</span>
        </button>
        <button className="flex items-center space-x-1 px-2 py-1 hover:bg-gray-200 rounded text-xs">
          <Square size={14} />
          <span>Read from PLC</span>
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        <button className="flex items-center space-x-1 px-2 py-1 hover:bg-gray-200 rounded text-xs">
          <Monitor size={14} />
          <span>Start Monitor</span>
        </button>
        <button className="flex items-center space-x-1 px-2 py-1 hover:bg-gray-200 rounded text-xs">
          <Square size={14} />
          <span>Stop Monitor</span>
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        <button className="flex items-center space-x-1 px-2 py-1 hover:bg-gray-200 rounded text-xs">
          <Settings size={14} />
          <span>Device Monitor</span>
        </button>
        <button className="flex items-center space-x-1 px-2 py-1 hover:bg-gray-200 rounded text-xs">
          <Edit3 size={14} />
          <span>Modify Value</span>
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        <button className="flex items-center space-x-1 px-2 py-1 hover:bg-gray-200 rounded text-xs">
          <Play size={14} />
          <span>Start Simulation</span>
        </button>
        <button className="flex items-center space-x-1 px-2 py-1 hover:bg-gray-200 rounded text-xs">
          <Square size={14} />
          <span>Stop Simulation</span>
        </button>
      </div>

      {/* Docking Window / Switch Project Data Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 h-10 flex items-center px-2 space-x-1">
        <button className="flex items-center space-x-1 px-2 py-1 hover:bg-gray-200 rounded text-xs">
          <Navigation size={14} />
          <span>Navigation</span>
        </button>
        <button className="flex items-center space-x-1 px-2 py-1 hover:bg-gray-200 rounded text-xs">
          <List size={14} />
          <span>Element Selection</span>
        </button>
        <button className="flex items-center space-x-1 px-2 py-1 hover:bg-gray-200 rounded text-xs">
          <Eye size={14} />
          <span>Output Window</span>
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        <button className="flex items-center space-x-1 px-2 py-1 hover:bg-gray-200 rounded text-xs">
          <Crosshair size={14} />
          <span>Cross Reference</span>
        </button>
        <button className="flex items-center space-x-1 px-2 py-1 hover:bg-gray-200 rounded text-xs">
          <List size={14} />
          <span>Device List</span>
        </button>
        <button className="flex items-center space-x-1 px-2 py-1 hover:bg-gray-200 rounded text-xs">
          <Eye size={14} />
          <span>Device Reference</span>
        </button>
        <button className="flex items-center space-x-1 px-2 py-1 hover:bg-gray-200 rounded text-xs">
          <Watch size={14} />
          <span>Watch</span>
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        <button className="flex items-center space-x-1 px-2 py-1 hover:bg-gray-200 rounded text-xs">
          <Brain size={14} />
          <span>Intelligence Module</span>
        </button>
        <button className="flex items-center space-x-1 px-2 py-1 hover:bg-gray-200 rounded text-xs">
          <Find size={14} />
          <span>Find/Replace</span>
        </button>
      </div>

      {/* Ladder Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 h-10 flex items-center px-2 space-x-1">
        {/* Logic Buttons */}
        <div className="flex items-center space-x-1">
          <span className="text-xs text-gray-600 mr-2">Logic:</span>
          <button onClick={handleOpenContact} className="flex items-center space-x-1 px-2 py-1 hover:bg-gray-200 rounded text-xs">
            <Zap size={14} />
            <span>Open Contact</span>
          </button>
          <button onClick={handleCloseContact} className="flex items-center space-x-1 px-2 py-1 hover:bg-gray-200 rounded text-xs">
            <Minus size={14} />
            <span>Close Contact</span>
          </button>
          <button disabled className="flex items-center space-x-1 px-2 py-1 rounded text-xs opacity-50 cursor-not-allowed">
            <Plus size={14} />
            <span>Open Branch</span>
          </button>
          <button disabled className="flex items-center space-x-1 px-2 py-1 rounded text-xs opacity-50 cursor-not-allowed">
            <Minus size={14} />
            <span>Close Branch</span>
          </button>
          <button onClick={handleCoil} className="flex items-center space-x-1 px-2 py-1 hover:bg-gray-200 rounded text-xs">
            <Circle size={14} />
            <span>Coil</span>
          </button>
          <button onClick={() => setShowInstrPicker((v) => !v)} className="flex items-center space-x-1 px-2 py-1 hover:bg-gray-200 rounded text-xs relative">
            <Settings size={14} />
            <span>Application Instruction</span>
            {showInstrPicker && (
              <div className="absolute top-8 left-0 z-10 bg-white border border-gray-300 rounded shadow text-xs w-48">
                {instructionOptions.map((opt) => (
                  <button key={opt.key} onClick={() => handlePickInstruction(opt.key)} className="w-full text-left px-2 py-1 hover:bg-gray-100">
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </button>
        </div>
        
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        
        {/* Draw Buttons */}
        <div className="flex items-center space-x-1">
          <span className="text-xs text-gray-600 mr-2">Draw:</span>
          <button className="flex items-center space-x-1 px-2 py-1 hover:bg-gray-200 rounded text-xs">
            <Minus size={14} />
            <span>Horizontal Line</span>
          </button>
          <button className="flex items-center space-x-1 px-2 py-1 hover:bg-gray-200 rounded text-xs">
            <Plus size={14} />
            <span>Vertical Line</span>
          </button>
          <button className="flex items-center space-x-1 px-2 py-1 hover:bg-gray-200 rounded text-xs">
            <Trash2 size={14} />
            <span>Delete Line</span>
          </button>
        </div>
        
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        
        {/* Mode Buttons */}
        <div className="flex items-center space-x-1">
          <span className="text-xs text-gray-600 mr-2">Mode:</span>
          <button className="flex items-center space-x-1 px-2 py-1 hover:bg-gray-200 rounded text-xs bg-blue-100">
            <Eye size={14} />
            <span>Read Mode</span>
          </button>
          <button className="flex items-center space-x-1 px-2 py-1 hover:bg-gray-200 rounded text-xs">
            <Edit3 size={14} />
            <span>Write Mode</span>
          </button>
          <button className="flex items-center space-x-1 px-2 py-1 hover:bg-gray-200 rounded text-xs">
            <Monitor size={14} />
            <span>Monitor Mode</span>
          </button>
        </div>
        
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        
        {/* Zoom */}
        <div className="flex items-center space-x-1">
          <button className="flex items-center space-x-1 px-2 py-1 hover:bg-gray-200 rounded text-xs">
            <ZoomIn size={14} />
          </button>
          <button className="flex items-center space-x-1 px-2 py-1 hover:bg-gray-200 rounded text-xs">
            <ZoomOut size={14} />
          </button>
          <span className="text-xs text-gray-600">100%</span>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 flex">
        {/* Left Panel - Navigation */}
        <div className="w-64 bg-white border-r border-gray-300 flex flex-col">
          <div className="h-8 bg-gray-100 border-b border-gray-300 flex items-center px-2">
            <span className="text-xs font-medium">Navigation</span>
          </div>
          <div className="flex-1 p-2">
            <div className="space-y-1">
              <div className="text-xs text-gray-600 mb-2">Project Structure</div>
              <div className="space-y-1">
                <div className="flex items-center space-x-1 text-xs hover:bg-gray-100 p-1 rounded cursor-pointer">
                  <FileText size={12} />
                  <span>MAIN</span>
                </div>
                <div className="flex items-center space-x-1 text-xs hover:bg-gray-100 p-1 rounded cursor-pointer">
                  <Settings size={12} />
                  <span>Parameter</span>
                </div>
                <div className="flex items-center space-x-1 text-xs hover:bg-gray-100 p-1 rounded cursor-pointer">
                  <MessageSquare size={12} />
                  <span>Device Comment</span>
                </div>
                <div className="flex items-center space-x-1 text-xs hover:bg-gray-100 p-1 rounded cursor-pointer">
                  <Bookmark size={12} />
                  <span>Label</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center - Workspace */}
        <div className="flex-1 flex flex-col">
          {/* Tab Panel */}
          <div className="h-8 bg-gray-100 border-b border-gray-300 flex items-center">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 text-xs border-r border-gray-300 ${
                  activeTab === tab 
                    ? 'bg-white border-b-2 border-b-blue-500' 
                    : 'hover:bg-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          {/* Workspace Content */}
          <div className="flex-1 bg-white p-4">
            {activeTab === 'MAIN' ? (
              <div className="h-full">
                <Diagram mobileUI={false} />
              </div>
            ) : (
              <div className="text-sm text-gray-600">
                <h3 className="font-medium mb-2">Ladder Diagram Editor - {activeTab}</h3>
                <div className="bg-gray-50 border border-gray-300 rounded p-4 h-64">
                  <div className="text-center text-gray-500">
                    Ladder diagram workspace will be displayed here
                  </div>
                  <div className="mt-4 grid grid-cols-8 gap-1">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div key={i} className="w-8 h-8 border border-gray-200 bg-white"></div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Panel - Output/Watch */}
      <div className="h-32 bg-white border-t border-gray-300 flex">
        <div className="w-1/2 border-r border-gray-300">
          <div className="h-6 bg-gray-100 border-b border-gray-300 flex items-center px-2">
            <span className="text-xs font-medium">Output</span>
          </div>
          <div className="p-2 text-xs text-gray-600">
            <div>Compilation completed successfully</div>
            <div>No errors found</div>
            <div>Ready for simulation</div>
          </div>
        </div>
        <div className="w-1/2">
          <div className="h-6 bg-gray-100 border-b border-gray-300 flex items-center px-2">
            <span className="text-xs font-medium">Watch</span>
          </div>
          <div className="p-2 text-xs">
            <div className="grid grid-cols-3 gap-2">
              <div>Device</div>
              <div>Value</div>
              <div>Type</div>
              <div>D0</div>
              <div>0</div>
              <div>DWORD</div>
              <div>M0</div>
              <div>FALSE</div>
              <div>BOOL</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Status Bar */}
      <footer className="h-6 bg-gray-100 border-t border-gray-300 flex items-center px-2 text-xs">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            {connectionStatus === 'connected' ? (
              <Wifi size={12} className="text-green-600" />
            ) : (
              <WifiOff size={12} className="text-red-600" />
            )}
            <span>PLC: {connectionStatus === 'connected' ? 'Connected' : 'Disconnected'}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            {compileStatus === 'success' && <CheckCircle size={12} className="text-green-600" />}
            {compileStatus === 'warning' && <AlertTriangle size={12} className="text-yellow-600" />}
            {compileStatus === 'error' && <XCircle size={12} className="text-red-600" />}
            <span>Compile: {compileStatus}</span>
          </div>
          
          {errorCount > 0 && (
            <div className="flex items-center space-x-1">
              <XCircle size={12} className="text-red-600" />
              <span>{errorCount} errors</span>
            </div>
          )}
          
          {warningCount > 0 && (
            <div className="flex items-center space-x-1">
              <AlertTriangle size={12} className="text-yellow-600" />
              <span>{warningCount} warnings</span>
            </div>
          )}
        </div>
        
        <div className="flex-1"></div>
        
        <div className="flex items-center space-x-4">
          <span>Line: 1, Col: 1</span>
          <span>Ready</span>
        </div>
      </footer>
    </div>
  );
}
