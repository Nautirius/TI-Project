import React, { useEffect, useState, useContext } from "react";
import GameBoard from "./GameBoard";
import {AuthContext} from "../../context/AuthContext";
import config from '../../config';


const GameOfLife = () => {
    const [numRows, setNumRows] = useState(40);
    const [numCols, setNumCols] = useState(60);
    const [cellSize, setCellSize] = useState(10);
    const [delay, setDelay] = useState(100);
    const [isRunning, setIsRunning] = useState(false);
    const [grid, setGrid] = useState([]);

    const canvasWidth = 600; // Canvas width
    const canvasHeight = 400; // Canvas height

    const { user } = useContext(AuthContext);


    // Get settings
    useEffect(() => {
        if (user) {
            setNumRows(user.settings.num_rows);
            setNumCols(user.settings.num_cols);
            setDelay(user.settings.delay);
        }
    }, [user]);

    // Recalculate cell size whenever numRows or numCols changes
    useEffect(() => {
        const newCellSize = Math.min(
            Math.floor(canvasWidth / numCols),
            Math.floor(canvasHeight / numRows)
        );
        setCellSize(newCellSize);
        setGrid(createGrid(numRows, numCols, 0.3)); // Reset grid with new size
    }, [numRows, numCols]);

    // Initialize the grid
    const createGrid = (numRows, numCols, initialFill) => {
        const newGrid = [];
        for (let i = 0; i < numRows; i++) {
            newGrid[i] = [];
            for (let j = 0; j < numCols; j++) {
                newGrid[i][j] = Math.random() < initialFill ? 1 : 0;
            }
        }
        return newGrid;
    };

    // Function to count live neighbors of a cell
    const countNeighbors = (grid, row, col) => {
        let count = 0;
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], /* Cell */ [0, 1],
            [1, -1], [1, 0], [1, 1],
        ];
        for (const [dx, dy] of directions) {
            const r = row + dx;
            const c = col + dy;
            if (r >= 0 && r < numRows && c >= 0 && c < numCols) {
                count += grid[r][c];
            }
        }
        return count;
    };

    // Function to update the grid based on Conway's rules
    const updateGrid = (grid) => {
        const newGrid = [];
        for (let i = 0; i < numRows; i++) {
            newGrid[i] = [];
            for (let j = 0; j < numCols; j++) {
                const neighbors = countNeighbors(grid, i, j);
                if (grid[i][j] === 1 && (neighbors < 2 || neighbors > 3)) {
                    newGrid[i][j] = 0;
                } else if (grid[i][j] === 0 && neighbors === 3) {
                    newGrid[i][j] = 1;
                } else {
                    newGrid[i][j] = grid[i][j];
                }
            }
        }
        return newGrid;
    };

    const resetToDefaultSettings = () => {
        setNumRows(40);
        setNumCols(60);
        setDelay(100);
        setGrid(createGrid(40, 60, 0.3)); // Reset grid with default size
    };

    const saveSettings = async () => {
        try {
            const token = localStorage.getItem('jwt');

            const response = await fetch(`${config.API_BASE_URL}/user/save-settings`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    numRows,
                    numCols,
                    delay,
                }),
            });

            if (!response.ok) {
                throw new Error("Błąd zapisywania ustawień");
            }

            alert("Ustawienia zostały zapisane pomyślnie!");
        } catch (error) {
            console.error(error.message);
            alert("Wystąpił błąd podczas zapisywania ustawień");
        }
    };


    // Main simulation loop
    useEffect(() => {
        if (!isRunning) return;

        const intervalId = setInterval(() => {
            setGrid((prevGrid) => updateGrid(prevGrid));
        }, delay);

        return () => clearInterval(intervalId);
    }, [isRunning, delay]);

    // Reset the grid on first render or when parameters change
    useEffect(() => {
        const newGrid = createGrid(numRows, numCols, 0.3);
        setGrid(newGrid);
    }, [numRows, numCols]);


    return (
        <div className="min-h-screen bg-blue-50 p-8">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <div className="flex flex-col items-center justify-center p-4">
                    <h1 className="mb-8 text-center text-2xl font-bold">Symulator Gry w życie Conwaya</h1>
                    <GameBoard grid={grid} cellSize={cellSize} />
                    <div className="flex flex-wrap justify-center gap-4 mt-4">
                    <button
                        onClick={() => setIsRunning(true)}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Start
                    </button>
                    <button
                        onClick={() => setIsRunning(false)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                        Pauza
                    </button>
                    <button
                        onClick={() => {
                            setIsRunning(false);
                            setGrid(createGrid(numRows, numCols, 0.3));
                        }}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Restart
                    </button>
                    <button
                        onClick={resetToDefaultSettings}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Resetuj do domyślnych
                    </button>
                    {user && (
                        <button
                            onClick={saveSettings}
                            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                        >
                            Zapisz ustawienia
                        </button>
                    )}
                </div>
                    <div className="mt-4 flex flex-col items-center gap-4">
                <div className="flex gap-2">
                    <label className="text-sm font-medium">Odstęp (ms): </label>
                    <input
                        type="number"
                        value={delay}
                        onChange={(e) => setDelay(Number(e.target.value))}
                        className="border rounded px-2 py-1 w-20"
                    />
                </div>
                <div className="flex gap-2">
                    <label className="text-sm font-medium">Rzędy: </label>
                    <input
                        type="number"
                        value={numRows}
                        disabled={isRunning}
                        onChange={(e) => setNumRows(Number(e.target.value))}
                        className="border rounded px-2 py-1 w-20"
                    />
                    <label className="text-sm font-medium">Kolumny: </label>
                    <input
                        type="number"
                        value={numCols}
                        disabled={isRunning}
                        onChange={(e) => setNumCols(Number(e.target.value))}
                        className="border rounded px-2 py-1 w-20"
                    />
                </div>
            </div>
                </div>
           </div>
        </div>
    );
};

export default GameOfLife;
