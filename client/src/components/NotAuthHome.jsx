import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import style from "../css/app.module.css";

const NotAuthHome = (props) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  return (
    <section ref={ref}>
      <article className={style.notAuthHome}>
        <h1 className={style.title}>Welcome to MyNotesApp!</h1>
        <p className={style.subtitle}>
          Capture Brilliance, One Note at a Time.
        </p>
      </article>
      <article className="row">
        <div className={`col-md-6 mb-3 h-100 ${style.card}`}>
          <h3>A New Way to Take Notes</h3>
          <p>
            Discover a new level of <b>efficiency</b> through our seamless web
            app's array of features. Empower your <b>productivity</b> with our
            innovative web app designed to effortlessly organize your{" "}
            <b>thoughts</b> and ideas.
          </p>

          <img
            src="https://assets.website-files.com/5bff8886c3964a992e90d465/5c006187d9549d3368158d3d_mixes.gif"
            alt="huumans"
            width={"100%"}
            height={"auto"}
          />
        </div>
        <div className="col-md-1"></div>
        <div className={`col-md-5 mb-3 ${style.card}`}>
          <motion.img
            src="https://uploads-ssl.webflow.com/62e13f095b5c9d5f50d0eff2/62e230d85b3d5b641d7b163d_Humaaans%20-%203%20Characters%20(5)%201.svg"
            alt="huumans"
            height={"auto"}
            width={"100%"}
            style={{ scale }}
          />
          <p>
            Seamlessly <b>take notes</b>, create <b>lists</b>, and unlock your
            creativity with ease. Elevate your note-taking <b>experience</b> and
            embark on a journey of enhanced efficiency and organization.
          </p>
        </div>

        <div className={style.card}>
          <motion.img
            src="https://uploads-ssl.webflow.com/62e13f095b5c9d5f50d0eff2/62e230d8851a37cfda333aae_Humaaans%20-%203%20Characters%20(4)%201.svg"
            alt="post"
            width={"100%"}
            height={"auto"}
            className="rounded mb-3"
            style={{ scale }}
          />
          <h3>Unlock the Power of Productivity</h3>
          <p>
            Whether you're logging in for the first time or signing up, access
            is a <b>breeze</b>. Craft and refine your notes effortlessly with
            our user-friendly <b>interface</b>. Collaboration is elevated as you
            securely share notes with others, fostering <b>teamwork</b> like
            never before. Keep yourself organized by categorizing your notes,
            and enjoy the flexibility of <b>personalized</b> formatting. With
            cross-device accessibility, powerful search, real-time syncing, and
            reliable <b>notifications</b>, staying on top of your tasks is a
            walk in the park.
          </p>
        </div>
      </article>
    </section>
  );
};

NotAuthHome.propTypes = {};

export default NotAuthHome;
