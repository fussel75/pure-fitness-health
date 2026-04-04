import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Problem } from "./scenes/Scene2Problem";
import { Scene3Solution } from "./scenes/Scene3Solution";
import { Scene4SocialProof } from "./scenes/Scene4SocialProof";
import { Scene5CTA } from "./scenes/Scene5CTA";

// 15 seconds at 30fps = 450 frames total
// Scene 1: 0–2s   (frames 0–60)
// Scene 2: 2–5s   (frames 60–150)
// Scene 3: 5–9s   (frames 150–270)
// Scene 4: 9–12s  (frames 270–360)
// Scene 5: 12–15s (frames 360–450)

export const EMSPromoVideo: React.FC = () => {
  return (
    <AbsoluteFill className="bg-brand-dark">
      <Sequence from={0} durationInFrames={60} name="Hook">
        <Scene1Hook />
      </Sequence>

      <Sequence from={60} durationInFrames={90} name="Problem">
        <Scene2Problem />
      </Sequence>

      <Sequence from={150} durationInFrames={120} name="Solution">
        <Scene3Solution />
      </Sequence>

      <Sequence from={270} durationInFrames={90} name="SocialProof">
        <Scene4SocialProof />
      </Sequence>

      <Sequence from={360} durationInFrames={90} name="CTA">
        <Scene5CTA />
      </Sequence>
    </AbsoluteFill>
  );
};
