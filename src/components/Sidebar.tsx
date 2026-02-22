import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Layers,
  Users,
  BarChart3,
  ChevronRight,
  Trophy,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/provider/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/provider/pathways', icon: Layers, label: 'Pathways' },
    { path: '/provider/talent', icon: Users, label: 'Talent Pool' },
    { path: '/provider/analytics', icon: BarChart3, label: 'Analytics' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 h-screen w-64 glass-effect border-r border-white/10 p-6 overflow-y-auto hidden lg:flex flex-col bg-[#0a0e17]"
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3 mb-12">
        <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500">
          <Trophy className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-lg text-gradient">CertiROI</h1>
          <p className="text-xs text-gray-400">ROI Platform</p>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="space-y-2 flex-1">
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-4 px-2">
          Provider Dashboard
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link key={item.path} to={item.path}>
              <motion.div
                whileHover={{ x: 4 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  active
                    ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30'
                    : 'hover:bg-white/5'
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    active ? 'text-cyan-400' : 'text-gray-400'
                  }`}
                />
                <span className={active ? 'text-cyan-400 font-medium' : 'text-gray-300'}>
                  {item.label}
                </span>
                {active && <ChevronRight className="w-4 h-4 ml-auto text-cyan-400" />}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 pt-4">
        <div className="text-xs text-gray-500 p-2">
          <p className="font-medium text-gray-400 mb-1">AWS Certification</p>
          <p>Provider Edition</p>
          <p className="mt-2 text-gray-600">Demo • No Real Data</p>
        </div>
      </div>
    </motion.div>
  );
};
