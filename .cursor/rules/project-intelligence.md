# PLC Simulator - Project Intelligence

## Project Overview
This is a mature, production-ready PLC (Programmable Logic Controller) simulator built with React, TypeScript, and Redux. The application provides a web-based environment for learning and practicing PLC programming using ladder logic diagrams. The project now features a dual interface system: the original responsive PLC Simulator and a new professional GX Works2-style IDE interface. **New Feature**: Adding a third tab "WIRING" for PLC connection visualization.

## Key Architecture Patterns

### State Management
- **Redux + Immer**: Centralized state with immutable updates
- **Redux Persist**: Automatic state persistence to localStorage
- **Normalized State**: Efficient data structure for complex diagrams
- **TypeScript Interfaces**: Full type safety for all state shapes
- **Extended Tab State**: Support for 3-tab system (VARIABLES, DIAGRAM, WIRING)

### Component Architecture
- **Container/Presentational**: Separation of logic and UI
- **Compound Components**: Complex components built from simpler ones
- **Higher-Order Components**: Error boundaries and drag layers
- **Feature-Based Organization**: Components grouped by domain
- **Dual Interface System**: Original PLC Simulator and GX Works2 IDE
- **Interface Toggle**: Seamless switching between interface modes
- **Three-Tab System**: VARIABLES, DIAGRAM, and WIRING tabs for comprehensive view

### Simulation Engine
- **Cycle-Based Execution**: 66ms scan cycles (CYCLE_TIME constant)
- **Left-to-Right, Top-to-Bottom**: Standard PLC execution order
- **Real-time Updates**: Immediate visual feedback during simulation
- **State Propagation**: Changes flow through the ladder network
- **Connection Mapping**: Wiring relationships between components

## Development Patterns

### File Naming Conventions
- **Block Components**: `Block[Type].tsx` (e.g., `BlockTimer.tsx`)
- **Property Components**: `Properties[Type].tsx` (e.g., `PropertiesTimerType.tsx`)
- **Action Components**: `[Action]Button.tsx` (e.g., `SimulateButton.tsx`)
- **Constants**: `[domain].ts` (e.g., `elementTypes.ts`, `colors.ts`)
- **GX Works2 Components**: `GXWorks2[Component].tsx` (e.g., `GXWorks2IDE.tsx`)
- **Interface Components**: `[Interface][Component].tsx` (e.g., `MenuBar.tsx`)
- **View Components**: `[View]Diagram.tsx` (e.g., `WiringDiagram.tsx`) 🚧

### Component Structure
- **Props Interface**: Always define TypeScript interfaces for props
- **Styled Components**: Use styled-components for component-specific styling
- **TailwindCSS**: Use utility-first CSS for GX Works2 IDE components
- **Lucide React**: Use modern icons for GX Works2 IDE interface
- **Error Boundaries**: Wrap components that might fail
- **Memoization**: Use React.memo for expensive components
- **Tab Components**: Consistent structure for VARIABLES, DIAGRAM, and WIRING tabs

### State Updates
- **Immer Drafts**: Use draft syntax for state mutations
- **Action Types**: Define action types in `store/types.ts`
- **Selectors**: Use selectors for computed state
- **Persistence**: State automatically saved to localStorage
- **Tab State**: Extended state management for 3-tab system

## Technical Constraints

### Performance Considerations
- **Large Diagrams**: Optimize rendering for complex ladder logic
- **Simulation Speed**: Maintain 60fps during real-time execution
- **Memory Usage**: Efficient handling of large projects
- **Mobile Performance**: Responsive on lower-end devices
- **Tab Rendering**: Efficient switching between 3 tabs

### Browser Compatibility
- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Support**: iOS Safari, Chrome Mobile
- **ES6+ Features**: Use modern JavaScript features
- **CSS Grid**: Leverage CSS Grid for responsive layouts
- **Tab Navigation**: Consistent behavior across all browsers

### Firebase Integration
- **Authentication**: User sign-in/sign-up
- **Hosting**: Production deployment
- **Analytics**: Usage tracking
- **Security**: Client-side only, no server processing

## Common Development Tasks

### Adding New Components
1. Create component file in appropriate directory
2. Define TypeScript interfaces for props and state
3. Add to element types constants
4. Update toolbox with new component
5. Implement simulation logic
6. Add property panels for configuration
7. Update tests and documentation

### Adding GX Works2 IDE Features
1. Create component in `src/components/gx-works2/` directory
2. Use TailwindCSS for styling
3. Use Lucide React for icons
4. Follow desktop IDE patterns and layouts
5. Integrate with existing Redux state management
6. Add toggle functionality in App.tsx
7. Test interface switching and functionality

### Adding New Tabs
1. **Constants Update**: Extend DISPLAY_TAB in `src/consts/consts.ts`
2. **Component Creation**: Create new view component (e.g., `WiringDiagram.tsx`)
3. **Tab Integration**: Update `TabSelect.tsx` for new tab layout
4. **State Management**: Extend Redux store for new tab state
5. **Simulator Integration**: Update `Simulator.tsx` to handle new tab
6. **Styling**: Add tab-specific colors and responsive design
7. **Testing**: Verify tab switching and content rendering

