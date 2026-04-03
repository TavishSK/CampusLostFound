import { useState } from "react";
import toast from "react-hot-toast";

function Post() {
  const [type, setType] = useState("lost");

  const [form, setForm] = useState({
    title: "",
    category: "Electronics",
    description: "",
    color: "",
    brand: "",
    location: "Main Library",
    date: new Date().toISOString().split("T")[0],
    email: "",
    phone: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5001/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, type })
    });

    const data = await res.json();

    toast.success(`Item posted! Matches: ${data.matches?.length || 0}`);
  };

  return (
    <div style={{
      background: "#0f0e0c",
      color: "white",
      minHeight: "100vh",
      padding: "40px"
    }}>

      <h1 style={{
        fontSize: "40px",
        marginBottom: "30px"
      }}>
        Post an Item
      </h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: "30px"
      }}>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          style={{
            background: "#1c1a16",
            padding: "30px",
            borderRadius: "16px",
            border: "1px solid #2e2b24"
          }}
        >

          {/* TYPE TOGGLE */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <button
              type="button"
              onClick={() => setType("lost")}
              style={{
                flex: 1,
                padding: "10px",
                background: type === "lost" ? "#e06b6b" : "#2e2b24",
                border: "none",
                borderRadius: "8px",
                color: "white",
                cursor: "pointer"
              }}
            >
              ✕ I Lost Something
            </button>

            <button
              type="button"
              onClick={() => setType("found")}
              style={{
                flex: 1,
                padding: "10px",
                background: type === "found" ? "#6bb88e" : "#2e2b24",
                border: "none",
                borderRadius: "8px",
                color: "white",
                cursor: "pointer"
              }}
            >
              ✓ I Found Something
            </button>
          </div>

          {/* INPUT GRID */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "15px"
          }}>

            <input name="title" placeholder="Title" onChange={handleChange} style={inputStyle} />

            <select name="category" onChange={handleChange} style={inputStyle}>
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

            <textarea
              name="description"
              placeholder="Description"
              onChange={handleChange}
              style={{ ...inputStyle, gridColumn: "span 2", height: "80px" }}
            />

            <input name="color" placeholder="Color" onChange={handleChange} style={inputStyle} />
            <input name="brand" placeholder="Brand" onChange={handleChange} style={inputStyle} />

            <select name="location" onChange={handleChange} style={inputStyle}>
              <option>Main Library</option>
              <option>Science Block</option>
              <option>Engineering Block</option>
              <option>Arts Block</option>
              <option>Central Canteen</option>
              <option>Sports Ground</option>
              <option>Hostel Block A</option>
              <option>Hostel Block B</option>
              <option>Admin Building</option>
              <option>Parking Lot</option>
              <option>Seminar Hall</option>
              <option>Computer Lab</option>
              <option>Other</option>
            </select>

            <input type="date" name="date" onChange={handleChange} style={inputStyle} />

            <input name="email" placeholder="Contact Email" onChange={handleChange} style={inputStyle} />
            <input name="phone" placeholder="Contact Phone" onChange={handleChange} style={inputStyle} />

          </div>

          <button
            type="submit"
            style={{
              marginTop: "20px",
              width: "100%",
              padding: "14px",
              background: "#e8c97a",
              border: "none",
              borderRadius: "10px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            {type === "lost" ? "Report Lost Item" : "Report Found Item"}
          </button>

        </form>

        {/* SIDEBAR */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

          <div style={cardStyle}>
            <h3>How matching works</h3>
            <ul>
              <li>Category similarity</li>
              <li>Text similarity</li>
              <li>Location match</li>
              <li>Color & brand</li>
              <li>Date proximity</li>
            </ul>
          </div>

          <div style={cardStyle}>
            <h3>Tips</h3>
            <ul>
              <li>Be specific</li>
              <li>Add color & brand</li>
              <li>Use correct location</li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
}

/* STYLES */

const inputStyle = {
  padding: "10px",
  background: "#0f0e0c",
  border: "1px solid #2e2b24",
  borderRadius: "8px",
  color: "white"
};

const cardStyle = {
  background: "#1c1a16",
  padding: "20px",
  borderRadius: "12px",
  border: "1px solid #2e2b24"
};

export default Post;