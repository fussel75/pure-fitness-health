import React from "react";
import { Composition } from "remotion";
import { EMSPromoVideo } from "./EMSPromoVideo";
import { EMSBarmbekV2 } from "./EMSBarmbekV2";
import { EMSBarmbekV2Fitbox } from "./EMSBarmbekV2Fitbox";
import { EMSBarmbekV3Action } from "./EMSBarmbekV3Action";
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
      <Composition
        id="EMSBarmbekV2Fitbox"
        component={EMSBarmbekV2Fitbox}
        durationInFrames={540}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="EMSBarmbekV3Action"
        component={EMSBarmbekV3Action}
        durationInFrames={540}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
