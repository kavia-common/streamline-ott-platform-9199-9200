import React, { useEffect, useMemo, useState } from "react";
import { apiClient } from "../api/client";
import TitleCard from "../components/ui/TitleCard";
import { ErrorBlock, LoadingBlock } from "../components/ui/StateBlocks";
import Button from "../components/ui/Button";

export default function CatalogPage() {
  const [state, setState] = useState({ loading: true, error: null, data: null });
  const [categoryId, setCategoryId] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await apiClient.getCatalog();
        if (!mounted) return;
        setState({ loading: false, error: null, data });
        setCategoryId(data?.categories?.[0]?.id || null);
      } catch (e) {
        if (mounted) setState({ loading: false, error: e?.message || "Failed to load catalog.", data: null });
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const categories = state.data?.categories || [];
  const current = useMemo(() => categories.find((c) => c.id === categoryId) || categories[0], [categories, categoryId]);

  if (state.loading) return <LoadingBlock title="Loading catalog…" />;
  if (state.error)
    return (
      <ErrorBlock
        title="Catalog unavailable"
        message={state.error}
        action={
          <Button variant="secondary" onClick={() => window.location.reload()}>
            Retry
          </Button>
        }
      />
    );

  return (
    <div className="page">
      <div className="page__header">
        <h1 className="page__title">Catalog</h1>
        <div className="page__subtitle">Browse on-demand titles and collections.</div>
      </div>

      <div className="tabs" role="tablist" aria-label="Catalog categories">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={c.id === categoryId}
            className={c.id === categoryId ? "tab tab--active" : "tab"}
            onClick={() => setCategoryId(c.id)}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="grid">
        {(current?.items || []).map((t) => (
          <TitleCard key={t.id} title={t} />
        ))}
      </div>
    </div>
  );
}
