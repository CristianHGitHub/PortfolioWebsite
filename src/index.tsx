import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Hide loading screen after React app loads
const loadingElement = document.getElementById("loading");
if (loadingElement) {
  setTimeout(() => {
    loadingElement.style.opacity = "0";
    setTimeout(() => {
      loadingElement.style.display = "none";
    }, 300);
  }, 1000);
}
