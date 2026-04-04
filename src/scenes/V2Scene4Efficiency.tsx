import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const V2Scene4Efficiency: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entryOpacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Countdown from 20 to 0 over ~80 frames
  const countdownProgress = interpolate(frame, [5, 85], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const displayNumber = Math.ceil(countdownProgress);

  // Timer circle progress (SVG circle)
  const circleProgress = interpolate(frame, [5, 85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Circle params
  const radius = 180;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - circleProgress);

  // Text reveal after countdown
  const textSpring = spring({
    frame: frame - 88,
    fps,
    config: { damping: 10, stiffness: 180, mass: 0.5 },
  });

  // Electric spark at countdown end
  const sparkOpacity = interpolate(frame, [83, 88, 95], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sparkScale = interpolate(frame, [83, 88, 95], [0.5, 1.3, 0.8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Glow intensifies as countdown nears 0
  const glowIntensity = interpolate(frame, [5, 85], [5, 30], {
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
      <div className="flex flex-col items-center px-14">
        {/* Timer circle with countdown */}
        <div className="relative flex items-center justify-center mb-12">
          <svg width="400" height="400" viewBox="0 0 400 400">
            {/* Background circle */}
            <circle
              cx="200"
              cy="200"
              r={radius}
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="8"
            />
            {/* Progress circle */}
            <circle
              cx="200"
              cy="200"
              r={radius}
              fill="none"
              stroke="#00e676"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90, 200, 200)"
              style={{
                filter: `drop-shadow(0 0 ${glowIntensity}px rgba(0, 230, 118, 0.6))`,
              }}
            />
          </svg>

          {/* Number in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="font-sans font-black"
              style={{
                fontSize: displayNumber === 0 ? 160 : 140,
                color: "#00e676",
                textShadow: `0 0 ${glowIntensity}px rgba(0, 230, 118, 0.6)`,
              }}
            >
              {displayNumber}
            </span>
          </div>

          {/* Electric spark burst */}
          {sparkOpacity > 0 && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: sparkOpacity }}
            >
              <svg
                width="400"
                height="400"
                viewBox="0 0 400 400"
                style={{ transform: `scale(${sparkScale})` }}
              >
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                  const rad = (angle * Math.PI) / 180;
                  const x1 = 200 + Math.cos(rad) * 120;
                  const y1 = 200 + Math.sin(rad) * 120;
                  const x2 = 200 + Math.cos(rad) * 190;
                  const y2 = 200 + Math.sin(rad) * 190;
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#00e676"
                      strokeWidth="3"
                      strokeLinecap="round"
                      style={{
                        filter: "drop-shadow(0 0 8px rgba(0, 230, 118, 0.8))",
                      }}
                    />
                  );
                })}
              </svg>
            </div>
          )}
        </div>

        {/* Text after countdown */}
        <div
          className="text-center"
          style={{
            transform: `translateY(${interpolate(
              textSpring,
              [0, 1],
              [40, 0]
            )}px) scale(${interpolate(textSpring, [0, 1], [0.8, 1])})`,
            opacity: textSpring,
          }}
        >
          <span className="font-sans font-black text-7xl text-white block">
            20 Minuten.
          </span>
          <span
            className="font-sans font-bold text-6xl block mt-4"
            style={{ color: "#00e676" }}
          >
            Das reicht.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
