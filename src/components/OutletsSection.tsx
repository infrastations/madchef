import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Clock, Phone, Facebook, ExternalLink } from "lucide-react";
import { useSettings } from "@/contexts/SettingsContext";

const OutletsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { settings } = useSettings();

  return (
    <section id="outlets" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-secondary font-semibold uppercase tracking-widest text-sm">
            Find Us
          </span>
          <h2 className="font-bebas text-5xl md:text-7xl mt-4 mb-6">
            <span className="text-foreground">Our</span>{" "}
            <span className="fire-text">OUTLETS</span>
          </h2>
          <p className="text-foreground/60 max-w-xl mx-auto">
            {settings.outlets.length} locations across Dhaka, ready to serve you the MAD experience
          </p>
        </motion.div>

        {/* Outlets Grid - 3 columns */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {[...settings.outlets].sort((a, b) => (a.order || 0) - (b.order || 0)).map((outlet, index) => (
            <motion.div
              key={outlet.branch_name + index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 * index }}
              className="glass-dark rounded-xl overflow-hidden hover:ring-1 hover:ring-primary/50 transition-all duration-300 group"
            >
              {/* Outlet Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={outlet.image}
                  alt={outlet.branch_name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col gap-3">
                <div>
                  <h3 className="font-bebas text-xl text-foreground leading-tight">
                    {outlet.branch_name}
                  </h3>
                  <p className="text-foreground/60 text-xs mt-1 line-clamp-2 flex items-start gap-1">
                    <MapPin size={12} className="flex-shrink-0 mt-0.5" />
                    {outlet.address}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-secondary">
                  <Clock size={12} />
                  {outlet.opening_hours}
                </div>

                {/* Action Buttons - Equal width */}
                <div className="grid grid-cols-3 gap-2">
                  <a
                    href={`tel:${outlet.phone_number}`}
                    className="p-3 bg-muted hover:bg-muted/80 rounded-lg transition-colors flex flex-col items-center justify-center gap-1"
                    title="Call"
                  >
                    <Phone size={16} className="text-foreground" />
                    <span className="text-foreground text-xs">Call</span>
                  </a>
                  <a
                    href={outlet.google_maps_location}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gradient-fire rounded-lg hover-fire flex flex-col items-center justify-center gap-1"
                    title="Open in Google Maps"
                  >
                    <ExternalLink size={16} className="text-foreground" />
                    <span className="text-foreground text-xs">Direction</span>
                  </a>
                  {outlet.facebook_url ? (
                    <a
                      href={outlet.facebook_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg transition-colors flex flex-col items-center justify-center gap-1"
                      title="Facebook Page"
                    >
                      <Facebook size={16} className="text-blue-400" />
                      <span className="text-blue-400 text-xs">Facebook</span>
                    </a>
                  ) : (
                    <div className="p-3 bg-muted/50 rounded-lg flex flex-col items-center justify-center gap-1 opacity-40">
                      <Facebook size={16} className="text-foreground/50" />
                      <span className="text-foreground/50 text-xs">Facebook</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OutletsSection;
