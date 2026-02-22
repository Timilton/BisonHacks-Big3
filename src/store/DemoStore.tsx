import React, { createContext, useContext, useState, useCallback } from 'react';

// ==================== DATA MODELS ====================

export interface Company {
  id: string;
  name: string;
}

export interface ResumeSection {
  summary: string;
  education: string[];
  experience: string[];
  projects: string[];
  skills: string[];
}

export interface Course {
  id: string;
  title: string;
  provider: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: number;
  description: string;
  url: string;
  skills: string[];
}

export interface Stage {
  id: string;
  trackId: string;
  stageNum: number; // 1-5
  title: string;
  description: string;
  courseIds: string[];
  skillsAwarded: string[];
  salaryRange: string;
}

export interface Track {
  id: string;
  name: string;
  providerCompanyId: string;
  description: string;
  estimatedWeeks: number;
  stageIds: string[];
}

export interface Learner {
  id: string;
  name: string;
  email: string;
  isPremium: boolean;
  resume: ResumeSection;
  baseSkills: string[];
  createdAt: string;
  lastActivityAt: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  requiredSkills: string[];
  minAvgScore: number;
  estimatedSalary: string;
}

export interface CourseCompletion {
  id: string;
  learnerId: string;
  courseId: string;
  score: number;
  completedAt: string;
}

export type EnrollmentStatus = 'ACTIVE' | 'COMPLETED';

export interface Enrollment {
  id: string;
  learnerId: string;
  companyId: string;
  trackId: string;
  stageNum: number; // 1-5
  status: EnrollmentStatus;
  progressPct: number;
  lastActivityISO: string;
  recruiterVisible: boolean;
}

export interface CheckIn {
  id: string;
  enrollmentId: string;
  minutes: number;
  note: string;
  createdAtISO: string;
}

export interface OutreachMessage {
  id: string;
  fromCompanyId: string;
  toLearnerId: string;
  message: string;
  createdAtISO: string;
}

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

// ==================== DEMO DATA ====================

const DEMO_COMPANIES: Company[] = [
  { id: 'aws', name: 'Amazon Web Services' },
  { id: 'gcp', name: 'Google Cloud' },
  { id: 'azure', name: 'Microsoft Azure' },
];

