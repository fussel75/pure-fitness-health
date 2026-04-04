import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const PersonIcon: React.FC<{ opacity: number; glow: number }> = ({
  opacity,
  glow,
}) => (
  <svg
    width="120"
    height="160"
    viewBox="0 0 120 160"
    fill="none"
    style={{
      opacity,
      filter: `drop-shadow(0 0 ${glow}px rgba(0, 230, 118, 0.7))`,
    }}
  >
    {/* Head */}
    <circle cx="60" cy="35" r="25" fill="#00e676" />
    {/* Body */}
    <path
      d="M30 75C30 65 43 58 60 58C77 58 90 65 90 75V110C90 115 85 120 80 120H40C35 120 30 115 30 110V75Z"
      fill="#00e676"
    />
    {/* Arms suggesting coaching pose */}
    <path
      d="M25 80L5 65"
      stroke="#00e676"
      strokeWidth="8"
      strokeLinecap="round"
    />
    <path
      d="M95 80L115 65"
      stroke="#00e676"
      strokeWidth="8"
      strokeLinecap="round"
    />
  </svg>
);

export const V2Scene3Trainer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entryOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const iconSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 10, stiffness: 180, mass: 0.5 },
  });

  const titleSpring = spring({
    frame: frame - 18,
    fps,
    config: { damping: 12, stiffness: 160, mass: 0.5 },
  });

  const subtitleSpring = spring({
    frame: frame - 30,
    fps,
    config: { damping: 14, stiffness: 140, mass: 0.6 },
  });

  // Heartbeat pulse for icon
  const heartbeatPhase = (frame - 15) % 40;
  const heartbeat =
    heartbeatPhase < 5
      ? interpolate(heartbeatPhase, [0, 3, 5], [1, 1.12, 1])
      : heartbeatPhase < 12
        ? interpolate(heartbeatPhase, [5, 8, 12], [1, 1.08, 1])
        : 1;

  const pulseGlow = interpolate(
    heartbeatPhase,
    [0, 3, 5, 8, 12, 40],
    [10, 25, 10, 20, 10, 10],
    { extrapolateRight: "clamp" }
  );

  const exitOpacity = interpolate(frame, [105, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      className="bg-brand-dark flex items-center justify-center"
      style={{ opacity: entryOpacity * exitOpacity }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 40%, rgba(0, 230, 118, ${
            iconSpring * 0.06
          }) 0%, transparent 50%)`,
        }}
      />

      <div className="flex flex-col items-center px-14">
        {/* Coach icon with heartbeat */}
        <div
          className="mb-12"
          style={{
            transform: `scale(${interpolate(iconSpring, [0, 1], [0.3, 1]) * heartbeat})`,
            opacity: iconSpring,
          }}
        >
          <PersonIcon opacity={1} glow={pulseGlow * iconSpring} />
        </div>

        {/* Title */}
        <div
          className="text-center"
          style={{
            transform: `translateY(${interpolate(
              titleSpring,
              [0, 1],
              [40, 0]
            )}px)`,
            opacity: titleSpring,
          }}
        >
          <span className="font-sans font-black text-7xl text-white block">
            Dein eigener
          </span>
          <span
            className="font-sans font-black text-8xl block mt-2"
            style={{
              color: "#00e676",
              textShadow: "0 0 20px rgba(0, 230, 118, 0.4)",
            }}
          >
            Coach
          </span>
        </div>

        {/* Subtitle */}
        <div
          className="text-center mt-10"
          style={{
            transform: `translateY(${interpolate(
              subtitleSpring,
              [0, 1],
              [20, 0]
            )}px)`,
            opacity: subtitleSpring,
          }}
        >
          <span className="font-sans font-semibold text-4xl text-gray-400 block">
            Persönliche Betreuung.
          </span>
          <span className="font-sans font-semibold text-4xl text-gray-400 block mt-2">
            Jede Einheit.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
