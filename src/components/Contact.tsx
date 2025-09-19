import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Github, Linkedin } from "lucide-react";
import { useIsClient } from "../hooks/useIsomorphicLayoutEffect";

const ContactSection = styled.section`
  padding: 4rem 1.5rem;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;

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
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 20%,
        rgba(124, 58, 237, 0.15) 0%,
        transparent 50%
      );
    pointer-events: none;
    animation: pulse 4s ease-in-out infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const SectionTitle = styled(motion.h2).withConfig({
  shouldForwardProp: (prop) =>
    !["initial", "animate", "transition", "whileHover", "whileTap"].includes(
      prop
    ),
})`
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  font-size: 3rem;
  font-weight: 700;
  color: #ffffff;
  font-family: "JetBrains Mono", "Fira Code", "Consolas", monospace;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #00d4ff, #7c3aed);
    border-radius: 2px;
    animation: glow 2s ease-in-out infinite alternate;
  }

  @keyframes glow {
    0% {
      box-shadow: 0 0 5px #00d4ff;
    }
    100% {
      box-shadow: 0 0 20px #00d4ff, 0 0 30px #7c3aed;
    }
  }
`;

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xxl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

const ContactInfo = styled.div``;

const ContactTitle = styled(motion.h3).withConfig({
  shouldForwardProp: (prop) =>
    !["initial", "animate", "transition", "whileHover", "whileTap"].includes(
      prop
    ),
})`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 1.8rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.accentCyan};
`;

const ContactDescription = styled(motion.p).withConfig({
  shouldForwardProp: (prop) =>
    !["initial", "animate", "transition", "whileHover", "whileTap"].includes(
      prop
    ),
})`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: 1.8;
`;

const ContactMethods = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const ContactMethod = styled(motion.div).withConfig({
  shouldForwardProp: (prop) =>
    !["initial", "animate", "transition", "whileHover", "whileTap"].includes(
      prop
    ),
})`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  background: #1a1a2e;
  border-radius: 16px;
  border: 1px solid #374151;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(0, 212, 255, 0.2),
      transparent
    );
    transition: left 0.3s ease;
  }

  &:hover {
    transform: translateX(10px) translateY(-5px);
    border-color: #00d4ff;
    box-shadow: 0 20px 40px rgba(0, 212, 255, 0.3);

    &::before {
      left: 100%;
    }
  }
`;

const ContactIcon = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.accentCyan},
    ${({ theme }) => theme.colors.accentPurple}
  );
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  position: relative;
  z-index: 1;
  transition: all ${({ theme }) => theme.animations.fast} ease;

  &::before {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.accentCyan},
      ${({ theme }) => theme.colors.accentPurple}
    );
    border-radius: 50%;
    z-index: -1;
    opacity: 0;
    transition: opacity ${({ theme }) => theme.animations.fast} ease;
  }

  ${ContactMethod}:hover & {
    transform: scale(1.1);

    &::before {
      opacity: 0.3;
    }
  }
`;

const ContactDetails = styled.div``;

const ContactLabel = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const ContactValue = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const SocialLinks = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const SocialTitle = styled(motion.h4).withConfig({
  shouldForwardProp: (prop) =>
    !["initial", "animate", "transition", "whileHover", "whileTap"].includes(
      prop
    ),
})`
  font-family: ${({ theme }) => theme.fonts.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.accentCyan};
`;

const SocialGrid = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const SocialLink = styled(motion.a).withConfig({
  shouldForwardProp: (prop) =>
    !["initial", "animate", "transition", "whileHover", "whileTap"].includes(
      prop
    ),
})`
  width: 50px;
  height: 50px;
  background: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all ${({ theme }) => theme.animations.fast} ease;
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
      135deg,
      ${({ theme }) => theme.colors.accentCyan},
      ${({ theme }) => theme.colors.accentPurple}
    );
    border-radius: 50%;
    opacity: 0;
    transition: opacity ${({ theme }) => theme.animations.fast} ease;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.accentCyan};
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-5px) scale(1.1);
    box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);

    &::before {
      opacity: 1;
    }
  }

  svg {
    position: relative;
    z-index: 1;
  }
`;

