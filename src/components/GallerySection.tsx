import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";
import gallery1 from "@/assets/gallery-1.png";
import gallery2 from "@/assets/gallery-2.png";
import gallery3 from "@/assets/gallery-3.png";
import gallery4 from "@/assets/gallery-4.png";
import gallery5 from "@/assets/gallery-5.png";
import gallery6 from "@/assets/gallery-6.png";
import gallery7 from "@/assets/gallery-7.png";
import gallery8 from "@/assets/gallery-8.png";
import gallery9 from "@/assets/gallery-9.png";
import gallery10 from "@/assets/gallery-10.png";
import gallery11 from "@/assets/gallery-11.png";
import gallery12 from "@/assets/gallery-12.png";
import gallery13 from "@/assets/gallery-13.png";
import gallery14 from "@/assets/gallery-14.png";
import gallery15 from "@/assets/gallery-15.png";
import gallery16 from "@/assets/gallery-16.png";
import gallery17 from "@/assets/gallery-17.png";
import gallery18 from "@/assets/gallery-18.png";

const galleryImages = [
  { src: gallery1, title: "Crispy Chicken Platter" },
  { src: gallery2, title: "Sweet Dessert" },
  { src: gallery3, title: "Full Feast" },
  { src: gallery4, title: "Grilled Chicken Rice" },
  { src: gallery5, title: "Signature Combo" },
  { src: gallery6, title: "Shah Poutine" },
  { src: gallery7, title: "Paneer Sticks" },
  { src: gallery8, title: "The Original" },
  { src: gallery9, title: "Shah Poutine Special" },
  { src: gallery10, title: "Gyro Fix" },
  { src: gallery11, title: "Naga Achari Rice" },
  { src: gallery12, title: "Chicken Steak Meal" },
  { src: gallery13, title: "Gyro Chicken Over Fries" },
  { src: gallery14, title: "Rice Platter" },
  { src: gallery15, title: "Sip Happens" },
  { src: gallery16, title: "Roast Chicken Poutine" },
  { src: gallery17, title: "Just Milo" },
  { src: gallery18, title: "Chicken Cheese Bombs" },
];

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);
  
  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };
  
  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  return (
    <section id="gallery" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-secondary font-semibold uppercase tracking-widest text-sm">
            Visual Feast
          </span>
          <h2 className="font-bebas text-5xl md:text-7xl mt-4 mb-6">
            <span className="text-foreground">MAD</span>{" "}
            <span className="fire-text">GALLERY</span>
          </h2>
          <p className="text-foreground/60 max-w-xl mx-auto">
            A taste of what awaits you at Madchef - every dish is a masterpiece
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className={`relative group cursor-pointer overflow-hidden rounded-xl ${
                index === 0 || index === 4 ? "md:row-span-2" : ""
              }`}
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.src}
                alt={image.title}
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                  index === 0 || index === 4 ? "h-full min-h-[300px] md:min-h-[500px]" : "h-48 md:h-56"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center gap-2">
                  <Images className="text-primary" size={16} />
                  <span className="text-foreground font-medium text-sm">{image.title}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-2 glass-dark rounded-full hover:bg-primary/20 transition-colors"
            >
              <X className="text-foreground" size={24} />
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 md:left-8 p-3 glass-dark rounded-full hover:bg-primary/20 transition-colors"
            >
              <ChevronLeft className="text-foreground" size={24} />
            </button>
            
            <motion.img
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].title}
              className="max-h-[80vh] max-w-[90vw] object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
            
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 md:right-8 p-3 glass-dark rounded-full hover:bg-primary/20 transition-colors"
            >
              <ChevronRight className="text-foreground" size={24} />
            </button>
            
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
              <p className="text-foreground font-bebas text-xl">{galleryImages[selectedImage].title}</p>
              <p className="text-foreground/50 text-sm">{selectedImage + 1} / {galleryImages.length}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
