import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, MapPin, Flame, Sparkles } from "lucide-react";
import { eventTypeColors } from "@/data/eventsData";
import { useSettings } from "@/contexts/SettingsContext";

const EventsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { settings } = useSettings();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return {
      month: date.toLocaleDateString("en-US", { month: "short" }),
      day: date.getDate(),
      year: date.getFullYear(),
    };
  };

  // Sort events by date descending
  const sortedEvents = [...settings.madEvents].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <section id="events" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-secondary font-semibold uppercase tracking-widest text-sm flex items-center justify-center gap-2">
            <Sparkles size={16} />
            {settings.eventsSection.badge}
            <Sparkles size={16} />
          </span>
          <h2 className="font-bebas text-5xl md:text-7xl mt-4 mb-6">
            <span className="fire-text">{settings.eventsSection.title1}</span>{" "}
            <span className="text-foreground">{settings.eventsSection.title2}</span>
          </h2>
          <p className="text-foreground/60 max-w-xl mx-auto">
            {settings.eventsSection.description}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent hidden md:block" />

          {/* Events */}
          <div className="space-y-12">
            {sortedEvents.map((event, index) => {
              const dateInfo = formatDate(event.date);
              const isLeft = index % 2 === 0;
              const colorClass = eventTypeColors[event.type] || "from-gray-500 to-gray-600";

              return (
                <motion.div
                  key={`${event.date}-${event.event_title}`}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className={`relative flex items-center ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-col md:gap-8`}
                >
                  {/* Content Card */}
                  <div className={`w-full md:w-[calc(50%-2rem)] ${isLeft ? "md:text-right" : "md:text-left"}`}>
                    <div className="glass-dark p-6 rounded-2xl hover-fire group">
                      {/* Event Type Badge */}
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-foreground bg-gradient-to-r ${colorClass} mb-4`}>
                        <Flame size={12} />
                        {event.type}
                      </div>

                      {/* Event Title */}
                      <h3 className="font-bebas text-2xl md:text-3xl text-foreground mb-3 group-hover:text-primary transition-colors">
                        {event.event_title}
                      </h3>

                      {/* Location */}
                      <div className={`flex items-center gap-2 text-foreground/60 text-sm ${isLeft ? "md:justify-end" : ""}`}>
                        <MapPin size={14} className="text-secondary" />
                        {event.location}
                      </div>
                    </div>
                  </div>

                  {/* Center Circle */}
                  <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${colorClass} flex flex-col items-center justify-center text-foreground shadow-lg`}>
                      <span className="text-xs font-bold">{dateInfo.month}</span>
                      <span className="text-lg font-bold leading-none">{dateInfo.day}</span>
                    </div>
                  </div>

                  {/* Date for other side */}
                  <div className={`w-full md:w-[calc(50%-2rem)] ${isLeft ? "md:text-left" : "md:text-right"} hidden md:block`}>
                    <span className="text-foreground/40 font-bebas text-xl">
                      {dateInfo.year}
                    </span>
                  </div>

                  {/* Mobile Date */}
                  <div className="md:hidden flex items-center gap-2 mt-4">
                    <Calendar size={14} className="text-primary" />
                    <span className="text-foreground/60 text-sm">
                      {dateInfo.month} {dateInfo.day}, {dateInfo.year}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* End Circle */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="absolute left-1/2 -translate-x-1/2 -bottom-8 hidden md:flex"
          >
            <div className="w-4 h-4 rounded-full bg-accent animate-pulse-fire" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