### State Management
1. Define action types in `store/types.ts`
2. Add reducers in `store/simulator.ts`
3. Use Immer for immutable updates
4. Add selectors for computed state
5. Update TypeScript interfaces
6. Test state changes
7. **Tab State**: Extend for multi-tab system

### UI/UX Patterns
1. **Responsive Design**: Mobile-first approach with 640px breakpoint
2. **Drag & Drop**: React DnD for component placement
3. **Visual Feedback**: Immediate response to user actions
4. **Error Handling**: Graceful degradation and user notifications
5. **Accessibility**: Keyboard navigation and screen reader support
6. **Tab System**: Consistent 3-tab interface (VARIABLES, DIAGRAM, WIRING)

## Known Patterns and Solutions

### Performance Optimization
- **React.memo**: Prevent unnecessary re-renders
- **useCallback/useMemo**: Memoize expensive calculations
- **Virtual Scrolling**: For large lists (future implementation)
- **Lazy Loading**: Code splitting for better initial load
- **Tab Optimization**: Efficient rendering for different view modes

### Error Handling
- **Error Boundaries**: Catch and handle component errors
- **Validation**: Client-side validation for all inputs
- **User Feedback**: Clear error messages and recovery options
- **Graceful Degradation**: Fallback behavior when features fail
- **Tab Validation**: Ensure proper tab state management

### Mobile Experience
- **Touch Targets**: Minimum 44px for touch interactions
- **Gesture Support**: Optimize for touch gestures
- **Screen Real Estate**: Efficient use of limited space
- **Performance**: Optimize for mobile device capabilities
- **Tab Interface**: Touch-friendly tab navigation

## Development Workflow

### Code Quality
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting with TypeScript rules
- **Prettier**: Code formatting
- **Component Testing**: Unit tests for components
- **Integration Testing**: Redux store testing
- **Tab Testing**: Test tab switching and content rendering

### Git Workflow
- **Feature Branches**: Create branches for new features
- **Pull Requests**: Code review before merging
- **Commit Messages**: Clear, descriptive commit messages
- **Version Tags**: Semantic versioning for releases

### Deployment
- **Development**: `yarn start` for local development
- **Staging**: `yarn deploy-beta` for testing
- **Production**: `yarn deploy` for live deployment
- **Monitoring**: Sentry for error tracking

## User Experience Focus

### Learning Support
- **Intuitive Interface**: Clear visual representation
- **Help System**: Built-in documentation and tutorials
- **Error Prevention**: Validation and helpful feedback
- **Progressive Complexity**: Start simple, build complexity
- **Multi-View Learning**: Variables, Diagram, and Wiring perspectives

### Professional Use
- **Realistic Simulation**: Accurate PLC behavior
- **Project Management**: Save, load, and share projects
- **Performance**: Fast and responsive interface
- **Reliability**: Stable and dependable operation
- **Comprehensive Documentation**: Logic, variables, and wiring views

### Educational Value
- **Visual Feedback**: Real-time state indication
- **Step-by-Step**: Ability to step through execution
- **Variable Monitoring**: Real-time view of values
- **Debugging Tools**: Help identify and fix issues
- **System Overview**: Complete understanding through multiple views

## Future Considerations

### Scalability
- **Large Projects**: Handle complex, multi-rung diagrams
- **User Growth**: Support increasing user base
- **Feature Expansion**: Add new PLC components and capabilities
- **Performance**: Maintain speed with growing complexity
- **Tab System**: Easy extension to additional tabs

### Community
- **Open Source**: Encourage community contributions
- **Documentation**: Maintain comprehensive documentation
- **Support**: Help users and contributors
- **Feedback**: Incorporate user suggestions and needs

### Technology Evolution
- **React Updates**: Stay current with React ecosystem
- **TypeScript**: Leverage new TypeScript features
- **Performance**: Adopt new optimization techniques
- **Standards**: Follow evolving web standards

## New Feature: Wiring Diagram Tab 🚧

### Implementation Plan
1. **Constants Update**: Extend DISPLAY_TAB to include WIRING
2. **Component Creation**: Build WiringDiagram component with connection visualization
3. **Tab System**: Update TabSelect to support 3 tabs (33.33% width each)
4. **State Management**: Extend Redux store for wiring view state
5. **Integration**: Update Simulator component to handle wiring tab
6. **Styling**: Add wiring-specific colors and responsive design
7. **Testing**: Verify tab switching and wiring diagram functionality

### Benefits
- **Educational Value**: Users can see both logic and physical connections
- **Professional Use**: Industry-standard wiring diagram representation
- **Learning Support**: Better understanding of PLC system architecture
- **Documentation**: Visual reference for system documentation
- **Troubleshooting**: Easier identification of connection issues

### Technical Requirements
- **Responsive Design**: Work on both desktop and mobile
- **Performance**: Efficient rendering of connection diagrams
- **State Integration**: Seamless integration with existing Redux store
- **Accessibility**: Keyboard navigation and screen reader support
- **Consistency**: Maintain UI/UX consistency with existing tabs
