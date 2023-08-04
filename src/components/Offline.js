import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import { drawRect } from "./utilities";

function Offline() {
  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const [noProtection, setNoProtection] = useState(false);

  const runCoco = async (image) => {
    const net = await cocossd.load();
    console.log("Handpose model loaded.");

    const obj = await net.detect(image);

    const safetyItems = ["helmet", "vest", "gloves", "person"];

    const relevantObjects = obj.filter((item) =>
      safetyItems.includes(item.class)
    );

    const persons = relevantObjects.filter((item) => item.class === "person");
    const personCount = persons.length;

    const ctx = canvasRef.current.getContext("2d");
    drawRect(relevantObjects, ctx);

    ctx.font = "24px Arial";
    ctx.fillStyle = "red";
    ctx.fillText(`Person Count: ${personCount}`, 10, 30);

    if (relevantObjects.length === 0) {
      setNoProtection(true);
      ctx.fillStyle = "yellow";
      ctx.fillText("Wear Protect", 10, 60);
    } else {
      setNoProtection(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const image = new Image();
      image.src = reader.result;

      image.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        runCoco(image);
      };
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <input type="file" onChange={handleImageUpload} accept="image/*" />
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 8,
            width: 640,
            height: 480,
          }}
        />
        {noProtection && (
          <div
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zIndex: 10,
              top: "50%",
              color: "yellow",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            Wear Protect
          </div>
        )}
      </header>
    </div>
  );
}

export default Offline;
