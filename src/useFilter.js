import { useState } from "react";

export const useFilter = () => {
  const [search, setSearch] = useState("");

  const filterImages = (images) => {
    return images.filter((img) =>
      img.title.toLowerCase().includes(search.toLowerCase())
    );
  };

  return { search, setSearch, filterImages };
};
