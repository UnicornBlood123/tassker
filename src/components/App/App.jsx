import React, { useRef, useState } from "react";
import styles from "./App.module.scss";
import Menu from "../Menu/Menu";
import Canvas from "../Canvas/Canvas";
import FileManager from "../FileManager/FileManager";

const images = [
  {
    id: 0,
    path: "/img/pngegg (0).png",
    img: function () {
      const img = new Image();
      img.src = this.path;
      return img;
    },
  },
  {
    id: 1,
    path: "/img/pngegg (1).png",
    img: function () {
      const img = new Image();
      img.src = this.path;
      return img;
    },
  },
  {
    id: 2,
    path: "/img/pngegg (2).png",
    img: function () {
      const img = new Image();
      img.src = this.path;
      return img;
    },
  },
  {
    id: 3,
    path: "/img/pngegg (3).png",
    img: function () {
      const img = new Image();
      img.src = this.path;
      return img;
    },
  },
  {
    id: 4,
    path: "/img/pngegg (4).png",
    img: function () {
      const img = new Image();
      img.src = this.path;
      return img;
    },
  },
  {
    id: 5,
    path: "/img/pngegg (5).png",
    img: function () {
      const img = new Image();
      img.src = this.path;
      return img;
    },
  },
];

const App = () => {
  const canvasRef = useRef(null);
  const [items, setItems] = useState([]);
  const [loadFileItems, setLoadFileItems] = useState(null);

  const clearCanvas = () => {
    const context = canvasRef.current.getContext("2d");
    context.clearRect(0, 0, 600, 400);
    setItems([]);
  };

  return (
    <div className={styles.wrapper}>
      <Menu canvasRef={canvasRef} images={images} />
      <Canvas
        items={items}
        setItems={setItems}
        canvasRef={canvasRef}
        images={images}
        loadFileItems={loadFileItems}
      />
      <FileManager
        setLoadFileItems={setLoadFileItems}
        items={items}
        clearCanvas={clearCanvas}
      />
    </div>
  );
};

export default App;
