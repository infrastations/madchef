import { useState, useEffect } from "react";
import { 
  Save, 
  RefreshCcw, 
  ChevronLeft, 
  Plus, 
  Trash2, 
  Edit, 
  Image as ImageIcon, 
  MapPin, 
  Clock, 
  Phone, 
  Facebook, 
  Flame, 
  GalleryVertical,
  Layout,
  Utensils,
  Map,
  X,
  Upload
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSettings, AppSettings, GalleryItem, EditableMenuGroup, EditableOutlet } from "@/contexts/SettingsContext";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Settings = () => {
  const { settings, updateSettings, resetSettings } = useSettings();
  const [formData, setFormData] = useState<AppSettings>(settings);

  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  const handleSave = () => {
    updateSettings(formData);
    toast.success("Settings saved successfully!");
  };

  const handleReset = () => {
    resetSettings();
    toast.info("Settings reset to defaults.");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-fire-dark text-foreground pt-32 pb-24 font-outfit">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <Link 
              to="/" 
              className="flex items-center gap-2 text-foreground/50 hover:text-primary transition-colors mb-4 group"
            >
              <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Back to Site
            </Link>
            <h1 className="font-bebas text-5xl md:text-7xl tracking-wide">
              ADMIN <span className="fire-text">SETTINGS</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="group flex items-center gap-2 px-6 py-3 rounded-full border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all font-semibold">
                  <RefreshCcw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                  Reset All
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-fire-dark border-white/5 shadow-2xl rounded-3xl p-8">
                <AlertDialogHeader>
                  <AlertDialogTitle className="font-bebas text-3xl flex items-center gap-3">
                    <RefreshCcw className="text-red-500" />
                    Reset to Defaults?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-foreground/60 text-base py-4">
                    This will clear ALL custom data, including your menu, outlets, and gallery.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="gap-4">
                  <AlertDialogCancel className="bg-transparent border-white/10 text-foreground hover:bg-white/5 rounded-full px-8">Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleReset} className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 font-bold border-none">Yes, Reset Everything</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="group flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-fire text-foreground font-bold hover-fire shadow-lg">
                  <Save size={18} />
                  Save Changes
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-fire-dark border-white/5 shadow-2xl rounded-3xl p-8">
                <AlertDialogHeader>
                  <AlertDialogTitle className="font-bebas text-3xl flex items-center gap-3">
                    <Save className="text-primary" />
                    Confirm Changes
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-foreground/60 text-base py-4">
                    Apply these changes to the live site?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="gap-4">
                  <AlertDialogCancel className="bg-transparent border-white/10 text-foreground hover:bg-white/5 rounded-full px-8">Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSave} className="bg-gradient-fire text-foreground rounded-full px-8 font-bold border-none hover-fire">Save & Apply</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full bg-white/5 p-1 rounded-2xl mb-12 h-auto gap-1">
            <TabsTrigger value="basic" className="rounded-xl flex items-center gap-2 py-3 data-[state=active]:bg-gradient-fire data-[state=active]:text-foreground">
              <Layout size={18} /> Basic
            </TabsTrigger>
            <TabsTrigger value="events" className="rounded-xl flex items-center gap-2 py-3 data-[state=active]:bg-gradient-fire data-[state=active]:text-foreground">
              <Flame size={18} /> Events
            </TabsTrigger>
            <TabsTrigger value="menu" className="rounded-xl flex items-center gap-2 py-3 data-[state=active]:bg-gradient-fire data-[state=active]:text-foreground">
              <Utensils size={18} /> Menu
            </TabsTrigger>
            <TabsTrigger value="outlets" className="rounded-xl flex items-center gap-2 py-3 data-[state=active]:bg-gradient-fire data-[state=active]:text-foreground">
              <Map size={18} /> Outlets
            </TabsTrigger>
            <TabsTrigger value="gallery" className="rounded-xl flex items-center gap-2 py-3 data-[state=active]:bg-gradient-fire data-[state=active]:text-foreground">
              <GalleryVertical size={18} /> Gallery
            </TabsTrigger>
          </TabsList>

          {/* ─── BASIC SETTINGS ─── */}
          <TabsContent value="basic" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="glass-dark p-8 rounded-3xl border border-white/5">
              <h3 className="font-bebas text-3xl mb-8 flex items-center gap-3">
                <Layout className="text-primary" /> Navbar Labels
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.keys(formData.navbar).map((key) => (
                  <div key={key} className="space-y-2">
                    <label className="text-sm font-medium text-foreground/50 uppercase tracking-wider">{key}</label>
                    <Input 
                      value={(formData.navbar as any)[key]} 
                      onChange={(e) => setFormData({
                        ...formData,
                        navbar: { ...formData.navbar, [key]: e.target.value }
                      })}
                      className="bg-white/5 border-white/10 rounded-xl focus:ring-primary/50"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-dark p-8 rounded-3xl border border-white/5">
              <h3 className="font-bebas text-3xl mb-8 flex items-center gap-3">
                <ImageIcon className="text-primary" /> Hero Text
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/50 uppercase tracking-wider">Badge Text</label>
                    <Input 
                      value={formData.hero.badge} 
                      onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, badge: e.target.value }})}
                      className="bg-white/5 border-white/10 rounded-xl"
                    />
                  </div>
                  {[1, 2, 3, 4].map((num) => (
                    <div key={num} className="space-y-2">
                      <label className="text-sm font-medium text-foreground/50 uppercase tracking-wider">Title Line {num}</label>
                      <Input 
                        value={(formData.hero as any)[`titleLine${num}`]} 
                        onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, [`titleLine${num}`]: e.target.value }})}
                        className="bg-white/5 border-white/10 rounded-xl"
                      />
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/50 uppercase tracking-wider">Description</label>
                  <Textarea 
                    value={formData.hero.description} 
                    onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, description: e.target.value }})}
                    className="bg-white/5 border-white/10 rounded-xl h-full min-h-[200px]"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ─── EVENTS SETTINGS ─── */}
          <TabsContent value="events" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="glass-dark p-8 rounded-3xl border border-white/5">
              <h3 className="font-bebas text-3xl mb-8 flex items-center gap-3">
                <Flame className="text-primary" /> Manage Timeline
              </h3>
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4 scrollbar-thin">
                {formData.madEvents.map((event, index) => (
                  <div key={index} className="bg-white/5 p-6 rounded-2xl border border-white/10 flex gap-4 group">
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Input value={event.year} onChange={(e) => {
                          const newEvents = [...formData.madEvents];
                          newEvents[index].year = e.target.value;
                          setFormData({ ...formData, madEvents: newEvents });
                        }} placeholder="Year" className="bg-transparent" />
                        <Input value={event.title} onChange={(e) => {
                          const newEvents = [...formData.madEvents];
                          newEvents[index].title = e.target.value;
                          setFormData({ ...formData, madEvents: newEvents });
                        }} placeholder="Title" className="bg-transparent" />
                      </div>
                      <Textarea value={event.description} onChange={(e) => {
                        const newEvents = [...formData.madEvents];
                        newEvents[index].description = e.target.value;
                        setFormData({ ...formData, madEvents: newEvents });
                      }} placeholder="Description" className="bg-transparent h-20" />
                    </div>
                    <button 
                      onClick={() => {
                        const newEvents = formData.madEvents.filter((_, i) => i !== index);
                        setFormData({ ...formData, madEvents: newEvents });
                      }}
                      className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg h-fit opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
                <Button 
                  onClick={() => setFormData({ ...formData, madEvents: [...formData.madEvents, { year: "", title: "", description: "" }]})}
                  className="w-full py-6 rounded-2xl border-2 border-dashed border-white/10 bg-transparent hover:bg-white/5 hover:border-primary/50 text-foreground/50 transition-all font-bold"
                >
                  <Plus className="mr-2" size={20} /> Add New Milestone
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* ─── MENU SETTINGS ─── */}
          <TabsContent value="menu" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="glass-dark p-8 rounded-3xl border border-white/5">
              <h3 className="font-bebas text-3xl mb-8 flex items-center gap-3">
                <Utensils className="text-primary" /> Menu Categories & Items
              </h3>
              
              <div className="space-y-12">
                {formData.menu.map((group, groupIdx) => (
                  <div key={groupIdx} className="bg-white/5 rounded-3xl overflow-hidden border border-white/10">
                    <div className="bg-gradient-fire p-6 flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <Flame className="text-foreground" />
                        <Input 
                          value={group.menu_group} 
                          onChange={(e) => {
                            const newMenu = [...formData.menu];
                            newMenu[groupIdx].menu_group = e.target.value;
                            setFormData({ ...formData, menu: newMenu });
                          }}
                          className="bg-white/20 border-none font-bebas text-2xl h-auto py-1 focus-visible:ring-0 max-w-[300px]"
                        />
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => {
                          const newMenu = formData.menu.filter((_, i) => i !== groupIdx);
                          setFormData({ ...formData, menu: newMenu });
                        }}
                        className="text-white hover:bg-black/20"
                      >
                        <Trash2 size={20} />
                      </Button>
                    </div>

                    <div className="p-6 space-y-6">
                      {/* Image Manager for Category */}
                      <div className="space-y-4">
                        <label className="text-sm font-medium text-foreground/50 uppercase flex items-center gap-2">
                          <ImageIcon size={14} /> Slide Show Images
                        </label>
                        <div className="flex flex-wrap gap-4">
                          {group.images.map((img, imgIdx) => (
                            <div key={imgIdx} className="relative group/img w-32 h-24 rounded-xl overflow-hidden shadow-lg border border-white/10">
                              <img src={img} className="w-full h-full object-cover" />
                              <button 
                                onClick={() => {
                                  const newMenu = [...formData.menu];
                                  newMenu[groupIdx].images = group.images.filter((_, i) => i !== imgIdx);
                                  setFormData({ ...formData, menu: newMenu });
                                }}
                                className="absolute top-1 right-1 bg-red-600 p-1 rounded-md opacity-0 group-hover/img:opacity-100 transition-opacity"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          ))}
                          <label className="w-32 h-24 rounded-xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 text-foreground/30 hover:text-primary transition-all group/upload">
                            <Upload size={24} className="mb-2 group-hover/upload:scale-110 transition-transform" />
                            <span className="text-[10px] font-bold">UPLOAD</span>
                            <input 
                              type="file" 
                              className="hidden" 
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, (base64) => {
                                const newMenu = [...formData.menu];
                                newMenu[groupIdx].images = [...group.images, base64];
                                setFormData({ ...formData, menu: newMenu });
                              })}
                            />
                          </label>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="text-sm font-medium text-foreground/50 uppercase flex items-center gap-2">
                          <Utensils size={14} /> Food Items
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {group.items.map((item, itemIdx) => (
                            <div key={itemIdx} className="bg-black/20 p-4 rounded-2xl border border-white/5 space-y-4 relative group/item">
                              <button 
                                onClick={() => {
                                  const newMenu = [...formData.menu];
                                  newMenu[groupIdx].items = group.items.filter((_, i) => i !== itemIdx);
                                  setFormData({ ...formData, menu: newMenu });
                                }}
                                className="absolute top-2 right-2 text-red-500/50 hover:text-red-500 opacity-0 group-hover/item:opacity-100 transition-opacity"
                              >
                                <X size={16} />
                              </button>
                              <div className="flex gap-4">
                                <div className="flex-1 space-y-2">
                                  <Input 
                                    value={item.food_name} 
                                    onChange={(e) => {
                                      const newMenu = [...formData.menu];
                                      newMenu[groupIdx].items[itemIdx].food_name = e.target.value;
                                      setFormData({ ...formData, menu: newMenu });
                                    }}
                                    placeholder="Item Name"
                                    className="bg-transparent border-white/10 h-8 text-sm font-bold"
                                  />
                                  <Input 
                                    value={item.description} 
                                    onChange={(e) => {
                                      const newMenu = [...formData.menu];
                                      newMenu[groupIdx].items[itemIdx].description = e.target.value;
                                      setFormData({ ...formData, menu: newMenu });
                                    }}
                                    placeholder="Description"
                                    className="bg-transparent border-white/10 h-8 text-xs font-normal"
                                  />
                                </div>
                                <div className="w-24">
                                  <div className="relative">
                                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-secondary font-bold">৳</span>
                                    <Input 
                                      value={item.price} 
                                      onChange={(e) => {
                                        const newMenu = [...formData.menu];
                                        newMenu[groupIdx].items[itemIdx].price = e.target.value;
                                        setFormData({ ...formData, menu: newMenu });
                                      }}
                                      className="bg-transparent border-secondary/30 pl-6 h-8 text-sm font-bold text-secondary"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                          <button 
                            onClick={() => {
                              const newMenu = [...formData.menu];
                              newMenu[groupIdx].items.push({ food_name: "New Item", description: "", price: "0" });
                              setFormData({ ...formData, menu: newMenu });
                            }}
                            className="bg-transparent border border-dashed border-white/10 p-4 rounded-2xl hover:bg-white/5 flex items-center justify-center text-foreground/30 hover:text-primary transition-all"
                          >
                            <Plus size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button 
                  onClick={() => setFormData({ 
                    ...formData, 
                    menu: [...formData.menu, { menu_group: "New Category", items: [], images: [] }]
                  })}
                  className="w-full py-10 rounded-3xl border-2 border-dashed border-white/10 bg-transparent hover:bg-white/5 hover:border-primary/50 text-foreground/50 transition-all font-bold text-xl"
                >
                  <Plus className="mr-2" size={24} /> Create New Menu Section
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* ─── OUTLETS SETTINGS ─── */}
          <TabsContent value="outlets" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="glass-dark p-8 rounded-3xl border border-white/5">
              <h3 className="font-bebas text-3xl mb-8 flex items-center gap-3">
                <MapPin className="text-primary" /> Store Locations
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {formData.outlets.map((outlet, index) => (
                  <div key={index} className="bg-white/5 p-6 rounded-3xl border border-white/10 group relative space-y-4">
                    <button 
                      onClick={() => setFormData({ ...formData, outlets: formData.outlets.filter((_, i) => i !== index) })}
                      className="absolute top-4 right-4 bg-red-600/20 text-red-500 p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={18} />
                    </button>

                    <div className="flex gap-4">
                      <div className="relative w-24 h-24 rounded-2xl overflow-hidden group/thumb border border-white/10 flex-shrink-0">
                        <img src={outlet.image} className="w-full h-full object-cover" />
                        <label className="absolute inset-0 bg-black/60 opacity-0 group-hover/thumb:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                          <Upload size={20} />
                          <input 
                            type="file" 
                            className="hidden" 
                            onChange={(e) => handleImageUpload(e, (base) => {
                              const newOutlets = [...formData.outlets];
                              newOutlets[index].image = base;
                              setFormData({ ...formData, outlets: newOutlets });
                            })}
                          />
                        </label>
                      </div>
                      <div className="flex-1 space-y-2">
                        <Input 
                          value={outlet.branch_name} 
                          onChange={(e) => {
                            const newOutlets = [...formData.outlets];
                            newOutlets[index].branch_name = e.target.value;
                            setFormData({ ...formData, outlets: newOutlets });
                          }}
                          placeholder="Branch Name"
                          className="bg-transparent border-white/10 font-bold"
                        />
                        <div className="flex items-center gap-2 text-foreground/50 text-xs">
                          <Clock size={12} />
                          <input 
                            value={outlet.opening_hours} 
                            onChange={(e) => {
                              const newOutlets = [...formData.outlets];
                              newOutlets[index].opening_hours = e.target.value;
                              setFormData({ ...formData, outlets: newOutlets });
                            }}
                            className="bg-transparent w-full focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin size={16} className="text-primary mt-1" />
                        <Textarea 
                          value={outlet.address} 
                          onChange={(e) => {
                            const newOutlets = [...formData.outlets];
                            newOutlets[index].address = e.target.value;
                            setFormData({ ...formData, outlets: newOutlets });
                          }}
                          className="bg-transparent border-white/5 h-16 min-h-0 py-1"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <span className="text-[10px] text-foreground/40 font-bold uppercase">Phone</span>
                          <Input 
                            value={outlet.phone_number} 
                            onChange={(e) => {
                              const newOutlets = [...formData.outlets];
                              newOutlets[index].phone_number = e.target.value;
                              setFormData({ ...formData, outlets: newOutlets });
                            }}
                            className="bg-black/20"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] text-foreground/40 font-bold uppercase">G-Maps Link</span>
                          <Input 
                            value={outlet.google_maps_location} 
                            onChange={(e) => {
                              const newOutlets = [...formData.outlets];
                              newOutlets[index].google_maps_location = e.target.value;
                              setFormData({ ...formData, outlets: newOutlets });
                            }}
                            className="bg-black/20"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <button 
                  onClick={() => setFormData({ 
                    ...formData, 
                    outlets: [...formData.outlets, { branch_name: "New Branch", address: "", opening_hours: "11 AM - 11 PM", phone_number: "", google_maps_location: "", coordinates: [90.41, 23.81], image: "" }]
                  })}
                  className="bg-transparent border-2 border-dashed border-white/10 rounded-3xl hover:bg-white/5 hover:border-primary/50 text-foreground/30 hover:text-primary transition-all flex flex-col items-center justify-center p-8 gap-3"
                >
                  <Plus size={32} />
                  <span className="font-bold uppercase tracking-wider">Add New Store</span>
                </button>
              </div>
            </div>
          </TabsContent>

          {/* ─── GALLERY SETTINGS ─── */}
          <TabsContent value="gallery" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="glass-dark p-8 rounded-3xl border border-white/5">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-bebas text-3xl flex items-center gap-3">
                  <GalleryVertical className="text-secondary" /> Gallery Manager
                </h3>
                <label className="bg-gradient-fire px-6 py-2 rounded-full text-foreground font-bold text-sm flex items-center gap-2 cursor-pointer hover-fire shadow-lg">
                  <Plus size={18} /> Upload New Photo
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, (base) => {
                      const newItem: GalleryItem = {
                        id: `g${Date.now()}`,
                        src: base,
                        title: "MAD Photo"
                      };
                      setFormData({ ...formData, gallery: [newItem, ...formData.gallery] });
                    })}
                  />
                </label>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {formData.gallery.map((item, index) => (
                  <div key={item.id} className="relative aspect-square group rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                    <img src={item.src} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between">
                      <button 
                        onClick={() => setFormData({ ...formData, gallery: formData.gallery.filter((_, i) => i !== index) })}
                        className="self-end bg-red-600 p-1.5 rounded-lg hover:bg-red-700"
                      >
                        <Trash2 size={14} />
                      </button>
                      <Input 
                        value={item.title} 
                        onChange={(e) => {
                          const newGal = [...formData.gallery];
                          newGal[index].title = e.target.value;
                          setFormData({ ...formData, gallery: newGal });
                        }}
                        className="bg-white/20 border-none h-7 text-[10px] font-bold"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
