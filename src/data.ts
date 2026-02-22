// Data Models and Types
export interface Certification {
  id: string;
  stage: number;
  level: 'Practitioner' | 'Associate' | 'Professional' | 'Specialty';
  title: string;
  description: string;
  avg_salary_low: number;
  avg_salary_high: number;
  demand_score: number; // 0-100
  recruiter_signal_multiplier: number;
  job_openings: number;
  industries: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Candidate {
  id: string;
  name: string;
  certification: string;
  score_band: number; // 0-100
  completion_speed: 'Fast' | 'Standard' | 'Slow';
  performance_tier: 'Bronze' | 'Silver' | 'Gold';
  estimated_salary_band: string;
  recruiter_signal_score: number; // 0-100
  completion_date: string;
}

export interface PerformanceTier {
  tier: 'Bronze' | 'Silver' | 'Gold';
  min_score: number;
  max_score: number;
  description: string;
  recruiter_interest: string;
  salary_multiplier: number;
}

// Hardcoded AWS Certification Data
export const AWS_CERTIFICATIONS: Certification[] = [
  {
    id: 'aws-cp',
    stage: 1,
    level: 'Practitioner',
    title: 'Cloud Practitioner',
    description: 'Foundational understanding of AWS services and cloud concepts',
    avg_salary_low: 75000,
    avg_salary_high: 95000,
    demand_score: 72,
    recruiter_signal_multiplier: 1.0,
    job_openings: 4200,
    industries: ['Technology', 'Finance', 'Healthcare', 'E-commerce'],
    difficulty: 'Beginner',
  },
  {
    id: 'aws-saa',
    stage: 2,
    level: 'Associate',
    title: 'Solutions Architect Associate',
    description: 'Design and deploy scalable systems on AWS',
    avg_salary_low: 105000,
    avg_salary_high: 130000,
    demand_score: 88,
    recruiter_signal_multiplier: 1.35,
    job_openings: 6800,
    industries: ['Technology', 'Finance', 'Enterprise', 'Startups'],
    difficulty: 'Intermediate',
  },
  {
    id: 'aws-dv',
    stage: 2,
    level: 'Associate',
    title: 'Developer Associate',
    description: 'Develop and maintain applications on AWS platform',
    avg_salary_low: 100000,
    avg_salary_high: 128000,
    demand_score: 85,
    recruiter_signal_multiplier: 1.32,
    job_openings: 7200,
    industries: ['Technology', 'SaaS', 'Fintech', 'Startups'],
    difficulty: 'Intermediate',
  },
  {
    id: 'aws-soa',
    stage: 2,
    level: 'Associate',
    title: 'SysOps Administrator Associate',
    description: 'Deploy, manage, and operate scalable systems on AWS',
    avg_salary_low: 102000,
    avg_salary_high: 128000,
    demand_score: 82,
    recruiter_signal_multiplier: 1.3,
    job_openings: 5400,
    industries: ['Technology', 'Enterprise', 'Infrastructure', 'Finance'],
    difficulty: 'Intermediate',
  },
  {
    id: 'aws-sap',
    stage: 3,
    level: 'Professional',
    title: 'Solutions Architect Professional',
    description: 'Advanced AWS architecture and enterprise solutions design',
    avg_salary_low: 135000,
    avg_salary_high: 165000,
    demand_score: 92,
    recruiter_signal_multiplier: 1.65,
    job_openings: 3800,
    industries: ['Enterprise', 'Technology', 'Finance', 'Consulting'],
    difficulty: 'Advanced',
  },
  {
    id: 'aws-devops',
    stage: 3,
    level: 'Professional',
    title: 'DevOps Engineer Professional',
    description: 'CI/CD pipelines, infrastructure automation, and DevOps practices',
    avg_salary_low: 140000,
    avg_salary_high: 170000,
    demand_score: 89,
    recruiter_signal_multiplier: 1.62,
    job_openings: 3200,
    industries: ['Technology', 'SaaS', 'Enterprise', 'Fintech'],
    difficulty: 'Advanced',
  },
  {
    id: 'aws-sec',
    stage: 4,
    level: 'Specialty',
    title: 'Security Specialty',
    description: 'AWS security, compliance, and data protection expertise',
    avg_salary_low: 150000,
    avg_salary_high: 190000,
    demand_score: 95,
    recruiter_signal_multiplier: 1.8,
    job_openings: 2800,
    industries: ['Finance', 'Healthcare', 'Government', 'Enterprise'],
    difficulty: 'Expert',
  },
  {
    id: 'aws-ml',
    stage: 4,
    level: 'Specialty',
    title: 'Machine Learning Specialty',
    description: 'Machine learning, AI services, and ML pipeline implementation',
    avg_salary_low: 155000,
    avg_salary_high: 200000,
    demand_score: 94,
    recruiter_signal_multiplier: 1.85,
    job_openings: 2200,
    industries: ['Technology', 'Finance', 'Research', 'Enterprise'],
    difficulty: 'Expert',
  },
];

export const PERFORMANCE_TIERS: PerformanceTier[] = [
  {
    tier: 'Bronze',
    min_score: 0,
    max_score: 70,
    description: 'Passed certification',
    recruiter_interest: 'Standard',
    salary_multiplier: 1.0,
  },
  {
    tier: 'Silver',
    min_score: 71,
    max_score: 89,
    description: 'High score achievement',
    recruiter_interest: 'Above Average',
    salary_multiplier: 1.08,
  },
  {
    tier: 'Gold',
    min_score: 90,
    max_score: 100,
    description: '90%+ score + fast completion',
    recruiter_interest: 'High Priority',
    salary_multiplier: 1.15,
  },
];

// Mock candidate data
export const MOCK_CANDIDATES: Candidate[] = [
  {
    id: 'cand-001',
    name: 'Sarah Chen',
    certification: 'aws-sap',
    score_band: 94,
    completion_speed: 'Fast',
    performance_tier: 'Gold',
    estimated_salary_band: '$155K - $180K',
    recruiter_signal_score: 92,
    completion_date: '2025-01-15',
  },
  {
    id: 'cand-002',
    name: 'Michael Rodriguez',
    certification: 'aws-saa',
    score_band: 88,
    completion_speed: 'Standard',
    performance_tier: 'Silver',
    estimated_salary_band: '$120K - $135K',
    recruiter_signal_score: 85,
    completion_date: '2025-01-20',
  },
  {
    id: 'cand-003',
    name: 'Emily Watson',
    certification: 'aws-sec',
    score_band: 91,
    completion_speed: 'Fast',
    performance_tier: 'Gold',
    estimated_salary_band: '$165K - $190K',
    recruiter_signal_score: 95,
    completion_date: '2025-01-10',
  },
  {
    id: 'cand-004',
    name: 'David Park',
    certification: 'aws-devops',
    score_band: 78,
    completion_speed: 'Standard',
    performance_tier: 'Silver',
    estimated_salary_band: '$145K - $160K',
    recruiter_signal_score: 80,
    completion_date: '2025-01-25',
  },
  {
    id: 'cand-005',
    name: 'Jessica Thompson',
    certification: 'aws-cp',
    score_band: 72,
    completion_speed: 'Fast',
    performance_tier: 'Bronze',
    estimated_salary_band: '$80K - $95K',
    recruiter_signal_score: 65,
    completion_date: '2025-02-01',
  },
  {
    id: 'cand-006',
    name: 'Alex Kumar',
    certification: 'aws-ml',
    score_band: 95,
    completion_speed: 'Fast',
    performance_tier: 'Gold',
    estimated_salary_band: '$170K - $200K',
    recruiter_signal_score: 98,
    completion_date: '2024-12-28',
  },
  {
    id: 'cand-007',
    name: 'Maria Garcia',
    certification: 'aws-soa',
    score_band: 84,
    completion_speed: 'Standard',
    performance_tier: 'Silver',
    estimated_salary_band: '$115K - $130K',
    recruiter_signal_score: 78,
    completion_date: '2025-01-18',
  },
  {
    id: 'cand-008',
    name: 'James Wilson',
    certification: 'aws-dv',
    score_band: 81,
    completion_speed: 'Standard',
    performance_tier: 'Silver',
    estimated_salary_band: '$110K - $130K',
    recruiter_signal_score: 82,
    completion_date: '2025-01-22',
  },
  {
    id: 'cand-009',
    name: 'Priya Patel',
    certification: 'aws-cp',
    score_band: 68,
    completion_speed: 'Slow',
    performance_tier: 'Bronze',
    estimated_salary_band: '$75K - $90K',
    recruiter_signal_score: 60,
    completion_date: '2025-02-05',
  },
  {
    id: 'cand-010',
    name: 'Thomas Lee',
    certification: 'aws-sap',
    score_band: 89,
    completion_speed: 'Standard',
    performance_tier: 'Silver',
    estimated_salary_band: '$150K - $170K',
    recruiter_signal_score: 88,
    completion_date: '2025-01-12',
  },
];

// Analytics summary data
export const ANALYTICS_SUMMARY = {
  totalCandidates: 1245,
  avgSalaryIncrease: 38,
  recruiterActivityIndex: 8.7,
  completionToPlacementRate: 74,
  goldTierPercentage: 12,
  averageCompletionTime: 45,
};

// Stage drop-off rates
export const STAGE_DROPOFF = [
  { stage: 'Cloud Practitioner', enrolled: 4500, completed: 3200, dropout: 28.9 },
  { stage: 'Associate Level', enrolled: 3200, completed: 2100, dropout: 34.4 },
  { stage: 'Professional Level', enrolled: 2100, completed: 1245, dropout: 40.7 },
  { stage: 'Specialty Certs', enrolled: 1245, completed: 450, dropout: 63.8 },
];

// Salary progression data
export const SALARY_PROGRESSION = [
  { stage: 'Cloud Practitioner', salary: 85, candidates: 3200 },
  { stage: 'Associate', salary: 115, candidates: 2100 },
  { stage: 'Professional', salary: 150, candidates: 1200 },
  { stage: 'Specialty', salary: 175, candidates: 450 },
];

// Recruiter demand by stage
export const RECRUITER_DEMAND = [
  { stage: 'Cloud Practitioner', demand: 72, hiring: 4200 },
  { stage: 'Associate', demand: 85, hiring: 6800 },
  { stage: 'Professional', demand: 90, hiring: 3500 },
  { stage: 'Specialty', demand: 94, hiring: 2800 },
];

// Performance tier distribution
export const PERFORMANCE_DISTRIBUTION = [
  { name: 'Bronze', value: 65, color: '#f59e0b' },
  { name: 'Silver', value: 23, color: '#06b6d4' },
  { name: 'Gold', value: 12, color: '#a78bfa' },
];
