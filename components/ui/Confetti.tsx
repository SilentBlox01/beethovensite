
import React, { useEffect, useRef } from 'react';

interface ConfettiProps {
    active: boolean;
    duration?: number;
}

export const Confetti: React.FC<ConfettiProps> = ({ active, duration = 3000 }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!active || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const particles: any[] = [];
        const colors = ['#22d3ee', '#34d399', '#a78bfa', '#fb7185', '#fbbf24'];

        for (let i = 0; i < 150; i++) {
            particles.push({
                x: width / 2,
                y: height / 2,
                vx: (Math.random() - 0.5) * 20,
                vy: (Math.random() - 0.5) * 20,
                size: Math.random() * 8 + 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                life: 100,
                decay: Math.random() * 0.05 + 0.02
            });
        }

        let animationId: number;
        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            let alive = false;
            particles.forEach(p => {
                if (p.life > 0) {
                    alive = true;
                    p.x += p.vx;
                    p.y += p.vy;
                    p.vy += 0.5; // Gravity
                    p.life -= 1;
                    p.size *= 0.96;

                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fillStyle = p.color;
                    ctx.fill();
                }
            });

            if (alive) {
                animationId = requestAnimationFrame(animate);
            }
        };

        animate();

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener('resize', resize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
        };
    }, [active]);

    if (!active) return null;

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-50"
        />
    );
};
