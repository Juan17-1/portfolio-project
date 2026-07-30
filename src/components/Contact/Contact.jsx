import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

import styles from "./Contact.module.css";
import { fadeUp, staggerContainer, viewportOnce } from "../../utils";

const CONTACT_LINKS = [
  {
    icon: <FiMail />,
    label: "j.estrada101714@gmail.com",
    href: "mailto:j.estrada101714@gmail.com",
  },
  {
    icon: <FiLinkedin />,
    label: "@juan-estrada17",
    href: "https://www.linkedin.com/in/juan-estrada17",
  },
  {
    icon: <FiGithub />,
    label: "@Juan17-1",
    href: "https://github.com/Juan17-1",
  },
];

export const Contact = () => {
  return (
    <footer id="contact" className={styles.container}>
      <motion.div
        className={styles.inner}
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        <motion.span className={styles.eyebrow} variants={fadeUp}>
          Contact
        </motion.span>
        <motion.h2 className={styles.title} variants={fadeUp}>
          Let's build something <span className={styles.highlight}>great</span>{" "}
          together.
        </motion.h2>
        <motion.p className={styles.subtitle} variants={fadeUp}>
          Feel free to reach out — I'm always open to new opportunities and
          interesting projects.
        </motion.p>

        <motion.a
          href="mailto:j.estrada101714@gmail.com"
          className={styles.mailBtn}
          variants={fadeUp}
        >
          <FiMail />
          Say hello
        </motion.a>

        <motion.ul className={styles.links} variants={staggerContainer(0.08)}>
          {CONTACT_LINKS.map((link) => (
            <motion.li key={link.href} variants={fadeUp}>
              <a
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className={styles.link}
              >
                <span className={styles.linkIcon}>{link.icon}</span>
                {link.label}
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      <div className={styles.bottomBar}>
        <p>&copy; {new Date().getFullYear()} Juan Estrada. All rights reserved.</p>
        <a href="#home">Back to top</a>
      </div>
    </footer>
  );
};
