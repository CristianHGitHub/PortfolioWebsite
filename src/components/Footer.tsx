import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Code, Heart, ArrowUp } from "lucide-react";

const FooterContainer = styled(motion.footer)`
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(0, 212, 255, 0.1) 50%,
      transparent 100%
    );
    animation: slideAnimation 3s ease-in-out infinite;
  }

  @keyframes slideAnimation {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 2;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Logo = styled(motion.div).withConfig({
  shouldForwardProp: (prop) =>
    ![
      "initial",
      "animate",
      "transition",
      "whileHover",
      "whileTap",
      "whileInView",
      "viewport",
    ].includes(prop),
})`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.accentCyan};
  position: relative;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.accentCyan},
      ${({ theme }) => theme.colors.accentPurple}
    );
    border-radius: 16px;
    opacity: 0;
    transition: opacity ${({ theme }) => theme.animations.fast} ease;
    z-index: -1;
  }

  &:hover::before {
    opacity: 0.1;
  }
`;

const FooterText = styled(motion.p).withConfig({
  shouldForwardProp: (prop) =>
    ![
      "initial",
      "animate",
      "transition",
      "whileHover",
      "whileTap",
      "whileInView",
      "viewport",
    ].includes(prop),
})`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 400;
`;

const HeartIcon = styled(motion.span).withConfig({
  shouldForwardProp: (prop) =>
    !["initial", "animate", "transition", "whileHover", "whileTap"].includes(
      prop
    ),
})`
  color: #ff4757;
  display: inline-block;
  font-size: 1.1rem;
  animation: heartPulse 2s ease-in-out infinite;

  @keyframes heartPulse {
    0%,
    100% {
      transform: scale(1);
    }
    20% {
      transform: scale(1.8);
    }
    40% {
      transform: scale(0.4);
    }
    60% {
      transform: scale(2.2);
    }
    80% {
      transform: scale(0.3);
    }
  }
`;

const CoffeeIcon = styled(motion.span).withConfig({
  shouldForwardProp: (prop) =>
    !["initial", "animate", "transition", "whileHover", "whileTap"].includes(
      prop
    ),
})`
  color: ${({ theme }) => theme.colors.textSecondary};
  display: inline-block;
  font-size: 1.1rem;
  animation: coffeeShake 2.2s ease-in-out infinite;

  @keyframes coffeeShake {
    0%,
    100% {
      transform: translate(0, 0) rotate(0deg) scale(1);
    }
    8% {
      transform: translate(6px, -4px) rotate(-20deg) scale(1.4);
    }
    16% {
      transform: translate(-6px, 4px) rotate(20deg) scale(0.6);
    }
    24% {
      transform: translate(5px, -3px) rotate(-18deg) scale(1.6);
    }
    32% {
      transform: translate(-5px, 3px) rotate(18deg) scale(0.5);
    }
    40% {
      transform: translate(4px, -2px) rotate(-15deg) scale(1.8);
    }
    48% {
      transform: translate(-4px, 2px) rotate(15deg) scale(0.7);
    }
    56% {
      transform: translate(3px, -1px) rotate(-12deg) scale(1.3);
    }
    64% {
      transform: translate(-3px, 1px) rotate(12deg) scale(0.8);
    }
    72% {
      transform: translate(2px, -0.5px) rotate(-8deg) scale(1.2);
    }
    80% {
      transform: translate(-2px, 0.5px) rotate(8deg) scale(1);
    }
    88% {
      transform: translate(1px, -0.5px) rotate(-5deg) scale(1.1);
    }
    96% {
      transform: translate(-1px, 0.5px) rotate(5deg) scale(1);
    }
  }
`;

const Copyright = styled(motion.div).withConfig({
  shouldForwardProp: (prop) =>
    ![
      "initial",
      "animate",
      "transition",
      "whileHover",
      "whileTap",
      "whileInView",
      "viewport",
    ].includes(prop),
})`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.8rem;
  font-family: ${({ theme }) => theme.fonts.primary};
`;

const ScrollToTop = styled(motion.button).withConfig({
  shouldForwardProp: (prop) =>
    !["initial", "animate", "transition", "whileHover", "whileTap"].includes(
      prop
    ),
})`
  position: fixed;
  bottom: ${({ theme }) => theme.spacing.lg};
  right: ${({ theme }) => theme.spacing.lg};
  width: 50px;
  height: 50px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.accentCyan},
    ${({ theme }) => theme.colors.accentPurple}
  );
  color: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  transition: all ${({ theme }) => theme.animations.fast} ease;
  box-shadow: 0 4px 15px rgba(0, 212, 255, 0.3);

  &:hover {
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.text},
      ${({ theme }) => theme.colors.accentCyan}
    );
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 212, 255, 0.4);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    bottom: ${({ theme }) => theme.spacing.md};
    right: ${({ theme }) => theme.spacing.md};
    width: 45px;
    height: 45px;
  }
`;

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <FooterContainer
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Container>
          <FooterContent>
            <Logo
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Code size={24} />
              Cristian Hernandez
            </Logo>

            <FooterText
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Made with
              <HeartIcon
                initial={{ scale: 1 }}
                animate={{
                  scale: [1, 1.8, 0.4, 2.2, 0.3, 2.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0,
                }}
              >
                <Heart size={16} fill="currentColor" />
              </HeartIcon>
              and lots of
              <CoffeeIcon
                initial={{ rotate: 0, scale: 1, x: 0, y: 0 }}
                animate={{
                  rotate: [-20, 20, -18, 18, -15, 15, -12, 12, -8, 8, -5, 5, 0],
                  scale: [1, 1.4, 0.6, 1.6, 0.5, 1.8, 0.7, 1.3, 0.8, 1.2, 1],
                  x: [0, 6, -6, 5, -5, 4, -4, 3, -3, 2, -2, 1, -1, 0],
                  y: [0, -4, 4, -3, 3, -2, 2, -1, 1, -0.5, 0.5, 0],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0,
                }}
              >
                ☕️
              </CoffeeIcon>
            </FooterText>

            <Copyright
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              © 2025 by Cristian Hernandez. All rights reserved.
            </Copyright>
          </FooterContent>
        </Container>
      </FooterContainer>

      <ScrollToTop
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        whileHover={{
          scale: 1.15,
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.85 }}
      >
        <ArrowUp size={24} />
      </ScrollToTop>
    </>
  );
};

export default Footer;
