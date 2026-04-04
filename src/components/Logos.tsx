import React from "react";

/**
 * fitbox logo - accurate recreation.
 * Green rounded rectangle with "fi" + top of "t" as white cutout inside.
 * "t" extends below the box. "box" in green next to it.
 * Color: forest green #3d8b37
 */
export const FitboxLogo: React.FC<{ width?: number; bgColor?: string }> = ({
  width = 600,
  bgColor = "#0a0a0a",
}) => {
  const aspectRatio = 600 / 200;
  const height = width / aspectRatio;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 600 200"
      fill="none"
    >
      <defs>
        {/* Mask: green box with letters cut out */}
        <mask id="fitbox-mask">
          {/* White = visible (the green box) */}
          <rect x="0" y="0" width="210" height="155" rx="18" fill="white" />
          {/* Black = cut out (the letters inside the box) */}

          {/* "f" letter cutout */}
          {/* Vertical stroke */}
          <rect x="28" y="55" width="22" height="110" rx="2" fill="black" />
          {/* Top curve of f */}
          <path
            d="M39 55 C39 30, 55 15, 78 15"
            stroke="black"
            strokeWidth="22"
            fill="none"
            strokeLinecap="round"
          />
          {/* Horizontal crossbar of f */}
          <rect x="18" y="72" width="65" height="18" rx="2" fill="black" />

          {/* "i" letter cutout */}
          {/* Dot */}
          <circle cx="107" cy="28" r="12" fill="black" />
          {/* Vertical stroke */}
          <rect x="96" y="55" width="22" height="110" rx="2" fill="black" />

          {/* "t" letter cutout - only top part inside the box */}
          {/* Vertical stroke */}
          <rect x="140" y="20" width="20" height="140" rx="2" fill="black" />
          {/* Horizontal crossbar of t */}
          <rect x="125" y="55" width="55" height="18" rx="2" fill="black" />
        </mask>
      </defs>

      {/* Green box with letters cut out */}
      <rect
        x="0"
        y="0"
        width="210"
        height="155"
        rx="18"
        fill="#3d8b37"
        mask="url(#fitbox-mask)"
      />

      {/* "t" stem extending below the box in green */}
      <rect x="140" y="155" width="20" height="30" rx="2" fill="#3d8b37" />
      {/* "t" bottom curve */}
      <path
        d="M160 175 C160 192, 172 195, 185 190"
        stroke="#3d8b37"
        strokeWidth="18"
        fill="none"
        strokeLinecap="round"
      />

      {/* "b" */}
      <g transform="translate(220, 0)">
        {/* Vertical stem */}
        <rect x="10" y="10" width="20" height="180" rx="2" fill="#3d8b37" />
        {/* Bowl of b */}
        <path
          d="M30 90 C30 60, 70 50, 90 70 C110 90, 110 140, 90 160 C70 180, 30 170, 30 140 Z"
          fill="#3d8b37"
        />
      </g>

      {/* "o" */}
      <g transform="translate(335, 55)">
        <ellipse
          cx="45"
          cy="65"
          rx="45"
          ry="60"
          fill="#3d8b37"
        />
{/* Inner cutout for "o" - uses background color */}
        <ellipse
          cx="45"
          cy="65"
          rx="22"
          ry="35"
          fill={bgColor}
        />
      </g>

      {/* "x" */}
      <g transform="translate(430, 60)">
        <path
          d="M5 10 L65 120"
          stroke="#3d8b37"
          strokeWidth="22"
          strokeLinecap="round"
        />
        <path
          d="M65 10 L5 120"
          stroke="#3d8b37"
          strokeWidth="22"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};

/**
 * Pure Fitness & Health GmbH logo - accurate recreation.
 * "pure" in dark gray with gymnast silhouette on the "e".
 * Gymnast does L-sit/support hold with legs extended up-right.
 * "- fitness & health -" below, "GmbH" vertical right.
 */
export const PureFitnessLogo: React.FC<{
  width?: number;
  color?: string;
}> = ({ width = 500, color = "#404040" }) => {
  const aspectRatio = 500 / 280;
  const height = width / aspectRatio;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 500 280"
      fill="none"
    >
      {/* ===== Gymnast silhouette on top of the "e" ===== */}
      <g transform="translate(285, 0)">
        {/* The gymnast is doing an L-sit/support hold:
            - Arms straight down (hands on the "e")
            - Body angled forward
            - Legs extended up and to the right */}

        {/* Right leg - extended far up-right */}
        <path
          d="M55 68 C60 55, 75 30, 110 8 C120 2, 130 0, 138 5"
          stroke={color}
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
        />
        {/* Left leg - extended up-right, slightly lower */}
        <path
          d="M50 72 C55 60, 68 42, 100 25 C108 20, 118 22, 122 28"
          stroke={color}
          strokeWidth="11"
          fill="none"
          strokeLinecap="round"
        />

        {/* Torso - leaning forward from hips */}
        <path
          d="M35 108 C38 100, 42 88, 50 75"
          stroke={color}
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
        />

        {/* Head */}
        <circle cx="58" cy="62" r="12" fill={color} />

        {/* Left arm - straight down to support point */}
        <path
          d="M38 95 L25 130"
          stroke={color}
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
        />
        {/* Right arm */}
        <path
          d="M42 95 L35 130"
          stroke={color}
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
        />

        {/* Hands/support point on top of the "e" */}
        <path
          d="M22 128 L38 128"
          stroke={color}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* ===== "pure" text ===== */}
      {/* p */}
      <g transform="translate(8, 130)">
        {/* Stem */}
        <rect x="0" y="-5" width="18" height="110" rx="1" fill={color} />
        {/* Bowl */}
        <path
          d="M18 0 C18 -15, 30 -25, 50 -25 C70 -25, 82 -10, 82 10
             C82 30, 70 45, 50 45 C30 45, 18 35, 18 20"
          fill={color}
        />
        {/* Inner bowl cutout */}
        <ellipse cx="52" cy="12" rx="18" ry="20" fill="black" fillOpacity="0" />
      </g>

      {/* Using text for cleaner rendering */}
      <text
        x="5"
        y="195"
        fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
        fontSize="120"
        fontWeight="300"
        fill={color}
        letterSpacing="-4"
      >
        pure
      </text>

      {/* ===== "- fitness & health -" subtitle ===== */}
      <text
        x="12"
        y="240"
        fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
        fontSize="30"
        fontWeight="300"
        fill={color}
        letterSpacing="3"
      >
        - fitness &amp; health -
      </text>

      {/* ===== "GmbH" vertical on the right ===== */}
      <text
        x="390"
        y="125"
        fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
        fontSize="28"
        fontWeight="300"
        fill={color}
        letterSpacing="2"
        transform="rotate(90, 390, 125)"
      >
        GmbH
      </text>
    </svg>
  );
};
