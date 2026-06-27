"use client";
import { FC, useEffect, useRef } from "react";

type Props = {
  data: {
    label: string;
    done: number;
    total: number;
  }[];
  width: number;
  height: number;
};

export const LineChart: FC<Props> = ({ data, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    if (data.length < 2) return;

    const values = data.map((d) => {
      if (!d.total || d.total === 0) return 0;
      return (d.done / d.total) * 100;
    });

    const padding = 50;
    const leftAxis = 70;
    const rightPadding = 50;

    const chartWidth = width - leftAxis - rightPadding;
    const chartHeight = height - padding * 2;

    const stepX = chartWidth / (data.length - 1);

    const mapX = (i: number) => width - rightPadding - i * stepX;

    const mapY = (v: number) => padding + chartHeight - (v / 100) * chartHeight;

    // BG
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    // GRID
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;

    for (let i = 0; i <= 4; i++) {
      const y = padding + (chartHeight / 4) * i;

      ctx.beginPath();
      ctx.moveTo(leftAxis, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();

      ctx.fillStyle = "#475569";
      ctx.font = "16px dana";
      ctx.textAlign = "left";

      ctx.fillText(`${100 - i * 25}%`, 8, y + 4);
    }

    // LINE
    const curveStrength = 0.25; // 👈 اینو کم و زیاد کن (0 تا 1)

    ctx.beginPath();

    ctx.moveTo(mapX(0), mapY(values[0]));

    for (let i = 1; i < values.length; i++) {
      const x = mapX(i);
      const y = mapY(values[i]);

      const prevX = mapX(i - 1);
      const prevY = mapY(values[i - 1]);

      const nextX = mapX(i + 1) ?? x;
      const nextY = mapY(values[i + 1]) ?? y;

      // کنترل شدت curve
      const cp1X = prevX + (x - prevX) * curveStrength;

      const cp2X = x - (nextX - x) * curveStrength;

      ctx.bezierCurveTo(cp1X, prevY, cp2X, y, x, y);
    }

    ctx.strokeStyle = "#8b5cf6";
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    ctx.stroke();
    // FILL
    ctx.beginPath();

    // move to first point
    ctx.moveTo(mapX(0), mapY(values[0]));

    // CURVE (همون الگوریتم line)
    for (let i = 1; i < values.length; i++) {
      const x = mapX(i);
      const y = mapY(values[i]);

      const prevX = mapX(i - 1);
      const prevY = mapY(values[i - 1]);

      const nextX = mapX(i + 1) ?? x;
      const nextY = mapY(values[i + 1]) ?? y;

      const curveStrength = 0.3;

      const cp1X = prevX + (x - prevX) * curveStrength;
      const cp2X = x - (nextX - x) * curveStrength;

      ctx.bezierCurveTo(cp1X, prevY, cp2X, y, x, y);
    }

    ctx.lineTo(mapX(values.length - 1), height - padding);
    ctx.lineTo(mapX(0), height - padding);

    ctx.closePath();

    // gradient
    const gradient = ctx.createLinearGradient(0, padding, 0, height);

    gradient.addColorStop(0, "rgba(139,92,246,0)");
    gradient.addColorStop(1, "rgba(139,92,246,0.25)");

    ctx.fillStyle = gradient;
    ctx.fill();

    // POINTS + LABELS
    values.forEach((v, i) => {
      const x = mapX(i);
      const y = mapY(v);

      ctx.beginPath();

      ctx.arc(x, y, 5, 0, Math.PI * 2);

      ctx.fillStyle = "#8b5cf6";
      ctx.fill();
      const purple = "#8b5cf6";
      ctx.strokeStyle = purple;
      ctx.lineWidth = 3;

      ctx.stroke();

      // value above point
      ctx.fillStyle = purple;
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      const font = getComputedStyle(document.body).getPropertyValue(
        "--font-sansx",
      );

      ctx.font = `700 13px ${font}`;
      ctx.textAlign = "center";

      const d = data[i];
      const percent = Math.round(v);

      ctx.fillText(`${d.done}/${d.total} (${percent}%)`, x, y - 12);

      // bottom label
      ctx.font = "16px dana";
      ctx.fillStyle = "#475569";
      ctx.fillText(data[i].label, x, height - 15);
    });
  }, [data, width, height]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};
