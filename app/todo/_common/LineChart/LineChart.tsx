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

    // 🎯 convert to percentage
    const values = data.map((d) =>
      d.total === 0 ? 0 : (d.done / d.total) * 100
    );

    const min = 0;
    const max = 100;

    const padding = 30;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const stepX = chartWidth / (data.length - 1);

    const mapY = (v: number) =>
      padding + (chartHeight - (v / 100) * chartHeight);

    ctx.beginPath();
    ctx.strokeStyle = "#8b5cf6";
    ctx.lineWidth = 3;

    // line
    data.forEach((_, i) => {
      const x = padding + i * stepX;
      const y = mapY(values[i]);

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });

    ctx.stroke();

    // points
    data.forEach((_, i) => {
      const x = padding + i * stepX;
      const y = mapY(values[i]);

      ctx.beginPath();
      ctx.fillStyle = "#ffffff";
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    });
  }, [data, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="w-full h-full"
    />
  );
};