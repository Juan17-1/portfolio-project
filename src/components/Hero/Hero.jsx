import { useState } from "react";
import { motion } from "framer-motion";

import styles from "./Hero.module.css";
import projects from "../../data/projects.json";
import skills from "../../data/skills.json";

const EMAIL = "j.estrada101714@gmail.com";
const GITHUB = "https://github.com/Juan17-1";
const LINKEDIN = "https://www.linkedin.com/in/juan-estrada17";

const SKILL_CATEGORIES = [
  { key: "languages", label: "languages", items: ["JavaScript", "HTML", "CSS"] },
  { key: "frameworks", label: "frameworks", items: ["React", "Node"] },
  { key: "tooling", label: "tooling", items: ["Docker", "Git", "GitHub", "Vercel"] },
  { key: "design", label: "design", items: ["Figma"] },
];

const TABS = [
  { id: "readme", label: "README.md" },
  { id: "skills", label: "skills.config.js" },
  { id: "contact", label: "contact.sh" },
];

export const Hero = () => {
  const [activeTab, setActiveTab] = useState("readme");
  const [projectsOpen, setProjectsOpen] = useState(false);
  const skillTitles = skills.map((s) => s.title);

  return (
    <section id="home" className={styles.container}>
      <motion.div
        className={styles.window}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.titlebar}>
          <div className={styles.dots}>
            <span />
            <span />
            <span />
          </div>
          <div className={styles.path}>juan-estrada — portfolio.app — main</div>
          <div className={styles.statusChip}>build passing</div>
        </div>

        <div className={styles.body}>
          <nav className={styles.sidebar} aria-label="Project files">
            <div className={styles.treeLabel}>Explorer</div>
            <div className={styles.treeRoot}>PORTFOLIO</div>

            <button
              type="button"
              className={`${styles.treeItem} ${activeTab === "readme" ? styles.treeItemActive : ""}`}
              onClick={() => setActiveTab("readme")}
            >
              <span>📄</span> README<span className={styles.ext}>.md</span>
            </button>

            <a className={styles.treeItem} href="#experience">
              📄 experience<span className={styles.ext}>.json</span>
            </a>

            <button
              type="button"
              className={`${styles.treeItem} ${styles.treeFolder}`}
              aria-expanded={projectsOpen}
              onClick={() => setProjectsOpen((prev) => !prev)}
            >
              <span className={`${styles.caret} ${projectsOpen ? styles.caretOpen : ""}`}>▸</span> 📁 projects/
            </button>
            <div className={`${styles.treeSub} ${projectsOpen ? styles.treeSubOpen : ""}`}>
              {projects.map((project) => (
                <a key={project.id} className={styles.treeItem} href={`#proj-${project.id}`}>
                  {project.id}
                  <span className={styles.ext}>.js</span>
                </a>
              ))}
            </div>

            <button
              type="button"
              className={`${styles.treeItem} ${activeTab === "skills" ? styles.treeItemActive : ""}`}
              onClick={() => setActiveTab("skills")}
            >
              <span>📄</span> skills.config<span className={styles.ext}>.js</span>
            </button>
            <button
              type="button"
              className={`${styles.treeItem} ${activeTab === "contact" ? styles.treeItemActive : ""}`}
              onClick={() => setActiveTab("contact")}
            >
              <span>📄</span> contact<span className={styles.ext}>.sh</span>
            </button>
          </nav>

          <div className={styles.editorMain}>
            <div className={styles.tabbar}>
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className={styles.panes}>
              {activeTab === "readme" && (
                <div className={`${styles.pane} ${styles.md}`}>
                  <div className={styles.badges}>
                    <span className={`${styles.badge} ${styles.badgeOpen}`}>● open to work</span>
                    <span className={`${styles.badge} ${styles.badgeLoc}`}>Las Vegas, NV</span>
                    <span className={`${styles.badge} ${styles.badgeFocus}`}>full-stack</span>
                  </div>
                  <h1>Juan Estrada</h1>
                  <p>
                    Self-taught software developer building fast, functional web products end to
                    end — React on the front, Node/Express/MongoDB underneath. I&apos;m studying
                    Radiology at UNLV with a minor in Computer Science, so I&apos;m used to reading
                    detail carefully and working precisely under a deadline.
                  </p>
                  <h2>Currently</h2>
                  <ul>
                    <li>
                      <b>Studying</b> — B.S. Radiology, UNLV · Minor in Computer Science
                    </li>
                    <li>
                      <b>Building</b> — full-stack projects with React, Node, Express, MongoDB
                    </li>
                    <li>
                      <b>Shipping</b> — every project below has a live demo and a public repo
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === "skills" && (
                <div className={styles.pane}>
                  <div className={styles.codeBlock}>
                    <span className={styles.ln}>1</span>
                    <span className={styles.kw}>export</span> <span className={styles.kw}>const</span>{" "}
                    <span className={styles.fn}>skills</span> <span className={styles.p}>=</span>{" "}
                    <span className={styles.p}>{"{"}</span>
                    {SKILL_CATEGORIES.map((cat, i) => {
                      const present = cat.items.filter((item) => skillTitles.includes(item));
                      if (present.length === 0) return null;
                      return (
                        <div key={cat.key}>
                          <span className={styles.ln}>{i + 2}</span>
                          {"  "}
                          <span className={styles.k}>{cat.label}</span>
                          <span className={styles.p}>:</span> <span className={styles.p}>[</span>
                          {present.map((item, idx) => (
                            <span key={item}>
                              <span className={styles.s}>&quot;{item}&quot;</span>
                              {idx < present.length - 1 && <span className={styles.p}>, </span>}
                            </span>
                          ))}
                          <span className={styles.p}>],</span>
                        </div>
                      );
                    })}
                    <span className={styles.ln}>{SKILL_CATEGORIES.length + 2}</span>
                    <span className={styles.p}>{"};"}</span>{" "}
                    <span className={styles.c}>// always adding to this list</span>
                  </div>
                </div>
              )}

              {activeTab === "contact" && (
                <div className={styles.pane}>
                  <div className={styles.codeBlock}>
                    <span className={styles.ln}>1</span>
                    <span className={styles.c}>#!/bin/bash</span>
                    <br />
                    <span className={styles.ln}>2</span>
                    <span className={styles.c}># usually respond within 24h</span>
                    <br />
                    <span className={styles.ln}>3</span>
                    <br />
                    <span className={styles.ln}>4</span>
                    <span className={styles.k}>EMAIL</span>
                    <span className={styles.p}>=</span>
                    <span className={styles.s}>
                      &quot;
                      <a className={styles.contactLink} href={`mailto:${EMAIL}`}>
                        {EMAIL}
                      </a>
                      &quot;
                    </span>
                    <br />
                    <span className={styles.ln}>5</span>
                    <span className={styles.k}>GITHUB</span>
                    <span className={styles.p}>=</span>
                    <span className={styles.s}>
                      &quot;
                      <a className={styles.contactLink} href={GITHUB} target="_blank" rel="noreferrer">
                        github.com/Juan17-1
                      </a>
                      &quot;
                    </span>
                    <br />
                    <span className={styles.ln}>6</span>
                    <span className={styles.k}>LINKEDIN</span>
                    <span className={styles.p}>=</span>
                    <span className={styles.s}>
                      &quot;
                      <a className={styles.contactLink} href={LINKEDIN} target="_blank" rel="noreferrer">
                        linkedin.com/in/juan-estrada17
                      </a>
                      &quot;
                    </span>
                    <br />
                    <span className={styles.ln}>7</span>
                    <br />
                    <span className={styles.ln}>8</span>
                    <span className={styles.fn}>echo</span> <span className={styles.s}>&quot;Let&apos;s build something.&quot;</span>
                    <span className={styles.caretBlink} />
                  </div>
                </div>
              )}
            </div>

            <div className={styles.terminal}>
              <div className={styles.termLine}>
                <span className={styles.prompt}>$</span> ./run-tests.sh
              </div>
              <div className={`${styles.termLine} ${styles.out}`}>
                running {projects.length} project suites...
              </div>
              <div className={styles.termLine}>
                <span className={styles.ok}>✓</span>{" "}
                <span className={styles.out}>
                  {projects.length}/{projects.length} passing · build: passing · deployed: vercel
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.statusbar}>
          <div className={styles.sbLeft}>
            <span>⎇ main</span>
            <span>0 problems</span>
            <span>UTF-8</span>
          </div>
          <div className={styles.sbRight}>
            <span className={styles.sbHideSmall}>Ln 12, Col 4</span>
            <a href={GITHUB} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={LINKEDIN} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
