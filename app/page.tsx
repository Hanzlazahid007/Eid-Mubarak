// "use client";

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import Fireworks from "@/components/fireworks";

// export default function RamzanMubarak() {
//   const [moonPosition, setMoonPosition] = useState(false);
//   const [showFireworks, setShowFireworks] = useState(false);
//   const [showText, setShowText] = useState(false);

//   useEffect(() => {
//     // Start the animation sequence
//     const moonTimer = setTimeout(() => {
//       setMoonPosition(true);
//     }, 500);

//     // Show fireworks after moon reaches position
//     const fireworksTimer = setTimeout(() => {
//       setShowFireworks(true);
//     }, 3000); // This timing matches when the moon reaches center

//     // Show text after fireworks
//     const textTimer = setTimeout(() => {
//       setShowText(true);
//     }, 3500);

//     return () => {
//       clearTimeout(moonTimer);
//       clearTimeout(fireworksTimer);
//       clearTimeout(textTimer);
//     };
//   }, []);

//   return (
//     <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-blue-950 to-black">
//       {/* Stars background */}
//       <div className="absolute inset-0">
//         {Array.from({ length: 100 }).map((_, i) => (
//           <div
//             key={i}
//             className="absolute h-1 w-1 rounded-full bg-white"
//             style={{
//               top: `${Math.random() * 100}%`,
//               left: `${Math.random() * 100}%`,
//               opacity: Math.random() * 0.8 + 0.2,
//               animation: `twinkle ${Math.random() * 5 + 3}s infinite`,
//             }}
//           />
//         ))}
//       </div>

//       {/* Moon */}
//       <motion.div
//         className="absolute z-10"
//         initial={{ top: "5%", right: "5%", scale: 0.5 }}
//         animate={
//           moonPosition
//             ? { top: "30%", right: "50%", x: "50%", y: "-50%", scale: 1.5 }
//             : {}
//         }
//         transition={{ duration: 2.5, ease: "easeInOut" }}
//       >
//         <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-yellow-100 shadow-[0_0_40px_20px_rgba(255,248,220,0.8)]">
//           <div className="absolute right-2 top-3 h-16 w-16 rounded-full bg-blue-950 opacity-10"></div>
//           <div className="absolute bottom-4 left-4 h-6 w-6 rounded-full bg-gray-300/20"></div>
//           <div className="absolute bottom-10 right-6 h-4 w-4 rounded-full bg-gray-300/20"></div>
//         </div>
//       </motion.div>

//       {/* Fireworks */}
//       {showFireworks && <Fireworks />}

//       {/* Text */}
//       {showText && (
//         <div className="relative z-30 mt-32 text-center">
//           <div className="relative">
//             <h1 className="font-arabic mb-4 text-6xl font-bold text-transparent md:text-8xl">
//               <span className="animate-text-gradient bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-300 bg-clip-text bg-[length:400%_400%]">
//                 Ramzan Mubarak
//               </span>
//             </h1>
//             <div className="absolute -inset-1 -z-10 animate-pulse blur-xl">
//               <h1 className="font-arabic mb-4 text-6xl font-bold text-yellow-300 opacity-70 md:text-8xl">
//                 Ramzan Mubarak
//               </h1>
//             </div>
//           </div>
//           <p className="text-xl text-yellow-100/80 md:text-2xl">
//             To All Muslims Around The World
//           </p>
//         </div>
//       )}

//       {/* Add global styles for animations */}
//       <style jsx global>{`
//         @keyframes twinkle {
//           0%,
//           100% {
//             opacity: 0.2;
//           }
//           50% {
//             opacity: 1;
//           }
//         }

//         @keyframes text-gradient {
//           0%,
//           100% {
//             background-position: 0% 50%;
//           }
//           50% {
//             background-position: 100% 50%;
//           }
//         }

//         .animate-text-gradient {
//           animation: text-gradient 3s ease infinite;
//         }

//         .font-arabic {
//           font-family: "Arial", sans-serif;
//           letter-spacing: 0.05em;
//         }
//       `}</style>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Fireworks from "@/components/fireworks";
import Stars from "@/components/stars";

export default function RamzanMubarak() {
  const [moonPosition, setMoonPosition] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Start the animation sequence
    const moonTimer = setTimeout(() => {
      setMoonPosition(true);
    }, 500);

    // Show fireworks after moon reaches position
    const fireworksTimer = setTimeout(() => {
      setShowFireworks(true);
    }, 3000); // This timing matches when the moon reaches center

    // Show text after fireworks
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 3500);

    return () => {
      clearTimeout(moonTimer);
      clearTimeout(fireworksTimer);
      clearTimeout(textTimer);
    };
  }, []);

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-blue-950 to-black">
      {/* Stars background */}
      <Stars />

      {/* Moon */}
      <motion.div
        className="absolute z-10"
        initial={{ top: "5%", right: "5%", scale: 0.5 }}
        animate={
          moonPosition
            ? { top: "30%", right: "50%", x: "50%", y: "-50%", scale: 1.5 }
            : {}
        }
        transition={{ duration: 2.5, ease: "easeInOut" }}
      >
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-yellow-100 shadow-[0_0_40px_20px_rgba(255,248,220,0.8)]">
          <div className="absolute right-2 top-3 h-16 w-16 rounded-full bg-blue-950 opacity-10"></div>
          <div className="absolute bottom-4 left-4 h-6 w-6 rounded-full bg-gray-300/20"></div>
          <div className="absolute bottom-10 right-6 h-4 w-4 rounded-full bg-gray-300/20"></div>
        </div>
      </motion.div>

      {/* Fireworks */}
      {showFireworks && <Fireworks />}

      {/* Text */}
      {showText && (
        <div className="relative z-30 mt-32 text-center">
          <div className="relative">
            <h1 className="font-arabic mb-4 text-6xl font-bold text-transparent md:text-8xl">
              <span className="animate-text-gradient bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-300 bg-clip-text bg-[length:400%_400%]">
                EID MUBARAK
              </span>
            </h1>
            <div className="absolute -inset-1 -z-10 animate-pulse blur-xl">
              <h1 className="font-arabic  mb-4 text-6xl font-bold text-yellow-300 opacity-70 md:text-8xl">
                EID MUBARAK
              </h1>
            </div>
          </div>
          <p className="text-xl text-yellow-100/80 md:text-2xl">
            To All Muslims Around The World
          </p>
        </div>
      )}

      {/* Add global styles for animations */}
      <style jsx global>{`
        @keyframes text-gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-text-gradient {
          animation: text-gradient 3s ease infinite;
        }

        .font-arabic {
          font-family: "Arial", sans-serif;
          letter-spacing: 0.05em;
        }
      `}</style>
    </div>
  );
}
