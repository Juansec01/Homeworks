import React from "react";
import ImageCard from "./ImageCard";
import "./ImageList.css";

const ImageList = ({ images }) => {
  return (
    <div className="image-list">
      {images.length > 0 ? (
        images.map((img) => <ImageCard key={img.id} image={img} />)
      ) : (
        <p>No images yet. Try adding one!</p>
      )}
    </div>
  );
};

export default ImageList;
