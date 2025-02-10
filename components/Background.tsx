import { motion } from "framer-motion";

const Background = () => {
  const particles = Array.from({ length: 30 }, (_, i) => i);
  const swirls = Array.from({ length: 5 }, (_, i) => i);

  return (
    <div className="fixed inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #ffdde1, #ee9ca7, #c18c9e)",
          backgroundSize: "200% 200%",
        }}
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      {particles.map((_, index) => {
        const size = Math.random() * 10 + 5;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = Math.random() * 3 + 2;
        const xDrift = Math.random() * 20 - 10;
        const yDrift = Math.random() * 20 - 10;
        const rotation = Math.random() * 360;
        return (
          <motion.div
            key={index}
            className="absolute rounded-full bg-white opacity-30"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: `${top}%`,
            }}
            animate={{
              x: [0, xDrift, 0],
              y: [0, yDrift - 10, 0],
              rotate: [rotation, rotation + 45, rotation],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        );
      })}
      {swirls.map((_, index) => {
        const startX = index * 120;
        const delay = index * 0.5;
        return (
          <motion.svg
            key={index}
            viewBox="0 0 600 100"
            className="absolute"
            style={{
              bottom: "0px",
              left: `${index * 20}%`,
              width: "300px",
              height: "100px",
            }}
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 0.4, rotate: 360 }}
            transition={{ duration: 10, delay, repeat: Infinity, ease: "linear" }}
          >
            <motion.path
              d={`M ${startX} 80 Q ${150 + index * 50} ${50 + index * 30}, ${
                300 + index * 80
              } 80`}
              stroke="#FFC0CB"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, delay }}
            />
          </motion.svg>
        );
      })}
    </div>
  );
};

export default Background;
