import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";

const ROLES = ["Frontend Developer", "Backend Developer", "UI Designer"];

export const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.container} id="home">
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className={styles.badge}>
          <span className={styles.badgeDot} />
          Available for new opportunities
        </span>

        <h1 className={styles.title}>
          Hi, I'm <span className={styles.highlight}>Juan Estrada</span>
        </h1>

        <div className={styles.roleWrap}>
          <span className={styles.roleLabel}>I work as a</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={ROLES[roleIndex]}
              className={styles.role}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {ROLES[roleIndex]}
            </motion.span>
          </AnimatePresence>
        </div>

        <p className={styles.description}>
          Self-taught software developer building fast, polished web
          experiences. I turn ideas into clean, functional products, and I'm
          always exploring new tools to push what I can build further.
        </p>

        <div className={styles.actions}>
          <a href="#projects" className={styles.primaryBtn}>
            View my work
            <FiArrowRight />
          </a>
          <a href="#contact" className={styles.secondaryBtn}>
            Get in touch
          </a>
        </div>

        <div className={styles.socials}>
          <a
            href="https://github.com/Juan17-1"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <FiGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/juan-estrada17"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <FiLinkedin />
          </a>
          <a href="mailto:j.estrada101714@gmail.com" aria-label="Email">
            <FiMail />
          </a>
        </div>
      </motion.div>

      <motion.div
        className={styles.imageWrap}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        <div className={styles.imageRing} />
        <img
          src={getImageUrl("hero/juan.png")}
          alt="Portrait of Juan Estrada"
          className={styles.heroImg}
        />
      </motion.div>

      <a
        href="#about"
        className={styles.scrollCue}
        aria-label="Scroll to About"
      >
        <span className={styles.scrollCueMouse}>
          <span className={styles.scrollCueDot} />
        </span>
        Scroll
      </a>
    </section>
  );
};
