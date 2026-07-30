import { useEffect, useRef } from "react";

import styles from "./CursorGlow.module.css";

export const CursorGlow = () => {
  const ref = useRef(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    let frame = null;
    const handleMove = (e) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.style.setProperty("--x", `${e.clientX}px`);
          ref.current.style.setProperty("--y", `${e.clientY}px`);
        }
        frame = null;
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={ref} className={styles.glow} aria-hidden="true" />;
};
