import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

interface StatProps {
  value: string;
  label: string;
  delay: number;
  frame: number;
  fps: number;
}

const StatBlock: React.FC<StatProps> = ({ value, label, delay, frame, fps }) => {
  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 7, stiffness: 300, mass: 0.3 },
  });

  return (
    <div
      className="flex flex-col items-center"
      style={{
        transform: `scale(${interpolate(s, [0, 1], [3, 1])}) translateY(${interpolate(
          s,
          [0, 1],
          [30, 0]
        )}px)`,
        opacity: s,
      }}
    >
      <span
        className="font-sans font-black"
        style={{
          fontSize: 100,
          color: "#00e676",
          textShadow: "0 0 20px rgba(0, 230, 118, 0.4)",
          lineHeight: 1,
        }}
      >
        {value}
      </span>
      <span
        className="font-sans font-semibold text-3xl text-gray-400 mt-2"
      >
        {label}
      </span>
    </div>
  );
};

export const V3Scene4Stats: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Flash between stats
  const flash1 = interpolate(frame, [0, 2, 5], [0.3, 0.1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const flash2 = interpolate(frame, [25, 27, 30], [0, 0.15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const flash3 = interpolate(frame, [50, 52, 55], [0, 0.15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Divider lines between stats
  const divider1Spring = spring({
    frame: frame - 20,
    fps,
    config: { damping: 10, stiffness: 200, mass: 0.4 },
  });
  const divider2Spring = spring({
    frame: frame - 45,
    fps,
    config: { damping: 10, stiffness: 200, mass: 0.4 },
  });

  // Exit
  const exitOpacity = interpolate(frame, [100, 110], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitScale = interpolate(frame, [100, 110], [1, 0.8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-brand-dark" style={{ opacity: exitOpacity }}>
      {/* Flashes */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: `rgba(0, 230, 118, ${flash1 + flash2 + flash3})`,
          zIndex: 10,
          pointerEvents: "none",
        }}
      />

      <div
        className="flex flex-col items-center justify-center h-full px-12"
        style={{ transform: `scale(${exitScale})`, gap: 50 }}
      >
        {/* Stat 1: 500+ Mitglieder */}
        <StatBlock
          value="500+"
          label="Mitglieder"
          delay={3}
          frame={frame}
          fps={fps}
        />

        {/* Divider */}
        <div
          className="h-0.5 rounded-full"
          style={{
            width: interpolate(divider1Spring, [0, 1], [0, 400]),
            backgroundColor: "rgba(0, 230, 118, 0.3)",
          }}
        />

        {/* Stat 2: 1x pro Woche */}
        <StatBlock
          value="1x"
          label="pro Woche"
          delay={28}
          frame={frame}
          fps={fps}
        />

        {/* Divider */}
        <div
          className="h-0.5 rounded-full"
          style={{
            width: interpolate(divider2Spring, [0, 1], [0, 400]),
            backgroundColor: "rgba(0, 230, 118, 0.3)",
          }}
        />

        {/* Stat 3: 20 Min */}
        <StatBlock
          value="20 Min"
          label="reichen aus"
          delay={53}
          frame={frame}
          fps={fps}
        />
      </div>
    </AbsoluteFill>
  );
};
