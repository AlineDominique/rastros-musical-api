"""Genre definitions for the MVP — LatAm and Asia.

Derived from GENRE_ORIGINS so the processing scope and the curated origin
data can never drift apart — every genre in scope is guaranteed to have an
origin entry, and vice versa.
"""

from app.ingestion.genre_origins import GENRE_ORIGINS

LATAM_GENRES = [
    name for name, origin in GENRE_ORIGINS.items() if origin["region"] == "Latam"
]

ASIA_GENRES = [
    name for name, origin in GENRE_ORIGINS.items() if origin["region"] == "Asia"
]

ALL_GENRES = LATAM_GENRES + ASIA_GENRES
