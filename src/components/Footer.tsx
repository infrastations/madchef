import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Flame, Globe, ExternalLink } from "lucide-react";
import logo from "@/assets/madchef-logo.png";

import { Link } from "react-router-dom";
import { useSettings } from "@/contexts/SettingsContext";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { settings } = useSettings();

  const footerLinks = [
    { name: settings.navbar.home, href: "#home" },
    { name: settings.navbar.story, href: "#story" },
    { name: settings.navbar.menu, href: "#menu" },
    { name: settings.navbar.gallery, href: "#gallery" },
    { name: settings.navbar.outlets, href: "#outlets" },
    { name: settings.navbar.reviews, href: "#reviews" },
    { name: settings.navbar.events, href: "#events" },
  ];

  return (
    <footer className="relative pt-24 pb-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-fire-dark/50" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="Madchef Logo" className="w-14 h-14 object-contain" />
              <span className="font-bebas text-3xl text-foreground tracking-wider">
                MAD<span className="text-primary">CHEF</span>
              </span>
            </div>
            <p className="text-foreground/60 text-sm mb-4 leading-relaxed">
              Once you go MAD, you never go BACK! Experience the best gourmet burgers in Dhaka since 2014.
            </p>
            <Link 
              to="/settings" 
              className="text-xs uppercase tracking-widest text-primary/40 hover:text-primary transition-colors flex items-center gap-2 mb-6"
            >
              <div className="w-1 h-1 rounded-full bg-primary/40" />
              Admin Settings
            </Link>
            <div className="flex gap-3 flex-wrap">
              <a
                href="https://www.facebook.com/madchefbd"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 glass-dark rounded-full flex items-center justify-center hover:bg-blue-600/20 transition-colors"
                title="Facebook"
              >
                <Facebook size={18} className="text-foreground" />
              </a>
              <a
                href="https://instagram.com/madchefbd"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 glass-dark rounded-full flex items-center justify-center hover:bg-pink-600/20 transition-colors"
                title="Instagram"
              >
                <Instagram size={18} className="text-foreground" />
              </a>
              <a
                href="https://youtube.com/@madchefbd"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 glass-dark rounded-full flex items-center justify-center hover:bg-red-600/20 transition-colors"
                title="YouTube"
              >
                <Youtube size={18} className="text-foreground" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-bebas text-2xl text-foreground mb-6 flex items-center gap-2">
              <Flame className="text-primary" size={20} />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-foreground/60 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-bebas text-2xl text-foreground mb-6 flex items-center gap-2">
              <Flame className="text-primary" size={20} />
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+8809638050505"
                  className="flex items-center gap-3 text-foreground/60 hover:text-primary transition-colors text-sm"
                >
                  <Phone size={16} className="text-secondary" />
                  09638-050505
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@madchef.com.bd"
                  className="flex items-center gap-3 text-foreground/60 hover:text-primary transition-colors text-sm"
                >
                  <Mail size={16} className="text-secondary" />
                  hello@madchef.com.bd
                </a>
              </li>
              <li>
                <a
                  href="https://madchef.com.bd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-foreground/60 hover:text-primary transition-colors text-sm"
                >
                  <Globe size={16} className="text-secondary" />
                  madchef.com.bd
                </a>
              </li>
              <li className="flex items-start gap-3 text-foreground/60 text-sm">
                <MapPin size={16} className="text-secondary mt-1" />
                <span>10 locations across Dhaka, Bangladesh</span>
              </li>
            </ul>
          </motion.div>

          {/* Order & Hours */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-bebas text-2xl text-foreground mb-6 flex items-center gap-2">
              <Flame className="text-primary" size={20} />
              Order Online
            </h3>
            <div className="space-y-3 mb-6">
              <a
                href="https://www.foodpanda.com.bd/chain/ce2hc/madchef"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 glass-dark p-3 rounded-lg hover:bg-pink-600/10 transition-colors group"
              >
                <div className="w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-pink-400 font-bold text-xs">FP</span>
                </div>
                <span className="text-foreground/80 text-sm flex-1">Foodpanda</span>
                <ExternalLink size={14} className="text-foreground/40 group-hover:text-pink-400" />
              </a>
              <a
                href="https://food.pathao.com/restaurants/gyzdqoa/madchef"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 glass-dark p-3 rounded-lg hover:bg-green-600/10 transition-colors group"
              >
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-green-400 font-bold text-xs">P</span>
                </div>
                <span className="text-foreground/80 text-sm flex-1">Pathao Food</span>
                <ExternalLink size={14} className="text-foreground/40 group-hover:text-green-400" />
              </a>
            </div>
            
            <div className="glass-dark p-4 rounded-xl">
              <p className="text-foreground font-semibold mb-1 text-sm">All Outlets</p>
              <p className="text-secondary text-xl font-bebas">11 AM - 11 PM</p>
              <p className="text-foreground/50 text-xs mt-1">Open 7 days a week</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/30 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground/50">
            <p>© {currentYear} Madchef. All rights reserved. 100% Halal</p>
            <p className="flex items-center gap-2">
              Made with <Flame className="text-primary" size={14} /> in Dhaka, Bangladesh
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
