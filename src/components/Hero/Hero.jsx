import React from "react";

import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";

export const Hero = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Hi, I'm Juan</h1>
        <p className={styles.description}>
          Welcome to my portfolio! As a self-taught software developer, I am
          passionate about continuously expanding my knowledge and skills in the
          ever-evolving world of technology. With a foundation built on
          self-directed learning and hands-on experience, I bring a fresh
          perspective and a hunger for innovation to every project I undertake.
          From coding challenges to real-world applications, I thrive on pushing
          the boundaries of what I know and exploring new possibilities. Through
          dedication, determination, and a commitment to lifelong learning, I am
          on a journey of growth and discovery in the field of software
          development. Explore my portfolio to see how my skills and expertise
          are evolving, and join me as I continue to learn, create, and
          innovate.
        </p>
      </div>
      <img
        src={getImageUrl("hero/juan.png")}
        alt="Hero image of me"
        className={styles.heroImg}
      />
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};
