import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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

import { useSettings } from "@/contexts/SettingsContext";

// New images first, then existing images (hero-1 moved to end)
const heroImages = [
  hero7, hero8, hero9, hero10, hero11, hero12, hero13, hero14, hero15,
  hero2, hero3, hero4, hero5, hero6, hero1
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const { settings } = useSettings();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative h-[85vh] min-h-[600px] max-h-[900px] flex items-center overflow-hidden">
      {/* Background Images */}
{/* Background Images with Crossfade - no black flash */}
      <div className="absolute inset-0" style={{ backgroundColor: "hsl(var(--fire-dark))" }}>
        {heroImages.map((image, index) => (
          <motion.div
            key={index}
            initial={false}
            animate={{ 
              opacity: index === currentImage ? 1 : 0,
              scale: index === currentImage ? 1 : 1.05,
            }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={image}
              alt="Madchef food"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-fire-dark/80 via-fire-dark/60 to-fire-dark/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-fire-dark/80 via-transparent to-fire-dark/40" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-16">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3 mb-4"
          >
            <Flame className="text-primary animate-flame" size={28} />
            <span className="text-secondary font-semibold uppercase tracking-widest text-xs md:text-sm">
              {settings.hero.badge}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-bebas text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-4"
          >
            <span className="text-foreground">{settings.hero.titleLine1}</span>
            <br />
            <span className="fire-text text-shadow-fire">{settings.hero.titleLine2}</span>
            <span className="text-foreground">,</span>
            <br />
            <span className="text-foreground">{settings.hero.titleLine3}</span>
            <br />
            <span className="fire-text text-shadow-fire">{settings.hero.titleLine4}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-foreground/70 text-sm md:text-base mb-6 max-w-md"
          >
            {settings.hero.description}
          </motion.p>
        </div>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 flex-wrap justify-center max-w-[90%]">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentImage
                ? "bg-primary w-5"
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
        className="absolute bottom-20 right-6 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-foreground/50 text-xs uppercase tracking-widest rotate-90 origin-center mb-6">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="text-primary" size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
};

// CTA Buttons Section - Separate component below hero
export const HeroCTA = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-fire-dark to-background relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap justify-center gap-4"
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
    </section>
  );
};

export default Hero;
