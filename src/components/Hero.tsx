import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { ChevronDown, Download } from "lucide-react";
import { useIsClient } from "../hooks/useIsomorphicLayoutEffect";

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.secondary} 50%,
    ${({ theme }) => theme.colors.accent} 100%
  );
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at 20% 80%,
        rgba(0, 212, 255, 0.15) 0%,
        transparent 60%
      ),
      radial-gradient(
        circle at 80% 20%,
        rgba(124, 58, 237, 0.15) 0%,
        transparent 60%
      );
    pointer-events: none;
    animation: smoothGlow 8s ease-in-out infinite;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
        45deg,
        transparent 30%,
        rgba(0, 212, 255, 0.05) 50%,
        transparent 70%
      ),
      linear-gradient(
        -45deg,
        transparent 30%,
        rgba(124, 58, 237, 0.05) 50%,
        transparent 70%
      );
    pointer-events: none;
    animation: diagonalSweep 12s ease-in-out infinite;
  }

  @keyframes smoothGlow {
    0%,
    100% {
      opacity: 0.6;
      transform: scale(1);
    }
    50% {
      opacity: 0.9;
      transform: scale(1.02);
    }
  }

  @keyframes diagonalSweep {
    0%,
    100% {
      transform: translateX(-100%) translateY(-100%) rotate(0deg);
      opacity: 0;
    }
    25% {
      transform: translateX(0%) translateY(-50%) rotate(45deg);
      opacity: 0.3;
    }
    50% {
      transform: translateX(50%) translateY(0%) rotate(90deg);
      opacity: 0.6;
    }
    75% {
      transform: translateX(100%) translateY(50%) rotate(135deg);
      opacity: 0.3;
    }
  }
`;

const HeroContent = styled.div`
  text-align: center;
  max-width: 800px;
  z-index: 2;
