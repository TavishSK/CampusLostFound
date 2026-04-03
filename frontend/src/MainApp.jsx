import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function MainApp() {
  const [items, setItems] = useState([]);
  const [matches, setMatches] = useState([]);

  const fetchItems = async () => {
    const res = await fetch("http://localhost:5001/api/items");
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // 👉 FUNCTION TO ADD ITEM + GET MATCHES
  const addItem = async () => {
    const res = await fetch("http://localhost:5001/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type: "lost",
        title: "Test Item",
        category: "General",
        location: "Library"
      })
    });

    const data = await res.json();

    setMatches(data.matches || []);
    fetchItems();
  };

  return (
    <div style={{ padding: "40px" }}>

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          marginTop: "40px",
          padding: "60px",
          border: "1px solid var(--border)",
          background: "var(--card)",
          borderRadius: "16px"
        }}
      >
        <p style={{ color: "var(--gold)" }}>Smart Campus Lost & Found</p>

        <h1 style={{ fontSize: "48px" }}>Lost something?</h1>

        <h2 style={{ color: "var(--gold)", fontStyle: "italic" }}>
          We'll help you find it.
        </h2>

        <button
          onClick={addItem}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            background: "var(--gold)",
            border: "none",
            borderRadius: "8px"
          }}
        >
          Test Match 🔥
        </button>
      </motion.div>

      {/* ITEMS */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginTop: "50px" }}
      >
        <h2 style={{ marginBottom: "20px" }}>Recent Reports</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px"
          }}
        >
          {items.map((item, i) => {
            const isMatch = matches.some(m => m.item._id === item._id);

            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="card"
                style={{
                  borderTop: `3px solid ${
                    isMatch
                      ? "var(--purple)"
                      : item.type === "lost"
                      ? "var(--red)"
                      : "var(--green)"
                  }`
                }}
              >
                <p
                  style={{
                    color:
                      item.type === "lost"
                        ? "var(--red)"
                        : "var(--green)",
                    fontSize: "12px",
                    marginBottom: "10px"
                  }}
                >
                  {item.type.toUpperCase()}
                </p>

                <h3>{item.title}</h3>

                <p style={{ opacity: 0.7 }}>{item.category}</p>

                <p style={{ marginTop: "10px" }}>
                  📍 {item.location}
                </p>

                {/* 🔥 MATCH DISPLAY */}
                {isMatch && (
                  <p style={{ color: "var(--purple)", marginTop: "10px" }}>
                    🔥 Match Found
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

    </div>
  );
}

export default MainApp;