// "use client";

// import { useEffect, useRef } from "react";

// interface Particle {
//   x: number;
//   y: number;
//   color: string;
//   velocity: { x: number; y: number };
//   alpha: number;
//   size: number;
// }

// const colors = [
//   "#FF0000",
//   "#00FF00",
//   "#0000FF",
//   "#FFFF00",
//   "#FF00FF",
//   "#00FFFF",
// ];

// export default function Fireworks() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const particlesRef = useRef<Particle[]>([]);
//   const animationRef = useRef<number>(0);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     // Set canvas to full screen
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     // Handle window resize
//     const handleResize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };
//     window.addEventListener("resize", handleResize);

//     // Create fireworks at random intervals
//     const createFirework = () => {
//       // Distribute fireworks across the full width
//       const x = Math.random() * canvas.width;
//       const y = canvas.height;
//       const color = colors[Math.floor(Math.random() * colors.length)];

//       // Create particles for the firework
//       for (let i = 0; i < 100; i++) {
//         const angle = Math.random() * Math.PI * 2;
//         const velocity = 2 + Math.random() * 3;

//         particlesRef.current.push({
//           x,
//           y,
//           color,
//           velocity: {
//             x: Math.cos(angle) * velocity,
//             y: Math.sin(angle) * velocity - 5, // Upward initial velocity
//           },
//           alpha: 1,
//           size: 2 + Math.random() * 2, // Original size from user's code
//         });
//       }
//     };

//     // Animation loop
//     const animate = () => {
//       // Clear the canvas completely for a transparent background
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       // Update and draw particles
//       particlesRef.current.forEach((particle, index) => {
//         // Apply gravity
//         particle.velocity.y += 0.05;

//         // Update position
//         particle.x += particle.velocity.x;
//         particle.y += particle.velocity.y;

//         // Fade out
//         particle.alpha -= 0.005; // Original fade rate from user's code

//         // Remove faded particles
//         if (particle.alpha <= 0) {
//           particlesRef.current.splice(index, 1);
//           return;
//         }

//         // Draw particle
//         ctx.globalAlpha = particle.alpha;
//         ctx.fillStyle = particle.color;
//         ctx.beginPath();
//         ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
//         ctx.fill();
//       });

//       ctx.globalAlpha = 1;

//       animationRef.current = requestAnimationFrame(animate);
//     };

//     // Start animation
//     animate();

//     // Create fireworks every 600ms for better distribution across width
//     const fireworkInterval = setInterval(() => {
//       createFirework();
//     }, 600);

//     // Create initial fireworks distributed across width
//     for (let i = 0; i < 5; i++) {
//       setTimeout(() => {
//         createFirework();
//       }, i * 200);
//     }

//     // Cleanup
//     return () => {
//       window.removeEventListener("resize", handleResize);
//       clearInterval(fireworkInterval);
//       cancelAnimationFrame(animationRef.current);
//     };
//   }, []);

//   return (
//     <canvas ref={canvasRef} className="absolute inset-0 z-20 w-full h-full" />
//   );
// }

"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  color: string;
  velocity: { x: number; y: number };
  alpha: number;
  size: number;
}

const colors = [
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
];

export default function Fireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
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
    };
    window.addEventListener("resize", handleResize);

    // Create fireworks at random intervals
    const createFirework = () => {
      // Distribute fireworks across the full width
      const x = Math.random() * canvas.width;
      const y = canvas.height;
      const color = colors[Math.floor(Math.random() * colors.length)];

      // Create particles for the firework
      for (let i = 0; i < 100; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = 2 + Math.random() * 3;

        particlesRef.current.push({
          x,
          y,
          color,
          velocity: {
            x: Math.cos(angle) * velocity,
            y: Math.sin(angle) * velocity - 5, // Upward initial velocity
          },
          alpha: 1,
          size: 2 + Math.random() * 2, // Original size from user's code
        });
      }
    };

    // Animation loop
    const animate = () => {
      // Clear the canvas completely for a transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Apply gravity
        particle.velocity.y += 0.05;

        // Update position
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;

        // Fade out
        particle.alpha -= 0.005; // Original fade rate from user's code

        // Remove faded particles
        if (particle.alpha <= 0) {
          particlesRef.current.splice(index, 1);
          return;
        }

        // Draw particle
        ctx.globalAlpha = particle.alpha;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Create fireworks every 600ms for better distribution across width
    const fireworkInterval = setInterval(() => {
      createFirework();
    }, 600);

    // Create initial fireworks distributed across width
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        createFirework();
      }, i * 200);
    }

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(fireworkInterval);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 z-20 w-full h-full" />
  );
}
