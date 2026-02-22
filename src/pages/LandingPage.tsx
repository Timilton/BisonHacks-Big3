import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Users, TrendingUp, Trophy } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0b0f19]">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Trophy className="w-8 h-8 text-cyan-400" />
          <span className="font-bold text-xl text-gradient">CertiROI</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link to="#" className="text-gray-300 hover:text-cyan-400 transition">
            Product
          </Link>
          <Link to="#" className="text-gray-300 hover:text-cyan-400 transition">
            For Providers
          </Link>
          <Link to="#" className="text-gray-300 hover:text-cyan-400 transition">
            Pricing
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-8 py-20 md:py-32">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-gradient">Turn Certifications</span>
              <br />
              Into Clear Career ROI
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
              Show learners exactly what each certification stage unlocks in salary, demand, and recruiter visibility. The industry's first B2B platform for certification providers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to="/provider/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-bold flex items-center gap-2 hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                >
                  View Provider Demo <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/provider/pathways">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-lg glass-effect text-white font-bold flex items-center gap-2 hover:bg-white/20 transition-all"
                >
                  See AWS Example <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-16">
              <div className="glass-effect p-6 rounded-lg">
                <p className="text-3xl font-bold text-emerald-400 mb-2">1,245</p>
                <p className="text-sm text-gray-400">Certified Candidates</p>
              </div>
              <div className="glass-effect p-6 rounded-lg">
                <p className="text-3xl font-bold text-cyan-400 mb-2">38%</p>
                <p className="text-sm text-gray-400">Avg Salary Increase</p>
              </div>
              <div className="glass-effect p-6 rounded-lg">
                <p className="text-3xl font-bold text-violet-400 mb-2">74%</p>
                <p className="text-sm text-gray-400">Job Placement Rate</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="px-8 py-20 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-gradient">The Problem</span>
            </h2>
            <p className="text-gray-400 mb-12">
              Traditional certification platforms are opaque about ROI. Learners don't know what to expect.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: TrendingUp,
                  title: 'No Stage-Based Salary Visibility',
                  desc: 'Learners lack clarity on earning potential at each certification level',
                },
                {
                  icon: Users,
                  title: 'Hidden Recruiter Signals',
                  desc: 'No transparency on how recruiters actually value specific certifications',
                },
                {
                  icon: Zap,
                  title: 'Unclear Career Path Impact',
                  desc: 'Missing insights on job market demand and competitive advantages',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-effect p-8 rounded-lg"
                >
                  <item.icon className="w-10 h-10 text-red-400 mb-4" />
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="px-8 py-20 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-gradient">The Solution</span>
            </h2>
            <p className="text-gray-400 mb-12">
              CertiROI transforms certification providers' platforms into intelligence dashboards that drive engagement, completion, and career outcomes.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: TrendingUp,
                  title: 'Real Salary Progression Data',
                  desc: 'Display actual salary ranges and growth trajectories per certification stage',
                },
                {
                  icon: Users,
                  title: 'Recruiter Demand Signals',
                  desc: 'Show hiring trends, job openings, and recruiter interest by certification level',
                },
                {
                  icon: Trophy,
                  title: 'Performance Tier System',
                  desc: 'Bronze, Silver, Gold tiers drive completion and learner engagement',
                },
                {
                  icon: Zap,
                  title: 'Provider Analytics Dashboard',
                  desc: 'Track drop-off rates, ROI metrics, and talent pool insights in real-time',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-effect p-8 rounded-lg hover:bg-white/10 transition-all"
                >
                  <item.icon className="w-10 h-10 text-emerald-400 mb-4" />
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 py-20 border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Certification Pathway?</h2>
            <p className="text-gray-400 mb-12">
              See how AWS uses CertiROI to drive learner engagement and career outcomes.
            </p>

            <Link to="/provider/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-bold inline-flex items-center gap-2 hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
              >
                Launch Demo <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-12 border-t border-white/10 text-center text-gray-500">
        <p>CertiROI © 2026 • Demo Version • No Real Data</p>
      </footer>
    </div>
  );
};
