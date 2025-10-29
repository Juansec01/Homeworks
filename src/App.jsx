import React, { useState, useEffect, useRef } from "react";
import Tree from "react-d3-tree";
import BinaryTree from "./BinaryTree";

function App() {
  const [tree, setTree] = useState(new BinaryTree());
  const [d3Data, setD3Data] = useState(null);
  const treeContainer = useRef(null);

  useEffect(() => {
    const newTree = new BinaryTree();
    const numbers = [8, 3, 10, 1, 6, 14, 4, 7, 13];
    numbers.forEach((n) => newTree.insert(n));

    console.log("Inorder:", newTree.inorder());
    console.log("Preorder:", newTree.preorder());
    console.log("Postorder:", newTree.postorder());
    console.log("Contains 7?", newTree.contains(7));
    console.log("Contains 20?", newTree.contains(20));

    setTree(newTree);
    setD3Data(newTree.toD3Format());
  }, []);

  const containerStyles = {
    width: "100vw",
    height: "100vh",
  };

  return (
    <div style={containerStyles} ref={treeContainer}>
      {d3Data && (
        <Tree
          data={d3Data}
          orientation="vertical"
          translate={{ x: 400, y: 100 }}
          pathFunc="diagonal"
        />
      )}
    </div>
  );
}

export default App;
