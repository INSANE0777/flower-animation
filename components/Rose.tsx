import { motion, Variants } from "framer-motion";
import { useState } from "react";

const Rose = ({ x = 0, y = 0, scale = 1, delayOffset = 0 }) => {
  const [bloomed, setBloomed] = useState(true);
  const toggleBloom = () => setBloomed(!bloomed);

  const petalVariants: Variants = {
    initial: { scale: 0, opacity: 0, rotate: -30 },
    animate: { scale: 1, opacity: 1, rotate: 0 },
    wilt: { scale: 0.5, opacity: 0.5, rotate: 10 },
    hover: { scale: 1.1, rotate: 5 },
    tap: { scale: 0.9 },
  };

  const petalTransition = (delay: number) => ({
    duration: 1.5,
    delay,
    ease: "easeOut",
  });

  const petalColors = [
    "#FF6B6B",
    "#FF8787",
    "#FFA5A5",
    "#FFC2C2",
    "#FFDADA",
    "#FFE3E3",
    "#FFF0F0",
    "#FFF8F8"
  ];

  const petalPath =
    "M150 150 " +
    "C 140 120, 110 120, 100 150 " +
    "C 90 180, 110 210, 150 220 " +
    "C 190 210, 210 180, 200 150 " +
    "C 190 120, 160 120, 150 150 Z";

  const smallFlowerVariants: Variants = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    wilt: { scale: 0.5, opacity: 0.5 },
    hover: { scale: 1.2 },
    tap: { scale: 0.8 },
  };

  const flowerClusters = [
    { cx: 140, cy: 300 },
    { cx: 160, cy: 300 },
    { cx: 140, cy: 330 },
    { cx: 160, cy: 330 },
    { cx: 140, cy: 360 },
    { cx: 160, cy: 360 },
  ];

  const swirlVariants: Variants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 0.5, scale: 1.2 },
  };

  return (
    <motion.g
      onClick={toggleBloom}
      style={{ cursor: "pointer" }}
      initial="initial"
      animate={bloomed ? "animate" : "wilt"}
      whileHover="hover"
      whileTap="tap"
      transform={`translate(${x}, ${y}) scale(${scale})`}
    >
      <motion.g>
        {petalColors.map((color, index) => (
          <motion.path
            key={index}
            d={petalPath}
            fill={color}
            stroke="#FF4040"
            strokeWidth="0.5"
            variants={petalVariants}
            transition={petalTransition(index * 0.1 + delayOffset)}
            style={{
              transformOrigin: "center",
              transform: `scale(${0.6 + index * 0.05}) rotate(${index * 30}deg)`,
              filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.2))"
            }}
          />
        ))}
      </motion.g>
      <motion.path
        d="M150 220 C 150 260, 180 320, 150 370"
        stroke="#228B22"
        strokeWidth="4"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 1 + delayOffset }}
        style={{ filter: "drop-shadow(0 3px 3px rgba(0,0,0,0.3))" }}
      />
      {flowerClusters.map((cluster, index) => (
        <motion.g
          key={index}
          variants={smallFlowerVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 2 + index * 0.3 + delayOffset }}
        >
          <circle cx={cluster.cx} cy={cluster.cy} r="8" fill="#FFB3BA" />
          {[0, 72, 144, 216, 288].map((angle) => (
            <motion.path
              key={angle}
              d={`M ${cluster.cx} ${cluster.cy} l ${
                Math.cos((angle * Math.PI) / 180) * 8
              } ${Math.sin((angle * Math.PI) / 180) * 8}`}
              stroke="#FF69B4"
              strokeWidth="2"
            />
          ))}
        </motion.g>
      ))}
      <motion.path
        d="M150 260 C 130 240, 110 250, 100 280"
        stroke="#228B22"
        strokeWidth="4"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 1.5 + delayOffset }}
      />
      <motion.path
        d="M150 260 C 170 240, 190 250, 200 280"
        stroke="#228B22"
        strokeWidth="4"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 1.5 + delayOffset }}
      />
      <motion.circle
        cx="150"
        cy="200"
        r="100"
        stroke="#FF69B4"
        strokeWidth="2"
        fill="none"
        variants={swirlVariants}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: delayOffset }}
      />
    </motion.g>
  );
};

const MultipleRoses = () => {
  const roses = [
    { x: 0, y: 0, scale: 0.8, delay: 0 },
    { x: 150, y: 20, scale: 1, delay: 0.2 },
    { x: -100, y: 50, scale: 0.9, delay: 0.4 },
    { x: 80, y: 180, scale: 1.1, delay: 0.1 },
    { x: 200, y: 250, scale: 0.85, delay: 0.3 },
  ];

  return (
    <div className="w-full h-full">
      <motion.svg
        className="w-full h-full"
        viewBox="0 0 600 600"
        style={{ overflow: "visible" }}
      >
        {roses.map((rose, idx) => (
          <Rose
            key={idx}
            x={rose.x}
            y={rose.y}
            scale={rose.scale}
            delayOffset={rose.delay}
          />
        ))}
      </motion.svg>
    </div>
  );
};

export default MultipleRoses;
