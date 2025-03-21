'use client';

import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const AnimatedTitle = ({ title, containerClass }) => {
  const containerRef = useRef(null);
  const wordsRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const titleAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "100 bottom",
        end: "center bottom",
        toggleActions: "play none none reverse",
      },
    });

    // Reset references array
    wordsRef.current = [];

    // Select all animated words in this specific component
    const animatedWords = containerRef.current.querySelectorAll('.animated-word');

    titleAnimation.to(
        animatedWords,
        {
          opacity: 1,
          transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
          ease: "power2.inOut",
          stagger: 0.02,
        },
        0
    );

    return () => {
      if (titleAnimation.scrollTrigger) {
        titleAnimation.scrollTrigger.kill();
      }
      titleAnimation.kill();
    };
  }, [title]);

  return (
      <div ref={containerRef} className={clsx("animated-title", containerClass)}>
        {title.split("<br />").map((line, index) => (
            <div
                key={index}
                className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
            >
              {line.split(" ").map((word, idx) => (
                  <span
                      key={idx}
                      className="animated-word"
                      dangerouslySetInnerHTML={{ __html: word }}
                      ref={(el) => {
                        if (el) wordsRef.current.push(el);
                      }}
                  />
              ))}
            </div>
        ))}
      </div>
  );
};

export default AnimatedTitle;