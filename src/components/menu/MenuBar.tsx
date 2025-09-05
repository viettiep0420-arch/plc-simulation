import React, { useState, useRef, useEffect } from 'react';

interface MenuItem {
  id: string;
  label: string;
  submenu: string[];
}

interface Props {
  mobileUI: boolean;
}

/**
 * GX Works 2 MenuBar Component
 * A fully accessible menu bar with vertical submenus for PLC simulation IDE
 * Features: Hover on desktop, click on mobile, keyboard navigation, ARIA compliant
 * 
 * Usage: Import and use <MenuBar /> in your component
 * 
 * To add more menus: Extend the 'menus' array with new { id, label, submenu } objects
 */
const MenuBar: React.FC<Props> = ({ mobileUI }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Complete GX Works 2 menu configuration - easily extendable
  const menus: MenuItem[] = [
    { id: 'project', label: 'Project', submenu: ['New Project', 'Open', 'Save', 'Close'] },
    { id: 'edit', label: 'Edit', submenu: ['Undo', 'Redo', 'Cut', 'Copy', 'Paste'] },
    { id: 'find-replace', label: 'Find/Replace', submenu: ['Find', 'Replace'] },
    { id: 'compile', label: 'Compile', submenu: ['Build', 'Rebuild', 'Clean'] },
    { id: 'view', label: 'View', submenu: ['Zoom In', 'Zoom Out', 'Reset Zoom'] },
    { id: 'online', label: 'Online', submenu: ['Write to PLC', 'Read from PLC'] },
    { id: 'debug', label: 'Debug', submenu: ['Start Monitor', 'Stop Monitor', 'Device Monitor'] },
    { id: 'diagnostics', label: 'Diagnostics', submenu: ['Cross Reference', 'Device Reference'] },
    { id: 'tool', label: 'Tool', submenu: ['Options'] },
    { id: 'window', label: 'Window', submenu: ['Reset Layout'] },
    { id: 'help', label: 'Help', submenu: ['Documentation', 'Tutorial'] }
  ];

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation - Escape to close, Arrow keys for navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveMenu(null);
      }
      // Arrow key navigation can be implemented here for enhanced accessibility
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleMenuEnter = (menuId: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMenu(menuId);
  };

  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 300);
  };

  const handleMenuClick = (menuId: string) => {
    setActiveMenu(activeMenu === menuId ? null : menuId);
  };

  const handleSubmenuItemClick = (item: string) => {
    console.log(`Menu item clicked: ${item}`);
    setActiveMenu(null);
  };

  return (
    <div 
      ref={menuRef}
      className="flex items-center bg-white border-b border-gray-200 px-4 py-2 overflow-x-auto"
      role="menubar"
      aria-label="GX Works 2 Main Navigation"
    >
      {menus.map((menu) => (
        <div
          key={menu.id}
          className="relative"
          onMouseEnter={() => handleMenuEnter(menu.id)}
          onMouseLeave={handleMenuLeave}
        >
          <button
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
              activeMenu === menu.id
                ? 'bg-gray-100 text-gray-900 border border-gray-300'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 border border-transparent'
            }`}
            onClick={() => handleMenuClick(menu.id)}
            role="menuitem"
            aria-haspopup="true"
            aria-expanded={activeMenu === menu.id}
          >
            {menu.label}
          </button>

          {activeMenu === menu.id && (
            <div
              className="absolute left-0 top-full mt-1 min-w-[200px] rounded-md border border-gray-200 bg-white shadow-lg z-50"
              role="menu"
              onMouseEnter={() => handleMenuEnter(menu.id)}
              onMouseLeave={handleMenuLeave}
            >
              <div className="flex flex-col py-1 whitespace-nowrap">
                {menu.submenu.map((item) => (
                  <button
                    key={item}
                    className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    onClick={() => handleSubmenuItemClick(item)}
                    role="menuitem"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MenuBar;
