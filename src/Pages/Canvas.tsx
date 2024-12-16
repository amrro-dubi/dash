import React, { useRef, useEffect } from 'react';

const CanvasComponent = () => {
  // Create a reference for the canvas element
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Use useEffect to run code once the component is mounted
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        // Draw a red circle on the canvas
        context.beginPath();
        context.arc(150, 150, 50, 0, Math.PI * 2, true); // x, y, radius, start angle, end angle
        context.fillStyle = 'green';
        context.fill();
      }
    }
  }, []); // Empty dependency array ensures this runs only once after initial render

  return (
    <div>
      <h1>Canvas in React</h1>
      <canvas ref={canvasRef} width={300} height={300} style={{ border: '1px solid black' }} />
    </div>
  );
};

export default CanvasComponent;
