import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [matches, setMatches] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  const [form, setForm] = useState({
    type: "lost",
    title: "",
    category: "",
    location: ""
  });

  const fetchItems = async () => {
    const res = await fetch("http://localhost:5001/api/items");
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5001/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    setMatches(data.matches || []);

    setForm({
      type: "lost",
      title: "",
      category: "",
      location: ""
    });

    fetchItems();
  };

  // 🔍 Filter logic
  const filteredItems = items.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());

    const matchesType =
      filterType === "all" || item.type === filterType;

    return matchesSearch && matchesType;
  });

  return (
    <div style={{ fontFamily: "Arial", padding: "20px", background: "#f5f7fa" }}>
      <h1 style={{ textAlign: "center" }}>🎒 Campus Lost & Found</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>

        <input name="title" placeholder="Item title" value={form.title} onChange={handleChange} />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />

        <button type="submit">Add Item</button>
      </form>

      {/* SEARCH + FILTER */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All</option>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>
      </div>

      {/* MATCHES */}
      {matches.length > 0 && (
        <div style={{ background: "#d4edda", padding: "10px", marginBottom: "20px" }}>
          <h3>🔍 Matches Found</h3>
          {matches.map((m, index) => (
            <p key={index}>
              {m.item.title} ({m.item.type}) - Score: {m.score}
            </p>
          ))}
        </div>
      )}

      {/* ITEMS */}
      {filteredItems.map((item, index) => (
        <div
          key={index}
          style={{
            background: "white",
            margin: "10px 0",
            padding: "10px",
            borderRadius: "8px"
          }}
        >
          <h3>{item.title}</h3>
          <p>Type: {item.type}</p>
          <p>Location: {item.location}</p>
          <p>Category: {item.category}</p>
        </div>
      ))}
    </div>
  );
}

export default App;