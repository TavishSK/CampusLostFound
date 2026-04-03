import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ItemDetail() {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5001/api/items")
      .then(res => res.json())
      .then(data => {
        const found = data.find(i => i._id === id);
        setItem(found);
      });
  }, [id]);

  const findMatches = async () => {
    setLoading(true);

    const res = await fetch("http://localhost:5001/api/items");
    const data = await res.json();

    const results = data
      .filter(i => i._id !== item._id)
      .map(i => {
        const categoryScore = i.category === item.category ? 100 : 0;
        const locationScore = i.location === item.location ? 100 : 0;

        const textScore =
          i.title.toLowerCase().includes(item.title.toLowerCase()) ||
          item.title.toLowerCase().includes(i.title.toLowerCase())
            ? 100
            : 0;

        const score =
          categoryScore * 0.4 +
          locationScore * 0.3 +
          textScore * 0.3;

        return {
          item: i,
          score: Math.round(score),
          breakdown: {
            category: categoryScore,
            location: locationScore,
            text: textScore
          }
        };
      })
      .filter(m => m.score > 0)
      .sort((a, b) => b.score - a.score);

    setMatches(results);
    setLoading(false);
  };

  if (!item) return <p style={{ color: "white" }}>Loading...</p>;

  return (
    <div style={{
      padding: "40px",
      background: "#0f0e0c",
      color: "white"
    }}>

      <h1>{item.title}</h1>

      <p style={{
        color: item.type === "lost" ? "#e06b6b" : "#6bb88e"
      }}>
        {item.type.toUpperCase()}
      </p>

      <p>{item.category}</p>
      <p>📍 {item.location}</p>

      <button onClick={findMatches} style={{
        marginTop: "20px",
        background: "#e8c97a",
        padding: "10px 20px",
        border: "none",
        borderRadius: "8px"
      }}>
        <button onClick={findMatches} style={{
  marginTop: "20px",
  background: "#e8c97a",
  padding: "10px 20px",
  border: "none",
  borderRadius: "8px"
}}>
  {loading ? "Scanning..." : "Find Matches"}
</button>
      </button>

      {loading && <p>Scanning...</p>}

      <div style={{
        marginTop: "40px",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px"
      }}>
        {matches.map((m, i) => {
          let color = "#888";
          if (m.score >= 70) color = "#6bb88e";
          else if (m.score >= 45) color = "#e8c97a";

          return (
            <div key={i} style={{
              background: "#1c1a16",
              padding: "20px",
              borderRadius: "10px",
              border: "1px solid #2e2b24",
              boxShadow: `0 0 10px ${color}33`
            }}>
              <h3>{m.item.title}</h3>

              <p style={{ color }}>{m.score}%</p>

              <div style={{ height: "6px", background: "#2e2b24" }}>
                <div style={{
                  width: `${m.score}%`,
                  height: "100%",
                  background: color
                }} />
              </div>

              <p>{m.item.category}</p>
              <p>📍 {m.item.location}</p>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default ItemDetail;