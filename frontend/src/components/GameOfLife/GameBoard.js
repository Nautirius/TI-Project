import React, { useEffect, useRef } from "react";
import PureCanvas from "./PureCanvas";

const GameBoard = ({ grid, cellSize }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        grid.forEach((row, i) => {
            row.forEach((cell, j) => {
                if (cell === 1) {
                    ctx.fillStyle = "black";
                    ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
                } else {
                    ctx.clearRect(j * cellSize, i * cellSize, cellSize, cellSize);
                }
            });
        });
    }, [grid, cellSize]);

    return (
        <PureCanvas
            contextRef={(ctx) => {
                if (canvasRef.current === null) {
                    canvasRef.current = ctx.canvas;
                }
            }}
        />
    );
};

export default GameBoard;