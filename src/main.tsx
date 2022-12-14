import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import history from '@/utils/history';
import './global.less';

import App from './App';

const container = document.querySelector('#root');
if (container) {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <HistoryRouter history={history}>
        <App />
      </HistoryRouter>
    </StrictMode>,
  );
}
