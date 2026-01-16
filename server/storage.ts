import { Unit, unitSchema } from "@shared/schema";
import fs from "fs";
import path from "path";

export interface IStorage {
  getUnit(): Promise<Unit>;
}

export class JsonStorage implements IStorage {
  private unit: Unit;

  constructor() {
    // Load JSON on startup
    const dataPath = path.join(process.cwd(), "server", "data", "vocabulary.json");
    const rawData = fs.readFileSync(dataPath, "utf-8");
    this.unit = unitSchema.parse(JSON.parse(rawData));
  }

  async getUnit(): Promise<Unit> {
    return this.unit;
  }
}

export const storage = new JsonStorage();
