import React from "react";
import "../css/home.css";
import Swal from 'sweetalert2';

export default function Home({
  data,
  navigateTo,
  bookmarks,
  toggleBookmark,
  exportBookmarks,
  recent,
}) {
  return (
    <section className="home-container">

      {/* Hero Section */}
      <div className="hero-section text-center d-flex flex-column align-items-center justify-content-center">
        <h1 className="hero-title">Your Guide to the Future</h1>
        <p className="hero-subtitle">
          Explore careers, take quizzes, watch videos and plan your future.
        </p>
      </div>

      <div className="row mt-4 px-3">
        <div className="col-md-8">
          {/* Quick Actions */}
          <h5 className="section-title">Quick Actions</h5>
          <div className="d-flex gap-3 flex-wrap mb-4">
            <button
              className="btn btn-action"
              style={{ backgroundColor: 'rgb(9, 38, 53)', color: 'white' }}
              onClick={() => navigateTo("career", "Career Bank")}
            >
              Open Career Bank
            </button>
            <button
              className="btn btn-action"
              style={{ backgroundColor: 'rgb(9, 38, 53)', color: 'white' }}
              onClick={() => navigateTo("quiz", "Interest Quiz")}
            >
              Take Quiz
            </button>
            <button
              className="btn btn-action"
              style={{ backgroundColor: 'rgb(9, 38, 53)', color: 'white' }}
              onClick={() => navigateTo("multimedia", "Multimedia")}
            >
              Watch Videos
            </button>
            <button
              className="btn btn-action"
              style={{ backgroundColor: 'rgb(9, 38, 53)', color: 'white' }}
              onClick={() => navigateTo("resources", "Resources")}
            >
              Open Resources
            </button>
          </div>

          {/* Sample Careers */}
          <h5 className="section-title">Sample Careers</h5>
          <div className="row gy-3">
            {data.careers.slice(0, 3).map((c) => (
              <div className="col-md-4" key={c.id}>
                <div className="career-card card h-100 p-3">
                  <h6>
                    {c.title}{" "}
                    <span className="badge bg-secondary badge-domain">
                      {c.industry}
                    </span>
                  </h6>
                  <p className="small">{c.description}</p>
                  <div className="d-flex justify-content-between mt-auto">
                    <button
                      className="btn btn-outline-light btn-sm"
                      style={{ backgroundColor: 'rgb(9, 38, 53)', color: 'white', borderColor: 'rgb(9, 38, 53)' }}
                      onClick={() =>
                        Swal.fire({
                          title: `${c.title}`,
                          text: `${c.description}\nSkills: ${c.skills.join(", ")}`,
                          icon: 'info',
                          confirmButtonText: 'Close'
                        })
                      }
                    >
                      View
                    </button>
                    <button
                      className="btn btn-primary btn-sm"
                      style={{ backgroundColor: 'rgb(9, 38, 53)', color: 'white', borderColor: 'rgb(9, 38, 53)' }}
                      onClick={() => {
                        Swal.fire({
                          title: 'Add personal note',
                          input: 'text',
                          inputLabel: 'Personal Note (Optional)',
                          inputPlaceholder: 'Type your note here...',
                          showCancelButton: true,
                          confirmButtonText: 'Save',
                          cancelButtonText: 'Cancel'
                        }).then((result) => {
                          if (result.isConfirmed) {
                            toggleBookmark({
                              id: c.id,
                              title: c.title,
                              type: "career",
                              note: result.value || "",
                            });
                          }
                        });
                      }}
                    >
                      Bookmark
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="col-md-4">
          <h5 className="section-title">Bookmarks</h5>
          <ul className="list-group mb-3">
            {bookmarks.length ? (
              bookmarks.map((b) => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-start"
                  key={b.id + b.type}
                >
                  <div>
                    <strong>{b.title}</strong>
                    <div className="small text-muted">{b.note || ""}</div>
                  </div>
                  <div>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => {
                        Swal.fire({
                          title: 'Are you sure?',
                          text: "Do you want to remove this bookmark?",
                          icon: 'warning',
                          showCancelButton: true,
                          confirmButtonText: 'Yes, remove it!',
                          cancelButtonText: 'Cancel'
                        }).then((result) => {
                          if (result.isConfirmed) {
                            toggleBookmark({
                              id: b.id,
                              title: b.title,
                              type: b.type,
                            });
                          }
                        });
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="list-group-item small">No bookmarks yet</li>
            )}
          </ul>
          <div className="d-grid gap-2">
            <button
              className="btn btn-outline-secondary btn-sm"
              style={{ backgroundColor: 'rgb(9, 38, 53)', color: 'white', borderColor: 'rgb(9, 38, 53)' }}
              onClick={exportBookmarks}
            >
              Export Bookmarks
            </button>
            <button
              className="btn btn-outline-primary btn-sm"
              style={{ backgroundColor: 'rgb(9, 38, 53)', color: 'white', borderColor: 'rgb(9, 38, 53)' }}
              onClick={() => {
                const body = bookmarks
                  .map((b) => `${b.title} - ${b.note || ""}`)
                  .join("\n");
                const mailto = `mailto:?subject=My recommendations&body=${encodeURIComponent(body)}`;
                window.open(mailto, "_blank");
              }}
            >
              Share via Email
            </button>
          </div>

          <h6 className="mt-3 section-title">Recently Viewed</h6>
          <div>
            {recent.length ? (
              recent.map((r, i) => (
                <span key={i} className="badge bg-light text-dark border me-1">
                  {r}
                </span>
              ))
            ) : (
              <div className="small text-muted">No recent items</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
