import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Electric bolt burst
const BoltBurst: React.FC<{ progress: number }> = ({ progress }) => {
  const bolts = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <svg
      width="600"
      height="600"
      viewBox="0 0 600 600"
      style={{
        opacity: progress,
        transform: `scale(${0.5 + progress * 0.5})`,
      }}
    >
      {bolts.map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const inner = 80;
        const outer = 150 + progress * 100;
        return (
          <line
            key={i}
            x1={300 + Math.cos(rad) * inner}
            y1={300 + Math.sin(rad) * inner}
            x2={300 + Math.cos(rad) * outer}
            y2={300 + Math.sin(rad) * outer}
            stroke="#00e676"
            strokeWidth={4}
            strokeLinecap="round"
            style={{
              filter: "drop-shadow(0 0 8px rgba(0, 230, 118, 0.8))",
            }}
          />
        );
      })}
      {/* Center ring */}
      <circle
        cx="300"
        cy="300"
        r={60 + progress * 30}
        fill="none"
        stroke="#00e676"
        strokeWidth="3"
        opacity={1 - progress * 0.5}
        style={{
          filter: "drop-shadow(0 0 12px rgba(0, 230, 118, 0.6))",
        }}
      />
    </svg>
  );
};

export const V3Scene3Power: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entry flash
  const flash = interpolate(frame, [0, 3, 8], [0.5, 0.2, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "EMS" slams in huge
  const emsSpring = spring({
    frame: frame - 3,
    fps,
    config: { damping: 6, stiffness: 350, mass: 0.3 },
  });

  // "TRAINING" slides up
  const trainingSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 8, stiffness: 280, mass: 0.4 },
  });

  // Feature pills appear one by one
  const features = ["Kabellos", "Intensiv", "Effektiv"];
  const featureSprings = features.map((_, i) =>
    spring({
      frame: frame - 25 - i * 6,
      fps,
      config: { damping: 8, stiffness: 250, mass: 0.3 },
    })
  );

  // Electric burst
  const burstProgress = interpolate(frame, [3, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const burstOpacity = interpolate(frame, [3, 10, 20], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulsing glow
  const pulseGlow = interpolate(frame % 20, [0, 10, 20], [15, 30, 15]);

  // Screen shake
  const shakeX =
    frame >= 3 && frame < 12
      ? interpolate(frame, [3, 5, 7, 9, 11], [0, -10, 8, -4, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;

  // Exit
  const exitOpacity = interpolate(frame, [110, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-brand-dark" style={{ opacity: exitOpacity }}>
      {/* Flash */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: `rgba(0, 230, 118, ${flash})`,
          zIndex: 10,
          pointerEvents: "none",
        }}
      />

      {/* Radial energy background */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 40%, rgba(0, 230, 118, 0.1) 0%, transparent 50%)`,
        }}
      />

      <div
        className="flex flex-col items-center justify-center h-full px-10"
        style={{ transform: `translateX(${shakeX}px)` }}
      >
        {/* Electric burst behind text */}
        <div
          className="absolute"
          style={{ top: "25%", opacity: burstOpacity }}
        >
          <BoltBurst progress={burstProgress} />
        </div>

        {/* "EMS" mega text */}
        <div
          style={{
            transform: `scale(${interpolate(emsSpring, [0, 1], [4, 1])})`,
            opacity: emsSpring,
          }}
        >
          <span
            className="font-sans font-black block text-center"
            style={{
              fontSize: 200,
              color: "#00e676",
              textShadow: `0 0 ${pulseGlow}px rgba(0, 230, 118, 0.6)`,
              letterSpacing: "0.1em",
              lineHeight: 0.85,
            }}
          >
            EMS
          </span>
        </div>

        {/* "TRAINING" */}
        <div
          style={{
            transform: `translateY(${interpolate(
              trainingSpring,
              [0, 1],
              [80, 0]
            )}px)`,
            opacity: trainingSpring,
          }}
        >
          <span
            className="font-sans font-bold text-white block text-center"
            style={{
              fontSize: 80,
              letterSpacing: "0.2em",
            }}
          >
            TRAINING
          </span>
        </div>

        {/* Feature pills */}
        <div className="flex flex-row gap-6 mt-14">
          {features.map((feat, i) => (
            <div
              key={feat}
              style={{
                transform: `translateY(${interpolate(
                  featureSprings[i],
                  [0, 1],
                  [40, 0]
                )}px) scale(${interpolate(
                  featureSprings[i],
                  [0, 1],
                  [0.5, 1]
                )})`,
                opacity: featureSprings[i],
              }}
            >
              <div
                className="px-8 py-4 rounded-full border-2"
                style={{
                  borderColor: "#00e676",
                  boxShadow: "0 0 10px rgba(0, 230, 118, 0.2)",
                }}
              >
                <span
                  className="font-sans font-bold text-3xl"
                  style={{ color: "#00e676" }}
                >
                  {feat}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
