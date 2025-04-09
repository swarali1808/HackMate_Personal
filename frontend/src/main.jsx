import React,{ Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from './ScrollToTop.jsx';
import AppContextProvider from './Context/ContextApi.jsx';
import Loader from './Component/Loader.jsx';

const App = React.lazy(() => import('./App.jsx'));

createRoot(document.getElementById('root')).render(
  <AppContextProvider>
    <BrowserRouter>
      <ScrollToTop />
      <Toaster position="top-right" reverseOrder={false} />
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>
    </BrowserRouter>
  </AppContextProvider>
);
