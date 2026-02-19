
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'ARCHIVED';
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  category: 'SYNC' | 'COMBAT' | 'MAINTENANCE';
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
