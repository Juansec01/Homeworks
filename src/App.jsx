import React, { useState } from 'react';
import CategoryInput from './Chld';
import './App.css';

const ComponentApp = () => {
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  const addCategory = () => {
    if (category.trim() !== '') {
      setCategories([...categories, category.trim()]);
      setCategory(''); // Clear input field
    }
  };

  return (
    <div className="app">
      <h1>Category Manager</h1>
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