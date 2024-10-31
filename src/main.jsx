import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";
import GlobalState from "./components/Context/index.jsx";

createRoot(document.getElementById("root")).render(
  <GlobalState>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GlobalState>
);
