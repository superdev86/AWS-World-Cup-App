from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from services.football_api import get_recent_matches, get_standings

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "ok"}

@app.get("/matches/recent")
async def recent_matches():
    return await get_recent_matches()

@app.get("/standings")
async def standings():
    return await get_standings()
