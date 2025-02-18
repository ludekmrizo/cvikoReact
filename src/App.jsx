import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import rawData from './fishData.json';
import FishList from './components/FishList/FishList';
import FishForm from './components/FishForm/FishForm';
import AquariumForm from './components/AquariumForm/AquariumForm';

function App() {
  const [listOfFish, setListOfFish] = useState(rawData.fish);
  const [activeTab, setActiveTab] = useState(1);

  const handleDelete = (id) => {
    setListOfFish((prevFish) => prevFish.filter((fish) => fish.id !== id));
  };

  const handleAdd = (newFish) => {
    setListOfFish((prevFish) => {
      const newId =
        prevFish.length > 0
          ? Math.max(...prevFish.map((fish) => fish.id)) + 1
          : 1;
      return [...prevFish, { ...newFish, id: newId }];
    });
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="box">
        {}
        <div className="row sticky-top bg-white w-100 d-flex justify-content-center py-2">
          <div className="col-auto">
            <button
              className={`btn btn-outline-secondary btn-lg me-2 ${
                activeTab === 1 ? 'active' : ''
              }`}
              onClick={() => setActiveTab(1)}
            >
              Rybičky
            </button>
            <button
              className={`btn btn-outline-secondary btn-lg ${
                activeTab === 2 ? 'active' : ''
              }`}
              onClick={() => setActiveTab(2)}
            >
              Akvárium
            </button>
          </div>
        </div>
        {}
        <div className="content">
          {activeTab === 1 && (
            <>
              <FishList data={listOfFish} onDelete={handleDelete} />
              <hr />
              <FishForm data={listOfFish} onAdd={handleAdd} />
            </>
          )}
          {activeTab === 2 && (
            <div className="container">
              <AquariumForm fishList={listOfFish} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
