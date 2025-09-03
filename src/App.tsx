import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import './index.css';
import 'firebase/compat/analytics';
import firebase from './helpers/firebase';
import ErrorBoundary from './components/ErrorBoundary';
import Simulator from './components/Simulator';
import GXWorks2Demo from './components/gx-works2/GXWorks2Demo';
import GXWorks2Test from './components/gx-works2/GXWorks2Test';
import SimpleTest from './components/gx-works2/SimpleTest';
import Loading from './components/Loading';
import { loadDiagram, persistor, store } from './store/store';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { CustomDragLayer } from './CustomDragLayer';
import { useState } from 'react';

const theme = createTheme();

firebase.analytics();

loadDiagram();

export default function App() {
  const [showGXWorks2, setShowGXWorks2] = useState(false);
  const [showTest, setShowTest] = useState(false);
  const [showSimpleTest, setShowSimpleTest] = useState(false);

  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <ErrorBoundary>
          <DndProvider backend={HTML5Backend}>
            <CustomDragLayer />
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {showSimpleTest ? (
                <SimpleTest />
              ) : showTest ? (
                <GXWorks2Test />
              ) : showGXWorks2 ? (
                <GXWorks2Demo />
              ) : (
                <div>
                  <div className="fixed top-2 right-2 z-50 flex space-x-2">
                    <button
                      onClick={() => setShowSimpleTest(!showSimpleTest)}
                      className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded text-sm font-medium shadow-lg"
                    >
                      {showSimpleTest ? 'Hide Simple Test' : 'Simple Test'}
                    </button>
                    <button
                      onClick={() => setShowTest(!showTest)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm font-medium shadow-lg"
                    >
                      {showTest ? 'Hide Test' : 'Test TailwindCSS'}
                    </button>
                    <button
                      onClick={() => setShowGXWorks2(!showGXWorks2)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium shadow-lg"
                    >
                      {showGXWorks2 ? 'Show PLC Simulator' : 'Show GX Works2 IDE'}
                    </button>
                  </div>
                  <Simulator />
                </div>
              )}
            </ThemeProvider>
          </DndProvider>
        </ErrorBoundary>
      </PersistGate>
    </Provider>
  );
}

serviceWorkerRegistration.register();
