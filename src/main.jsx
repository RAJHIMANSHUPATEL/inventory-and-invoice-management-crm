import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { ThemeProvider } from "./components/theme-provider";
  import { ToastContainer, toast } from 'react-toastify';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
      <ToastContainer />
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
