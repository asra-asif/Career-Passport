import React from 'react';

export default function Resources({ resources }) {
  // Group resources by type
  const groups = {};
  (resources || []).forEach(r => { 
    groups[r.type] = groups[r.type] || []; 
    groups[r.type].push(r); 
  });

  return (
    <section>
      <h3>Resource Library</h3>
      <div className="container">
        {Object.keys(groups).length === 0 && <p className="small text-muted">No resources available</p>}

        {Object.entries(groups).map(([type, items]) => (
          <div className="mb-4" key={type}>
            <h5>{type}</h5>
            <div className="row">
              {items.map(it => (
                <div className="col-md-4" key={it.id}>
                  <div className="card mb-3">
                    <div className="card-body">
                      <h5 className="card-title">{it.title}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">{it.type}</h6>
                      <p className="card-text">{it.desc}</p>
                      <a 
                        href={it.link} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="btn btn-primary">
                        Access Resource
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
