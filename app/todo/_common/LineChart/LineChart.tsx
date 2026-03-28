import React, { FC, useEffect, useRef } from "react";

type LinechartProps = React.DetailedHTMLProps<
  React.CanvasHTMLAttributes<HTMLCanvasElement>,
  HTMLCanvasElement
> & {
  data: {
    label: string;
    value: number;
  }[];
};
const LineChart: FC<LinechartProps> = ({ data, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    ctx?.clearRect(0, 0, width, height);
    const values = data.map((p: any) => p.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const padding = 30;
    // Add width height properly
    const chartWidth = width - padding * 2;
    const charHeight = height - padding * 2;
    const stepX = chartWidth / (data.length - 1);

    const mapY = (v: number) =>
      padding +
      (charHeight - ((v - minValue) / (maxValue - minValue)) * charHeight);
    ctx?.beginPath();
    let lineWidth = ctx && ctx.lineWidth;
    lineWidth = 5;
    let strokeStyle = ctx && ctx.strokeStyle;
    strokeStyle = "#3b82f6";

    data.forEach((p: any, i) => {
      const x = padding + i * stepX;
      const y = mapY(p.value);
      ctx?.lineTo(x, y);
    });

    ctx?.stroke();
    let fillStyle = ctx && ctx.fillStyle;
    fillStyle = "#1d4";

    data.forEach((p: any, i) => {
      const x = padding + i * stepX;
      const y = mapY(p.value);

      ctx?.beginPath();
      ctx?.arc(x, y, 4, 0, Math.PI * 2);
      ctx?.fill();
    });
  }, [data, width]);
  return (
    <canvas
      ref={canvasRef}
      width={height}
      height={width}
      style={{ color: "red", border: "1px solid #eee" }}
      className="text-red-400"
    />
  );
};

export default LineChart;