const DEMO_COURSES: Course[] = [
  // Cloud & Infrastructure (6 courses)
  { id: 'c-1', title: 'Cloud Fundamentals', provider: 'AWS', category: 'Cloud', difficulty: 'Beginner', estimatedHours: 8, description: 'Introduction to cloud computing concepts', url: 'https://aws.amazon.com', skills: ['Cloud Concepts', 'Infrastructure'] },
  { id: 'c-2', title: 'AWS EC2 Essentials', provider: 'AWS', category: 'Compute', difficulty: 'Beginner', estimatedHours: 10, description: 'Master AWS EC2 instances', url: 'https://aws.amazon.com', skills: ['EC2', 'Compute'] },
  { id: 'c-3', title: 'Advanced EC2 Management', provider: 'AWS', category: 'Compute', difficulty: 'Advanced', estimatedHours: 14, description: 'Production-grade EC2 operations', url: 'https://aws.amazon.com', skills: ['EC2', 'Operations'] },
  { id: 'c-4', title: 'S3 & Storage Solutions', provider: 'AWS', category: 'Storage', difficulty: 'Intermediate', estimatedHours: 10, description: 'Data storage with Amazon S3', url: 'https://aws.amazon.com', skills: ['S3', 'Storage'] },
  { id: 'c-5', title: 'VPC & Networking', provider: 'AWS', category: 'Networking', difficulty: 'Intermediate', estimatedHours: 12, description: 'Virtual networks on AWS', url: 'https://aws.amazon.com', skills: ['Networking', 'VPC'] },
  { id: 'c-6', title: 'Disaster Recovery', provider: 'AWS', category: 'Infrastructure', difficulty: 'Advanced', estimatedHours: 16, description: 'High availability and DR strategies', url: 'https://aws.amazon.com', skills: ['Disaster Recovery', 'Reliability'] },
  
  // Data & Databases (6 courses)
  { id: 'c-7', title: 'RDS & Database Basics', provider: 'AWS', category: 'Database', difficulty: 'Beginner', estimatedHours: 9, description: 'Relational databases on AWS', url: 'https://aws.amazon.com', skills: ['RDS', 'Databases'] },
  { id: 'c-8', title: 'DynamoDB NoSQL', provider: 'AWS', category: 'Database', difficulty: 'Intermediate', estimatedHours: 11, description: 'NoSQL database design', url: 'https://aws.amazon.com', skills: ['DynamoDB', 'NoSQL'] },
  { id: 'c-9', title: 'Data Analytics with Redshift', provider: 'AWS', category: 'Data', difficulty: 'Advanced', estimatedHours: 15, description: 'Data warehousing and analytics', url: 'https://aws.amazon.com', skills: ['Redshift', 'Analytics'] },
  { id: 'c-10', title: 'EMR & Big Data', provider: 'AWS', category: 'Data', difficulty: 'Advanced', estimatedHours: 18, description: 'Processing big data at scale', url: 'https://aws.amazon.com', skills: ['EMR', 'Big Data'] },
  { id: 'c-11', title: 'Data Pipeline Design', provider: 'GCP', category: 'Data', difficulty: 'Intermediate', estimatedHours: 12, description: 'Building data pipelines', url: 'https://cloud.google.com', skills: ['Data Pipelines', 'ETL'] },
  { id: 'c-12', title: 'Machine Learning Prep', provider: 'GCP', category: 'Data', difficulty: 'Intermediate', estimatedHours: 13, description: 'Data preparation for ML', url: 'https://cloud.google.com', skills: ['ML', 'Data Preparation'] },
  
  // Security (6 courses)
  { id: 'c-13', title: 'AWS IAM Security', provider: 'AWS', category: 'Security', difficulty: 'Intermediate', estimatedHours: 11, description: 'Identity and access management', url: 'https://aws.amazon.com', skills: ['IAM', 'Security'] },
  { id: 'c-14', title: 'Encryption & Compliance', provider: 'AWS', category: 'Security', difficulty: 'Advanced', estimatedHours: 14, description: 'Data encryption and regulatory compliance', url: 'https://aws.amazon.com', skills: ['Encryption', 'Compliance'] },
  { id: 'c-15', title: 'Network Security', provider: 'Azure', category: 'Security', difficulty: 'Advanced', estimatedHours: 15, description: 'Securing cloud networks', url: 'https://azure.microsoft.com', skills: ['Network Security', 'Firewalls'] },
  { id: 'c-16', title: 'Threat Detection', provider: 'AWS', category: 'Security', difficulty: 'Advanced', estimatedHours: 16, description: 'Real-time security monitoring', url: 'https://aws.amazon.com', skills: ['Monitoring', 'Threat Detection'] },
  { id: 'c-17', title: 'Cloud Governance', provider: 'Azure', category: 'Security', difficulty: 'Intermediate', estimatedHours: 10, description: 'Governance and risk management', url: 'https://azure.microsoft.com', skills: ['Governance', 'Risk'] },
  { id: 'c-18', title: 'Zero Trust Architecture', provider: 'AWS', category: 'Security', difficulty: 'Advanced', estimatedHours: 14, description: 'Implementing zero trust security models', url: 'https://aws.amazon.com', skills: ['Zero Trust', 'Architecture'] },
  
  // DevOps & Containers (6 courses)
  { id: 'c-19', title: 'Docker Fundamentals', provider: 'AWS', category: 'DevOps', difficulty: 'Beginner', estimatedHours: 9, description: 'Containerization basics', url: 'https://aws.amazon.com', skills: ['Docker', 'Containers'] },
  { id: 'c-20', title: 'Kubernetes Essentials', provider: 'GCP', category: 'Container', difficulty: 'Intermediate', estimatedHours: 14, description: 'Container orchestration', url: 'https://cloud.google.com', skills: ['Kubernetes', 'Orchestration'] },
  { id: 'c-21', title: 'ECS & Fargate', provider: 'AWS', category: 'Container', difficulty: 'Intermediate', estimatedHours: 12, description: 'AWS container services', url: 'https://aws.amazon.com', skills: ['ECS', 'Fargate'] },
  { id: 'c-22', title: 'CI/CD Pipelines', provider: 'AWS', category: 'DevOps', difficulty: 'Intermediate', estimatedHours: 12, description: 'Continuous integration and deployment', url: 'https://aws.amazon.com', skills: ['CI/CD', 'DevOps'] },
  { id: 'c-23', title: 'Infrastructure as Code', provider: 'AWS', category: 'DevOps', difficulty: 'Advanced', estimatedHours: 15, description: 'Terraform, CloudFormation, and IaC', url: 'https://aws.amazon.com', skills: ['IaC', 'Terraform'] },
  { id: 'c-24', title: 'Monitoring & Observability', provider: 'AWS', category: 'DevOps', difficulty: 'Intermediate', estimatedHours: 11, description: 'CloudWatch and APM tools', url: 'https://aws.amazon.com', skills: ['Monitoring', 'Observability'] },
  
  // Programming (6 courses)
  { id: 'c-25', title: 'Python for Cloud', provider: 'GCP', category: 'Programming', difficulty: 'Beginner', estimatedHours: 10, description: 'Python in cloud environments', url: 'https://cloud.google.com', skills: ['Python', 'Programming'] },
  { id: 'c-26', title: 'Go for Microservices', provider: 'AWS', category: 'Programming', difficulty: 'Intermediate', estimatedHours: 12, description: 'Building Go-based services', url: 'https://aws.amazon.com', skills: ['Go', 'Microservices'] },
  { id: 'c-27', title: 'Serverless with Lambda', provider: 'AWS', category: 'Programming', difficulty: 'Intermediate', estimatedHours: 11, description: 'AWS Lambda development', url: 'https://aws.amazon.com', skills: ['Lambda', 'Serverless'] },
  { id: 'c-28', title: 'Node.js on Cloud', provider: 'AWS', category: 'Programming', difficulty: 'Beginner', estimatedHours: 10, description: 'Node.js development for cloud', url: 'https://aws.amazon.com', skills: ['Node.js', 'JavaScript'] },
  { id: 'c-29', title: 'Cloud-Native APIs', provider: 'GCP', category: 'Programming', difficulty: 'Intermediate', estimatedHours: 13, description: 'Designing cloud-native APIs', url: 'https://cloud.google.com', skills: ['APIs', 'REST', 'gRPC'] },
  { id: 'c-30', title: 'Advanced Cloud Architecture', provider: 'Azure', category: 'Programming', difficulty: 'Advanced', estimatedHours: 16, description: 'Systems design for cloud scale', url: 'https://azure.microsoft.com', skills: ['Architecture', 'Scalability'] },
];

const DEMO_TRACKS: Track[] = [
  {
    id: 'track-1',
    name: 'Cloud Developer',
    providerCompanyId: 'aws',
    description: 'Master AWS cloud development from basics to production deployment',
    estimatedWeeks: 12,
    stageIds: ['stage-1-1', 'stage-1-2', 'stage-1-3', 'stage-1-4', 'stage-1-5'],
  },
  {
    id: 'track-2',
    name: 'DevOps Engineer',
    providerCompanyId: 'aws',
    description: 'Learn infrastructure automation, CI/CD, and container orchestration',
    estimatedWeeks: 14,
    stageIds: ['stage-2-1', 'stage-2-2', 'stage-2-3', 'stage-2-4', 'stage-2-5'],
  },
  {
    id: 'track-3',
    name: 'Data Engineer',
    providerCompanyId: 'gcp',
    description: 'Build scalable data pipelines and analytics solutions',
    estimatedWeeks: 16,
    stageIds: ['stage-3-1', 'stage-3-2', 'stage-3-3', 'stage-3-4', 'stage-3-5'],
  },
  {
    id: 'track-4',
    name: 'Security Specialist',
    providerCompanyId: 'aws',
    description: 'Become an expert in cloud security and compliance',
    estimatedWeeks: 14,
    stageIds: ['stage-4-1', 'stage-4-2', 'stage-4-3', 'stage-4-4', 'stage-4-5'],
  },
  {
    id: 'track-5',
    name: 'Solutions Architect',
    providerCompanyId: 'azure',
    description: 'Design enterprise-scale cloud solutions across platforms',
    estimatedWeeks: 18,
    stageIds: ['stage-5-1', 'stage-5-2', 'stage-5-3', 'stage-5-4', 'stage-5-5'],
  },
  {
    id: 'track-6',
    name: 'Kubernetes Master',
    providerCompanyId: 'gcp',
    description: 'Expert-level Kubernetes and container orchestration',
    estimatedWeeks: 12,
    stageIds: ['stage-6-1', 'stage-6-2', 'stage-6-3', 'stage-6-4', 'stage-6-5'],
  },
  {
    id: 'track-7',
    name: 'ML Ops Engineer',
    providerCompanyId: 'gcp',
    description: 'Deploy and manage machine learning models in production',
    estimatedWeeks: 16,
    stageIds: ['stage-7-1', 'stage-7-2', 'stage-7-3', 'stage-7-4', 'stage-7-5'],
  },
  {
    id: 'track-8',
    name: 'Cloud Database Admin',
    providerCompanyId: 'aws',
    description: 'Master database management, optimization, and replication',
    estimatedWeeks: 13,
    stageIds: ['stage-8-1', 'stage-8-2', 'stage-8-3', 'stage-8-4', 'stage-8-5'],
  },
  {
    id: 'track-9',
    name: 'Serverless Architect',
    providerCompanyId: 'aws',
    description: 'Build and deploy serverless applications at scale',
    estimatedWeeks: 10,
    stageIds: ['stage-9-1', 'stage-9-2', 'stage-9-3', 'stage-9-4', 'stage-9-5'],
  },
  {
    id: 'track-10',
    name: 'Multi-Cloud Expert',
    providerCompanyId: 'aws',
    description: 'Manage applications across AWS, GCP, and Azure',
    estimatedWeeks: 20,
    stageIds: ['stage-10-1', 'stage-10-2', 'stage-10-3', 'stage-10-4', 'stage-10-5'],
  },
];

