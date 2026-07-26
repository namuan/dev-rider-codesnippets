import "./index.css";
import { Composition } from "remotion";
import {MyVideo} from "./HelloWorld/MyVideo";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="MyVideo"
        component={MyVideo}
        durationInFrames={600} // total length of output video
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
