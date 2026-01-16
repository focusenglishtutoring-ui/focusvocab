import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  app.get(api.content.getUnit.path, async (_req, res) => {
    const unit = await storage.getUnit();
    if (!unit) {
      return res.status(404).json({ message: "Unit not found" });
    }
    res.json(unit);
  });

  return httpServer;
}
