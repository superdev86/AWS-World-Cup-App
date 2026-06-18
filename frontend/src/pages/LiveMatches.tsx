import { useEffect, useState } from "react";
import { api } from "../services/api";

type Match = {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: string;
  minute?: number;
};

export default function LiveMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMatches = async () => {
    try {
      const res = await api.get("/matches/live");
      setMatches(res.data.matches);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
    const interval = setInterval(fetchMatches, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p>Loading live matches...</p>;

  return (
    <div>
      <h1>Live Matches</h1>

      {matches.length === 0 ? (
        <p>No live matches right now.</p>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {matches.map((m) => (
            <div
              key={m.id}
              style={{
                background: "white",
                borderRadius: 10,
                padding: 16,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* Teams + Score */}
              <div>
                <div style={{ fontWeight: "bold", fontSize: 16 }}>
                  {m.homeTeam} <span style={{ margin: "0 8px" }}>
                    {m.homeScore} - {m.awayScore}
                  </span> {m.awayTeam}
                </div>

                <div style={{ fontSize: 12, opacity: 0.7 }}>
                  {m.status} {m.minute ? `• ${m.minute}'` : ""}
                </div>
              </div>

              {/* Status badge */}
              <div
                style={{
                  padding: "4px 10px",
                  borderRadius: 20,
                  fontSize: 12,
                  background:
                    m.status === "LIVE"
                      ? "#22c55e"
                      : m.status === "HT"
                      ? "#f59e0b"
                      : "#6b7280",
                  color: "white",
                }}
              >
                {m.status}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}