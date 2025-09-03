# System Patterns

## Architecture Overview

### Frontend Architecture
The PLC Simulator follows a **Component-Based Architecture** with **Redux State Management**:

```
App (Root)
├── Provider (Redux Store)
├── PersistGate (State Persistence)
├── ErrorBoundary (Error Handling)
├── DndProvider (Drag & Drop)
├── ThemeProvider (Material-UI)
└── Dual Interface System
    ├── Simulator (Original PLC Simulator)
    │   ├── MenuBar (GX Works2 Style Menu)
    │   ├── Toolbox (Component Library)
    │   ├── TabSelect (View Switching - 3 Tabs)
    │   │   ├── VARIABLES Tab
    │   │   ├── DIAGRAM Tab
    │   │   └── WIRING Tab (New)
    │   ├── VariableTable (Variable Management)
    │   ├── Diagram (Ladder Editor)
    │   ├── WiringDiagram (Connection Visualization) 🚧
    │   ├── Actions (Simulation Controls)
    │   └── Footer (Status/Info)
    └── GXWorks2IDE (Professional Desktop IDE)
        ├── Header (Main Menu Bar)
        ├── Standard Toolbar
        ├── Program Common Toolbar
        ├── Docking Window Toolbar
        ├── Ladder Toolbar
        ├── Navigation Panel (Left)
        ├── Workspace (Center)
        ├── Output/Watch Panel (Bottom)
        └── Status Bar (Footer)
```

### State Management Pattern
**Redux with Redux Persist** for global state management:
- **Store Structure**: Centralized state for diagram, variables, simulation state, and wiring view
- **Persistence**: Automatic saving of user work to localStorage
- **Immutable Updates**: Using Immer for state mutations
- **Type Safety**: TypeScript interfaces for all state shapes
- **Tab State**: Extended state management for 3-tab system (VARIABLES, DIAGRAM, WIRING)

### Component Patterns

#### 1. Container/Presentational Pattern
- **Containers**: Handle state and logic (e.g., `Simulator.tsx`)
- **Presentational**: Pure UI components (e.g., `LadderBlock.tsx`)
- **View Components**: Tab-specific components (e.g., `WiringDiagram.tsx`)

#### 2. Higher-Order Components
- **ErrorBoundary**: Wraps components for error handling
- **CustomDragLayer**: Manages drag preview during drag operations

#### 3. Compound Components
- **Diagram System**: `Diagram` contains `Rung`, `Branch`, `PowerRail`
- **Block System**: `FunctionBlock` contains various parameter components
- **Tab System**: `TabSelect` manages 3 tabs with consistent behavior
- **Wiring System**: `WiringDiagram` contains connection visualization components

### Data Flow Patterns

#### 1. Unidirectional Data Flow
```
User Action → Redux Action → Reducer → State Update → Component Re-render
```

#### 2. Event-Driven Architecture
- **Drag & Drop Events**: Component placement and movement
- **Simulation Events**: Start/stop simulation, cycle execution
- **User Interaction Events**: Variable changes, parameter updates
- **Tab Switching Events**: View changes between VARIABLES, DIAGRAM, and WIRING

### Simulation Engine Pattern

#### 1. Cycle-Based Execution
- **Scan Cycle**: 66ms intervals (defined in `CYCLE_TIME`)
- **Execution Order**: Left to right, top to bottom (standard PLC behavior)
- **State Propagation**: Changes propagate through the ladder network

#### 2. Component State Management
- **Input Components**: Contacts, timers, counters
- **Output Components**: Coils, math functions, move operations
- **Parameter Binding**: Variables linked to component parameters
- **Connection Mapping**: Wiring relationships between components

### Responsive Design Pattern

#### 1. Mobile-First Approach
- **Grid Layout**: CSS Grid for responsive layouts
- **Breakpoint**: 640px for mobile/desktop switching
- **Component Adaptation**: Different layouts for mobile vs desktop
- **Tab Adaptation**: Responsive tab layout for 3-tab system

