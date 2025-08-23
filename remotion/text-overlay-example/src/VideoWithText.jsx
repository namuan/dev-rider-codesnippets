import { Video, Text, AbsoluteFill } from "remotion";

const VideoWithText = ({ text }) => {
  return (
    <AbsoluteFill>
      <Video src="/sample-video.mp4" />
      <Text
        style={{
          fontSize: 100,
          color: "white",
          textAlign: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
        }}
      >
        {text}
      </Text>
    </AbsoluteFill>
  );
};

export default VideoWithText;