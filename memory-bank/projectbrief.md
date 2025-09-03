# PLC Simulator Project Brief

## Project Overview
**PLC Simulator Online** is an open-source web-based simulator for Programmable Logic Controllers (PLCs) that enables users to practice and develop PLC programming skills without requiring physical hardware.

## Core Requirements

### Primary Goals
1. **Educational Tool**: Provide a learning environment for PLC programming
2. **Simulation Environment**: Enable testing of PLC programs in a virtual environment
3. **Ladder Logic Support**: Focus on Ladder Diagram programming language
4. **Web-Based**: Accessible through any modern web browser
5. **Open Source**: Community-driven development under GPL v3.0

### Key Features
- **Ladder Diagram Editor**: Visual programming interface for ladder logic
- **Real-time Simulation**: Execute and test PLC programs
- **Variable Management**: Create and manage PLC variables
- **Component Library**: Standard PLC components (contacts, coils, timers, counters, math functions)
- **Responsive Design**: Works on desktop and mobile devices
- **Project Persistence**: Save and load PLC programs
- **User Authentication**: Firebase-based user management
- **Dual Interface System**: Original PLC Simulator and professional GX Works2-style IDE
- **Professional IDE**: Desktop-style interface with multiple toolbars, navigation panels, and status bar

### Technical Requirements
- **Frontend**: React 18 with TypeScript
- **State Management**: Redux with Redux Persist
- **UI Framework**: Material-UI (MUI) for original interface, TailwindCSS for GX Works2 IDE
- **Icons**: Material-UI Icons for original interface, Lucide React for GX Works2 IDE
- **Drag & Drop**: React DnD for component placement
- **Backend**: Firebase (Authentication, Hosting, Analytics)
- **Build System**: Create React App
- **Package Manager**: Yarn

## Success Criteria
1. Users can create functional ladder logic programs
2. Simulation accurately represents PLC behavior
3. Interface is intuitive for both beginners and experienced users
4. Application performs well on various devices
5. Code is maintainable and well-documented
6. Community contributions are facilitated

## Constraints
- Must work in modern web browsers
- Should not require installation or setup
- Must be free and open source
- Should support standard PLC programming practices
