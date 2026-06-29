import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="page">
      <div className="panel">
        <div className="panel__title">Page not found</div>
        <div className="panel__body">
          <div className="muted">The page you requested does not exist.</div>
          <div style={{ marginTop: 12 }}>
            <Link to="/" className="btn btn--primary">
              Go to Discover
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
