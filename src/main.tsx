
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from "sonner"

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
    <Toaster position="top-right" richColors />
  </HelmetProvider>
);
