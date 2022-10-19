import React from "react";
import styles from "./Menu.module.scss";

const Menu = ({ canvasRef, images }) => {
  const addImage = (event, id) => {
    const context = canvasRef.current.getContext("2d");
    const img = new Image();
    img.src = images[id].path;
    const x = event.clientX - canvasRef.current.offsetLeft - 20;
    const y = event.clientY - canvasRef.current.offsetTop - 20;
    if (x && y) {
      context.drawImage(img, x, y, 40, 40);
    }
  };

  const dragStartHandler = (event, id) => {
    event.dataTransfer.setData("id", id);
  };

  const dragEndHandler = (event, id) => {
    addImage(event, id);
  };

  return (
    <div className={styles.wrapper}>
      {images.map((image) => (
        <img
          onDragStart={(e) => {
            dragStartHandler(e, image.id);
          }}
          onDragEnd={(e) => {
            dragEndHandler(e, image.id);
          }}
          draggable={true}
          key={image.id}
          src={image.path}
          alt={"mebel"}
        />
      ))}
    </div>
  );
};

export default Menu;
