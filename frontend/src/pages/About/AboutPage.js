import React from "react";

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-blue-50 p-8">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center">
                    Informacje o projekcie
                </h1>
                <div className="space-y-8">
                    {/* Project Name Section */}
                    <section>
                        <h2 className="text-2xl font-semibold text-blue-500 mb-4 text-center">
                            Strona edukacyjna Gra w życie
                        </h2>
                        <p className="text-gray-700 leading-relaxed text-left">
                            Symulator Gry w życie Johna Conwaya to interaktywne narzędzie edukacyjne ilustrujące zasady działania tego automatu komórkowego.
                        </p>
                    </section>

                    {/* Project Theme Section */}
                    <section>
                        <h2 className="text-2xl font-semibold text-blue-500 mb-4 text-center">
                            Temat projektu
                        </h2>
                        <p className="text-gray-700 leading-relaxed text-left">
                            Projekt ma na celu przedstawienie teorii i symulowanie działania automatu komórkowego Gry w życie.
                        </p>
                    </section>

                    {/* Project Features Section */}
                    <section>
                        <h2 className="text-2xl font-semibold text-blue-500 mb-4 text-center">
                            Funkcjonalności
                        </h2>
                        <ul className="list-disc pl-5 space-y-3 text-gray-700 leading-relaxed text-left">
                            <li>Przedstawienie teorii Gry w życie Conwaya.</li>
                            <li>Symulacja Gry w życie na interaktywnym obszarze canvas.</li>
                            <li>
                                Dostosowywanie parametrów symulacji, takich jak rozmiar siatki czy odstęp czasowy między
                                kolejnymi krokami.
                            </li>
                            <li>Rejestracja i logowanie użytkowników.</li>
                            <li>Zapisywanie ustawień w profilu użytkownika.</li>
                            <li>Wczytywanie zapisanych ustawień symulacji.</li>
                        </ul>
                    </section>

                    {/* Technologies Used Section */}
                    <section>
                        <h2 className="text-2xl font-semibold text-blue-500 mb-4 text-center">
                            Użyte technologie
                        </h2>
                        <ul className="list-disc pl-5 space-y-3 text-gray-700 leading-relaxed text-left">
                            <li><strong>Baza danych:</strong> PostgreSQL
                                <br/>Baza danych jest zahostowana na zdalnym serwerze.
                            </li>
                            <li><strong>Backend:</strong> Express.js
                                <br/>Serwer łączy się z bazą danych za pomocą pakietu pg. Uwierzytelnianie użytkowników
                                dokonywane jest za pomocą technologii JWT. Do szyfrowania haseł użytkowników wykorzystane
                                zostało narzędzie bcrypt.
                            </li>
                            <li><strong>Frontend:</strong> React.js
                                <br/>Aplikacja kliencka napisana została we frameworku React. Zbudowana wersja statyczna
                                jest udostępniana przez serwer Express.
                            </li>
                            <li><strong>Stylowanie:</strong> Tailwind, CSS
                                <br/>Do stylowania elementów strony użyty został Tailwind oraz CSS.
                            </li>
                            <li><strong>Symulacja:</strong> canvas
                                <br/>Plansza symulatora generowana jest za pomocą elementu canvas.
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
