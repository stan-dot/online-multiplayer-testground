"use client";
import {
  createCanvasFromMedia,
  detectAllFaces,
  draw,
  matchDimensions,
  nets,
  resizeResults,
  TinyFaceDetectorOptions,
} from "face-api.js";
import {
  drawFaceExpressions,
  drawFaceLandmarks,
} from "face-api.js/build/commonjs/draw";
import { useEffect, useRef, useState } from "react";

function useWebcam(
  ref: React.MutableRefObject<HTMLVideoElement>,
): HTMLVideoElement {
  const [source, setSource] = useState({} as MediaStream);

  function getVideoNow() {
    navigator.mediaDevices.getUserMedia(
      { video: {} },
    )
      .then((stream) => {
        setSource(stream);
        ref.current.srcObject = source;
      })
      .catch(
        (err) => console.error(err),
      );
  }

  useEffect(() => {
    getVideoNow();
  }, []);

  return ref.current;
}

export const useCanvas = () => {
  const canvasRef = useRef({} as HTMLCanvasElement);
  useEffect(() => {
    const canvas: HTMLCanvasElement = canvasRef.current;
    const ctx: CanvasRenderingContext2D = canvas!.getContext("2d")!;
    ctx.strokeStyle = "#e1e1e1";
    ctx.fillStyle = "cadetblue";
  }, []);
  return canvasRef;
};

export default function Testgame() {
  const videoRef = useRef(null as unknown as HTMLVideoElement);
  const videohookValue = useWebcam(videoRef);

  const handlePlayVideo = () => {
    videohookValue !== null && videohookValue.play();
    // videohookValue.play();
    videohookValue.onplay = () => {
      const canvas = createCanvasFromMedia(videohookValue);
      document.body.append(canvas);
      const displaySize = {
        width: videohookValue.width,
        height: videohookValue.height,
      };
      matchDimensions(canvas, displaySize);

      setInterval(async () => {
        const detections = await detectAllFaces(
          videohookValue,
          new TinyFaceDetectorOptions(),
        ).withFaceLandmarks().withFaceExpressions();
        const resizedDetections = resizeResults(detections, displaySize);
        canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
        draw.drawDetections(canvas, resizedDetections);
        drawFaceLandmarks(canvas, resizedDetections);
        drawFaceExpressions(canvas, resizedDetections);
      }, 100);
    };
  };

  Promise.all([
    nets.tinyFaceDetector.loadFromUri("/models"),
    nets.faceLandmark68TinyNet.loadFromUri("/models"),
    nets.faceRecognitionNet.loadFromUri("/models"),
    nets.faceExpressionNet.loadFromUri("/models"),
  ]).then(handlePlayVideo);

  return (
    <div>
      <p>Here face detection tutorial</p>
      <div
        id="face-detection-piece"
        className="m-0 p-0 w-100 h-100 flex justify-center align-center"
      >
        <video
          ref={videoRef}
          id="video"
          width={720}
          height={560}
          autoPlay
          muted
        >
          Your browser does not support HTML video.
        </video>
      </div>
    </div>
  );
}
