import React, { useState, useEffect } from 'react';
import './AquariumForm.css';

function AquariumForm({ fishList }) {
  const [dimensions, setDimensions] = useState({
    width: '',
    length: '',
    height: '',
  });
  const [aquariumVolume, setAquariumVolume] = useState(0);
  const [requiredVolume, setRequiredVolume] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState('');

  // Počet jednotlivych ryb
  const bigFishCount = fishList.reduce(
    (acc, fish) =>
      fish.size && fish.size.toLowerCase() === 'velká' ? acc + 1 : acc,
    0
  );
  const smallFishCount = fishList.reduce(
    (acc, fish) =>
      fish.size && fish.size.toLowerCase() === 'malá' ? acc + 1 : acc,
    0
  );

  // Vypočet objemu pro daný počet ryb
  useEffect(() => {
    const required = fishList.reduce((acc, fish) => {
      const fishSize = fish.size ? fish.size.toLowerCase() : '';
      if (fishSize === 'velká') return acc + 20;
      if (fishSize === 'malá') return acc + 10;
      return acc;
    }, 0);
    setRequiredVolume(required);
  }, [fishList]);

  // Vypočet objemu akvaria
  useEffect(() => {
    const { width, length, height } = dimensions;
    const w = parseFloat(width);
    const l = parseFloat(length);
    const h = parseFloat(height);
    if (!isNaN(w) && !isNaN(l) && !isNaN(h)) {
      setAquariumVolume((w * l * h) / 1000);
    } else {
      setAquariumVolume(0);
    }
  }, [dimensions]);

  // Ověření objemu, zda je OK
  useEffect(() => {
    setIsValid(aquariumVolume >= requiredVolume && aquariumVolume > 0);
  }, [aquariumVolume, requiredVolume]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDimensions({
      ...dimensions,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      setMessage('Rozměry akvária byly schváleny!');
    } else {
      setMessage('');
    }
  };

  return (
    <div className="aquarium-form mt-4">
      <h4>Rozměry akvária</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="width" className="form-label">
            Šířka (cm)
          </label>
          <input
            type="number"
            step="0.1"
            className="form-control"
            id="width"
            name="width"
            value={dimensions.width}
            onChange={handleChange}
            placeholder="Zadejte šířku"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="length" className="form-label">
            Délka (cm)
          </label>
          <input
            type="number"
            step="0.1"
            className="form-control"
            id="length"
            name="length"
            value={dimensions.length}
            onChange={handleChange}
            placeholder="Zadejte délku"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="height" className="form-label">
            Výška (cm)
          </label>
          <input
            type="number"
            step="0.1"
            className="form-control"
            id="height"
            name="height"
            value={dimensions.height}
            onChange={handleChange}
            placeholder="Zadejte výšku"
          />
        </div>
        <p>
          Objem akvária: {aquariumVolume.toFixed(2)} l | Požadovaný objem:{' '}
          {requiredVolume.toFixed(2)} l
        </p>
        <p>
          Velká ryba potřebuje 20l vody a malá 10l <br /> Vybráno ryb:{' '}
          {bigFishCount} velké, {smallFishCount} malé
        </p>
        <button
          type="submit"
          className={`btn ${isValid ? 'btn-success' : 'btn-danger'}`}
          disabled={!isValid}
        >
          Schválit rozměry akvária
        </button>
        <p className="mt-3 text-success">{message}</p>
      </form>
    </div>
  );
}

export default AquariumForm;
