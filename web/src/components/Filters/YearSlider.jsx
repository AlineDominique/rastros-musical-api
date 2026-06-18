export default function YearSlider({ onYearChange, year }) {
  return (
    <div>
      <label htmlFor="year-slider">Ano: <strong>{year}</strong></label>
      <input
        type="range"
        id="year-slider"
        min={1970}
        max={2026}
        value={year}
        onChange={(e) => onYearChange(parseInt(e.target.value))}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem' }}>
        <span>1970</span>
        <span>2026</span>
      </div>
    </div>
  );
}