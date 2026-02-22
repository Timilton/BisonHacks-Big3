import React from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle } from 'lucide-react';
import { useDemoStore } from '../store/DemoStore';
import { useAppContext } from '../store/AppContext';

export const LearnerInboxPage: React.FC = () => {
  const { getOutreachMessagesByLearnerId, companies } = useDemoStore();
  const { selectedLearnerId } = useAppContext();

  const messages = getOutreachMessagesByLearnerId(selectedLearnerId);

  const getCompanyName = (companyId: string) => {
    const company = companies.find((c) => c.id === companyId);
    return company?.name || 'Company';
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-4xl font-bold text-[#F8FAFC] mb-2">Inbox</h1>
        <p className="text-[#B6C2D6] mb-8">Messages from recruiters and companies</p>

        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-[#0F274A] border border-[rgba(255,255,255,0.08)] rounded-lg p-12 text-center"
          >
            <Mail className="w-16 h-16 text-[#4DA3FF]/30 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-[#F8FAFC] mb-2">No Messages Yet</h3>
            <p className="text-[#B6C2D6] mb-6">
              When you reach Stage 5 of a track, recruiters will be able to see your profile and send you messages!
            </p>
            <p className="text-sm text-[#B6C2D6]/70">Keep learning and building your skills to unlock recruiter visibility.</p>
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
                className="bg-[#0F274A] border border-[#22C55E]/50 rounded-lg p-6 hover:border-[#22C55E] transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-[#22C55E]" />
                      <h3 className="text-lg font-bold text-[#F8FAFC]">{getCompanyName(message.fromCompanyId)}</h3>
                    </div>
                    <p className="text-sm text-[#B6C2D6]">{formatDate(message.createdAtISO)}</p>
                  </div>
                  <span className="px-3 py-1 bg-[#4DA3FF]/20 text-[#4DA3FF] rounded-full text-sm font-semibold">New</span>
                </div>

                <p className="text-[#B6C2D6] leading-relaxed mb-4">{message.message}</p>

                <button className="text-[#4DA3FF] hover:text-[#5FB0FF] font-semibold transition">Reply</button>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};
