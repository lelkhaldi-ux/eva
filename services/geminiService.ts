
import { GoogleGenAI } from "@google/genai";
import { MAGI_SYSTEM_INSTRUCTION } from "../constants";

export class MagiService {
  // We recreate the AI instance to ensure it uses the latest API key from process.env.API_KEY
  private getAI() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async queryMagi(prompt: string, context: 'GENERAL' | 'PROJECT' | 'SYNC' = 'GENERAL') {
    let systemInstruction = MAGI_SYSTEM_INSTRUCTION;
    
    if (context === 'PROJECT') {
      systemInstruction += "\nTask: Analyze the provided project idea. Output a clinical technical report including: Strategic Importance, Technical Feasibility (0-100%), and Potential Risks of 'Berserk' mode during development.";
    } else if (context === 'SYNC') {
      systemInstruction += "\nTask: Evaluate the pilot's input (skills/mood). Output a detailed Synchronization Rate report. If sync is low, suggest LCL adjustment or mental restructuring.";
    }

    try {
      const ai = this.getAI();
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
          thinkingConfig: { thinkingBudget: 2000 } // Adding some thinking budget for deeper analysis
        },
      });

      return response.text || "SYSTEM ERROR: DATA STREAM INTERRUPTED.";
    } catch (error: any) {
      console.error("MAGI Error:", error);
      
      // Handle the "Requested entity was not found" error by suggesting re-auth
      if (error.message && error.message.includes("not found")) {
        return "CRITICAL ERROR: API KEY NOT FOUND OR INVALID. PLEASE RE-AUTHORIZE IN TERMINAL DOGMA.";
      }
      
      return "CRITICAL ERROR: CORE OVERLOAD. PLEASE PURGE LCL TANKS AND CHECK API AUTHORIZATION.";
    }
  }
}

export const magiService = new MagiService();
