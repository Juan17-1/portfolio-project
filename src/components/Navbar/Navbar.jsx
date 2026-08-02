import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";

import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { href: "#home", label: "home" },
  { href: "#experience", label: "experience" },
  { href: "#projects", label: "projects" },
  { href: "#contact", label: "contact" },
];

export const Navbar = ({ onOpenPalette }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      setScrolled(scrollTop > 24);
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((link) =>
      document.querySelector(link.href)
    ).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        <a className={styles.logo} href="#home">
          <span className={styles.logoMark}>JE</span>
          <span className={styles.logoText}>juan-estrada.dev</span>
        </a>

        <ul className={styles.menuItems}>
          {NAV_LINKS.map((link, index) => (
            <li key={link.href}>
              {index > 0 && <span className={styles.crumb}>›</span>}
              <a
                href={link.href}
                className={activeSection === link.href ? styles.active : ""}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className={styles.searchBtn}
          onClick={onOpenPalette}
          aria-label="Open command palette"
        >
          <FiSearch />
          <span>Search</span>
          <kbd className={styles.searchKbd}>⌘K</kbd>
        </button>

        <a href="#contact" className={styles.ctaBtn}>
          ./contact.sh
        </a>

        <button
          className={styles.menuBtn}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <HiX size={26} /> : <HiMenu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setMenuOpen(false)}
          >
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
            <li>
              <button className={styles.mobileSearchBtn} onClick={onOpenPalette}>
                <FiSearch />
                Search
              </button>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>

      <div className={styles.progressTrack}>
        <div className={styles.progressBar} style={{ width: `${progress}%` }} />
      </div>
    </nav>
  );
};
