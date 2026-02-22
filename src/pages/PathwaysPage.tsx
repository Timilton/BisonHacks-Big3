import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Briefcase, Zap } from 'lucide-react';
import { Layout } from '../components/Layout';
import { AWS_CERTIFICATIONS } from '../data';

const getDemandColor = (score: number) => {
  if (score >= 85) return 'from-emerald-500 to-emerald-400';
  if (score >= 75) return 'from-amber-500 to-amber-400';
  return 'from-red-500 to-red-400';
};

const getDemandLabel = (score: number) => {
  if (score >= 85) return 'High Growth';
  if (score >= 75) return 'Stable';
  return 'Competitive';
};

export const PathwaysPage: React.FC = () => {
  return (
    <Layout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-4xl font-bold text-gradient">AWS Certification Pathways</h1>
          <p className="text-gray-400 mt-2">
            Complete career progression framework with salary insights, market demand, and recruiter visibility at each stage
          </p>
        </motion.div>

        {/* Certification Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {AWS_CERTIFICATIONS.map((cert, index) => (
            <Link key={cert.id} to={`/provider/pathways/${cert.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-effect rounded-lg p-6 h-full hover:bg-white/10 cursor-pointer transition-all group"
              >
                {/* Stage Badge */}
                <div className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-400">
                  Stage {cert.stage}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold mb-2 group-hover:text-cyan-400 transition">
                  {cert.title}
                </h3>

                {/* Level Badge */}
                <div className="inline-block mb-4 px-2 py-1 rounded text-xs bg-white/5 text-gray-300">
                  {cert.level}
                </div>

                {/* Salary Range */}
                <div className="mb-4 pb-4 border-b border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Avg Salary Range</p>
                  <p className="text-lg font-bold text-emerald-400">
                    ${(cert.avg_salary_low / 1000).toFixed(0)}K - ${(cert.avg_salary_high / 1000).toFixed(0)}K
                  </p>
                </div>

                {/* Key Metrics */}
                <div className="space-y-3">
                  {/* Recruiter Demand */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <Users className="w-3 h-3" /> Recruiter Demand
                      </p>
                      <p className="text-xs font-bold text-cyan-400">{cert.demand_score}/100</p>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${cert.demand_score}%` }}
                        transition={{ duration: 0.6, delay: index * 0.05 + 0.2 }}
                        className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Job Openings */}
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <Briefcase className="w-3 h-3" /> Open Roles
                    </p>
                    <p className="text-xs font-bold text-emerald-400">{cert.job_openings.toLocaleString()}</p>
                  </div>

                  {/* Market Status */}
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> Market Status
                    </p>
                    <p className={`text-xs font-bold bg-gradient-to-r ${getDemandColor(
                      cert.demand_score
                    )} bg-clip-text text-transparent`}>
                      {getDemandLabel(cert.demand_score)}
                    </p>
                  </div>
                </div>

                {/* Difficulty Indicator */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-400">Difficulty</p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`h-1.5 w-1.5 rounded-full ${
                            ['Beginner', 'Intermediate', 'Advanced', 'Expert'].indexOf(
                              cert.difficulty
                            ) >= i
                              ? 'bg-amber-400'
                              : 'bg-white/10'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <button className="mt-4 w-full py-2 rounded text-sm font-bold bg-white/5 hover:bg-white/10 transition">
                  View Details →
                </button>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="glass-effect rounded-lg p-8 mt-8"
        >
          <h2 className="text-2xl font-bold mb-4">How AWS Certifications Impact Career Growth</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold mb-2 text-cyan-400 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" /> Salary Progression
              </h3>
              <p className="text-gray-400 text-sm">
                Learners see average salary increases of 38% across the certification pathway, with specialty certifications commanding premium compensation
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2 text-emerald-400 flex items-center gap-2">
                <Zap className="w-5 h-5" /> Market Demand
              </h3>
              <p className="text-gray-400 text-sm">
                Professional and specialty certifications have 85%+ recruiter demand scores, with thousands of open positions across industries
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};
