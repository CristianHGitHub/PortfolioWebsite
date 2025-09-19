import React from "react";
import styled, { keyframes } from "styled-components";

// CSS animations for emojis
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const wiggle = keyframes`
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(5deg);
  }
  75% {
    transform: rotate(-5deg);
  }
`;

const glow = keyframes`
  0%, 100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.3);
  }
`;

const AnimatedEmojiContainer = styled.div<{
  animation?: string;
  delay?: number;
}>`
  display: inline-block;
  animation: ${({ animation }) => {
      switch (animation) {
        case "bounce":
          return bounce;
        case "pulse":
          return pulse;
        case "wiggle":
          return wiggle;
        case "glow":
          return glow;
        default:
          return "none";
      }
    }}
    2s ease-in-out infinite;
  animation-delay: ${({ delay = 0 }) => delay}s;
`;

interface AnimatedEmojiProps {
  emoji: string;
  animation?: "bounce" | "pulse" | "wiggle" | "glow";
  delay?: number;
  style?: React.CSSProperties;
}

const AnimatedEmoji: React.FC<AnimatedEmojiProps> = ({
  emoji,
  animation = "bounce",
  delay = 0,
  style,
}) => {
  return (
    <AnimatedEmojiContainer animation={animation} delay={delay} style={style}>
      {emoji}
    </AnimatedEmojiContainer>
  );
};

export default AnimatedEmoji;
