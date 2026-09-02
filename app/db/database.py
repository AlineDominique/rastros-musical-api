"""Database module for DuckDB connection management and persistence."""

import os
from collections.abc import Generator
from contextlib import contextmanager

import duckdb

DEFAULT_DATABASE_PATH = "data/rastros_musical.db"
DATABASE_PATH = os.getenv("DATABASE_PATH", DEFAULT_DATABASE_PATH)


class DuckDBManager:
    """Manages DuckDB connections and persistence."""

    def __init__(self, db_path: str | None = None) -> None:
        """Initializes the manager and ensures the data directory exists.

        Args:
            db_path (str | None): Path to the .db file. When omitted, falls back
                to the DATABASE_PATH environment variable, then to
                DEFAULT_DATABASE_PATH.
        """
        self.db_path = db_path or DATABASE_PATH
        directory = os.path.dirname(self.db_path)
        if directory:
            os.makedirs(directory, exist_ok=True)

    @contextmanager
    def get_connection(self) -> Generator[duckdb.DuckDBPyConnection]:
        """Creates a thread-safe connection to DuckDB.

        Yields:
            duckdb.DuckDBPyConnection: An active DuckDB connection.
        """
        conn = duckdb.connect(self.db_path)
        try:
            yield conn
        finally:
            conn.close()


db_manager = DuckDBManager()
