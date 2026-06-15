"use client";
import React, { FC, useEffect, useRef } from "react";

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

    const values = data.map((d) => (d.total ? (d.done / d.total) * 100 : 0));

    const padding = 30;

    const leftAxis = 80;

    const chartWidth = width - leftAxis - padding;
    const chartHeight = height - padding * 2;

    const stepX = chartWidth / (data.length - 1);
    const mapX = (i: number) => leftAxis + i * stepX;
    const mapY = (v: number) => padding + chartHeight - (v / 100) * chartHeight;

    // GRID
    ctx.strokeStyle = "#f1f5f9";
    ctx.lineWidth = 1;

    for (let i = 0; i <= 4; i++) {
      const y = padding + (chartHeight / 4) * i;

      ctx.beginPath();
      ctx.moveTo(leftAxis, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();

      ctx.fillStyle = "#94a3b8";
      ctx.font = "12px sans-serif";

      ctx.fillText(`${100 - i * 25}%`, 5, y + 4);
    }

    // LINE
    ctx.beginPath();
    ctx.strokeStyle = "#8b5cf6";
    ctx.lineWidth = 4;

    data.forEach((_, i) => {
      const x = padding + i * stepX;
      const y = mapY(values[i]);

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });

    ctx.stroke();

    // FILL
    const gradient = ctx.createLinearGradient(0, padding, 0, height);

    gradient.addColorStop(0, "rgba(168,85,247,.35)");
    gradient.addColorStop(1, "rgba(168,85,247,0)");

    ctx.lineTo(padding + stepX * (data.length - 1), height - padding);

    ctx.lineTo(padding, height - padding);

    ctx.closePath();

    ctx.fillStyle = gradient;
    ctx.fill();

    // POINTS
    data.forEach((d, i) => {
      const x = padding + i * stepX;
      const y = mapY(values[i]);

      ctx.beginPath();
      ctx.fillStyle = "#fff";

      ctx.arc(x, y, 5, 0, Math.PI * 2);

      ctx.fill();

      ctx.strokeStyle = "#8b5cf6";
      ctx.lineWidth = 3;
      ctx.stroke();

      // LABELS
      ctx.fillStyle = "#64748b";
      ctx.font = "12px IRANSansX";

      ctx.textAlign = "center";
      ctx.direction = "rtl";

      ctx.fillText(d.label, x, height - 12);
    });
  }, [data, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="rounded-4xl bg-white p-4"
    />
  );
};
