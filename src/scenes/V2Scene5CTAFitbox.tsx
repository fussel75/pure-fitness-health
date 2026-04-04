import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FitboxLogo, PureFitnessLogo } from "../components/Logos";

// Floating spark particles
const Particle: React.FC<{
  x: number;
  y: number;
  delay: number;
  frame: number;
}> = ({ x, y, delay, frame }) => {
  const life = frame - delay;
  if (life < 0) return null;

  const opacity = interpolate(life, [0, 10, 30, 50], [0, 0.6, 0.4, 0], {
    extrapolateRight: "clamp",
  });
  const yOffset = interpolate(life, [0, 50], [0, -80], {
    extrapolateRight: "clamp",
  });
  const size = interpolate(life, [0, 15, 50], [2, 5, 2], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      className="absolute rounded-full"
      style={{
        left: x,
        top: y + yOffset,
        width: size,
        height: size,
        backgroundColor: "#3d8b37",
        opacity,
        boxShadow: "0 0 6px rgba(61, 139, 55, 0.8)",
      }}
    />
  );
};

const particles = [
  { x: 150, y: 1500, delay: 0 },
  { x: 300, y: 1600, delay: 8 },
  { x: 500, y: 1550, delay: 4 },
  { x: 700, y: 1620, delay: 12 },
  { x: 850, y: 1480, delay: 6 },
  { x: 200, y: 1700, delay: 15 },
  { x: 600, y: 1450, delay: 10 },
  { x: 900, y: 1580, delay: 18 },
  { x: 400, y: 1680, delay: 3 },
  { x: 750, y: 1520, delay: 20 },
];

export const V2Scene5CTAFitbox: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entryOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // fitbox logo entrance
  const fitboxSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 10, stiffness: 180, mass: 0.5 },
  });

  // "Barmbek" location text
  const barmbekSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 12, stiffness: 160, mass: 0.5 },
  });

  // CTA button
  const buttonSpring = spring({
    frame: frame - 25,
    fps,
    config: { damping: 12, stiffness: 150, mass: 0.5 },
  });

  // "powered by" + pure fitness logo
  const poweredBySpring = spring({
    frame: frame - 35,
    fps,
    config: { damping: 14, stiffness: 140, mass: 0.6 },
  });

  // Button pulse
  const buttonPulse = interpolate(
    (frame - 30) % 25,
    [0, 12, 25],
    [8, 22, 8],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const buttonScale = interpolate(
    (frame - 30) % 25,
    [0, 12, 25],
    [1, 1.04, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      className="bg-brand-dark flex items-center justify-center"
      style={{ opacity: entryOpacity }}
    >
      {/* Particle sparks */}
      {particles.map((p, i) => (
        <Particle
          key={i}
          x={p.x}
          y={p.y}
          delay={p.delay}
          frame={frame}
        />
      ))}

      {/* Ambient glow - fitbox green */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(61, 139, 55, 0.06) 0%, transparent 50%)",
        }}
      />

      <div className="flex flex-col items-center px-10">
        {/* fitbox logo */}
        <div
          style={{
            transform: `translateY(${interpolate(
              fitboxSpring,
              [0, 1],
              [50, 0]
            )}px) scale(${interpolate(fitboxSpring, [0, 1], [0.7, 1])})`,
            opacity: fitboxSpring,
            filter: `drop-shadow(0 0 15px rgba(61, 139, 55, 0.3))`,
          }}
        >
          <FitboxLogo width={600} />
        </div>

        {/* "Barmbek" location */}
        <div
          className="mt-6"
          style={{
            transform: `translateY(${interpolate(
              barmbekSpring,
              [0, 1],
              [30, 0]
            )}px)`,
            opacity: barmbekSpring,
          }}
        >
          <span
            className="font-sans font-bold text-6xl"
            style={{ color: "#3d8b37", letterSpacing: "0.15em" }}
          >
            Barmbek
          </span>
        </div>

        {/* CTA Button */}
        <div
          className="mt-12"
          style={{
            transform: `scale(${
              interpolate(buttonSpring, [0, 1], [0.5, 1]) * buttonScale
            })`,
            opacity: buttonSpring,
          }}
        >
          <div
            className="px-16 py-7 rounded-full"
            style={{
              backgroundColor: "#3d8b37",
              boxShadow: `0 0 ${buttonPulse * buttonSpring}px rgba(61, 139, 55, 0.6), 0 4px 20px rgba(61, 139, 55, 0.3)`,
            }}
          >
            <span className="font-sans font-black text-4xl text-brand-dark">
              Jetzt testen
            </span>
          </div>
        </div>

        {/* Divider line */}
        <div
          className="mt-12 h-px rounded-full"
          style={{
            width: interpolate(poweredBySpring, [0, 1], [0, 300]),
            backgroundColor: "rgba(255, 255, 255, 0.15)",
          }}
        />

        {/* "powered by" text */}
        <div
          className="mt-6"
          style={{
            opacity: poweredBySpring,
            transform: `translateY(${interpolate(
              poweredBySpring,
              [0, 1],
              [15, 0]
            )}px)`,
          }}
        >
          <span className="font-sans text-xl text-gray-500 block text-center mb-4">
            powered by
          </span>
          {/* Pure Fitness & Health GmbH logo */}
          <div className="flex justify-center" style={{ opacity: 0.7 }}>
            <PureFitnessLogo width={380} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
