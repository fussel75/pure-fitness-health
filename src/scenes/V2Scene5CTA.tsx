import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Floating spark particles
const Particle: React.FC<{
  x: number;
  y: number;
  delay: number;
  frame: number;
  fps: number;
}> = ({ x, y, delay, frame, fps }) => {
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
        backgroundColor: "#00e676",
        opacity,
        boxShadow: "0 0 6px rgba(0, 230, 118, 0.8)",
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

export const V2Scene5CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entryOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Logo text - spaced letters
  const logoSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 12, stiffness: 160, mass: 0.5 },
  });

  // Location badge
  const badgeSpring = spring({
    frame: frame - 20,
    fps,
    config: { damping: 10, stiffness: 180, mass: 0.4 },
  });

  // CTA button
  const buttonSpring = spring({
    frame: frame - 30,
    fps,
    config: { damping: 12, stiffness: 150, mass: 0.5 },
  });

  // Button pulse
  const buttonPulse = interpolate(
    (frame - 35) % 25,
    [0, 12, 25],
    [8, 22, 8],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const buttonScale = interpolate(
    (frame - 35) % 25,
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
          fps={fps}
        />
      ))}

      {/* Ambient glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 65%, rgba(0, 230, 118, 0.06) 0%, transparent 50%)",
        }}
      />

      <div className="flex flex-col items-center px-10">
        {/* Logo-style studio name */}
        <div
          className="text-center"
          style={{
            transform: `translateY(${interpolate(
              logoSpring,
              [0, 1],
              [50, 0]
            )}px)`,
            opacity: logoSpring,
          }}
        >
          <span
            className="font-sans font-black text-6xl text-white block"
            style={{ letterSpacing: "0.15em" }}
          >
            PURE FITNESS
          </span>
          <span
            className="font-sans font-bold text-5xl block mt-2"
            style={{ color: "#00e676", letterSpacing: "0.2em" }}
          >
            & HEALTH
          </span>
        </div>

        {/* Location badge */}
        <div
          className="mt-8"
          style={{
            transform: `scale(${interpolate(
              badgeSpring,
              [0, 1],
              [0.5, 1]
            )})`,
            opacity: badgeSpring,
          }}
        >
          <div
            className="px-10 py-3 rounded-full border-2"
            style={{ borderColor: "#00e676" }}
          >
            <span
              className="font-sans font-semibold text-3xl"
              style={{ color: "#00e676", letterSpacing: "0.3em" }}
            >
              · BARMBEK ·
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <div
          className="mt-14"
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
              backgroundColor: "#00e676",
              boxShadow: `0 0 ${buttonPulse * buttonSpring}px rgba(0, 230, 118, 0.6), 0 4px 20px rgba(0, 230, 118, 0.3)`,
            }}
          >
            <span className="font-sans font-black text-4xl text-brand-dark">
              Jetzt testen
            </span>
          </div>
        </div>

        {/* Website */}
        <div
          className="mt-8"
          style={{
            opacity: interpolate(buttonSpring, [0.5, 1], [0, 0.5], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <span className="font-sans text-xl text-gray-500">
            www.pure-fitness-health.de
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
