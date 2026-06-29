import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AppProviders } from "./state/AppProviders";
import AppLayout from "./components/layout/AppLayout";

export default function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <AppLayout>
          <AppRoutes />
        </AppLayout>
      </BrowserRouter>
    </AppProviders>
  );
}
