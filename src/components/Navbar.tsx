import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/madchef-logo.png";
import { useSettings } from "@/contexts/SettingsContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { settings } = useSettings();

  const navLinks = [
    { name: settings.navbar.home, href: "#home" },
    { name: settings.navbar.story, href: "#story" },
    { name: settings.navbar.menu, href: "#menu" },
    { name: settings.navbar.gallery, href: "#gallery" },
    { name: settings.navbar.outlets, href: "#outlets" },
    { name: settings.navbar.reviews, href: "#reviews" },
    { name: settings.navbar.events, href: "#events" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "glass-dark py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3">
          <img src={logo} alt="Madchef Logo" className="w-12 h-12 object-contain" />
          <span className="font-bebas text-2xl md:text-3xl text-foreground tracking-wider">
            MAD<span className="text-primary">CHEF</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-foreground/80 hover:text-primary transition-colors duration-300 font-medium text-sm uppercase tracking-wide"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Contact Button */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+8809638050505"
            className="flex items-center gap-2 text-foreground/80 hover:text-secondary transition-colors"
          >
            <Phone size={18} />
            <span className="text-sm font-medium">09638-050505</span>
          </a>
          <a
            href="#outlets"
            className="bg-gradient-fire text-foreground px-6 py-2.5 rounded-full font-semibold text-sm hover-fire"
          >
            Find Outlet
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-foreground p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-dark mt-2 mx-4 rounded-xl overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-foreground/80 hover:text-primary py-2 font-medium"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="tel:+8809638050505"
                className="flex items-center gap-2 text-secondary py-2"
              >
                <Phone size={18} />
                <span>09638-050505</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