const ContactForm = styled(motion.form).withConfig({
  shouldForwardProp: (prop) =>
    !["initial", "animate", "transition", "whileHover", "whileTap"].includes(
      prop
    ),
})`
  background: ${({ theme }) => theme.colors.secondary};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
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
      135deg,
      rgba(0, 212, 255, 0.05) 0%,
      rgba(124, 58, 237, 0.05) 100%
    );
    opacity: 0;
    transition: opacity ${({ theme }) => theme.animations.normal} ease;
  }

  &::after {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(
      transparent,
      rgba(0, 212, 255, 0.1),
      transparent
    );
    animation: rotate 4s linear infinite;
    opacity: 0;
    transition: opacity ${({ theme }) => theme.animations.normal} ease;
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover::after {
    opacity: 1;
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

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.accent};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.secondary};
  transition: all ${({ theme }) => theme.animations.fast} ease;
  position: relative;
  z-index: 1;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accentCyan};
    box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.2),
      0 5px 15px rgba(0, 212, 255, 0.1);
    transform: translateY(-2px);
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.accentCyan};
    box-shadow: 0 2px 8px rgba(0, 212, 255, 0.1);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
    transition: color ${({ theme }) => theme.animations.fast} ease;
  }

  &:focus::placeholder {
    color: ${({ theme }) => theme.colors.accentCyan};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.accent};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.secondary};
  resize: vertical;
  min-height: 120px;
  transition: all ${({ theme }) => theme.animations.fast} ease;
  position: relative;
  z-index: 1;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accentCyan};
    box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.2),
      0 5px 15px rgba(0, 212, 255, 0.1);
    transform: translateY(-2px);
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.accentCyan};
    box-shadow: 0 2px 8px rgba(0, 212, 255, 0.1);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
    transition: color ${({ theme }) => theme.animations.fast} ease;
  }

  &:focus::placeholder {
    color: ${({ theme }) => theme.colors.accentCyan};
  }
`;

const SubmitButton = styled(motion.button).withConfig({
  shouldForwardProp: (prop) =>
    !["initial", "animate", "transition", "whileHover", "whileTap"].includes(
      prop
    ),
})`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.accentCyan},
    ${({ theme }) => theme.colors.accentPurple}
  );
  color: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  transition: all ${({ theme }) => theme.animations.fast} ease;
  position: relative;
  overflow: hidden;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left ${({ theme }) => theme.animations.normal} ease;
  }

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 15px 40px rgba(0, 212, 255, 0.4);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px) scale(0.98);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;

    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
`;

// Floating geometric shapes
const FloatingShape = styled(motion.div).withConfig({
  shouldForwardProp: (prop) =>
    !["initial", "animate", "transition", "whileHover", "whileTap"].includes(
      prop
    ),
})`
  position: absolute;
  pointer-events: none;
  opacity: 0.3;
  z-index: 1;
`;

const Contact: React.FC = () => {
  const ref = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isClient = useIsClient();

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "cristianhernandezr234@gmail.com",
      href: "mailto:cristianhernandezr234@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "(813) 965-3146",
      href: "tel:+18139653146",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Tampa, Florida",
      href: "#",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/CristianHGitHub",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/cristian-hernandez-710a152b0/",
      label: "LinkedIn",
    },
    {
      icon: Mail,
      href: "mailto:cristianhernandezr234@gmail.com",
      label: "Email",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simple form submission - just log the data and show success message
      console.log("Contact form submission:", formData);

      // Reset form
      setFormData({ name: "", email: "", subject: "", message: "" });
      alert("Thank you for your message! I'll get back to you soon.");
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContactSection id="contact" ref={ref}>
      <Container>
        <SectionTitle
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{
            scale: 1.05,
            textShadow: "0 0 20px rgba(0, 212, 255, 0.5)",
          }}
        >
          Get In Touch
        </SectionTitle>

        <ContactContent>
          <ContactInfo>
            <ContactTitle
              initial={{ opacity: 1, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Let's Connect
            </ContactTitle>

            <ContactDescription
              initial={{ opacity: 1, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              I'm always interested in new opportunities and exciting projects.
              Whether you have a question, want to collaborate, or just want to
              say hi, feel free to reach out! I'm also open to hearing about job
              opportunities that align with my skills and career goals.
            </ContactDescription>

            <ContactMethods>
              {contactMethods.map((method, index) => (
                <ContactMethod
                  key={method.label}
                  as={method.href ? "a" : "div"}
                  href={method.href}
                  initial={{ opacity: 1, x: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <ContactIcon>
                    <method.icon size={24} />
                  </ContactIcon>
                  <ContactDetails>
                    <ContactLabel>{method.label}</ContactLabel>
                    <ContactValue>{method.value}</ContactValue>
                  </ContactDetails>
                </ContactMethod>
              ))}
            </ContactMethods>

            <SocialLinks>
              <SocialTitle
                initial={{ opacity: 1, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                Follow Me
              </SocialTitle>
              <SocialGrid>
                {socialLinks.map((social, index) => (
                  <SocialLink
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon size={20} />
                  </SocialLink>
                ))}
              </SocialGrid>
            </SocialLinks>
          </ContactInfo>

          <ContactForm
            onSubmit={handleSubmit}
            initial={{ opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <FormGroup>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your name"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="subject">Subject</Label>
              <Input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="What's this about?"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="message">Message</Label>
              <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell me about your project or just say hello!"
                required
              />
            </FormGroup>

            <SubmitButton
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send size={20} />
              {isSubmitting ? "Sending..." : "Send Message"}
            </SubmitButton>
          </ContactForm>
        </ContactContent>
      </Container>
    </ContactSection>
  );
};

export default Contact;
