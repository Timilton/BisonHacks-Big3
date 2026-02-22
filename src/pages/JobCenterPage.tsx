import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, CheckCircle, AlertCircle, DollarSign } from 'lucide-react';
import { useDemoStore } from '../store/DemoStore';
import { useAppContext } from '../store/AppContext';

export const JobCenterPage: React.FC = () => {
  const { jobs, getLearnerById, getLearnerAvgScore, getLearnerAllSkills } = useDemoStore();
  const { selectedLearnerId } = useAppContext();

  const learner = useMemo(
    () => (selectedLearnerId ? getLearnerById(selectedLearnerId) : null),
    [selectedLearnerId, getLearnerById]
  );

  const avgScore = useMemo(
    () => (selectedLearnerId ? getLearnerAvgScore(selectedLearnerId) : 0),
    [selectedLearnerId, getLearnerAvgScore]
  );

  const allSkills = useMemo(
    () => (selectedLearnerId ? getLearnerAllSkills(selectedLearnerId) : []),
    [selectedLearnerId, getLearnerAllSkills]
  );

  const jobMatches = useMemo(() => {
    return jobs.map((job) => {
      const matchedSkills = job.requiredSkills.filter((skill) => allSkills.includes(skill));
      const matchPercentage = (matchedSkills.length / job.requiredSkills.length) * 100;
      const meetsMinScore = avgScore >= job.minAvgScore;
      const isEligible = meetsMinScore && matchPercentage >= 75;

      return {
        ...job,
        matchedSkills,
        matchPercentage,
        meetsMinScore,
        isEligible,
      };
    });
  }, [jobs, allSkills, avgScore]);

  const eligibleJobs = jobMatches.filter((j) => j.isEligible);
  const closeMatches = jobMatches.filter((j) => !j.isEligible && j.matchPercentage >= 50);
  const otherJobs = jobMatches.filter((j) => j.matchPercentage < 50);

  return (
    <div className="min-h-screen bg-[#0B1E3B] p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-[#F8FAFC] mb-2">Job Center</h1>
          <p className="text-[#B6C2D6]">Discover job opportunities matched to your skills and experience</p>
        </motion.div>

        {/* Profile Summary */}
        {learner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-[#0F274A] rounded-lg p-6 border border-[rgba(255,255,255,0.08)] mb-8"
          >
            <h2 className="text-xl font-semibold text-[#F8FAFC] mb-4">{learner.name}'s Profile</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <p className="text-[#B6C2D6] text-sm mb-1">Average Score</p>
                <p className="text-3xl font-bold text-[#4DA3FF]">{avgScore}/100</p>
              </div>
              <div>
                <p className="text-[#B6C2D6] text-sm mb-1">Total Skills</p>
                <p className="text-3xl font-bold text-[#22C55E]">{allSkills.length}</p>
              </div>
              <div>
                <p className="text-[#B6C2D6] text-sm mb-1">Eligible Jobs</p>
                <p className="text-3xl font-bold text-[#FFB800]">{eligibleJobs.length}</p>
              </div>
              <div>
                <p className="text-[#B6C2D6] text-sm mb-1">Close Matches</p>
                <p className="text-3xl font-bold text-[#4DA3FF]">{closeMatches.length}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Eligible Jobs */}
        {eligibleJobs.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-10"
          >
            <h2 className="text-2xl font-bold text-[#F8FAFC] mb-4 flex items-center gap-2">
              <CheckCircle className="text-[#22C55E]" size={28} />
              Perfectly Matched Jobs
            </h2>
            <div className="space-y-4">
              {eligibleJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-[#0F274A] rounded-lg p-6 border border-[#22C55E]/50"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#F8FAFC]">{job.title}</h3>
                      <p className="text-[#B6C2D6] flex items-center gap-1 mt-1">
                        <Briefcase size={16} /> {job.company}
                      </p>
                    </div>
                    <div className="bg-[#22C55E]/20 rounded-lg px-4 py-2">
                      <p className="text-2xl font-bold text-[#22C55E]">{Math.round(job.matchPercentage)}%</p>
                      <p className="text-xs text-[#22C55E] font-semibold">Match</p>
                    </div>
                  </div>

                  <p className="text-[#B6C2D6] mb-4">{job.description}</p>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-[#B6C2D6] font-semibold mb-2">Salary Range</p>
                      <p className="text-[#4DA3FF] font-semibold flex items-center gap-1">
                        <DollarSign size={16} /> {job.estimatedSalary}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#B6C2D6] font-semibold mb-2">Your Score vs Requirement</p>
                      <p className="text-[#22C55E] font-semibold">{avgScore} / {job.minAvgScore} ✓</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-[#B6C2D6] font-semibold mb-2">Skills Match</p>
                    <div className="flex flex-wrap gap-2">
                      {job.requiredSkills.map((skill) => {
                        const isMatched = job.matchedSkills.includes(skill);
                        return (
                          <span
                            key={skill}
                            className={`px-3 py-1 rounded-lg text-xs font-medium ${
                              isMatched
                                ? 'bg-[#22C55E]/20 text-[#22C55E]'
                                : 'bg-[#0B1E3B] text-[#B6C2D6] border border-[rgba(255,255,255,0.08)]'
                            }`}
                          >
                            {skill} {isMatched && '✓'}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <button className="w-full px-4 py-3 bg-[#22C55E] text-[#0B1E3B] rounded-lg font-semibold hover:bg-[#16a34a] transition">
                    Apply Now
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Close Matches */}
        {closeMatches.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-10"
          >
            <h2 className="text-2xl font-bold text-[#F8FAFC] mb-4 flex items-center gap-2">
              <AlertCircle className="text-[#FFB800]" size={28} />
              Close Matches
            </h2>
            <div className="space-y-4">
              {closeMatches.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-[#0F274A] rounded-lg p-6 border border-[#FFB800]/50"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#F8FAFC]">{job.title}</h3>
                      <p className="text-[#B6C2D6] flex items-center gap-1 mt-1">
                        <Briefcase size={16} /> {job.company}
                      </p>
                    </div>
                    <div className="bg-[#FFB800]/20 rounded-lg px-4 py-2">
                      <p className="text-2xl font-bold text-[#FFB800]">{Math.round(job.matchPercentage)}%</p>
                      <p className="text-xs text-[#FFB800] font-semibold">Match</p>
                    </div>
                  </div>

                  <p className="text-[#B6C2D6] mb-4">{job.description}</p>

                  <div className="bg-[#0B1E3B] rounded-lg p-3 mb-4 border border-[#FFB800]/20">
                    <p className="text-xs text-[#B6C2D6] font-semibold mb-2">To Be Eligible:</p>
                    <ul className="text-xs text-[#FFB800] space-y-1">
                      {!job.meetsMinScore && <li>• Improve average score to {job.minAvgScore}/100 (currently {avgScore}/100)</li>}
                      {job.matchPercentage < 75 && (
                        <li>• Gain {job.requiredSkills.length - job.matchedSkills.length} more required skill(s)</li>
                      )}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-[#B6C2D6] font-semibold mb-2">Skills Gap</p>
                    <div className="flex flex-wrap gap-2">
                      {job.requiredSkills.map((skill) => {
                        const isMatched = job.matchedSkills.includes(skill);
                        return (
                          <span
                            key={skill}
                            className={`px-3 py-1 rounded-lg text-xs font-medium ${
                              isMatched
                                ? 'bg-[#22C55E]/20 text-[#22C55E]'
                                : 'bg-[#FF6B6B]/20 text-[#FF6B6B]'
                            }`}
                          >
                            {skill}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <button className="w-full px-4 py-3 border border-[#FFB800] text-[#FFB800] rounded-lg font-semibold hover:bg-[#FFB800]/10 transition">
                    View Details
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Other Jobs */}
        {otherJobs.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-[#F8FAFC] mb-4">Other Opportunities</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {otherJobs.map((job) => (
                <motion.div
                  key={job.id}
                  className="bg-[#0F274A] rounded-lg p-4 border border-[rgba(255,255,255,0.08)]"
                >
                  <h3 className="text-lg font-bold text-[#F8FAFC] mb-2">{job.title}</h3>
                  <p className="text-sm text-[#B6C2D6] mb-3">{job.company}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#B6C2D6]">{Math.round(job.matchPercentage)}% Match</span>
                    <button className="px-3 py-1 text-xs border border-[#4DA3FF] text-[#4DA3FF] rounded hover:bg-[#4DA3FF]/10 transition">
                      Learn More
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* No Jobs */}
        {jobMatches.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Briefcase size={48} className="text-[#B6C2D6] mx-auto mb-4 opacity-50" />
            <p className="text-[#B6C2D6] text-lg">No jobs available at this time.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
