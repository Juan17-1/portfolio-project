import { motion } from "framer-motion";
import { FiCode, FiServer, FiPenTool } from "react-icons/fi";

import styles from "./About.module.css";
import { getImageUrl, fadeUp, staggerContainer, viewportOnce } from "../../utils";

const ABOUT_ITEMS = [
  {
    icon: <FiCode />,
    title: "Frontend Developer",
    description:
      "I build responsive, optimized interfaces with a strong focus on usability and performance.",
  },
  {
    icon: <FiServer />,
    title: "Backend Developer",
    description:
      "I design and build fast, well-structured back-end systems and APIs that scale.",
  },
  {
    icon: <FiPenTool />,
    title: "UI Designer",
    description:
      "I've designed multiple landing pages and built cohesive design systems from scratch.",
  },
];

export const About = () => {
  return (
    <section className={styles.container} id="about">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={fadeUp}
      >
        <span className={styles.eyebrow}>About Me</span>
        <h2 className={styles.title}>The person behind the code</h2>
      </motion.div>

      <div className={styles.content}>
        <motion.div
          className={styles.imageCard}
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={getImageUrl("about/aboutImage2.jpg")}
            alt="Me sitting with a laptop"
            className={styles.aboutImage}
          />
          <div className={styles.imageAccent} />
        </motion.div>

        <motion.ul
          className={styles.aboutItems}
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {ABOUT_ITEMS.map((item) => (
            <motion.li key={item.title} className={styles.aboutItem} variants={fadeUp}>
              <div className={styles.iconChip}>{item.icon}</div>
              <div className={styles.aboutItemText}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};
