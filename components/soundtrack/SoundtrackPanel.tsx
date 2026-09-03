"use client";

import { useRef, useState } from "react";
import { designPlaylist, designPlaylistUrl } from "@/lib/data";

function formatIndex(index: number, total: number) {
  return `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
}

export default function SoundtrackPanel() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const track = designPlaylist[trackIndex] ?? designPlaylist[0];
  const total = designPlaylist.length;
  const hasAudio = Boolean(track?.url);

  const playTrackAt = (nextIndex: number, autoplay: boolean) => {
    const next = designPlaylist[(nextIndex + total) % total];
    setTrackIndex((nextIndex + total) % total);
    setProgress(0);
    if (autoplay && next?.url && audioRef.current) {
      audioRef.current.src = next.url;
      void audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      setIsPlaying(false);
      audioRef.current?.pause();
    }
  };

  const openAlbum = () => {
    window.open(designPlaylistUrl, "_blank", "noopener,noreferrer");
  };

  const handlePlay = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!hasAudio) {
      openAlbum();
      return;
    }
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      void audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  return (
    <div
      className="reel-frame soundtrack-frame"
      role="group"
      aria-label="Design playlist player"
      style={track?.cover ? { backgroundImage: `url('${track.cover}')`, cursor: "pointer" } : { cursor: "pointer" }}
      onClick={openAlbum}
    >
      <span>{hasAudio ? `NOW PLAYING — ${formatIndex(trackIndex, total)}` : "CURATED FOR DESIGN SESSIONS"}</span>

      {total > 1 && (
        <span className="soundtrack-nav" aria-label="Change track" onClick={(event) => event.stopPropagation()}>
          <button type="button" onClick={(event) => { event.stopPropagation(); playTrackAt(trackIndex - 1, isPlaying); }} aria-label="Previous track">PREV</button>
          <i aria-hidden="true">/</i>
          <button type="button" onClick={(event) => { event.stopPropagation(); playTrackAt(trackIndex + 1, isPlaying); }} aria-label="Next track">NEXT</button>
        </span>
      )}

      <b aria-hidden="true" />

      {hasAudio && track && (
        <p className="soundtrack-track" aria-live="polite">
          {track.title} — {track.artist}
        </p>
      )}

      <em aria-hidden="true" style={{ color: "#333333", fontWeight: 700 }}>0.1 flaws<br />and all.</em>

      <button
        type="button"
        className="soundtrack-play"
        onClick={handlePlay}
        aria-label={hasAudio ? (isPlaying ? `Pause ${track?.title}` : `Play ${track?.title}`) : "Open 0.1 flaws and all album"}
        aria-pressed={hasAudio ? isPlaying : undefined}
      >
        <img className="reel-play-icon soundtrack-play-icon" src="/icons/play.png" alt="" loading="lazy" decoding="async" />
      </button>

      {hasAudio && (
        <span className="soundtrack-progress" aria-hidden="true">
          <i style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }} />
        </span>
      )}

      <audio
        ref={audioRef}
        src={track?.url || undefined}
        preload="metadata"
        onTimeUpdate={(event) => {
          const audio = event.currentTarget;
          if (audio.duration) setProgress(audio.currentTime / audio.duration);
        }}
        onEnded={() => playTrackAt(trackIndex + 1, true)}
      />
    </div>
  );
}
