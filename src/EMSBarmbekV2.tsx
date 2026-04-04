import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { V2Scene1Hook } from "./scenes/V2Scene1Hook";
import { V2Scene2Location } from "./scenes/V2Scene2Location";
import { V2Scene3Trainer } from "./scenes/V2Scene3Trainer";
import { V2Scene4Efficiency } from "./scenes/V2Scene4Efficiency";
import { V2Scene5CTA } from "./scenes/V2Scene5CTA";

// 18 seconds at 30fps = 540 frames total
// Scene 1: 0–3s   (frames 0–90)
// Scene 2: 3–7s   (frames 90–210)
// Scene 3: 7–11s  (frames 210–330)
// Scene 4: 11–15s (frames 330–450)
// Scene 5: 15–18s (frames 450–540)

export const EMSBarmbekV2: React.FC = () => {
  return (
    <AbsoluteFill className="bg-brand-dark">
      <Sequence from={0} durationInFrames={90} name="Hook">
        <V2Scene1Hook />
      </Sequence>

      <Sequence from={90} durationInFrames={120} name="Location">
        <V2Scene2Location />
      </Sequence>

      <Sequence from={210} durationInFrames={120} name="Trainer">
        <V2Scene3Trainer />
      </Sequence>

      <Sequence from={330} durationInFrames={120} name="Efficiency">
        <V2Scene4Efficiency />
      </Sequence>

      <Sequence from={450} durationInFrames={90} name="CTA">
        <V2Scene5CTA />
      </Sequence>
    </AbsoluteFill>
  );
};
