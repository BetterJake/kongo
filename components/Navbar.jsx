'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef(null);
  const pathname = usePathname();

  // Add scroll event listener to add extra styling when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize background audio
  useEffect(() => {
    audioRef.current = new Audio('/audio/background-music.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    // Cleanup on component unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          // Handle autoplay restrictions by showing a message or UI indication
          console.log('Autoplay restricted:', error);
        });
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  // Dynamiczne klasy dla różnych stanów navbara
  const navClasses = `
    fixed top-0 left-0 right-0 z-50
    bg-gray-900/60 backdrop-blur-xl text-white
    ${isScrolled ? 'shadow-md' : ''}
    transition-all duration-300
  `;

  const links = [
    { href: '/', label: 'Home' },
    { href: '/features', label: 'Funkcje' },
    { href: '/devlog', label: 'DevLog' },
    { href: '/contact', label: 'Kontakt' }
  ];

  return (
      <nav className={navClasses}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="text-xl font-bold flex items-center">
              <img
                  src="/img/logo.png"
                  alt="Kayak Racing"
                  className="w-8 h-8 mr-2"
              />
              <span className="hidden sm:inline">Kayak Racing</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6 items-center">
              {links.map(link => (
                  <Link
                      key={link.href}
                      href={link.href}
                      className={`hover:text-blue-400 transition py-2 ${
                          pathname === link.href ? 'text-blue-400 font-medium' : ''
                      }`}
                  >
                    {link.label}
                  </Link>
              ))}

              {/* Music Toggle Button */}
              <button
                  onClick={toggleMusic}
                  className="text-white hover:text-blue-400 transition flex items-center"
                  aria-label={isMusicPlaying ? "Wyłącz muzykę" : "Włącz muzykę"}
              >
                {isMusicPlaying ? (
                    <FaVolumeUp size={20} className="text-blue-400" />
                ) : (
                    <FaVolumeMute size={20} />
                )}
              </button>

              {/* Usunięto przycisk "Pobierz Grę" */}
            </div>

            {/* Mobile menu button */}
            <button
                className="md:hidden text-white focus:outline-none"
                onClick={toggleMenu}
            >
              <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                ) : (
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
              <div className="md:hidden pt-4 pb-3 space-y-3 bg-gray-900/60 backdrop-blur-xl mt-3 rounded-lg">
                {links.map(link => (
                    <div key={link.href}>
                      <Link
                          href={link.href}
                          className={`block px-4 py-2 hover:bg-gray-800 rounded ${
                              pathname === link.href ? 'text-blue-400' : ''
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </div>
                ))}

                {/* Music Toggle Button for Mobile */}
                <div className="px-4 py-2">
                  <button
                      onClick={toggleMusic}
                      className="flex items-center w-full hover:bg-gray-800 rounded px-2 py-2"
                  >
                <span className="mr-2">
                  {isMusicPlaying ? (
                      <FaVolumeUp size={18} className="text-blue-400" />
                  ) : (
                      <FaVolumeMute size={18} />
                  )}
                </span>
                    {isMusicPlaying ? "Wyłącz muzykę" : "Włącz muzykę"}
                  </button>
                </div>

              </div>
          )}
        </div>
      </nav>
  );
}