"use client";

import { useEffect, useRef } from "react";

export default function Stars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas to full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createStars(); // Recreate stars on resize
    };
    window.addEventListener("resize", handleResize);

    // Star properties
    interface Star {
      x: number;
      y: number;
      radius: number;
      color: string;
      originalRadius: number;
      twinkleSpeed: number;
      twinklePhase: number;
      glowSize: number;
      glowOpacity: number;
    }

    // Shooting star properties
    interface ShootingStar {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;
      width: number;
    }

    const stars: Star[] = [];
    const shootingStars: ShootingStar[] = [];
    const starColors = [
      "#ffffff", // White
      "#fffaf0", // Snow
      "#f8f8ff", // Ghost White
      "#f0ffff", // Azure
      "#f5f5f5", // White Smoke
      "#fff5ee", // Seashell
      "#f0f8ff", // Alice Blue
      "#fffdd0", // Cream
    ];

    // Create stars
    const createStars = () => {
      stars.length = 0; // Clear existing stars

      // Create 200 regular stars
      for (let i = 0; i < 200; i++) {
        const radius = Math.random() * 2 + 0.5; // Varied sizes from 0.5 to 2.5
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius,
          originalRadius: radius,
          color: starColors[Math.floor(Math.random() * starColors.length)],
          twinkleSpeed: 0.01 + Math.random() * 0.03, // Different speeds
          twinklePhase: Math.random() * Math.PI * 2, // Random starting phase
          glowSize: radius * (2 + Math.random() * 3), // Glow size proportional to star
          glowOpacity: 0.1 + Math.random() * 0.3, // Random glow opacity
        });
      }

      // Create a few larger, brighter stars
      for (let i = 0; i < 20; i++) {
        const radius = Math.random() * 1.5 + 2; // Larger sizes from 2 to 3.5
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius,
          originalRadius: radius,
          color: "#ffffff", // Bright white for larger stars
          twinkleSpeed: 0.005 + Math.random() * 0.01, // Slower twinkle for larger stars
          twinklePhase: Math.random() * Math.PI * 2,
          glowSize: radius * (3 + Math.random() * 4), // Larger glow
          glowOpacity: 0.2 + Math.random() * 0.4, // Stronger glow
        });
      }
    };

    // Create a shooting star
    const createShootingStar = () => {
      const angle = Math.PI / 4 + (Math.random() * Math.PI) / 2; // Angle between 45 and 135 degrees
      shootingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height / 3), // Start in top third of screen
        length: 50 + Math.random() * 80, // Length of trail
        speed: 4 + Math.random() * 6,
        angle,
        opacity: 0.7 + Math.random() * 0.3,
        width: 1 + Math.random() * 2,
      });
    };

    // Initialize stars
    createStars();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw stars
      stars.forEach((star) => {
        // Update star twinkle
        star.twinklePhase += star.twinkleSpeed;
        const twinkleFactor = Math.sin(star.twinklePhase) * 0.5 + 0.5; // Value between 0 and 1
        const currentRadius = star.originalRadius * (0.7 + twinkleFactor * 0.6);

        // Draw star glow
        const gradient = ctx.createRadialGradient(
          star.x,
          star.y,
          0,
          star.x,
          star.y,
          star.glowSize
        );
        gradient.addColorStop(
          0,
          `rgba(255, 255, 255, ${star.glowOpacity * twinkleFactor})`
        );
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(star.x, star.y, star.glowSize, 0, Math.PI * 2);
        ctx.fill();

        // Draw star core
        ctx.beginPath();
        ctx.fillStyle = star.color;
        ctx.arc(star.x, star.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update and draw shooting stars
      for (let i = 0; i < shootingStars.length; i++) {
        const star = shootingStars[i];

        // Update position
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;

        // Check if out of bounds
        if (
          star.x < -star.length ||
          star.x > canvas.width + star.length ||
          star.y < -star.length ||
          star.y > canvas.height + star.length
        ) {
          shootingStars.splice(i, 1);
          i--;
          continue;
        }

        // Draw shooting star
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(
          star.x - Math.cos(star.angle) * star.length,
          star.y - Math.sin(star.angle) * star.length
        );

        // Create gradient for trail
        const gradient = ctx.createLinearGradient(
          star.x,
          star.y,
          star.x - Math.cos(star.angle) * star.length,
          star.y - Math.sin(star.angle) * star.length
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = star.width;
        ctx.stroke();
      }

      // Randomly create shooting stars
      if (Math.random() < 0.003) {
        // Approx every 5-10 seconds
        createShootingStar();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
}
