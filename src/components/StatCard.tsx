import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, BarChart3, Users, Target } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  change,
  changeType = 'neutral',
}) => {
  const changeColor = {
    positive: 'text-emerald-400',
    negative: 'text-red-400',
    neutral: 'text-cyan-400',
  }[changeType];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-effect rounded-lg p-6 hover:bg-white/10 transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-lg bg-gradient-to-r from-cyan-500/20 to-indigo-500/20">
          {icon}
        </div>
      </div>
      <p className="text-gray-400 text-sm mb-1">{label}</p>
      <p className="text-2xl font-bold text-gradient mb-2">{value}</p>
      {change && <p className={`text-xs ${changeColor}`}>{change}</p>}
    </motion.div>
  );
};

export const SummaryCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={<Users className="w-5 h-5 text-cyan-400" />}
        label="Total Certified Candidates"
        value="1,245"
        change="+18% from last month"
        changeType="positive"
      />
      <StatCard
        icon={<BarChart3 className="w-5 h-5 text-emerald-400" />}
        label="Avg Salary Increase"
        value="38%"
        change="+4% quarter-over-quarter"
        changeType="positive"
      />
      <StatCard
        icon={<Briefcase className="w-5 h-5 text-violet-400" />}
        label="Recruiter Activity Index"
        value="8.7/10"
        change="Steady demand"
        changeType="positive"
      />
      <StatCard
        icon={<Target className="w-5 h-5 text-amber-400" />}
        label="Completion-to-Placement"
        value="74%"
        change="+2% this quarter"
        changeType="positive"
      />
    </div>
  );
};
