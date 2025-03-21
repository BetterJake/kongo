'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// ContentBlock component - doesn't directly reference Prism
const ContentBlock = ({ block }) => {
    const codeRef = useRef(null);

    // We don't try to directly highlight here anymore
    // The parent component will handle highlighting after Prism is loaded

    switch (block.type) {
        case 'text':
            return <p className="mb-4">{block.value}</p>;

        case 'image':
            return (
                <figure className="my-6">
                    <img
                        src={block.src}
                        alt={block.alt || ''}
                        className="w-full rounded-lg shadow-md"
                    />
                    {block.caption && (
                        <figcaption className="mt-2 text-center text-sm text-gray-600">
                            {block.caption}
                        </figcaption>
                    )}
                </figure>
            );

        case 'video':
            return (
                <figure className="my-6">
                    <video
                        className="w-full rounded-lg shadow-md"
                        controls
                        poster={block.poster}
                    >
                        <source src={block.src} type="video/mp4" />
                        Twoja przeglądarka nie obsługuje odtwarzania wideo.
                    </video>
                    {block.caption && (
                        <figcaption className="mt-2 text-center text-sm text-gray-600">
                            {block.caption}
                        </figcaption>
                    )}
                </figure>
            );

        case 'code':
            return (
                <div className="my-6">
                    <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
                        <code
                            ref={codeRef}
                            className={`language-${block.language || 'javascript'}`}
                        >
                            {block.value}
                        </code>
                    </pre>
                </div>
            );

        default:
            return null;
    }
};

