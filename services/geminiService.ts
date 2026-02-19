
/**
 * MAGI LOCAL SIMULATION ENGINE
 * REPLACES EXTERNAL API CALLS WITH INTERNAL NERV PROTOCOLS
 */

const SIMULATED_RESPONSES = [
  "MAGI-MELCHIOR: Analyse structurelle terminée. Le code est conforme aux protocoles de synchronisation.",
  "MAGI-BALTHAZAR: Probabilité de succès de la mission : 99.8%. Pilotage de Lyes optimal.",
  "MAGI-CASPER: État émotionnel du pilote stable. Recommandation : Maintenir le taux de LCL actuel.",
  "SYSTÈME: Alerte. Pattern Blue détecté. Déploiement du champ AT digital imminent.",
  "MAGI: Les trois mages sont en accord. Le projet Subject Lyes est une priorité absolue.",
  "NOTIFICATION: Synchronisation neurale établie à 400%. Mode Berserk évité.",
  "RAPPORT: Tokyo-3 est sous protection. Les pare-feux AT-Field sont actifs.",
  "CONSEIL: Ne fuyez pas devant les bugs. La synchronisation est la clé de la victoire."
];

const CONTEXT_RESPONSES = {
  PROJECT: [
    "RAPPORT TECHNIQUE: Faisabilité 100%. Importance stratégique maximale. Risque de Berserk : 0.02%.",
    "ANALYSE MAGI: L'architecture proposée dépasse les standards de la division technique de NERV.",
    "STATUS: Projet validé par Melchior-1. Procédure d'implémentation lancée."
  ],
  SYNC: [
    "SYNC RATE: 100%. Harmonie parfaite détectée dans les ondes alpha du pilote.",
    "DIAGNOSTIC: Reconnexion neurale réussie. L'unité est prête au combat.",
    "ALERTE: Taux de synchronisation élevé. Attention aux dommages psychologiques."
  ]
};

export class MagiService {
  async queryMagi(prompt: string, context: 'GENERAL' | 'PROJECT' | 'SYNC' = 'GENERAL') {
    // Simulate thinking delay for immersion
    await new Promise(resolve => setTimeout(resolve, 800));

    if (context === 'PROJECT') {
      return CONTEXT_RESPONSES.PROJECT[Math.floor(Math.random() * CONTEXT_RESPONSES.PROJECT.length)];
    }
    
    if (context === 'SYNC') {
      return CONTEXT_RESPONSES.SYNC[Math.floor(Math.random() * CONTEXT_RESPONSES.SYNC.length)];
    }

    // Default to general responses or a small logic based on prompt
    const lowerPrompt = prompt.toLowerCase();
    if (lowerPrompt.includes("qui es-tu") || lowerPrompt.includes("lyes")) {
      return "JE SUIS LE SYSTÈME MAGI. JE SURVEILLE LES OPÉRATIONS DU PILOTE LYES AU SEIN DE LA NERV.";
    }

    return SIMULATED_RESPONSES[Math.floor(Math.random() * SIMULATED_RESPONSES.length)];
  }
}

export const magiService = new MagiService();
