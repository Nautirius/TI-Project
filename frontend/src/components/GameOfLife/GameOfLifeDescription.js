import React from "react";

const GameOfLifeDescription = () => {
    return (
        <div className="min-h-screen bg-blue-50 p-8">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center">
                    Gra w Życie Conwaya
                </h1>
                <div className="space-y-8">
                    {/* Introduction */}
                    <section>
                        <h2 className="text-2xl font-semibold text-blue-500 mb-4 text-center">
                            Wstęp
                        </h2>
                        <p className="text-gray-700 leading-relaxed text-left">
                            Gra w Życie (Life, The Game of Life) to jeden z pierwszych i najbardziej znanych przykładów
                            automatu komórkowego, wymyślony w roku 1970 przez brytyjskiego matematyka Johna Conwaya.
                        </p>
                        <p className="text-gray-700 leading-relaxed text-left">
                            Przebieg gry zależy wyłącznie od początkowego stanu planszy i ustalonych reguł.
                            Symulacja ta pokazuje, jak proste zasady mogą prowadzić do powstawania złożonych wzorców
                            i zachowań w środowisku siatki komórek.
                        </p>
                    </section>

                    {/* Game rules */}
                    <section>
                        <h2 className="text-2xl font-semibold text-blue-500 mb-4 text-center">
                            Zasady gry
                        </h2>
                        <ul className="list-disc pl-5 space-y-3 text-gray-700 leading-relaxed text-left">
                            <li>
                                Plansza składa się z prostokątnej siatki komórek, które mogą być
                                w jednym z dwóch stanów: żywa (1) lub martwa (0).
                            </li>
                            <li>
                                Każda komórka ma ośmiu sąsiadów, czyli komórki otaczające ją z każdej strony
                                (również po skosie).
                            </li>
                            <li>
                                Na podstawie liczby żywych sąsiadów komórka zmienia swój stan w
                                kolejnym kroku symulacji:
                                <ul className="list-inside list-disc pl-5 mt-2 space-y-1">
                                    <li>
                                        Komórka żywa pozostaje żywa, jeśli ma dwóch lub trzech
                                        żywych sąsiadów. W przeciwnym razie umiera (z powodu
                                        samotności lub przeludnienia).
                                    </li>
                                    <li>
                                        Komórka martwa staje się żywa, jeśli dokładnie trzech jej
                                        sąsiadów jest żywych (powstaje nowe życie).
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </section>

                    {/* Examples of patterns */}
                    <section>
                        <h2 className="text-2xl font-semibold text-blue-500 mb-4 text-center">
                            Przykładowe wzorce
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4 text-left">
                            Gra w Życie Conwaya charakteryzuje się powstawaniem różnorodnych
                            wzorców. Oto kilka przykładów:
                        </p>
                        <ul className="list-disc pl-5 space-y-3 text-gray-700 leading-relaxed text-left">
                            <li>
                                <strong>Niezmienne</strong>: Wzorce, które pozostają
                                niezmienione, np. „Blok” lub „Łódź”.
                            </li>
                            <li>
                                <strong>Oscylatory</strong>: Wzorce, które zmieniają się w
                                regularnych cyklach, np. „Żabka” lub „Blinker”.
                            </li>
                            <li>
                                <strong>Statki</strong>: Wzorce, które przemieszczają się po
                                planszy, np. „Glider” lub „LWSS Light Weight Spaceship”.
                            </li>
                            <li>
                                <strong>Działa</strong>: Oscylatory, które co jeden okres „wyrzucają” z siebie jeden
                                statek, który odłącza się i egzystuje samodzielnie, np. „Gosper Glider Gun".
                            </li>
                        </ul>
                    </section>

                    {/* Use cases */}
                    <section>
                        <h2 className="text-2xl font-semibold text-blue-500 mb-4 text-center">
                            Zastosowania
                        </h2>
                        <p className="text-gray-700 leading-relaxed text-left">
                            Chociaż Gra w Życie jest prostym automatem komórkowym, ma
                            zastosowania w różnych dziedzinach nauki i technologii, w tym:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-3 text-gray-700 leading-relaxed text-left">
                            <li>
                                Badania nad systemami dynamicznymi i teorią chaosu.
                            </li>
                            <li>
                                Modelowanie procesów biologicznych, takich jak wzrost kolonii
                                bakterii.
                            </li>
                            <li>
                                Eksperymentowanie z algorytmami sztucznej inteligencji i
                                symulacjami komputerowymi.
                            </li>
                        </ul>
                    </section>

                    {/* Summary */}
                    <section>
                        <h2 className="text-2xl font-semibold text-blue-500 mb-4 text-center">
                            Podsumowanie
                        </h2>
                        <p className="text-gray-700 leading-relaxed text-left">
                            Gra w Życie Conwaya to fascynujący przykład, jak proste reguły
                            mogą prowadzić do złożonych i często nieprzewidywalnych wyników.
                            Jest to jednocześnie zabawa, narzędzie edukacyjne i inspiracja do
                            badań naukowych.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default GameOfLifeDescription;
