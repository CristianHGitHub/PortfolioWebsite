import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useRef } from "react";
import AnimatedEmoji from "./AnimatedEmoji";
import { useIsClient } from "../hooks/useIsomorphicLayoutEffect";

const SkillsSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl}
    ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.primary};
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at 10% 10%,
        rgba(0, 212, 255, 0.08) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 90% 90%,
        rgba(124, 58, 237, 0.08) 0%,
        transparent 50%
      );
    pointer-events: none;
    animation: rotate 20s linear infinite;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.accentCyan},
      ${({ theme }) => theme.colors.accentPurple}
    );
    border-radius: 2px;
    animation: glow 2s ease-in-out infinite alternate;
  }

  @keyframes glow {
    0% {
      box-shadow: 0 0 5px ${({ theme }) => theme.colors.accentCyan};
    }
    100% {
      box-shadow: 0 0 20px ${({ theme }) => theme.colors.accentCyan},
        0 0 30px ${({ theme }) => theme.colors.accentPurple};
    }
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const SkillCategory = styled(motion.div)`
  background: ${({ theme }) => theme.colors.secondary};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all ${({ theme }) => theme.animations.normal} ease;

  &:hover {
    transform: translateY(-5px);
    border-color: ${({ theme }) => theme.colors.accentCyan};
    box-shadow: 0 20px 40px rgba(0, 212, 255, 0.1);
  }
`;

const CategoryTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 1.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.accentCyan};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const SkillItem = styled(motion.div)`
  background: ${({ theme }) => theme.colors.accent};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all ${({ theme }) => theme.animations.fast} ease;

  &:hover {
    background: ${({ theme }) => theme.colors.accentCyan};
    color: ${({ theme }) => theme.colors.primary};
    transform: scale(1.05);
  }
`;

const Skills: React.FC = () => {
  const ref = useRef(null);
  const isClient = useIsClient();

  const skillCategories = [
    {
      title: "Languages",
      icon: "💬",
      skills: ["Python", "C/C++", "JavaScript", "Java", "C#", "COBOL"],
    },
    {
      title: "Frontend",
      icon: "💻",
      skills: [
        "React",
        "TypeScript",
        "HTML5",
        "CSS3",
        "JavaScript",
        "Tailwind CSS",
      ],
    },
    {
      title: "Backend",
      icon: "⚙️",
      skills: [
        "Node.js",
        "Python",
        "Express",
        "REST APIs",
        "PHP",
        "Authentication",
      ],
    },
    {
      title: "Data Science & ML",
      icon: "🤖",
      skills: [
        "Python",
        "Pandas",
        "NumPy",
        "Scikit-learn",
        "Jupyter",
        "Matplotlib",
      ],
    },
    {
      title: "Database",
      icon: "🗄️",
      skills: [
        "PostgreSQL",
        "MySQL",
        "MongoDB",
        "SQLite",
        "Oracle SQL",
        "Firebase",
      ],
    },
    {
      title: "Tools & DevOps",
      icon: "🛠️",
      skills: ["Git", "Agile", "Docker", "AWS", "Vercel", "Linux"],
    },
  ];

  return (
    <SkillsSection id="skills" ref={ref}>
      <Container>
        <SectionTitle
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Skills & Technologies
        </SectionTitle>

        <SkillsGrid>
          {skillCategories.map((category, categoryIndex) => (
            <SkillCategory
              key={category.title}
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <CategoryTitle>
                {isClient ? (
                  <AnimatedEmoji
                    emoji={category.icon}
                    animation="bounce"
                    delay={categoryIndex * 0.1}
                  />
                ) : (
                  <span>{category.icon}</span>
                )}
                {category.title}
              </CategoryTitle>
              <SkillsList>
                {category.skills.map((skill, skillIndex) => (
                  <SkillItem
                    key={skill}
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: categoryIndex * 0.1 + skillIndex * 0.05,
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {skill}
                  </SkillItem>
                ))}
              </SkillsList>
            </SkillCategory>
          ))}
        </SkillsGrid>
      </Container>
    </SkillsSection>
  );
};

export default Skills;
