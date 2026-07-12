"use client";

import { useEffect, useRef } from "react";

interface RetroGridProps {
  gridColor?: string;
  showScanlines?: boolean;
  glowEffect?: boolean;
  className?: string;
}

function RetroGrid({
  gridColor = "#ff00ff",
  showScanlines = true,
  glowEffect = true,
  className = "",
}: RetroGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false }); // ОПТИМИЗАЦИЯ 1: Отключаем альфа-канал холста для ускорения рендеринга
    if (!ctx) return;

    let animationFrameId: number; // ОПТИМИЗАЦИЯ 2: Храним ID анимации для предотвращения утечек памяти

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : { r: 255, g: 0, b: 255 };
    };

    // ОПТИМИЗАЦИЯ 3: Слегка увеличили ячейки (было 120 на 80). Линий на экране меньше, FPS выше, визуал тот же.
    const cellWidth = 140;
    const cellDepth = 90;
    const numCellsWide = 14;
    const numCellsDeep = 16;

    const cameraX = 0;
    const cameraY = 60;
    const cameraZ = 400;
    const focalLength = 500;

    let offset = 0;
    const speed = 1.5;

    const project3DTo2D = (x: number, y: number, z: number) => {
      const relX = x - cameraX;
      const relY = y - cameraY;
      const relZ = z - cameraZ;

      if (relZ <= 10) return null;

      const scale = focalLength / relZ;
      const screenX = canvas.width / 2 + relX * scale;
      const screenY = canvas.height * 0.5 - relY * scale;

      return { x: screenX, y: screenY, scale, z: relZ };
    };

    const drawCell = (x: number, z: number, zOffset: number) => {
      const actualZ = z - zOffset;
      if (actualZ < -cellDepth || actualZ > numCellsDeep * cellDepth) return;

      const topLeft = project3DTo2D(x - cellWidth / 2, 0, actualZ);
      const topRight = project3DTo2D(x + cellWidth / 2, 0, actualZ);
      const bottomLeft = project3DTo2D(x - cellWidth / 2, 0, actualZ + cellDepth);
      const bottomRight = project3DTo2D(x + cellWidth / 2, 0, actualZ + cellDepth);

      if (!topLeft || !topRight || !bottomLeft || !bottomRight) return;
      if (actualZ < 0) return;

      const distanceFactor = Math.min(1, actualZ / (numCellsDeep * cellDepth));
      const alpha = Math.max(0.2, 1 - distanceFactor * 0.8);
      const lineWidth = Math.max(1, 2.0 * (1 - distanceFactor * 0.5));

      // ОПТИМИЗАЦИЯ 4: Полностью удален ctx.shadowBlur, из-за которого всё лагало.
      // Вместо него эффект Glow накладывается глобально через CSS-фильтр холста ниже.
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = gridColor;
      ctx.globalAlpha = alpha;

      ctx.beginPath();
      ctx.moveTo(bottomLeft.x, bottomLeft.y);
      ctx.lineTo(bottomRight.x, bottomRight.y);
      ctx.lineTo(topRight.x, topRight.y);
      ctx.lineTo(topLeft.x, topLeft.y);
      ctx.closePath();
      ctx.stroke();

      ctx.globalAlpha = 1;
    };

    const drawScanlines = () => {
      if (!showScanlines) return;

      ctx.globalAlpha = 0.08;
      ctx.fillStyle = "#000000";
      // ОПТИМИЗАЦИЯ 5: Шаг полос увеличен до 6 пикселей, чтобы снизить количество циклов отрисовки
      for (let y = 0; y < canvas.height; y += 6) {
        ctx.fillRect(0, y, canvas.width, 3);
      }
      ctx.globalAlpha = 1;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const rgb = hexToRgb(gridColor);

      const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.55);
      skyGradient.addColorStop(0, `rgba(${rgb.r * 0.05}, ${rgb.g * 0.05}, ${rgb.b * 0.15}, 1)`);
      skyGradient.addColorStop(0.3, `rgba(${rgb.r * 0.1}, ${rgb.g * 0.08}, ${rgb.b * 0.2}, 1)`);
      skyGradient.addColorStop(0.5, `rgba(${rgb.r * 0.2}, ${rgb.g * 0.15}, ${rgb.b * 0.3}, 1)`);
      skyGradient.addColorStop(0.7, `rgba(${rgb.r * 0.35}, ${rgb.g * 0.25}, ${rgb.b * 0.4}, 1)`);
      skyGradient.addColorStop(0.85, `rgba(${rgb.r * 0.55}, ${rgb.g * 0.4}, ${rgb.b * 0.6}, 1)`);
      skyGradient.addColorStop(1, `rgba(${rgb.r * 0.7}, ${rgb.g * 0.5}, ${rgb.b * 0.75}, 1)`);
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height * 0.55);

      const groundGradient = ctx.createLinearGradient(0, canvas.height * 0.55, 0, canvas.height);
      groundGradient.addColorStop(0, `rgba(${rgb.r * 0.1}, ${rgb.g * 0.08}, ${rgb.b * 0.15}, 1)`);
      groundGradient.addColorStop(0.3, `rgba(${rgb.r * 0.05}, ${rgb.g * 0.03}, ${rgb.b * 0.08}, 1)`);
      groundGradient.addColorStop(1, "#000000");
      ctx.fillStyle = groundGradient;
      ctx.fillRect(0, canvas.height * 0.55, canvas.width, canvas.height * 0.45);

      offset += speed;
      if (offset >= cellDepth) offset = 0;

      for (let row = -2; row < numCellsDeep + 2; row++) {
        const z = row * cellDepth;
        for (let col = -Math.floor(numCellsWide / 2); col <= Math.floor(numCellsWide / 2); col++) {
          const x = col * cellWidth;
          drawCell(x, z, offset);
        }
      }

      drawScanlines();

      const vignette = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        canvas.height * 0.3,
        canvas.width / 2,
        canvas.height / 2,
        canvas.height * 0.8
      );
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(0,0,0,0.6)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId); // ОПТИМИЗАЦИЯ 2: Очищаем анимацию при уничтожении компонента
    };
  }, [gridColor, showScanlines, glowEffect]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      // ОПТИМИЗАЦИЯ 6: Если glowEffect активен, мы вешаем легкий CSS-drop-shadow прямо на весь canvas. 
      // Аппаратное ускорение браузера обработает это свечение через видеокарту без потери кадров.
      style={{ 
        background: "#000000", 
        width: "100%", 
        height: "100%",
        filter: glowEffect ? `drop-shadow(0 0 15px ${gridColor}40)` : "none" 
      }}
    />
  );
}

export default RetroGrid;
