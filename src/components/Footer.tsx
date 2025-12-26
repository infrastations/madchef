import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Flame } from "lucide-react";
import logo from "@/assets/madchef-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
            <p className="text-foreground/60 text-sm mb-6 leading-relaxed">
              Once you go MAD, you never go BACK! Experience the best gourmet burgers in Dhaka since 2014.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com/madchefbd"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 glass-dark rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <Facebook size={18} className="text-foreground" />
              </a>
              <a
                href="https://instagram.com/madchefbd"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 glass-dark rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <Instagram size={18} className="text-foreground" />
              </a>
              <a
                href="https://youtube.com/@madchefbd"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 glass-dark rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
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
              {["Home", "Our Story", "Menu", "Outlets", "Reviews", "Events"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(" ", "-")}`}
                    className="text-foreground/60 hover:text-primary transition-colors text-sm"
                  >
                    {link}
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
                  href="mailto:info@madchef.com.bd"
                  className="flex items-center gap-3 text-foreground/60 hover:text-primary transition-colors text-sm"
                >
                  <Mail size={16} className="text-secondary" />
                  info@madchef.com.bd
                </a>
              </li>
              <li className="flex items-start gap-3 text-foreground/60 text-sm">
                <MapPin size={16} className="text-secondary mt-1" />
                <span>9 locations across Dhaka, Bangladesh</span>
              </li>
            </ul>
          </motion.div>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-bebas text-2xl text-foreground mb-6 flex items-center gap-2">
              <Flame className="text-primary" size={20} />
              Opening Hours
            </h3>
            <div className="glass-dark p-6 rounded-xl">
              <p className="text-foreground font-semibold mb-2">All Outlets</p>
              <p className="text-secondary text-2xl font-bebas">11 AM - 11 PM</p>
              <p className="text-foreground/50 text-sm mt-2">Open 7 days a week</p>
            </div>
            <div className="mt-4">
              <a
                href="tel:+8809638050505"
                className="inline-flex items-center gap-2 bg-gradient-fire text-foreground px-6 py-3 rounded-full font-semibold text-sm hover-fire"
              >
                <Phone size={16} />
                Order Now
              </a>
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
