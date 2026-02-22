import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Award } from 'lucide-react';
import { useDemoStore } from '../store/DemoStore';
import { useAppContext } from '../store/AppContext';

export const SkillsProfilePage: React.FC = () => {
  const { getLearnerById, getLearnerAllSkills, getEnrollmentsByLearnerId } = useDemoStore();
  const { selectedLearnerId } = useAppContext();

  const learner = getLearnerById(selectedLearnerId);
  const allSkills = getLearnerAllSkills(selectedLearnerId);
  const enrollments = getEnrollmentsByLearnerId(selectedLearnerId);

  if (!learner) {
    return <div className="p-8 text-[#B6C2D6]">Learner not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#0B1E3B] p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-[#F8FAFC] mb-2">{learner.name}'s Skills Profile</h1>
          <p className="text-[#B6C2D6]">Email: {learner.email}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Resume Summary */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 bg-[#0F274A] rounded-lg p-8 border border-[rgba(255,255,255,0.08)]"
          >
            <h2 className="text-2xl font-bold text-[#F8FAFC] mb-4">Professional Summary</h2>
            <p className="text-[#B6C2D6] leading-relaxed mb-6">{learner.resume.summary || 'No summary added yet.'}</p>

            {/* Education */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#4DA3FF] mb-3 flex items-center gap-2">
                <BookOpen size={20} /> Education
              </h3>
              {learner.resume.education.length > 0 ? (
                <ul className="space-y-2">
                  {learner.resume.education.map((edu, i) => (
                    <li key={i} className="text-[#B6C2D6] flex items-start gap-2">
                      <span className="text-[#22C55E] mt-1">✓</span> {edu}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[#B6C2D6] text-sm italic">No education listed.</p>
              )}
            </div>

            {/* Experience */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#4DA3FF] mb-3 flex items-center gap-2">
                <Award size={20} /> Experience
              </h3>
              {learner.resume.experience.length > 0 ? (
                <ul className="space-y-2">
                  {learner.resume.experience.map((exp, i) => (
                    <li key={i} className="text-[#B6C2D6] flex items-start gap-2">
                      <span className="text-[#22C55E] mt-1">✓</span> {exp}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[#B6C2D6] text-sm italic">No experience listed.</p>
              )}
            </div>

            {/* Projects */}
            {learner.resume.projects.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#4DA3FF] mb-3">Projects</h3>
                <ul className="space-y-2">
                  {learner.resume.projects.map((proj, i) => (
                    <li key={i} className="text-[#B6C2D6] flex items-start gap-2">
                      <span className="text-[#22C55E] mt-1">✓</span> {proj}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>

          {/* Skills Sidebar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* All Skills */}
            <div className="bg-[#0F274A] rounded-lg p-6 border border-[rgba(255,255,255,0.08)]">
              <h3 className="text-lg font-bold text-[#F8FAFC] mb-4">Total Skills: {allSkills.length}</h3>
              <div className="flex flex-wrap gap-2">
                {allSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-[#4DA3FF]/20 text-[#4DA3FF] rounded-lg text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Membership */}
            <div className="bg-[#0F274A] rounded-lg p-6 border border-[rgba(255,255,255,0.08)]">
              <p className="text-sm text-[#B6C2D6] mb-2">Membership</p>
              <p className="text-lg font-bold text-[#F8FAFC]">{learner.isPremium ? '⭐ Premium' : 'Free'}</p>
            </div>

            {/* Track Progress */}
            {enrollments.length > 0 && (
              <div className="bg-[#0F274A] rounded-lg p-6 border border-[rgba(255,255,255,0.08)]">
                <h3 className="text-lg font-bold text-[#F8FAFC] mb-4">Track Progress</h3>
                <div className="space-y-3">
                  {enrollments.map((enrollment) => (
                    <div key={enrollment.id}>
                      <p className="text-sm text-[#B6C2D6] mb-1">
                        Track {enrollment.trackId.replace('track-', '')}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-[#0B1E3B] rounded-full h-2">
                          <div
                            className="bg-[#4DA3FF] h-2 rounded-full transition-all"
                            style={{ width: `${enrollment.progressPct}%` }}
                          />
                        </div>
                        <span className="text-xs text-[#B6C2D6] font-semibold">{enrollment.progressPct}%</span>
                      </div>
                      <p className="text-xs text-[#B6C2D6] mt-1">Stage {enrollment.stageNum}/5</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
