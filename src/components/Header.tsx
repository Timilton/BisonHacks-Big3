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
            <span className="text-xs text-[#B6C2D6] uppercase tracking-widest">Role:</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as 'learner' | 'company')}
              className="appearance-none bg-[#0F274A] border border-[rgba(255,255,255,0.08)] rounded px-3 py-2 text-sm text-[#F8FAFC] hover:border-[#4DA3FF] cursor-pointer focus:outline-none focus:border-[#4DA3FF]"
            >
              <option value="learner">Learner</option>
              <option value="company">Company</option>
            </select>
          </div>

          {/* Learner/Company Selector */}
          {role === 'learner' ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#B6C2D6] uppercase tracking-widest">Learner:</span>
              <select
                value={selectedLearnerId}
                onChange={(e) => setSelectedLearnerId(e.target.value)}
                className="appearance-none bg-[#0F274A] border border-[rgba(255,255,255,0.08)] rounded px-3 py-2 text-sm text-[#F8FAFC] hover:border-[#4DA3FF] cursor-pointer focus:outline-none focus:border-[#4DA3FF]"
              >
                {learnersOptions.map((learner) => (
                  <option key={learner.id} value={learner.id}>
                    {learner.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#B6C2D6] uppercase tracking-widest">Company:</span>
              <select
                value={selectedCompanyId}
                onChange={(e) => setSelectedCompanyId(e.target.value)}
                className="appearance-none bg-[#0F274A] border border-[rgba(255,255,255,0.08)] rounded px-3 py-2 text-sm text-[#F8FAFC] hover:border-[#4DA3FF] cursor-pointer focus:outline-none focus:border-[#4DA3FF]"
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
