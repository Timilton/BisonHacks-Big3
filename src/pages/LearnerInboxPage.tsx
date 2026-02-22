import React from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle } from 'lucide-react';
import { useDemoStore } from '../store/DemoStore';
import { useAppContext } from '../store/AppContext';

export const LearnerInboxPage: React.FC = () => {
  const { getOutreachMessagesByLearnerId } = useDemoStore();
  const { selectedLearnerId } = useAppContext();

  const messages = getOutreachMessagesByLearnerId(selectedLearnerId);

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-4xl font-bold text-[#0A0A0A] mb-2">Inbox</h1>
        <p className="text-gray-600 mb-8">Messages from recruiters and companies</p>

        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="border border-[#EDEDED] rounded-lg p-12 text-center"
          >
            <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-[#0A0A0A] mb-2">No Messages Yet</h3>
            <p className="text-gray-600 mb-6">
              When you reach Stage 5 of a track, recruiters will be able to see your profile and send you messages!
            </p>
            <p className="text-sm text-gray-500">Keep learning and building your skills to unlock recruiter visibility.</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, idx) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="border border-[#EDEDED] rounded-lg p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <h3 className="text-lg font-bold text-[#0A0A0A]">AWS</h3>
                    </div>
                    <p className="text-sm text-gray-600">{formatDate(message.createdAtISO)}</p>
                  </div>
                  <span className="px-3 py-1 bg-[#FF1A1A]/10 text-[#FF1A1A] rounded-full text-sm font-semibold">New</span>
                </div>

                <p className="text-gray-700 leading-relaxed mb-4">{message.message}</p>

                <button className="text-[#FF1A1A] hover:text-[#D60000] font-semibold transition">Reply</button>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};
