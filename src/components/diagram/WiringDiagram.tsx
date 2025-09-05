import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Store } from '../../interface';
import { BG_WIRING } from '../../consts/colors';

const Container = styled.div`
  background-color: ${BG_WIRING};
  padding: 20px;
  height: 100%;
  overflow-y: auto;
`;

const WiringGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const WiringCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const CardHeader = styled.h3`
  margin: 0 0 12px 0;
  color: #333;
  font-size: 16px;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 8px;
`;

const ConnectionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ConnectionItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ConnectionStatus = styled.span<{ connected: boolean }>`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.connected ? '#4CAF50' : '#F44336'};
  margin-right: 8px;
`;

const ConnectionInfo = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const ConnectionValue = styled.span`
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  background-color: #f5f5f5;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  color: #666;
`;

const WiringDiagram: React.FC = () => {
  const variables = useSelector((state: Store) => state.variables);
  const elements = useSelector((state: Store) => state.elements);
  
  // Extract connections from variables and elements
  const connections = Object.values(variables).flatMap(variable => {
    const connectedElements = variable.usedBy.map(elementId => {
      const element = elements[elementId];
      return {
        variable: variable.name,
        elementId,
        elementType: element?.type || 'Unknown',
        connected: !!element,
        value: variable.value
      };
    });
    
    return connectedElements;
  });

  const inputConnections = connections.filter(conn => 
    conn.elementType && ['XIC', 'XIO', 'OSP', 'OSN'].includes(conn.elementType)
  );

  const outputConnections = connections.filter(conn => 
    conn.elementType && ['OTE', 'OTL', 'OTU', 'OTN'].includes(conn.elementType)
  );

  const functionConnections = connections.filter(conn => 
    conn.elementType && ['TON', 'TOF', 'TONR', 'CTU', 'CTD', 'CTUD', 'ADD', 'SUB', 'MUL', 'DIV', 'MOV', 'EQU', 'NEQ', 'GRT', 'GEQ', 'LES', 'LEQ'].includes(conn.elementType)
  );

  return (
    <Container>
      <h2>Wiring Diagram</h2>
      <p>Visual representation of PLC component connections and wiring</p>
      
      <WiringGrid>
        {/* Input Connections */}
        <WiringCard>
          <CardHeader>Input Devices</CardHeader>
          <ConnectionList>
            {inputConnections.length > 0 ? (
              inputConnections.map((conn, index) => (
                <ConnectionItem key={index}>
                  <ConnectionInfo>
                    <ConnectionStatus connected={conn.connected} />
                    <span>{conn.variable}</span>
                  </ConnectionInfo>
                  <ConnectionValue>{conn.elementType}</ConnectionValue>
                </ConnectionItem>
              ))
            ) : (
              <EmptyState>No input devices connected</EmptyState>
            )}
          </ConnectionList>
        </WiringCard>

        {/* Output Connections */}
        <WiringCard>
          <CardHeader>Output Devices</CardHeader>
          <ConnectionList>
            {outputConnections.length > 0 ? (
              outputConnections.map((conn, index) => (
                <ConnectionItem key={index}>
                  <ConnectionInfo>
                    <ConnectionStatus connected={conn.connected} />
                    <span>{conn.variable}</span>
                  </ConnectionInfo>
                  <ConnectionValue>{conn.elementType}</ConnectionValue>
                </ConnectionItem>
              ))
            ) : (
              <EmptyState>No output devices connected</EmptyState>
            )}
          </ConnectionList>
        </WiringCard>

        {/* Function Blocks */}
        <WiringCard>
          <CardHeader>Function Blocks</CardHeader>
          <ConnectionList>
            {functionConnections.length > 0 ? (
              functionConnections.map((conn, index) => (
                <ConnectionItem key={index}>
                  <ConnectionInfo>
                    <ConnectionStatus connected={conn.connected} />
                    <span>{conn.variable}</span>
                  </ConnectionInfo>
                  <ConnectionValue>{conn.elementType}</ConnectionValue>
                </ConnectionItem>
              ))
            ) : (
              <EmptyState>No function blocks connected</EmptyState>
            )}
          </ConnectionList>
        </WiringCard>

        {/* System Overview */}
        <WiringCard>
          <CardHeader>System Overview</CardHeader>
          <div>
            <p><strong>Total Variables:</strong> {Object.keys(variables).length}</p>
            <p><strong>Total Elements:</strong> {Object.keys(elements).length}</p>
            <p><strong>Total Connections:</strong> {connections.length}</p>
            <p><strong>Active Connections:</strong> {connections.filter(c => c.connected).length}</p>
          </div>
        </WiringCard>
      </WiringGrid>
    </Container>
  );
};

export default WiringDiagram;
