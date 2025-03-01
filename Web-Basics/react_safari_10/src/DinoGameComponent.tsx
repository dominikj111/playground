import React, { useEffect, useRef, useState } from "react";

const DinoGameComponent: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [player1Lives, setPlayer1Lives] = useState(5);
    const [player2Lives, setPlayer2Lives] = useState(5);
    const [gameOver, setGameOver] = useState(false);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = 800;
        canvas.height = 300;
        canvas.style.border = "3px solid gold";

        let isRunning = true;
        let player1Y = 200, player2Y = 200;
        let gravity = 3;
        let velocity1 = 0, velocity2 = 0;
        let jumping1 = false, jumping2 = false;
        let obstacles: { x: number, y: number, width: number, height: number }[] = [];

        const jump = (player: number) => {
            if (player === 1 && !jumping1) {
                velocity1 = -20;
                jumping1 = true;
            } else if (player === 2 && !jumping2) {
                velocity2 = -20;
                jumping2 = true;
            }
        };

        const resetGame = () => {
            setPlayer1Lives(5);
            setPlayer2Lives(5);
            setGameOver(false);
            isRunning = true;
            obstacles = [];
            gameLoop();
        };

        const update = () => {
            if (!isRunning) return;

            // Update player 1
            player1Y += velocity1;
            velocity1 += gravity;
            if (player1Y >= 200) {
                player1Y = 200;
                jumping1 = false;
            }

            // Update player 2
            player2Y += velocity2;
            velocity2 += gravity;
            if (player2Y >= 200) {
                player2Y = 200;
                jumping2 = false;
            }

            // Move obstacles
            obstacles.forEach(obstacle => obstacle.x -= 5);
            if (obstacles.length === 0 || obstacles[obstacles.length - 1].x < 500) {
                obstacles.push({ x: 800, y: 220, width: 20, height: 40 });
            }
            if (obstacles[0] && obstacles[0].x < -20) obstacles.shift();

            // Check collisions
            for (const obstacle of obstacles) {
                if (obstacle.x < 50 && obstacle.x + obstacle.width > 20 && player1Y + 40 > obstacle.y) {
                    setPlayer1Lives(prev => {
                        if (prev - 1 === 0) {
                            setGameOver(true);
                            isRunning = false;
                        }
                        return prev - 1;
                    });
                }
                if (obstacle.x < 150 && obstacle.x + obstacle.width > 120 && player2Y + 40 > obstacle.y) {
                    setPlayer2Lives(prev => {
                        if (prev - 1 === 0) {
                            setGameOver(true);
                            isRunning = false;
                        }
                        return prev - 1;
                    });
                }
            }
        };

        const draw = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw ground
            ctx.fillStyle = "#222";
            ctx.fillRect(0, 240, canvas.width, 10);

            // Draw players
            ctx.fillStyle = "red";
            ctx.fillRect(20, player1Y, 30, 40);
            ctx.fillStyle = "blue";
            ctx.fillRect(120, player2Y, 30, 40);

            // Draw obstacles
            ctx.fillStyle = "green";
            obstacles.forEach(obstacle => {
                ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
            });
        };

        const gameLoop = () => {
            update();
            draw();
            if (isRunning) requestAnimationFrame(gameLoop);
        };

        window.addEventListener("keydown", (e) => {
            if (e.key === "ArrowUp") jump(1);
            if (e.key === "w") jump(2);
        });

        gameLoop();

        return () => {
            isRunning = false;
        };
    }, []);

    return (
        <div style={{ textAlign: "center" }}>
            <canvas ref={canvasRef} style={{ display: "block", margin: "auto" }} />
            <div>
                <button onClick={() => jump(1)} style={{ fontSize: "30px", padding: "15px 30px", margin: "10px" }}>Jump P1</button>
                <button onClick={() => jump(2)} style={{ fontSize: "30px", padding: "15px 30px", margin: "10px" }}>Jump P2</button>
                <button onClick={() => window.location.reload()} style={{ fontSize: "30px", padding: "15px 30px", margin: "10px" }}>Reset</button>
            </div>
            <div>
                <p>Player 1 Lives: {"❤️".repeat(player1Lives)}</p>
                <p>Player 2 Lives: {"❤️".repeat(player2Lives)}</p>
            </div>
            {gameOver && (
                <div>
                    <h2>{player1Lives === 0 ? "Player 2 Wins!" : "Player 1 Wins!"}</h2>
                    <button onClick={() => window.location.reload()} style={{ fontSize: "30px", padding: "15px 30px", margin: "10px" }}>Restart</button>
                </div>
            )}
        </div>
    );
};

export default DinoGameComponent;