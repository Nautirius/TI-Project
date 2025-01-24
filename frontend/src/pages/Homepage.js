import React from 'react';
// import { Link } from 'react-router-dom';
import GameOfLife from "../components/GameOfLife/GameOfLife";
import GameOfLifeDescription from "../components/GameOfLife/GameOfLifeDescription";

export default function Homepage() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">

            <header className="bg-blue-600 text-white p-4 shadow-lg">
                <h1 className="text-3xl font-bold text-center">Gra w życie</h1>
            </header>

            <main className="flex-grow flex items-center justify-center">
                <div className="flex flex-col items-center justify-center w-full max-w-4xl p-4">
                    <article id="opis">
                        <GameOfLifeDescription/>
                    </article>
                    <article id="gra">
                        <GameOfLife/>
                    </article>
                </div>
            </main>
        </div>
    );
}
