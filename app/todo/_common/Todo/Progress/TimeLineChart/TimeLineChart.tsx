"use client";

import { FC, useEffect, useRef } from "react";

type TimeData = {
  label: string;
  date: string;
  durationSeconds: number;
};

type Props = {
  data: TimeData[];
  width: number;
  height: number;
};

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes} دقیقه`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours} ساعت`;
  }

  return `${hours}س ${remainingMinutes}د`;
};

export const TimeLineChart: FC<Props> = ({ data, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || data.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const padding = 45;
    const leftAxis = 55;
    const rightPadding = 35;

    const chartWidth = width - leftAxis - rightPadding;
    const chartHeight = height - padding * 2;

    const stepX =
      data.length > 1 ? chartWidth / (data.length - 1) : chartWidth;

    const values = data.map((item) =>
      Math.round(item.durationSeconds / 60),
    );

    const maxValue = Math.max(...values, 60);

    // کمی فضای اضافه بالای نمودار
    const maxY = Math.ceil(maxValue / 30) * 30;

    const mapX = (index: number) =>
      width - rightPadding - index * stepX;

    const mapY = (value: number) =>
      padding +
      chartHeight -
      (value / maxY) * chartHeight;

    // Background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    // Grid
    ctx.strokeStyle = "#f1f5f9";
    ctx.lineWidth = 1;

    const gridCount = 4;

    for (let i = 0; i <= gridCount; i++) {
      const y = padding + (chartHeight / gridCount) * i;

      ctx.beginPath();
      ctx.moveTo(leftAxis, y);
      ctx.lineTo(width - rightPadding, y);
      ctx.stroke();

      const value = Math.round(
        maxY - (maxY / gridCount) * i,
      );

      ctx.fillStyle = "#94a3b8";
      ctx.font = "12px dana";
      ctx.textAlign = "left";

      ctx.fillText(`${value}د`, 8, y + 4);
    }

    // Points
    const points = values.map((value, index) => ({
      x: mapX(index),
      y: mapY(value),
    }));

    // Line
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      const current = points[i];
      const previous = points[i - 1];

      const middleX =
        (previous.x + current.x) / 2;

      ctx.bezierCurveTo(
        middleX,
        previous.y,
        middleX,
        current.y,
        current.x,
        current.y,
      );
    }

    ctx.strokeStyle = "#f472b6";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();

    // Fill
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      const current = points[i];
      const previous = points[i - 1];

      const middleX =
        (previous.x + current.x) / 2;

      ctx.bezierCurveTo(
        middleX,
        previous.y,
        middleX,
        current.y,
        current.x,
        current.y,
      );
    }

    ctx.lineTo(points[points.length - 1].x, height - padding);
    ctx.lineTo(points[0].x, height - padding);
    ctx.closePath();

    const gradient = ctx.createLinearGradient(
      0,
      padding,
      0,
      height,
    );

    gradient.addColorStop(
      0,
      "rgba(244,114,182,0.18)",
    );

    gradient.addColorStop(
      1,
      "rgba(244,114,182,0)",
    );

    ctx.fillStyle = gradient;
    ctx.fill();

    // Points + labels
    values.forEach((value, index) => {
      const point = points[index];

      ctx.beginPath();
      ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);

      ctx.fillStyle = "#f472b6";
      ctx.fill();

      ctx.fillStyle = "#ec4899";
      ctx.font = "700 11px dana";
      ctx.textAlign = "center";

      if (value > 0) {
        ctx.fillText(
          formatDuration(data[index].durationSeconds),
          point.x,
          point.y - 12,
        );
      }

      ctx.fillStyle = "#64748b";
      ctx.font = width > 420 ? "14px dana" : "11px dana";

      ctx.fillText(
        data[index].label,
        point.x,
        height - 14,
      );
    });
  }, [data, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
    />
  );
};