'use client';

import { useState, useEffect, useRef } from 'react';
import Button from './Button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { FaPlay, FaPause, FaExpand } from 'react-icons/fa';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const GameFeatures = () => {
    const featuresRef = useRef(null);
    const [activeTab, setActiveTab] = useState(0);
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const progressIntervalRef = useRef(null);

    // Game features content organized by tabs for more intuitive navigation
    const featureContent = [
        {
            id: 'physics',
            title: 'Fizyka wody',
            media: {
                type: 'video',
                src: '/videos/hero-1.mp4',
                poster: '/img/logo.png',
            },
            description: 'Zaawansowany system fizyki wody zapewnia realistyczne doświadczenie kajakarstwa. Dynamiczne fale i prądy reagują na Twoje ruchy, a każda rzeka ma swój unikalny charakter.',
            bulletPoints: [
                'Realistyczna symulacja dynamiki wody',
                'Interaktywne fale reagujące na kajak',
                'Różne warunki wodne na trasach',
                'Efekty rozprysku i piany'
            ]
        },
        {
            id: 'tracks',
            title: 'Trasy',
            media: {
                type: 'video',
                src: '/videos/hero-2.mp4',
                poster: '/img/tracks-overview-poster.jpg'
            },
            description: 'Odkryj różnorodne lokalizacje: od spokojnych jezior po rwące górskie potoki. Każda trasa oferuje unikalne wyzwania i przeszkody do pokonania.',
            bulletPoints: [
                'Trasy o różnym poziomie trudności',
                'Unikalne przeszkody na każdej trasie',
                'Malownicze i zróżnicowane lokalizacje',
                'Dynamicznie zmieniająca się pogoda'
            ]
        },
        {
            id: 'multiplayer',
            title: 'Multiplayer',
            media: {
                type: 'image',
                src: '/img/multiplayer.webp',
                alt: 'Tryb multiplayer'
            },
            description: 'Rywalizuj z przyjaciółmi lub przeciwnikami z całego świata w emocjonujących wyścigach na czas. System rankingowy zapewni zawsze odpowiednie wyzwanie.',
            bulletPoints: [
                'Wyścigi z maksymalnie 6 graczami',
                'System rankingowy i tablice wyników',
                'Sezonowe zawody z nagrodami',
                'Możliwość tworzenia prywatnych lobbies'
            ]
        },
        {
            id: 'customization',
            title: 'Personalizacja',
            media: {
                type: 'image',
                src: '/img/contact-1.webp',
                alt: 'Opcje personalizacji'
            },
            description: 'Dostosuj wygląd swojego kajaka i kajakarza. Odblokowuj nowe elementy wyposażenia poprawiające osiągi w miarę postępów w grze.',
            bulletPoints: [
                'Różnorodne kajaki o unikalnych właściwościach',
                'Personalizacja wyglądu postaci',
                'Odblokowanie nowego sprzętu za osiągnięcia',
                'Różne style wiosłowania'
            ]
        }
    ];

    // Handle video playback
    const togglePlayback = () => {
        if (!videoRef.current) return;

        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play().catch(e => {
                console.error("Could not play video:", e);
            });
        }
    };

    // Update video progress state
    const updateProgress = () => {
        if (videoRef.current) {
            const percentage = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setProgress(percentage);
        }
    };

    // Handle click on progress bar
    const handleProgressClick = (e) => {
        if (!videoRef.current) return;

        const progressBar = e.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const clickPosition = e.clientX - rect.left;
        const percentage = (clickPosition / rect.width) * 100;

        // Update video time based on click position
        videoRef.current.currentTime = (percentage / 100) * videoRef.current.duration;
        setProgress(percentage);
    };

    // Reset video progress when changing tabs
    useEffect(() => {
        if (featureContent[activeTab].media.type === 'video' && videoRef.current) {
            videoRef.current.load();
            setIsPlaying(false);
            setProgress(0);
        }
    }, [activeTab]);

    // Set up and clean up video event listeners
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleEnded = () => {
            setIsPlaying(false);
            setProgress(0);
        };

        video.addEventListener('play', handlePlay);
        video.addEventListener('pause', handlePause);
        video.addEventListener('ended', handleEnded);
        video.addEventListener('timeupdate', updateProgress);

        return () => {
            video.removeEventListener('play', handlePlay);
            video.removeEventListener('pause', handlePause);
            video.removeEventListener('ended', handleEnded);
            video.removeEventListener('timeupdate', updateProgress);
        };
    }, [activeTab]);

    // Section entrance animation
    useEffect(() => {
        if (featuresRef.current) {
            const featuresAnimation = gsap.timeline({
                scrollTrigger: {
                    trigger: featuresRef.current,
                    start: "top center",
                    end: "bottom bottom",
                    toggleActions: "play none none reverse",
                },
            });

            featuresAnimation.fromTo(
                ".feature-content",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
            );

            return () => {
                if (featuresAnimation.scrollTrigger) {
                    featuresAnimation.scrollTrigger.kill();
                }
                featuresAnimation.kill();
            };
        }
    }, []);

    // Toggle fullscreen
    const toggleFullscreen = () => {
        if (!videoRef.current) return;

        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            videoRef.current.requestFullscreen().catch(e => {
                console.error('Error attempting to enable fullscreen:', e);
            });
        }
    };

    return (
        <div id="features" ref={featuresRef} className="py-24 w-screen bg-gradient-to-b from-violet-50 to-blue-50">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-12">
                    Funkcje gry
                </h2>

                {/* Tab navigation - more intuitive visual tabs */}
                <div className="flex flex-wrap justify-center mb-10 gap-2">
                    {featureContent.map((feature, index) => (
                        <button
                            key={feature.id}
                            onClick={() => setActiveTab(index)}
                            className={`px-5 py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                                activeTab === index
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-white text-blue-700 hover:bg-blue-100'
                            }`}
                        >
                            {feature.title}
                        </button>
                    ))}
                </div>

                <div className="feature-content bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                        {/* Media section */}
                        <div className="relative bg-black h-[300px] md:h-[400px] lg:h-[500px]">
                            {featureContent[activeTab].media.type === 'video' ? (
                                <>
                                    <video
                                        ref={videoRef}
                                        className="w-full h-full object-cover"
                                        poster={featureContent[activeTab].media.poster}
                                        preload="metadata"
                                    >
                                        <source src={featureContent[activeTab].media.src} type="video/mp4" />
                                        Twoja przeglądarka nie obsługuje odtwarzania wideo.
                                    </video>

                                    {/* Simplified overlay controls */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        {!isPlaying && (
                                            <button
                                                onClick={togglePlayback}
                                                className="size-16 bg-blue-600/80 hover:bg-blue-700 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                                                aria-label="Play video"
                                            >
                                                <FaPlay className="ml-1 text-2xl" />
                                            </button>
                                        )}
                                    </div>

                                    {/* More intuitive video controls */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3">
                                        <div
                                            className="w-full h-1 bg-gray-500/50 rounded-full mb-2 cursor-pointer"
                                            onClick={handleProgressClick}
                                        >
                                            <div
                                                className="h-full bg-blue-500 rounded-full"
                                                style={{ width: `${progress}%` }}
                                            ></div>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <button
                                                onClick={togglePlayback}
                                                className="text-white hover:text-blue-300 transition"
                                                aria-label={isPlaying ? "Pause" : "Play"}
                                            >
                                                {isPlaying ? <FaPause /> : <FaPlay />}
                                            </button>

                                            <button
                                                onClick={toggleFullscreen}
                                                className="text-white hover:text-blue-300 transition"
                                                aria-label="Fullscreen"
                                            >
                                                <FaExpand />
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <img
                                    src={featureContent[activeTab].media.src}
                                    alt={featureContent[activeTab].media.alt || 'Feature image'}
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>

                        {/* Content section */}
                        <div className="p-6 md:p-8 flex flex-col justify-center">
                            <h3 className="text-2xl md:text-3xl font-bold text-blue-700 mb-4">
                                {featureContent[activeTab].title}
                            </h3>

                            <p className="text-gray-700 mb-6">
                                {featureContent[activeTab].description}
                            </p>

                            <ul className="space-y-3">
                                {featureContent[activeTab].bulletPoints.map((point, i) => (
                                    <li key={i} className="flex items-start">
                                        <div className="mt-1 size-4 bg-blue-500 rounded-full flex-shrink-0 mr-3"></div>
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8">
                                <Link href="/play">
                                    <Button title="Wypróbuj teraz" containerClass="cursor-pointer" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional feature cards */}

            </div>
        </div>
    );
};

export default GameFeatures;