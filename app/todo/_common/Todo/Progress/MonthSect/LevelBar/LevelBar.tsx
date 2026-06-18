export default function LevelBar({ percent, remaining }: { percent: number; remaining: number }) {
  return (
    <div className="mt-5">

      <div style={{ display: "flex", justifyContent: "space-between" }}>
      </div>

      <div style={{
        height: 6,
        background: "#e2e8f0",
        borderRadius: 999,
        overflow: "hidden"
      }}>
        <div style={{
          width: `${percent}%`,
          height: "100%",
          background: "#34d399",
          transition: "width 0.4s ease"
        }} />
      </div>

    </div>
  );
}