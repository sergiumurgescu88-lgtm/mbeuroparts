import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';

const images = [
  '/input_file_2.png',
  '/input_file_0.png',
  '/input_file_7.png',
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[70vh] min-h-[500px] w-full overflow-hidden bg-[#080810]">
      <AnimatePresence initial={false}>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt="Mercedes-Benz"
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.6, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-[#080810] via-[#080810]/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#080810] via-[#080810]/30 to-transparent" />

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#3D5AFE] animate-pulse" />
            <span className="text-xs font-medium tracking-wider text-gray-300 uppercase">
              Premium OEM Parts
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight mb-6">
            Elevate Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3D5AFE] to-[#8c9eff]">
              Mercedes-Benz
            </span>
          </h1>
          <p className="text-lg text-gray-400 mb-8 max-w-xl leading-relaxed">
            Discover genuine and high-performance aftermarket parts for S-Class, E-Class, and G-Class. Precision engineering meets luxury.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-[#3D5AFE] hover:bg-[#5c74ff] text-white rounded-full font-medium transition-all flex items-center gap-2 group">
              Shop Now
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full font-medium transition-all backdrop-blur-md">
              View Catalog
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
