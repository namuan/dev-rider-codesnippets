import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';

export const AnimatedTextOverlay = ({
  text,
  from,
  durationInFrames,
  fadeInDuration = 30,
  style = {},
}) => {
  const frame = useCurrentFrame();

  // Calculate fade-in opacity
  const opacity = interpolate(frame, [from, from + fadeInDuration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          fontSize: 60,
          color: 'white',
          textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
          opacity,
          ...style, // allow overrides
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};