'use client';

const GitHubSection = () => {
    return (
        <section className="relative py-20 overflow-hidden">
            {/* Tło animacji */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-10 left-1/4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-10 right-1/4 w-72 h-72 bg-violet-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            <div className="container relative mx-auto px-4 text-center z-10">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                        Odkryj nasz kod
                    </h2>
                    <p className="text-gray-700 mb-12 leading-relaxed">
                        Kayak Racing to więcej niż gra - to projekt, który tworzymy wspólnie z naszą społecznością.
                        Zajrzyj za kulisy, sprawdź kod źródłowy i dołącz do naszego zespołu deweloperów.
                    </p>

                    <a
                        href="https://github.com/twoja-nazwa/kayak-racing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative inline-flex items-center group"
                    >
                        <span className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-r from-blue-600 to-violet-600 filter blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300"></span>
                        <span className="relative inline-flex items-center px-8 py-4 bg-white text-gray-900 font-bold rounded-full transition-transform duration-300 group-hover:scale-105">
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              Github Repository
            </span>
                    </a>

                    {/* Dodaj style animacji */}
                    <style jsx>{`
            @keyframes blob {
              0% { transform: translate(0px, 0px) scale(1); }
              33% { transform: translate(30px, -50px) scale(1.1); }
              66% { transform: translate(-20px, 20px) scale(0.9); }
              100% { transform: translate(0px, 0px) scale(1); }
            }
            .animate-blob {
              animation: blob 7s infinite;
            }
            .animation-delay-2000 {
              animation-delay: 2s;
            }
            .animation-delay-4000 {
              animation-delay: 4s;
            }
          `}</style>
                </div>
            </div>
        </section>
    );
};

export default GitHubSection;