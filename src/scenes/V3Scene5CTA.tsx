import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FitboxLogo, PureFitnessLogo } from "../components/Logos";

// Energetic floating particles
const Spark: React.FC<{
  x: number;
  y: number;
  delay: number;
  frame: number;
  speed: number;
}> = ({ x, y, delay, frame, speed }) => {
  const life = (frame - delay) % 40;
  if (frame < delay) return null;

  const opacity = interpolate(life, [0, 5, 25, 40], [0, 0.8, 0.5, 0], {
    extrapolateRight: "clamp",
  });
  const yOff = interpolate(life, [0, 40], [0, -120 * speed], {
    extrapolateRight: "clamp",
  });
  const size = interpolate(life, [0, 8, 40], [1, 4, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      className="absolute rounded-full"
      style={{
        left: x,
        top: y + yOff,
        width: size,
        height: size,
        backgroundColor: "#00e676",
        opacity,
        boxShadow: "0 0 8px rgba(0, 230, 118, 0.9)",
      }}
    />
  );
};

const sparks = [
  { x: 80, y: 1700, delay: 0, speed: 1.2 },
  { x: 200, y: 1650, delay: 5, speed: 0.9 },
  { x: 350, y: 1720, delay: 3, speed: 1.1 },
  { x: 500, y: 1680, delay: 8, speed: 1.0 },
  { x: 620, y: 1600, delay: 2, speed: 1.3 },
  { x: 750, y: 1750, delay: 10, speed: 0.8 },
  { x: 880, y: 1640, delay: 6, speed: 1.1 },
  { x: 960, y: 1710, delay: 12, speed: 1.0 },
  { x: 140, y: 1580, delay: 15, speed: 1.2 },
  { x: 430, y: 1550, delay: 9, speed: 0.9 },
  { x: 680, y: 1500, delay: 4, speed: 1.4 },
  { x: 820, y: 1560, delay: 14, speed: 1.0 },
];

export const V3Scene5CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entry
  const entryOpacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Flash
  const flash = interpolate(frame, [0, 3, 8], [0.3, 0.1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // fitbox logo drops in with impact
  const fitboxSpring = spring({
    frame: frame - 3,
    fps,
    config: { damping: 7, stiffness: 280, mass: 0.4 },
  });

  // "Barmbek" slides in
  const barmbekSpring = spring({
    frame: frame - 12,
    fps,
    config: { damping: 8, stiffness: 250, mass: 0.4 },
  });

  // "JETZT GRATIS TESTEN" button
  const buttonSpring = spring({
    frame: frame - 22,
    fps,
    config: { damping: 8, stiffness: 200, mass: 0.4 },
  });

  // "powered by" + pure logo
  const poweredSpring = spring({
    frame: frame - 32,
    fps,
    config: { damping: 12, stiffness: 150, mass: 0.5 },
  });

  // Button pulse - aggressive
  const buttonPulse = interpolate(
    (frame - 25) % 18,
    [0, 9, 18],
    [10, 28, 10],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const buttonScale = interpolate(
    (frame - 25) % 18,
    [0, 9, 18],
    [1, 1.06, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      className="bg-brand-dark flex items-center justify-center"
      style={{ opacity: entryOpacity }}
    >
      {/* Flash */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: `rgba(0, 230, 118, ${flash})`,
          zIndex: 10,
          pointerEvents: "none",
        }}
      />

      {/* Sparks */}
      {sparks.map((s, i) => (
        <Spark key={i} {...s} frame={frame} />
      ))}

      {/* Energy gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(0, 230, 118, 0.08) 0%, transparent 60%)",
        }}
      />

      <div className="flex flex-col items-center px-10">
        {/* fitbox logo */}
        <div
          style={{
            transform: `scale(${interpolate(
              fitboxSpring,
              [0, 1],
              [2.5, 1]
            )})`,
            opacity: fitboxSpring,
            filter: `drop-shadow(0 0 20px rgba(61, 139, 55, 0.4))`,
          }}
        >
          <FitboxLogo width={650} />
        </div>

        {/* "Barmbek" */}
        <div
          className="mt-4"
          style={{
            transform: `translateX(${interpolate(
              barmbekSpring,
              [0, 1],
              [150, 0]
            )}px)`,
            opacity: barmbekSpring,
          }}
        >
          <span
            className="font-sans font-black text-7xl"
            style={{
              color: "#3d8b37",
              letterSpacing: "0.12em",
            }}
          >
            BARMBEK
          </span>
        </div>

        {/* CTA Button */}
        <div
          className="mt-12"
          style={{
            transform: `scale(${
              interpolate(buttonSpring, [0, 1], [0.3, 1]) * buttonScale
            })`,
            opacity: buttonSpring,
          }}
        >
          <div
            className="px-14 py-7 rounded-full"
            style={{
              backgroundColor: "#00e676",
              boxShadow: `0 0 ${buttonPulse * buttonSpring}px rgba(0, 230, 118, 0.7), 0 4px 24px rgba(0, 230, 118, 0.4)`,
            }}
          >
            <span
              className="font-sans font-black text-brand-dark"
              style={{ fontSize: 38 }}
            >
              JETZT GRATIS TESTEN
            </span>
          </div>
        </div>

        {/* Divider */}
        <div
          className="mt-10 h-px rounded-full"
          style={{
            width: interpolate(poweredSpring, [0, 1], [0, 350]),
            backgroundColor: "rgba(255, 255, 255, 0.12)",
          }}
        />

        {/* powered by + pure fitness logo */}
        <div
          className="mt-5"
          style={{
            opacity: poweredSpring * 0.8,
            transform: `translateY(${interpolate(
              poweredSpring,
              [0, 1],
              [20, 0]
            )}px)`,
          }}
        >
          <span className="font-sans text-lg text-gray-500 block text-center mb-3">
            powered by
          </span>
          <div className="flex justify-center">
            <PureFitnessLogo width={340} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
