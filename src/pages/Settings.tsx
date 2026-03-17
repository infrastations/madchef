import React, { useState } from "react";
import { motion } from "framer-motion";
import { Save, RefreshCcw, ArrowLeft, Plus, Trash2, Calendar, MapPin, Tag, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useSettings, AppSettings } from "@/contexts/SettingsContext";
import { toast } from "sonner";
import { MadchefEvent } from "@/data/eventsData";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Settings = () => {
  const { settings, updateSettings, resetSettings } = useSettings();
  const [formData, setFormData] = useState<AppSettings>({ ...settings });

  const handleInputChange = (section: keyof AppSettings, key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        [key]: value,
      },
    }));
  };

  const handleEventChange = (index: number, key: keyof MadchefEvent, value: string) => {
    const newEvents = [...formData.madEvents];
    newEvents[index] = { ...newEvents[index], [key]: value };
    setFormData((prev) => ({ ...prev, madEvents: newEvents }));
  };

  const addEvent = () => {
    const newEvent: MadchefEvent = {
      date: new Date().toISOString().split('T')[0],
      event_title: "New Event",
      location: "Location",
      type: "Promotion",
    };
    setFormData((prev) => ({ ...prev, madEvents: [newEvent, ...prev.madEvents] }));
  };

  const removeEvent = (index: number) => {
    const newEvents = formData.madEvents.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, madEvents: newEvents }));
  };

  const handleSave = () => {
    updateSettings(formData);
    toast.success("Settings saved successfully!");
  };

  const handleReset = () => {
    resetSettings();
    window.location.reload(); // Reload to refresh the context state
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-20">
      {/* Background elements to match landing page */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10 pt-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors mb-4 group">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Site</span>
            </Link>
            <h1 className="font-bebas text-5xl md:text-6xl text-foreground">
              Site <span className="fire-text">Settings</span>
            </h1>
            <p className="text-foreground/60">Customize your MAD experience and store changes in local storage.</p>
          </div>

          <div className="flex items-center gap-4">
            <AlertDialog>
              <RefreshCcw size={18} className="absolute left-6 pointer-events-none text-red-400 group-hover:rotate-180 transition-transform duration-500" />
              <button
                className="group relative flex items-center gap-2 px-6 py-3 pl-12 rounded-full border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all font-semibold overflow-hidden"
              >
                <AlertDialogTrigger className="absolute inset-0 w-full h-full" />
                Reset All
              </button>
              <AlertDialogContent className="bg-fire-dark border-white/5 shadow-2xl rounded-3xl p-8">
                <AlertDialogHeader>
                  <AlertDialogTitle className="font-bebas text-3xl text-foreground flex items-center gap-3">
                    <RefreshCcw className="text-red-500" />
                    Reset to Defaults?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-foreground/60 text-base py-4">
                    This will clear all your custom menu names, event list, and titles. All settings will return to the original MADCHEF brand defaults.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="gap-4">
                  <AlertDialogCancel className="bg-transparent border-white/10 text-foreground hover:bg-white/5 rounded-full px-8">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleReset}
                    className="bg-red-600 hover:bg-red-700 text-foreground rounded-full px-8 font-bold border-none"
                  >
                    Yes, Reset Everything
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
              <Save size={18} className="absolute left-8 pointer-events-none z-10" />
              <button
                className="group relative flex items-center gap-2 px-8 py-3 pl-14 rounded-full bg-gradient-fire text-foreground font-bold hover-fire shadow-lg overflow-hidden"
              >
                <AlertDialogTrigger className="absolute inset-0 w-full h-full" />
                Save Changes
              </button>
              <AlertDialogContent className="bg-fire-dark border-white/5 shadow-2xl rounded-3xl p-8">
                <AlertDialogHeader>
                  <AlertDialogTitle className="font-bebas text-3xl text-foreground flex items-center gap-3">
                    <Save className="text-primary" />
                    Confirm Changes
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-foreground/60 text-base py-4">
                    Are you ready to update the site? These changes will be stored in your browser's local storage and appear instantly.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="gap-4">
                  <AlertDialogCancel className="bg-transparent border-white/10 text-foreground hover:bg-white/5 rounded-full px-8">
                    Go Back
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleSave}
                    className="bg-gradient-fire text-foreground rounded-full px-8 font-bold border-none hover-fire"
                  >
                    Save & Apply
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            {/* Navbar Settings */}
            <section className="glass-dark p-8 rounded-3xl border border-white/5">
              <h2 className="font-bebas text-2xl text-primary mb-6 flex items-center gap-2">
                <Sparkles size={20} className="text-secondary" />
                Navbar Menu Names
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.keys(formData.navbar).map((key) => (
                  <div key={key} className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-foreground/40 font-semibold">{key}</label>
                    <input
                      type="text"
                      value={(formData.navbar as any)[key]}
                      onChange={(e) => handleInputChange("navbar", key, e.target.value)}
                      className="w-full bg-fire-dark/50 border border-white/10 rounded-xl px-4 py-2 text-foreground focus:border-primary/50 outline-none transition-all"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Hero Settings */}
            <section className="glass-dark p-8 rounded-3xl border border-white/5">
              <h2 className="font-bebas text-2xl text-primary mb-6 flex items-center gap-2">
                <Sparkles size={20} className="text-secondary" />
                Hero Section
              </h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-foreground/40 font-semibold">Badge Text</label>
                  <input
                    type="text"
                    value={formData.hero.badge}
                    onChange={(e) => handleInputChange("hero", "badge", e.target.value)}
                    className="w-full bg-fire-dark/50 border border-white/10 rounded-xl px-4 py-2 text-foreground focus:border-primary/50 outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((num) => (
                    <div key={num} className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-foreground/40 font-semibold">Title Line {num}</label>
                      <input
                        type="text"
                        value={(formData.hero as any)[`titleLine${num}`]}
                        onChange={(e) => handleInputChange("hero", `titleLine${num}`, e.target.value)}
                        className="w-full bg-fire-dark/50 border border-white/10 rounded-xl px-4 py-2 text-foreground focus:border-primary/50 outline-none"
                      />
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-foreground/40 font-semibold">Description</label>
                  <textarea
                    rows={3}
                    value={formData.hero.description}
                    onChange={(e) => handleInputChange("hero", "description", e.target.value)}
                    className="w-full bg-fire-dark/50 border border-white/10 rounded-xl px-4 py-2 text-foreground focus:border-primary/50 outline-none resize-none"
                  />
                </div>
              </div>
            </section>

            {/* Events Header Settings */}
            <section className="glass-dark p-8 rounded-3xl border border-white/5">
              <h2 className="font-bebas text-2xl text-primary mb-6 flex items-center gap-2">
                <Sparkles size={20} className="text-secondary" />
                Events Section Header
              </h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-foreground/40 font-semibold">Badge Text</label>
                  <input
                    type="text"
                    value={formData.eventsSection.badge}
                    onChange={(e) => handleInputChange("eventsSection", "badge", e.target.value)}
                    className="w-full bg-fire-dark/50 border border-white/10 rounded-xl px-4 py-2 text-foreground focus:border-primary/50 outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-foreground/40 font-semibold">Title Part 1 (Fire)</label>
                    <input
                      type="text"
                      value={formData.eventsSection.title1}
                      onChange={(e) => handleInputChange("eventsSection", "title1", e.target.value)}
                      className="w-full bg-fire-dark/50 border border-white/10 rounded-xl px-4 py-2 text-foreground focus:border-primary/50 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-foreground/40 font-semibold">Title Part 2</label>
                    <input
                      type="text"
                      value={formData.eventsSection.title2}
                      onChange={(e) => handleInputChange("eventsSection", "title2", e.target.value)}
                      className="w-full bg-fire-dark/50 border border-white/10 rounded-xl px-4 py-2 text-foreground focus:border-primary/50 outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-foreground/40 font-semibold">Description</label>
                  <input
                    type="text"
                    value={formData.eventsSection.description}
                    onChange={(e) => handleInputChange("eventsSection", "description", e.target.value)}
                    className="w-full bg-fire-dark/50 border border-white/10 rounded-xl px-4 py-2 text-foreground focus:border-primary/50 outline-none"
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - Events Manager */}
          <div className="space-y-8">
            <section className="glass-dark p-8 rounded-3xl border border-white/5 h-full">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-bebas text-2xl text-primary flex items-center gap-2">
                  <Calendar size={20} className="text-secondary" />
                  MAD Events Manager
                </h2>
                <button
                  onClick={addEvent}
                  className="bg-primary text-foreground px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-primary/80 transition-all"
                >
                  <Plus size={16} />
                  Add Event
                </button>
              </div>

              <div className="space-y-4 max-h-[1200px] overflow-y-auto pr-2 custom-scrollbar">
                {formData.madEvents.map((event, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={index}
                    className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all"
                  >
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-tighter text-foreground/30 font-bold flex items-center gap-1">
                              <Sparkles size={10} /> Title
                            </label>
                            <input
                              type="text"
                              value={event.event_title}
                              onChange={(e) => handleEventChange(index, "event_title", e.target.value)}
                              className="w-full bg-black/30 border border-white/5 rounded-lg px-3 py-1.5 text-sm text-foreground focus:border-primary/50 outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-tighter text-foreground/30 font-bold flex items-center gap-1">
                              <Calendar size={10} /> Date
                            </label>
                            <input
                              type="date"
                              value={event.date}
                              onChange={(e) => handleEventChange(index, "date", e.target.value)}
                              className="w-full bg-black/30 border border-white/5 rounded-lg px-3 py-1.5 text-sm text-foreground focus:border-primary/50 outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-tighter text-foreground/30 font-bold flex items-center gap-1">
                              <MapPin size={10} /> Location
                            </label>
                            <input
                              type="text"
                              value={event.location}
                              onChange={(e) => handleEventChange(index, "location", e.target.value)}
                              className="w-full bg-black/30 border border-white/5 rounded-lg px-3 py-1.5 text-sm text-foreground focus:border-primary/50 outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-tighter text-foreground/30 font-bold flex items-center gap-1">
                              <Tag size={10} /> Type
                            </label>
                            <select
                              value={event.type}
                              onChange={(e) => handleEventChange(index, "type", e.target.value)}
                              className="w-full bg-black/30 border border-white/5 rounded-lg px-3 py-1.5 text-sm text-foreground focus:border-primary/50 outline-none"
                            >
                              <option value="Branch Launch">Branch Launch</option>
                              <option value="Promotion">Promotion</option>
                              <option value="Campaign">Campaign</option>
                              <option value="Competition">Competition</option>
                              <option value="Eating Competition">Eating Competition</option>
                              <option value="Screening">Screening</option>
                              <option value="Brand Milestone">Brand Milestone</option>
                              <option value="Seasonal">Seasonal</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeEvent(index)}
                        className="p-2 text-foreground/20 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all mt-6"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
