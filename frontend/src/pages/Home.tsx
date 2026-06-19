import { Link } from "react-router-dom";

const cardStyle: React.CSSProperties = {
  background: "white",
  borderRadius: "10px",
  padding: "20px",
  textDecoration: "none",
  color: "inherit",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
  flex: "1",
  minWidth: "280px",
  transition: "transform 0.2s ease",
};

export default function Home() {
  return (
    <div>
      <h1>Welcome</h1>

      <p
        style={{
          fontSize: "1.1rem",
          color: "#555",
          maxWidth: "600px",
        }}
      >
        Browse recent matches and tournament standings from one place.
      </p>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "32px",
        }}
      >
        <Link to="/recent" style={cardStyle}>
          <h2 style={{ marginTop: 0 }}>🔴 Recent Matches</h2>
          <p style={{ marginBottom: 0 }}>
            Browse the latest completed matches from the tournament.
          </p>
        </Link>

        <Link to="/standings" style={cardStyle}>
          <h2 style={{ marginTop: 0 }}>📊 Standings</h2>
          <p style={{ marginBottom: 0 }}>
            Explore the latest tournament tables and team rankings.
          </p>
        </Link>
      </div>
    </div>
  );
}