const devlogs = [
    {
        id: 1,
        date: '10 Marca 2025',
        title: 'Ulepszenie systemu fizyki wody',
        content: [
            {
                type: 'text',
                value: 'Dzisiejsza aktualizacja skupia się na ulepszeniu systemu fizyki wody w naszej grze kajakowej. Zaimplementowaliśmy bardziej realistyczne zachowanie fal i prądów wodnych, które będą wpływać na sterowanie kajakiem. Każda rzeka ma teraz unikalne wzorce przepływu, które gracz musi opanować.'
            },
            {
                type: 'video',
                src: '/videos/hero-1.mp4',
                poster: '/img/water-physics-poster.jpg',
                caption: 'Demonstracja nowego systemu symulacji wody w grze'
            },
            {
                type: 'text',
                value: 'Dodaliśmy również zaawansowaną symulację reakcji kajaka na różne przeszkody - odbicie od kamieni czy przepłynięcie przez kaskady będzie teraz wymagać precyzyjnych ruchów. Poniżej znajduje się kluczowy fragment kodu odpowiedzialny za obliczanie dynamiki wody:'
            },
            {
                type: 'code',
                language: 'javascript',
                value: `// System obliczania dynamiki wody
class WaterDynamicsSystem {
  constructor(worldSize, resolution) {
    this.grid = new Array(resolution);
    this.resolution = resolution;
    this.cellSize = worldSize / resolution;
    this.velocities = [];
    
    // Inicjalizacja siatki
    for (let i = 0; i < resolution; i++) {
      this.grid[i] = new Array(resolution).fill(0);
    }
  }
  
  // Oblicza siłę i kierunek prądu w danym punkcie
  calculateFlowAtPosition(position) {
    const gridX = Math.floor(position.x / this.cellSize);
    const gridY = Math.floor(position.z / this.cellSize);
    
    if (gridX < 0 || gridX >= this.resolution || gridY < 0 || gridY >= this.resolution) {
      return { force: 0, direction: { x: 0, z: 0 } };
    }
    
    // Podstawowa wysokość wody w punkcie
    const baseHeight = this.grid[gridX][gridY];
    
    // Sprawdzanie sąsiednich komórek dla obliczenia gradientu
    const gradientX = this.calculateGradient(gridX, gridY, true);
    const gradientZ = this.calculateGradient(gridX, gridY, false);
    
    // Kierunek przepływu jest przeciwny do gradientu wysokości
    const direction = {
      x: -gradientX,
      z: -gradientZ
    };
    
    // Normalizacja wektora kierunku
    const magnitude = Math.sqrt(direction.x * direction.x + direction.z * direction.z);
    if (magnitude > 0) {
      direction.x /= magnitude;
      direction.z /= magnitude;
    }
    
    // Siła przepływu jest proporcjonalna do stromości spadku
    const force = magnitude * this.calculateFlowForce(gridX, gridY);
    
    return { force, direction };
  }
  
  // Pozostałe metody klasy...
}`
            },
            {
                type: 'text',
                value: 'Kluczowe zmiany wprowadzone w tej aktualizacji to:'
            },
            {
                type: 'text',
                value: '- Nowy model dynamiki płynów dla większej realizmu\n- Zróżnicowane wzorce prądów dla każdej lokalizacji\n- Ulepszona interakcja z przeszkodami\n- Dodane efekty wizualne wody (rozpryski, fale)\n- Ulepszony system kontroli dla większej precyzji'
            },
            {
                type: 'image',
                src: '/img/water-effects.jpg',
                alt: 'Wizualne efekty wody',
                caption: 'Nowe efekty wizualne wody z realistycznymi odblaskami i rozpryskami'
            }
        ],
        author: 'Mateusz, główny programista',
        authorImage: '/img/avatar-1.jpg'
    },
    {
        id: 2,
        date: '24 Lutego 2025',
        title: 'Nowe trasy i lokalizacje',
        content: [
            {
                type: 'text',
                value: 'Z radością ogłaszamy dodanie trzech nowych tras do naszej gry! Gracze mogą teraz ścigać się w Górskim Wąwozie (trasa zaawansowana z licznymi progami wodnymi), Spokojnej Dolinie (trasa dla początkujących z szerokimi zakolami) oraz w Parku Miejskim (trasa o średnim poziomie trudności z przeszkodami stworzonymi przez człowieka).'
            },
            {
                type: 'image',
                src: '/img/logo.png',
                alt: 'Górski Wąwóz',
                caption: 'Górski Wąwóz - najbardziej wymagająca trasa dla zaawansowanych graczy'
            },
            {
                type: 'text',
                value: 'Każda lokalizacja ma unikalny wygląd, dźwięki i wyzwania, które sprawdzą różne umiejętności graczy. Wszystkie trasy zostały starannie zaprojektowane, aby zapewnić optymalne wrażenia wyścigowe. Ponadto każda lokalizacja posiada różne tryby pogodowe, które mogą dynamicznie zmieniać się podczas wyścigu.'
            },
            {
                type: 'video',
                src: '/videos/hero-1.mp4',
                poster: '/img/tracks-overview-poster.jpg',
                caption: 'Przegląd wszystkich nowych tras w grze'
            },
            {
                type: 'text',
                value: 'Najważniejsze cechy nowych tras:\n\n- Górski Wąwóz: Wymagająca trasa z gwałtownymi spadkami i wąskimi przejściami\n- Spokojna Dolina: Idealna trasa dla początkujących z łagodnymi zakrętami i minimalną liczbą przeszkód\n- Park Miejski: Trasa o średnim poziomie trudności z unikalnymi przeszkodami jak mosty, tunele i sztuczne kanały'
            },
        ],
        author: 'Anna, projektantka poziomów',
        authorImage: '/img/avatar-2.jpg'
    },
    {
        id: 3,
        date: '5 Stycznia 2025',
        title: 'Tryb multiplayer i rankingi',
        content: [
            {
                type: 'text',
                value: 'Dodaliśmy długo oczekiwany tryb multiplayer do Kayak Racing! Teraz możesz ścigać się z maksymalnie 6 innymi graczami w czasie rzeczywistym. Zaimplementowaliśmy również system rankingowy, który śledzi Twoje najlepsze czasy i porównuje je z wynikami innych graczy na globalnej tablicy wyników.'
            },
            {
                type: 'image',
                src: '/img/multiplayer-mode.jpg',
                alt: 'Tryb multiplayer',
                caption: 'Ekran wyścigu w trybie multiplayer z 6 graczami'
            },
            {
                type: 'text',
                value: 'System matchmakingu dobiera przeciwników o podobnym poziomie umiejętności, zapewniając wyzwanie dla każdego gracza. Dodatkowo, wprowadziliśmy sezonowy system rankingowy z nagrodami dla najlepszych zawodników.'
            },
            {
                type: 'code',
                language: 'javascript',
                value: `// Fragment systemu matchmakingu
function findOptimalMatch(player, availablePlayers) {
  // Sortujemy dostępnych graczy według podobieństwa rankingu
  const sortedPlayers = [...availablePlayers].sort((a, b) => {
    const diffA = Math.abs(player.skillRating - a.skillRating);
    const diffB = Math.abs(player.skillRating - b.skillRating);
    return diffA - diffB;
  });
  
  // Wybieramy 5 najbliższych graczy (aby utworzyć pełny wyścig 6-osobowy)
  const optimalMatch = sortedPlayers.slice(0, 5);
  
  // Dodatkowa logika uwzględniająca historię wyścigów
  // Unikamy dopasowywania tych samych graczy zbyt często
  const recentlyPlayedWith = player.recentMatches
    .flatMap(match => match.players)
    .filter(p => p.id !== player.id);
  
  // Jeśli mamy wystarczająco dużo graczy, preferujemy nowych przeciwników
  if (sortedPlayers.length > 10) {
    return optimalMatch.filter(p => !recentlyPlayedWith.includes(p.id));
  }
  
  return optimalMatch;
}`
            },
            {
                type: 'text',
                value: 'Nowe funkcje trybu multiplayer:\n\n- Wyścigi w czasie rzeczywistym z maksymalnie 6 graczami\n- Zaawansowany system matchmakingu oparty na umiejętnościach\n- Globalna tablica wyników z filtrami (przyjaciele, region, świat)\n- System sezonowy z nagrodami dla najlepszych graczy\n- Możliwość tworzenia prywatnych lobbies z własnymi zasadami'
            },
            {
                type: 'video',
                src: '/videos/hero-1.mp4',
                poster: '/img/logo.png',
                caption: 'Demonstracja trybu multiplayer i systemu rankingowego'
            }
        ],
        author: 'Michał, programista systemów rozgrywki',
        authorImage: '/img/avatar-3.jpg'
    }
];

