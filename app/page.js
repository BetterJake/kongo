'use client';

import { Suspense, lazy } from 'react';

// Import statycznych komponentów - te ładowane są od razu
import NavBar from '@/components/Navbar';
import Footer from '@/components/Footer';

import GitHubSection from '@/components/GitHubSection';



// Komponent ładowania
const LoadingComponent = () => (
    <div className="flex-center h-dvh w-screen bg-violet-50">
        <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
        </div>
    </div>
);

// Lazy loading dla cięższych komponentów
// Używamy lazy zamiast dynamic dla lepszej integracji z Suspense
const Hero = lazy(() => import('@/components/Hero'));
const GameFeatures = lazy(() => import('@/components/GameFeatures'));
const About = lazy(() => import('@/components/About'));
// Usunięto import komponentu Contact

export default function Home() {
    return (
        <main className="relative min-h-screen w-screen overflow-x-hidden">
            <NavBar />

            {/* Hero zawsze ładujemy jako pierwszy z własnym fallbackiem */}
            <Suspense fallback={<LoadingComponent />}>
                <Hero />
            </Suspense>

            {/* Pozostałe komponenty ładowane są leniwie w miarę scrollowania */}
            <Suspense fallback={<div className="h-96 flex-center bg-violet-50/50">Ładowanie...</div>}>
                <GameFeatures />
            </Suspense>

            <Suspense fallback={<div className="h-96 flex-center bg-violet-50/50">Ładowanie...</div>}>
                <About />
            </Suspense>

            {/* Sekcja GitHub */}
            <GitHubSection />

            <Footer />
        </main>
    );
}