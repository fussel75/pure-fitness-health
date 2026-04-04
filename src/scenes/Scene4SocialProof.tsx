import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const Star: React.FC<{ delay: number; frame: number; fps: number }> = ({
  delay,
  frame,
  fps,
}) => {
  const starSpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 8, stiffness: 200, mass: 0.3 },
  });

  const glowIntensity = interpolate(
    frame - delay,
    [0, 10, 20],
    [0, 15, 5],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill="#00e676"
      style={{
        transform: `scale(${interpolate(
          starSpring,
          [0, 1],
          [0, 1]
        )}) rotate(${interpolate(starSpring, [0, 1], [-180, 0])}deg)`,
        opacity: starSpring,
        filter: `drop-shadow(0 0 ${glowIntensity}px rgba(0, 230, 118, 0.8))`,
        marginLeft: 8,
        marginRight: 8,
      }}
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
};

export const Scene4SocialProof: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entryOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 14, stiffness: 150, mass: 0.6 },
  });

  const numberSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12, stiffness: 180, mass: 0.5 },
  });

  const exitOpacity = interpolate(frame, [80, 90], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      className="bg-brand-dark flex items-center justify-center"
      style={{ opacity: entryOpacity * exitOpacity }}
    >
      <div className="flex flex-col items-center px-14">
        {/* Number highlight */}
        <div
          className="text-center mb-8"
          style={{
            transform: `scale(${interpolate(
              numberSpring,
              [0, 1],
              [0.5, 1]
            )})`,
            opacity: numberSpring,
          }}
        >
          <span
            className="font-sans font-black text-9xl"
            style={{
              color: "#00e676",
              textShadow: "0 0 20px rgba(0, 230, 118, 0.4)",
            }}
          >
            500+
          </span>
        </div>

        {/* Text */}
        <div
          className="text-center"
          style={{
            transform: `translateY(${interpolate(
              textSpring,
              [0, 1],
              [40, 0]
            )}px)`,
            opacity: textSpring,
          }}
        >
          <span className="font-sans font-bold text-5xl text-white leading-snug block">
            zufriedene Mitglieder
          </span>
          <span className="font-sans font-semibold text-4xl text-gray-400 block mt-3">
            in Hamburg
          </span>
        </div>

        {/* Star rating */}
        <div className="flex flex-row items-center mt-14">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} delay={25 + i * 6} frame={frame} fps={fps} />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