export default function DevlogPage() {
    const [activeLog, setActiveLog] = useState(0);
    const router = useRouter();

    // We'll use a custom approach to load Prism
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // First, define the global Prism object
            if (!window.Prism) {
                window.Prism = { manual: true };
            }

            // Create a script element to load Prism core
            const prismScript = document.createElement('script');
            prismScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js';
            prismScript.async = true;

            // After the core is loaded, load language components and apply highlighting
            prismScript.onload = () => {
                // Load theme CSS
                const styleLink = document.createElement('link');
                styleLink.rel = 'stylesheet';
                styleLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css';
                document.head.appendChild(styleLink);

                // Load JavaScript language support
                const jsScript = document.createElement('script');
                jsScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-javascript.min.js';
                jsScript.async = true;

                // Load C# language support
                const csharpScript = document.createElement('script');
                csharpScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-csharp.min.js';
                csharpScript.async = true;

                // After language components are loaded, highlight all code blocks
                const highlightAll = () => {
                    if (window.Prism && window.Prism.highlightAll) {
                        window.Prism.highlightAll();
                    }
                };

                jsScript.onload = highlightAll;
                csharpScript.onload = highlightAll;

                document.body.appendChild(jsScript);
                document.body.appendChild(csharpScript);
            };

            document.body.appendChild(prismScript);

            // Cleanup function
            return () => {
                if (prismScript.parentNode) {
                    prismScript.parentNode.removeChild(prismScript);
                }
            };
        }
    }, []);

    // Re-highlight when switching logs
    useEffect(() => {
        if (typeof window !== 'undefined' && window.Prism && window.Prism.highlightAll) {
            // Add a small delay to ensure the DOM is updated
            setTimeout(() => {
                window.Prism.highlightAll();
            }, 100);
        }
    }, [activeLog]);

    const handlePrevious = () => {
        setActiveLog((prev) => (prev === 0 ? devlogs.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setActiveLog((prev) => (prev === devlogs.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <nav className="bg-gray-900 text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <Link href="/" className="text-xl font-bold flex items-center">
                        <img src="/img/logo.png" alt="Kayak Racing" className="w-8 h-8 mr-2" />
                        Kayak Racing
                    </Link>
                    <Link href="/" className="hover:text-blue-400 transition">
                        Powrót do strony głównej
                    </Link>
                </div>
            </nav>

            <div className="flex-1 flex flex-col md:flex-row">
                {/* Sidebar */}
                <div className="bg-gray-100 p-5 md:w-1/4">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Wpisy DevLog</h2>
                    <ul className="space-y-2">
                        {devlogs.map((log, index) => (
                            <li key={log.id}>
                                <button
                                    onClick={() => setActiveLog(index)}
                                    className={`w-full text-left p-3 rounded transition ${
                                        activeLog === index
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    <div className="font-medium">{log.title}</div>
                                    <div className="text-sm opacity-80">{log.date}</div>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Main content */}
                <div className="flex-1 p-5 md:p-8 bg-white">
                    <div className="max-w-3xl mx-auto">
                        <div className="mb-4">
                            <span className="text-sm text-blue-600">{devlogs[activeLog].date}</span>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold mb-6">{devlogs[activeLog].title}</h1>

                        <div className="flex flex-col">
                            <div className="flex items-center mb-2">
                                <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden mr-4">
                                    {/* Avatar autora */}
                                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
                                </div>
                                <div>
                                    <div className="font-medium">{devlogs[activeLog].author}</div>
                                    <div className="text-sm text-gray-500">Kayak Racing Team</div>
                                </div>
                            </div>
                            <hr className="border-gray-300 w-full my-3" />
                        </div>

                        <div className="prose max-w-none">
                            {Array.isArray(devlogs[activeLog].content)
                                ? devlogs[activeLog].content.map((block, index) => (
                                    <ContentBlock
                                        key={index}
                                        block={block}
                                    />
                                ))
                                : devlogs[activeLog].content.split('\n\n').map((paragraph, i) => (
                                    <p key={i} className="mb-4">{paragraph}</p>
                                ))
                            }
                        </div>

                        {/* Navigation buttons */}
                        <div className="flex justify-between mt-12 pt-6 border-t border-gray-200">
                            <button
                                onClick={handleNext}
                                className="flex items-center text-blue-600 hover:text-blue-800 transition"
                            >
                                <FaArrowLeft className="mr-2" />
                                Poprzedni wpis
                            </button>

                            <button
                                onClick={handlePrevious}
                                className="flex items-center text-blue-600 hover:text-blue-800 transition"
                            >
                                Następny wpis
                                <FaArrowRight className="ml-2" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}