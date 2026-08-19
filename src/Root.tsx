import React from "react";
import { Composition } from "remotion";
import { loadFont as loadAnton } from "@remotion/google-fonts/Anton";
import { loadFont as loadBarlow } from "@remotion/google-fonts/BarlowCondensed";
import { Reels } from "./Reels";
import { FPS, TOTAL_FRAMES } from "./style";

loadAnton();
loadBarlow();

export const RemotionRoot: React.FC = () => (
  <Composition
    id="Reels"
    component={Reels}
    durationInFrames={TOTAL_FRAMES}
    fps={FPS}
    width={1080}
    height={1920}
  />
);
