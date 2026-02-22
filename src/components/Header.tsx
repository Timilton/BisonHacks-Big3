import React from 'react';
import { useAppContext } from '../store/AppContext';
import { useDemoStore } from '../store/DemoStore';

export const Header: React.FC = () => {
  const { role, setRole, selectedLearnerId, setSelectedLearnerId, selectedCompanyId, setSelectedCompanyId } =
    useAppContext();
  const { learners, companies } = useDemoStore();

  const learnersOptions = learners.filter((l) => l.id === 'learner-1' || l.id === 'learner-2');

  return (
    <header className="bg-[#0B1E3B] border-b border-[rgba(255,255,255,0.08)] sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/logo_skill_sprint.png" alt="SkillSprint Logo" className="w-8 h-8" />
          <h1 className="text-2xl font-bold text-[#F8FAFC]">SkillSprint</h1>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-6">
          {/* Role Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 uppercase tracking-widest">Role:</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as 'learner' | 'company')}
              className="appearance-none bg-white border border-[#EDEDED] rounded px-3 py-2 text-sm text-[#0A0A0A] hover:border-[#FF1A1A] cursor-pointer focus:outline-none focus:border-[#FF1A1A]"
            >
              <option value="learner">Learner</option>
              <option value="company">Company</option>
            </select>
          </div>

          {/* Learner/Company Selector */}
          {role === 'learner' ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 uppercase tracking-widest">Learner:</span>
              <select
                value={selectedLearnerId}
                onChange={(e) => setSelectedLearnerId(e.target.value)}
                className="appearance-none bg-white border border-[#EDEDED] rounded px-3 py-2 text-sm text-[#0A0A0A] hover:border-[#FF1A1A] cursor-pointer focus:outline-none focus:border-[#FF1A1A]"
              >
                {learnersOptions.map((learner) => (
                  <option key={learner.id} value={learner.id}>
                    {learner.name} {learner.isPremium ? '(Premium)' : '(Free)'}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 uppercase tracking-widest">Company:</span>
              <select
                value={selectedCompanyId}
                onChange={(e) => setSelectedCompanyId(e.target.value)}
                className="appearance-none bg-white border border-[#EDEDED] rounded px-3 py-2 text-sm text-[#0A0A0A] hover:border-[#FF1A1A] cursor-pointer focus:outline-none focus:border-[#FF1A1A]"
              >
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
