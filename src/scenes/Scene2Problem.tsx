import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const Scene2Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade in
  const entryOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 14, stiffness: 150, mass: 0.6 },
  });

  const subtitleSpring = spring({
    frame: frame - 25,
    fps,
    config: { damping: 14, stiffness: 150, mass: 0.6 },
  });

  // Exit fade
  const exitOpacity = interpolate(frame, [80, 90], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      className="bg-brand-dark flex items-center justify-center"
      style={{ opacity: entryOpacity * exitOpacity }}
    >
      <div className="flex flex-col items-center px-16">
        {/* Main question */}
        <div
          className="text-center"
          style={{
            transform: `translateY(${interpolate(
              titleSpring,
              [0, 1],
              [50, 0]
            )}px)`,
            opacity: titleSpring,
          }}
        >
          <span className="font-sans font-bold text-7xl text-white leading-tight block">
            Keine Zeit für
          </span>
          <span className="font-sans font-bold text-7xl text-white leading-tight block mt-2">
            langes Training?
          </span>
        </div>

        {/* Subtitle with attitude */}
        <div
          className="text-center mt-14"
          style={{
            transform: `translateX(${interpolate(
              subtitleSpring,
              [0, 1],
              [-40, 0]
            )}px)`,
            opacity: subtitleSpring,
          }}
        >
          <span
            className="font-sans font-semibold text-5xl"
            style={{ color: "#00e676" }}
          >
            Wir auch nicht.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
