import React from "react";

/**
 * fitbox logo recreation based on original branding.
 * Green text "fitbox" with distinctive square bracket element.
 */
export const FitboxLogo: React.FC<{ width?: number }> = ({ width = 500 }) => {
  const scale = width / 500;

  return (
    <svg
      width={width}
      height={120 * scale}
      viewBox="0 0 500 120"
      fill="none"
    >
      {/* Green bracket/box element on the left */}
      <rect
        x="0"
        y="10"
        width="18"
        height="100"
        rx="2"
        fill="#76B82A"
      />
      <rect
        x="0"
        y="10"
        width="50"
        height="18"
        rx="2"
        fill="#76B82A"
      />
      <rect
        x="0"
        y="92"
        width="50"
        height="18"
        rx="2"
        fill="#76B82A"
      />

      {/* "fit" text */}
      <text
        x="58"
        y="95"
        fontFamily="Inter, Helvetica, Arial, sans-serif"
        fontSize="95"
        fontWeight="700"
        fill="#76B82A"
        letterSpacing="-2"
      >
        fit
      </text>

      {/* "box" text */}
      <text
        x="205"
        y="95"
        fontFamily="Inter, Helvetica, Arial, sans-serif"
        fontSize="95"
        fontWeight="700"
        fill="#76B82A"
        letterSpacing="-2"
      >
        box
      </text>
    </svg>
  );
};

/**
 * Pure Fitness & Health GmbH logo recreation.
 * "pure" text with gymnast silhouette + "- fitness & health - GmbH"
 */
export const PureFitnessLogo: React.FC<{ width?: number }> = ({
  width = 440,
}) => {
  const scale = width / 440;

  return (
    <svg
      width={width}
      height={200 * scale}
      viewBox="0 0 440 200"
      fill="none"
    >
      {/* Gymnast silhouette - doing a handstand/pose on the "e" */}
      <g transform="translate(270, 10)">
        {/* Head */}
        <circle cx="30" cy="50" r="10" fill="#555555" />
        {/* Body - leaning pose */}
        <path
          d="M30 60 L25 95"
          stroke="#555555"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* Right leg - extended up */}
        <path
          d="M28 70 L55 20 L70 5"
          stroke="#555555"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Left leg */}
        <path
          d="M27 80 L45 55"
          stroke="#555555"
          strokeWidth="5"
          strokeLinecap="round"
        />
        {/* Arms */}
        <path
          d="M28 68 L10 55"
          stroke="#555555"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M28 68 L15 80"
          stroke="#555555"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </g>

      {/* "pure" text - large lowercase */}
      <text
        x="10"
        y="140"
        fontFamily="Inter, Helvetica, Arial, sans-serif"
        fontSize="110"
        fontWeight="600"
        fill="#555555"
        letterSpacing="-3"
      >
        pure
      </text>

      {/* "- fitness & health -" subtitle */}
      <text
        x="18"
        y="175"
        fontFamily="Inter, Helvetica, Arial, sans-serif"
        fontSize="28"
        fontWeight="400"
        fill="#555555"
        letterSpacing="2"
      >
        - fitness &amp; health -
      </text>

      {/* "GmbH" vertical text on the right */}
      <text
        x="365"
        y="100"
        fontFamily="Inter, Helvetica, Arial, sans-serif"
        fontSize="24"
        fontWeight="400"
        fill="#555555"
        letterSpacing="1"
        transform="rotate(90, 365, 100)"
      >
        GmbH
      </text>
    </svg>
  );
};
