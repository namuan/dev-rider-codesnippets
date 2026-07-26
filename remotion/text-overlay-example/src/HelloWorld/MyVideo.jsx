import {AbsoluteFill, OffthreadVideo, Sequence, staticFile} from 'remotion';
import {AnimatedTextOverlay} from './AnimatedTextOverlay';

export const MyVideo = () => {
  return (
    <AbsoluteFill>
      {/* Background video */}
      <OffthreadVideo src={staticFile('sample-video.mp4')} />

      {/* Add animated text overlay */}
      <Sequence from={30} durationInFrames={120}>
        <AnimatedTextOverlay
          text="🚀 This fades in smoothly!"
          from={30}
          durationInFrames={120}
          fadeInDuration={10}
          style={{color: 'yellow', fontSize: 70}}
        />
      </Sequence>

      {/* Another text annotation later */}
      <Sequence from={200} durationInFrames={90}>
        <AnimatedTextOverlay
          text="✨ Another annotation here!"
          from={200}
          durationInFrames={90}
          fadeInDuration={20}
          style={{color: 'cyan', fontWeight: 'bold'}}
        />
      </Sequence>
    </AbsoluteFill>
  );
};