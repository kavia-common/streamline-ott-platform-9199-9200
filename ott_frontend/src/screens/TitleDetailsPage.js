import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiClient } from "../api/client";
import { ErrorBlock, LoadingBlock } from "../components/ui/StateBlocks";
import Button from "../components/ui/Button";

export default function TitleDetailsPage() {
  const { id } = useParams();
  const [state, setState] = useState({ loading: true, error: null, title: null });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const title = await apiClient.getTitle(id);
        if (!mounted) return;
        if (!title) {
          setState({ loading: false, error: "Title not found.", title: null });
          return;
        }
        setState({ loading: false, error: null, title });
      } catch (e) {
        if (mounted) setState({ loading: false, error: e?.message || "Failed to load title.", title: null });
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (state.loading) return <LoadingBlock title="Loading title…" />;
  if (state.error) return <ErrorBlock title="Unable to load title" message={state.error} />;

  const t = state.title;

  return (
    <div className="page">
      <section className="details" style={{ background: t.heroGradient }}>
        <div className="details__meta">
          <div className="details__pill">{t.rating}</div>
          <h1 className="details__title">{t.name}</h1>
          <div className="details__sub">
            {t.year} · {t.duration} · {t.genres?.join(" · ")}
          </div>
          <p className="details__desc">{t.description}</p>

          <div className="details__actions">
            <Link to={`/watch/${t.id}`} className="btn btn--primary">
              Play
            </Link>
            <Button variant="secondary" onClick={() => window.history.back()}>
              Back
            </Button>
          </div>
        </div>
        <div className="details__art" aria-hidden="true">
          <div className="details__poster" />
        </div>
      </section>

      <div className="page__section">
        <div className="panel">
          <div className="panel__title">More like this</div>
          <div className="panel__body">
            <div className="muted">
              Recommendation rails will appear here once a backend is connected. (Mock mode keeps this UI-only.)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
