import React from "react";
import { Img, staticFile } from "remotion";

/**
 * fitbox logo - uses the original SVG from public/logo-fitbox.svg
 */
export const FitboxLogo: React.FC<{ width?: number }> = ({ width = 550 }) => {
  return (
    <Img
      src={staticFile("logo-fitbox.svg")}
      width={width}
      style={{ objectFit: "contain" }}
    />
  );
};

/**
 * Pure Fitness & Health GmbH logo - uses the original SVG from public/pure-logo.svg
 */
export const PureFitnessLogo: React.FC<{ width?: number }> = ({
  width = 320,
}) => {
  return (
    <Img
      src={staticFile("pure-logo-light.svg")}
      width={width}
      style={{ objectFit: "contain" }}
    />
  );
};
