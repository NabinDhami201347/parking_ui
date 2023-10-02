import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import AccessTokenProvider from "./hooks/useAccessToken.jsx";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AccessTokenProvider>
          <Toaster />
          <App />
        </AccessTokenProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
