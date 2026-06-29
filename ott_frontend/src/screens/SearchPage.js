import React, { useEffect, useMemo, useState } from "react";
import { apiClient } from "../api/client";
import TitleCard from "../components/ui/TitleCard";
import { ErrorBlock } from "../components/ui/StateBlocks";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [state, setState] = useState({ loading: false, error: null, results: [] });

  useEffect(() => {
    let mounted = true;
    const t = window.setTimeout(async () => {
      const q = query.trim();
      if (!q) {
        setState({ loading: false, error: null, results: [] });
        return;
      }
      setState((s) => ({ ...s, loading: true, error: null }));
      try {
        const res = await apiClient.search(q);
        if (mounted) setState({ loading: false, error: null, results: res.results || [] });
      } catch (e) {
        if (mounted) setState({ loading: false, error: e?.message || "Search failed.", results: [] });
      }
    }, 250);

    return () => {
      mounted = false;
      window.clearTimeout(t);
    };
  }, [query]);

  const resultsLabel = useMemo(() => {
    if (!query.trim()) return "Start typing to search.";
    if (state.loading) return "Searching…";
    if (state.results.length === 0) return "No matches.";
    return `${state.results.length} result(s)`;
  }, [query, state.loading, state.results.length]);

  return (
    <div className="page">
      <div className="page__header">
        <h1 className="page__title">Search</h1>
        <div className="page__subtitle">Find movies and series across the catalog.</div>
      </div>

      <div className="searchBar">
        <input
          className="input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a title…"
          aria-label="Search query"
        />
        <div className="searchBar__hint">{resultsLabel}</div>
      </div>

      {state.error ? <ErrorBlock title="Search error" message={state.error} /> : null}

      <div className="grid">
        {state.results.map((t) => (
          <TitleCard key={t.id} title={t} />
        ))}
      </div>
    </div>
  );
}
