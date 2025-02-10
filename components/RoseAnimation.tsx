"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import Rose from "./Rose";
import Background from "./Background";

const RoseAnimation = () => {
  // Create an animation control for the rose oscillation
  const roseControls = useAnimation();

  useEffect(() => {
    roseControls.start({
      scale: [1, 1.05, 1],
      rotate: [0, 3, -3, 0],
      transition: { duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" },
    });
  }, [roseControls]);

  return (
    <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden">
      <Background />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative"
      >
        {/* Rose with an added oscillating animation */}
        <motion.div animate={roseControls}>
          <Rose />
        </motion.div>

        {/* Decorative text with additional interactive effects */}
        <motion.h1
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full text-3xl font-serif text-pink-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1 }}
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          For you {"<3"}
        </motion.h1>

        {/* Floating butterflies with multi-step keyframe animations */}
        {[...Array(3)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{
              top: `${20 + index * 30}%`,
              left: `${80 + index * 10}%`,
            }}
            animate={{
              x: [0, 15, 0, -15, 0],
              y: [0, -10, 0, 10, 0],
              rotate: [0, 10, 0, -10, 0],
              scale: [1, 1.2, 1, 0.8, 1],
            }}
            transition={{
              duration: 4 + index,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg width="25" height="25" viewBox="0 0 20 20">
              <path
                d="M10 3 L14 0 L18 3 L14 6 Z M10 3 L6 0 L2 3 L6 6 Z"
                fill="#FFB3BA"
                stroke="#FF69B4"
              />
            </svg>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default RoseAnimation;
