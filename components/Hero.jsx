'use client';

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

import VideoPreview from "./VideoPreview";

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);

  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const nextVdRef = useRef(null);
  const videoFrameRef = useRef(null);
  const mainVideoRef = useRef(null);

  // Zoptymalizowana funkcja ładowania wideo
  const preloadVideo = (src, onProgress, onComplete) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', src, true);
    xhr.responseType = 'blob';

    xhr.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 100);
        onProgress(progress);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        onComplete(URL.createObjectURL(xhr.response));
      } else {
        // Fallback gdy nie można załadować wideo
        onProgress(100);
        setLoading(false);
      }
    };

    xhr.onerror = () => {
      console.error("Błąd podczas ładowania wideo:", src);
      // Jeśli wystąpił błąd, ustawiamy postęp na 100%, aby umożliwić dostęp do strony
      onProgress(100);
      setLoading(false);
    };

    xhr.send();
  };

  // Ładowanie głównego wideo z optymalizacją
  useEffect(() => {
    // Unikamy niepotrzebnego ładowania w SSR
    if (typeof window === 'undefined') return;

    const mainVideoSrc = `/videos/hero-${currentIndex}.mp4`;

    // Używamy setTimeout aby dać przeglądarce czas na renderowanie UI
    const timer = setTimeout(() => {
      preloadVideo(
          mainVideoSrc,
          (progress) => {
            setLoadingProgress(progress);
            // Jeśli postęp dojdzie do 100%, zakładamy że wideo jest załadowane
            if (progress >= 100) {
              setTimeout(() => {
                setLoading(false);
              }, 300); // Skrócone opóźnienie dla lepszego UX
            }
          },
          (videoUrl) => {
            if (mainVideoRef.current) {
              mainVideoRef.current.src = videoUrl;
              // Nie odtwarzamy wideo automatycznie, czekamy na interakcję użytkownika
              // aby poprawić pierwszy czas ładowania
              mainVideoRef.current.load();
            }
          }
      );
    }, 100);

    // Cleanup funkcji
    return () => {
      clearTimeout(timer);
      if (mainVideoRef.current) {
        mainVideoRef.current.pause();
        if (mainVideoRef.current.src) {
          URL.revokeObjectURL(mainVideoRef.current.src);
        }
        mainVideoRef.current.src = '';
      }
    };
  }, []);

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex((prevIndex) => (prevIndex % 4) + 1);

    // Odtwórz wideo po kliknięciu użytkownika
    if (mainVideoRef.current && !mainVideoRef.current.playing) {
      mainVideoRef.current.play().catch(err => {
        console.warn("Automatyczne odtwarzanie wideo nie powiodło się:", err);
      });
    }
  };

  useEffect(() => {
    if (hasClicked && nextVdRef.current) {
      gsap.set("#next-video", { visibility: "visible" });
      gsap.to("#next-video", {
        transformOrigin: "center center",
        scale: 1,
        width: "100%",
        height: "100%",
        duration: 1,
        ease: "power1.inOut",
        onStart: () => {
          if (nextVdRef.current) {
            nextVdRef.current.play().catch(e => console.warn("Nie można odtworzyć wideo:", e));
          }
        },
      });
      gsap.from("#current-video", {
        transformOrigin: "center center",
        scale: 0,
        duration: 1.5,
        ease: "power1.inOut",
      });
    }
  }, [currentIndex, hasClicked]);

  useEffect(() => {
    if (!videoFrameRef.current || typeof window === 'undefined') return;

    // Odłożone animacje do czasu pełnego załadowania
    const timer = setTimeout(() => {
      const clipAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: "#video-frame",
          start: "center center",
          end: "bottom center",
          scrub: true,
        }
      });

      gsap.set("#video-frame", {
        clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
        borderRadius: "0% 0% 40% 10%",
      });

      clipAnimation.from("#video-frame", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        borderRadius: "0% 0% 0% 0%",
        ease: "power1.inOut",
      });

      return () => {
        if (clipAnimation.scrollTrigger) {
          clipAnimation.scrollTrigger.kill();
        }
        clipAnimation.kill();
      };
    }, 500);

    return () => clearTimeout(timer);
  }, [loading]);

  const getVideoSrc = (index) => `/videos/hero-${index}.mp4`;

  return (
      <div className="relative h-dvh w-screen overflow-x-hidden">
        {loading && (
            <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
              <div className="flex flex-col items-center">
                <div className="three-body mb-8">
                  <div className="three-body__dot"></div>
                  <div className="three-body__dot"></div>
                  <div className="three-body__dot"></div>
                </div>

                <div className="w-64 h-2 bg-violet-200 rounded-full overflow-hidden">
                  <div
                      className="h-full bg-violet-600 transition-all duration-300 ease-out"
                      style={{ width: `${loadingProgress}%` }}
                  ></div>
                </div>
                <div className="mt-2 text-sm text-violet-600 font-medium">
                  Ładowanie: {loadingProgress}%
                </div>
              </div>
            </div>
        )}

        <div
            id="video-frame"
            ref={videoFrameRef}
            className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
        >
          <div>
            <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
              <VideoPreview>
                <div
                    onClick={handleMiniVdClick}
                    className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
                >
                  <video
                      ref={nextVdRef}
                      src={getVideoSrc((currentIndex % 4) + 1)}
                      loop
                      muted
                      id="current-video"
                      className="size-64 origin-center scale-150 object-cover object-center"
                      preload="metadata"
                  />
                </div>
              </VideoPreview>
            </div>

            <video
                ref={nextVdRef}
                src={getVideoSrc(currentIndex)}
                loop
                muted
                id="next-video"
                preload="metadata"
                className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            />

            <video
                ref={mainVideoRef}
                loop
                muted
                className="absolute left-0 top-0 size-full object-cover object-center"
                preload="metadata"
            />
          </div>

          <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
            R<b>a</b>cing
          </h1>

          <div className="absolute left-0 top-0 z-40 size-full">
            <div className="mt-24 px-5 sm:px-10">
              <h1 className="special-font hero-heading text-blue-100">
                K<b>a</b>yak
              </h1>
            </div>
          </div>
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
          R<b>a</b>cing
        </h1>
      </div>
  );
};

export default Hero;