const DEMO_STAGES: Stage[] = [];
for (let t = 1; t <= 10; t++) {
  for (let s = 1; s <= 5; s++) {
    const stageId = `stage-${t}-${s}`;
    const courseCount = Math.ceil((s + 1) / 2);
    const courseIds = DEMO_COURSES.slice((s - 1) * 3, (s - 1) * 3 + courseCount).map(c => c.id);
    const skillSamples = ['Cloud Architecture', 'Scalability', 'Security', 'Performance', 'Operations'];
    
    // Calculate salary range based on stage level (1-5)
    const baseSalary = 60000 + (s - 1) * 25000;
    const maxSalary = baseSalary + 40000;
    const salaryRange = `$${baseSalary.toLocaleString()} - $${maxSalary.toLocaleString()}`;
    
    DEMO_STAGES.push({
      id: stageId,
      trackId: `track-${t}`,
      stageNum: s,
      title: `Stage ${s}: ${['Fundamentals', 'Core Skills', 'Advanced Topics', 'Expert Implementation', 'Mastery'][s - 1]}`,
      description: `Learn and master stage ${s} concepts and practices for this track`,
      courseIds,
      skillsAwarded: skillSamples.slice(0, s),
      salaryRange,
    });
  }
}

const DEMO_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Senior Cloud Architect',
    company: 'Amazon',
    description: 'Design and implement cloud solutions for enterprise AWS clients',
    requiredSkills: ['Cloud Concepts', 'Architecture', 'AWS Basics'],
    minAvgScore: 88,
    estimatedSalary: '$150,000 - $180,000',
  },
  {
    id: 'job-2',
    title: 'AWS DevOps Engineer',
    company: 'Amazon',
    description: 'Build and maintain CI/CD infrastructure using AWS services',
    requiredSkills: ['CI/CD', 'DevOps', 'Docker', 'Kubernetes'],
    minAvgScore: 85,
    estimatedSalary: '$130,000 - $160,000',
  },
  {
    id: 'job-3',
    title: 'AWS Data Engineering Lead',
    company: 'Amazon',
    description: 'Lead AWS data pipeline and analytics infrastructure initiatives',
    requiredSkills: ['Data Pipelines', 'ETL', 'Big Data', 'Analytics'],
    minAvgScore: 80,
    estimatedSalary: '$160,000 - $190,000',
  },
  {
    id: 'job-4',
    title: 'AWS Security Engineer',
    company: 'Amazon',
    description: 'Implement and maintain AWS cloud security frameworks',
    requiredSkills: ['Security', 'IAM', 'Encryption', 'Compliance'],
    minAvgScore: 75,
    estimatedSalary: '$140,000 - $170,000',
  },
  {
    id: 'job-5',
    title: 'AWS Solutions Architect',
    company: 'Amazon',
    description: 'Architect AWS cloud solutions for enterprise environments',
    requiredSkills: ['Architecture', 'Scalability', 'Cloud Concepts'],
    minAvgScore: 88,
    estimatedSalary: '$170,000 - $210,000',
  },
  {
    id: 'job-6',
    title: 'AWS Container Specialist',
    company: 'Amazon',
    description: 'Manage and optimize ECS/EKS containers and infrastructure',
    requiredSkills: ['Kubernetes', 'Orchestration', 'Docker', 'Containers'],
    minAvgScore: 82,
    estimatedSalary: '$130,000 - $160,000',
  },
  {
    id: 'job-7',
    title: 'AWS Lambda / Serverless Engineer',
    company: 'Amazon',
    description: 'Build serverless platforms and manage Lambda deployments on AWS',
    requiredSkills: ['Lambda', 'Serverless', 'Architecture', 'Performance'],
    minAvgScore: 78,
    estimatedSalary: '$120,000 - $155,000',
  },
  {
    id: 'job-8',
    title: 'AWS Database Engineer',
    company: 'Amazon',
    description: 'Design and optimize AWS RDS, DynamoDB, and database infrastructure',
    requiredSkills: ['RDS', 'Databases', 'NoSQL', 'DynamoDB'],
    minAvgScore: 80,
    estimatedSalary: '$135,000 - $165,000',
  },
  {
    id: 'job-9',
    title: 'AWS ML Ops Engineer',
    company: 'Amazon',
    description: 'Deploy and manage machine learning models using AWS services',
    requiredSkills: ['ML', 'Data Preparation', 'Python', 'Programming'],
    minAvgScore: 85,
    estimatedSalary: '$140,000 - $175,000',
  },
  {
    id: 'job-10',
    title: 'AWS Infrastructure & IaC Engineer',
    company: 'Amazon',
    description: 'Build infrastructure as code and automation frameworks for AWS',
    requiredSkills: ['IaC', 'Terraform', 'DevOps', 'CI/CD'],
    minAvgScore: 80,
    estimatedSalary: '$125,000 - $155,000',
  },
];

