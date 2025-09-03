# Technical Context

## Technology Stack

### Frontend Framework
- **React 18.x**: Modern React with hooks and concurrent features
- **TypeScript 5.4.x**: Type-safe JavaScript development
- **Create React App**: Zero-configuration build setup

### State Management
- **Redux 4.x**: Predictable state container
- **Redux Persist 6.x**: State persistence across sessions
- **Immer 9.x**: Immutable state updates with mutable syntax
- **React Redux 8.x**: React bindings for Redux

### UI Framework & Styling
- **Material-UI (MUI) 5.x**: React component library
  - `@mui/material`: Core components
  - `@mui/icons-material`: Icon library
  - `@mui/lab`: Experimental components
  - `@mui/styles`: Styling utilities
- **TailwindCSS 3.4.x**: Utility-first CSS framework for GX Works2 IDE
  - `tailwind.config.js` with preflight disabled
  - `src/index.css` imports base/components/utilities
- **PostCSS**: Build-time CSS processing
  - Plugins: `tailwindcss`, `autoprefixer`, `postcss-flexbugs-fixes`, `postcss-preset-env`, `postcss-normalize`
- **Lucide React**: Modern icon library for GX Works2 IDE
- **Styled Components 5.x**: CSS-in-JS styling
- **Emotion 11.x**: CSS-in-JS library (MUI dependency)

### Drag & Drop
- **React DnD 16.0.1**: Drag and drop for React
- **React DnD HTML5 Backend 16.0.1**: HTML5 drag and drop backend

### Backend & Services
- **Firebase 9.x**: Backend-as-a-Service
  - Authentication: User management
  - Hosting: Static site hosting
  - Analytics: Usage tracking
- **React Firebase Hooks 3.0.5**: React hooks for Firebase

### Utilities & Libraries
- **Nanoid 5.x**: Unique ID generation
- **LocalForage 1.9.x**: Enhanced localStorage
- **React Icons 4.x**: Icon library
- **React Select 5.x**: Select component
- **Sentry React 8.x**: Error tracking and monitoring

### Development Tools
- **ESLint 8.x**: Code linting
- **TypeScript ESLint 6.x**: TypeScript-specific linting
- **Prettier**: Code formatting (via ESLint config)

## Development Setup

### Prerequisites
- **Node.js**: Version 16+ recommended (local used v22.17.0)
- **Yarn**: 1.22.x (preferred over npm)
- **Git**: Version control

### Installation Commands
```bash
# Clone repository
git clone https://github.com/codingplc/plc-simulator.git
cd plc-simulator

# Install dependencies
yarn install

# Install additional dependencies for GX Works2 IDE
# (Tailwind v3 is used)
yarn add -D tailwindcss@3

# Start development server
yarn start

# Build for production
yarn build

# Run tests
yarn test
```

### Environment Configuration
- **Development**: Local development server on port 3000
- **Production**: Firebase hosting at https://app.plcsimulator.online/
- **Beta**: Firebase hosting channels for testing

### Build Process
1. **Development**: Hot reloading with Create React App
2. **Production**: Optimized build with code splitting
3. **Deployment**: Firebase hosting with automatic builds

## Technical Constraints

### Browser Compatibility
- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Browsers**: iOS Safari, Chrome Mobile
- **Minimum Requirements**: ES6+ support, CSS Grid support

### Performance Constraints
- **Bundle Size**: Optimized for fast loading
- **Memory Usage**: Efficient state management for large diagrams
- **Simulation Performance**: Real-time execution without lag
- **Tab Rendering**: Efficient switching between 3 tabs (VARIABLES, DIAGRAM, WIRING)

### Security Constraints
- **Client-Side Only**: No server-side processing
- **Firebase Security**: Authentication and data protection
- **Input Validation**: Client-side validation for all user inputs

### Accessibility Constraints
- **WCAG Compliance**: Basic accessibility standards
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: ARIA labels and semantic HTML
- **Tab Navigation**: Accessible tab switching for 3-tab system

