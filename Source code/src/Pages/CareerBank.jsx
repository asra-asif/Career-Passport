import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function CareerBank({ careers, toggleBookmark, bookmarks }) {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("alpha");
  const [query, setQuery] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    let arr = [...(careers || [])];
    if (filter !== "all") arr = arr.filter((c) => c.industry === filter);
    if (query.trim()) {
      const q = query.toLowerCase();
      arr = arr.filter(
        (c) => (c.title + " " + c.description).toLowerCase().includes(q)
      );
    }
    if (sort === "alpha") arr.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "salary-asc")
      arr.sort((a, b) => (a.salary_min || 0) - (b.salary_min || 0));
    if (sort === "salary-desc")
      arr.sort((a, b) => (b.salary_min || 0) - (a.salary_min || 0));
    setList(arr);
  }, [filter, sort, query, careers]);

  const industries = Array.from(new Set((careers || []).map((c) => c.industry)))
    .filter(Boolean);

  function viewCareer(c) {
    Swal.fire({
      title: c.title,
      html: `
        <p><strong>Description:</strong> ${c.description}</p>
        <p><strong>Skills:</strong> ${c.skills.join(", ")}</p>
        <p><strong>Education:</strong> ${c.education}</p>
        <p><strong>Salary:</strong> ${c.salary_min ? `$${c.salary_min} - $${c.salary_max}` : 'N/A'}</p>
      `,
      confirmButtonText: 'Close',
    });
  }

  return (
    <section>
      {/* ===== Filters Section ===== */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 gap-2">
        <h3 className="mb-0 text-center text-md-start">Career Bank</h3>
        <div className="d-flex flex-wrap gap-2 justify-content-center">
          <select
            className="form-select form-select-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Industries</option>
            {industries.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
          <select
            className="form-select form-select-sm"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="alpha">Sort A-Z</option>
            <option value="salary-asc">Salary Low → High</option>
            <option value="salary-desc">Salary High → Low</option>
          </select>
          <input
            className="form-control form-control-sm"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* ===== Career Cards ===== */}
      <div className="row gy-3">
        {list.map((c) => (
          <div className="col-12 col-sm-6 col-lg-4" key={c.id}>
            <div className="card h-100 shadow-sm p-3">
              <div className="d-flex flex-column flex-sm-row">
                <div
                  style={{
                    width: 64,
                    height: 64,
                    background: "#eee",
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    marginBottom: "0.5rem",
                  }}
                >
                  <i className="bi bi-briefcase text-secondary"></i>
                </div>
                <div className="ms-sm-3 flex-grow-1">
                  <h5 className="mb-1">
                    {c.title}{" "}
                    <span className="badge bg-secondary badge-domain">
                      {c.industry}
                    </span>
                  </h5>
                  <p className="small mb-1">{c.description}</p>
                  <p className="small mb-0 text-muted">
                    <strong>Skills:</strong> {c.skills.join(", ")}
                  </p>
                  <p className="small text-muted mb-0">
                    Education: {c.education} • Salary:{" "}
                    {c.salary_min ? `$${c.salary_min} - $${c.salary_max}` : "N/A"}
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-3 d-flex flex-wrap justify-content-end gap-2">
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => viewCareer(c)}
                >
                  View
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    Swal.fire({
                      title: 'Personal note (optional)',
                      input: 'textarea',
                      inputPlaceholder: 'Enter your note here...',
                      showCancelButton: true,
                      confirmButtonText: 'Save Note',
                      cancelButtonText: 'Cancel',
                      inputValidator: (value) => {
                        if (!value) {
                          return 'You need to write something!';
                        }
                      },
                    }).then((result) => {
                      if (result.isConfirmed) {
                        const note = result.value || ""; 
                        toggleBookmark({
                          id: c.id,
                          title: c.title,
                          type: "career",
                          note,
                        });
                      }
                    });
                  }}
                >
                  {bookmarks.find(
                    (b) => b.id === c.id && b.type === "career"
                  )
                    ? "Remove Bookmark"
                    : "Bookmark"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
