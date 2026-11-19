import React, { useEffect, useState } from "react";
import '../css/header.css'
export default function Header({ type, locationLabel, visitorCount, username }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="site-header p-3 d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center gap-3">
      <img src="./images/logor.png" alt="" className="logo "/>
        <div>
          <div className="animated-heading">Career Passport</div>
          <small className="text-white-50">Your Guide to the Future</small>
        </div>
      </div>

      <div className="d-flex align-items-center gap-3 ">
        {(username || type) && (
          <span style={{ color: "white" }}>
            Welcome {username ? username : type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        )}

        {visitorCount}
        <div id="clock" style={{ minWidth: 100 }}>{time}</div>
        <div style={{ fontSize: 12 }}>{locationLabel ? `Loc: ${locationLabel}` : ""}</div>
      </div>
    </header>
  );
}