## Architecture Decisions

### Why React + TypeScript?
- **Type Safety**: Prevents runtime errors in complex state management
- **Developer Experience**: Better IDE support and refactoring
- **Component Reusability**: Modular architecture for maintainability

### Why Redux + Immer?
- **Predictable State**: Centralized state management for complex diagrams
- **Immutable Updates**: Immer provides mutable syntax with immutable results
- **Debugging**: Redux DevTools for state inspection
- **Tab State Management**: Efficient state management for 3-tab system

### Why Tailwind v3 + PostCSS?
- **Stability**: Compatible with CRA and postcss-loader 6
- **Performance**: Utility-first classes reduce custom CSS
- **Control**: Disabled preflight to avoid global resets

### Why Firebase?
- **Zero Backend**: No server maintenance required
- **Scalability**: Automatic scaling for user growth
- **Authentication**: Built-in user management system

### Why Three-Tab System?
- **User Experience**: Logical separation of concerns (Variables, Logic, Wiring)
- **Educational Value**: Comprehensive view of PLC systems
- **Professional Use**: Industry-standard documentation approach
- **Scalability**: Easy to extend with additional tabs in future

## Development Workflow

### Code Organization
- **Feature-Based**: Components organized by feature/domain
- **Type Safety**: Comprehensive TypeScript interfaces
- **Constants**: Centralized configuration and constants
- **Tab Components**: Organized tab-specific components

### State Management
- **Single Source of Truth**: All state in Redux store
- **Normalized Data**: Efficient state structure
- **Selectors**: Computed state for components
- **Tab State**: Extended state management for 3-tab system

### Component Architecture
- **Presentational/Container**: Separation of concerns
- **Composition**: Reusable component patterns
- **Props Interface**: TypeScript interfaces for all props
- **Tab Integration**: Consistent tab component patterns

### Testing Strategy
- **Unit Tests**: Component and utility testing
- **Integration Tests**: Redux store testing
- **E2E Tests**: User workflow testing (future)
- **Tab Testing**: Tab switching and content rendering tests

## Deployment Pipeline

### Development
- **Local Development**: `yarn start` for hot reloading
- **Code Quality**: ESLint and TypeScript checking
- **Version Control**: Git workflow with feature branches

### Staging
- **Beta Deployment**: `yarn deploy-beta` for testing
- **Firebase Channels**: Isolated testing environment
- **Preview URLs**: Shareable beta versions

### Production
- **Build Process**: `yarn build` for optimized bundle
- **Firebase Hosting**: Automatic deployment
- **CDN**: Global content delivery
- **Analytics**: Usage tracking and monitoring

## New Feature: Wiring Diagram Tab

### Technical Requirements
- **Component Architecture**: New WiringDiagram component in diagram directory
- **State Integration**: Extend Redux store for wiring view state
- **Tab System**: Update TabSelect for 3-tab layout (33.33% width each)
- **Responsive Design**: Mobile and desktop tab layouts
- **Performance**: Efficient rendering of connection diagrams

### Implementation Details
- **Constants Update**: Extend DISPLAY_TAB to include WIRING
- **Component Creation**: Build WiringDiagram with connection visualization
- **Tab Integration**: Update Simulator component for wiring tab
- **Styling**: Add wiring-specific colors and responsive design
- **Testing**: Verify tab switching and wiring functionality

### Technical Considerations
- **Memory Management**: Efficient handling of connection data
- **Rendering Performance**: Optimize for large wiring diagrams
- **State Persistence**: Save wiring view state across sessions
- **Accessibility**: Keyboard navigation and screen reader support
- **Mobile Optimization**: Touch-friendly tab interface

### Integration Points
- **Redux Store**: Extend existing state management
- **Component System**: Integrate with existing diagram components
- **Styling System**: Maintain consistency with existing UI
- **Error Handling**: Extend error boundaries for wiring components
- **Performance Monitoring**: Track wiring diagram performance metrics
