import React from "react";
import { Composition } from "remotion";
import { EMSPromoVideo } from "./EMSPromoVideo";
import { EMSBarmbekV2 } from "./EMSBarmbekV2";
import "./style.css";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="EMSPromoVideo"
        component={EMSPromoVideo}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="EMSBarmbekV2"
        component={EMSBarmbekV2}
        durationInFrames={540}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
