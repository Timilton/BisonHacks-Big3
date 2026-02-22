import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Eye, Search, CheckCircle, Users, Briefcase } from 'lucide-react';
import { useDemoStore } from '../store/DemoStore';

export const LearnerDatabasePage: React.FC = () => {
  const { learners, getLearnerAvgScore, getLearnerAllSkills } = useDemoStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLearnerId, setSelectedLearnerId] = useState<string | null>(null);
  const [filterSkill, setFilterSkill] = useState('');

  const selectedLearner = selectedLearnerId ? learners.find((l) => l.id === selectedLearnerId) : null;

  // Get all unique skills from all learners
  const allSkills = useMemo(
    () => Array.from(new Set(learners.flatMap((learner) => getLearnerAllSkills(learner.id)))).sort(),
    [learners, getLearnerAllSkills]
  );

  // Filter learners based on search and skill
  const filteredLearners = useMemo(() => {
    return learners.filter((learner) => {
      const matchesSearch =
        learner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        learner.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSkill = !filterSkill || getLearnerAllSkills(learner.id).includes(filterSkill);

      return matchesSearch && matchesSkill;
    });
  }, [learners, searchQuery, filterSkill, getLearnerAllSkills]);

  return (
    <div className="p-6 md:p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 5, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-3xl font-bold text-[#0B1E3B] mb-2">Learner Database</h1>
        <p className="text-[#334155] mb-8">Browse and evaluate {learners.length} skilled learners in our talent pool</p>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Learners List */}
          <div className="lg:col-span-2 space-y-4">
            {/* Search & Filters */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-[#B6C2D6]" />
                <input
                  type="text"
                  placeholder="Search name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#0F274A] border border-[rgba(255,255,255,0.1)] rounded-lg text-[#F8FAFC] placeholder-[#B6C2D6] focus:outline-none focus:border-[#4DA3FF]"
                />
              </div>

              <select
                value={filterSkill}
                onChange={(e) => setFilterSkill(e.target.value)}
                className="w-full px-4 py-3 bg-[#0F274A] border border-[rgba(255,255,255,0.1)] rounded-lg text-[#F8FAFC] focus:outline-none focus:border-[#4DA3FF]"
              >
                <option value="">All Skills</option>
                {allSkills.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </div>

            {/* Learners Grid */}
            <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
              {filteredLearners.length > 0 ? (
                filteredLearners.map((learner, idx) => {
                  const avgScore = getLearnerAvgScore(learner.id);
                  const skillCount = getLearnerAllSkills(learner.id).length;
                  return (
                    <motion.button
                      key={learner.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      onClick={() => setSelectedLearnerId(learner.id)}
                      className={`w-full p-4 rounded-lg border text-left transition ${
                        selectedLearnerId === learner.id
                          ? 'bg-[#4DA3FF]/20 border-[#4DA3FF]'
                          : 'bg-[#0F274A] border-[rgba(255,255,255,0.08)] hover:border-[#4DA3FF]/50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-[#F8FAFC]">{learner.name}</h3>
                          <p className="text-xs text-[#B6C2D6] mt-1">{learner.email}</p>
                          <div className="flex gap-3 mt-2 text-xs">
                            <span className="text-[#4DA3FF]">⭐ {avgScore.toFixed(1)}</span>
                            <span className="text-[#22C55E]">{skillCount} skills</span>
                          </div>
                        </div>
                        <Eye className="w-5 h-5 text-[#4DA3FF] flex-shrink-0" />
                      </div>
                    </motion.button>
                  );
                })
              ) : (
                <div className="text-center py-8 text-[#B6C2D6]">
                  <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No learners found</p>
                </div>
              )}
            </div>
          </div>

          {/* Learner Details Panel */}
          <div className="lg:col-span-2">
            {selectedLearner ? (
              <motion.div
                key={selectedLearner.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {/* Header */}
                <div className="bg-[#0F274A] border border-[#4DA3FF] rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-[#F8FAFC] mb-2">{selectedLearner.name}</h2>
                  <p className="text-[#B6C2D6] mb-4">{selectedLearner.email}</p>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-[#0B1E3B] rounded p-3 text-center">
                      <div className="text-2xl font-bold text-[#4DA3FF]">{getLearnerAvgScore(selectedLearner.id).toFixed(1)}</div>
                      <div className="text-xs text-[#B6C2D6]">Avg Score</div>
                    </div>
                    <div className="bg-[#0B1E3B] rounded p-3 text-center">
                      <div className="text-2xl font-bold text-[#22C55E]">{getLearnerAllSkills(selectedLearner.id).length}</div>
                      <div className="text-xs text-[#B6C2D6]">Skills</div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-4 py-2 bg-[#4DA3FF] text-[#0B1E3B] rounded-lg font-semibold hover:bg-[#3d8ae6] transition"
                  >
                    Send Outreach
                  </motion.button>
                </div>

                {/* Summary */}
                <div className="bg-[#0F274A] border border-[rgba(255,255,255,0.08)] rounded-lg p-4">
                  <h3 className="font-semibold text-[#F8FAFC] mb-3">Professional Summary</h3>
                  <p className="text-sm text-[#B6C2D6]">{selectedLearner.resume.summary || 'No summary provided'}</p>
                </div>

                {/* Skills */}
                <div className="bg-[#0F274A] border border-[rgba(255,255,255,0.08)] rounded-lg p-4">
                  <h3 className="font-semibold text-[#F8FAFC] mb-3">Skills ({getLearnerAllSkills(selectedLearner.id).length})</h3>
                  <div className="flex flex-wrap gap-2">
                    {getLearnerAllSkills(selectedLearner.id).map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-[#4DA3FF]/20 text-[#4DA3FF] rounded-full text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Education */}
                {selectedLearner.resume.education && selectedLearner.resume.education.length > 0 && (
                  <div className="bg-[#0F274A] border border-[rgba(255,255,255,0.08)] rounded-lg p-4">
                    <h3 className="font-semibold text-[#F8FAFC] mb-3">Education</h3>
                    <ul className="space-y-2">
                      {selectedLearner.resume.education.map((edu, idx) => (
                        <li key={idx} className="text-sm text-[#B6C2D6] flex gap-2">
                          <CheckCircle className="w-4 h-4 text-[#22C55E] flex-shrink-0 mt-0.5" />
                          {edu}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Experience */}
                {selectedLearner.resume.experience && selectedLearner.resume.experience.length > 0 && (
                  <div className="bg-[#0F274A] border border-[rgba(255,255,255,0.08)] rounded-lg p-4">
                    <h3 className="font-semibold text-[#F8FAFC] mb-3 flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      Experience
                    </h3>
                    <ul className="space-y-2">
                      {selectedLearner.resume.experience.map((exp, idx) => (
                        <li key={idx} className="text-sm text-[#B6C2D6] flex gap-2">
                          <CheckCircle className="w-4 h-4 text-[#22C55E] flex-shrink-0 mt-0.5" />
                          {exp}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="h-full flex items-center justify-center bg-[#0F274A] border border-[rgba(255,255,255,0.08)] rounded-lg">
                <div className="text-center">
                  <Users className="w-16 h-16 text-[#4DA3FF] mx-auto mb-4 opacity-50" />
                  <p className="text-[#B6C2D6]">Select a learner to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
