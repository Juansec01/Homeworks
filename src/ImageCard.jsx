import React from "react";
import "./ImageCard.css";

const ImageCard = ({ image }) => {
  return (
    <div className="image-card">
      <h3>{image.title}</h3>
      <img src={image.url} alt={image.title} />
    </div>
  );
};

export default ImageCard;
