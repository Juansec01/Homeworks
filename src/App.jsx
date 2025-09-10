import React, { useContext } from "react";
import { ImageContext, ImageProvider } from "./ImageContext";
import { useFilter } from "./useFilter";
import AddImageForm from "./AddImageForm";
import SearchBar from "./SearchBar";
import ImageList from "./ImageList";
import "./App.css";

const AppContent = () => {
  const { images } = useContext(ImageContext);
  const { search, setSearch, filterImages } = useFilter();

  const filteredImages = filterImages(images);

  return (
    <div className="app">
      <h1>📷 Image Gallery</h1>
      <AddImageForm />
      <SearchBar search={search} setSearch={setSearch} />
      <ImageList images={filteredImages} />
    </div>
  );
};

function App() {
  return (
    <ImageProvider>
      <AppContent />
    </ImageProvider>
  );
}

export default App;
