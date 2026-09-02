"""Fixtures for integration tests."""

from unittest.mock import patch

import pytest

from app.db.database import db_manager
from app.db.setup import load_all, setup_all
from app.ingestion.ingestion_runner import run_ingestion


@pytest.fixture(autouse=True)
def prepare_database(tmp_path, monkeypatch):
    """Prepare a throwaway database with schemas, seed, and essential data.

    Points the shared db_manager at a per-test file under tmp_path, so the
    versioned database in data/ is never touched. Every module imports the
    same db_manager instance, so overriding db_path here redirects the whole
    pipeline and the API.
    """
    monkeypatch.setattr(db_manager, "db_path", str(tmp_path / "rastros_musical.db"))

    setup_all()
    run_ingestion()

    with patch("app.ingestion.trends_integration.GoogleTrendsClient"):
        with patch(
            "app.ingestion.silver_loader.build_propagation_data", return_value=[]
        ):
            load_all()  # Silver + Gold sem Google Trends

    yield
