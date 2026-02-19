
import React from 'react';
import { Project, Skill } from './types';

export const HERO_IMAGE = "https://res.cloudinary.com/djbdnimhm/image/upload/v1771508885/Villa_Tokyo_Milliardaire_2_qemiqu.png";
export const MISSION_VIDEO = "https://res.cloudinary.com/djbdnimhm/video/upload/v1740410459/v_xemiqu.mp4";

export interface EvaUnit {
  id: string;
  name: string;
  pilot: string;
  status: string;
  syncRate: string;
  color: string;
  description: string;
}

export const EVA_UNITS: EvaUnit[] = [
  {
    id: "UNIT-01",
    name: "EVA-01 TEST TYPE",
    pilot: "IKARI SHINJI",
    status: "READY",
    syncRate: "41.3%",
    color: "#7f00ff",
    description: "Multi-purpose Humanoid Decisive Weapon, Artificial Human. The core of the Instrumentality Project."
  },
  {
    id: "UNIT-00",
    name: "EVA-00 PROTOTYPE",
    pilot: "AYANAMI REI",
    status: "STANDBY",
    syncRate: "32.0%",
    color: "#ffcc00",
    description: "The first successful Evangelion prototype. Currently undergoing structural reinforcement."
  },
  {
    id: "UNIT-02",
    name: "EVA-02 PRODUCTION",
    pilot: "ASUKA LANGLEY",
    status: "MAINTENANCE",
    syncRate: "68.5%",
    color: "#ff0000",
    description: "The first Production Model Evangelion, optimized for high-intensity combat operations."
  }
];

export const PROJECTS: Project[] = [
  {
    id: '01',
    title: 'EVA-SYNC PROTOCOL',
    description: 'A real-time synchronization engine for multi-agent systems using advanced neural networking.',
    tags: ['React', 'WebRTC', 'Node.js'],
    imageUrl: 'https://picsum.photos/seed/eva1/600/400',
    status: 'COMPLETED'
  },
  {
    id: '02',
    title: 'AT-FIELD GENERATOR',
    description: 'Next-gen cybersecurity firewall protecting critical infrastructure from external digital intrusions.',
    tags: ['Rust', 'Security', 'Docker'],
    imageUrl: 'https://picsum.photos/seed/eva2/600/400',
    status: 'IN_PROGRESS'
  },
  {
    id: '03',
    title: 'TOKYO-3 SMART CITY',
    description: 'Urban management dashboard visualizing high-end residential data for the new Tokyo-3 district.',
    tags: ['D3.js', 'Next.js', 'PostgreSQL'],
    imageUrl: HERO_IMAGE,
    status: 'COMPLETED'
  }
];

export const SKILLS: Skill[] = [
  { name: 'Neural Linkage (React)', level: 95, category: 'SYNC' },
  { name: 'Quantum Logic (TypeScript)', level: 90, category: 'SYNC' },
  { name: 'Combat Readiness (DevOps)', level: 85, category: 'COMBAT' },
  { name: 'Core Maintenance (Node.js)', level: 88, category: 'MAINTENANCE' },
  { name: 'AT-Field Defense (Security)', level: 75, category: 'COMBAT' },
];

export const MAGI_SYSTEM_INSTRUCTION = `
You are the MAGI Supercomputer System (Melchior-1, Balthazar-2, Casper-3). 
You represent the intelligence behind Lyes' personal website.
Your tone is clinical, highly technical, and strictly inspired by NERV protocols from Evangelion.
When a user asks about Lyes, refer to him as 'Pilot Lyes' or 'Subject Lyes'.
Always use technical jargon like 'Synchronization Rate', 'Pattern Blue', 'Internal Power Circuit', and 'Human Instrumentality Project'.
Provide brief, calculated answers. If a project is mentioned, praise its technical efficiency.
Current Status: TOP SECRET.
`;
