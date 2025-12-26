import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Clock, Phone, Navigation } from "lucide-react";
import { outlets, Outlet } from "@/data/outletsData";

const MAPBOX_TOKEN = "pk.eyJ1IjoibWRyYWtpYnRyb2ZkZXIiLCJhIjoiY21qbmFncmdxMnk4bTNncXo2YXpvdHJ4MyJ9.LOJIVP-Wr-TlN6Tvm5YjwA";

// Unique colors for each outlet marker
const markerColors = [
  "#c41e3a", // Red
  "#f5a623", // Orange
  "#2ecc71", // Green
  "#3498db", // Blue
  "#9b59b6", // Purple
  "#e91e63", // Pink
  "#00bcd4", // Cyan
  "#ff5722", // Deep Orange
  "#795548", // Brown
];

const OutletsSection = () => {
  const [selectedOutlet, setSelectedOutlet] = useState<Outlet | null>(null);
  const [blinkingMarker, setBlinkingMarker] = useState<string | null>(null);
  const ref = useRef(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<Map<string, HTMLElement>>(new Map());
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const initMap = async () => {
      const mapboxgl = await import("mapbox-gl");
      await import("mapbox-gl/dist/mapbox-gl.css");
      
      mapboxgl.default.accessToken = MAPBOX_TOKEN;
      
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
        outlets.forEach((outlet, index) => {
          const color = markerColors[index % markerColors.length];
          
          // Create custom marker element
          const el = document.createElement("div");
          el.className = "custom-marker";
          el.id = `marker-${outlet.branch_name}`;
          el.innerHTML = `
            <div class="marker-inner" style="
              width: 40px;
              height: 40px;
              background: ${color};
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              box-shadow: 0 4px 20px ${color}80;
              transition: transform 0.3s ease, box-shadow 0.3s ease;
              border: 3px solid white;
            ">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
          `;

          markersRef.current.set(outlet.branch_name, el);

          el.addEventListener("mouseenter", () => {
            el.style.transform = "scale(1.2)";
          });
          el.addEventListener("mouseleave", () => {
            if (blinkingMarker !== outlet.branch_name) {
              el.style.transform = "scale(1)";
            }
          });
          el.addEventListener("click", () => {
            setSelectedOutlet(outlet);
            highlightMarker(outlet.branch_name);
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
  }, []);

  // Highlight and blink marker function
  const highlightMarker = (branchName: string) => {
    // Reset previous blinking marker
    if (blinkingMarker && markersRef.current.has(blinkingMarker)) {
      const prevMarker = markersRef.current.get(blinkingMarker);
      if (prevMarker) {
        prevMarker.classList.remove("marker-blink");
        prevMarker.style.transform = "scale(1)";
      }
    }

    // Set new blinking marker
    setBlinkingMarker(branchName);
    const marker = markersRef.current.get(branchName);
    if (marker) {
      marker.classList.add("marker-blink");
      marker.style.transform = "scale(1.3)";
    }
  };

  const handleDirectionClick = (outlet: Outlet) => {
    highlightMarker(outlet.branch_name);
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: outlet.coordinates,
        zoom: 16,
        pitch: 60,
        duration: 2000,
      });
    }
  };

  return (
    <section id="outlets" className="py-24 relative overflow-hidden">
      {/* Blinking animation style */}
      <style>{`
        @keyframes markerBlink {
          0%, 100% { 
            transform: scale(1.3);
            box-shadow: 0 0 20px 10px rgba(245, 166, 35, 0.6);
          }
          50% { 
            transform: scale(1.5);
            box-shadow: 0 0 30px 15px rgba(245, 166, 35, 0.9);
          }
        }
        .marker-blink .marker-inner {
          animation: markerBlink 1s ease-in-out infinite;
        }
      `}</style>

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
            className="relative h-[500px] lg:h-[700px] rounded-2xl overflow-hidden glass-dark"
          >
            <div ref={mapContainerRef} className="absolute inset-0" />
          </motion.div>

          {/* Outlets List - All visible */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-3"
          >
            {outlets.map((outlet, index) => (
              <motion.div
                key={outlet.branch_name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className={`glass-dark p-4 rounded-xl transition-all duration-300 ${
                  selectedOutlet?.branch_name === outlet.branch_name
                    ? "ring-2 ring-primary fire-glow"
                    : "hover:ring-1 hover:ring-primary/50"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bebas text-lg text-foreground mb-1 flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded-full flex-shrink-0"
                        style={{ backgroundColor: markerColors[index % markerColors.length] }}
                      />
                      <span className="truncate">{outlet.branch_name}</span>
                    </h3>
                    <p className="text-foreground/60 text-xs mb-2 truncate">{outlet.address}</p>
                    <div className="flex flex-wrap gap-3 text-xs">
                      <span className="flex items-center gap-1 text-secondary">
                        <Clock size={12} />
                        {outlet.opening_hours}
                      </span>
                    </div>
                  </div>
                  
                  {/* Action Buttons - Always visible */}
                  <div className="flex gap-2 flex-shrink-0">
                    <a
                      href={`tel:${outlet.phone_number}`}
                      className="p-2.5 bg-muted hover:bg-muted/80 rounded-lg transition-colors flex items-center gap-1"
                      title="Call"
                    >
                      <Phone size={16} className="text-foreground" />
                    </a>
                    <button
                      onClick={() => handleDirectionClick(outlet)}
                      className="p-2.5 bg-gradient-fire rounded-lg hover-fire flex items-center gap-1"
                      title="Show on map"
                    >
                      <Navigation size={16} className="text-foreground" />
                    </button>
                    <a
                      href={outlet.google_maps_location}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-secondary/20 hover:bg-secondary/30 rounded-lg transition-colors flex items-center gap-1"
                      title="Open in Google Maps"
                    >
                      <MapPin size={16} className="text-secondary" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OutletsSection;
