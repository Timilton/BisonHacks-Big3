import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, CheckCircle } from 'lucide-react';
import { useDemoStore } from '../store/DemoStore';
import { useAppContext } from '../store/AppContext';

export const LearnerTracksPage: React.FC = () => {
  const navigate = useNavigate();
  const { tracks, getEnrollmentsByLearnerId } = useDemoStore();
  const { selectedLearnerId } = useAppContext();

  const enrollments = getEnrollmentsByLearnerId(selectedLearnerId);
  const enrolledTrackIds = enrollments.map((e) => e.trackId);

  const handleStartTrack = (trackId: string) => {
    navigate(`/learner/tracks/${trackId}`);
  };

  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-4xl font-bold text-[#F8FAFC] mb-2">Available Tracks</h1>
        <p className="text-[#B6C2D6] mb-8">Build your skills with AWS Cloud Developer track</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tracks.map((track) => {
            const isEnrolled = enrolledTrackIds.includes(track.id);
            const enrollment = enrollments.find((e) => e.trackId === track.id);

            return (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-[#0F274A] border border-[rgba(255,255,255,0.08)] rounded-lg p-6 hover:border-[#4DA3FF]/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-[#F8FAFC]">{track.name}</h3>
                    <p className="text-sm text-[#4DA3FF] font-semibold mt-1">AWS</p>
                  </div>
                  {isEnrolled && <CheckCircle className="w-6 h-6 text-emerald-500" />}
                </div>

                <p className="text-[#B6C2D6] mb-6">{track.description}</p>

                <div className="mb-6">
                  <div className="text-sm text-[#B6C2D6] mb-2">5 Stages • 10-20 Hours</div>
                  {isEnrolled && enrollment && (
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-[#0B1E3B] rounded-full h-2">
                        <div
                          className="bg-[#4DA3FF] h-2 rounded-full transition-all"
                          style={{ width: `${enrollment.progressPct}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-[#F8FAFC]">{enrollment.progressPct}%</span>
                    </div>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleStartTrack(track.id)}
                  className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                    isEnrolled
                      ? 'bg-[#0B1E3B] border-2 border-[#4DA3FF] text-[#4DA3FF] hover:bg-[#4DA3FF] hover:text-[#0B1E3B]'
                      : 'bg-[#4DA3FF] text-[#0B1E3B] hover:bg-[#5FB0FF]'
                  }`}
                >
                  {isEnrolled ? (
                    <>
                      Continue Learning <Play className="w-5 h-5" />
                    </>
                  ) : (
                    <>
                      Start Track <Play className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
