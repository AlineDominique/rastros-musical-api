export default function MapTooltip({ hoverInfo }) {
  if (!hoverInfo?.object) return null;

  const { x, y, object } = hoverInfo;

  return (
    <div style={{
      position: 'absolute',
      left: x,
      top: y,
      transform: 'translate(-50%, -120%)',
      background: 'rgba(22, 33, 62, 0.95)',
      color: '#e0e0e0',
      padding: '0.5rem 0.8rem',
      borderRadius: '6px',
      fontSize: '0.85rem',
      pointerEvents: 'none',
      zIndex: 100,
      whiteSpace: 'nowrap',
      border: '1px solid #667eea',
    }}>
      <strong>{object.name}</strong><br />
      Gênero: {object.genre}<br />
      Ano: {object.year}
    </div>
  );
}