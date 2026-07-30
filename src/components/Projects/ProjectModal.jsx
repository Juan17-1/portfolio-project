import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUpRight, FiGithub, FiX } from "react-icons/fi";

import styles from "./ProjectModal.module.css";
import { getImageUrl, useEscapeKey, useLockBodyScroll } from "../../utils";

export const ProjectModal = ({ project, onClose }) => {
  const backdropRef = useRef(null);

  useLockBodyScroll(Boolean(project));
  useEscapeKey(onClose, Boolean(project));

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          ref={backdropRef}
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(e) => {
            if (e.target === backdropRef.current) onClose();
          }}
        >
          <motion.div
            className={styles.panel}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} case study`}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Close case study"
            >
              <FiX size={20} />
            </button>

            <img
              src={getImageUrl(project.imageSrc)}
              alt={`Screenshot of ${project.title}`}
              className={styles.heroImage}
            />

            <div className={styles.body}>
              <h2 className={styles.title}>{project.title}</h2>
              {project.tagline && (
                <p className={styles.tagline}>{project.tagline}</p>
              )}

              <ul className={styles.skills}>
                {project.skills.map((skill) => (
                  <li key={skill} className={styles.skill}>
                    {skill}
                  </li>
                ))}
              </ul>

              {project.overview && (
                <section className={styles.section}>
                  <h3>Overview</h3>
                  <p>{project.overview}</p>
                </section>
              )}

              {project.approach?.length > 0 && (
                <section className={styles.section}>
                  <h3>Approach</h3>
                  <ul>
                    {project.approach.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </section>
              )}

              {project.results?.length > 0 && (
                <section className={styles.section}>
                  <h3>Results</h3>
                  <ul>
                    {project.results.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </section>
              )}

              <div className={styles.actions}>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.primaryBtn}
                >
                  Live demo
                  <FiArrowUpRight />
                </a>
                <a
                  href={project.source}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.secondaryBtn}
                >
                  <FiGithub />
                  Source
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
