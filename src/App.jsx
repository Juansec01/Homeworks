import React, { useState, useCallback } from 'react';
import CategoryInput from './Chld';
import './App.css';

// Componente para mostrar el número con botón de incremento
const NumberDisplay = React.memo(({ number, onIncrement }) => {
  return (
    <div className="number-section">
      <h2>Current Number: <span className="numero">{number}</span></h2>
      <button onClick={onIncrement} className="increment-button">
        Increment Number
      </button>
    </div>
  );
});

const ComponentApp = () => {
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]); 
  const [number, setNumber] = useState(0);

  // Función memoizada para agregar categorías 
  const addCategory = useCallback(() => {
    if (category.trim() !== '') {
      setCategories(prevCategories => [...prevCategories, category.trim()]);
      setCategory(''); // Clear input field
    }
  }, [category]);

  // Función memoizada para incrementar el número
  const incrementNumber = useCallback(() => {
    setNumber(prevNumber => prevNumber + 1);
  }, []);

  return (
    <div className="app">
      <h1>Category Manager</h1>
      
      <NumberDisplay number={number} onIncrement={incrementNumber} />
      
      <CategoryInput
        category={category}
        setCategory={setCategory}
        addCategory={addCategory}
      />
      
      <div className="categories-list">
        <h2>Current Categories</h2>
        {categories.length === 0 ? (
          <p>No categories added yet</p>
        ) : (
          <ul>
            {categories.map((cat, index) => (
              <li key={index} className="category-item">
                {cat}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ComponentApp;