import React, { Suspense } from 'react';
import ReactDOM from "react-dom/client";
import { Router } from "wouter";
import LoadingWidget from './components/LoadingWidget';
import AppRoutes from './AppRoutes';
import './navigation/MenuPageButtons/MenuPageButtons.css';

// Paths are relative to the Vite base, e.g. /iotum-samples
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Suspense fallback={<LoadingWidget />}>
      <Router base={base}>
        <AppRoutes />
      </Router>
    </Suspense>
  </React.StrictMode>
);
