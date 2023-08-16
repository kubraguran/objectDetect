// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import { drawRect } from "./utilities";

function Live() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [noProtection, setNoProtection] = useState(false);

  const runCoco = async () => {
    const net = await cocossd.load();
    console.log("Handpose model loaded.");

    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const obj = await net.detect(video);

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
    }
  };

  useEffect(() => {
    runCoco();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div
          style={{
            position: "relative",
            height: "100%",
            width: "640px",
            margin: "0 auto",
          }}
        >
          <Webcam
            ref={webcamRef}
            muted={true}
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              zindex: 9,
              width: 640,
              height: 480,
            }}
          />

          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              zindex: 8,
              width: 640,
              height: 480,
            }}
          />

          {noProtection && (
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                zindex: 10,
                color: "yellow",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              Wear Protect
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default Live;
