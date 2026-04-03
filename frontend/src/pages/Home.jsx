import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [stats, setStats] = useState({
    lost: 0,
    found: 0,
    matches: 0,
    resolved: 0
  });

  useEffect(() => {
    fetch("http://localhost:5001/api/items")
      .then(res => res.json())
      .then(data => {
        setItems(data.slice(-6).reverse());

        const lost = data.filter(i => i.type === "lost").length;
        const found = data.filter(i => i.type === "found").length;

        setStats({
          lost,
          found,
          matches: Math.floor((lost + found) * 0.6),
          resolved: Math.floor((lost + found) * 0.3)
        });
      });
  }, []);

  return (
    <div style={{
      background: "#0f0e0c",
      color: "white",
      minHeight: "100vh",
      padding: "40px"
    }}>

      {/* HERO */}
      <div className="fade-up" style={{
        border: "1px solid #2e2b24",
        background: "#1c1a16",
        padding: "40px",
        borderRadius: "16px",
        marginBottom: "40px"
      }}>

        <p style={{ color: "#e8c97a" }}>
          Smart Campus Lost & Found
        </p>

        <h1 style={{ fontSize: "48px" }}>
          Lost something?
        </h1>

        <h2 style={{
          fontStyle: "italic",
          color: "#e8c97a"
        }}>
          We’ll help you find it.
        </h2>

        <p style={{ marginTop: "10px", color: "#aaa" }}>
          AI-powered similarity matching connects lost items with found reports.
        </p>

        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <button onClick={() => navigate("/post")} style={{
            background: "#e8c97a",
            padding: "12px 20px",
            borderRadius: "8px",
            border: "none"
          }}>
            Report an Item
          </button>

          <button onClick={() => navigate("/browse")} style={{
            border: "1px solid #2e2b24",
            padding: "12px 20px",
            borderRadius: "8px",
            background: "transparent",
            color: "white"
          }}>
            Browse Items
          </button>
        </div>

      </div>

      {/* STATS */}
      <div className="fade-up" style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
        marginBottom: "40px"
      }}>
        <StatCard label="Lost" value={stats.lost} color="#e06b6b" />
        <StatCard label="Found" value={stats.found} color="#6bb88e" />
        <StatCard label="Matches" value={stats.matches} color="#7b8fe8" />
        <StatCard label="Resolved" value={stats.resolved} color="#e8c97a" />
      </div>

      {/* HOW */}
      <div className="fade-up" style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
        marginBottom: "40px"
      }}>
        <StepCard title="Report Item" />
        <StepCard title="AI Matching" />
        <StepCard title="Review Matches" />
        <StepCard title="Resolve" />
      </div>

      {/* RECENT */}
      <div className="fade-up">
        <h2 style={{ marginBottom: "20px" }}>Recent Reports</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px"
        }}>
          {items.map(item => (
            <div
              key={item._id}
              onClick={() => navigate(`/item/${item._id}`)}
              style={{
                background: "#1c1a16",
                border: `1px solid ${
                  item.type === "lost" ? "#e06b6b" : "#6bb88e"
                }`,
                padding: "20px",
                borderRadius: "12px",
                cursor: "pointer"
              }}
            >
              <p style={{
                color: item.type === "lost" ? "#e06b6b" : "#6bb88e"
              }}>
                {item.type.toUpperCase()}
              </p>

              <h3>{item.title}</h3>
              <p>{item.category}</p>
              <p>📍 {item.location}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div style={{
      background: "#1c1a16",
      padding: "20px",
      borderRadius: "12px",
      border: "1px solid #2e2b24"
    }}>
      <h2 style={{ color }}>{value}</h2>
      <p>{label}</p>
    </div>
  );
}

function StepCard({ title }) {
  return (
    <div style={{
      background: "#1c1a16",
      padding: "20px",
      borderRadius: "12px",
      border: "1px solid #2e2b24"
    }}>
      <p>{title}</p>
    </div>
  );
}

export default Home;