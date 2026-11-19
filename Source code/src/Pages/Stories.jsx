import React, { useState } from 'react';

export default function Stories({ stories }) {
  const [filter, setFilter] = useState('all');

  // Extract unique domains
  const domainList = Array.from(new Set((stories || []).map(s => s.domain)));

  const list = (stories || []).filter(s => filter === 'all' ? true : s.domain === filter);

  return (
    <section>
      <h3>Success Stories</h3>
      <div className="mb-2">
        <select
          className="form-select form-select-sm w-auto"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          {domainList.map((domain) => (
            <option key={domain} value={domain}>
              {domain.charAt(0).toUpperCase() + domain.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="row gy-3">
        {list.map((s) => (
          <div className="col-md-6" key={s.id}>
            <div className="card p-3">
              <div className="d-flex gap-3">
                <div className="row">
                  <div className="col-md-6"></div>
                <div>
                  <h5>{s.name}</h5>
                  <div className="badge p-3 mb-3 bg-secondary">{s.domain}</div>
                  <p className="small">{s.story}</p>
                </div>
                </div>
                <div className="col-md-6">
                <div
                  style={{
                    width: 300,
                    height: 300,
                    background: '#eee',
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  {s.photo ? (
                    <img
                      src={s.photo.startsWith('/') ? `${import.meta.env.BASE_URL}${s.photo.slice(1)}` : s.photo}
                      alt={s.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <i className="bi bi-person-fill text-secondary fs-1"></i>
                  )}
                  
                </div>
                
                </div>
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
