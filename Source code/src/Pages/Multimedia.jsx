import React, { useState } from "react";

export default function Multimedia({ multimedia, userType }) {
  const [filter, setFilter] = useState("all");
  const [openTranscript, setOpenTranscript] = useState(null);

  const categories = Array.from(
    new Set((multimedia || []).map((m) => m.category))
  );

  const filtered = (multimedia || []).filter((m) => {
    const categoryMatch = filter === "all" ? true : m.category === filter;
    const typeMatch =
      !userType || !m.userTypes ? true : m.userTypes.includes(userType);
    return categoryMatch && typeMatch;
  });

  // Improved media type detection
  const videos = filtered.filter((m) => {
    // Check for video file extensions
    if (m.embed.match(/\.(mp4|webm|ogg|mov|avi|wmv)$/i)) return true;

    // Check for video hosting platforms
    if (m.embed.match(/(youtube|youtu\.be|vimeo|dailymotion|wistia)/i)) return true;

    return false;
  });

  const audios = filtered.filter((m) =>
    m.embed.match(/\.(mp3|wav|ogg|m4a)$/i)
  );

  // Function to decide preload behavior based on media type
  function getPreloadSetting(m) {
    if (m.embed.match(/\.(mp4|webm|ogg|mov|avi|wmv)$/i)) {
      return "auto"; // Preload entire video for smooth playback
    } else if (m.embed.match(/\.(mp3|wav|ogg|m4a)$/i)) {
      return "metadata"; // Preload metadata for audio
    }
    return "none"; // Default for other types (like iframe embeds)
  }

  // Function to generate proper embed code for different video types
  function renderVideoEmbed(m) {
    // Handle YouTube URLs
    if (m.embed.includes("youtube.com") || m.embed.includes("youtu.be")) {
      // Extract YouTube ID from various URL formats
      let videoId = null;

      // Standard YouTube URL: https://www.youtube.com/watch?v=VIDEO_ID
      const standardMatch = m.embed.match(/[?&]v=([^&]+)/);
      if (standardMatch) videoId = standardMatch[1];

      // Short YouTube URL: https://youtu.be/VIDEO_ID
      const shortMatch = m.embed.match(/youtu\.be\/([^?&]+)/);
      if (shortMatch) videoId = shortMatch[1];

      // Embed URL: https://www.youtube.com/embed/VIDEO_ID
      const embedMatch = m.embed.match(/embed\/([^?&]+)/);
      if (embedMatch) videoId = embedMatch[1];

      if (videoId) {
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;
        return (
          <div className="ratio ratio-16x9">
            <iframe
              src={embedUrl}
              title={m.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        );
      }
    }

    // Handle Vimeo URLs
    if (m.embed.includes("vimeo.com")) {
      const vimeoMatch = m.embed.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/);
      if (vimeoMatch) {
        const videoId = vimeoMatch[1];
        return (
          <div className="ratio ratio-16x9">
            <iframe
              src={`https://player.vimeo.com/video/${videoId}`}
              title={m.title}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        );
      }
    }

    // Handle direct video file links
    if (m.embed.match(/\.(mp4|webm|ogg|mov|avi|wmv)$/i)) {
      return (
        <div className="ratio ratio-16x9">
          <video
            src={m.embed}
            controls
            width="100%"
            height="100%"
            preload={getPreloadSetting(m)}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }

    // Default iframe for other embed URLs
    return (
      <div className="ratio ratio-16x9">
        <iframe
          src={m.embed}
          title={m.title}
          allowFullScreen
        ></iframe>
      </div>
    );
  }

  function toggleTranscript(id) {
    setOpenTranscript(openTranscript === id ? null : id);
  }

  const renderCard = (m) => (
    <div className="col-md-4" key={m.id}>
      <div className="card h-100 shadow-sm p-3 multimedia-card">
        <h5 className="d-flex justify-content-between align-items-center">
          {m.title}
          <span className="badge bg-secondary text-capitalize">
            {m.category}
          </span>
        </h5>

        <div className="mb-2">
          {m.embed.match(/\.(mp4|webm|ogg|mov|avi|wmv|youtube|youtu\.be|vimeo)/i)
            ? renderVideoEmbed(m)
            : m.embed.match(/\.(mp3|wav|ogg|m4a)$/i) ? (
              <div>
                <audio
                  src={m.embed}
                  controls
                  preload={getPreloadSetting(m)}
                  style={{ width: "100%" }}
                >
                  Your browser does not support the audio element.
                </audio>
              </div>
            ) : (
              <div className="ratio ratio-16x9">
                <iframe
                  src={m.embed}
                  title={m.title}
                  allowFullScreen
                ></iframe>
              </div>
            )}
        </div>

        <p className="small text-muted">{m.description}</p>

        {m.transcript && (
          <div>
            <button
              className="btn btn-link btn-sm p-0"
              onClick={() => toggleTranscript(m.id)}
            >
              {openTranscript === m.id ? "Hide Transcript" : "Show Transcript"}
            </button>
            {openTranscript === m.id && (
              <div className="mt-2 p-2 bg-light border rounded small">
                {m.transcript}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section>
      {/* ===== Header + Filter ===== */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-2">
        <h3 className="mb-0">Multimedia Guidance</h3>
        <select
          className="form-select form-select-sm w-auto"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Video Section */}
      {videos.length > 0 && (
        <>
          <h5 className="mb-3 text-primary d-flex align-items-center">
            <i className="bi bi-play-circle-fill me-2"></i>Video Guidance
          </h5>
          <div className="row gy-3 mb-4">{videos.map(renderCard)}</div>
        </>
      )}

      {/* Audio Section */}
      {audios.length > 0 && (
        <>
          <h5 className="mb-3 text-success d-flex align-items-center">
            <i className="bi bi-headphones me-2"></i>Audio Guidance
          </h5>
          <div className="row gy-3">{audios.map(renderCard)}</div>
        </>
      )}

      {/* Other embedded content */}
      {filtered.length > 0 && videos.length === 0 && audios.length === 0 && (
        <>
          <h5 className="mb-3 text-info d-flex align-items-center">
            <i className="bi bi-file-earmark-text me-2"></i>Embedded Content
          </h5>
          <div className="row gy-3">{filtered.map(renderCard)}</div>
        </>
      )}

      {/* No multimedia available */}
      {filtered.length === 0 && (
        <p className="text-muted fst-italic">No multimedia available.</p>
      )}

      <style>{`
        .multimedia-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .multimedia-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
      `}</style>
    </section>
  );
}