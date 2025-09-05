import React, { useRef, useState, useEffect } from "react";

interface MenuItem {
  id: string;
  label: string;
  items: { id: string; label: string; onSelect?: () => void }[];
}

interface Props {
  mobileUI: boolean;
  className?: string;
}

// Complete GX Works 2 menu configuration
const MENUS: MenuItem[] = [
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

const ImprovedMenuBar: React.FC<Props> = ({ mobileUI, className }) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [usingKeyboard, setUsingKeyboard] = useState(false);
  const { get, focus } = useSubmenuRefs();

  // Close on Escape anywhere
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenuId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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

  const topIds = MENUS.map(m => m.id);
  const getNextTopId = (curId: string, dir: 1 | -1) => {
    const i = topIds.indexOf(curId);
    const j = (i + dir + topIds.length) % topIds.length;
    return topIds[j];
  };

  const openAndFocusFirst = (menuId: string) => {
    setOpenMenuId(menuId);
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
        setOpenMenuId(menuId);
        requestAnimationFrame(() => {
          const itemsLen = MENUS.find(m => m.id === menuId)?.items.length || 0;
          focus(menuId, Math.max(0, itemsLen - 1));
        });
        break;
      case "ArrowRight": {
        e.preventDefault();
        const nextId = getNextTopId(menuId, 1);
        setOpenMenuId(null);
        const btn = document.getElementById(`top-${nextId}`) as HTMLButtonElement | null;
        btn?.focus();
        break;
      }
      case "ArrowLeft": {
        e.preventDefault();
        const prevId = getNextTopId(menuId, -1);
        setOpenMenuId(null);
        const btn = document.getElementById(`top-${prevId}`) as HTMLButtonElement | null;
        btn?.focus();
        break;
      }
      case "Escape":
        setOpenMenuId(null);
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
      case "Escape": {
        setOpenMenuId(null);
        const topBtn = document.getElementById(`top-${menuId}`) as HTMLButtonElement | null;
        topBtn?.focus();
        break;
      }
      case "ArrowRight":
      case "ArrowLeft": {
        // Switch to neighbor top-level menu
        e.preventDefault();
        const dir = e.key === "ArrowRight" ? 1 : -1;
        const nextId = getNextTopId(menuId, dir);
        setOpenMenuId(nextId);
        requestAnimationFrame(() => focus(nextId, 0));
        break;
      }
      default:
        break;
    }
  };

  return (
    <nav
      role="menubar"
      aria-label="GX Works 2 Main Navigation"
      className={`flex items-center bg-white border-b border-gray-200 px-4 py-2 overflow-x-auto ${className || ''}`}
    >
      <ul className="flex gap-1" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        {MENUS.map(menu => (
          <li
            key={menu.id}
            className="relative"
            style={{display: 'inline-block'}}
            onMouseEnter={() => !mobileUI && setOpenMenuId(menu.id)}
            onMouseLeave={() => !mobileUI && setOpenMenuId(prev => (prev === menu.id ? null : prev))}
          >
            <button
              id={`top-${menu.id}`}
              role="menuitem"
              aria-haspopup="true"
              aria-expanded={openMenuId === menu.id}
              aria-controls={`submenu-${menu.id}`}
              onKeyDown={(e) => handleTopKeyDown(e, menu.id)}
              onClick={() => setOpenMenuId(cur => (cur === menu.id ? null : menu.id))}
              className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 focus:outline-none focus:ring whitespace-nowrap"
            >
              {menu.label}
            </button>

            {/* Submenu */}
            {openMenuId === menu.id && (
              <div
                id={`submenu-${menu.id}`}
                role="menu"
                aria-labelledby={`top-${menu.id}`}
                className="absolute left-0 top-full mt-1 min-w-[200px] whitespace-nowrap rounded-md border border-gray-200 bg-white shadow-lg z-50"
              >
                <ul className="flex flex-col py-1">
                  {menu.items.map((item, idx) => (
                    <li key={item.id}>
                      <button
                        ref={get(menu.id, idx)}
                        role="menuitem"
                        tabIndex={0}
                        onKeyDown={(e) => handleSubKeyDown(e, menu.id, idx)}
                        onClick={() => {
                          item.onSelect?.();
                          setOpenMenuId(null);
                        }}
                        className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ImprovedMenuBar;
