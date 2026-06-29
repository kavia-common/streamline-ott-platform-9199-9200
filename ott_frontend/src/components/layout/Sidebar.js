import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Discover" },
  { to: "/catalog", label: "Catalog" },
  { to: "/search", label: "Search" },
  { to: "/subscriptions", label: "Subscription" }
];

export default function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Primary">
      <div className="sidebar__brand">
        <div className="sidebar__logo" aria-hidden="true">
          S
        </div>
        <div>
          <div className="sidebar__title">Streamline</div>
          <div className="sidebar__subtitle">OTT</div>
        </div>
      </div>

      <nav className="sidebar__nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive ? "sidebar__link sidebar__link--active" : "sidebar__link"
            }
            end={item.to === "/"}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__footer">
        <NavLink to="/profiles" className="sidebar__link sidebar__link--secondary">
          Manage Profiles
        </NavLink>
        <div className="sidebar__hint">Modern · Ocean theme</div>
      </div>
    </aside>
  );
}
