import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Flame } from "lucide-react";
import hero1 from "@/assets/hero-1.png";
import hero2 from "@/assets/hero-2.png";
import hero3 from "@/assets/hero-3.png";
import hero4 from "@/assets/hero-4.png";
import hero5 from "@/assets/hero-5.png";
import hero6 from "@/assets/hero-6.png";
import hero7 from "@/assets/hero-7.png";
import hero8 from "@/assets/hero-8.png";
import hero9 from "@/assets/hero-9.png";
import hero10 from "@/assets/hero-10.png";
import hero11 from "@/assets/hero-11.png";
import hero12 from "@/assets/hero-12.png";
import hero13 from "@/assets/hero-13.png";
import hero14 from "@/assets/hero-14.png";
import hero15 from "@/assets/hero-15.png";

// New images first, then existing images (hero-1 moved to end)
const heroImages = [
  hero7, hero8, hero9, hero10, hero11, hero12, hero13, hero14, hero15,
  hero2, hero3, hero4, hero5, hero6, hero1
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img
            src={heroImages[currentImage]}
            alt="Madchef food"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-24">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3 mb-6"
          >
            <Flame className="text-primary animate-flame" size={32} />
            <span className="text-secondary font-semibold uppercase tracking-widest text-sm">
              Since 2014 • Dhaka, Bangladesh
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-bebas text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-none mb-6"
          >
            <span className="text-foreground">Once You Go</span>
            <br />
            <span className="fire-text text-shadow-fire">MAD</span>
            <span className="text-foreground">,</span>
            <br />
            <span className="text-foreground">You Never Go</span>
            <br />
            <span className="fire-text text-shadow-fire">BACK!</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-foreground/70 text-lg md:text-xl mb-8 max-w-lg"
          >
            Experience the MAD combination of secret sauces & recipes that makes our burgers unlike any others in Dhaka.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#menu"
              className="group bg-gradient-fire text-foreground px-8 py-4 rounded-full font-bold text-lg hover-fire flex items-center gap-2"
            >
              <span>Explore Menu</span>
              <ChevronDown className="group-hover:translate-y-1 transition-transform" />
            </a>
            <a
              href="#outlets"
              className="border-2 border-primary/50 text-foreground px-8 py-4 rounded-full font-bold text-lg hover:border-primary hover:bg-primary/10 transition-all"
            >
              Find Outlet
            </a>
          </motion.div>
        </div>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10 flex-wrap justify-center max-w-[90%]">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentImage
                ? "bg-primary w-6"
                : "bg-foreground/30 hover:bg-foreground/50"
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-24 right-8 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-foreground/50 text-xs uppercase tracking-widest rotate-90 origin-center mb-8">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="text-primary" size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
