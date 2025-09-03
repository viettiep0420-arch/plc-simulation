# Active Context

## Current Work Focus

### Project Status
The PLC Simulator is a **mature, production-ready application** currently deployed at https://app.plcsimulator.online/. The project is in **maintenance and enhancement mode** with active community contributions.

### Current Development Priorities
1. **GX Works2 IDE Implementation**: Creating professional desktop-style IDE interface ✅
2. **Menu Bar Enhancement**: Implementing GX Works 2 style menu bar ✅
3. **Build/Styling Stability**: TailwindCSS v3 + PostCSS pipeline stabilized ✅
4. **Wiring Diagram Feature**: Adding new WIRING tab for PLC connection visualization 🚧
5. **Bug Fixes**: Addressing reported issues and edge cases
6. **Performance Optimization**: Improving simulation speed and UI responsiveness
7. **Feature Enhancements**: Adding new PLC components and capabilities
8. **User Experience**: Improving interface usability and accessibility
9. **Documentation**: Maintaining comprehensive project documentation

### Recent Changes
- **GX Works2 IDE**: Complete professional desktop-style IDE interface with multiple toolbars, navigation panels, and status bar
- **GX Works 2 Style Menu Bar**: Complete menu bar implementation with File, Edit, View, Tools, Help menus
- **Dual Interface System**: Toggle between original PLC Simulator and new GX Works2 IDE
- **Build Pipeline Stabilization**: Resolved Tailwind/PostCSS errors by standardizing on TailwindCSS v3.4.x with PostCSS (tailwindcss + autoprefixer), corrected `tailwind.config.js`, `postcss.config.js`, and `src/index.css` imports ✅
- **Successful Build & Dev Server**: `yarn build` succeeds; dev server runs on port 3000 ✅
- **Firebase Integration**: Complete authentication and hosting setup
- **Responsive Design**: Mobile and desktop optimization
- **Component Library**: Comprehensive set of PLC components implemented
- **Simulation Engine**: Real-time ladder logic execution
- **Diagram Integration**: Added Diagram component to MAIN tab in GX Works2 IDE

## Active Decisions and Considerations

### Technical Decisions
1. **State Management**: Redux with Immer for complex diagram state
2. **UI Framework**: Material-UI for consistent design system
3. **Drag & Drop**: React DnD for component placement
4. **Persistence**: Redux Persist for automatic state saving
5. **Error Handling**: Sentry integration for production monitoring
6. **Styling**: TailwindCSS v3 with PostCSS (no preflight), plus MUI and styled-components
7. **Tab System**: Extending from 2 tabs (VARIABLES, DIAGRAM) to 3 tabs (VARIABLES, DIAGRAM, WIRING)

### Architecture Considerations
1. **Component Structure**: Modular design for maintainability
2. **Performance**: Optimized rendering for large diagrams
3. **Mobile Support**: Responsive design for all screen sizes
4. **Accessibility**: WCAG compliance and keyboard navigation
5. **Internationalization**: Future support for multiple languages
6. **Tab Management**: Consistent state management for multiple view modes

### User Experience Focus
1. **Intuitive Interface**: Clear visual representation of ladder logic
2. **Learning Support**: Built-in help and documentation
3. **Real-time Feedback**: Immediate visual response to user actions
4. **Error Prevention**: Validation and helpful error messages
5. **Project Management**: Save, load, and share functionality
6. **Multi-View Support**: Seamless switching between Variables, Diagram, and Wiring views

## Next Steps

### Immediate Priorities
1. **Wiring Diagram Implementation**: Add new WIRING tab with PLC connection visualization 🚧
   - Create WiringDiagram component
   - Update TabSelect to support 3 tabs
   - Extend Redux state for wiring view
   - Implement wiring connection rendering logic
2. **CI Alignment**: Ensure CI/CD uses Tailwind v3 config consistently (build + deploy)
3. **IDE Integration**: Complete integration of GX Works2 IDE with existing PLC Simulator
4. **Memory Bank Update**: Complete project documentation updates ✅
5. **Code Review**: Identify areas for improvement and optimization
6. **Feature Planning**: Prioritize new component additions
7. **Testing Strategy**: Enhance test coverage and automation
8. **Performance Monitoring**: Track and optimize user experience

### Medium-term Goals
1. **Enhanced Simulation**: More sophisticated PLC behavior simulation
2. **Advanced Components**: Additional PLC function blocks
3. **Collaboration Features**: Multi-user editing and sharing
4. **Educational Content**: Tutorials and example projects
5. **API Development**: External integration capabilities
6. **Wiring Diagram Enhancement**: Advanced connection visualization and documentation

### Long-term Vision
1. **Industry Adoption**: Use in professional training programs
2. **Community Growth**: Active contributor ecosystem
3. **Educational Partnerships**: Integration with educational institutions
4. **Commercial Features**: Premium features for professional use
5. **Mobile App**: Native mobile application development
6. **Professional Wiring Tools**: Industry-standard wiring diagram capabilities

## Current Challenges

### Technical Challenges
1. **Performance**: Optimizing simulation for complex diagrams
2. **State Complexity**: Managing large, interconnected component states
3. **Browser Compatibility**: Ensuring consistent behavior across platforms
4. **Memory Management**: Efficient handling of large projects
5. **Real-time Updates**: Smooth simulation without performance degradation
6. **Tab System Extension**: Maintaining consistent behavior across 3 tabs

### User Experience Challenges
1. **Learning Curve**: Making complex PLC programming accessible
2. **Mobile Usability**: Optimizing touch interactions for mobile devices
3. **Error Handling**: Providing helpful feedback for programming errors
4. **Project Organization**: Managing multiple projects and versions
5. **Collaboration**: Enabling team-based development workflows
6. **View Switching**: Ensuring smooth transitions between Variables, Diagram, and Wiring views

### Community Challenges
1. **Documentation**: Maintaining comprehensive, up-to-date documentation
2. **Contributor Onboarding**: Making it easy for new contributors
3. **Issue Management**: Prioritizing and addressing user feedback
4. **Feature Requests**: Balancing user needs with technical feasibility
5. **Quality Assurance**: Ensuring code quality across contributions

## Development Environment

### Current Setup
- **Repository**: https://github.com/codingplc/plc-simulator
- **Live Application**: https://app.plcsimulator.online/
- **Development**: Local development with hot reloading
- **Deployment**: Firebase hosting with automatic builds
- **Monitoring**: Sentry error tracking and Firebase analytics

### Team Structure
- **Open Source**: Community-driven development
- **Maintainers**: Core team managing the project
- **Contributors**: Community members providing features and fixes
- **Users**: Educators, students, and professionals using the simulator

### Communication Channels
- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: Community discussions and support
- **Email**: Direct contact for business inquiries
- **Documentation**: Comprehensive project documentation

## New Feature: Wiring Diagram Tab

### Feature Overview
Adding a third tab "WIRING" to provide visual representation of PLC component connections and wiring diagrams, complementing the existing VARIABLES and DIAGRAM tabs.

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
