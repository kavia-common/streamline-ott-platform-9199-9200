import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProfiles } from "../../state/ProfileContext";

export default function TopBar() {
  const navigate = useNavigate();
  const { activeProfile, loading } = useProfiles();

  return (
    <header className="topbar">
      <button
        type="button"
        className="topbar__search"
        onClick={() => navigate("/search")}
        aria-label="Go to search"
      >
        Search titles…
      </button>

      <div className="topbar__right">
        <div className="topbar__profile">
          <div
            className="topbar__avatar"
            style={{ background: activeProfile?.color || "#2563EB" }}
            aria-hidden="true"
          />
          <div className="topbar__profileText">
            <div className="topbar__profileLabel">Profile</div>
            <div className="topbar__profileName">
              {loading ? "Loading…" : activeProfile?.name || "Guest"}
            </div>
          </div>
        </div>

        <Link to="/profiles" className="btn btn--ghost">
          Switch
        </Link>
      </div>
    </header>
  );
}
