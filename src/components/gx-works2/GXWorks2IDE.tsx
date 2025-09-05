import React, { useEffect, useMemo, useRef, useState } from "react";
import Diagram from "../diagram/Diagram";
import ImprovedMenuBar from "../menu/ImprovedMenuBar";

// Small inline icons to avoid external deps
const Icon = {
  Plus: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
      <path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  Minus: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
      <path d="M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  ChevronDown: () => (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  ),
  Dots: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
      <circle cx="5" cy="12" r="2" fill="currentColor" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <circle cx="19" cy="12" r="2" fill="currentColor" />
    </svg>
  ),
};

const ToolbarButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { label?: string }>(
  ({ label, className, children, ...rest }, ref) => {
    const base = "inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md border bg-white hover:bg-gray-50 active:bg-gray-100 text-sm whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500";
    return (
      <button ref={ref} className={`${base} ${className ?? ''}`} {...rest}>
        {children}
        {label && <span className="font-medium">{label}</span>}
      </button>
    );
  }
);
ToolbarButton.displayName = "ToolbarButton";

function useClickOutside(refs: React.RefObject<HTMLElement>[], handler: () => void) {
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      const clickedInside = refs.some((r) => r.current && r.current.contains(t));
      if (!clickedInside) handler();
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [refs, handler]);
}

function useSubmenuRefs() {
  const mapRef = useRef<Record<string, Array<HTMLButtonElement | null>>>({});
  const get = (menuId: string, index: number) => {
    const arr = mapRef.current[menuId] || (mapRef.current[menuId] = []);
    return (el: HTMLButtonElement | null) => {
      arr[index] = el;
    };
  };
  const focus = (menuId: string, index: number) => {
    const arr = mapRef.current[menuId] || [];
    const el = arr[index];
    el?.focus();
  };
  return { get, focus };
}

