"use client";

import { FC, useEffect, useRef, useState } from "react";

type ChartData = {
  label: string;
  percentage: number;
  xp: number;
  onTime: number;
  planned: number;
  recovery: number;
  coins: number;
};

type Props = {
  data: ChartData[];
  width: number;
  height: number;
};

export const LineChart: FC<Props> = ({ data, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    index: number;
    data: ChartData;
  } | null>(null);

  const padding = 45;
  const leftAxis = 55;
  const rightPadding = 35;

  const chartWidth = width - leftAxis - rightPadding;
  const chartHeight = height - padding * 2;

  const stepX = data.length > 1 ? chartWidth / (data.length - 1) : chartWidth;

  const mapX = (index: number) => width - rightPadding - index * stepX;

  // اینجا دیگه محدود به 100 نیست
  // چون مثلا 300 درصد معنی دارد
  const values = data.map((d) => d.percentage);
  const chartMax = Math.min(
    Math.max(...data.map((d) => d.percentage), 100),
    150,
  );
  const maxValue = Math.max(...values, 100);
  const maxY = Math.ceil(maxValue / 50) * 50;
  const mapY = (value: number) => {
    const displayValue = Math.min(value, chartMax);

    return padding + chartHeight - (displayValue / chartMax) * chartHeight;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !data.length) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const styles = getComputedStyle(document.documentElement);

    const chartBg = styles.getPropertyValue("--chart-bg").trim();

    const chartGrid = styles.getPropertyValue("--chart-grid").trim();

    const chartText = styles.getPropertyValue("--chart-text").trim();

    const chartPrimary = styles.getPropertyValue("--chart-primary").trim();

    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.clearRect(0, 0, width, height);

    // background

    ctx.fillStyle = chartBg;
    ctx.fillRect(0, 0, width, height);

    // grid

    ctx.strokeStyle = chartGrid;
    ctx.lineWidth = 1;

    for (let i = 0; i <= 4; i++) {
      const y = padding + (chartHeight / 4) * i;

      ctx.beginPath();
      ctx.moveTo(leftAxis, y);
      ctx.lineTo(width - rightPadding, y);
      ctx.stroke();

      ctx.fillStyle = chartText;
      ctx.font = "12px dana";
      ctx.textAlign = "left";

      const value = Math.round(maxY - (maxY / 4) * i);

      const step = chartMax / 4;

      ctx.fillText(`${Math.round(chartMax - i * step)}%`, 10, y + 5);
    }

    const points = values.map((value, index) => ({
      x: mapX(index),
      y: mapY(value),
    }));

    // line

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const current = points[i];

      const middleX = (prev.x + current.x) / 2;

      ctx.bezierCurveTo(
        middleX,
        prev.y,
        middleX,
        current.y,
        current.x,
        current.y,
      );
    }

    ctx.strokeStyle = chartPrimary;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.stroke();

    // fill

    ctx.beginPath();

    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const current = points[i];

      const middleX = (prev.x + current.x) / 2;

      ctx.bezierCurveTo(
        middleX,
        prev.y,
        middleX,
        current.y,
        current.x,
        current.y,
      );
    }

    ctx.lineTo(points.at(-1)!.x, height - padding);

    ctx.lineTo(points[0].x, height - padding);

    ctx.closePath();

    const gradient = ctx.createLinearGradient(0, padding, 0, height);

    gradient.addColorStop(0, "rgba(139,92,246,0.18)");

    gradient.addColorStop(1, "rgba(139,92,246,0)");

    ctx.fillStyle = gradient;
    ctx.fill();

    // points

    values.forEach((value, index) => {
      const point = points[index];

      ctx.beginPath();

      ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);

      ctx.fillStyle = chartPrimary;
      ctx.fill();

      ctx.fillStyle = chartPrimary;
      ctx.font = "700 11px dana";
      ctx.textAlign = "center";

      ctx.fillText(`${Math.round(value)}%`, point.x, point.y - 12);

      ctx.fillStyle = chartText;
      ctx.font = width > 420 ? "14px dana" : "11px dana";

      ctx.fillText(data[index].label, point.x, height - 14);
    });
  }, [data, width, height]);

  // hover

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();

      const mouseX = e.clientX - rect.left;

      const mouseY = e.clientY - rect.top;

      const index = data.findIndex((item, i) => {
        const x = mapX(i);
        const y = mapY(item.percentage);

        return Math.abs(mouseX - x) < 15 && Math.abs(mouseY - y) < 15;
      });

      if (index !== -1) {
        setTooltip({
          x: mouseX,
          y: mouseY,
          index,
          data: data[index],
        });
      } else {
        setTooltip(null);
      }
    };

    canvas.addEventListener("mousemove", handleMove);

    return () => canvas.removeEventListener("mousemove", handleMove);
  }, [data, width, height]);

  return (
    <div className="relative">
      <canvas ref={canvasRef} width={width} height={height} />

      {tooltip && (
        <div
          className="
          absolute
          bg-background
          border
          border-border-gray
          shadow-xl
          rounded-2xl
          p-4
          min-w-52
          text-sm
          z-50
          "
          style={{
            left: tooltip.x < 100 ? tooltip.x : tooltip.x - 50,
            top: tooltip.y < 170 ? tooltip.y + 40 : tooltip.y - 190,
            transform: "translateX(-50%)",
          }}
        >
          <div className="font-bold text-center mb-3">{tooltip.data.label}</div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              برنامه:
              <b>{tooltip.data.planned}</b>
            </div>

            <div>
              انجام:
              <b>{tooltip.data.percentage}%</b>
            </div>

            <div>
              به موقع:
              <b>{tooltip.data.onTime}</b>
            </div>

            <div>
              بازیابی:
              <b>{tooltip.data.recovery}</b>
            </div>

            <div>
              🪙
              {tooltip.data.coins}
            </div>

            <div>
              ⭐{tooltip.data.xp}
              XP
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
