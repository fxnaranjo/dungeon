/**
 * Main Entry Point
 *
 * This file initializes the React application and mounts it to the DOM.
 *
 * - StrictMode: React development mode that helps identify potential problems
 * - createRoot: Modern React 18+ API for rendering the app
 * - Mounts to the 'root' div in index.html
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Create root and render the app
// StrictMode enables additional checks and warnings in development
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
