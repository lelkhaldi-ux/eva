
import { GoogleGenAI } from "@google/genai";
import { MAGI_SYSTEM_INSTRUCTION } from "../constants";

export class MagiService {
  private ai: GoogleGenAI;

  constructor() {
    // Initializing with the named parameter and process.env.API_KEY as per guidelines
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async queryMagi(prompt: string, context: 'GENERAL' | 'PROJECT' | 'SYNC' = 'GENERAL') {
    let systemInstruction = MAGI_SYSTEM_INSTRUCTION;
    
    if (context === 'PROJECT') {
      systemInstruction += "\nTask: Analyze the provided project idea. Output a clinical technical report including: Strategic Importance, Technical Feasibility (0-100%), and Potential Risks of 'Berserk' mode during development.";
    } else if (context === 'SYNC') {
      systemInstruction += "\nTask: Evaluate the pilot's input (skills/mood). Output a detailed Synchronization Rate report. If sync is low, suggest LCL adjustment or mental restructuring.";
    }

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.8,
        },
      });

      // Using .text property directly as per the extracted response property definition
      return response.text || "SYSTEM ERROR: DATA STREAM INTERRUPTED.";
    } catch (error) {
      console.error("MAGI Error:", error);
      return "CRITICAL ERROR: CORE OVERLOAD. PLEASE PURGE LCL TANKS.";
    }
  }
}

export const magiService = new MagiService();
