import React from "react";

export default function Button({ variant = "primary", className = "", ...props }) {
  const classes = ["btn", `btn--${variant}`, className].filter(Boolean).join(" ");
  return <button className={classes} {...props} />;
}
