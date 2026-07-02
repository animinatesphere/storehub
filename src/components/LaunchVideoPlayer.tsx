"use client";

import { Player } from "@remotion/player";
import { LaunchVideo } from "@/remotion/LaunchVideo";

export default function LaunchVideoPlayer() {
  return (
    <Player
      component={LaunchVideo}
      compositionWidth={1920}
      compositionHeight={1080}
      durationInFrames={300}
      fps={30}
      style={{ width: "100%", borderRadius: "1rem" }}
      loop
      autoPlay
      initiallyMuted
      controls
      acknowledgeRemotionLicense
    />
  );
}
