import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const Scene5CTA: React.FC = () => {
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

  const gratisSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 8, stiffness: 180, mass: 0.4 },
  });

  const buttonSpring = spring({
    frame: frame - 30,
    fps,
    config: { damping: 12, stiffness: 150, mass: 0.5 },
  });

  const studioSpring = spring({
    frame: frame - 25,
    fps,
    config: { damping: 14, stiffness: 150, mass: 0.6 },
  });

  // Pulsing button glow
  const buttonPulse = interpolate(
    (frame - 30) % 30,
    [0, 15, 30],
    [8, 20, 8],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const buttonScale = interpolate(
    (frame - 30) % 30,
    [0, 15, 30],
    [1, 1.03, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      className="bg-brand-dark flex items-center justify-center"
      style={{ opacity: entryOpacity }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 60%, rgba(0, 230, 118, 0.08) 0%, transparent 50%)`,
        }}
      />

      <div className="flex flex-col items-center px-14">
        {/* Probetraining */}
        <div
          className="text-center"
          style={{
            transform: `translateY(${interpolate(
              titleSpring,
              [0, 1],
              [60, 0]
            )}px)`,
            opacity: titleSpring,
          }}
        >
          <span className="font-sans font-bold text-6xl text-white block">
            Probetraining
          </span>
        </div>

        {/* GRATIS badge */}
        <div
          className="mt-6"
          style={{
            transform: `scale(${interpolate(
              gratisSpring,
              [0, 1],
              [0.3, 1]
            )})`,
            opacity: gratisSpring,
          }}
        >
          <span
            className="font-sans font-black text-9xl block"
            style={{
              color: "#00e676",
              textShadow: "0 0 30px rgba(0, 230, 118, 0.5)",
            }}
          >
            GRATIS
          </span>
        </div>

        {/* Studio name */}
        <div
          className="text-center mt-10"
          style={{
            transform: `translateY(${interpolate(
              studioSpring,
              [0, 1],
              [20, 0]
            )}px)`,
            opacity: studioSpring,
          }}
        >
          <span className="font-sans font-semibold text-3xl text-gray-400 block">
            Pure Fitness & Health
          </span>
          <span className="font-sans font-normal text-2xl text-gray-500 block mt-2">
            Barmbek · Hamburg
          </span>
        </div>

        {/* CTA Button */}
        <div
          className="mt-14"
          style={{
            transform: `scale(${interpolate(
              buttonSpring,
              [0, 1],
              [0.5, 1]
            ) * buttonScale})`,
            opacity: buttonSpring,
          }}
        >
          <div
            className="px-16 py-7 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: "#00e676",
              boxShadow: `0 0 ${buttonPulse * buttonSpring}px rgba(0, 230, 118, 0.6), 0 4px 20px rgba(0, 230, 118, 0.3)`,
            }}
          >
            <span className="font-sans font-black text-4xl text-brand-dark">
              Jetzt buchen
            </span>
          </div>
        </div>

        {/* Contact info */}
        <div
          className="mt-10"
          style={{
            opacity: interpolate(buttonSpring, [0.5, 1], [0, 0.6], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <span className="font-sans text-xl text-gray-500 block text-center">
            www.pure-fitness-health.de
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
