import { useState, useEffect } from 'react';
import { getGenres } from '../../api/client';

export default function GenreDropdown({ onSelect, selectedGenre }) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    getGenres()
      .then(data => setGenres(data.genres || data))
      .catch(err => console.error('Erro ao carregar gêneros:', err));
  }, []);

  return (
    <div>
      <label htmlFor="genre-select">Gênero:</label>
      <select
        id="genre-select"
        value={selectedGenre}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">-- Selecione --</option>
        {genres.map((genre, i) => (
          <option key={i} value={genre}>{genre}</option>
        ))}
      </select>
    </div>
  );
}