import React from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function AppLayout({ children }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">
        <TopBar />
        <main className="app-content" role="main">
          {children}
        </main>
      </div>
    </div>
  );
}