`;

const Greeting = styled(motion.div)`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.accentCyan};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Name = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  background: linear-gradient(
    45deg,
    ${({ theme }) => theme.colors.text} 0%,
    ${({ theme }) => theme.colors.accentCyan} 50%,
    ${({ theme }) => theme.colors.accentPurple} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`;

const TypingContainer = styled.div`
  min-height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const TypingText = styled(motion.span)`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.textSecondary};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.2rem;
  }
`;

const Cursor = styled.span`
  display: inline-block;
  width: 2px;
  height: 1.5rem;
  background: ${({ theme }) => theme.colors.accentCyan};
  margin-left: 2px;
  animation: blink 1s infinite;

  @keyframes blink {
    0%,
    50% {
      opacity: 1;
    }
    51%,
    100% {
      opacity: 0;
    }
  }
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: 1.8;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  flex-wrap: wrap;
`;

const Button = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border: 2px solid ${({ theme }) => theme.colors.accentCyan};
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all ${({ theme }) => theme.animations.fast} ease;

  &:first-child {
    background: ${({ theme }) => theme.colors.accentCyan};
    color: ${({ theme }) => theme.colors.primary};

    &:hover {
      background: transparent;
      color: ${({ theme }) => theme.colors.accentCyan};
      transform: translateY(-2px);
    }
  }

  &:last-child {
    background: transparent;
    color: ${({ theme }) => theme.colors.accentCyan};

    &:hover {
      background: ${({ theme }) => theme.colors.accentCyan};
      color: ${({ theme }) => theme.colors.primary};
      transform: translateY(-2px);
    }
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.xl};
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const FloatingParticle = styled(motion.div)`
  position: absolute;
  width: 4px;
  height: 4px;
  background: ${({ theme }) => theme.colors.accentCyan};
  border-radius: 50%;
  pointer-events: none;
`;

const FloatingParticlePurple = styled(motion.div)`
  position: absolute;
  width: 6px;
  height: 6px;
  background: ${({ theme }) => theme.colors.accentPurple};
  border-radius: 50%;
  pointer-events: none;
`;

const AnimatedShape = styled(motion.div)`
  position: absolute;
  pointer-events: none;
  border: 2px solid ${({ theme }) => theme.colors.accentCyan};
  opacity: 0.1;
`;

const AnimatedShapePurple = styled(motion.div)`
  position: absolute;
  pointer-events: none;
  border: 2px solid ${({ theme }) => theme.colors.accentPurple};
  opacity: 0.1;
`;

const Hero: React.FC = () => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTypingStarted, setIsTypingStarted] = useState(false);
  const isClient = useIsClient();

  const texts = useMemo(
    () => [
      "Full-Stack Developer",
      "Data Science Specialist",
      "Machine Learning Enthusiast",
      "Software Engineer",
      "Problem Solver",
    ],
    []
  );

  // Start typing animation after component mounts
  useEffect(() => {
    if (isClient && !isTypingStarted) {
      const timer = setTimeout(() => {
        setIsTypingStarted(true);
      }, 1000); // Start after 1 second
      return () => clearTimeout(timer);
    }
  }, [isClient, isTypingStarted]);

  useEffect(() => {
    if (!isClient || !isTypingStarted) return;

    const typeSpeed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      const current = texts[currentIndex];

      if (isDeleting) {
        setCurrentText((prev) => prev.substring(0, prev.length - 1));
      } else {
        setCurrentText((prev) => current.substring(0, prev.length + 1));
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [currentText, currentIndex, isDeleting, texts, isClient, isTypingStarted]);

  // Separate effect to handle state transitions
  useEffect(() => {
    if (!isClient || !isTypingStarted) return;

    const current = texts[currentIndex];
    const pauseTime = 2000;

    if (!isDeleting && currentText === current) {
      const timer = setTimeout(() => setIsDeleting(true), pauseTime);
      return () => clearTimeout(timer);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }
  }, [currentText, currentIndex, isDeleting, texts, isClient, isTypingStarted]);

  return (
    <HeroSection id="home">
      {/* Animated Geometric Shapes - positioned away from center */}
      <AnimatedShape
        style={{
          width: "60px",
          height: "60px",
          left: "5%",
          top: "10%",
          borderRadius: "50%",
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <AnimatedShapePurple
        style={{
          width: "40px",
          height: "40px",
          left: "90%",
          top: "15%",
          borderRadius: "8px",
        }}
        animate={{
          rotate: [360, 0],
          scale: [1, 0.8, 1],
          opacity: [0.1, 0.4, 0.1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <AnimatedShape
        style={{
          width: "80px",
          height: "80px",
          left: "2%",
          top: "80%",
          borderRadius: "50%",
        }}
        animate={{
          rotate: [0, -360],
          scale: [0.8, 1.3, 0.8],
          opacity: [0.05, 0.25, 0.05],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <AnimatedShapePurple
        style={{
          width: "50px",
          height: "50px",
          left: "95%",
          top: "85%",
          borderRadius: "12px",
        }}
        animate={{
          rotate: [0, 180, 360],
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <HeroContent>
        <Greeting
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Hello, I'm
        </Greeting>

        <Name
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Cristian Hernandez
        </Name>

        <TypingContainer>
          <TypingText
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {isClient && isTypingStarted ? currentText : texts[0]}
            {isClient && isTypingStarted && <Cursor />}
          </TypingText>
        </TypingContainer>

        <Description
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          I specialize in full-stack development, data science, and machine
          learning. I craft exceptional digital experiences through clean code,
          innovative solutions, and a passion for turning complex problems into
          elegant software.
        </Description>

        <ButtonGroup
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Button
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View My Work
          </Button>
          <Button
            href="/resume.pdf"
            download="Cristian-Hernandez-Resume.pdf"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={20} />
            Download Resume
          </Button>
        </ButtonGroup>
      </HeroContent>

      <ScrollIndicator
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <span>Scroll Down</span>
        <ChevronDown size={20} />
      </ScrollIndicator>
    </HeroSection>
  );
};

export default Hero;
