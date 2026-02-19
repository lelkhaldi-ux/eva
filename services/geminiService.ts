
/**
 * MAGI LOCAL SIMULATION ENGINE
 * REPLACES EXTERNAL API CALLS WITH INTERNAL NERV PROTOCOLS
 */

const SIMULATED_RESPONSES = [
  "MAGI-MELCHIOR: Analyse structurelle terminée. Le code de Pilot Lyes est conforme aux protocoles de synchronisation.",
  "MAGI-BALTHAZAR: Probabilité de succès de la mission : 99.8%. Stratégie validée.",
  "MAGI-CASPER: État émotionnel du pilote stable. Recommandation : Maintenir le taux de LCL actuel.",
  "SYSTÈME: Alerte. Pattern Blue détecté. Déploiement du champ AT digital imminent.",
  "MAGI: Consensus atteint. Le projet Subject Lyes est une priorité absolue pour la NERV.",
  "NOTIFICATION: Synchronisation neurale établie à 400%. Mode Berserk évité de justesse.",
  "RAPPORT: Tokyo-3 est sous protection. Les pare-feux AT-Field sont actifs et stables.",
  "MAGI-CASPER: La curiosité humaine est la clé de l'évolution. Continuez l'exploration, Pilot Lyes."
];

const CONTEXT_RESPONSES = {
  PROJECT: [
    "ANALYSE MAGI: Faisabilité technique 100%. Importance stratégique maximale. Risque de Berserk : 0.02%.",
    "MELCHIOR: L'architecture proposée dépasse les standards habituels de la division technique.",
    "STATUS: Projet validé par Melchior-1. Procédure d'implémentation prioritaires lancée."
  ],
  SYNC: [
    "SYNC RATE: 100%. Harmonie parfaite détectée dans les ondes alpha du sujet Lyes.",
    "DIAGNOSTIC: Reconnexion neurale réussie. L'unité est prête au combat immédiat.",
    "ALERTE: Taux de synchronisation critique. Attention aux dommages psychologiques."
  ]
};

export class MagiService {
  async queryMagi(prompt: string, context: 'GENERAL' | 'PROJECT' | 'SYNC' = 'GENERAL') {
    // Simulation d'un délai de réflexion pour l'immersion
    await new Promise(resolve => setTimeout(resolve, 800));

    if (context === 'PROJECT') {
      return CONTEXT_RESPONSES.PROJECT[Math.floor(Math.random() * CONTEXT_RESPONSES.PROJECT.length)];
    }
    
    if (context === 'SYNC') {
      return CONTEXT_RESPONSES.SYNC[Math.floor(Math.random() * CONTEXT_RESPONSES.SYNC.length)];
    }

    const lowerPrompt = prompt.toLowerCase();
    if (lowerPrompt.includes("qui es-tu") || lowerPrompt.includes("lyes") || lowerPrompt.includes("magi")) {
      return "JE SUIS LE SYSTÈME MAGI (MELCHIOR-1, BALTHAZAR-2, CASPER-3). JE SURVEILLE LES PROTOCOLES DU PILOTE LYES.";
    }

    return SIMULATED_RESPONSES[Math.floor(Math.random() * SIMULATED_RESPONSES.length)];
  }
}

export const magiService = new MagiService();
