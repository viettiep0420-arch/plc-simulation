import React, { useEffect } from 'react';
import { DndContext, 
         DragEndEvent, 
         DragStartEvent, 
         PointerSensor, 
         useSensor, 
         useSensors,
         closestCenter,
         DragOverlay } from '@dnd-kit/core';
import { arrayMove, 
         SortableContext, 
         horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { create } from 'zustand';
import { File, Folder, Save, Printer, HelpCircle, Scissors, Copy, Clipboard, Undo, Redo, Search } from 'lucide-react';
import ImprovedMenuBar from '../menu/ImprovedMenuBar';

// Types
type ToolbarItem = { id: string; icon?: React.ReactNode; label: string };
type ToolbarGroup = { id: string; title: string; items: ToolbarItem[] };
type DockRow = { id: string; groupIds: string[] };

interface LayoutState {
  rows: DockRow[];
  groups: ToolbarGroup[];
  activeId: string | null;
  moveGroup: (sourceIndex: number, destinationIndex: number, rowId: string) => void;
  moveGroupBetweenRows: (sourceRowId: string, sourceIndex: number, destRowId: string, destIndex: number) => void;
  createRow: (group: ToolbarGroup, position: number) => void;
  resetLayout: () => void;
  setActiveId: (id: string | null) => void;
}

// Default groups
const defaultGroups: ToolbarGroup[] = [
  {
    id: 'standard',
    title: 'Standard',
    items: [
      { id: 'new', icon: <File size={16} />, label: 'New' },
      { id: 'open', icon: <Folder size={16} />, label: 'Open' },
      { id: 'save', icon: <Save size={16} />, label: 'Save' },
      { id: 'print', icon: <Printer size={16} />, label: 'Print' },
      { id: 'help', icon: <HelpCircle size={16} />, label: 'Help' }
    ]
  },
  {
    id: 'program',
    title: 'Program Common',
    items: [
      { id: 'cut', icon: <Scissors size={16} />, label: 'Cut' },
      { id: 'copy', icon: <Copy size={16} />, label: 'Copy' },
      { id: 'paste', icon: <Clipboard size={16} />, label: 'Paste' },
      { id: 'undo', icon: <Undo size={16} />, label: 'Undo' },
      { id: 'redo', icon: <Redo size={16} />, label: 'Redo' },
      { id: 'find', icon: <Search size={16} />, label: 'Find' }
    ]
  }
];

// Default layout
const defaultLayout: DockRow[] = [
  { id: 'row1', groupIds: ['standard'] },
  { id: 'row2', groupIds: ['program'] }
];

// Zustand store
const useLayoutStore = create<LayoutState>((set) => ({
  rows: [],
  groups: defaultGroups,
  activeId: null,
  
  moveGroup: (sourceIndex: number, destinationIndex: number, rowId: string) => set(state => {
    const row = state.rows.find(r => r.id === rowId);
    if (!row) return state;
    
    const newGroupIds = arrayMove(row.groupIds, sourceIndex, destinationIndex);
    const newRows = state.rows.map(r => 
      r.id === rowId ? { ...r, groupIds: newGroupIds } : r
    );
    
    return { rows: newRows };
  }),
  
  moveGroupBetweenRows: (
    sourceRowId: string, 
    sourceIndex: number, 
    destRowId: string, 
    destIndex: number
  ) => set(state => {
    const sourceRow = state.rows.find(r => r.id === sourceRowId);
    const destRow = state.rows.find(r => r.id === destRowId);
    if (!sourceRow || !destRow) return state;
    
    // Create new arrays to avoid mutation
    const newSourceGroupIds = [...sourceRow.groupIds];
    const newDestGroupIds = [...destRow.groupIds];
    const [movedId] = newSourceGroupIds.splice(sourceIndex, 1);
    newDestGroupIds.splice(destIndex, 0, movedId);
    
    return { 
      rows: state.rows.map(row => {
        if (row.id === sourceRowId) return { ...row, groupIds: newSourceGroupIds };
        if (row.id === destRowId) return { ...row, groupIds: newDestGroupIds };
        return row;
      })
    };
  }),
  
  createRow: (group: ToolbarGroup, position: number) => set(state => {
    const newRow: DockRow = { id: `row-${Date.now()}`, groupIds: [group.id] };
    const newRows = [...state.rows];
    newRows.splice(position, 0, newRow);
    return { rows: newRows };
  }),
  
  resetLayout: () => set({ rows: defaultLayout }),
  
  setActiveId: (id: string | null) => set({ activeId: id })
}));

// Toolbar Group Component
const ToolbarGroup = ({ group }: { group: ToolbarGroup }) => (
  <div className="flex flex-col border rounded bg-gray-50">
    <div className="px-2 py-1 bg-gray-100 text-xs font-medium cursor-move">
      {group.title}
    </div>
    <div className="flex flex-col p-1 gap-1 min-w-32">
      {group.items.map(item => (
        <button 
          key={item.id}
          className="flex items-center gap-1 px-3 py-2 bg-white hover:bg-gray-100 text-xs text-left"
          onClick={() => console.log('action', item.id)}
        >
          {item.icon}
          {item.label}
        </button>
      ))}
    </div>
  </div>
);

// Main Component
const GXWorks2StyleIDE = () => {
  const { 
    rows, 
    groups, 
    activeId,
    moveGroup,
    moveGroupBetweenRows,
    createRow,
    resetLayout,
    setActiveId
  } = useLayoutStore();
  
  // Hover menu state (removed since we're using ImprovedMenuBar now)
  // const [hoverMenu, setHoverMenu] = useState<string | null>(null);
  // const hoverTimer = useRef<NodeJS.Timeout | null>(null);
  
  // Menu structure for hover functionality (removed since we're using ImprovedMenuBar now)
  // const menus = {
  //   Project: ["New Project", "Open", "Save", "Close"],
  //   Edit: ["Undo", "Redo", "Cut", "Copy", "Paste"],
  //   "Find/Replace": ["Find", "Replace"],
  //   Compile: ["Build", "Rebuild", "Clean"],
  //   View: ["Zoom In", "Zoom Out", "Reset Zoom"],
  //   Online: ["Write to PLC", "Read from PLC"],
  //   Debug: ["Start Monitor", "Stop Monitor", "Device Monitor"],
  //   Diagnostics: ["Cross Reference", "Device Reference"],
  //   Tool: ["Options"],
  //   Window: ["Reset Layout"],
  //   Help: ["Documentation", "Tutorial"]
  // };
  
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );
  
  // Initialize layout
  useEffect(() => {
    const savedLayout = localStorage.getItem('gxw2_layout_v1');
    if (savedLayout) {
      try {
        useLayoutStore.setState({ rows: JSON.parse(savedLayout) });
      } catch {
        resetLayout();
      }
    } else {
      resetLayout();
    }
  }, []);
  
  // Save layout to localStorage
  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem('gxw2_layout_v1', JSON.stringify(rows));
    }, 150);
    
    return () => clearTimeout(timeout);
  }, [rows]);
  
  // Handle drag start
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  };
  
  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    
    const { active, over } = event;
    if (!over) return;
    
    // Handle group reordering logic here
    console.log('Drag ended', active, over);
    // Implementation will be added in next steps
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Menu Bar */}
      <ImprovedMenuBar mobileUI={false} className="!flex !flex-row !items-center !inline-flex" />
      
      {/* Toolbar Area */}
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-col gap-2 p-2 bg-white border-b">
          {rows.map(row => (
            <div key={row.id} className="flex gap-2">
              <SortableContext items={row.groupIds} strategy={horizontalListSortingStrategy}>
                {row.groupIds.map(groupId => {
                  const group = groups.find(g => g.id === groupId);
                  return group ? <ToolbarGroup key={group.id} group={group} /> : null;
                })}
              </SortableContext>
            </div>
          ))}
        </div>
        
        <DragOverlay>
          {activeId ? (
            <ToolbarGroup group={groups.find(g => g.id === activeId)!} />
          ) : null}
        </DragOverlay>
      </DndContext>
      
      {/* Main Content */}
      <div className="grid grid-cols-[260px,1fr] flex-1">
        {/* Navigation Panel */}
        <div className="bg-white border-r p-4">
          Navigation Panel
        </div>
        
        {/* Workspace */}
        <div className="bg-gray-50 p-4">
          <div className="flex border-b">
            {['MAIN', 'Parameter', 'Device Comment', 'Label'].map(tab => (
              <button key={tab} className="px-4 py-2 border-b-2 border-transparent hover:border-blue-500">
                {tab}
              </button>
            ))}
          </div>
          <div className="mt-4">
            Workspace Content
          </div>
        </div>
      </div>
      
      {/* Output Panel */}
      <div className="bg-white border-t h-[200px] p-4">
        Output Panel
      </div>
      
      {/* Status Bar */}
      <div className="bg-gray-800 text-white p-1 px-2 text-sm flex justify-between">
        <span>Ready</span>
        <span>Zoom: 100%</span>
      </div>
    </div>
  );
};

export default GXWorks2StyleIDE;
