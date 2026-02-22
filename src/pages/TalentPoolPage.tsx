import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Zap, Award } from 'lucide-react';
import { Layout } from '../components/Layout';
import { MOCK_CANDIDATES } from '../data';

type FilterTier = 'all' | 'Bronze' | 'Silver' | 'Gold';

export const TalentPoolPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState<FilterTier>('all');

  const filteredCandidates = MOCK_CANDIDATES.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.certification.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = tierFilter === 'all' || candidate.performance_tier === tierFilter;
    return matchesSearch && matchesTier;
  });

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Gold':
        return 'from-violet-500 to-violet-400 text-violet-400 bg-violet-400/10';
      case 'Silver':
        return 'from-cyan-500 to-cyan-400 text-cyan-400 bg-cyan-400/10';
      default:
        return 'from-amber-500 to-amber-400 text-amber-400 bg-amber-400/10';
    }
  };

  const getSignalScore = (score: number) => {
    if (score >= 90) return { label: 'Very High', color: 'text-emerald-400' };
    if (score >= 75) return { label: 'High', color: 'text-cyan-400' };
    if (score >= 60) return { label: 'Medium', color: 'text-amber-400' };
    return { label: 'Low', color: 'text-red-400' };
  };

  return (
    <Layout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-4xl font-bold text-gradient">Certified Talent Pool</h1>
          <p className="text-gray-400 mt-2">
            Discover high-performing certified professionals and their market readiness
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="glass-effect rounded-lg p-6"
        >
          <div className="grid md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search candidates or certifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50"
              />
            </div>

            {/* Tier Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-5 h-5 text-gray-400" />
              {(['all', 'Bronze', 'Silver', 'Gold'] as FilterTier[]).map((tier) => (
                <button
                  key={tier}
                  onClick={() => setTierFilter(tier)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    tierFilter === tier
                      ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-white'
                      : 'glass-effect hover:bg-white/10'
                  }`}
                >
                  {tier === 'all' ? 'All Tiers' : tier}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="text-sm text-gray-400"
        >
          Showing <span className="font-bold text-white">{filteredCandidates.length}</span> of{' '}
          <span className="font-bold text-white">{MOCK_CANDIDATES.length}</span> candidates
        </motion.div>

        {/* Candidates Table */}
        <div className="overflow-x-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="glass-effect rounded-lg overflow-hidden"
          >
            <div className="min-w-full">
              {/* Header */}
              <div className="grid grid-cols-7 gap-4 px-6 py-4 border-b border-white/10 bg-white/5 font-bold text-sm">
                <div>Name</div>
                <div>Certification</div>
                <div>Performance Tier</div>
                <div>Score</div>
                <div>Recruiter Signal</div>
                <div>Salary Band</div>
                <div>Speed</div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-white/10">
                {filteredCandidates.length > 0 ? (
                  filteredCandidates.map((candidate, index) => {
                    const signal = getSignalScore(candidate.recruiter_signal_score);
                    return (
                      <motion.div
                        key={candidate.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="grid grid-cols-7 gap-4 px-6 py-4 hover:bg-white/5 transition items-center"
                      >
                        {/* Name */}
                        <div className="font-bold flex items-center gap-2">
                          {candidate.performance_tier === 'Gold' && (
                            <Award className="w-4 h-4 text-violet-400" />
                          )}
                          {candidate.name}
                        </div>

                        {/* Certification */}
                        <div className="text-sm text-gray-400">
                          {candidate.certification.split('-').pop()?.toUpperCase()}
                        </div>

                        {/* Tier */}
                        <div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getTierColor(
                              candidate.performance_tier
                            )}`}
                          >
                            {candidate.performance_tier}
                          </span>
                        </div>

                        {/* Score */}
                        <div className="font-bold text-cyan-400">{candidate.score_band}%</div>

                        {/* Recruiter Signal */}
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Zap className="w-4 h-4 text-amber-400" />
                            <span className={`font-bold text-sm ${signal.color}`}>
                              {candidate.recruiter_signal_score}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">{signal.label}</p>
                        </div>

                        {/* Salary Band */}
                        <div className="text-sm text-emerald-400 font-bold">
                          {candidate.estimated_salary_band}
                        </div>

                        {/* Speed */}
                        <div>
                          <span
                            className={`text-xs font-bold px-2 py-1 rounded ${
                              candidate.completion_speed === 'Fast'
                                ? 'bg-emerald-400/20 text-emerald-400'
                                : candidate.completion_speed === 'Standard'
                                  ? 'bg-cyan-400/20 text-cyan-400'
                                  : 'bg-amber-400/20 text-amber-400'
                            }`}
                          >
                            {candidate.completion_speed}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="px-6 py-8 text-center text-gray-400">
                    No candidates match your filters
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Key Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {[
            {
              label: 'Gold Tier Candidates',
              value: MOCK_CANDIDATES.filter((c) => c.performance_tier === 'Gold').length,
              color: 'text-violet-400',
            },
            {
              label: 'Avg Recruiter Signal',
              value: (
                MOCK_CANDIDATES.reduce((sum, c) => sum + c.recruiter_signal_score, 0) /
                MOCK_CANDIDATES.length
              ).toFixed(0),
              color: 'text-cyan-400',
              suffix: '/100',
            },
            {
              label: 'Ready for Placement',
              value: MOCK_CANDIDATES.filter((c) => c.recruiter_signal_score >= 80).length,
              color: 'text-emerald-400',
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
              className="glass-effect rounded-lg p-6 text-center"
            >
              <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
              <p className={`text-3xl font-bold ${stat.color}`}>
                {stat.value}
                {stat.suffix}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Layout>
  );
};
