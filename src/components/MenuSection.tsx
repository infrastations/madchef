import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Grid3X3, List, Flame } from "lucide-react";
import { useSettings } from "@/contexts/SettingsContext";

type ViewMode = "cards" | "table";

// Component for rotating images with crossfade (no black flash)
const RotatingImages = ({ images, category }: { images: string[]; category: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0) {
    return <div className="h-48 bg-muted/20 flex items-center justify-center"><Flame className="text-primary/20" size={48} /></div>;
  }

  return (
    <div className="relative h-48 overflow-hidden bg-card">
      {images.map((image, index) => (
        <motion.img
          key={index}
          src={image}
          alt={category}
          initial={false}
          animate={{ 
            opacity: index === currentIndex ? 1 : 0,
            scale: index === currentIndex ? 1 : 1.05,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
    </div>
  );
};

const MenuSection = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("cards");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { settings } = useSettings();

  return (
    <section id="menu" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-secondary font-semibold uppercase tracking-widest text-sm">
            {settings.navbar.menu}
          </span>
          <h2 className="font-bebas text-5xl md:text-7xl mt-4 mb-6">
            <span className="text-foreground">Get</span>{" "}
            <span className="fire-text">MAD</span>{" "}
            <span className="text-foreground">Hungry</span>
          </h2>
          <p className="text-foreground/60 max-w-xl mx-auto">
            From classic burgers to gourmet creations, every dish is made fresh with our secret MAD sauces
          </p>
        </motion.div>

        {/* View Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center gap-4 mb-12"
        >
          <button
            onClick={() => setViewMode("cards")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
              viewMode === "cards"
                ? "bg-gradient-fire text-foreground fire-glow"
                : "glass-dark text-foreground/70 hover:text-foreground"
            }`}
          >
            <Grid3X3 size={20} />
            <span>Card View</span>
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
              viewMode === "table"
                ? "bg-gradient-fire text-foreground fire-glow"
                : "glass-dark text-foreground/70 hover:text-foreground"
            }`}
          >
            <List size={20} />
            <span>Table View</span>
          </button>
        </motion.div>

        {/* Card View - All items visible */}
        {viewMode === "cards" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...settings.menu].sort((a, b) => (a.order || 0) - (b.order || 0)).map((category, categoryIndex) => (
              <motion.div
                key={category.menu_group}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * categoryIndex }}
                className="menu-card group"
              >
                {/* Category Image - Rotating */}
                <div className="relative">
                  <RotatingImages 
                    images={category.images} 
                    category={category.menu_group}
                  />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2">
                      <Flame className="text-primary" size={24} />
                      <h3 className="font-bebas text-3xl text-foreground">
                        {category.menu_group}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* All Items */}
                <div className="p-4">
                  {category.note && (
                    <p className="text-secondary/80 text-xs mb-3 italic">{category.note}</p>
                  )}
                  <div className="space-y-3">
                    {category.items.map((item) => (
                      <div key={item.food_name} className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="text-foreground font-medium text-sm">{item.food_name}</h4>
                          {item.description && (
                            <p className="text-foreground/50 text-xs mt-0.5">{item.description}</p>
                          )}
                        </div>
                        <span className="text-secondary font-bold text-sm ml-4">
                          ৳{item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Table View */}
        {viewMode === "table" && (
          <div className="space-y-8">
            {[...settings.menu].sort((a, b) => (a.order || 0) - (b.order || 0)).map((category, categoryIndex) => (
              <motion.div
                key={category.menu_group}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.05 * categoryIndex }}
                className="glass-dark rounded-2xl overflow-hidden"
              >
                {/* Category Header */}
                <div className="bg-gradient-fire p-4 flex items-center gap-3">
                  <Flame className="text-foreground" size={24} />
                  <h3 className="font-bebas text-2xl text-foreground">{category.menu_group}</h3>
                  {category.note && (
                    <span className="text-foreground/80 text-xs ml-auto hidden md:block">
                      {category.note}
                    </span>
                  )}
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-4 text-foreground/60 font-medium text-sm">Item</th>
                        <th className="text-left p-4 text-foreground/60 font-medium text-sm hidden md:table-cell">Description</th>
                        <th className="text-right p-4 text-foreground/60 font-medium text-sm">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.items.map((item, itemIndex) => (
                        <tr
                          key={item.food_name}
                          className={`border-b border-border/50 hover:bg-muted/30 transition-colors ${
                            itemIndex === category.items.length - 1 ? "border-b-0" : ""
                          }`}
                        >
                          <td className="p-4">
                            <span className="text-foreground font-medium">{item.food_name}</span>
                            <p className="text-foreground/50 text-xs mt-1 md:hidden">{item.description}</p>
                          </td>
                          <td className="p-4 text-foreground/60 text-sm hidden md:table-cell">
                            {item.description || "—"}
                          </td>
                          <td className="p-4 text-right">
                            <span className="text-secondary font-bold">৳{item.price}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MenuSection;
