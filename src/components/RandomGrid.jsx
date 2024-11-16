import { useState, useEffect } from "react";

function RandomDecimalGrid() {
    const [grid, setGrid] = useState([]);

    // Rastgele bir 64x64 grid oluşturur
    const generateGrid = () => {
        const newGrid = Array.from({ length: 32 }, () =>
            Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16).toUpperCase())
        );
        setGrid(newGrid);
    };

    useEffect(() => {
        // Her 200ms'de bir grid güncellenir
        const interval = setInterval(generateGrid, 200);
        return () => clearInterval(interval); // Bileşen unmount edildiğinde interval temizlenir
    }, []);

    return (
        <div className="bg-black w-96 h-96 grid grid-cols-random grid-rows-random">
        {grid.map((row, rowIndex) =>
            row.map((value, colIndex) => (
                    <span
                        key={`${rowIndex}-${colIndex}`}
                        className="text-green-500 text-opacity-80 font-mono text-[8px] flex items-center justify-center"
                    >
                        {value}
                    </span>
                ))
            )}
        </div>
    );
}

export default RandomDecimalGrid;
