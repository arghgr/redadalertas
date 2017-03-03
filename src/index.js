import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';

import './build/styles/index.css';
import Routes from './routes';
import i18n from './i18n';

ReactDOM.render(
  <I18nextProvider i18n={ i18n }><Routes /></I18nextProvider>,
  document.getElementById('root')
);
