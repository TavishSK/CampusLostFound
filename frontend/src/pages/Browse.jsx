import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Browse() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    fetch("http://localhost:5001/api/items")
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  const filtered = items.filter(item => {
    const matchesType =
      filter === "all" || item.type === filter;

    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "all" || item.category === category;

    return matchesType && matchesSearch && matchesCategory;
  });

  return (
    <div style={{ padding: "40px", color: "white" }}>
      
      {/* HEADER */}
      <h1 style={{ marginBottom: "20px" }}>
        Browse Items ({filtered.length})
      </h1>

      {/* FILTER BAR */}
      <div style={{ marginBottom: "20px" }}>
        
        {/* TYPE FILTER */}
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("lost")}>Lost</button>
        <button onClick={() => setFilter("found")}>Found</button>

        {/* SEARCH */}
        <input
          style={{ marginLeft: "10px" }}
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* CATEGORY */}
        <select
          style={{ marginLeft: "10px" }}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option>Electronics</option>
          <option>Clothing & Accessories</option>
          <option>Books & Stationery</option>
          <option>ID Cards & Documents</option>
          <option>Keys</option>
          <option>Bags & Wallets</option>
          <option>Jewelry</option>
          <option>Sports Equipment</option>
          <option>Other</option>
        </select>

      </div>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px"
        }}
      >
        {filtered.length === 0 && (
          <p>No items found 😢</p>
        )}

        {filtered.map((item, i) => (
          <Link
            to={`/item/${item._id}`}
            key={i}
            style={{
              textDecoration: "none",
              color: "white",
              background: "#1c1a16",
              padding: "20px",
              borderRadius: "10px",
              border: "1px solid #2e2b24"
            }}
          >
            <p
              style={{
                color:
                  item.type === "lost"
                    ? "#e06b6b"
                    : "#6bb88e",
                fontSize: "12px"
              }}
            >
              {item.type.toUpperCase()}
            </p>

            <h3>{item.title}</h3>

            <p>{item.category}</p>
            <p>📍 {item.location}</p>
          </Link>
        ))}
      </div>

    </div>
  );
}

export default Browse;