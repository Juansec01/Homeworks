import React from 'react';
import './App.css';

const CategoryInput = ({ category, setCategory, addCategory }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && category.trim()) {
      addCategory();
    }
  };

  return (
    <div className="input-section">
      <h2>Add New Category</h2>
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Enter a category"
        className="category-input"
      />
      <button 
        onClick={addCategory} 
        className="add-button"
        disabled={!category.trim()}
      >
        Add Category
      </button>
    </div>
  );
};

export default CategoryInput;