export default function GXWorks2IDE() {
  // Menubar state with hover functionality
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [usingKeyboard, setUsingKeyboard] = useState(false);
  const { get, focus } = useSubmenuRefs();
  const menubarRef = useRef<HTMLDivElement | null>(null);
  const hoverTimer = useRef<NodeJS.Timeout | null>(null);

  // Instruction picker
  const [showInstrPicker, setShowInstrPicker] = useState(false);
  const instrBtnRef = useRef<HTMLButtonElement | null>(null);
  const instrMenuRef = useRef<HTMLDivElement | null>(null);

  // Resizable panels
  const [leftW, setLeftW] = useState<number>(260);
  const [rightW, setRightW] = useState<number>(320);
  const [rightCollapsed, setRightCollapsed] = useState<boolean>(false);
  const isResizing = useRef<null | "left" | "right">(null);

  // Zoom for canvas demo
  const [zoom, setZoom] = useState(1);

  // Active tab state
  const [activeTab, setActiveTab] = useState<string>("MAIN");

  // Click outside to close menus & instruction picker
  useClickOutside([menubarRef], () => setActiveMenu(null));
  useClickOutside([instrMenuRef, instrBtnRef], () => setShowInstrPicker(false));

  // Track last input method (mouse vs keyboard) — optional polish
  useEffect(() => {
    const onMouse = () => setUsingKeyboard(false);
    const onKey = () => setUsingKeyboard(true);
    window.addEventListener("mousedown", onMouse);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onMouse);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const topIds = useMemo(() => MENUS.map(m => m.id), []);
  const getNextTopId = (curId: string, dir: 1 | -1) => {
    const i = topIds.indexOf(curId);
    const j = (i + dir + topIds.length) % topIds.length;
    return topIds[j];
  };

  const openAndFocusFirst = (menuId: string) => {
    setActiveMenu(menuId);
    // Wait for submenu to render
    requestAnimationFrame(() => focus(menuId, 0));
  };

  const handleTopKeyDown = (e: React.KeyboardEvent, menuId: string) => {
    switch (e.key) {
      case "Enter":
      case "ArrowDown":
        e.preventDefault();
        openAndFocusFirst(menuId);
        break;
      case "ArrowUp": 
        e.preventDefault();
        setActiveMenu(menuId);
        requestAnimationFrame(() => {
          const itemsLen = MENUS.find(m => m.id === menuId)?.items.length || 0;
          focus(menuId, Math.max(0, itemsLen - 1));
        });
        break;
      case "ArrowRight": {
        e.preventDefault();
        const nextId = getNextTopId(menuId, 1);
        setActiveMenu(null);
        const btn = document.getElementById(`top-${nextId}`) as HTMLButtonElement | null;
        btn?.focus();
        break;
      }
      case "ArrowLeft": {
        e.preventDefault();
        const prevId = getNextTopId(menuId, -1);
        setActiveMenu(null);
        const btn = document.getElementById(`top-${prevId}`) as HTMLButtonElement | null;
        btn?.focus();
        break;
      }
      case "Escape":
        setActiveMenu(null);
        break;
    }
  };

  const handleSubKeyDown = (
    e: React.KeyboardEvent,
    menuId: string,
    index: number,
  ) => {
    const itemsLen = MENUS.find(m => m.id === menuId)?.items.length || 0;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        focus(menuId, (index + 1) % itemsLen);
        break;
      case "ArrowUp":
        e.preventDefault();
        focus(menuId, (index - 1 + itemsLen) % itemsLen);
        break;
      case "Home":
        e.preventDefault();
        focus(menuId, 0);
        break;
      case "End":
        e.preventDefault();
        focus(menuId, Math.max(0, itemsLen - 1));
        break;
      case "Escape":
        setActiveMenu(null);
        const topBtn = document.getElementById(`top-${menuId}`) as HTMLButtonElement | null;
        topBtn?.focus();
        break;
      case "ArrowRight":
      case "ArrowLeft": {
        // Switch to neighbor top-level menu
        e.preventDefault();
        const dir = e.key === "ArrowRight" ? 1 : -1;
        const nextId = getNextTopId(menuId, dir);
        setActiveMenu(nextId);
        requestAnimationFrame(() => focus(nextId, 0));
        break;
      }
      default:
        break;
    }
  };

  // Hotkeys
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMenu(null);
        setShowInstrPicker(false);
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "r") {
        e.preventDefault();
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === "+" || e.key === "=")) {
        e.preventDefault();
        setZoom((z) => Math.min(2, +(z + 0.1).toFixed(2)));
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === "-")) {
        e.preventDefault();
        setZoom((z) => Math.max(0.5, +(z - 0.1).toFixed(2)));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Mouse-driven resize
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (isResizing.current === "left") {
        setLeftW((w) => Math.min(480, Math.max(200, w + e.movementX)));
      } else if (isResizing.current === "right") {
        setRightW((w) => Math.min(520, Math.max(260, w - e.movementX)));
      }
    };
    const onUp = () => (isResizing.current = null);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  // Menu structure
  const MENUS: { id: string; label: string; items: { id: string; label: string; onSelect?: () => void }[] }[] = [
    {
      id: "project",
      label: "Project",
      items: [
        { id: "new", label: "New Project" },
        { id: "open", label: "Open" },
        { id: "save", label: "Save" },
        { id: "close", label: "Close" },
      ],
    },
    {
      id: "edit",
      label: "Edit",
      items: [
        { id: "undo", label: "Undo" },
        { id: "redo", label: "Redo" },
        { id: "cut", label: "Cut" },
        { id: "copy", label: "Copy" },
        { id: "paste", label: "Paste" },
      ],
    },
    {
      id: "find-replace",
      label: "Find/Replace",
      items: [
        { id: "find", label: "Find" },
        { id: "replace", label: "Replace" },
      ],
    },
    {
      id: "compile",
      label: "Compile",
      items: [
        { id: "build", label: "Build" },
        { id: "rebuild", label: "Rebuild" },
        { id: "clean", label: "Clean" },
      ],
    },
    {
      id: "view",
      label: "View",
      items: [
        { id: "zoom-in", label: "Zoom In" },
        { id: "zoom-out", label: "Zoom Out" },
        { id: "reset-zoom", label: "Reset Zoom" },
      ],
    },
    {
      id: "online",
      label: "Online",
      items: [
        { id: "write-plc", label: "Write to PLC" },
        { id: "read-plc", label: "Read from PLC" },
      ],
    },
    {
      id: "debug",
      label: "Debug",
      items: [
        { id: "start-monitor", label: "Start Monitor" },
        { id: "stop-monitor", label: "Stop Monitor" },
        { id: "device-monitor", label: "Device Monitor" },
      ],
    },
    {
      id: "diagnostics",
      label: "Diagnostics",
      items: [
        { id: "cross-reference", label: "Cross Reference" },
        { id: "device-reference", label: "Device Reference" },
      ],
    },
    {
      id: "tool",
      label: "Tool",
      items: [
        { id: "options", label: "Options" },
      ],
    },
    {
      id: "window",
      label: "Window",
      items: [
        { id: "reset-layout", label: "Reset Layout" },
      ],
    },
    {
      id: "help",
      label: "Help",
      items: [
        { id: "documentation", label: "Documentation" },
        { id: "tutorial", label: "Tutorial" },
        { id: "about", label: "About" },
      ],
    },
  ];

  // Helper to position instruction menu near button (fixed layer)
  const instrMenuStyle = useMemo(() => {
    const r = instrBtnRef.current?.getBoundingClientRect();
    if (!r) return { display: "none" } as React.CSSProperties;
    const top = r.bottom + 8 + window.scrollY;
    const left = r.left + window.scrollX;
    return { top, left } as React.CSSProperties;
  }, [showInstrPicker]);

  return (
    <div className="w-full h-screen flex flex-col text-gray-900">
import ImprovedMenuBar from "./menu/ImprovedMenuBar";

      {/* MENUBAR */}
      <ImprovedMenuBar mobileUI={false} />

      {/* MAIN TOOLBAR (sticky) */}
      <div className="sticky top-[40px] z-30 bg-white/95 backdrop-blur border-b">
        <div className="flex items-center gap-3 px-3 py-2 overflow-x-auto">
          <ToolbarButton label="New" title="New Project">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
              <path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </ToolbarButton>
          <ToolbarButton label="Open">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </ToolbarButton>
          <ToolbarButton label="Save">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
              <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M17 21v-8H7v8M7 3v5h8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </ToolbarButton>
          <div className="h-6 w-px bg-gray-200" />
          <ToolbarButton label="Cut">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
              <path d="M6 2L3 6v12a2 2 0 002 2h12a2 2 0 002-2V6l-3-4zM3 6h18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 10a4 4 0 01-8 0" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </ToolbarButton>
          <ToolbarButton label="Copy">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" strokeWidth="2" />
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" strokeWidth="2" />
            </svg>
          </ToolbarButton>
          <ToolbarButton label="Paste">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
              <path d="M16 4h2a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" strokeWidth="2" />
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1" strokeWidth="2" />
            </svg>
          </ToolbarButton>
          <div className="h-6 w-px bg-gray-200" />
          <ToolbarButton label="Undo">↶</ToolbarButton>
          <ToolbarButton label="Redo">↷</ToolbarButton>
          <div className="h-6 w-px bg-gray-200" />
          <ToolbarButton title="Zoom In" onClick={() => setZoom(z => Math.min(2, z + 0.1))}>
            <Icon.Plus />
          </ToolbarButton>
          <ToolbarButton title="Zoom Out" onClick={() => setZoom(z => Math.max(0.5, z - 0.1))}>
            <Icon.Minus />
          </ToolbarButton>
          <div className="h-6 w-px bg-gray-200" />
          <ToolbarButton
            ref={instrBtnRef}
            label="Application Instruction"
            onClick={() => setShowInstrPicker((v) => !v)}
          >
            <Icon.ChevronDown />
          </ToolbarButton>
        </div>
      </div>

      {/* ANCHORED INSTRUCTION PICKER */}
      {showInstrPicker && (
        <div
          ref={instrMenuRef}
          id="instr-menu"
          className="fixed z-50 rounded border bg-white shadow-lg min-w-48"
          style={instrMenuStyle}
          role="listbox"
        >
          {["MOV", "ADD", "TMR", "CNT", "CMP", "DIV", "MUL"].map((op) => (
            <button
              key={op}
              role="option"
              className="block w-full text-left px-3 py-2 hover:bg-gray-50"
              onClick={() => setShowInstrPicker(false)}
            >
              {op}
            </button>
          ))}
        </div>
      )}

      {/* WORKSPACE */}
      <div className="flex-1 min-h-0">
        <div className="flex w-full h-full">
          {/* LEFT: Navigation */}
          <aside className="border-r bg-white overflow-auto" style={{ width: leftW }}>
            <div className="p-3">
              <h3 className="text-sm font-semibold mb-2">Navigation</h3>
              <ul className="space-y-1 text-sm">
                <li>▶ MAIN</li>
                <li>• Parameter</li>
                <li>• Device Comment</li>
                <li>• Label</li>
              </ul>
            </div>
          </aside>

          {/* GRABBER LEFT */}
          <div
            onMouseDown={() => (isResizing.current = "left")}
            className="w-1 cursor-col-resize bg-transparent hover:bg-blue-200"
            title="Drag to resize"
          />

          {/* CENTER: Ladder Canvas */}
          <main className="flex-1 min-w-0 bg-gray-50">
            {/* Tab bar */}
            <div className="flex items-center gap-2 px-3 py-2 border-b bg-white">
              {[
                { id: "MAIN", active: true },
                { id: "Parameter", active: false },
                { id: "Device", active: false },
              ].map((t) => (
                <button
                  key={t.id}
                  className={`px-3 py-1.5 rounded-t-md border-b-2 ${
                    t.active ? "border-blue-600 text-blue-700" : "border-transparent hover:border-gray-300"
                  }`}
                  onClick={() => setActiveTab(t.id)}
                >
                  {t.id}
                </button>
              ))}
              <div className="ml-auto" />
              <button className="px-2 py-1 text-sm rounded hover:bg-gray-100" title="More tabs">
                <Icon.Dots />
              </button>
            </div>

            {/* Canvas */}
            <div className="p-6">
              <div
                className="mx-auto bg-white border rounded-lg shadow-sm overflow-hidden"
                style={{ width: "100%", height: 420, transform: `scale(${zoom})`, transformOrigin: "top left" }}
              >
                {activeTab === "MAIN" ? (
                  <div className="h-full w-full grid place-items-center text-gray-500">
                    <Diagram mobileUI={false} />
                  </div>
                ) : (
                  <div className="h-full w-full grid place-items-center">
                    <div className="text-center max-w-xl">
                      <p className="mb-1 font-semibold">{activeTab} Workspace</p>
                      <p className="text-sm">Configure {activeTab.toLowerCase()} settings here</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-2 text-xs text-gray-500">Zoom: {(zoom * 100).toFixed(0)}%</div>
            </div>

            {/* Output / Links */}
            <div className="px-6 pb-24">
              <h3 className="text-sm font-semibold mb-2">Output</h3>
              <ul className="space-y-1">
                <li className="text-green-700">✔ Compilation completed successfully</li>
                <li className="text-gray-600">• No errors found</li>
                <li className="text-gray-600">• Ready for simulation</li>
              </ul>
              <div className="mt-4 flex gap-6 text-blue-600 text-sm">
                <a href="#" className="no-underline">READ THE DOCUMENTATION</a>
                <a href="#" className="no-underline">WATCH TUTORIAL VIDEO</a>
                <a href="#" className="no-underline">LOAD SAMPLE DIAGRAM</a>
              </div>
            </div>
          </main>

          {/* GRABBER RIGHT (hidden when collapsed) */}
          {!rightCollapsed && (
            <div
              onMouseDown={() => (isResizing.current = "right")}
              className="w-1 cursor-col-resize bg-transparent hover:bg-blue-200"
              title="Drag to resize"
            />
          )}

          {/* RIGHT: Properties/Watch */}
          {!rightCollapsed && (
            <aside className="border-l bg-white overflow-auto" style={{ width: rightW }}>
              <div className="p-3 space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold">Properties</h3>
                    <button
                      onClick={() => setRightCollapsed(true)}
                      className="text-xs px-2 py-1 rounded border hover:bg-gray-50"
                      title="Collapse Properties"
                    >
                      Collapse ›
                    </button>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">No selection</div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-1">Watch</h3>
                  <div className="border rounded">
                    <div className="px-2 py-1 text-xs bg-gray-50 border-b text-gray-600">Name / Value</div>
                    <div className="p-2 text-sm text-gray-500">(empty)</div>
                  </div>
                </div>
              </div>
            </aside>
          )}
        </div>

        {/* Dock button to reopen right panel */}
        {rightCollapsed && (
          <button
            onClick={() => setRightCollapsed(false)}
            className="fixed right-2 top-[88px] px-2 py-1 rounded bg-white shadow border text-sm"
            title="Open Properties"
          >
            ‹ Properties
          </button>
        )}
      </div>

      {/* STATUS BAR */}
      <footer className="sticky bottom-0 w-full bg-white border-t px-3 py-2 flex items-center gap-4">
        <span className="text-sm text-gray-700">Ready</span>
        <span className="text-sm text-green-700">Compilation completed successfully</span>
      </footer>
    </div>
  );
}
