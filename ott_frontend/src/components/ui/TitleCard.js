import React from "react";
import { Link } from "react-router-dom";

function toneToGradient(tone) {
  if (tone === "amber") return "linear-gradient(135deg, rgba(245,158,11,0.20), rgba(37,99,235,0.10))";
  if (tone === "slate") return "linear-gradient(135deg, rgba(17,24,39,0.16), rgba(37,99,235,0.10))";
  return "linear-gradient(135deg, rgba(37,99,235,0.18), rgba(245,158,11,0.12))";
}

export default function TitleCard({ title }) {
  return (
    <Link to={`/title/${title.id}`} className="title-card">
      <div className="title-card__poster" style={{ background: toneToGradient(title.posterTone) }}>
        <div className="title-card__badge">{title.rating}</div>
      </div>
      <div className="title-card__meta">
        <div className="title-card__name">{title.name}</div>
        <div className="title-card__sub">
          {title.year} · {title.duration}
        </div>
      </div>
    </Link>
  );
}
