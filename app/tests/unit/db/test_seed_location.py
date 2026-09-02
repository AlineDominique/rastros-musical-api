"""Tests for seed_location."""

from unittest.mock import MagicMock, patch

from app.db.seed_location import main, seed_location


def test_seed_location_populates_table(conn):
    """Should populate silver.location with country data."""
    conn.execute("""
        CREATE TABLE silver.location (
            country_code VARCHAR(2) PRIMARY KEY,
            country_name VARCHAR,
            region VARCHAR(5),
            latitude DOUBLE,
            longitude DOUBLE
        )
    """)

    seed_location(conn)

    count = conn.execute("SELECT COUNT(*) FROM silver.location").fetchone()[0]
    assert count == 32

    brazil = conn.execute(
        "SELECT * FROM silver.location WHERE country_code = 'BR'"
    ).fetchone()
    assert brazil[0] == "BR"
    assert brazil[1] == "Brazil"
    assert brazil[2] == "Latam"
    assert brazil[3] == -10.0
    assert brazil[4] == -55.0


def test_main_seeds_using_db_manager():
    """Should open a connection and seed it (entry point for `make DB_SEED`)."""
    with (
        patch("app.db.seed_location.db_manager") as mock_db,
        patch("app.db.seed_location.seed_location") as mock_seed,
    ):
        mock_conn = MagicMock()
        mock_db.get_connection.return_value.__enter__.return_value = mock_conn

        main()

        mock_seed.assert_called_once_with(mock_conn)
