import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/globals.css';
import { Router } from '../router';
import { initializePerformanceMonitoring } from '../utils/performance';
import { Toaster } from '../components/ui/sonner';

// Initialize performance monitoring
initializePerformanceMonitoring();

// Get initial route from window (set by HTML template)
const initialPath = (window as any).__INITIAL_ROUTE__ || window.location.pathname;

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <Router initialPath={initialPath} />
    <Toaster />
  </StrictMode>
);

// Mark app as loaded for CSS
document.body.classList.add('app-loaded');