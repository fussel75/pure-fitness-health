import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const words = ["Das", "beste", "Training", "deines", "Lebens"];

export const V2Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const exitOpacity = interpolate(frame, [75, 90], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Background glow intensity
  const glowPulse = interpolate(frame, [20, 40, 60, 80], [0, 0.12, 0.08, 0.12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      className="bg-brand-dark flex items-center justify-center"
      style={{ opacity: exitOpacity }}
    >
      {/* Neon glow behind text */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0, 230, 118, ${glowPulse}) 0%, transparent 70%)`,
        }}
      />

      <div className="flex flex-col items-center px-14">
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          {words.map((word, i) => {
            const wordSpring = spring({
              frame: frame - i * 5,
              fps,
              config: { damping: 10, stiffness: 180, mass: 0.5 },
            });

            const isHighlight = word === "beste" || word === "Training";

            return (
              <span
                key={i}
                className={`font-sans font-black ${
                  isHighlight ? "text-8xl" : "text-7xl"
                }`}
                style={{
                  color: isHighlight ? "#00e676" : "#ffffff",
                  transform: `translateY(${interpolate(
                    wordSpring,
                    [0, 1],
                    [60, 0]
                  )}px) scale(${interpolate(wordSpring, [0, 1], [0.7, 1])})`,
                  opacity: wordSpring,
                  textShadow: isHighlight
                    ? "0 0 20px rgba(0, 230, 118, 0.5)"
                    : "none",
                  display: "inline-block",
                }}
              >
                {word}
              </span>
            );
          })}
        </div>

        {/* Accent line */}
        <div
          className="mt-10 h-1.5 rounded-full"
          style={{
            backgroundColor: "#00e676",
            width: interpolate(
              spring({ frame: frame - 25, fps, config: { damping: 12, stiffness: 150 } }),
              [0, 1],
              [0, 300]
            ),
            boxShadow: "0 0 15px rgba(0, 230, 118, 0.5)",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
