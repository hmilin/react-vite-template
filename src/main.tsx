import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';

import App from './App';

async function prepareApp() {
  // Start the mocking conditionally.
  if (import.meta.env.MODE === 'mock') {
    const { worker } = await import('./mocks/browser');
    return worker.start();
  }

  return Promise.resolve();
}

function startApp() {
  const container = document.querySelector('#root');
  if (container) {
    const root = createRoot(container);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  }
}

prepareApp().then(() => {
  startApp();
});
