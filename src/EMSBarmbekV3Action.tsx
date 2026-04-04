import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { V3Scene1Impact } from "./scenes/V3Scene1Impact";
import { V3Scene2Problem } from "./scenes/V3Scene2Problem";
import { V3Scene3Power } from "./scenes/V3Scene3Power";
import { V3Scene4Stats } from "./scenes/V3Scene4Stats";
import { V3Scene5CTA } from "./scenes/V3Scene5CTA";

// 18 seconds at 30fps = 540 frames total
// Scene 1: 0–3s     (frames 0–90)    Impact hook with screen shake
// Scene 2: 3–5.5s   (frames 90–165)  Problem slam with strikethrough
// Scene 3: 5.5–9.5s (frames 165–285) EMS Power with electric burst
// Scene 4: 9.5–13s  (frames 285–390) Rapid-fire stats
// Scene 5: 13–18s   (frames 390–540) CTA with logos

export const EMSBarmbekV3Action: React.FC = () => {
  return (
    <AbsoluteFill className="bg-brand-dark">
      <Sequence from={0} durationInFrames={90} name="Impact">
        <V3Scene1Impact />
      </Sequence>

      <Sequence from={90} durationInFrames={85} name="Problem">
        <V3Scene2Problem />
      </Sequence>

      <Sequence from={170} durationInFrames={120} name="EMSPower">
        <V3Scene3Power />
      </Sequence>

      <Sequence from={285} durationInFrames={115} name="Stats">
        <V3Scene4Stats />
      </Sequence>

      <Sequence from={390} durationInFrames={150} name="CTA">
        <V3Scene5CTA />
      </Sequence>
    </AbsoluteFill>
  );
};
