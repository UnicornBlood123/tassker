import React, { useEffect } from "react";
import styles from "./Canvas.module.scss";

const Canvas = ({ canvasRef, images, loadFileItems, items, setItems }) => {
  let selectedItem = null;
  const size = 20;
  let x = 0;
  let y = 0;

  useEffect(() => {
    draw();
  }, [items]);

  useEffect(() => {
    if (loadFileItems) {
      setItems(loadFileItems);
    }
  }, [loadFileItems]);

  const drawFirst = () => {
    const context = canvasRef.current.getContext("2d");
    context.clearRect(0, 0, 600, 400);
    items.forEach((item) => {
      images[item.id].img().onload = function () {
        context.drawImage(images[item.id].img(), item.x, item.y, 40, 40);
      };
    });
  };

  const draw = () => {
    const context = canvasRef.current.getContext("2d");
    context.clearRect(0, 0, 600, 400);
    items.forEach((item) => {
      context.drawImage(images[item.id].img(), item.x, item.y, 40, 40);
    });
  };

  const mousedownlistener = (event) => {
    x = event.clientX - canvasRef.current.offsetLeft - size;
    y = event.clientY - canvasRef.current.offsetTop - size;
    items.forEach((item) => {
      if (
        x >= item.x - size &&
        x <= item.x + size &&
        y >= item.y - size &&
        y <= item.y + size
      ) {
        selectedItem = item;
        return 0;
      }
    });
  };

  const mousemovelistener = (event) => {
    if (selectedItem) {
      x = event.clientX - canvasRef.current.offsetLeft - size;
      y = event.clientY - canvasRef.current.offsetTop - size;
      selectedItem.x = x;
      selectedItem.y = y;
      draw();
    }
  };

  const mouseuplistener = () => {
    selectedItem = null;
  };

  const dropHandler = (event) => {
    event.preventDefault();
    x = event.clientX - canvasRef.current.offsetLeft - size;
    y = event.clientY - canvasRef.current.offsetTop - size;
    const id = event.dataTransfer.getData("id");
    setItems((prevState) => [...prevState, { id, x, y }]);
  };
  const dragOverHandler = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  return (
    <div className={styles.wrapper}>
      <canvas
        onMouseDown={mousedownlistener}
        onMouseMove={mousemovelistener}
        onMouseUp={mouseuplistener}
        onDrop={dropHandler}
        onDragOver={dragOverHandler}
        ref={canvasRef}
        width={600}
        height={400}
      />
    </div>
  );
};

export default Canvas;
