import React, { useEffect, useRef, useState } from "react";
import styles from "./FileManager.module.scss";

const FileManager = ({ setLoadFileItems, items, clearCanvas }) => {
  const saveButtonRef = useRef(null);
  const [output, setOutput] = useState("");

  useEffect(() => {
    setOutput(JSON.stringify(items));
  }, [items]);

  const handleChange = (event) => {
    const file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
      setLoadFileItems(JSON.parse(reader.result.toString()));
    };
    reader.onerror = function () {
      console.log(reader.error);
    };
  };

  const saveFile = (event) => {
    event.preventDefault();
    if (saveButtonRef.current) {
      saveButtonRef.current.click();
    }
  };

  return (
    <div className={styles.wrapper}>
      <button onClick={saveFile}>Сохранить</button>
      <button onClick={clearCanvas}>Очистить всё</button>
      <input type="file" onChange={handleChange} accept=".txt" />
      <a
        className={styles.hidden}
        ref={saveButtonRef}
        href={`data:text/plain;charset=UTF-8,${output}`}
        download={"test.txt"}
      />
    </div>
  );
};

export default FileManager;
