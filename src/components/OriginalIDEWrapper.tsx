import React from 'react';
import Simulator from './Simulator';

/**
 * Wrapper component for Original IDE interface
 * Provides CSS isolation for Material-UI based PLC Simulator
 */
const OriginalIDEWrapper: React.FC = () => {
  return (
    <div className="original-ide-interface">
      <Simulator />
    </div>
  );
};

export default OriginalIDEWrapper;
