import styles from "./BackgroundFX.module.css";

export const BackgroundFX = () => {
  return (
    <div className={styles.container} aria-hidden="true">
      <div className={styles.grid} />
      <div className={`${styles.orb} ${styles.orbPrimary}`} />
      <div className={`${styles.orb} ${styles.orbAccent}`} />
      <div className={`${styles.orb} ${styles.orbSecondary}`} />
      <div className={styles.vignette} />
    </div>
  );
};
