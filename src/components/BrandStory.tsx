import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Flame, Award, Heart, Clock } from "lucide-react";

const features = [
  {
    icon: Flame,
    title: "Secret Sauces",
    description: "Our MAD combination of sauces makes dishes unlike any others",
  },
  {
    icon: Award,
    title: "100% Halal",
    description: "All materials are carefully sourced and certified halal",
  },
  {
    icon: Heart,
    title: "Made Fresh",
    description: "Each meal is prepared freshly to order, never pre-made",
  },
  {
    icon: Clock,
    title: "Since 2014",
    description: "Started from a small street cart in Dhanmondi",
  },
];

const BrandStory = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="story" className="py-24 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-dark opacity-50" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-secondary font-semibold uppercase tracking-widest text-sm">
            Our Story
          </span>
          <h2 className="font-bebas text-5xl md:text-7xl mt-4 mb-6">
            <span className="text-foreground">The</span>{" "}
            <span className="fire-text">MADNESS</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Story Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-foreground/80 text-lg leading-relaxed">
              The love for delicious burgers is the sole reason behind the birth of Madchef. 
              Back in time, Dhaka had hardly any options of burgers to choose from making it tedious. 
              Being a foodie, the team couldn't accept it.
            </p>
            <p className="text-foreground/80 text-lg leading-relaxed">
              <span className="text-secondary font-semibold">Madchef started its first operation</span> in a small street cart at Dhanmondi. 
              The first full-fledged branch was launched in 2015.
            </p>
            <p className="text-foreground/80 text-lg leading-relaxed">
              The <span className="text-primary font-semibold">MAD combination</span> of secret sauces & recipes 
              is what makes our dishes unlike any others in the world. Evidently, Madchef was the only name 
              that could describe us accurately.
            </p>
            <p className="text-foreground/80 text-lg leading-relaxed">
              Each meal is made freshly to order & the materials are carefully sourced & is 100% halal. 
              We listen to every feedback from our customers & deal with them with utmost priority.
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="glass-dark p-6 rounded-2xl hover-fire group"
              >
                <div className="w-14 h-14 bg-gradient-fire rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="text-foreground" size={28} />
                </div>
                <h3 className="font-bebas text-2xl text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-foreground/60 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
