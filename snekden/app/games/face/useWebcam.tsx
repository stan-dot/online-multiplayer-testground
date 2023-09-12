"use client";
import { useEffect, useRef, useState } from "react";

export function useWebcam(
  ref: React.MutableRefObject<HTMLVideoElement>,
): HTMLVideoElement {
  const [source, setSource] = useState({} as MediaStream);

  useEffect(() => {
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
  }, [ref, source]);

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
