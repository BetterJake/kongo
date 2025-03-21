'use client';

import { useState, useEffect, useRef } from 'react';
import { FaLinkedin, FaTwitter, FaEnvelope, FaUser } from 'react-icons/fa';

const About = () => {
  // Set default profile (Paweł = 0)
  const [activeProfile, setActiveProfile] = useState(0);
  const profilesRef = useRef(null);
  const profileContentRef = useRef(null);

  // Team data with FaUser icon as fallback
  const teamMembers = [
    {
      name: 'Paweł',
      role: 'Główny programista',
      description: 'Specjalista od silnika fizyki. Dzięki niemu każdy kajak zachowuje się realistycznie na wodzie. W wolnym czasie konstruuje miniaturowe modele łodzi.',
      skills: ['C++', 'Unity', 'Fizyka symulacji', 'Modelowanie 3D'],
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'pawel@kayakracing.com'
      }
    },
    {
      name: 'Malczyk',
      role: 'Projektantka poziomów i artystka 3D',
      description: 'Stworzyła wszystkie trasy i przeszkody w grze. Prywatnie uprawia kajakarstwo górskie i jest wielokrotną mistrzynią regionu.',
      skills: ['Blender', 'Maya', 'Level Design', 'Teksturowanie'],
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'malczyk@kayakracing.com'
      }
    },
    {
      name: 'Krzyszotf',
      role: 'Programista AI i systemów rozgrywki',
      description: 'Opracował inteligentnych przeciwników, których styl jazdy dostosowuje się do umiejętności gracza. Fan sportów wodnych i były ratownik.',
      skills: ['Machine Learning', 'Python', 'Systemy rozgrywki', 'UX Design'],
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'krzysztof@kayakracing.com'
      }
    },
    {
      name: 'Panczo',
      role: 'Dyrektor kreatywna i specjalistka od UI/UX',
      description: 'Odpowiada za przyjazny interfejs i ogólny kierunek artystyczny gry. W weekendy prowadzi blog o grach niezależnych.',
      skills: ['Figma', 'Adobe XD', 'UI/UX', 'Design Systems'],
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'panczo@kayakracing.com'
      }
    },
    {
      name: 'Maksio',
      role: 'Kompozytor muzyki i dźwiękowiec',
      description: 'Stworzył dynamiczną ścieżkę dźwiękową reagującą na tempo rozgrywki. Prywatnie gra na kilku instrumentach i nagrywa podcast o dźwięku w grach.',
      skills: ['Sound Design', 'Kompozycja', 'Pro Tools', 'FMOD'],
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'maksio@kayakracing.com'
      }
    }
  ];

  // Simpler animation when changing profiles using standard CSS transitions
  useEffect(() => {
    if (profileContentRef.current) {
      // Reset the animation
      profileContentRef.current.style.opacity = "0";
      profileContentRef.current.style.transform = "translateY(10px)";

      // Force reflow/repaint to restart animation
      void profileContentRef.current.offsetWidth;

      // Apply the transition
      profileContentRef.current.style.transition = "opacity 0.3s ease, transform 0.3s ease";
      profileContentRef.current.style.opacity = "1";
      profileContentRef.current.style.transform = "translateY(0)";
    }
  }, [activeProfile]);

  // Handle profile change
  const handleProfileChange = (index) => {
    if (index === activeProfile) return;
    setActiveProfile(index);

    if (profileContentRef.current && window.innerWidth < 768) {
      profileContentRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  };

  // Simpler animation approach with basic opacity and transform
  useEffect(() => {
    if (!profilesRef.current) return;

    // Use simpler animation approach - direct selection of elements without GSAP timeline
    if (typeof window !== 'undefined') {
      // Animate heading
      const heading = document.querySelector(".team-heading");
      if (heading) {
        heading.style.opacity = "0";
        heading.style.transform = "translateY(-20px)";

        setTimeout(() => {
          heading.style.transition = "opacity 0.6s ease, transform 0.6s ease";
          heading.style.opacity = "1";
          heading.style.transform = "translateY(0)";
        }, 100);
      }

      // Animate subheading
      const subheading = document.querySelector(".team-subheading");
      if (subheading) {
        subheading.style.opacity = "0";
        subheading.style.transform = "translateY(-15px)";

        setTimeout(() => {
          subheading.style.transition = "opacity 0.6s ease, transform 0.6s ease";
          subheading.style.opacity = "1";
          subheading.style.transform = "translateY(0)";
        }, 300);
      }

      // Animate team photos
      const teamPhotos = document.querySelectorAll(".team-photo");
      teamPhotos.forEach((photo, index) => {
        photo.style.opacity = "0";
        photo.style.transform = "scale(0.8)";

        setTimeout(() => {
          photo.style.transition = "opacity 0.5s ease, transform 0.5s ease";
          photo.style.opacity = "1";
          photo.style.transform = "scale(1)";
        }, 400 + (index * 100)); // Stagger effect
      });

      // Animate profile content
      const profileContent = document.querySelector(".profile-content");
      if (profileContent) {
        profileContent.style.opacity = "0";
        profileContent.style.transform = "translateY(20px)";

        setTimeout(() => {
          profileContent.style.transition = "opacity 0.7s ease, transform 0.7s ease";
          profileContent.style.opacity = "1";
          profileContent.style.transform = "translateY(0)";
        }, 800);
      }
    }
  }, []);

  return (
      <div id="about" ref={profilesRef} className="py-24 w-full bg-gradient-to-br from-blue-50 to-violet-50">
        <div className="container mx-auto px-4 md:px-6">
          {/* Header section */}
          <div className="text-center mb-16">
            <h2 className="team-heading text-4xl md:text-5xl font-bold text-blue-800 mb-4">
              Nasz zespół
            </h2>
            <p className="team-subheading text-lg text-gray-600 max-w-2xl mx-auto">
              Poznaj entuzjastów, którzy tworzą Kayak Racing. Łączy nas pasja do kajakarstwa
              i tworzenia wyjątkowych doświadczeń dla graczy.
            </p>
          </div>

          {/* Team member selection */}
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            {teamMembers.map((member, index) => (
                <button
                    key={index}
                    onClick={() => handleProfileChange(index)}
                    className={`team-photo relative group transition-all duration-300 ${
                        activeProfile === index ? 'scale-110 z-10' : 'hover:scale-105'
                    }`}
                    aria-pressed={activeProfile === index ? "true" : "false"}
                    aria-label={`Wybierz profil: ${member.name}`}
                >
                  <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 transition-all flex items-center justify-center ${
                      activeProfile === index ? 'border-blue-500 bg-blue-100' : 'border-white bg-gray-100 group-hover:border-blue-300'
                  }`}>
                    {/* Use FaUser icon instead of images */}
                    <FaUser className={`text-4xl ${activeProfile === index ? 'text-blue-700' : 'text-gray-600'}`} />
                  </div>
                  <span className={`block mt-2 text-center font-medium transition-all ${
                      activeProfile === index ? 'text-blue-700' : 'text-gray-600 group-hover:text-blue-600'
                  }`}>
                {member.name}
              </span>
                </button>
            ))}
          </div>

          {/* Profile details */}
          <div
              ref={profileContentRef}
              className="profile-content bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {/* Profile card (left side) */}
              <div className="md:col-span-1 bg-gradient-to-br from-blue-500 to-violet-600 p-8 text-white flex flex-col items-center justify-center">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white/30 mb-6 bg-blue-100 flex items-center justify-center">
                  <FaUser className="text-6xl text-blue-700" />
                </div>
                <h3 className="text-2xl font-bold">{teamMembers[activeProfile].name}</h3>
                <p className="text-blue-100 mb-6">{teamMembers[activeProfile].role}</p>

                <div className="flex gap-4">
                  <a href={teamMembers[activeProfile].social.linkedin} className="text-white hover:text-blue-200 transition-colors">
                    <FaLinkedin size={20} />
                  </a>
                  <a href={teamMembers[activeProfile].social.twitter} className="text-white hover:text-blue-200 transition-colors">
                    <FaTwitter size={20} />
                  </a>
                  <a href={`mailto:${teamMembers[activeProfile].social.email}`} className="text-white hover:text-blue-200 transition-colors">
                    <FaEnvelope size={20} />
                  </a>
                </div>
              </div>

              {/* Profile information (right side) */}
              <div className="md:col-span-2 p-8">
                <h4 className="text-xl font-semibold text-gray-800 mb-4">O mnie</h4>
                <p className="text-gray-600 mb-6">
                  {teamMembers[activeProfile].description}
                </p>

                <h4 className="text-xl font-semibold text-gray-800 mb-3">Umiejętności</h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {teamMembers[activeProfile].skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {skill}
                  </span>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-gray-500 italic">
                    "Tworzenie Kayak Racing to nie tylko praca, to nasza pasja, która pozwala nam łączyć
                    miłość do kajakarstwa z projektowaniem gier."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Team values section */}
          <div className="mt-20 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-blue-800 mb-8">Nasze wartości</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-xl shadow-md">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-3">Innowacja</h4>
                <p className="text-gray-600">
                  Stale poszukujemy nowych rozwiązań i technologii, które pozwolą nam dostarczać
                  unikalne doświadczenia w naszej grze.
                </p>
              </div>

              <div className="p-6 bg-white rounded-xl shadow-md">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-3">Współpraca</h4>
                <p className="text-gray-600">
                  Wierzymy, że najlepsze pomysły rodzą się w zespole. Każdy członek naszej ekipy
                  wnosi unikalne umiejętności i perspektywę.
                </p>
              </div>

              <div className="p-6 bg-white rounded-xl shadow-md">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-3">Jakość</h4>
                <p className="text-gray-600">
                  Stawiamy na najwyższą jakość w każdym aspekcie naszej gry - od fizyki wody
                  po oprawę audiowizualną i user experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default About;