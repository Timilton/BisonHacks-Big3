import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Gauge, Briefcase, TrendingUp, Users } from 'lucide-react';
import { Layout } from '../components/Layout';
import { AWS_CERTIFICATIONS, PERFORMANCE_TIERS } from '../data';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const CertificationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const cert = AWS_CERTIFICATIONS.find((c) => c.id === id);

  if (!cert) {
    return (
      <Layout>
        <div className="p-8">
          <p className="text-gray-400">Certification not found</p>
          <Link to="/provider/pathways" className="text-cyan-400 hover:text-cyan-300">
            ← Back to Pathways
          </Link>
        </div>
      </Layout>
    );
  }

  // Salary projection data
  const salaryProjection: Array<{ month: string; salary: number }> = [
    { month: 'Month 0', salary: cert.avg_salary_low * 0.9 },
    { month: 'Month 3', salary: (cert.avg_salary_low + cert.avg_salary_high) * 0.4 },
    { month: 'Month 6', salary: (cert.avg_salary_low + cert.avg_salary_high) * 0.5 },
    { month: 'Month 12', salary: (cert.avg_salary_low + cert.avg_salary_high) * 0.6 },
    { month: 'Month 24', salary: cert.avg_salary_high },
  ];

  const recruiterVisibilityScore = cert.demand_score;
  const getRecruiterLevel = () => {
    if (recruiterVisibilityScore >= 85) return 'High';
    if (recruiterVisibilityScore >= 70) return 'Medium';
    return 'Low';
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
          <Link to="/provider/pathways" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-4">
            <ArrowLeft className="w-4 h-4" /> Back to Pathways
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">{cert.title}</h1>
              <p className="text-gray-400">{cert.description}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400 mb-1">Certification Stage</p>
              <p className="text-3xl font-bold text-gradient">{cert.stage}</p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Salary & Market */}
          <div className="lg:col-span-2 space-y-8">
            {/* Salary Projection Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="glass-effect rounded-lg p-6"
            >
              <h2 className="text-xl font-bold mb-6">Salary Projection & Growth</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-1">Entry Level</p>
                  <p className="text-2xl font-bold text-emerald-400">
                    ${(cert.avg_salary_low / 1000).toFixed(0)}K
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-1">Peak Compensation</p>
                  <p className="text-2xl font-bold text-emerald-400">
                    ${(cert.avg_salary_high / 1000).toFixed(0)}K
                  </p>
                </div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-400 mb-2">Growth from Previous Stage</p>
                <div className="flex items-center gap-2">
                  <p className="text-3xl font-bold text-emerald-400">18%</p>
                  <p className="text-gray-400">avg increase</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={salaryProjection}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a2133',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number | string) => {
                      const numValue = typeof value === 'number' ? value : parseFloat(value);
                      return `$${(numValue / 1000).toFixed(0)}K`;
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="salary"
                    stroke="#22d3ee"
                    strokeWidth={3}
                    dot={{ fill: '#22d3ee', r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Job Market Insights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="glass-effect rounded-lg p-6"
            >
              <h2 className="text-xl font-bold mb-6">Job Market Insights</h2>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                    <Briefcase className="w-4 h-4" /> Open Positions
                  </p>
                  <p className="text-2xl font-bold text-cyan-400">{cert.job_openings.toLocaleString()}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                    <Users className="w-4 h-4" /> Top Employers
                  </p>
                  <p className="text-sm text-white font-bold">AWS, Microsoft, Google, IBM</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" /> Growth Trend
                  </p>
                  <p className="text-sm text-white font-bold">+24% YoY</p>
                </div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-sm font-bold mb-3">Top Hiring Industries</p>
                <div className="flex flex-wrap gap-2">
                  {cert.industries.map((industry) => (
                    <span
                      key={industry}
                      className="px-3 py-1 rounded-full text-xs bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-400"
                    >
                      {industry}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Recruiter & Performance */}
          <div className="space-y-8">
            {/* Recruiter Visibility Meter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="glass-effect rounded-lg p-6"
            >
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Gauge className="w-5 h-5 text-cyan-400" /> Recruiter Visibility
              </h2>
              <div className="text-center mb-4">
                <p className="text-5xl font-bold text-gradient mb-2">{recruiterVisibilityScore}</p>
                <p className="text-sm text-gray-400">out of 100</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-cyan-400 mb-1">{getRecruiterLevel()}</p>
                <p className="text-xs text-gray-400">Recruiter Interest Level</p>
              </div>
              <div className="mt-4 space-y-2">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Demand Trend</p>
                  <p className="text-sm font-bold text-emerald-400">
                    {cert.demand_score >= 85 ? '↑ Strong Growth' : cert.demand_score >= 70 ? '→ Stable' : '↓ Declining'}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Performance Tier System */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="glass-effect rounded-lg p-6"
            >
              <h2 className="text-lg font-bold mb-6">Performance Tiers</h2>
              <div className="space-y-3">
                {PERFORMANCE_TIERS.map((tier) => (
                  <div
                    key={tier.tier}
                    className={`rounded-lg p-3 border ${
                      tier.tier === 'Gold'
                        ? 'border-violet-400/50 bg-violet-400/10'
                        : tier.tier === 'Silver'
                          ? 'border-cyan-400/50 bg-cyan-400/10'
                          : 'border-amber-400/50 bg-amber-400/10'
                    }`}
                  >
                    <p className="font-bold text-sm mb-1">{tier.tier}</p>
                    <p className="text-xs text-gray-400 mb-1">{tier.description}</p>
                    <div className="text-xs">
                      <span className="text-gray-400">Score: {tier.min_score}-{tier.max_score}% • </span>
                      <span className="font-bold">
                        {tier.tier === 'Gold' ? 'High Priority' : tier.tier === 'Silver' ? 'Above Average' : 'Standard'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Key Insights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="glass-effect rounded-lg p-6"
            >
              <h2 className="text-lg font-bold mb-4">Quick Facts</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-bold">High Market Demand</p>
                    <p className="text-xs text-gray-400">{cert.job_openings}+ roles</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-bold">Career Growth</p>
                    <p className="text-xs text-gray-400">18% avg salary increase</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-violet-400 mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-bold">Gold Tier Bonus</p>
                    <p className="text-xs text-gray-400">15% salary multiplier</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
