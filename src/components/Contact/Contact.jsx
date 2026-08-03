import { motion } from "framer-motion";

import styles from "./Contact.module.css";
import { fadeUp, staggerContainer, viewportOnce } from "../../utils";

const EMAIL = "j.estrada101714@gmail.com";
const GITHUB = "https://github.com/Juan17-1";
const LINKEDIN = "https://www.linkedin.com/in/juan-estrada17";

export const Contact = () => {
  return (
    <footer id="contact" className={styles.container}>
      <motion.div
        className={styles.footerTerm}
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        <motion.div className={styles.line} variants={fadeUp}>
          <span className={styles.prompt}>$</span> ./contact.sh
        </motion.div>
        <motion.div className={`${styles.line} ${styles.dim}`} variants={fadeUp}>
          opening mail client...
        </motion.div>
        <motion.h2 className={styles.cta} variants={fadeUp}>
          Open to full-time software engineering roles.
          <br />
          Let&apos;s talk.
        </motion.h2>
        <motion.div className={styles.actions} variants={fadeUp}>
          <a className={`${styles.btn} ${styles.primary}`} href={`mailto:${EMAIL}`}>
            Send an email
          </a>
          <a className={styles.btn} href={GITHUB} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <a className={styles.btn} href={LINKEDIN} target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
        </motion.div>
      </motion.div>

      <div className={styles.statusbar}>
        <div className={styles.sbLeft}>
          <span>⎇ main</span>
          <span>© {new Date().getFullYear()} Juan Estrada</span>
        </div>
        <div className={styles.sbRight}>
          <span>build: passing</span>
          <a href="#home">back to top</a>
        </div>
      </div>
    </footer>
  );
};
