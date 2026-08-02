import { motion } from "framer-motion";

import styles from "./Experience.module.css";
import history from "../../data/history.json";
import { fadeUp, staggerContainer, viewportOnce } from "../../utils";

const hashOf = (str) => {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).slice(0, 7).padStart(7, "0");
};

export const Experience = () => {
  return (
    <section className={styles.container} id="experience">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={fadeUp}
      >
        <span className={styles.eyebrow}>git log --oneline --graph</span>
        <h2 className={styles.title}>Education &amp; experience</h2>
      </motion.div>

      <motion.ol
        className={styles.gitlog}
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        {history.map((item, index) => (
          <motion.li
            key={`${item.organisation}-${item.startDate}`}
            className={`${styles.commit} ${index === 0 ? styles.commitHead : ""}`}
            variants={fadeUp}
          >
            <div className={styles.commitHead}>
              <span className={styles.hash}>{hashOf(item.organisation + item.role)}</span>
              {index === 0 && <span className={styles.tag}>HEAD</span>}
            </div>
            <h3>{item.role.trim()}</h3>
            <div className={styles.meta}>
              {item.organisation} — {item.startDate} → {item.endDate}
            </div>
            {item.experiences?.length > 0 && (
              <ul className={styles.body}>
                {item.experiences.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            )}
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
};
