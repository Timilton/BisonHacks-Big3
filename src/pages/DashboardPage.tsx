import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Layout } from '../components/Layout';
import { SummaryCards } from '../components/StatCard';
import { SALARY_PROGRESSION, RECRUITER_DEMAND } from '../data';

export const DashboardPage: React.FC = () => {
  return (
    <Layout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-4xl font-bold text-gradient">AWS Certification ROI Dashboard</h1>
          <p className="text-gray-400 mt-2">Real-time insights into certification pathways, learner progression, and economic outcomes</p>
        </motion.div>

        {/* Summary Cards */}
        <SummaryCards />

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Salary Progression */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="glass-effect rounded-lg p-6"
          >
            <h2 className="text-xl font-bold mb-6">Salary Progression by Stage</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={SALARY_PROGRESSION}>
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
                <Bar
                  dataKey="salary"
                  fill="url(#colorSalary)"
                  radius={[8, 8, 0, 0]}
                  name="Average Salary ($K)"
                />
                <defs>
                  <linearGradient id="colorSalary" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" />
                    <stop offset="95%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Recruiter Demand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="glass-effect rounded-lg p-6"
          >
            <h2 className="text-xl font-bold mb-6">Recruiter Demand & Job Openings</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={RECRUITER_DEMAND}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="stage" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a2133',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="demand"
                  stroke="#22d3ee"
                  strokeWidth={3}
                  dot={{ fill: '#22d3ee', r: 6 }}
                  activeDot={{ r: 8 }}
                  name="Demand Score (0-100)"
                />
                <Line
                  type="monotone"
                  dataKey="hiring"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: '#10b981', r: 6 }}
                  activeDot={{ r: 8 }}
                  name="Open Positions"
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Pipeline Funnel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="glass-effect rounded-lg p-6"
        >
          <h2 className="text-xl font-bold mb-6">Certification Pipeline Funnel</h2>
          <div className="space-y-4">
            {[
              { stage: 'Cloud Practitioner', enrolled: 4500, completed: 3200, rate: 71 },
              { stage: 'Associate Level', enrolled: 3200, completed: 2100, rate: 66 },
              { stage: 'Professional Level', enrolled: 2100, completed: 1245, rate: 59 },
              { stage: 'Specialty Certs', enrolled: 1245, completed: 450, rate: 36 },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-sm font-medium w-32">{item.stage}</span>
                  <div className="flex-1">
                    <div className="bg-white/5 rounded-full h-8 overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.rate}%` }}
                        transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                        className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full"
                      />
                    </div>
                  </div>
                  <div className="text-right w-24">
                    <p className="text-sm font-bold">{item.rate}%</p>
                    <p className="text-xs text-gray-400">
                      {item.completed}/{item.enrolled}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};
