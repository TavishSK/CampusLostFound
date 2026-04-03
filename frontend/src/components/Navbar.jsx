import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "16px 40px",

      background: "rgba(15,14,12,0.6)",
      backdropFilter: "blur(12px)",

      borderBottom: "1px solid #2e2b24",
      position: "sticky",
      top: 0,
      zIndex: 1000
    }}>

      {/* LOGO */}
      <div style={{
        color: "#e8c97a",
        fontStyle: "italic",
        fontWeight: "bold",
        fontSize: "18px"
      }}>
        ◈ CampusFind
      </div>

      {/* NAV */}
      <div style={{ display: "flex", gap: "18px" }}>
        <NavBtn to="/" label="Home" />
        <NavBtn to="/browse" label="Browse" />
        <NavBtn to="/post" label="Post" />
      </div>

      {/* RIGHT */}
      <div style={{ color: "#e8c97a", opacity: 0.8 }}>
        Made by Tavish SK
      </div>

    </div>
  );
}

/* NAV BUTTON WITH UNDERLINE + GLOW */

function NavBtn({ to, label }) {
  const location = useLocation();
  const active = location.pathname === to;

  const [hover, setHover] = useState(false);

  return (
    <Link
      to={to}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        padding: "6px 4px",
        textDecoration: "none",
        fontSize: "15px",
        fontWeight: "500",
        color: active || hover ? "#e8c97a" : "#b5a87a",
        transition: "all 0.25s ease"
      }}
    >

      {/* TEXT */}
      {label}

      {/* UNDERLINE */}
      <span style={{
        position: "absolute",
        left: 0,
        bottom: "-4px",
        height: "2px",
        width: active || hover ? "100%" : "0%",
        background: "#e8c97a",
        transition: "width 0.3s ease"
      }} />

      {/* GLOW */}
      {(hover || active) && (
        <span style={{
          position: "absolute",
          inset: "-6px",
          borderRadius: "8px",
          background: "rgba(232,201,122,0.08)",
          filter: "blur(8px)",
          zIndex: -1
        }} />
      )}

    </Link>
  );
}

export default Navbar;