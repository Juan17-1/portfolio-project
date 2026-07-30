import { motion } from "framer-motion";

import styles from "./Experience.module.css";
import skills from "../../data/skills.json";
import history from "../../data/history.json";
import { getImageUrl, fadeUp, staggerContainer, viewportOnce } from "../../utils";

export const Experience = () => {
  return (
    <section className={styles.container} id="experience">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={fadeUp}
      >
        <span className={styles.eyebrow}>Experience</span>
        <h2 className={styles.title}>Skills &amp; background</h2>
      </motion.div>

      <div className={styles.content}>
        <motion.div
          className={styles.skills}
          variants={staggerContainer(0.05)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {skills.map((skill) => (
            <motion.div key={skill.title} className={styles.skill} variants={fadeUp}>
              <div className={styles.skillImageContainer}>
                <img src={getImageUrl(skill.imageSrc)} alt={skill.title} />
              </div>
              <p>{skill.title}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.ul
          className={styles.history}
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {history.map((historyItem) => (
            <motion.li
              key={`${historyItem.organisation}-${historyItem.startDate}`}
              className={styles.historyItem}
              variants={fadeUp}
            >
              <div className={styles.historyDot} />
              <img
                src={getImageUrl(historyItem.imageSrc)}
                alt={`${historyItem.organisation} Logo`}
              />
              <div className={styles.historyItemDetails}>
                <h3>{`${historyItem.role}, ${historyItem.organisation}`}</h3>
                <p>{`${historyItem.startDate} - ${historyItem.endDate}`}</p>
                <ul>
                  {historyItem.experiences.map((experience) => (
                    <li key={experience}>{experience}</li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};
