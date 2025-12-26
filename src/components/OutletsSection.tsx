import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Phone, ExternalLink, Navigation } from "lucide-react";
import { outlets, Outlet } from "@/data/outletsData";

const OutletsSection = () => {
  const [selectedOutlet, setSelectedOutlet] = useState<Outlet | null>(null);
  const [mapToken, setMapToken] = useState<string>("");
  const [showMapInput, setShowMapInput] = useState(true);
  const ref = useRef(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!mapToken || !mapContainerRef.current) return;

    const initMap = async () => {
      const mapboxgl = await import("mapbox-gl");
      await import("mapbox-gl/dist/mapbox-gl.css");
      
      mapboxgl.default.accessToken = mapToken;
      
      const map = new mapboxgl.default.Map({
        container: mapContainerRef.current!,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [90.4, 23.78],
        zoom: 11,
        pitch: 45,
        bearing: -17.6,
      });

      map.addControl(new mapboxgl.default.NavigationControl(), "top-right");
      
      mapRef.current = map;

      map.on("load", () => {
        // Add 3D building layer
        map.addLayer({
          id: "3d-buildings",
          source: "composite",
          "source-layer": "building",
          filter: ["==", "extrude", "true"],
          type: "fill-extrusion",
          minzoom: 15,
          paint: {
            "fill-extrusion-color": "#1a1a1a",
            "fill-extrusion-height": ["get", "height"],
            "fill-extrusion-base": ["get", "min_height"],
            "fill-extrusion-opacity": 0.6,
          },
        });

        // Add markers for each outlet
        outlets.forEach((outlet) => {
          // Create custom marker element
          const el = document.createElement("div");
          el.className = "custom-marker";
          el.innerHTML = `
            <div style="
              width: 40px;
              height: 40px;
              background: linear-gradient(135deg, #c41e3a, #f5a623);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              box-shadow: 0 4px 20px rgba(196, 30, 58, 0.5);
              transition: transform 0.3s ease;
            ">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
          `;

          el.addEventListener("mouseenter", () => {
            el.style.transform = "scale(1.2)";
          });
          el.addEventListener("mouseleave", () => {
            el.style.transform = "scale(1)";
          });
          el.addEventListener("click", () => {
            setSelectedOutlet(outlet);
            map.flyTo({
              center: outlet.coordinates,
              zoom: 15,
              pitch: 60,
              duration: 2000,
            });
          });

          new mapboxgl.default.Marker(el)
            .setLngLat(outlet.coordinates)
            .addTo(map);
        });
      });
    };

    initMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [mapToken]);

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
            9 locations across Dhaka, ready to serve you the MAD experience
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map Container */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden glass-dark"
          >
            {showMapInput && !mapToken ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <MapPin className="text-primary mb-4" size={48} />
                <h3 className="font-bebas text-2xl text-foreground mb-4">Enable 3D Map</h3>
                <p className="text-foreground/60 text-sm mb-6 max-w-sm">
                  Enter your Mapbox public token to view the interactive 3D map with all our outlet locations
                </p>
                <input
                  type="text"
                  placeholder="Enter Mapbox public token"
                  className="w-full max-w-sm px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary mb-4"
                  onChange={(e) => {
                    if (e.target.value.startsWith("pk.")) {
                      setMapToken(e.target.value);
                      setShowMapInput(false);
                    }
                  }}
                />
                <a
                  href="https://mapbox.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary text-sm hover:underline"
                >
                  Get your free token at mapbox.com →
                </a>
              </div>
            ) : (
              <div ref={mapContainerRef} className="absolute inset-0" />
            )}
          </motion.div>

          {/* Outlets List */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar"
          >
            {outlets.map((outlet, index) => (
              <motion.div
                key={outlet.branch_name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                onClick={() => {
                  setSelectedOutlet(outlet);
                  if (mapRef.current) {
                    mapRef.current.flyTo({
                      center: outlet.coordinates,
                      zoom: 15,
                      pitch: 60,
                      duration: 2000,
                    });
                  }
                }}
                className={`glass-dark p-5 rounded-xl cursor-pointer transition-all duration-300 ${
                  selectedOutlet?.branch_name === outlet.branch_name
                    ? "ring-2 ring-primary fire-glow"
                    : "hover:ring-1 hover:ring-primary/50"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-bebas text-xl text-foreground mb-2 flex items-center gap-2">
                      <MapPin className="text-primary" size={18} />
                      {outlet.branch_name}
                    </h3>
                    <p className="text-foreground/60 text-sm mb-3">{outlet.address}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="flex items-center gap-1 text-secondary">
                        <Clock size={14} />
                        {outlet.opening_hours}
                      </span>
                      <a
                        href={`tel:${outlet.phone_number}`}
                        className="flex items-center gap-1 text-foreground/70 hover:text-primary transition-colors"
                      >
                        <Phone size={14} />
                        {outlet.phone_number}
                      </a>
                    </div>
                  </div>
                  <a
                    href={outlet.google_maps_location}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gradient-fire rounded-lg hover-fire flex-shrink-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Navigation size={20} className="text-foreground" />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Selected Outlet Popup */}
        <AnimatePresence>
          {selectedOutlet && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-24 left-1/2 -translate-x-1/2 glass-dark p-6 rounded-2xl z-50 max-w-md w-[90%] fire-glow"
            >
              <button
                onClick={() => setSelectedOutlet(null)}
                className="absolute top-4 right-4 text-foreground/50 hover:text-foreground"
              >
                ✕
              </button>
              <h3 className="font-bebas text-2xl text-foreground mb-2">
                {selectedOutlet.branch_name}
              </h3>
              <p className="text-foreground/60 text-sm mb-4">{selectedOutlet.address}</p>
              <div className="flex gap-4">
                <a
                  href={`tel:${selectedOutlet.phone_number}`}
                  className="flex-1 bg-muted text-foreground py-3 rounded-lg text-center font-medium hover:bg-muted/80 transition-colors"
                >
                  Call Now
                </a>
                <a
                  href={selectedOutlet.google_maps_location}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-fire text-foreground py-3 rounded-lg text-center font-medium hover-fire"
                >
                  Get Directions
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default OutletsSection;
