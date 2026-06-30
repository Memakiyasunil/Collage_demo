import { StrictMode } from 'react'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index.js';
import App from './App.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import { CourseProvider } from './context/CourseContext.jsx';
import { SiteProvider } from './context/SiteContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <SiteProvider>
        <CourseProvider>
          <BrowserRouter>
            <ScrollToTop />
            <App />
          </BrowserRouter>
        </CourseProvider>
      </SiteProvider>
    </Provider>
  </React.StrictMode>,
)
