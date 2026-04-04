import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const LightningBolt: React.FC<{ opacity: number; glow: number }> = ({
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
      filter: `drop-shadow(0 0 ${glow}px rgba(0, 230, 118, 0.8))`,
    }}
  >
    <path
      d="M70 0L20 70H55L45 160L100 80H65L70 0Z"
      fill="#00e676"
      stroke="#00e676"
      strokeWidth="2"
    />
  </svg>
);

export const Scene3Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entryOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 10, stiffness: 200, mass: 0.5 },
  });

  const boltSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 8, stiffness: 180, mass: 0.4 },
  });

  const subtitleSpring = spring({
    frame: frame - 30,
    fps,
    config: { damping: 14, stiffness: 150, mass: 0.6 },
  });

  // Pulsing effect for bolt
  const pulseGlow = interpolate(
    frame % 30,
    [0, 15, 30],
    [10, 25, 10],
    { extrapolateRight: "clamp" }
  );

  // Pulse ring animation
  const pulseScale = interpolate(frame % 40, [0, 40], [0.8, 1.6], {
    extrapolateRight: "clamp",
  });
  const pulseOpacity = interpolate(frame % 40, [0, 40], [0.4, 0], {
    extrapolateRight: "clamp",
  });

  const exitOpacity = interpolate(frame, [110, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      className="bg-brand-dark flex items-center justify-center"
      style={{ opacity: entryOpacity * exitOpacity }}
    >
      {/* Background electric pulse */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 45%, rgba(0, 230, 118, ${
            boltSpring * 0.06
          }) 0%, transparent 50%)`,
        }}
      />

      <div className="flex flex-col items-center px-16">
        {/* Lightning bolt */}
        <div
          className="mb-10 relative"
          style={{
            transform: `scale(${interpolate(
              boltSpring,
              [0, 1],
              [0.3, 1]
            )}) rotate(${interpolate(boltSpring, [0, 1], [-20, 0])}deg)`,
            opacity: boltSpring,
          }}
        >
          {/* Pulse ring behind bolt */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ pointerEvents: "none" }}
          >
            <div
              className="rounded-full border-2 border-brand-green"
              style={{
                width: 180,
                height: 180,
                transform: `scale(${pulseScale})`,
                opacity: pulseOpacity * boltSpring,
              }}
            />
          </div>
          <LightningBolt opacity={1} glow={pulseGlow * boltSpring} />
        </div>

        {/* EMS Training title */}
        <div
          className="text-center"
          style={{
            transform: `scale(${interpolate(
              titleSpring,
              [0, 1],
              [0.5, 1]
            )})`,
            opacity: titleSpring,
          }}
        >
          <span
            className="font-sans font-black text-9xl block"
            style={{
              color: "#00e676",
              textShadow: `0 0 ${pulseGlow}px rgba(0, 230, 118, 0.5)`,
            }}
          >
            EMS
          </span>
          <span className="font-sans font-bold text-7xl text-white block -mt-2">
            Training
          </span>
        </div>

        {/* Subtext */}
        <div
          className="text-center mt-12"
          style={{
            transform: `translateY(${interpolate(
              subtitleSpring,
              [0, 1],
              [30, 0]
            )}px)`,
            opacity: subtitleSpring,
          }}
        >
          <span className="font-sans font-semibold text-5xl text-gray-300">
            1x pro Woche reicht.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
