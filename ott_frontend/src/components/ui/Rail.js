import React from "react";
import TitleCard from "./TitleCard";

export default function Rail({ title, items }) {
  return (
    <section className="rail">
      <div className="rail__header">
        <h2 className="rail__title">{title}</h2>
      </div>
      <div className="rail__items" role="list">
        {(items || []).map((t) => (
          <div key={t.id} role="listitem">
            <TitleCard title={t} />
          </div>
        ))}
      </div>
    </section>
  );
}
