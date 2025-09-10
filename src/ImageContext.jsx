import React, { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [images, setImages] = useState([]);

  const addImage = (id, title) => {
    const newImage = {
      id: parseInt(id),
      title,
      url: `https://picsum.photos/id/${id}/200/300`,
    };
    setImages((prev) => [...prev, newImage]);
  };

  return (
    <ImageContext.Provider value={{ images, addImage }}>
      {children}
    </ImageContext.Provider>
  );
};
