import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Users, CheckCircle, AlertCircle } from 'lucide-react';
import { useDemoStore } from '../store/DemoStore';
import { useAppContext } from '../store/AppContext';

export const RecruiterJobCenterPage: React.FC = () => {
  const { jobs, learners, getLearnerAllSkills, getLearnerAvgScore } = useDemoStore();
  const { selectedCompanyId } = useAppContext();
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  // Get jobs for this company
  const companyJobs = useMemo(
    () => jobs.filter((job) => job.company === learners.find((l) => l.id === selectedCompanyId)?.name || job.company),
    [jobs, selectedCompanyId, learners]
  );

  // Find eligible candidates for a job
  const getEligibleCandidates = (jobId: string) => {
    const job = jobs.find((j) => j.id === jobId);
    if (!job) return [];

    return learners
      .filter((learner) => {
        const avgScore = getLearnerAvgScore(learner.id);
        const allSkills = getLearnerAllSkills(learner.id);
        const skillMatch = job.requiredSkills.filter((skill) => allSkills.includes(skill)).length;
        const matchPercentage = (skillMatch / job.requiredSkills.length) * 100;
        
        return avgScore >= job.minAvgScore && matchPercentage >= 75;
      })
      .map((learner) => {
        const allSkills = getLearnerAllSkills(learner.id);
        const skillMatch = job.requiredSkills.filter((skill) => allSkills.includes(skill)).length;
        const matchPercentage = (skillMatch / job.requiredSkills.length) * 100;
        
        return {
          learner,
          avgScore: getLearnerAvgScore(learner.id),
          matchPercentage,
          matchedSkills: job.requiredSkills.filter((skill) => allSkills.includes(skill)),
        };
      })
      .sort((a, b) => b.avgScore - a.avgScore);
  };

  const selectedJob = jobs.find((j) => j.id === selectedJobId);
  const eligibleCandidates = selectedJobId ? getEligibleCandidates(selectedJobId) : [];

  return (
    <div className="p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold text-[#0B1E3B] mb-2">Job Center</h1>
        <p className="text-[#334155] mb-8">Post jobs and find excellent candidates from SkillSprint</p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Jobs List */}
          <div>
            <h2 className="text-xl font-semibold text-[#0B1E3B] mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#4DA3FF]" />
              Open Positions
            </h2>

            <div className="space-y-3">
              {companyJobs.length > 0 ? (
                companyJobs.map((job) => {
                  const candidates = getEligibleCandidates(job.id);
                  return (
                    <motion.button
                      key={job.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedJobId(job.id)}
                      className={`w-full p-4 rounded-lg border text-left transition ${
                        selectedJobId === job.id
                          ? 'bg-[#4DA3FF]/20 border-[#4DA3FF]'
                          : 'bg-[#0F274A] border-[rgba(255,255,255,0.08)] hover:border-[#4DA3FF]/50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-[#F8FAFC]">{job.title}</h3>
                          <p className="text-sm text-[#B6C2D6] mt-1">{job.company}</p>
                        </div>
                        <span className="px-3 py-1 bg-[#4DA3FF] text-[#0B1E3B] rounded-full text-xs font-semibold">
                          {candidates.length} match{candidates.length !== 1 ? 'es' : ''}
                        </span>
                      </div>
                    </motion.button>
                  );
                })
              ) : (
                <div className="p-6 bg-[#0F274A] rounded-lg border border-[rgba(255,255,255,0.08)] text-center">
                  <p className="text-[#B6C2D6]">No open positions yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Job Details & Candidates */}
          <div>
            {selectedJob ? (
              <motion.div
                key={selectedJob.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold text-[#0B1E3B] mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#22C55E]" />
                  Eligible Candidates
                </h2>

                {/* Job Summary */}
                <div className="bg-[#0F274A] border border-[rgba(255,255,255,0.08)] rounded-lg p-4 mb-4">
                  <h3 className="font-semibold text-[#F8FAFC] mb-2">{selectedJob.title}</h3>
                  <p className="text-sm text-[#B6C2D6] mb-3">{selectedJob.description}</p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-[#B6C2D6]">Min Score Required</p>
                      <p className="text-[#4DA3FF] font-semibold">{selectedJob.minAvgScore}/100</p>
                    </div>
                    <div>
                      <p className="text-[#B6C2D6]">Salary Range</p>
                      <p className="text-[#22C55E] font-semibold">{selectedJob.estimatedSalary}</p>
                    </div>
                  </div>
                </div>

                {/* Skills Required */}
                <div className="bg-[#0F274A] border border-[rgba(255,255,255,0.08)] rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-[#F8FAFC] mb-3">Required Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.requiredSkills.map((skill) => (
                      <span key={skill} className="px-2 py-1 bg-[#4DA3FF]/20 text-[#4DA3FF] rounded-full text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Candidates */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-[#F8FAFC]">
                    {eligibleCandidates.length} Qualified Candidate{eligibleCandidates.length !== 1 ? 's' : ''}
                  </h4>

                  {eligibleCandidates.length > 0 ? (
                    eligibleCandidates.map((candidate, idx) => (
                      <motion.div
                        key={candidate.learner.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                        className="bg-[#0F274A] border border-[#22C55E] rounded-lg p-4"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-[#F8FAFC]">{candidate.learner.name}</h4>
                            <p className="text-sm text-[#B6C2D6]">{candidate.learner.email}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-[#4DA3FF]">
                              {candidate.matchPercentage.toFixed(0)}% Match
                            </div>
                            <div className="text-sm text-[#22C55E]">⭐ {candidate.avgScore.toFixed(1)}/100</div>
                          </div>
                        </div>

                        {/* Matched Skills */}
                        <div className="space-y-2">
                          <p className="text-xs text-[#B6C2D6]">Matched Skills ({candidate.matchedSkills.length}/{selectedJob.requiredSkills.length})</p>
                          <div className="flex flex-wrap gap-1">
                            {selectedJob.requiredSkills.map((skill) => {
                              const isMatched = candidate.matchedSkills.includes(skill);
                              return (
                                <span
                                  key={skill}
                                  className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                                    isMatched
                                      ? 'bg-[#22C55E]/20 text-[#22C55E]'
                                      : 'bg-[rgba(255,255,255,0.08)] text-[#B6C2D6]'
                                  }`}
                                >
                                  {isMatched ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                                  {skill}
                                </span>
                              );
                            })}
                          </div>
                        </div>

                        {/* Action Button */}
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full mt-3 px-3 py-2 bg-[#22C55E] text-[#0B1E3B] rounded-lg font-semibold hover:bg-[#16A34A] transition text-sm"
                        >
                          Send Outreach
                        </motion.button>
                      </motion.div>
                    ))
                  ) : (
                    <div className="bg-[#0F274A] border border-[rgba(255,255,255,0.08)] rounded-lg p-6 text-center">
                      <p className="text-[#B6C2D6] mb-2">No qualified candidates yet</p>
                      <p className="text-sm text-[#B6C2D6]">As learners complete courses and skills, they'll appear here</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="bg-[#0F274A] border border-[rgba(255,255,255,0.08)] rounded-lg p-12 text-center">
                <Users className="w-12 h-12 text-[#4DA3FF] mx-auto mb-4 opacity-50" />
                <p className="text-[#B6C2D6]">Select a job to view eligible candidates</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
