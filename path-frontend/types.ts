export enum QuestionType {
  SINGLE_CHOICE = 'SINGLE_CHOICE',
  MULTI_CHOICE = 'MULTI_CHOICE',
  TEXT = 'TEXT',
  RATING = 'RATING' // 1-5 scale
}

export interface Question {
  id: string;
  text: string;
  subText?: string;
  type: QuestionType;
  options?: string[]; // For choice types
  minLabel?: string; // For rating
  maxLabel?: string; // For rating
  maxSelections?: number; // Max options for MULTI_CHOICE, default is 3
}

export interface UserAnswers {
  [questionId: string]: string | string[] | number;
}

// AI Response Schema Types
export interface JobRecommendation {
  title: string;
  matchScore: number; // 0-100
  reason: string;
  requiredSkills: string[];
}

export interface RadarDataPoint {
  subject: string;
  A: number;
  fullMark: number;
}

export interface CareerReport {
  archetype: string; // e.g., "The Strategic Visionary"
  archetypeDescription: string;
  personalitySummary: string;
  strengths: string[];
  weaknesses: string[];
  recommendedJobs: JobRecommendation[];
  learningPath: string[]; // Steps to take
  longTermOutlook: string;
  radarChartData: RadarDataPoint[]; // Data for the radar chart
}

export enum AppState {
  INTRO = 'INTRO',
  TESTING = 'TESTING',
  ANALYZING = 'ANALYZING',
  RESULTS = 'RESULTS',
  ERROR = 'ERROR'
}