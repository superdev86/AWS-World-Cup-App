import { Link, useLocation } from "react-router-dom";

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const linkStyle = (path: string) => ({
    color: "white",
    textDecoration: "none",
    padding: "8px 12px",
    borderRadius: 6,
    background: location.pathname === path ? "#2563eb" : "transparent",
  });

  return (
    <div style={{ fontFamily: "Arial", minHeight: "100vh", background: "#f5f5f5" }}>
      {/* NAVBAR */}
      <header
        style={{
          background: "#111827",
          padding: "12px 20px",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2 style={{ margin: 0, fontSize: 18 }}>⚽ World Cup Tracker</h2>

        <nav style={{ display: "flex", gap: 8 }}>
          <Link to="/" style={linkStyle("/")}>
            Home
          </Link>

          <Link to="/live" style={linkStyle("/live")}>
            Live Matches
          </Link>

          <Link to="/standings" style={linkStyle("/standings")}>
            Standings
          </Link>
        </nav>
      </header>

      {/* PAGE CONTENT */}
      <main style={{ padding: 20 }}>{children}</main>
    </div>
  );
}