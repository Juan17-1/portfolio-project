import { motion } from "framer-motion";

import styles from "./Projects.module.css";

import projects from "../../data/projects.json";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { fadeUp, staggerContainer, viewportOnce } from "../../utils";

export const Projects = ({ activeProjectId, onOpenProject, onCloseProject }) => {
  const activeProject = projects.find((project) => project.id === activeProjectId);

  return (
    <section className={styles.container} id="projects">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={fadeUp}
      >
        <span className={styles.eyebrow}>Projects</span>
        <h2 className={styles.title}>Things I've built</h2>
      </motion.div>

      <motion.div
        className={styles.projects}
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onOpenCaseStudy={onOpenProject} />
        ))}
      </motion.div>

      <ProjectModal project={activeProject} onClose={onCloseProject} />
    </section>
  );
};
