import { useMemo } from 'react';
import DeckGL from '@deck.gl/react';
import { ScatterplotLayer } from '@deck.gl/layers';
import Map from 'react-map-gl';
import { usePropagation } from '../../hooks/usePropagation';
import 'maplibre-gl/dist/maplibre-gl.css';

const INITIAL_VIEW_STATE = {
  longitude: -40,
  latitude: 0,
  zoom: 1.5,
  pitch: 0,
  bearing: 0,
  maxZoom: 5,
  minZoom: 1,
};

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json';

export default function PropagationMap({ genre, year, onHover }) {
  const { data, loading } = usePropagation(genre, year);

  const points = useMemo(() => {
    if (!data?.countries) return [];
    
    return data.countries.map((country) => ({
      name: country.country_code,
      latitude: country.lat,
      longitude: country.lon,
      year: country.first_year || year,
      genre: data.genre,
      color: [231, 76, 60],
    }));
  }, [data, genre, year]);

  const layers = [
  new ScatterplotLayer({
    id: 'music-points',
    data: points,
    pickable: true,
    opacity: 0.8,
    radiusUnits: 'meters',
    radiusScale: 1,
    radiusMinPixels: 3,
    radiusMaxPixels: 30,
    getPosition: d => [d.longitude, d.latitude],
    getFillColor: d => d.color,
    getRadius: 100000,
    onHover: (info) => onHover?.(info),
  }),
];

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {loading && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 10,
          color: 'white',
        }}>
          Carregando dados...
        </div>
      )}
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
        getCursor={() => 'grab'}
      >
        <Map
          mapStyle={MAP_STYLE}
          style={{ width: '100%', height: '100%' }}
          attributionControl={false}
        />
      </DeckGL>
    </div>
  );
}