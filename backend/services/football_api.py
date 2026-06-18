import httpx
import os
from dotenv import load_dotenv

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
            params={"live": "all"}
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