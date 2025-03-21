'use client';

import { FaDiscord, FaTwitter, FaYoutube, FaMedium } from "react-icons/fa";

const socialLinks = [
  { href: "https://discord.com", icon: <FaDiscord size={20} /> },
  { href: "https://twitter.com", icon: <FaTwitter size={20} /> },
  { href: "https://youtube.com", icon: <FaYoutube size={20} /> },
  { href: "https://medium.com", icon: <FaMedium size={20} /> },
];

const Footer = () => {
  return (
      <footer className="w-screen bg-gradient-to-r from-violet-600 to-blue-600 py-6 text-white">
        <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-6 md:flex-row">
          {/* Logo i nazwa firmy */}
          <div className="flex items-center mb-4 md:mb-0">
            <img src="/img/logo.png" alt="Kayak Racing" className="w-10 h-10 mr-3" />
            <p className="text-xl font-bold">
              Kayak Racing <span className="text-sm font-light opacity-80">©{new Date().getFullYear()}</span>
            </p>
          </div>

          {/* Linki społecznościowe */}
          <div className="flex justify-center gap-5 md:justify-start">
            {socialLinks.map((link, index) => (
                <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white transform hover:scale-110 transition-all duration-300"
                >
                  {link.icon}
                </a>
            ))}
          </div>

          {/* Linki do stron */}
          <div className="flex flex-wrap justify-center gap-6 text-sm md:justify-end">
            <a
                href="#privacy-policy"
                className="text-white/80 hover:text-white hover:underline transition-colors duration-300"
            >
              Polityka Prywatności
            </a>
            <a
                href="#terms"
                className="text-white/80 hover:text-white hover:underline transition-colors duration-300"
            >
              Regulamin
            </a>
            <a
                href="#contact"
                className="text-white/80 hover:text-white hover:underline transition-colors duration-300"
            >
              Kontakt
            </a>
          </div>
        </div>

        {/* Dodatkowy pasek z informacją o prawach autorskich */}
        <div className="mt-6 py-3 border-t border-white/20">
          <div className="container mx-auto text-center text-sm text-white/60">
            <p>Wszystkie prawa zastrzeżone Kayak Racing Team {new Date().getFullYear()}</p>
          </div>
        </div>
      </footer>
  );
};

export default Footer;