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
  
      let noProtection = true; // Assume no protection initially
  
      // Check if there's at least one person with helmet and gloves
      for (const person of persons) {
        const hasHelmet = relevantObjects.some(
          (item) => item.class === "helmet" && isBoundingBoxOverlap(person.bbox, item.bbox)
        );
  
        const hasGloves = relevantObjects.some(
          (item) => item.class === "gloves" && isBoundingBoxOverlap(person.bbox, item.bbox)
        );
  
        if (hasHelmet && hasGloves) {
          noProtection = false;
          break; // Exit the loop if a person with both helmet and gloves is found
        }
      }
  
      if (noProtection) {
        ctx.fillStyle = "yellow";
        ctx.fillText("Wear Protection!", 10, 60);
      }
    }
  };
  
  
  const isBoundingBoxOverlap = (bbox1, bbox2) => {
    return (
      bbox1[0] < bbox2[0] + bbox2[2] &&
      bbox1[0] + bbox1[2] > bbox2[0] &&
      bbox1[1] < bbox2[1] + bbox2[3] &&
      bbox1[1] + bbox1[3] > bbox2[1]
    );
  };
  

  useEffect(() => {
    runCoco();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          muted={true}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
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

export default Live;
