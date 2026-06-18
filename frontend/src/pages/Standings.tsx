import { useEffect, useState } from "react";
import { api } from "../services/api";

type Team = {
  rank: number;
  team: string;
  played: number;
  win: number;
  draw: number;
  lose: number;
  points: number;
  goalsDiff: number;
};

export default function Standings() {
  const [groups, setGroups] = useState<Team[][]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStandings = async () => {
    try {
      const res = await api.get("/standings");
      setGroups(res.data.groups);
    } catch (err) {
      console.error("Error loading standings", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStandings();
  }, []);

  if (loading) return <p>Loading standings...</p>;

  return (
    <div>
      <h1>Standings</h1>

      {groups.map((group, i) => (
        <div key={i} style={{ marginBottom: 30 }}>
          <h2>Group {String.fromCharCode(65 + i)}</h2>

          <table border={1} cellPadding={8}>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Team</th>
                <th>P</th>
                <th>W</th>
                <th>D</th>
                <th>L</th>
                <th>Pts</th>
                <th>GD</th>
              </tr>
            </thead>

            <tbody>
              {group.map((team) => (
                <tr key={team.team}>
                  <td>{team.rank}</td>
                  <td>{team.team}</td>
                  <td>{team.played}</td>
                  <td>{team.win}</td>
                  <td>{team.draw}</td>
                  <td>{team.lose}</td>
                  <td>{team.points}</td>
                  <td>{team.goalsDiff}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}