import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Lock } from 'lucide-react';
import { useAppContext } from '../store/AppContext';
import { useDemoStore } from '../store/DemoStore';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setRole, setSelectedLearnerId, setSelectedCompanyId } = useAppContext();
  const { companies } = useDemoStore();

  const [loginMode, setLoginMode] = useState<'user' | 'company' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(companies[0]?.id || '');

  const handleUserLogin = () => {
    // Demo: Any email/password logs in as Maya Rodriguez
    setRole('learner');
    setSelectedLearnerId('learner-2');
    navigate('/learner/tracks');
  };

  const handleCompanyLogin = () => {
    // Demo: Any email/password logs in to selected company
    setRole('company');
    setSelectedCompanyId(selectedCompany);
    navigate('/company/learner-database');
  };

  const handleBack = () => {
    setLoginMode(null);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-[#0B1E3B] flex flex-col">
      {/* Header */}
      <div className="border-b border-[rgba(255,255,255,0.08)] py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-[#0F274A] rounded-lg transition"
          >
            <ArrowLeft className="w-5 h-5 text-[#4DA3FF]" />
          </button>
          <img src="/logo_skill_sprint.png" alt="SkillSprint Logo" className="w-6 h-6" />
          <h1 className="text-xl font-bold text-[#F8FAFC]">SkillSprint</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {loginMode === null ? (
            // Role Selection
            <div>
              <h2 className="text-3xl font-bold text-[#F8FAFC] mb-2 text-center">Choose Your Role</h2>
              <p className="text-[#B6C2D6] text-center mb-8">
                Select how you'd like to experience SkillSprint
              </p>

              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setLoginMode('user')}
                  className="w-full p-6 bg-[#0F274A] border border-[#4DA3FF] rounded-lg text-left hover:bg-[#4DA3FF]/10 transition"
                >
                  <h3 className="text-lg font-semibold text-[#F8FAFC] mb-2">👩‍💻 Learner</h3>
                  <p className="text-sm text-[#B6C2D6]">
                    Browse courses, track progress, get matched with jobs, and receive AI mentoring
                  </p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setLoginMode('company')}
                  className="w-full p-6 bg-[#0F274A] border border-[#22C55E] rounded-lg text-left hover:bg-[#22C55E]/10 transition"
                >
                  <h3 className="text-lg font-semibold text-[#F8FAFC] mb-2">🏢 Recruiter</h3>
                  <p className="text-sm text-[#B6C2D6]">
                    View talent pool, monitor progress, post jobs, recommend candidates
                  </p>
                </motion.button>
              </div>
            </div>
          ) : loginMode === 'user' ? (
            // User Login with Email & Password
            <div>
              <h2 className="text-2xl font-bold text-[#F8FAFC] mb-2">Sign In as Learner</h2>
              <p className="text-[#B6C2D6] text-sm mb-6">Demo: Any email/password works, logs in as Maya Rodriguez</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#F8FAFC] mb-2">
                    <Mail className="inline w-4 h-4 mr-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="maya@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0F274A] border border-[rgba(255,255,255,0.1)] rounded-lg text-[#F8FAFC] placeholder-[#B6C2D6] focus:outline-none focus:border-[#4DA3FF]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#F8FAFC] mb-2">
                    <Lock className="inline w-4 h-4 mr-2" />
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0F274A] border border-[rgba(255,255,255,0.1)] rounded-lg text-[#F8FAFC] placeholder-[#B6C2D6] focus:outline-none focus:border-[#4DA3FF]"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleUserLogin}
                  disabled={!email || !password}
                  className="w-full px-4 py-3 bg-[#4DA3FF] text-[#0B1E3B] rounded-lg font-semibold hover:bg-[#3d8ae6] disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Sign In
                </motion.button>

                <button
                  onClick={handleBack}
                  className="w-full px-4 py-3 border border-[rgba(255,255,255,0.1)] text-[#F8FAFC] rounded-lg font-semibold hover:bg-[#0F274A] transition"
                >
                  Back
                </button>
              </div>
            </div>
          ) : (
            // Company Login with Email & Password
            <div>
              <h2 className="text-2xl font-bold text-[#F8FAFC] mb-2">Sign In as Recruiter</h2>
              <p className="text-[#B6C2D6] text-sm mb-6">Demo: Any email/password works</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#F8FAFC] mb-2">
                    <Mail className="inline w-4 h-4 mr-2" />
                    Work Email
                  </label>
                  <input
                    type="email"
                    placeholder="recruiter@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0F274A] border border-[rgba(255,255,255,0.1)] rounded-lg text-[#F8FAFC] placeholder-[#B6C2D6] focus:outline-none focus:border-[#22C55E]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#F8FAFC] mb-2">
                    <Lock className="inline w-4 h-4 mr-2" />
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0F274A] border border-[rgba(255,255,255,0.1)] rounded-lg text-[#F8FAFC] placeholder-[#B6C2D6] focus:outline-none focus:border-[#22C55E]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#F8FAFC] mb-2">
                    Select Company
                  </label>
                  <select
                    value={selectedCompany}
                    onChange={(e) => setSelectedCompany(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0F274A] border border-[rgba(255,255,255,0.1)] rounded-lg text-[#F8FAFC] focus:outline-none focus:border-[#22C55E]"
                  >
                    {companies.map((company) => (
                      <option key={company.id} value={company.id}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-[#B6C2D6] mt-2">
                    Switch between companies to see different talent pools
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCompanyLogin}
                  disabled={!email || !password}
                  className="w-full px-4 py-3 bg-[#22C55E] text-[#0B1E3B] rounded-lg font-semibold hover:bg-[#16A34A] disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Sign In
                </motion.button>

                <button
                  onClick={handleBack}
                  className="w-full px-4 py-3 border border-[rgba(255,255,255,0.1)] text-[#F8FAFC] rounded-lg font-semibold hover:bg-[#0F274A] transition"
                >
                  Back
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