#### 2. Adaptive UI Components
- **Toolbox**: Collapsible on mobile, always visible on desktop
- **Variable Table**: Tab-based on mobile, sidebar on desktop
- **Diagram**: Full-screen on mobile, shared space on desktop
- **Wiring Diagram**: Responsive layout for connection visualization

### File Organization Pattern

#### 1. Feature-Based Structure
```
src/
├── components/          # UI Components
│   ├── diagram/        # Ladder diagram components
│   │   ├── WiringDiagram.tsx  # New wiring diagram component 🚧
│   │   └── ...         # Existing diagram components
│   ├── toolbox/        # Component library
│   ├── variables/      # Variable management
│   └── actions/        # Simulation controls
├── store/              # Redux state management
├── consts/             # Constants and configurations
├── helpers/            # Utility functions
└── interface.ts        # TypeScript interfaces
```

#### 2. Component Naming Convention
- **Block Components**: `Block[Type].tsx` (e.g., `BlockTimer.tsx`)
- **Property Components**: `Properties[Type].tsx` (e.g., `PropertiesTimerType.tsx`)
- **Action Components**: `[Action]Button.tsx` (e.g., `SimulateButton.tsx`)
- **View Components**: `[View]Diagram.tsx` (e.g., `WiringDiagram.tsx`)
- **Tab Components**: `TabSelect.tsx` (manages 3-tab system)

### Styling Pattern
- **TailwindCSS v3**: Utility-first styling for GX Works2 IDE
  - `tailwind.config.js`: `corePlugins.preflight=false` to avoid CSS resets
  - `src/index.css`: `@import 'tailwindcss/base';`, `components`, `utilities`
- **PostCSS Pipeline**: `tailwindcss`, `autoprefixer`, `postcss-flexbugs-fixes`, `postcss-preset-env`, `postcss-normalize`
- **Material-UI + Styled Components**: Component-level theming and styled overrides where appropriate
- **Tab Styling**: Consistent styling across 3 tabs with responsive design

### Error Handling Pattern

#### 1. Error Boundaries
- **Global Error Boundary**: Catches unhandled errors
- **Recovery Mechanisms**: Graceful degradation and user feedback

#### 2. Validation Patterns
- **Input Validation**: Parameter bounds checking
- **State Validation**: Ensuring consistent diagram state
- **User Feedback**: AlertSnackbar for user notifications
- **Tab Validation**: Ensuring proper tab state management

### Performance Patterns

#### 1. Optimization Strategies
- **React.memo**: Preventing unnecessary re-renders
- **useCallback/useMemo**: Memoizing expensive calculations
- **Lazy Loading**: Code splitting for better initial load
- **Tab Optimization**: Efficient rendering for different view modes

#### 2. State Optimization
- **Selective Updates**: Only updating changed components
- **Batch Updates**: Grouping related state changes
- **Persistence Optimization**: Efficient localStorage usage
- **View State Management**: Optimized state for tab switching

### Integration Patterns

#### 1. Firebase Integration
- **Authentication**: User sign-in/sign-up
- **Analytics**: Usage tracking and performance monitoring
- **Hosting**: Production deployment

#### 2. External Libraries
- **Material-UI**: Consistent design system
- **React DnD**: Drag and drop functionality
- **Styled Components**: CSS-in-JS styling

### Tab System Pattern

#### 1. Three-Tab Architecture
- **VARIABLES Tab**: Variable management and configuration
- **DIAGRAM Tab**: Ladder logic editor and simulation
- **WIRING Tab**: Connection visualization and documentation 🚧

#### 2. Tab State Management
- **Redux Integration**: Centralized tab state management
- **View Switching**: Seamless transitions between tabs
- **State Persistence**: Tab selection saved across sessions
- **Responsive Behavior**: Mobile and desktop tab layouts

#### 3. Tab Component Structure
- **TabSelect**: Main tab navigation component
- **Tab Content**: Each tab renders appropriate component
- **Tab Styling**: Consistent visual design across tabs
- **Tab Accessibility**: Keyboard navigation and screen reader support
