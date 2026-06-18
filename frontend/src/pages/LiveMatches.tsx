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
      console.error("Error fetching matches", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();

    // auto-refresh every 30 seconds
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
        matches.map((m) => (
          <div key={m.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
            <h3>
              {m.homeTeam} {m.homeScore} - {m.awayScore} {m.awayTeam}
            </h3>
            <p>Status: {m.status} {m.minute ? `(${m.minute}')` : ""}</p>
          </div>
        ))
      )}
    </div>
  );
}