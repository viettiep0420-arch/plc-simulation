# Product Context

## Why This Project Exists

### Problem Statement
Learning PLC programming traditionally requires expensive hardware and physical setup, creating barriers for:
- Students and educators
- Professionals wanting to practice
- Hobbyists interested in industrial automation
- Companies training employees

### Solution
A web-based PLC simulator that provides:
- **Zero Setup**: Works immediately in any browser
- **Cost Effective**: Free and open source
- **Realistic Simulation**: Accurate PLC behavior without hardware
- **Learning Focus**: Designed for education and practice

## How It Should Work

### User Experience Flow
1. **Access**: User visits the website (https://app.plcsimulator.online/)
2. **Interface Selection**: Choose between Original IDE or professional GX Works2-style interface
3. **Authenticate**: Optional sign-in for project saving
4. **Create**: Start with a blank ladder diagram or load existing project
5. **Program**: Drag components from toolbox to build ladder logic
6. **Configure**: Set up variables and component parameters
7. **Simulate**: Run the program and observe behavior
8. **Iterate**: Modify and test until desired behavior is achieved
9. **Save**: Store project for future use

### Dual Interface System
- **Original IDE**: Material-UI based interface with familiar PLC simulator layout
- **GX Works2 IDE**: Professional desktop-style interface with customizable toolbars, resizable panels, and advanced features
- **Seamless Switching**: Users can switch between interfaces using the navigation switcher

### Core User Journeys

#### Beginner Learning Path
1. **Explore**: Browse available components in toolbox
2. **Tutorial**: Follow guided examples
3. **Simple Programs**: Start with basic logic (AND, OR gates)
4. **Gradual Complexity**: Add timers, counters, math functions
5. **Practice**: Build increasingly complex programs

#### Professional Practice Path
1. **Load Existing**: Import saved projects or industry examples
2. **Modify**: Adapt programs for different scenarios
3. **Test**: Validate logic before implementing on real hardware
4. **Optimize**: Improve program efficiency and reliability

#### Educational Path
1. **Instructor Setup**: Create assignments and examples
2. **Student Practice**: Complete exercises in simulator
3. **Assessment**: Test understanding through practical application
4. **Collaboration**: Share and discuss solutions

## User Experience Goals

### Accessibility
- **Intuitive Interface**: Clear visual representation of ladder logic
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Error Prevention**: Helpful feedback and validation
- **Learning Support**: Built-in help and documentation

### Performance
- **Fast Loading**: Quick startup and component placement
- **Smooth Simulation**: Real-time execution without lag
- **Reliable Saving**: Consistent project persistence
- **Cross-Platform**: Consistent experience across browsers

### Educational Value
- **Visual Feedback**: Clear indication of program state
- **Step-by-Step**: Ability to step through program execution
- **Variable Monitoring**: Real-time view of variable values
- **Error Detection**: Helpful debugging information

## Success Metrics
- **User Engagement**: Time spent creating and testing programs
- **Learning Outcomes**: Ability to create functional PLC programs
- **Community Growth**: Active contributors and users
- **Educational Adoption**: Use in schools and training programs