const DEMO_LEARNERS: Learner[] = [
  {
    id: 'learner-1',
    name: 'Alex Chen',
    email: 'alex@email.com',
    isPremium: true,
    resume: {
      summary: 'Software engineer with 3 years experience in full-stack development, now transitioning to cloud.',
      education: ['BS Computer Science, UC Berkeley', 'AWS Solutions Architect Certification'],
      experience: ['Senior Software Engineer at TechCorp', 'Full Stack Developer at StartupXYZ'],
      projects: ['Cloud migration project for 100+ servers', 'Microservices architecture redesign'],
      skills: ['JavaScript', 'Python', 'React', 'Node.js', 'AWS Basics'],
    },
    baseSkills: ['JavaScript', 'Python', 'React', 'Node.js', 'Cloud Concepts'],
    createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
    lastActivityAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'learner-2',
    name: 'Maya Rodriguez',
    email: 'maya@email.com',
    isPremium: false,
    resume: {
      summary: 'Recent computer science graduate, seeking first role in cloud infrastructure.',
      education: ['BS Computer Science, MIT'],
      experience: ['Intern at DataCorp - Data pipeline projects'],
      projects: ['College thesis: Distributed systems design'],
      skills: ['Java', 'Python', 'Linux'],
    },
    baseSkills: ['Java', 'Python', 'Linux', 'Databases'],
    createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
    lastActivityAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'learner-3',
    name: 'James Park',
    email: 'james@email.com',
    isPremium: true,
    resume: {
      summary: '5 years as sysadmin, upskilling in cloud-native technologies.',
      education: ['BS Information Technology, State University', 'Linux Administrator Certification'],
      experience: ['Senior Systems Administrator at EnterpriseBank', 'Linux Admin at FinanceInc'],
      projects: ['Data center consolidation to AWS', 'Automation framework development'],
      skills: ['Bash', 'Linux', 'Networking', 'SystemsAdmin'],
    },
    baseSkills: ['Bash', 'Linux', 'Networking', 'Systems Administration'],
    createdAt: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
    lastActivityAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'learner-4',
    name: 'Sophie Chen',
    email: 'sophie@email.com',
    isPremium: false,
    resume: {
      summary: 'QA engineer transitioning to DevOps and infrastructure.',
      education: ['BA Computer Science, Stanford University'],
      experience: ['QA Engineer at GameStudio', 'Test Automation Lead at SoftwareCo'],
      projects: ['Automated testing framework for 50+ microservices'],
      skills: ['Python', 'Testing', 'CI/CD basics', 'Linux'],
    },
    baseSkills: ['Python', 'Testing', 'Linux', 'Scripting'],
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    lastActivityAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'learner-5',
    name: 'Marcus Johnson',
    email: 'marcus@email.com',
    isPremium: true,
    resume: {
      summary: 'Data scientist looking to transition to ML Ops and production systems.',
      education: ['MS Data Science, Carnegie Mellon', 'BS Mathematics, Harvard'],
      experience: ['Senior Data Scientist at AICloud', 'ML Engineer at ResearchLab'],
      projects: ['Production ML pipeline for billion-record dataset', 'Real-time inference system'],
      skills: ['Python', 'TensorFlow', 'Spark', 'SQL'],
    },
    baseSkills: ['Python', 'TensorFlow', 'Spark', 'SQL', 'Statistics'],
    createdAt: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString(),
    lastActivityAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'learner-6',
    name: 'Elena Volkov',
    email: 'elena@email.com',
    isPremium: false,
    resume: {
      summary: 'Backend engineer specializing in scalable systems and microservices.',
      education: ['BS Computer Engineering, EPFL', 'Docker & Kubernetes Certifications'],
      experience: ['Backend Engineer at ScaleStart', 'Software Engineer at DistributedSys'],
      projects: ['Migrated monolith to microservices (50+ services)', 'Kubernetes cluster management'],
      skills: ['Go', 'Java', 'Docker', 'Kubernetes'],
    },
    baseSkills: ['Go', 'Java', 'Docker', 'Kubernetes'],
    createdAt: new Date(Date.now() - 160 * 24 * 60 * 60 * 1000).toISOString(),
    lastActivityAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'learner-7',
    name: 'David Kim',
    email: 'david@email.com',
    isPremium: true,
    resume: {
      summary: 'Security-focused engineer specializing in infrastructure and compliance.',
      education: ['MS Cybersecurity, NYU', 'BS Computer Science, UC San Diego', 'CISSP, Security+'],
      experience: ['InfoSec Engineer at BankSecure', 'Security Architect at CyberDefense'],
      projects: ['Zero-trust architecture implementation', 'Compliance automation platform'],
      skills: ['Security', 'Linux', 'Python', 'Networking'],
    },
    baseSkills: ['Security', 'Linux', 'Python', 'Networking', 'Cryptography'],
    createdAt: new Date(Date.now() - 220 * 24 * 60 * 60 * 1000).toISOString(),
    lastActivityAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'learner-8',
    name: 'Priya Sharma',
    email: 'priya@email.com',
    isPremium: false,
    resume: {
      summary: 'Full-stack developer building experience in serverless architecture.',
      education: ['BS Information Technology, Delhi University'],
      experience: ['Full-stack Developer at WebDynamics', 'Junior Developer at AppStudio'],
      projects: ['Serverless API platform processing 1M requests/day', 'Real-time notification system'],
      skills: ['Node.js', 'JavaScript', 'React', 'AWS Basics'],
    },
    baseSkills: ['Node.js', 'JavaScript', 'React', 'AWS Basics'],
    createdAt: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000).toISOString(),
    lastActivityAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'learner-9',
    name: 'Robert Taylor',
    email: 'robert@email.com',
    isPremium: true,
    resume: {
      summary: 'Solutions architect with expertise in enterprise cloud migrations.',
      education: ['MBA Technology Management, Berkeley', 'BS Engineering, Georgia Tech', 'Solutions Architect certifications'],
      experience: ['Principal Architect at EnterpriseCloud', 'Senior Architect at GlobalTech'],
      projects: ['Multi-region deployment architecture', 'Cost optimization initiative saving $2M/year'],
      skills: ['Architecture', 'AWS', 'Azure', 'Strategy'],
    },
    baseSkills: ['Architecture', 'AWS', 'Azure', 'Strategy', 'Cost Optimization'],
    createdAt: new Date(Date.now() - 250 * 24 * 60 * 60 * 1000).toISOString(),
    lastActivityAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'learner-10',
    name: 'Lisa Wong',
    email: 'lisa@email.com',
    isPremium: false,
    resume: {
      summary: 'Operations engineer aiming to become cloud infrastructure expert.',
      education: ['BS Systems Engineering, Purdue', 'Cloud Fundamentals in Progress'],
      experience: ['Operations Engineer at CloudOps', 'Systems Administrator at TechCompany'],
      projects: ['Terraform IaC migration for 100+ resources', 'Monitoring infrastructure overhaul'],
      skills: ['Terraform', 'Python', 'Ansible', 'Linux'],
    },
    baseSkills: ['Terraform', 'Python', 'Ansible', 'Linux'],
    createdAt: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString(),
    lastActivityAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'learner-11',
    name: 'Kevin Lee',
    email: 'kevin@email.com',
    isPremium: true,
    resume: {
      summary: 'Frontend engineer exploring cloud-native development.',
      education: ['BS Computer Science, Toronto University'],
      experience: ['Senior Frontend Engineer at WebCorp', 'Frontend Lead at DigitalStudio'],
      projects: ['Migrated legacy app to microservices', 'Performance optimization reducing load time 60%'],
      skills: ['JavaScript', 'React', 'TypeScript', 'Node.js'],
    },
    baseSkills: ['JavaScript', 'React', 'TypeScript', 'Node.js'],
    createdAt: new Date(Date.now() - 140 * 24 * 60 * 60 * 1000).toISOString(),
    lastActivityAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'learner-12',
    name: 'Aisha Patel',
    email: 'aisha@email.com',
    isPremium: false,
    resume: {
      summary: 'Database specialist learning cloud-native database solutions.',
      education: ['MS Database Systems, IIT Mumbai'],
      experience: ['Database Administrator at DataCorp', 'Database Engineer at InfoSystems'],
      projects: ['RDS migration reducing 60% operational overhead', 'Multi-region database replication'],
      skills: ['PostgreSQL', 'Oracle', 'SQL', 'Linux'],
    },
    baseSkills: ['PostgreSQL', 'Oracle', 'SQL', 'Linux', 'Performance Tuning'],
    createdAt: new Date(Date.now() - 130 * 24 * 60 * 60 * 1000).toISOString(),
    lastActivityAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'learner-13',
    name: 'Ethan Brown',
    email: 'ethan@email.com',
    isPremium: true,
    resume: {
      summary: 'DevOps enthusiast with automation and infrastructure focus.',
      education: ['BS Computer Engineering, Carnegie Mellon'],
      experience: ['DevOps Engineer at AutoScale', 'SRE at HighPerformance'],
      projects: ['Fully automated deployment pipeline', 'Infrastructure cost reduced by 40%'],
      skills: ['Python', 'Bash', 'Jenkins', 'GitLab CI'],
    },
    baseSkills: ['Python', 'Bash', 'Jenkins', 'GitLab CI', 'Infrastructure'],
    createdAt: new Date(Date.now() - 110 * 24 * 60 * 60 * 1000).toISOString(),
    lastActivityAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'learner-14',
    name: 'Zara Hussain',
    email: 'zara@email.com',
    isPremium: false,
    resume: {
      summary: 'Production support engineer transitioning to cloud engineering.',
      education: ['BA Information Technology, London School'],
      experience: ['Production Support Engineer at MonitorInc', 'Systems Support at TechHelp'],
      projects: ['Monitoring dashboard for 5000+ metrics', 'Incident response automation'],
      skills: ['Linux', 'Monitoring', 'Troubleshooting', 'Python'],
    },
    baseSkills: ['Linux', 'Monitoring', 'Troubleshooting', 'Python'],
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    lastActivityAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'learner-15',
    name: 'Nathan Cross',
    email: 'nathan@email.com',
    isPremium: true,
    resume: {
      summary: 'Experienced architect designing enterprise-scale cloud solutions.',
      education: ['MS Software Engineering, Stanford', 'BS Computer Science, MIT', 'AWS Certified Solutions Architect'],
      experience: ['Enterprise Architect at FortuneInc', 'Lead Architect at TechScale'],
      projects: ['Global infrastructure design for 50M users', 'Multi-cloud strategy and execution'],
      skills: ['Cloud Architecture', 'Leadership', 'AWS', 'GCP', 'Azure'],
    },
    baseSkills: ['Cloud Architecture', 'Leadership', 'AWS', 'GCP', 'Azure'],
    createdAt: new Date(Date.now() - 300 * 24 * 60 * 60 * 1000).toISOString(),
    lastActivityAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'learner-16',
    name: 'Nina Gupta',
    email: 'nina@email.com',
    isPremium: false,
    resume: {
      summary: 'Data analytics engineer expanding skills to data engineering.',
      education: ['MS Analytics, Georgia Tech'],
      experience: ['Analytics Engineer at InsightCorp', 'Junior Analyst at DataFirst'],
      projects: ['BI dashboard for executive decision making', 'Data warehouse optimization'],
      skills: ['SQL', 'Python', 'Tableau', 'R'],
    },
    baseSkills: ['SQL', 'Python', 'Tableau', 'R', 'Analytics'],
    createdAt: new Date(Date.now() - 85 * 24 * 60 * 60 * 1000).toISOString(),
    lastActivityAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'learner-17',
    name: 'Oliver Martinez',
    email: 'oliver@email.com',
    isPremium: true,
    resume: {
      summary: 'Platform engineer building internal developer platforms.',
      education: ['BS Software Engineering, UNAM', 'Platform Engineering Certifications'],
      experience: ['Platform Engineer at DeveloperTools', 'Infrastructure Engineer at BuildCo'],
      projects: ['Internal developer platform reducing deployment time 80%', 'Kubernetes multi-tenancy solution'],
      skills: ['Kubernetes', 'Go', 'Terraform', 'Git'],
    },
    baseSkills: ['Kubernetes', 'Go', 'Terraform', 'Git', 'Platform Engineering'],
    createdAt: new Date(Date.now() - 170 * 24 * 60 * 60 * 1000).toISOString(),
    lastActivityAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'learner-18',
    name: 'Sophia Anderson',
    email: 'sophia@email.com',
    isPremium: false,
    resume: {
      summary: 'Cloud-native application developer with microservices experience.',
      education: ['BA Computer Science, UC Berkeley'],
      experience: ['Cloud Developer at ModernApps', 'Junior Developer at StartupHub'],
      projects: ['Event-driven microservices architecture', 'API gateway implementation'],
      skills: ['Java', 'Spring Boot', 'REST APIs', 'Kafka'],
    },
    baseSkills: ['Java', 'Spring Boot', 'REST APIs', 'Kafka', 'Microservices'],
    createdAt: new Date(Date.now() - 95 * 24 * 60 * 60 * 1000).toISOString(),
    lastActivityAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'learner-19',
    name: 'Marcus Chen',
    email: 'marcus.c@email.com',
    isPremium: true,
    resume: {
      summary: 'Network engineer specializing in cloud networking and sd-wan.',
      education: ['MS Network Engineering, Polytechnic', 'Cisco certifications'],
      experience: ['Senior Network Engineer at NetworkCorp', 'Network Architect at TelecoCo'],
      projects: ['Global SD-WAN deployment', 'Cloud network security hardening'],
      skills: ['Networking', 'VPC', 'Security Groups', 'BGP'],
    },
    baseSkills: ['Networking', 'VPC', 'Security Groups', 'BGP', 'Cloud Networking'],
    createdAt: new Date(Date.now() - 240 * 24 * 60 * 60 * 1000).toISOString(),
    lastActivityAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'learner-20',
    name: 'Jessica Thompson',
    email: 'jessica@email.com',
    isPremium: false,
    resume: {
      summary: 'Application developer transitioning to serverless architecture.',
      education: ['BS Information Systems, Arizona State'],
      experience: ['Application Developer at SoftwareSol', 'Junior Developer at WebDev'],
      projects: ['Serverless order processing system', 'Real-time data streaming application'],
      skills: ['C#', 'ASP.NET', 'JavaScript', 'AWS'],
    },
    baseSkills: ['C#', 'ASP.NET', 'JavaScript', 'AWS Basics'],
    createdAt: new Date(Date.now() - 70 * 24 * 60 * 60 * 1000).toISOString(),
    lastActivityAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'learner-21',
    name: 'Rajesh Kumar',
    email: 'rajesh@email.com',
    isPremium: true,
    resume: {
      summary: 'Enterprise architect specializing in digital transformation.',
      education: ['MBA Technology Strategy, HEC Paris', 'BS Computer Science, Delhi', 'Multiple cloud certifications'],
      experience: ['Enterprise Architect at TransformCo', 'Technical Lead at DigitalWorks'],
      projects: ['Legacy modernization to cloud-native', 'Multi-cloud governance framework'],
      skills: ['Architecture', 'Strategy', 'AWS', 'GCP', 'Azure'],
    },
    baseSkills: ['Architecture', 'Strategy', 'AWS', 'GCP', 'Azure', 'Leadership'],
    createdAt: new Date(Date.now() - 280 * 24 * 60 * 60 * 1000).toISOString(),
    lastActivityAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'learner-22',
    name: 'Claire Dubois',
    email: 'claire@email.com',
    isPremium: false,
    resume: {
      summary: 'Storage and backup specialist expanding to cloud storage solutions.',
      education: ['Technical Diploma, École Polytechnique'],
      experience: ['Storage Engineer at BackupSys', 'Systems Administrator at StorageCo'],
      projects: ['Enterprise S3 adoption and optimization', 'Disaster recovery solution implementation'],
      skills: ['Storage', 'Backup', 'Linux', 'Scripting'],
    },
    baseSkills: ['Storage', 'Backup', 'Linux', 'Scripting', 'S3'],
    createdAt: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(),
    lastActivityAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'learner-23',
    name: 'Ahmed Hassan',
    email: 'ahmed@email.com',
    isPremium: true,
    resume: {
      summary: 'Compliance and governance specialist ensuring cloud security standards.',
      education: ['MS Information Assurance, Carnegie Mellon', 'BS Business Administration', 'CISSP, PCI-DSS'],
      experience: ['Compliance Officer at FinanceSecure', 'Risk Manager at RegulatoryCo'],
      projects: ['Cloud compliance automation platform', 'SOC 2 Type II certification'],
      skills: ['Governance', 'Compliance', 'Audit', 'Security'],
    },
    baseSkills: ['Governance', 'Compliance', 'Audit', 'Security', 'Risk Management'],
    createdAt: new Date(Date.now() - 260 * 24 * 60 * 60 * 1000).toISOString(),
    lastActivityAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'learner-24',
    name: 'Taylor Rodriguez',
    email: 'taylor.r@email.com',
    isPremium: false,
    resume: {
      summary: 'Cost optimization specialist focused on cloud FinOps.',
      education: ['BS Economics, Northwestern', 'FinOps Certification in progress'],
      experience: ['FinOps Analyst at CostControl', 'Finance Analyst at TechCo'],
      projects: ['Cloud cost reduction initiative saving $5M', 'Chargeback system implementation'],
      skills: ['AWS Cost Explorer', 'FinOps', 'Analytics', 'Python'],
    },
    baseSkills: ['AWS Cost Explorer', 'FinOps', 'Analytics', 'Python', 'Cost Optimization'],
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    lastActivityAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'learner-25',
    name: 'Victoria Shaw',
    email: 'victoria@email.com',
    isPremium: true,
    resume: {
      summary: 'Principal engineer designing massive-scale distributed systems.',
      education: ['PhD Computer Science, Cambridge', 'BS Pure Mathematics, Oxford', 'Google Cloud Architect'],
      experience: ['Principal Engineer at ScaleCorp', 'Tech Lead at DistributedSys', 'Research at Bell Labs'],
      projects: ['Global load balancing serving 10B requests/day', 'Distributed consensus system design'],
      skills: ['Distributed Systems', 'Architecture', 'Scala', 'Go', 'AWS'],
    },
    baseSkills: ['Distributed Systems', 'Architecture', 'Scala', 'Go', 'AWS', 'Leadership'],
    createdAt: new Date(Date.now() - 330 * 24 * 60 * 60 * 1000).toISOString(),
    lastActivityAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// ==================== DEMO STORE CONTEXT ====================

interface DemoStoreContextType {
  // Data
  companies: Company[];
  courses: Course[];
  stages: Stage[];
  tracks: Track[];
  learners: Learner[];
  enrollments: Enrollment[];
  checkIns: CheckIn[];
  outreachMessages: OutreachMessage[];
  courseCompletions: CourseCompletion[];
  jobs: Job[];

  // Getters
  getTrackById: (id: string) => Track | undefined;
  getStagesByTrackId: (trackId: string) => Stage[];
  getStageById: (id: string) => Stage | undefined;
  getLearnerById: (id: string) => Learner | undefined;
  getEnrollmentsByLearnerId: (learnerId: string) => Enrollment[];
  getEnrollmentsByCompanyId: (companyId: string) => Enrollment[];
  getEnrollmentsByTrackId: (trackId: string) => Enrollment[];
  getEnrollmentById: (id: string) => Enrollment | undefined;
  getCheckInsByEnrollmentId: (enrollmentId: string) => CheckIn[];
  getOutreachMessagesByLearnerId: (learnerId: string) => OutreachMessage[];
  getLearnerSkillsProfile: (learnerId: string) => string[];
  getLearnerAvgScore: (learnerId: string) => number;
  getLearnerAllSkills: (learnerId: string) => string[];
  getCourseById: (id: string) => Course | undefined;
  getCourseCompletionsByLearnerId: (learnerId: string) => CourseCompletion[];
  getJobById: (id: string) => Job | undefined;
  computeEnrollmentRisk: (enrollment: Enrollment) => RiskLevel;

  // Actions
  startTrack: (learnerId: string, trackId: string) => Enrollment;
  checkIn: (enrollmentId: string, minutes: number, note: string) => void;
  submitStageCompletion: (enrollmentId: string) => void;
  completeCourse: (learnerId: string, courseId: string, score: number) => CourseCompletion;
  updateResume: (learnerId: string, resume: ResumeSection) => void;
  requestOutreach: (companyId: string, learnerId: string, message: string) => void;
}

const DemoStoreContext = createContext<DemoStoreContextType | undefined>(undefined);

export const DemoStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [companies] = useState<Company[]>(DEMO_COMPANIES);
  const [courses] = useState<Course[]>(DEMO_COURSES);
  const [stages] = useState<Stage[]>(DEMO_STAGES);
  const [tracks] = useState<Track[]>(DEMO_TRACKS);
  const [learners, setLearners] = useState<Learner[]>(DEMO_LEARNERS);
  const [jobs] = useState<Job[]>(DEMO_JOBS);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([
    {
      id: 'enroll-1',
      learnerId: 'learner-2',
      companyId: 'aws',
      trackId: 'track-1',
      stageNum: 2,
      status: 'ACTIVE',
      progressPct: 40,
      lastActivityISO: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      recruiterVisible: false,
    },
    {
      id: 'enroll-2',
      learnerId: 'learner-1',
      companyId: 'aws',
      trackId: 'track-2',
      stageNum: 5,
      status: 'COMPLETED',
      progressPct: 100,
      lastActivityISO: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      recruiterVisible: true,
    },
    {
      id: 'enroll-3',
      learnerId: 'learner-5',
      companyId: 'gcp',
      trackId: 'track-3',
      stageNum: 3,
      status: 'ACTIVE',
      progressPct: 60,
      lastActivityISO: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      recruiterVisible: false,
    },
  ]);
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [outreachMessages, setOutreachMessages] = useState<OutreachMessage[]>([]);
  const [courseCompletions, setCourseCompletions] = useState<CourseCompletion[]>([
    {
      id: 'comp-1',
      learnerId: 'learner-1',
      courseId: 'c-1',
      score: 92,
      completedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'comp-2',
      learnerId: 'learner-1',
      courseId: 'c-2',
      score: 88,
      completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]);

  // ==================== GETTERS ====================

  const getTrackById = useCallback((id: string) => tracks.find((t) => t.id === id), [tracks]);

  const getStagesByTrackId = useCallback(
    (trackId: string) => stages.filter((s) => s.trackId === trackId).sort((a, b) => a.stageNum - b.stageNum),
    [stages]
  );

  const getStageById = useCallback((id: string) => stages.find((s) => s.id === id), [stages]);

  const getLearnerById = useCallback((id: string) => learners.find((l) => l.id === id), [learners]);

  const getEnrollmentsByLearnerId = useCallback(
    (learnerId: string) => enrollments.filter((e) => e.learnerId === learnerId),
    [enrollments]
  );

  const getEnrollmentsByCompanyId = useCallback(
    (companyId: string) => enrollments.filter((e) => e.companyId === companyId),
    [enrollments]
  );

  const getEnrollmentsByTrackId = useCallback(
    (trackId: string) => enrollments.filter((e) => e.trackId === trackId),
    [enrollments]
  );

  const getEnrollmentById = useCallback((id: string) => enrollments.find((e) => e.id === id), [enrollments]);

  const getCheckInsByEnrollmentId = useCallback(
    (enrollmentId: string) => checkIns.filter((c) => c.enrollmentId === enrollmentId),
    [checkIns]
  );

  const getOutreachMessagesByLearnerId = useCallback(
    (learnerId: string) => outreachMessages.filter((m) => m.toLearnerId === learnerId),
    [outreachMessages]
  );

  const getCourseById = useCallback((id: string) => courses.find((c) => c.id === id), [courses]);

  const getCourseCompletionsByLearnerId = useCallback(
    (learnerId: string) => courseCompletions.filter((cc) => cc.learnerId === learnerId),
    [courseCompletions]
  );

  const getJobById = useCallback((id: string) => jobs.find((j) => j.id === id), [jobs]);

  const getLearnerAvgScore = useCallback(
    (learnerId: string): number => {
      const completions = courseCompletions.filter((cc) => cc.learnerId === learnerId);
      if (completions.length === 0) return 0;
      const sum = completions.reduce((acc, cc) => acc + cc.score, 0);
      return Math.round(sum / completions.length);
    },
    [courseCompletions]
  );

  const getLearnerAllSkills = useCallback(
    (learnerId: string): string[] => {
      const learner = learners.find((l) => l.id === learnerId);
      if (!learner) return [];

      const allSkills = new Set<string>();

      // Add resume skills
      learner.resume.skills.forEach((skill) => allSkills.add(skill));

      // Add base skills
      learner.baseSkills.forEach((skill) => allSkills.add(skill));

      // Add skills from course completions
      getCourseCompletionsByLearnerId(learnerId).forEach((completion) => {
        const course = getCourseById(completion.courseId);
        if (course) {
          course.skills.forEach((skill) => allSkills.add(skill));
        }
      });

      // Add skills from completed stages
      const enrollmentsForLearner = getEnrollmentsByLearnerId(learnerId);
      enrollmentsForLearner.forEach((enrollment) => {
        const trackStages = getStagesByTrackId(enrollment.trackId);
        trackStages.forEach((stage) => {
          if (stage.stageNum <= enrollment.stageNum) {
            stage.skillsAwarded.forEach((skill) => allSkills.add(skill));
          }
        });
      });

      return Array.from(allSkills).sort();
    },
    [learners, getCourseCompletionsByLearnerId, getCourseById, getEnrollmentsByLearnerId, getStagesByTrackId]
  );

  const getLearnerSkillsProfile = useCallback(
    (learnerId: string) => {
      const learner = learners.find((l) => l.id === learnerId);
      if (!learner) return [];

      const baseSkillsSet = new Set(learner.baseSkills);
      const enrollmentsForLearner = enrollments.filter((e) => e.learnerId === learnerId);

      enrollmentsForLearner.forEach((enrollment) => {
        const completedStages = stages.filter((s) => s.trackId === enrollment.trackId && s.stageNum <= enrollment.stageNum);
        completedStages.forEach((stage) => {
          stage.skillsAwarded.forEach((skill) => baseSkillsSet.add(skill));
        });
      });

      return Array.from(baseSkillsSet).sort();
    },
    [learners, enrollments, stages]
  );

  const computeEnrollmentRisk = useCallback((enrollment: Enrollment): RiskLevel => {
    const now = new Date();
    const lastActivity = new Date(enrollment.lastActivityISO);
    const daysSinceActivity = (now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24);

    if (daysSinceActivity > 5 || enrollment.progressPct < (enrollment.stageNum - 1) * 20) {
      return 'HIGH';
    }
    if (daysSinceActivity > 2 || enrollment.progressPct < (enrollment.stageNum - 1) * 15) {
      return 'MEDIUM';
    }
    return 'LOW';
  }, []);

  // ==================== ACTIONS ====================

  const startTrack = useCallback(
    (learnerId: string, trackId: string) => {
      const enrollmentId = `enroll-${Date.now()}`;
      const newEnrollment: Enrollment = {
        id: enrollmentId,
        learnerId,
        companyId: 'aws',
        trackId,
        stageNum: 1,
        status: 'ACTIVE',
        progressPct: 0,
        lastActivityISO: new Date().toISOString(),
        recruiterVisible: false,
      };
      setEnrollments((prev) => [...prev, newEnrollment]);
      return newEnrollment;
    },
    []
  );

  const checkIn = useCallback((enrollmentId: string, minutes: number, note: string) => {
    const checkInId = `checkin-${Date.now()}`;
    const newCheckIn: CheckIn = {
      id: checkInId,
      enrollmentId,
      minutes,
      note,
      createdAtISO: new Date().toISOString(),
    };
    setCheckIns((prev) => [...prev, newCheckIn]);

    // Update enrollment
    setEnrollments((prev) =>
      prev.map((e) => {
        if (e.id === enrollmentId) {
          return {
            ...e,
            lastActivityISO: new Date().toISOString(),
            progressPct: Math.min(e.progressPct + 5, 100),
          };
        }
        return e;
      })
    );
  }, []);

  const submitStageCompletion = useCallback((enrollmentId: string) => {
    setEnrollments((prev) =>
      prev.map((e) => {
        if (e.id === enrollmentId) {
          if (e.stageNum === 5) {
            return {
              ...e,
              stageNum: 5,
              status: 'COMPLETED',
              progressPct: 100,
              lastActivityISO: new Date().toISOString(),
              recruiterVisible: true,
            };
          } else {
            return {
              ...e,
              stageNum: e.stageNum + 1,
              progressPct: Math.min((e.stageNum + 1) * 20, 100),
              lastActivityISO: new Date().toISOString(),
              recruiterVisible: e.stageNum >= 4,
            };
          }
        }
        return e;
      })
    );
  }, []);

  const completeCourse = useCallback(
    (learnerId: string, courseId: string, score: number) => {
      const completionId = `comp-${Date.now()}`;
      const newCompletion: CourseCompletion = {
        id: completionId,
        learnerId,
        courseId,
        score,
        completedAt: new Date().toISOString(),
      };
      setCourseCompletions((prev) => [...prev, newCompletion]);
      return newCompletion;
    },
    []
  );

  const updateResume = useCallback((learnerId: string, resume: ResumeSection) => {
    setLearners((prev) =>
      prev.map((l) => {
        if (l.id === learnerId) {
          return { ...l, resume };
        }
        return l;
      })
    );
  }, []);

  const requestOutreach = useCallback((companyId: string, toLearnerId: string, message: string) => {
    const messageId = `msg-${Date.now()}`;
    const newMessage: OutreachMessage = {
      id: messageId,
      fromCompanyId: companyId,
      toLearnerId,
      message,
      createdAtISO: new Date().toISOString(),
    };
    setOutreachMessages((prev) => [...prev, newMessage]);
  }, []);

  const value: DemoStoreContextType = {
    companies,
    courses,
    stages,
    tracks,
    learners,
    enrollments,
    checkIns,
    outreachMessages,
    courseCompletions,
    jobs,
    getTrackById,
    getStagesByTrackId,
    getStageById,
    getLearnerById,
    getEnrollmentsByLearnerId,
    getEnrollmentsByCompanyId,
    getEnrollmentsByTrackId,
    getEnrollmentById,
    getCheckInsByEnrollmentId,
    getOutreachMessagesByLearnerId,
    getLearnerSkillsProfile,
    getLearnerAvgScore,
    getLearnerAllSkills,
    getCourseById,
    getCourseCompletionsByLearnerId,
    getJobById,
    computeEnrollmentRisk,
    startTrack,
    checkIn,
    submitStageCompletion,
    completeCourse,
    updateResume,
    requestOutreach,
  };

  return <DemoStoreContext.Provider value={value}>{children}</DemoStoreContext.Provider>;
};

export const useDemoStore = () => {
  const context = useContext(DemoStoreContext);
  if (!context) {
    throw new Error('useDemoStore must be used within DemoStoreProvider');
  }
  return context;
};
