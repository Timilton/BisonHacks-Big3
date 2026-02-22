import React from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Layout } from '../components/Layout';
import { STAGE_DROPOFF, SALARY_PROGRESSION, PERFORMANCE_DISTRIBUTION } from '../data';

export const AnalyticsPage: React.FC = () => {
  return (
    <Layout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-4xl font-bold text-gradient">Provider Analytics</h1>
          <p className="text-gray-400 mt-2">
            Deep insights into certification program performance, learner progression, and ROI metrics
          </p>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              label: 'Overall Completion Rate',
              value: '36%',
              subtitle: 'Cloud Practitioner → Specialty',
              color: 'from-cyan-500 to-indigo-500',
            },
            {
              label: 'Avg Time to Placement',
              value: '6.2 mo',
              subtitle: 'Post-certification',
              color: 'from-emerald-500 to-cyan-500',
            },
            {
              label: 'Gold Tier %',
              value: '12%',
              subtitle: 'High performers',
              color: 'from-violet-500 to-indigo-500',
            },
            {
              label: 'Market Growth Rate',
              value: '+24%',
              subtitle: 'Year-over-year',
              color: 'from-amber-500 to-red-500',
            },
          ].map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass-effect rounded-lg p-6"
            >
              <p className="text-gray-400 text-sm mb-2">{metric.label}</p>
              <p className={`text-3xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent mb-1`}>
                {metric.value}
              </p>
              <p className="text-xs text-gray-500">{metric.subtitle}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Stage Drop-Off Rates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="glass-effect rounded-lg p-6"
          >
            <h2 className="text-xl font-bold mb-6">Certification Stage Drop-Off Rates</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={STAGE_DROPOFF}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="stage" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a2133',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                  }}
                  formatter={(value) => `${value}%`}
                />
                <Legend />
                <Bar dataKey="dropout" fill="#ef4444" radius={[8, 8, 0, 0]} name="Drop-off %" />
                <Bar
                  dataKey="completed"
                  fill="url(#colorCompleted)"
                  radius={[8, 8, 0, 0]}
                  name="Completed"
                />
                <defs>
                  <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" />
                    <stop offset="95%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Salary Uplift by Stage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="glass-effect rounded-lg p-6"
          >
            <h2 className="text-xl font-bold mb-6">Salary Uplift by Certification Stage</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={SALARY_PROGRESSION}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="stage" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a2133',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                  }}
                  formatter={(value) => `$${value}K`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="salary"
                  stroke="#22d3ee"
                  strokeWidth={3}
                  dot={{ fill: '#22d3ee', r: 6 }}
                  activeDot={{ r: 8 }}
                  name="Average Salary ($K)"
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Performance Tier Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="glass-effect rounded-lg p-6"
        >
          <h2 className="text-xl font-bold mb-6">Performance Tier Distribution</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="flex justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={PERFORMANCE_DISTRIBUTION}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {PERFORMANCE_DISTRIBUTION.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a2133',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                    }}
                    formatter={(value) => `${value}%`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Details */}
            <div className="space-y-4">
              {PERFORMANCE_DISTRIBUTION.map((tier) => (
                <div key={tier.name} className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: tier.color }} />
                    <p className="font-bold">{tier.name} Tier</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-400">Distribution</p>
                      <p className="font-bold text-2xl">{tier.value}%</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Estimated Count</p>
                      <p className="font-bold text-2xl">
                        {Math.round((1245 * tier.value) / 100)}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    {tier.name === 'Gold'
                      ? 'High performance, priority for placement'
                      : tier.name === 'Silver'
                        ? 'Above average, strong market fit'
                        : 'Passed certification, standard market value'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Conversion Funnel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="glass-effect rounded-lg p-6"
        >
          <h2 className="text-xl font-bold mb-6">Certification-to-Employment Conversion Funnel</h2>
          <div className="space-y-4">
            {[
              { stage: 'Started Learning', count: 8500, rate: 100, color: 'from-blue-500 to-blue-400' },
              {
                stage: 'Completed Certification',
                count: 4500,
                rate: 53,
                color: 'from-cyan-500 to-cyan-400',
              },
              { stage: 'Job Ready Profile', count: 3200, rate: 71, color: 'from-emerald-500 to-emerald-400' },
              {
                stage: 'Placed in Role',
                count: 2360,
                rate: 74,
                color: 'from-violet-500 to-violet-400',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.35 + i * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-sm font-medium w-36">{item.stage}</span>
                  <div className="flex-1">
                    <div className="bg-white/5 rounded-full h-10 overflow-hidden relative flex items-center">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.rate}%` }}
                        transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                        className={`h-full bg-gradient-to-r ${item.color} rounded-full flex items-center justify-end pr-3`}
                      >
                        <span className="text-xs font-bold text-white">{item.rate}%</span>
                      </motion.div>
                    </div>
                  </div>
                  <div className="text-right w-20">
                    <p className="text-sm font-bold">{item.count.toLocaleString()}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="grid md:grid-cols-2 gap-6"
        >
          <div className="glass-effect rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4 text-emerald-400">Key Opportunities</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3">
                <span className="text-emerald-400 font-bold">→</span>
                <span>
                  Improve Associate → Professional conversion (currently 59%) through better preparation resources
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-400 font-bold">→</span>
                <span>
                  Increase Gold tier percentage from 12% to 18% via gamification and rewards
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-400 font-bold">→</span>
                <span>
                  Expand recruiter partnerships to reduce job-ready-to-placed gap from 26% to 15%
                </span>
              </li>
            </ul>
          </div>

          <div className="glass-effect rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4 text-cyan-400">Provider ROI Metrics</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between">
                <span className="text-gray-400">Avg Revenue Per Learner</span>
                <span className="font-bold text-cyan-400">$487</span>
              </li>
              <li className="flex justify-between border-t border-white/10 pt-2">
                <span className="text-gray-400">Learner Lifetime Value</span>
                <span className="font-bold text-emerald-400">$3,200+</span>
              </li>
              <li className="flex justify-between border-t border-white/10 pt-2">
                <span className="text-gray-400">Certification Completion Rate</span>
                <span className="font-bold text-violet-400">64%</span>
              </li>
              <li className="flex justify-between border-t border-white/10 pt-2">
                <span className="text-gray-400">Employer Brand Lift</span>
                <span className="font-bold text-amber-400">+34%</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};
