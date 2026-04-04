import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const MapPin: React.FC<{ scale: number; opacity: number }> = ({
  scale,
  opacity,
}) => (
  <svg
    width="100"
    height="130"
    viewBox="0 0 100 130"
    fill="none"
    style={{ transform: `scale(${scale})`, opacity }}
  >
    <path
      d="M50 0C25 0 5 20 5 45C5 78 50 125 50 125S95 78 95 45C95 20 75 0 50 0Z"
      fill="#00e676"
    />
    <circle cx="50" cy="42" r="18" fill="#0a0a0a" />
  </svg>
);

// Subtle animated grid lines for city feel
const CityGrid: React.FC<{ progress: number }> = ({ progress }) => (
  <svg
    width="1080"
    height="1920"
    viewBox="0 0 1080 1920"
    className="absolute inset-0"
    style={{ opacity: progress * 0.08 }}
  >
    {/* Horizontal streets */}
    {[400, 600, 800, 1000, 1200, 1400].map((y, i) => (
      <line
        key={`h${i}`}
        x1="0"
        y1={y}
        x2={1080 * progress}
        y2={y}
        stroke="#00e676"
        strokeWidth="1"
      />
    ))}
    {/* Vertical streets */}
    {[200, 400, 540, 680, 880].map((x, i) => (
      <line
        key={`v${i}`}
        x1={x}
        y1={1920 * (1 - progress)}
        x2={x}
        y2="1920"
        stroke="#00e676"
        strokeWidth="1"
      />
    ))}
  </svg>
);

export const V2Scene2Location: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entryOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pin drops in with bounce
  const pinSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 8, stiffness: 200, mass: 0.6 },
  });

  const titleSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 12, stiffness: 160, mass: 0.5 },
  });

  const subtitleSpring = spring({
    frame: frame - 30,
    fps,
    config: { damping: 14, stiffness: 140, mass: 0.6 },
  });

  // Grid animation progress
  const gridProgress = interpolate(frame, [0, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitOpacity = interpolate(frame, [105, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      className="bg-brand-dark flex items-center justify-center"
      style={{ opacity: entryOpacity * exitOpacity }}
    >
      <CityGrid progress={gridProgress} />

      <div className="flex flex-col items-center px-14">
        {/* Map pin */}
        <div
          className="mb-10"
          style={{
            transform: `translateY(${interpolate(
              pinSpring,
              [0, 1],
              [-200, 0]
            )}px) scale(${pinSpring})`,
            opacity: pinSpring,
            filter: `drop-shadow(0 0 15px rgba(0, 230, 118, 0.4))`,
          }}
        >
          <MapPin scale={1} opacity={1} />
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
          <span className="font-sans font-black text-8xl text-white block">
            Mitten in
          </span>
          <span
            className="font-sans font-black text-8xl block mt-1"
            style={{
              color: "#00e676",
              textShadow: "0 0 20px rgba(0, 230, 118, 0.4)",
            }}
          >
            Barmbek
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
          <span className="font-sans font-semibold text-4xl text-gray-400">
            Zentral. Gut erreichbar. Kein Umweg.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
