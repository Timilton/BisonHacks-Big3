import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Send, CheckCircle } from 'lucide-react';
import { useDemoStore } from '../store/DemoStore';
import { useAppContext } from '../store/AppContext';

export const CompanyDashboardPage: React.FC = () => {
  const { getEnrollmentsByCompanyId, getLearnerById, getTrackById, computeEnrollmentRisk, requestOutreach } =
    useDemoStore();
  const { selectedCompanyId } = useAppContext();

  const enrollments = getEnrollmentsByCompanyId(selectedCompanyId);

  const [selectedEnrollmentId, setSelectedEnrollmentId] = useState<string | null>(null);
  const [outreachModal, setOutreachModal] = useState(false);
  const [outreachMessage, setOutreachMessage] = useState('');

  const selectedEnrollment = enrollments.find((e) => e.id === selectedEnrollmentId);
  const selectedLearner = selectedEnrollment ? getLearnerById(selectedEnrollment.learnerId) : null;

  const handleOpenProfile = (enrollmentId: string) => {
    setSelectedEnrollmentId(enrollmentId);
  };

  const handleRequestOutreach = () => {
    if (selectedEnrollment && outreachMessage.trim()) {
      requestOutreach(selectedCompanyId, selectedEnrollment.learnerId, outreachMessage);
      setOutreachMessage('');
      setOutreachModal(false);
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'HIGH':
        return 'bg-[#FF1A1A] text-white';
      case 'MEDIUM':
        return 'bg-orange-500 text-white';
      case 'LOW':
        return 'bg-green-600 text-white';
      default:
        return 'bg-gray-400 text-white';
    }
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-4xl font-bold text-[#0A0A0A] mb-2">Recruiter Dashboard</h1>
        <p className="text-gray-600 mb-8">View all learners enrolled in {selectedCompanyId.toUpperCase()} tracks</p>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="border border-[#EDEDED] rounded-lg p-6">
            <p className="text-sm text-gray-600 mb-2">Total Learners</p>
            <p className="text-3xl font-bold text-[#0A0A0A]">{enrollments.length}</p>
          </div>
          <div className="border border-[#EDEDED] rounded-lg p-6">
            <p className="text-sm text-gray-600 mb-2">At-Risk</p>
            <p className="text-3xl font-bold text-[#FF1A1A]">
              {enrollments.filter((e) => computeEnrollmentRisk(e) === 'HIGH').length}
            </p>
          </div>
          <div className="border border-[#EDEDING] rounded-lg p-6">
            <p className="text-sm text-gray-600 mb-2">Recruiter Visible</p>
            <p className="text-3xl font-bold text-green-600">{enrollments.filter((e) => e.recruiterVisible).length}</p>
          </div>
          <div className="border border-[#EDEDING] rounded-lg p-6">
            <p className="text-sm text-gray-600 mb-2">Completed</p>
            <p className="text-3xl font-bold text-[#0A0A0A]">{enrollments.filter((e) => e.status === 'COMPLETED').length}</p>
          </div>
        </div>

        {/* Learners Table */}
        <div className="border border-[#EDEDED] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F5F5F5] border-b border-[#EDEDED]">
                  <th className="px-6 py-4 text-left text-sm font-bold text-[#0A0A0A]">Learner</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-[#0A0A0A]">Track</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-[#0A0A0A]">Stage</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-[#0A0A0A]">Progress</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-[#0A0A0A]">Risk</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-[#0A0A0A]">Visible</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-[#0A0A0A]">Last Activity</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-[#0A0A0A]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {enrollments.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-8 text-center text-gray-600">
                      No learners enrolled yet
                    </td>
                  </tr>
                ) : (
                  enrollments.map((enrollment, idx) => {
                    const learner = getLearnerById(enrollment.learnerId);
                    const track = getTrackById(enrollment.trackId);
                    const risk = computeEnrollmentRisk(enrollment);

                    return (
                      <motion.tr
                        key={enrollment.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                        viewport={{ once: true }}
                        className="border-b border-[#EDEDED] hover:bg-[#F5F5F5] transition"
                      >
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-[#0A0A0A]">{learner?.name}</p>
                            <p className="text-sm text-gray-600">{learner?.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-medium text-[#0A0A0A]">{track?.name}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-[#FF1A1A] font-bold">{enrollment.stageNum}/5</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 w-32">
                            <div className="flex-1 bg-[#EDEDING] rounded-full h-2">
                              <div
                                className="bg-[#FF1A1A] h-2 rounded-full transition-all"
                                style={{ width: `${enrollment.progressPct}%` }}
                              />
                            </div>
                            <span className="text-sm font-semibold text-[#0A0A0A]">{enrollment.progressPct}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getRiskColor(risk)}`}>{risk}</span>
                        </td>
                        <td className="px-6 py-4">
                          {enrollment.recruiterVisible ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{formatDate(enrollment.lastActivityISO)}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleOpenProfile(enrollment.id)}
                              className="p-2 border border-[#EDEDING] rounded hover:bg-[#F5F5F5] transition text-[#FF1A1A]"
                              title="View Profile"
                            >
                              <Eye className="w-4 h-4" />
                            </motion.button>
                            {enrollment.recruiterVisible && (
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => {
                                  setSelectedEnrollmentId(enrollment.id);
                                  setOutreachModal(true);
                                }}
                                className="p-2 border border-[#FF1A1A] rounded hover:bg-[#FF1A1A] hover:text-white transition text-[#FF1A1A]"
                                title="Request Outreach"
                              >
                                <Send className="w-4 h-4" />
                              </motion.button>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Profile Modal */}
      {selectedEnrollment && selectedLearner && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-bold text-[#0A0A0A] mb-6">{selectedLearner.name}'s Profile</h2>

            {/* Resume */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Resume</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{selectedLearner.resume.summary}</p>
            </div>

            {/* Skills */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-[#0A0A0A] mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {Array.from(
                  new Set([
                    ...selectedLearner.baseSkills,
                    ...(getTrackById(selectedEnrollment.trackId)?.stageIds || [])
                      .map((stageId) => {
                        const stage = useDemoStore().getStageById(stageId);
                        return stage && stage.stageNum <= selectedEnrollment.stageNum ? stage.skillsAwarded : [];
                      })
                      .flat(),
                  ])
                ).map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-[#FF1A1A] text-white rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Track Progress */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-[#0A0A0A] mb-3">Track Progress</h3>
              <div className="p-4 bg-[#F5F5F5] rounded-lg">
                <p className="font-semibold text-[#0A0A0A] mb-2">{getTrackById(selectedEnrollment.trackId)?.name}</p>
                <p className="text-sm text-gray-600 mb-3">Stage {selectedEnrollment.stageNum}/5</p>
                <div className="w-full bg-[#EDEDING] rounded-full h-3">
                  <div
                    className="bg-[#FF1A1A] h-3 rounded-full transition-all"
                    style={{ width: `${selectedEnrollment.progressPct}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">{selectedEnrollment.progressPct}% complete</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedEnrollmentId(null)}
                className="flex-1 px-4 py-2 border-2 border-[#EDEDING] text-[#0A0A0A] rounded-lg font-semibold hover:bg-[#F5F5F5] transition"
              >
                Close
              </button>
              {selectedEnrollment.recruiterVisible && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setOutreachModal(true);
                  }}
                  className="flex-1 bg-[#FF1A1A] text-white rounded-lg font-semibold hover:bg-[#D60000] transition px-4 py-2"
                >
                  Request Outreach
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Outreach Modal */}
      {outreachModal && selectedEnrollment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg p-8 max-w-md w-full"
          >
            <h2 className="text-2xl font-bold text-[#0A0A0A] mb-4">Send Outreach Message</h2>
            <p className="text-gray-600 mb-4">
              Send a message to {getLearnerById(selectedEnrollment.learnerId)?.name}
            </p>

            <textarea
              value={outreachMessage}
              onChange={(e) => setOutreachMessage(e.target.value)}
              placeholder="Hi! We're impressed with your progress..."
              className="w-full border border-[#EDEDING] rounded px-3 py-2 text-[#0A0A0A] focus:outline-none focus:border-[#FF1A1A] resize-none mb-6"
              rows={6}
            />

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setOutreachModal(false);
                  setOutreachMessage('');
                  setSelectedEnrollmentId(null);
                }}
                className="flex-1 px-4 py-2 border-2 border-[#EDEDING] text-[#0A0A0A] rounded-lg font-semibold hover:bg-[#F5F5F5] transition"
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRequestOutreach}
                disabled={!outreachMessage.trim()}
                className="flex-1 bg-[#FF1A1A] text-white rounded-lg font-semibold hover:bg-[#D60000] transition px-4 py-2 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
