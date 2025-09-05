import React from 'react';
import { Provider } from 'react-redux';
import { persistor, store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ErrorBoundary from './components/ErrorBoundary';
import MainRouter from './components/MainRouter';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<div>Loading Redux state...</div>}>
        <DndProvider backend={HTML5Backend}>
          <ErrorBoundary>
            <MainRouter />
          </ErrorBoundary>
        </DndProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
