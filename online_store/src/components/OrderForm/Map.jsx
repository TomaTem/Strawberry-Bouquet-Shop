/* eslint-disable react/prop-types */
import React, { useCallback } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

export const MODES = {
  MOVE: 0,
  SET_MARKER: 1,
};

export const toAuto = [];

export function Map({
  center, mode, markers, onMarkerAdd,
}) {
  const onClick = useCallback((loc) => {
    if (mode === MODES.SET_MARKER) {
      const lat = loc.latLng.lat();
      const lng = loc.latLng.lng();
      onMarkerAdd({ lat, lng });
      toAuto.push({ lat, lng });
    }
  }, [mode]);

  return (
    <GoogleMap
      zoom={10}
      center={center}
      onClick={onClick}
      mapContainerStyle={containerStyle}
    >
      <Marker position={center} toAuto={toAuto} />
      {markers.map((pos) => <Marker position={pos} key={Math.random()} />)}
    </GoogleMap>
  );
}

// export default Map;
