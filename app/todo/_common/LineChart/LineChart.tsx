"use client";
import { FC, useEffect, useRef, useState } from "react";

type Props = {
  data: {
    label: string;
    score: number;
    onTime: number;
    planned: number;
    recovery: number;
    coins: number;
  }[];
  width: number;
  height: number;
};

export const LineChart: FC<Props> = ({ data, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    index: number;
    data: Props["data"][0];
  } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);
    if (data.length === 0) return;

    const values = data.map((d) => d.score);

    const padding = 50;
    const leftAxis = 70;
    const rightPadding = 50;

    const chartWidth = width - leftAxis - rightPadding;
    const chartHeight = height - padding * 2;
    const stepX = chartWidth / (data.length - 1);

    const mapX = (i: number) => width - rightPadding - i * stepX;
    const mapY = (v: number) => padding + chartHeight - (v / 100) * chartHeight;

    const points = values.map((v, i) => ({
      x: mapX(i),
      y: mapY(v),
    }));
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
    const curveStrength = 0.25;

    ctx.beginPath();

    ctx.moveTo(mapX(0), mapY(values[0]));

    for (let i = 1; i < values.length; i++) {
      const x = mapX(i);
      const y = mapY(values[i]);
      const prevX = mapX(i - 1);
      const prevY = mapY(values[i - 1]);
      const nextX = mapX(i + 1) ?? x;
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
      ctx.lineWidth = 1;

      ctx.stroke();

      // value above point
      ctx.fillStyle = purple;
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      const font = getComputedStyle(document.body).getPropertyValue(
        "--font-sansx",
      );

      if (width > 420) {
        ctx.font = `700 13px ${font}`;
      } else {
        ctx.font = `700 5px ${font}`;
      }
      ctx.textAlign = "center";

      const d = data[i];
      const percent = Math.round(v);

      ctx.textAlign = "center";

      ctx.fillText(`%${d.score} `, x, y - 10);
      // bottom label
      if (width > 420) {
        ctx.font = "16px dana";
      } else {
        ctx.font = "13px dana";
      }
      ctx.fillStyle = "#475569";
      ctx.fillText(data[i].label, x, height - 15);
    });
  }, [data, width, height]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const index = data.findIndex((_, i) => {
        const x = width - 50 - i * ((width - 70 - 50) / (data.length - 1));

        const y = 50 + (height - 100) - (data[i].score / 100) * (height - 100);

        return Math.abs(mouseX - x) < 10 && Math.abs(mouseY - y) < 10;
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

    return () => {
      canvas.removeEventListener("mousemove", handleMove);
    };
  }, [data, width, height]);

  const getTooltipTop = () => {
    if (!tooltip) return 0;
    const tooltipHeight = 170;
    if (tooltip.y - tooltipHeight < 0) {
      return tooltip.y - 100;
    }
    return tooltip.y - tooltipHeight;
  };

  const getTooltipPosition = (index: number) => {
    const tooltipWidth = 180;
    if (!tooltip) return;
    if (index === 0) {
      return {
        transform: "translateX(0)",
        left: tooltip.x - 220,
      };
    }

    if (index === data.length - 1) {
      return {
        transform: "translateX(-100%)",
        left: tooltip.x + 220,
      };
    }

    return {
      transform: "translateX(-50%)",
      left: tooltip.x,
    };
  };

  return (
    <div className="relative">
      <canvas ref={canvasRef} width={width} height={height} />

      {tooltip && (
        <div
          className="
      absolute
      bg-white
      shadow-xl
      border
      border-black/10
      rounded-2xl
      px-5
      py-4
      text-sm
      text-gray-600
      pointer-events-none
      min-w-[220px]
      z-100
    "
          style={{
            ...getTooltipPosition(tooltip.index),
            top: getTooltipTop(),
          }}
          dir="rtl"
        >
          {/* Header */}
          <div className="text-center ">
            <div className="font-bold text-gray-800 text-base">
              {tooltip.data.label}
            </div>
            <div className="text-xs text-gray-400 mt-1">عملکرد روزانه</div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="text-xs text-gray-400">✅ به موقع</div>
              <div className="font-bold text-gray-700 mt-1">
                {tooltip.data.onTime}/{tooltip.data.planned}
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="text-xs text-gray-400">↻ بازیابی</div>
              <div className="font-bold text-gray-700 mt-1">
                {tooltip.data.recovery}
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="text-xs text-gray-400">🪙 سکه</div>
              <div className="font-bold text-yellow-600 mt-1">
                {tooltip.data.coins}
              </div>
            </div>

            <div className="bg-purple-50 rounded-xl p-3 text-center">
              <div className="text-xs text-purple-400">⭐ امتیاز</div>
              <div className="font-bold text-purple-600 mt-1">
                %{tooltip.data.score}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
