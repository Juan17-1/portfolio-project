import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiArrowRight,
  FiCopy,
  FiFolder,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiSearch,
} from "react-icons/fi";

import styles from "./CommandPalette.module.css";
import projects from "../../data/projects.json";
import { useEscapeKey, useLockBodyScroll } from "../../utils";

const EMAIL = "j.estrada101714@gmail.com";

export const CommandPalette = ({ isOpen, onClose, onOpenProject }) => {
  const [query, setQuery] = useState("");
  const [highlighted, setHighlighted] = useState(0);
  const inputRef = useRef(null);

  useLockBodyScroll(isOpen);
  useEscapeKey(onClose, isOpen);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setHighlighted(0);
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isOpen]);

  const commands = useMemo(() => {
    const navigate = (hash) => () => {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    };

    const list = [
      { id: "nav-home", group: "Navigate", label: "Go to Home", icon: <FiArrowRight />, action: navigate("#home") },
      { id: "nav-about", group: "Navigate", label: "Go to About", icon: <FiArrowRight />, action: navigate("#about") },
      { id: "nav-experience", group: "Navigate", label: "Go to Experience", icon: <FiArrowRight />, action: navigate("#experience") },
      { id: "nav-projects", group: "Navigate", label: "Go to Projects", icon: <FiArrowRight />, action: navigate("#projects") },
      { id: "nav-contact", group: "Navigate", label: "Go to Contact", icon: <FiArrowRight />, action: navigate("#contact") },
      ...projects.map((project) => ({
        id: `project-${project.id}`,
        group: "Projects",
        label: `View case study: ${project.title}`,
        icon: <FiFolder />,
        action: () => {
          document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
          onOpenProject(project.id);
        },
      })),
      {
        id: "copy-email",
        group: "Connect",
        label: "Copy email address",
        icon: <FiCopy />,
        action: () => navigator.clipboard?.writeText(EMAIL),
      },
      {
        id: "github",
        group: "Connect",
        label: "Open GitHub profile",
        icon: <FiGithub />,
        action: () => window.open("https://github.com/Juan17-1", "_blank", "noreferrer"),
      },
      {
        id: "linkedin",
        group: "Connect",
        label: "Open LinkedIn profile",
        icon: <FiLinkedin />,
        action: () => window.open("https://www.linkedin.com/in/juan-estrada17", "_blank", "noreferrer"),
      },
      {
        id: "mail",
        group: "Connect",
        label: "Send an email",
        icon: <FiMail />,
        action: () => window.open(`mailto:${EMAIL}`, "_self"),
      },
    ];

    return list;
  }, [onOpenProject]);

  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter((command) => command.label.toLowerCase().includes(q));
  }, [commands, query]);

  const groups = useMemo(() => {
    const order = [];
    const map = {};
    filtered.forEach((command) => {
      if (!map[command.group]) {
        map[command.group] = [];
        order.push(command.group);
      }
      map[command.group].push(command);
    });
    return order.map((group) => ({ group, items: map[group] }));
  }, [filtered]);

  const runCommand = (command) => {
    command.action();
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((prev) => (prev + 1) % Math.max(filtered.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((prev) => (prev - 1 + filtered.length) % Math.max(filtered.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const command = filtered[highlighted];
      if (command) runCommand(command);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            className={styles.panel}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.searchRow}>
              <FiSearch className={styles.searchIcon} />
              <input
                ref={inputRef}
                className={styles.input}
                placeholder="Search for a page, project, or action..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setHighlighted(0);
                }}
                onKeyDown={handleKeyDown}
              />
              <kbd className={styles.kbd}>Esc</kbd>
            </div>

            <div className={styles.results}>
              {groups.length === 0 && (
                <p className={styles.empty}>No matching commands.</p>
              )}
              {groups.map(({ group, items }) => (
                <div key={group} className={styles.group}>
                  <p className={styles.groupLabel}>{group}</p>
                  {items.map((command) => {
                    const index = filtered.indexOf(command);
                    return (
                      <button
                        key={command.id}
                        className={`${styles.item} ${
                          index === highlighted ? styles.itemActive : ""
                        }`}
                        onMouseEnter={() => setHighlighted(index)}
                        onClick={() => runCommand(command)}
                      >
                        <span className={styles.itemIcon}>{command.icon}</span>
                        {command.label}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
