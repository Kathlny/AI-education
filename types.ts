export enum ContentSection {
  INTRO = 'intro',
  PRINCIPLES = 'principles',
  POTENTIAL = 'potential',
  CONCLUSION = 'conclusion'
}

export interface InteractiveDemoProps {
  apiKey: string | undefined;
}

export interface PrincipleData {
  id: number;
  title: string;
  description: string;
  exampleTitle: string;
  exampleDescription: string;
  iconName: string;
  demoType: 'remix' | 'agents' | 'levels' | 'plugin' | 'privacy';
}

export interface PotentialData {
  id: number;
  title: string;
  problem: string;
  solution: string;
  example: string;
  demoType: 'socratic' | 'growth' | 'multimodal';
}