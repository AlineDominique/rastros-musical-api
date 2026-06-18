import { useState, useCallback } from 'react';
import GenreDropdown from './components/Filters/GenreDropdown';
import YearSlider from './components/Filters/YearSlider';
import PropagationMap from './components/Map/PropagationMap';
import MapTooltip from './components/Tooltip/MapTooltip';

function App() {
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState(2000);
  const [hoverInfo, setHoverInfo] = useState(null);

  const handleHover = useCallback((info) => {
    setHoverInfo(info);
  }, []);

  return (
    <div>
      <header style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', padding: '1rem', textAlign: 'center', color: 'white' }}>
        <h1>🎵 Rastros Musical</h1>
        <p>Propagação de Gêneros Musicais: América Latina ↔ Ásia</p>
      </header>

      <div style={{ display: 'flex', gap: '2rem', padding: '1rem', background: '#16213e', alignItems: 'center' }}>
        <GenreDropdown onSelect={setGenre} selectedGenre={genre} />
        <YearSlider onYearChange={setYear} year={year} />
      </div>

      <div style={{ flex: 1, position: 'relative', height: 'calc(100vh - 140px)' }}>
        <PropagationMap genre={genre} year={year} onHover={handleHover} />
        <MapTooltip hoverInfo={hoverInfo} />
      </div>
    </div>
  );
}

export default App;