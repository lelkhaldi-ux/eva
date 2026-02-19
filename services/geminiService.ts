
import { GoogleGenAI } from "@google/genai";
import { MAGI_SYSTEM_INSTRUCTION } from "../constants.tsx";

export class MagiService {
  private getAI() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async queryMagi(prompt: string, context: 'GENERAL' | 'PROJECT' | 'SYNC' = 'GENERAL') {
    let instruction = MAGI_SYSTEM_INSTRUCTION;
    
    if (context === 'PROJECT') {
      instruction += "\nCONTEXTE: Analyse de faisabilité technique. Évaluez l'importance stratégique et le risque de 'Berserk'.";
    } else if (context === 'SYNC') {
      instruction += "\nCONTEXTE: Diagnostic de synchronisation neurale. Évaluez l'harmonie des ondes alpha.";
    }

    try {
      const ai = this.getAI();
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction: instruction,
          temperature: 0.75,
        },
      });

      return response.text || "MAGI: FLUX DE DONNÉES INTERROMPU.";
    } catch (error) {
      console.error("MAGI Error:", error);
      return "ERREUR CRITIQUE: LIAISON AVEC LE NOYAU MAGI PERDUE. VÉRIFIEZ LES PROTOCOLES (API_KEY).";
    }
  }
}

export const magiService = new MagiService();
