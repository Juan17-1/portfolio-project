import { useEffect, useState, useCallback } from "react";

import styles from "./App.module.css";
import { About } from "./components/About/About";
import { BackToTop } from "./components/Background/BackToTop";
import { BackgroundFX } from "./components/Background/BackgroundFX";
import { CursorGlow } from "./components/Background/CursorGlow";
import { CommandPalette } from "./components/CommandPalette/CommandPalette";
import { Contact } from "./components/Contact/Contact";
import { Experience } from "./components/Experience/Experience";
import { Hero } from "./components/Hero/Hero";
import { Navbar } from "./components/Navbar/Navbar";
import { Projects } from "./components/Projects/Projects";

function App() {
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [paletteOpen, setPaletteOpen] = useState(false);

  const closePalette = useCallback(() => setPaletteOpen(false), []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const isModifierK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      if (isModifierK) {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className={styles.App}>
      <BackgroundFX />
      <CursorGlow />
      <Navbar onOpenPalette={() => setPaletteOpen(true)} />
      <main className={styles.main}>
        <Hero />
        <About />
        <Experience />
        <Projects
          activeProjectId={activeProjectId}
          onOpenProject={setActiveProjectId}
          onCloseProject={() => setActiveProjectId(null)}
        />
      </main>
      <Contact />
      <BackToTop />
      <CommandPalette
        isOpen={paletteOpen}
        onClose={closePalette}
        onOpenProject={setActiveProjectId}
      />
    </div>
  );
}

export default App;
