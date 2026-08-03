import { motion } from "framer-motion";

import styles from "./ProjectCard.module.css";
import { DIFF_STATS } from "./prMeta";
import { fadeUp } from "../../utils";

export const ProjectCard = ({ project, prNumber, onOpenCaseStudy }) => {
  const { id, title, tagline, skills, demo, source } = project;
  const stats = DIFF_STATS[id];

  const openCaseStudy = () => onOpenCaseStudy(id);

  return (
    <motion.article
      id={`proj-${id}`}
      className={styles.container}
      variants={fadeUp}
      onClick={openCaseStudy}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") openCaseStudy();
      }}
    >
      <div className={styles.top}>
        <span className={styles.mergedBadge}>Merged</span>
        <span className={styles.prNum}>
          #{prNumber} add-{id}
        </span>
      </div>

      <h3 className={styles.title}>{title}</h3>
      {tagline && <p className={styles.description}>{tagline}</p>}

      {stats && (
        <div className={styles.diffstat}>
          <span className={styles.add}>+{stats.add}</span>
          <span className={styles.rem}>−{stats.rem}</span>
          <span className={styles.files}>{stats.files} files changed</span>
        </div>
      )}
      <div className={styles.ci}>checks passed</div>

      <ul className={styles.skills}>
        {skills.map((skill) => (
          <li key={skill} className={styles.skill}>
            {skill}
          </li>
        ))}
      </ul>

      <div className={styles.links}>
        {demo && (
          <a
            href={demo}
            target="_blank"
            rel="noreferrer"
            className={styles.link}
            onClick={(e) => e.stopPropagation()}
          >
            Live demo ↗
          </a>
        )}
        {source && (
          <a
            href={source}
            target="_blank"
            rel="noreferrer"
            className={styles.link}
            onClick={(e) => e.stopPropagation()}
          >
            View repo ↗
          </a>
        )}
      </div>
    </motion.article>
  );
};
