import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const V3Scene1Impact: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Screen shake on impact
  const shakeX =
    frame < 15
      ? interpolate(frame, [4, 6, 8, 10, 12, 14], [0, -15, 12, -8, 5, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;
  const shakeY =
    frame < 15
      ? interpolate(frame, [4, 6, 8, 10, 12, 14], [0, 8, -10, 6, -3, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;

  // Flash on entry
  const flash = interpolate(frame, [0, 3, 8], [1, 0.8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Line 1: "DEIN KÖRPER." slams in
  const line1Spring = spring({
    frame: frame - 3,
    fps,
    config: { damping: 8, stiffness: 300, mass: 0.4 },
  });

  // Line 2: "DEINE 20 MINUTEN." slams in after
  const line2Spring = spring({
    frame: frame - 14,
    fps,
    config: { damping: 8, stiffness: 300, mass: 0.4 },
  });

  // Accent bar
  const barSpring = spring({
    frame: frame - 24,
    fps,
    config: { damping: 6, stiffness: 400, mass: 0.3 },
  });

  // Exit - fast zoom out
  const exitScale = interpolate(frame, [70, 85], [1, 3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitOpacity = interpolate(frame, [70, 85], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-brand-dark" style={{ opacity: exitOpacity }}>
      {/* White flash overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: `rgba(0, 230, 118, ${flash * 0.3})`,
          zIndex: 10,
          pointerEvents: "none",
        }}
      />

      {/* Diagonal speed lines */}
      {frame > 3 && frame < 30 && (
        <div className="absolute inset-0 overflow-hidden" style={{ opacity: 0.06 }}>
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                width: 3,
                height: 600,
                backgroundColor: "#00e676",
                left: `${i * 5.5}%`,
                top: -100,
                transform: `rotate(${15 + Math.random() * 10}deg)`,
                opacity: interpolate(frame, [3, 10, 25, 30], [0, 1, 1, 0], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            />
          ))}
        </div>
      )}

      <div
        className="flex flex-col items-center justify-center h-full px-12"
        style={{
          transform: `translate(${shakeX}px, ${shakeY}px) scale(${exitScale})`,
        }}
      >
        {/* DEIN KÖRPER. */}
        <div
          style={{
            transform: `scale(${interpolate(line1Spring, [0, 1], [2.5, 1])})`,
            opacity: line1Spring,
          }}
        >
          <span
            className="font-sans font-black text-8xl text-white block text-center"
            style={{ letterSpacing: "0.05em" }}
          >
            DEIN KÖRPER.
          </span>
        </div>

        {/* Green accent bar */}
        <div
          className="my-6"
          style={{
            width: interpolate(barSpring, [0, 1], [0, 500]),
            height: 6,
            backgroundColor: "#00e676",
            boxShadow: "0 0 20px rgba(0, 230, 118, 0.6)",
          }}
        />

        {/* DEINE 20 MINUTEN. */}
        <div
          style={{
            transform: `scale(${interpolate(line2Spring, [0, 1], [2.5, 1])})`,
            opacity: line2Spring,
          }}
        >
          <span className="font-sans font-black text-7xl block text-center">
            <span className="text-white">DEINE </span>
            <span
              style={{
                color: "#00e676",
                textShadow: "0 0 25px rgba(0, 230, 118, 0.6)",
              }}
            >
              20 MIN.
            </span>
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
