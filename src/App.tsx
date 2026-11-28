/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Bird, 
  Leaf, 
  Mountain, 
  Waves, 
  Wind, 
  MapPin, 
  ChevronRight,
  ArrowUpRight,
  Droplets,
  X,
  Zap,
  Microscope,
  Globe,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Compass,
  Radio,
  Eye,
  Activity,
  Thermometer,
  Gauge
} from "lucide-react";

interface ProjectDetails {
  title: string;
  architecture: string[];
  ecology: string[];
  research: string[];
}

const FlagshipCard = ({ title, description, image, icon: Icon, tag, id, onOpen }: { 
  title: string; 
  description: string; 
  image: string; 
  icon: any;
  tag: string;
  id: string;
  onOpen: (id: string) => void;
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    className="group relative overflow-hidden rounded-3xl aspect-[16/10] md:aspect-[21/9]"
  >
    <div className="absolute inset-0 overflow-hidden">
      <img 
        src={image} 
        alt={title} 
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[3000ms] ease-out group-hover:scale-110 pointer-events-none select-none ${
          id === "aviary-dome" ? "animate-kenburns" : "animate-kenburns-slow"
        }`}
        referrerPolicy="no-referrer"
      />
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent z-10" />
    
    <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end z-20">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-2 mb-4"
      >
        <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] uppercase tracking-widest font-semibold">
          {tag}
        </span>
      </motion.div>
      
      <div className="grid md:grid-cols-2 gap-6 items-end">
        <div>
          <h3 className="font-serif text-3xl md:text-5xl mb-4 italic flex items-center gap-4">
            <Icon className="w-8 h-8 text-white/70" />
            {title}
          </h3>
          <p className="text-white/60 text-sm md:text-lg max-w-xl leading-relaxed">
            {description}
          </p>
        </div>
        <div className="flex md:justify-end">
          <button 
            onClick={() => onOpen(id)}
            className="flex items-center gap-2 group/btn px-6 py-3 rounded-full border border-white/30 bg-white/5 backdrop-blur-sm hover:bg-white hover:text-black transition-all duration-300"
          >
            Technical Specifications
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
          </button>
        </div>
      </div>
    </div>
  </motion.div>
);

const DetailOverlay = ({ id, isOpen, onClose }: { id: string | null; isOpen: boolean; onClose: () => void }) => {
  const [data, setData] = useState<ProjectDetails | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id && isOpen) {
      setLoading(true);
      fetch(`/api/projects/${id}`)
        .then(res => res.json())
        .then(val => {
          setData(val);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id, isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12"
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={onClose} />
          
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative glass-card w-full max-w-5xl rounded-[2rem] overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="p-8 md:p-12 border-b border-white/10 flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold block mb-2">Technical Dossier</span>
                <h2 className="text-3xl md:text-4xl font-serif italic">{loading ? "Loading..." : data?.title}</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-white/30 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-64 gap-4">
                  <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <p className="text-white/40 uppercase tracking-widest text-[10px]">Retrieving secure data</p>
                </div>
              ) : data && (
                <div className="grid md:grid-cols-3 gap-12">
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <Zap className="w-5 h-5 text-yellow-500/50" />
                      <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-white/50">Innovation</h4>
                    </div>
                    <ul className="space-y-4">
                      {data.architecture.map((item, i) => (
                        <li key={i} className="text-sm text-white/60 leading-relaxed border-l border-white/10 pl-4">{item}</li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <Globe className="w-5 h-5 text-emerald-500/50" />
                      <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-white/50">Ecological Impact</h4>
                    </div>
                    <ul className="space-y-4">
                      {data.ecology.map((item, i) => (
                        <li key={i} className="text-sm text-white/60 leading-relaxed border-l border-white/10 pl-4">{item}</li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <Microscope className="w-5 h-5 text-blue-500/50" />
                      <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-white/50">Research Scope</h4>
                    </div>
                    <ul className="space-y-4">
                      {data.research.map((item, i) => (
                        <li key={i} className="text-sm text-white/60 leading-relaxed border-l border-white/10 pl-4">{item}</li>
                      ))}
                    </ul>
                  </section>
                </div>
              )}
            </div>

            <div className="p-8 md:p-12 bg-white/5 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-[10px] text-white/30 uppercase tracking-widest max-w-sm">
                Internal reference only. confidential ecological strategy for glavaticevo development.
              </p>
              <button className="px-8 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-white/90 transition-all">
                Download PDF Specification
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ProjectItem = ({ title, category, icon: Icon }: { title: string; category: string; icon: any }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass-card p-8 rounded-2xl flex flex-col justify-between aspect-square group cursor-pointer"
  >
    <div className="flex justify-between items-start">
      <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-white/30 transition-colors">
        <Icon className="w-6 h-6 text-white/70" />
      </div>
      <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">{category}</span>
    </div>
    <div>
      <h4 className="text-xl font-medium mb-4 group-hover:text-white transition-colors">{title}</h4>
      <div className="h-[1px] w-full bg-white/10 group-hover:bg-white/30 transition-all duration-500" />
      <div className="mt-4 flex items-center justify-between text-white/30 group-hover:text-white/60">
        <span className="text-xs uppercase tracking-wider">Phase II</span>
        <ChevronRight className="w-4 h-4" />
      </div>
    </div>
  </motion.div>
);

const STATIONS = [
  {
    id: "rakitnica",
    name: "Rakitnica Gorges",
    coords: "43°31'12.4\"N 18°08'43.1\"E",
    altitude: "1,120 m",
    flow: "Fast-flowing, grade III-IV",
    bio: "Eagle nests and cliff swifts",
    desc: "A pristine, narrow canyon with 800m high limestone walls, where the Rakitnica tributary merges with upper Neretva river basin. Rugged wilderness area designated for the futuristic glass Aviary Dome."
  },
  {
    id: "banvir",
    name: "Ban Vir Whitewater Pool",
    coords: "43°30'03.6\"N 18°07'51.6\"E",
    altitude: "740 m",
    flow: "Calm pool after rapids",
    bio: "Endemic Softmouth Trout spawning",
    desc: "A legendary crystal-clear emerald pool characterized by swirling currents. Essential native breeding ecosystem where chemical monitoring verifies pure drinkable waters."
  },
  {
    id: "bridge",
    name: "The Suspension Footbridge",
    coords: "43°29'45.2\"N 18°05'22.0\"E",
    altitude: "610 m",
    flow: "Steady class II rapids",
    bio: "Riverside moss and canyon canopy",
    desc: "The historic swinging hanging bridge crossing deep canyon rockwalls. This location serves as the main observation base for birdwatchers and acoustic swifts recording sensors."
  },
  {
    id: "valley",
    name: "Glavaticevo Valley Meadow",
    coords: "43°29'02.1\"N 18°07'10.8\"E",
    altitude: "520 m",
    flow: "Slow, broad river stream",
    bio: "Upland wildflowers and curative herbs",
    desc: "The spacious fertile plain down the river. Features a gentle mountain microclimate allowing the cultivation of over 50 species of rare Balkan botanical plants in our Terraced Gardens."
  }
];

export default function App() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [activeStation, setActiveStation] = useState(STATIONS[0]);
  const [telemetry, setTelemetry] = useState({
    waterTemp: 7.8,
    purity: 99.72,
    flowRate: 12.4,
    powerGen: 242
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        waterTemp: +(prev.waterTemp + (Math.random() * 0.2 - 0.1)).toFixed(1),
        purity: +(prev.purity + (Math.random() * 0.04 - 0.02)).toFixed(2),
        flowRate: +(prev.flowRate + (Math.random() * 0.4 - 0.2)).toFixed(1),
        powerGen: Math.floor(prev.powerGen + (Math.random() * 6 - 3))
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const openProject = (id: string) => {
    setSelectedProjectId(id);
    setIsDetailOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#FAFAFA] selection:bg-white selection:text-black">
      <DetailOverlay 
        id={selectedProjectId} 
        isOpen={isDetailOpen} 
        onClose={() => setIsDetailOpen(false)} 
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center font-serif italic text-xl">g.</div>
            <span className="uppercase tracking-[0.3em] text-[10px] font-bold">Initiative</span>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-widest font-semibold text-white/60">
            <a href="#" className="hover:text-white transition-colors">Development</a>
            <a href="#" className="hover:text-white transition-colors">Ecological</a>
            <a href="#" className="hover:text-white transition-colors">Impact</a>
            <button className="px-5 py-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all">
              Contact
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2070" 
            alt="Glavaticevo Scenery" 
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#050505]" />
        </motion.div>

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-2 mb-8 text-white/50"
          >
            <MapPin className="w-4 h-4" />
            <span className="uppercase tracking-[0.4em] text-[10px] font-bold">Glavaticevo, Bosnia & Herzegovina</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="text-6xl md:text-[8vw] font-serif italic leading-[0.9] tracking-tighter mb-8"
          >
            Ecological <br /> <span className="text-white/40">Continuum.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="max-w-2xl mx-auto"
          >
            <p className="text-white/40 text-lg md:text-xl font-light leading-relaxed">
              Synthesizing cutting-edge architectural innovation with the pristine wildness of the Neretva valley.
            </p>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/30"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </section>

      {/* Flagship Projects Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-white/30 block mb-4">Strategic Framework</span>
              <h2 className="text-5xl md:text-6xl font-serif italic mb-6">Flagship <br /> Initiatives.</h2>
              <p className="text-white/40 leading-relaxed">
                Detailed technical dossiers on our core ecological commitments. Each project represents a leap in sustainable design and biological preservation.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="text-right">
                <span className="text-3xl font-serif block italic">01—02</span>
                <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Priority Status</span>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <FlagshipCard 
              id="aviary-dome"
              title="Upper Neretva Aviary"
              tag="FLAGSHIP | VALLEYSIDE"
              description="A sanctuary carved into the limestone cliffs of the upper river basin, housing the most diverse avian corridor in the Dinaric Alps."
              image="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2070"
              icon={Bird}
              onOpen={openProject}
            />
            <FlagshipCard 
              id="botanical-garden"
              title="Glavaticevo Gardens"
              tag="FLAGSHIP | CANYON REACH"
              description="Tiered alpine botanical terraces overlooking the turquoise Neretva waters, dedicated to the preservation of Balkan flora."
              image="https://images.unsplash.com/photo-1582531393035-7bb8cbfc0d63?auto=format&fit=crop&q=80&w=2070"
              icon={Leaf}
              onOpen={openProject}
            />
          </div>
        </div>
      </section>

      {/* Live Environmental Stream & Virtual Scenery */}
      <section className="py-24 px-6 border-t border-white/5 bg-[#090909] relative overflow-hidden">
        {/* Abstract topographic contours background */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path d="M 0,200 C 300,100 500,400 800,250 C 1100,100 1300,500 1920,300 M 0,400 C 400,300 700,600 1100,450 C 1500,300 1700,700 1920,500" stroke="white" strokeWidth="2" fill="none" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-emerald-400">Glavaticevo Real-Time Scenery</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif italic">Upper Neretva <br />Real Valley Stream.</h2>
            </div>
            <p className="text-white/40 max-w-md text-sm md:text-base leading-relaxed">
              Explore the raw wilderness surrounding Glavaticevo. Click coordinates on our valley topographical matrix to adjust the sensor HUD tracking or observe the rapids and suspension canyon areas.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Interactive Video Stream Viewport */}
            <div className="lg:col-span-7 space-y-6">
              <div className="relative aspect-video rounded-3xl overflow-hidden bg-black border border-white/10 shadow-2xl">
                {/* Embedded YouTube video loop specified by the user */}
                <iframe
                  src="https://www.youtube.com/embed/pSZGMAidu9E?autoplay=1&mute=1&loop=1&playlist=pSZGMAidu9E&controls=1&modestbranding=1&rel=0&iv_load_policy=3"
                  title="Upper Neretva Canyon River Scenery"
                  className="w-full h-full border-0 absolute inset-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                
                {/* Custom Overlay Controls HUD */}
                <div className="absolute top-4 left-4 z-20 pointer-events-none">
                  <div className="px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[9px] uppercase tracking-widest text-white/95 font-mono flex items-center gap-2">
                    <Radio className="w-3 h-3 text-red-500 animate-pulse" />
                    Feed Source: Glavaticevo Rafting (U-Neretva)
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 z-20 pointer-events-none">
                  <div className="px-3 py-1.5 rounded-full bg-black/90 backdrop-blur-md border border-white/15 text-[9px] tracking-wide text-emerald-400 font-mono">
                    🔊 Tap speaker button on stream layout to hear deep roar rapids
                  </div>
                </div>
              </div>

              {/* Physical Station Selection Buttons */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {STATIONS.map((station) => {
                  const isActive = activeStation.id === station.id;
                  return (
                    <button
                      key={station.id}
                      onClick={() => setActiveStation(station)}
                      className={`text-left p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                        isActive 
                          ? "bg-white/10 border-white/30 text-white shadow-xl shadow-white/[0.02]" 
                          : "bg-white/[0.02] border-white/5 text-white/45 hover:border-white/20 hover:text-white hover:bg-white/[0.04]"
                      }`}
                    >
                      <div className="text-[9px] uppercase tracking-widest font-mono text-white/35 mb-2">{station.altitude} Alt</div>
                      <div className="font-serif italic text-sm">{station.name}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Environmental HUD Telemetry & SVG Map */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              {/* Telemetry Display */}
              <div className="glass-card p-6 md:p-8 rounded-3xl space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    <span className="text-[10px] uppercase tracking-widest font-bold text-white/40">Upper Basin Logs</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400">{activeStation.coords}</span>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-white/40 text-[11px]">
                      <Thermometer className="w-3.5 h-3.5 text-blue-400/70" />
                      <span>water temperature</span>
                    </div>
                    <div className="text-3xl font-mono tracking-tight text-white flex items-baseline gap-1">
                      {telemetry.waterTemp}
                      <span className="text-sm text-white/40">°C</span>
                    </div>
                    <span className="text-[9px] text-white/30 truncate block">Icy spring source</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-white/40 text-[11px]">
                      <Gauge className="w-3.5 h-3.5 text-yellow-400/70" />
                      <span>current velocity</span>
                    </div>
                    <div className="text-3xl font-mono tracking-tight text-white flex items-baseline gap-1">
                      {telemetry.flowRate}
                      <span className="text-sm text-white/40">m³/s</span>
                    </div>
                    <span className="text-[9px] text-white/30 truncate block">{activeStation.flow}</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-white/40 text-[11px]">
                      <Waves className="w-3.5 h-3.5 text-sky-400/70" />
                      <span>chemical purity</span>
                    </div>
                    <div className="text-3xl font-mono tracking-tight text-emerald-400 flex items-baseline gap-1">
                      {telemetry.purity}
                      <span className="text-sm text-emerald-400/50">%</span>
                    </div>
                    <span className="text-[9px] text-emerald-400/40 truncate block">Fully potable standard</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-white/40 text-[11px]">
                      <Zap className="w-3.5 h-3.5 text-emerald-400/70" />
                      <span>eco-energy yield</span>
                    </div>
                    <div className="text-3xl font-mono tracking-tight text-white flex items-baseline gap-1">
                      {telemetry.powerGen}
                      <span className="text-sm text-white/40">kW</span>
                    </div>
                    <span className="text-[9px] text-white/30 truncate block">Zero head turbine impact</span>
                  </div>
                </div>

                {/* Selected Station Deep Details */}
                <div className="pt-6 border-t border-white/10 space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-[11px]">
                    <div>
                      <span className="text-white/30 block text-[9px] uppercase tracking-wider">Topography Level</span>
                      <span className="text-white/80 font-medium">{activeStation.altitude} ASL</span>
                    </div>
                    <div>
                      <span className="text-white/30 block text-[9px] uppercase tracking-wider">Keystone Biology</span>
                      <span className="text-emerald-300 font-medium">{activeStation.bio}</span>
                    </div>
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed bg-white/[0.01] p-4 rounded-xl border border-white/5">
                    {activeStation.desc}
                  </p>
                </div>
              </div>

              {/* Graphical Topographic River Route Map */}
              <div className="glass-card p-6 rounded-3xl mt-6 relative overflow-hidden">
                <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold block mb-4">Topographical River Sequence</span>
                
                {/* SVG Route */}
                <svg className="w-full h-24 stroke-white/20 fill-none overflow-visible" viewBox="0 0 400 100">
                  <motion.path
                    d="M 15 50 Q 100 20 200 70 T 385 45"
                    stroke="rgba(16, 185, 129, 0.15)"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  <motion.path
                    d="M 15 50 Q 100 20 200 70 T 385 45"
                    stroke="rgba(52, 211, 153, 0.5)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="12 15"
                    animate={{ strokeDashoffset: [0, -120] }}
                    transition={{ repeat: Infinity, duration: 9, ease: "linear" }}
                  />

                  {/* Hotspot anchor circles */}
                  {STATIONS.map((st, idx) => {
                    const isSelected = activeStation.id === st.id;
                    const points = [
                      { x: 30, y: 48 },
                      { x: 130, y: 35 },
                      { x: 250, y: 64 },
                      { x: 360, y: 47 }
                    ];
                    const p = points[idx];

                    return (
                      <g 
                        key={st.id} 
                        className="cursor-pointer" 
                        onClick={() => setActiveStation(st)}
                      >
                        {isSelected && (
                          <circle 
                            cx={p.x} 
                            cy={p.y} 
                            r="11" 
                            className="fill-emerald-500/10 stroke-emerald-500/30 animate-ping pointer-events-none"
                          />
                        )}
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r={isSelected ? "6" : "4.5"}
                          className={`transition-all duration-300 ${
                            isSelected ? "fill-emerald-400 stroke-white stroke-2" : "fill-white/30 hover:fill-white/80"
                          }`}
                        />
                        <text
                          x={p.x}
                          y={p.y - 12}
                          textAnchor="middle"
                          className={`text-[8px] font-mono tracking-tight font-medium ${
                            isSelected ? "fill-emerald-400" : "fill-white/20"
                          }`}
                        >
                          {st.name.split(" ")[0]}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                <div className="flex justify-between items-center text-[8px] uppercase tracking-widest text-white/30 font-mono mt-2">
                  <span>Rakitnica Gorges (Elevated)</span>
                  <span>Glavaticevo Valley Valley</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Projects Grid */}
      <section className="py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl font-serif italic mb-4">Ecosystem <br /> Support.</h2>
            <p className="text-white/40 max-w-md">Auxiliary projects providing the foundational data and resource management for Glavaticevo's future.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProjectItem 
              title="Mountain Sanctuary Reserve" 
              category="Preservation"
              icon={Mountain}
            />
            <ProjectItem 
              title="Neretva River Restoration" 
              category="Ecological"
              icon={Waves}
            />
            <ProjectItem 
              title="Alpine Winds Research" 
              category="Research"
              icon={Wind}
            />
            <ProjectItem 
              title="Valley Hydration Systems" 
              category="Infrastructure"
              icon={Droplets}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 items-start">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center font-serif italic text-xl">g.</div>
              <span className="uppercase tracking-[0.3em] text-[10px] font-bold">Glavaticevo</span>
            </div>
            <p className="text-white/30 text-sm max-w-xs">
              Pioneering a new standard for high-altitude ecological preservation and architectural harmony.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h5 className="text-[10px] uppercase tracking-widest text-white/50 font-bold mb-6">Resources</h5>
              <a href="#" className="block text-sm text-white/40 hover:text-white transition-colors">Strategy 2026</a>
              <a href="#" className="block text-sm text-white/40 hover:text-white transition-colors">Env Impact Data</a>
              <a href="#" className="block text-sm text-white/40 hover:text-white transition-colors">Public Press</a>
            </div>
            <div className="space-y-4">
              <h5 className="text-[10px] uppercase tracking-widest text-white/50 font-bold mb-6">Initiative</h5>
              <a href="#" className="block text-sm text-white/40 hover:text-white transition-colors">Community</a>
              <a href="#" className="block text-sm text-white/40 hover:text-white transition-colors">Contact</a>
            </div>
          </div>

          <div className="flex justify-end items-end h-full">
            <div className="text-right">
              <p className="text-xs text-white/20 mb-2">Designed for Glavaticevo Eco-Cooperative</p>
              <p className="text-xs text-white/20">© 2026 All Rights Reserved</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

