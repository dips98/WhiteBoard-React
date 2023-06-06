import React, { useRef, useEffect } from 'react';
import { fabric } from 'fabric';

const DrawingCanvas = () => {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const canvasInstance = useRef(null);

  useEffect(() => {
    canvasInstance.current = new fabric.Canvas(canvasRef.current, {
      isDrawingMode: true, // Enable drawing mode
      width: window.innerWidth, // Set initial width
      height: window.innerHeight
    });

    canvasInstance.current.freeDrawingBrush = new fabric.PencilBrush(canvasInstance.current);
    canvasInstance.current.freeDrawingBrush.color = 'black'; // Set pencil color
    canvasInstance.current.freeDrawingBrush.width = 2; // Set pencil width
    canvasInstance.current.freeDrawingBrush.opacity = 1; // Set pencil opacity

    return () => {
      canvasInstance.current.freeDrawingBrush = null;
      canvasInstance.current.dispose();
      canvasInstance.current = null;
    };
  }, []);

  useEffect(() => {
    const resizeCanvas = () => {
      const { current: canvas } = canvasRef;
      canvas.setWidth(window.innerWidth);
      canvas.setHeight(window.innerHeight);
      canvas.renderAll();
    };

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }} />;
};

export default DrawingCanvas;
