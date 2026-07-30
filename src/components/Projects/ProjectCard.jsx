import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FiMaximize2 } from "react-icons/fi";

import styles from "./ProjectCard.module.css";
import { getImageUrl, fadeUp } from "../../utils";

export const ProjectCard = ({ project, onOpenCaseStudy }) => {
  const { title, imageSrc, tagline, skills, demo, source } = project;
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 220,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 220,
    damping: 20,
  });

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const openCaseStudy = () => onOpenCaseStudy(project.id);

  return (
    <motion.div
      ref={cardRef}
      className={styles.container}
      variants={fadeUp}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={openCaseStudy}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") openCaseStudy();
      }}
    >
      <div className={styles.imageWrap}>
        <img
          src={getImageUrl(imageSrc)}
          alt={`Screenshot of ${title}`}
          className={styles.image}
        />
        <div className={styles.imageOverlay}>
          <span className={styles.overlayHint}>
            <FiMaximize2 />
            View case study
          </span>
        </div>
      </div>

      <h3 className={styles.title}>{title}</h3>
      {tagline && <p className={styles.description}>{tagline}</p>}

      <ul className={styles.skills}>
        {skills.map((skill) => (
          <li key={skill} className={styles.skill}>
            {skill}
          </li>
        ))}
      </ul>

      <div className={styles.links}>
        <a
          href={demo}
          target="_blank"
          rel="noreferrer"
          className={styles.link}
          onClick={(e) => e.stopPropagation()}
        >
          Live demo
        </a>
        <a
          href={source}
          target="_blank"
          rel="noreferrer"
          className={styles.linkGhost}
          onClick={(e) => e.stopPropagation()}
        >
          Source
        </a>
      </div>
    </motion.div>
  );
};
