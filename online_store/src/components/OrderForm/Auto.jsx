/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import styles from './order-form.module.scss';
// import { toAuto, MODES } from './Map';

function PlacesAutocomplete({ isLoaded, onSelect }) {
  const {
    ready,
    value,
    init,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    initOnMount: false,
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const input = document.querySelectorAll('.ant-input')[3];

  const handleInput = (e) => {
    setValue(e.target.value);
    console.log(e.target.value);
    input.value = e.target.value;
  };

  const handleSelect = ({ description }) => () => {
    setValue(description, false);
    clearSuggestions();
    console.log(description);
    // input.value = description;

    getGeocode({ address: description }).then((results) => {
      const { lat, lng } = getLatLng(results[0]);
      console.log('📍 Coordinates: ', { lat, lng });
      onSelect({ lat, lng });
    });
  };

  const renderSuggestions = () => data.map((suggestion) => {
    const {
      place_id,
      structured_formatting: { main_text, secondary_text },
    } = suggestion;

    return (
      <li
        key={place_id}
        onClick={handleSelect(suggestion)}
        onKeyDown={handleSelect(suggestion)}
      >
        <strong>{main_text}</strong>
        <small>{secondary_text}</small>
      </li>
    );
  });

  useEffect(() => {
    if (isLoaded) {
      init();
    }
  }, [isLoaded, init]);

  return (
    <div ref={ref}>
      <input
        value={value}
        disabled={!ready}
        className={styles.inputs}
        onChange={handleInput}
        placeholder="Введите адрес или сделайте отметку на карте"
      />
      {status === 'OK' && <ul>{renderSuggestions()}</ul>}
    </div>
  );
}

export default PlacesAutocomplete;
