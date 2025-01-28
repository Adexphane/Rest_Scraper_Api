import express from "express";
import webScraper from "./scraper.js";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(express.json());
app.use(cors());

const titleParser = (cher) => {
    const getSpec = (label) => {
        return cher(`dt:contains('${label}') + dd .ux-textspans`).text().trim();
      };
    
      return {
        specifications: {
          condition: getSpec('Condition'),
          screenSize: getSpec('Screen Size'),
          color: getSpec('Color'),
          processorSpeed: getSpec('Processor Speed'),
          series: getSpec('Series'),
          maximumResolution: getSpec('Maximum Resolution'),
          ramSize: getSpec('RAM Size'),
          brand: getSpec('Brand'),
          model: getSpec('Model'),
          storageCapacity: getSpec('Storage Capacity'),
          operatingSystem: getSpec('Operating System'),
          connectivity: getSpec('Connectivity'),
          features: getSpec('Features'),
          internetConnectivity: getSpec('Internet Connectivity'),
          type: getSpec('Type'),
          processorModel: getSpec('Processor Model')
        },
        sellerNotes: cher('[data-testid="ux-labels-values"]:has(dt:contains("Seller Notes")) .ux-textspans')
          .text()
          .trim()
          .replace(/“|”/g, '') // Clean quotation marks
      };
};

app.get("/web", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL parameter is required" });
  }

  try {
    const scrapedData = await webScraper(url, titleParser);
    res.json(scrapedData);
  } catch (error) {
    res.json(`Error Alert`, error)
  }
});



export default app
