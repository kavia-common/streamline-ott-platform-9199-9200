import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiClient } from "../api/client";
import { ErrorBlock, LoadingBlock } from "../components/ui/StateBlocks";
import Button from "../components/ui/Button";
import { useToast } from "../state/ToastContext";

export default function PlaybackPage() {
  const { id } = useParams();
  const videoRef = useRef(null);
  const toast = useToast();

  const [state, setState] = useState({ loading: true, error: null, title: null });
  const [paused, setPaused] = useState(true);
  const [muted, setMuted] = useState(false);

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
        if (mounted) setState({ loading: false, error: e?.message || "Failed to load playback.", title: null });
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  const t = state.title;

  const togglePlay = async () => {
    const el = videoRef.current;
    if (!el) return;
    try {
      if (el.paused) {
        await el.play();
        setPaused(false);
      } else {
        el.pause();
        setPaused(true);
      }
    } catch (e) {
      toast.push({ type: "error", title: "Playback blocked", message: "Your browser prevented autoplay. Press Play again." });
    }
  };

  const toggleMute = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  };

  const onEnded = () => {
    toast.push({ type: "info", title: "Playback finished", message: "You can return to details or pick another title." });
    setPaused(true);
  };

  const titleLabel = useMemo(() => (t ? `${t.name} (${t.year})` : "Playback"), [t]);

  if (state.loading) return <LoadingBlock title="Preparing player…" />;
  if (state.error) return <ErrorBlock title="Playback unavailable" message={state.error} />;

  return (
    <div className="page">
      <div className="playerHeader">
        <div>
          <div className="playerHeader__title">{titleLabel}</div>
          <div className="playerHeader__sub">
            {t.rating} · {t.duration} · {t.genres?.join(" · ")}
          </div>
        </div>
        <div className="playerHeader__actions">
          <Link to={`/title/${t.id}`} className="btn btn--ghost">
            Details
          </Link>
        </div>
      </div>

      <section className="playerShell">
        <div className="playerShell__video">
          <video
            ref={videoRef}
            className="video"
            src={t.videoUrl}
            controls={false}
            playsInline
            onPlay={() => setPaused(false)}
            onPause={() => setPaused(true)}
            onEnded={onEnded}
          />
          <div className="playerControls">
            <Button variant="primary" onClick={togglePlay}>
              {paused ? "Play" : "Pause"}
            </Button>
            <Button variant="secondary" onClick={toggleMute}>
              {muted ? "Unmute" : "Mute"}
            </Button>
            <Button variant="ghost" onClick={() => window.history.back()}>
              Back
            </Button>
          </div>
        </div>

        <aside className="playerShell__side">
          <div className="panel">
            <div className="panel__title">Up next</div>
            <div className="panel__body">
              <div className="muted">Connect backend to enable personalized next-up queue.</div>
            </div>
          </div>

          <div className="panel">
            <div className="panel__title">Quality</div>
            <div className="panel__body">
              <div className="kv">
                <div className="kv__k">Stream</div>
                <div className="kv__v">Mock HD</div>
              </div>
              <div className="kv">
                <div className="kv__k">Latency</div>
                <div className="kv__v">Low</div>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
