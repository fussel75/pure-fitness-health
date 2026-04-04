import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const V3Scene2Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entry flash
  const flash = interpolate(frame, [0, 2, 6], [0.4, 0.2, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "Stundenlang im Gym?" appears
  const gymSpring = spring({
    frame: frame - 3,
    fps,
    config: { damping: 8, stiffness: 280, mass: 0.4 },
  });

  // Strikethrough animation
  const strikeWidth = interpolate(frame, [20, 30], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "VERGISS ES." slams in
  const vergissSpring = spring({
    frame: frame - 28,
    fps,
    config: { damping: 6, stiffness: 350, mass: 0.3 },
  });

  // Shake on "VERGISS ES"
  const vergissShake =
    frame >= 28 && frame < 38
      ? interpolate(
          frame,
          [28, 30, 32, 34, 36, 38],
          [0, -12, 10, -6, 3, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        )
      : 0;

  // Text fade to red on strikethrough
  const gymColor = interpolate(frame, [20, 30], [0.5, 0.25], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Exit
  const exitOpacity = interpolate(frame, [70, 80], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-brand-dark" style={{ opacity: exitOpacity }}>
      {/* Flash */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: `rgba(255, 255, 255, ${flash})`,
          zIndex: 10,
          pointerEvents: "none",
        }}
      />

      <div
        className="flex flex-col items-center justify-center h-full px-12"
        style={{ transform: `translateX(${vergissShake}px)` }}
      >
        {/* "Stundenlang im Gym?" with strikethrough */}
        <div
          className="relative"
          style={{
            transform: `translateX(${interpolate(
              gymSpring,
              [0, 1],
              [-200, 0]
            )}px)`,
            opacity: gymSpring,
          }}
        >
          <span
            className="font-sans font-bold text-6xl block text-center"
            style={{ color: `rgba(255, 255, 255, ${gymColor})` }}
          >
            Stundenlang im Gym?
          </span>
          {/* Animated strikethrough */}
          <div
            className="absolute top-1/2 left-0 h-1.5"
            style={{
              width: `${strikeWidth}%`,
              backgroundColor: "#ff4444",
              transform: "translateY(-50%)",
              boxShadow: "0 0 10px rgba(255, 68, 68, 0.5)",
            }}
          />
        </div>

        {/* "VERGISS ES." */}
        <div
          className="mt-10"
          style={{
            transform: `scale(${interpolate(
              vergissSpring,
              [0, 1],
              [3, 1]
            )}) rotate(${interpolate(vergissSpring, [0, 1], [-5, 0])}deg)`,
            opacity: vergissSpring,
          }}
        >
          <span
            className="font-sans font-black block text-center"
            style={{
              fontSize: 110,
              color: "#00e676",
              textShadow: "0 0 30px rgba(0, 230, 118, 0.5)",
              letterSpacing: "0.02em",
            }}
          >
            VERGISS ES.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
