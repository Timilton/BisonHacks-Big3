import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, BookOpen, User, Inbox, Briefcase, Zap, Users, GraduationCap } from 'lucide-react';
import { useAppContext } from '../store/AppContext';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { role } = useAppContext();

  const learnerNavItems = [
    { path: '/learner/tracks', icon: GraduationCap, label: 'Tracks' },
    { path: '/learner/courses', icon: BookOpen, label: 'Courses' },
    { path: '/learner/job-center', icon: Briefcase, label: 'Job Center' },
    { path: '/learner/skills-profile', icon: User, label: 'Skills Profile' },
    { path: '/learner/mentor', icon: Zap, label: 'MentorMe' },
    { path: '/learner/inbox', icon: Inbox, label: 'Inbox' },
  ];

  const companyNavItems = [
    { path: '/company/learner-database', icon: Users, label: 'Learner Database' },
    { path: '/company/job-center', icon: Briefcase, label: 'Job Center' },
  ];

  const navItems = role === 'learner' ? learnerNavItems : companyNavItems;

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-16 h-screen w-64 bg-[#0F274A] border-r border-[rgba(255,255,255,0.08)] p-6 overflow-y-auto hidden lg:flex flex-col"
    >
      {/* Section Title */}
      <p className="text-xs text-[#B6C2D6] uppercase tracking-widest mb-4 px-2 font-semibold">
        {role === 'learner' ? 'Learning' : 'Recruiting'}
      </p>

      {/* Navigation */}
      <nav className="space-y-2 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link key={item.path} to={item.path}>
              <motion.div
                whileHover={{ x: 4 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  active
                    ? 'bg-[#4DA3FF] text-[#0B1E3B] font-medium'
                    : 'text-[#B6C2D6] hover:bg-[#0B1E3B]'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-[#0B1E3B]' : 'text-[#4DA3FF]'}`} />
                <span>{item.label}</span>
                {active && <ChevronRight className="w-4 h-4 ml-auto" />}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-[rgba(255,255,255,0.08)] pt-4">
        <div className="text-xs text-[#B6C2D6] p-2">
          <p className="font-medium text-[#F8FAFC] mb-1">SkillSprint Demo</p>
          <p>No Real Data</p>
        </div>
      </div>
    </motion.div>
  );
};
