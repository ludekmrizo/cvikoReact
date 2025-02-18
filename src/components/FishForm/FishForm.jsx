import { useState } from "react";
import "./FishForm.css";

function FishForm({ data, onAdd }) {
  const [newFish, setNewFish] = useState({
    id: data.length > 0 ? Math.max(...data.map((fish) => fish.id)) + 1 : 1,
    name: "",
    size: "",
  });

  const [valid, setValid] = useState(false);

  const validateData = (fish) => {
    setValid(fish.name.trim().length > 0 && fish.size.trim().length > 0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFish = { ...newFish, [name]: value };
    setNewFish(updatedFish);
    validateData(updatedFish);
  };

  const resetNewFish = () => {
    const temp = {
      id: newFish.id + 1,
      name: "",
      size: "",
    };
    setNewFish(temp);
    validateData(temp);
  };

  return (
    <div className="fish-form">
      <p>Přidat rybu</p>
      <input type="text" placeholder="Jméno ryby" name="name" onChange={handleChange} value={newFish.name} className="form-control mb-2" />
      <div className="form-check">
        <input type="radio" name="size" value="velká" id="size-big" onChange={handleChange} className="form-check-input" checked={newFish.size === "velká"} />
        <label htmlFor="size-big" className="form-check-label">
          Velká
        </label>
      </div>
      <div className="form-check">
        <input type="radio" name="size" value="malá" id="size-small" onChange={handleChange} className="form-check-input" checked={newFish.size === "malá"} />
        <label htmlFor="size-small" className="form-check-label">
          Malá
        </label>
      </div>
      <button
        disabled={!valid}
        className="btn btn-primary mt-3"
        onClick={() => {
          onAdd(newFish);
          resetNewFish();
        }}
      >
        Přidat
      </button>
    </div>
  );
}

export default FishForm;
