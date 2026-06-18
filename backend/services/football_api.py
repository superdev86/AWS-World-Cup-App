import httpx
import os
from dotenv import load_dotenv
from config import WORLD_CUP_LEAGUE_ID, WORLD_CUP_SEASON
load_dotenv()

API_KEY = os.getenv("FOOTBALL_API_KEY")
BASE_URL = "https://v3.football.api-sports.io"

headers = {
    "x-apisports-key": API_KEY
}

async def get_live_matches():
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{BASE_URL}/fixtures",
            headers=headers,
            params = {
                "live": "all",
                "league": WORLD_CUP_LEAGUE_ID,
                "season": WORLD_CUP_SEASON,
            }
        )

    data = response.json()

    matches = []

    for item in data.get("response", []):
        matches.append({
            "id": item["fixture"]["id"],
            "homeTeam": item["teams"]["home"]["name"],
            "awayTeam": item["teams"]["away"]["name"],
            "homeScore": item["goals"]["home"],
            "awayScore": item["goals"]["away"],
            "status": item["fixture"]["status"]["short"],
            "minute": item["fixture"]["status"].get("elapsed")
        })

    return {"matches": matches}

async def get_standings():
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{BASE_URL}/standings",
            headers=headers,
            params={"league": WORLD_CUP_LEAGUE_ID, "season": WORLD_CUP_SEASON}  # adjust later for World Cup
        )

    data = response.json()

    standings = []

    for league in data.get("response", []):
        for group in league.get("league", {}).get("standings", []):
            group_table = []

            for team in group:
                group_table.append({
                    "rank": team["rank"],
                    "team": team["team"]["name"],
                    "played": team["all"]["played"],
                    "win": team["all"]["win"],
                    "draw": team["all"]["draw"],
                    "lose": team["all"]["lose"],
                    "points": team["points"],
                    "goalsDiff": team["goalsDiff"]
                })

            standings.append(group_table)

    return {"groups": standings}
