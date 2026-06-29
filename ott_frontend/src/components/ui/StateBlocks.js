import React from "react";

export function ErrorBlock({ title = "Something went wrong", message, action }) {
  return (
    <div className="state state--error" role="alert">
      <div className="state__title">{title}</div>
      {message ? <div className="state__message">{message}</div> : null}
      {action ? <div className="state__actions">{action}</div> : null}
    </div>
  );
}

export function LoadingBlock({ title = "Loading…" }) {
  return (
    <div className="state state--loading" aria-busy="true">
      <div className="skeleton skeleton--title" />
      <div className="skeleton skeleton--line" />
      <div className="skeleton skeleton--line" />
      <div className="skeleton skeleton--line" />
      <div className="state__message">{title}</div>
    </div>
  );
}
