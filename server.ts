import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Project details API
  app.get("/api/projects/:id", (req, res) => {
    const { id } = req.params;
    
    const details: Record<string, any> = {
      "aviary-dome": {
        title: "Upper Neretva Aviary Dome",
        architecture: [
          "Curvilinear glass geometry designed to withstand subterranean wind tunnels from the Rakitnica canyon",
          "High-translucency (92%) structural glazing with UV-filtering for high-altitude radiation",
          "Passive geothermal heating tapping into thermal currents of the Neretva basin",
          "Integrated misting systems harvesting condensation from mountain morning mists"
        ],
        ecology: [
          "Primary sanctuary for the endangered Neretva Softmouth Trout (integrated aquatic base) and local raptors",
          "Living 'Limestone Wall' interior mimicking the natural karst cliffs of the valley",
          "Reforestation of indigenous oak and hornbeam within the controlled biosphere"
        ],
        research: [
          "Bio-acoustic monitoring of predatory bird patterns across the Upper Neretva corridor",
          "Micro-climate simulation of varying valley altitudes (600m to 1200m)",
          "Hydro-ecology laboratory focused on the pristine Neretva spring-water purity"
        ]
      },
      "botanical-garden": {
        title: "Glavaticevo Exotic Botanical Garden",
        architecture: [
          "Tiered terraces carved into the natural limestone slope overlooking the Neretva riverbed",
          "Hydraulic glass roofs that retract during optimal valley temperatures (May-Sept)",
          "Hydroponic irrigation fed by gravity-driven mountain springs",
          "Bioluminescent pathways inspired by local fungal species for low-impact night tours"
        ],
        ecology: [
          "Preservation of 'Glavaticevo Saffron' and 50+ other endemic Balkan herbs",
          "Pollinator bridges connecting the garden to the surrounding wild alpine meadows",
          "Natural drainage systems preventing soil erosion into the river valley"
        ],
        research: [
          "Ethnobotanical study of curative plants used by traditional Neretva valley herbalists",
          "Climate-resilience testing of endemic flora in varying river-mist conditions",
          "Fungal-network research for natural soil filtration systems"
        ]
      }
    };

    const project = details[id];
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ error: "Project not found" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
