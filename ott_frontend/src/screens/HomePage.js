import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiClient } from "../api/client";
import Rail from "../components/ui/Rail";
import Button from "../components/ui/Button";
import { ErrorBlock, LoadingBlock } from "../components/ui/StateBlocks";

export default function HomePage() {
  const [state, setState] = useState({ loading: true, error: null, data: null });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await apiClient.getHome();
        if (mounted) setState({ loading: false, error: null, data });
      } catch (e) {
        if (mounted) setState({ loading: false, error: e?.message || "Failed to load home.", data: null });
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (state.loading) return <LoadingBlock title="Loading discovery…" />;
  if (state.error)
    return (
      <ErrorBlock
        message={state.error}
        action={
          <Button variant="secondary" onClick={() => window.location.reload()}>
            Reload
          </Button>
        }
      />
    );

  const featured = state.data?.featured;

  return (
    <div className="page">
      {featured ? (
        <section className="hero" style={{ background: featured.heroGradient }}>
          <div className="hero__content">
            <div className="hero__pill">{featured.bannerText}</div>
            <h1 className="hero__title">{featured.name}</h1>
            <div className="hero__sub">
              {featured.year} · {featured.rating} · {featured.duration} · {featured.genres?.join(" · ")}
            </div>
            <p className="hero__desc">{featured.description}</p>
            <div className="hero__actions">
              <Link to={`/watch/${featured.id}`} className="btn btn--primary">
                Play
              </Link>
              <Link to={`/title/${featured.id}`} className="btn btn--ghost">
                Details
              </Link>
            </div>
          </div>

          <div className="hero__visual" aria-hidden="true">
            <div className="hero__poster" />
          </div>
        </section>
      ) : null}

      <div className="page__section">
        {(state.data?.rails || []).map((r) => (
          <Rail key={r.id} title={r.title} items={r.items} />
        ))}
      </div>
    </div>
  );
}
