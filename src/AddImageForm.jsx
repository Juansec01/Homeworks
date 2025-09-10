import React, { useState, useContext } from "react";
import { ImageContext } from "./ImageContext";
import "./AddImageForm.css";

const AddImageForm = () => {
  const { addImage } = useContext(ImageContext);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id || !title) return;
    addImage(id, title);
    setId("");
    setTitle("");
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Image ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Image Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">➕ Add Image</button>
    </form>
  );
};

export default AddImageForm;
