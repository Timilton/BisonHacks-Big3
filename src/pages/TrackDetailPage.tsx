import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Lock, Play, Clock } from 'lucide-react';
import { useDemoStore } from '../store/DemoStore';
import { useAppContext } from '../store/AppContext';

export const TrackDetailPage: React.FC = () => {
  const { trackId } = useParams<{ trackId: string }>();
  const navigate = useNavigate();
  const { getTrackById, getStagesByTrackId, getEnrollmentsByLearnerId, checkIn, submitStageCompletion, courses } =
    useDemoStore();
  const { selectedLearnerId } = useAppContext();

  const track = getTrackById(trackId || '');
  const stages = getStagesByTrackId(trackId || '');
  const enrollments = getEnrollmentsByLearnerId(selectedLearnerId);
  const enrollment = enrollments.find((e) => e.trackId === trackId);

  const [checkInModal, setCheckInModal] = useState(false);
  const [checkInMinutes, setCheckInMinutes] = useState(30);
  const [checkInNote, setCheckInNote] = useState('');
  const [completeModal, setCompleteModal] = useState(false);

  if (!track || !enrollment) {
    return (
      <div className="p-8">
        <p className="text-gray-600">Track not found or not enrolled</p>
      </div>
    );
  }

  const currentStage = stages.find((s) => s.stageNum === enrollment.stageNum);
  const currentStageCourses = currentStage ? courses.filter((c) => currentStage.courseIds.includes(c.id)) : [];

  const handleCheckIn = () => {
    if (enrollment.id) {
      checkIn(enrollment.id, checkInMinutes, checkInNote);
      setCheckInModal(false);
      setCheckInMinutes(30);
      setCheckInNote('');
    }
  };

  const handleCompleteStage = () => {
    if (enrollment.id) {
      submitStageCompletion(enrollment.id);
      setCompleteModal(false);
    }
  };

  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        {/* Header */}
        <button
          onClick={() => navigate('/learner/tracks')}
          className="flex items-center gap-2 text-[#FF1A1A] hover:text-[#D60000] mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Tracks
        </button>

        <h1 className="text-4xl font-bold text-[#0A0A0A] mb-2">{track.name}</h1>
        <p className="text-gray-600 mb-8">{track.description}</p>

        {/* Progress Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="border border-[#EDEDED] rounded-lg p-6">
            <p className="text-sm text-gray-600 mb-2">Current Stage</p>
            <p className="text-3xl font-bold text-[#FF1A1A]">Stage {enrollment.stageNum}/5</p>
          </div>
          <div className="border border-[#EDEDED] rounded-lg p-6">
            <p className="text-sm text-gray-600 mb-2">Progress</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-[#EDEDED] rounded-full h-2">
                <div
                  className="bg-[#FF1A1A] h-2 rounded-full transition-all"
                  style={{ width: `${enrollment.progressPct}%` }}
                />
              </div>
              <p className="text-3xl font-bold text-[#0A0A0A]">{enrollment.progressPct}%</p>
            </div>
          </div>
          <div className="border border-[#EDEDED] rounded-lg p-6">
            <p className="text-sm text-gray-600 mb-2">Status</p>
            <p className="text-lg font-bold text-[#0A0A0A]">
              {enrollment.status === 'COMPLETED' ? '✅ Completed' : '🔄 In Progress'}
            </p>
          </div>
        </div>

        {/* Stage Ladder */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#0A0A0A] mb-6">Stage Progression</h2>
          <div className="space-y-4">
            {stages.map((stage, idx) => {
              const isCompleted = stage.stageNum < enrollment.stageNum;
              const isCurrent = stage.stageNum === enrollment.stageNum;
              const isLocked = stage.stageNum > enrollment.stageNum;

              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className={`border-2 rounded-lg p-6 transition-all ${
                    isCompleted
                      ? 'border-green-600 bg-green-50'
                      : isCurrent
                        ? 'border-[#FF1A1A] bg-red-50'
                        : 'border-[#EDEDED] bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {isCompleted ? (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : isLocked ? (
                          <Lock className="w-6 h-6 text-gray-400" />
                        ) : (
                          <Play className="w-6 h-6 text-[#FF1A1A]" />
                        )}
                        <h3 className="text-xl font-bold text-[#0A0A0A]">
                          Stage {stage.stageNum}: {stage.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 mb-4">{stage.description}</p>

                      {isCurrent && (
                        <div>
                          <p className="text-sm font-semibold text-[#0A0A0A] mb-3">Course Resources:</p>
                          <div className="space-y-2 mb-4">
                            {currentStageCourses.map((course) => (
                              <a
                                key={course.id}
                                href={course.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-[#FF1A1A] hover:text-[#D60000] underline"
                              >
                                📚 {course.title}
                              </a>
                            ))}
                          </div>

                          <div className="flex gap-3">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setCheckInModal(true)}
                              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border-2 border-[#FF1A1A] text-[#FF1A1A] rounded-lg font-semibold hover:bg-[#FF1A1A] hover:text-white transition"
                            >
                              <Clock className="w-5 h-5" />
                              Check In
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setCompleteModal(true)}
                              className="flex-1 bg-[#FF1A1A] text-white rounded-lg font-semibold hover:bg-[#D60000] transition px-4 py-2"
                            >
                              Complete Stage
                            </motion.button>
                          </div>
                        </div>
                      )}

                      {isCompleted && (
                        <div className="flex items-center gap-2">
                          <p className="text-green-700 font-semibold">Completed</p>
                          <div className="flex gap-1">
                            {stage.skillsAwarded.map((skill) => (
                              <span key={skill} className="px-2 py-1 bg-green-200 text-green-800 rounded text-xs">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Recruiter Visibility */}
        {enrollment.recruiterVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="border-2 border-green-600 bg-green-50 rounded-lg p-6"
          >
            <p className="text-lg font-bold text-green-700">✅ Recruiter Visible</p>
            <p className="text-gray-700 mt-2">
              You've reached Stage 5! Companies can now see your profile and reach out with opportunities.
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Check-In Modal */}
      {checkInModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg p-8 max-w-md w-full"
          >
            <h2 className="text-2xl font-bold text-[#0A0A0A] mb-6">Check In</h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm font-semibold text-[#0A0A0A] block mb-2">Minutes Spent</label>
                <input
                  type="number"
                  value={checkInMinutes}
                  onChange={(e) => setCheckInMinutes(Number(e.target.value))}
                  className="w-full border border-[#EDEDED] rounded px-3 py-2 text-[#0A0A0A] focus:outline-none focus:border-[#FF1A1A]"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-[#0A0A0A] block mb-2">Note</label>
                <textarea
                  value={checkInNote}
                  onChange={(e) => setCheckInNote(e.target.value)}
                  placeholder="What did you accomplish?"
                  className="w-full border border-[#EDEDED] rounded px-3 py-2 text-[#0A0A0A] focus:outline-none focus:border-[#FF1A1A] resize-none"
                  rows={3}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setCheckInModal(false)}
                className="flex-1 px-4 py-2 border-2 border-[#EDEDED] text-[#0A0A0A] rounded-lg font-semibold hover:bg-[#F5F5F5] transition"
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCheckIn}
                className="flex-1 px-4 py-2 bg-[#FF1A1A] text-white rounded-lg font-semibold hover:bg-[#D60000] transition"
              >
                Save Check-In
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Complete Stage Modal */}
      {completeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg p-8 max-w-md w-full"
          >
            <h2 className="text-2xl font-bold text-[#0A0A0A] mb-4">Complete Stage {enrollment.stageNum}?</h2>
            <p className="text-gray-700 mb-6">
              You're about to mark this stage as complete. Your skills profile will be updated with new skills.
            </p>

            {currentStage && (
              <div className="mb-6 p-4 bg-[#FF1A1A]/10 rounded-lg">
                <p className="text-sm font-semibold text-[#0A0A0A] mb-2">Skills You'll Earn:</p>
                <div className="flex flex-wrap gap-2">
                  {currentStage.skillsAwarded.map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-[#FF1A1A] text-white rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setCompleteModal(false)}
                className="flex-1 px-4 py-2 border-2 border-[#EDEDED] text-[#0A0A0A] rounded-lg font-semibold hover:bg-[#F5F5F5] transition"
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCompleteStage}
                className="flex-1 px-4 py-2 bg-[#FF1A1A] text-white rounded-lg font-semibold hover:bg-[#D60000] transition"
              >
                Confirm
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
