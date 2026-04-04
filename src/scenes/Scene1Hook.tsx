import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 200, mass: 0.5 },
  });

  const subtitleSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, stiffness: 180, mass: 0.5 },
  });

  const highlightOpacity = interpolate(frame, [15, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const glowIntensity = interpolate(
    frame,
    [25, 35, 45, 55],
    [0, 20, 10, 20],
    {
      extrapolateRight: "clamp",
    }
  );

  // Exit fade
  const exitOpacity = interpolate(frame, [50, 60], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      className="bg-brand-dark flex items-center justify-center"
      style={{ opacity: exitOpacity }}
    >
      {/* Subtle radial background glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(0, 230, 118, ${
            highlightOpacity * 0.08
          }) 0%, transparent 60%)`,
        }}
      />

      <div className="flex flex-col items-center px-16">
        {/* Main headline */}
        <div
          className="text-center"
          style={{
            transform: `translateY(${interpolate(
              titleSpring,
              [0, 1],
              [80, 0]
            )}px)`,
            opacity: titleSpring,
          }}
        >
          <span
            className="font-sans font-black text-8xl leading-tight block"
            style={{
              color: "#00e676",
              textShadow: `0 0 ${glowIntensity}px rgba(0, 230, 118, 0.8)`,
            }}
          >
            20 Minuten
          </span>
        </div>

        {/* Equals line */}
        <div
          className="text-center mt-6"
          style={{
            transform: `translateY(${interpolate(
              subtitleSpring,
              [0, 1],
              [60, 0]
            )}px)`,
            opacity: subtitleSpring,
          }}
        >
          <span className="font-sans font-bold text-6xl text-white block">
            = 2 Stunden Gym
          </span>
        </div>

        {/* Accent line */}
        <div
          className="mt-10 h-1 bg-brand-green rounded-full"
          style={{
            width: interpolate(highlightOpacity, [0, 1], [0, 400]),
            opacity: highlightOpacity,
            boxShadow: `0 0 ${glowIntensity}px rgba(0, 230, 118, 0.6)`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
