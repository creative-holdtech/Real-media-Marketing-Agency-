import "./index.css";
import { Composition } from "remotion";
import { DURATION, FPS, ServicesCardsCinematic } from "./ServicesCardsCinematic";
import { DURATION_3D, ServicesCards3D } from "./ServicesCards3D";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ServicesCards"
        component={ServicesCardsCinematic}
        durationInFrames={DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="ServicesCards3D"
        component={ServicesCards3D}
        durationInFrames={DURATION_3D}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
