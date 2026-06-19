import { useEffect, useState } from "react";
import { api } from "../services/api";

type Match = {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: string;
  date: string;
};

export default function RecentMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await api.get("/matches/recent");
        setMatches(res.data.matches);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) return <p>Loading recent matches...</p>;

  return (
    <div>
      <h1>Recent Matches</h1>

      {matches.length === 0 ? (
        <p>No recent matches found.</p>
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
                  {m.homeTeam}
                  <span style={{ margin: "0 8px" }}>
                    {m.homeScore} - {m.awayScore}
                  </span>
                  {m.awayTeam}
                </div>

                <div style={{ fontSize: 12, opacity: 0.7 }}>
                  {new Date(m.date).toLocaleDateString()} • {m.status}
                </div>
              </div>

              {/* Status badge */}
              <div
                style={{
                  padding: "4px 10px",
                  borderRadius: 20,
                  fontSize: 12,
                  background: "#6b7280",
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