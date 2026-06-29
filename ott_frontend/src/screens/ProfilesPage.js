import React, { useMemo, useState } from "react";
import { useProfiles } from "../state/ProfileContext";
import Button from "../components/ui/Button";
import { ErrorBlock, LoadingBlock } from "../components/ui/StateBlocks";
import { useToast } from "../state/ToastContext";

function ProfileChip({ profile, active, onSelect }) {
  return (
    <button type="button" className={active ? "profileChip profileChip--active" : "profileChip"} onClick={onSelect}>
      <span className="profileChip__dot" style={{ background: profile.color }} aria-hidden="true" />
      <span className="profileChip__name">{profile.name}</span>
      <span className="profileChip__meta">{profile.maturity}</span>
    </button>
  );
}

export default function ProfilesPage() {
  const toast = useToast();
  const { loading, error, profiles, activeProfileId, setActiveProfileId, saveProfile } = useProfiles();

  const [draft, setDraft] = useState({ id: "", name: "", maturity: "All", color: "#2563EB" });
  const isEditing = useMemo(() => Boolean(draft.id), [draft.id]);

  const startEdit = (p) => setDraft({ id: p.id, name: p.name, maturity: p.maturity, color: p.color });
  const reset = () => setDraft({ id: "", name: "", maturity: "All", color: "#2563EB" });

  const submit = async () => {
    try {
      await saveProfile(draft);
      toast.push({ type: "success", title: isEditing ? "Profile updated" : "Profile created" });
      reset();
    } catch (e) {
      toast.push({ type: "error", title: "Could not save profile", message: e?.message || "Unknown error" });
    }
  };

  if (loading) return <LoadingBlock title="Loading profiles…" />;
  if (error) return <ErrorBlock title="Profiles unavailable" message={error} />;

  return (
    <div className="page">
      <div className="page__header">
        <h1 className="page__title">Profiles</h1>
        <div className="page__subtitle">Switch viewing profile, or create a new one.</div>
      </div>

      <div className="profilesGrid">
        <div className="panel">
          <div className="panel__title">Your profiles</div>
          <div className="panel__body">
            <div className="profileList">
              {profiles.map((p) => (
                <div key={p.id} className="profileRow">
                  <ProfileChip
                    profile={p}
                    active={p.id === activeProfileId}
                    onSelect={() => setActiveProfileId(p.id)}
                  />
                  <Button variant="ghost" onClick={() => startEdit(p)}>
                    Edit
                  </Button>
                </div>
              ))}
            </div>
            <div className="muted">Active profile affects recommendations and maturity filters (when backend is connected).</div>
          </div>
        </div>

        <div className="panel">
          <div className="panel__title">{isEditing ? "Edit profile" : "Create profile"}</div>
          <div className="panel__body">
            <div className="form">
              <label className="label">
                Name
                <input
                  className="input"
                  value={draft.name}
                  onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                  placeholder="e.g. Alex"
                />
              </label>

              <label className="label">
                Maturity
                <select
                  className="input"
                  value={draft.maturity}
                  onChange={(e) => setDraft((d) => ({ ...d, maturity: e.target.value }))}
                >
                  <option value="All">All</option>
                  <option value="Teen">Teen</option>
                  <option value="Adult">Adult</option>
                </select>
              </label>

              <label className="label">
                Accent color
                <input
                  className="input input--color"
                  type="color"
                  value={draft.color}
                  onChange={(e) => setDraft((d) => ({ ...d, color: e.target.value }))}
                  aria-label="Profile accent color"
                />
              </label>

              <div className="form__actions">
                <Button variant="primary" onClick={submit}>
                  {isEditing ? "Save changes" : "Create"}
                </Button>
                <Button variant="secondary" onClick={reset}>
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
