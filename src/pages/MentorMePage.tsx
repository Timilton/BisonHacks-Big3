import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Zap, Code, BookOpen, Loader } from 'lucide-react';
import { useDemoStore } from '../store/DemoStore';
import { useAppContext } from '../store/AppContext';
import {
  generateTodaysPlan,
  explainConcept,
  generatePracticeQuestions,
  getRemainingCalls,
  isGeminiAvailable,
  getFallbackSuggestion,
} from '../services/gemini';

type ChatMode = 'plan' | 'explain' | 'questions' | null;

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const MentorMePage: React.FC = () => {
  const { getLearnerById, getEnrollmentsByLearnerId } = useDemoStore();
  const { selectedLearnerId } = useAppContext();

  const [chatMode, setChatMode] = useState<ChatMode>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [remainingCalls, setRemainingCalls] = useState(5);
  const [geminiAvailable] = useState(isGeminiAvailable());

  const learner = selectedLearnerId ? getLearnerById(selectedLearnerId) : null;
  const enrollments = selectedLearnerId ? getEnrollmentsByLearnerId(selectedLearnerId) : [];
  const currentTrack = enrollments.length > 0 ? enrollments[0] : null;

  // Update remaining calls display
  React.useEffect(() => {
    if (selectedLearnerId) {
      setRemainingCalls(getRemainingCalls(selectedLearnerId));
    }
  }, [selectedLearnerId]);

  const addMessage = useCallback((role: 'user' | 'assistant', content: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      role,
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  }, []);

  const handleGeneratePlan = async () => {
    if (!selectedLearnerId || !learner || !currentTrack) return;
    if (remainingCalls <= 0) {
      addMessage('assistant', 'Rate limit reached. You have 5 calls per day. Try again tomorrow.');
      return;
    }

    setLoading(true);
    addMessage('user', 'Generate my learning plan for today');

    try {
      const result = await generateTodaysPlan(
        selectedLearnerId,
        currentTrack.trackId.replace('track-', '').replace('-', ' '),
        currentTrack.stageNum,
        0 // TODO: Get actual completed course count
      );

      if (result.success && result.content) {
        addMessage('assistant', result.content);
        setRemainingCalls((prev) => Math.max(0, prev - 1));
      } else {
        const fallback = getFallbackSuggestion('plan');
        addMessage('assistant', `${result.error}\n\n📌 Quick tip: ${fallback}`);
      }
    } catch (error) {
      addMessage('assistant', 'Error generating plan. Please try again.');
    } finally {
      setLoading(false);
      setChatMode(null);
    }
  };

  const handleExplainConcept = async () => {
    if (!inputValue.trim()) return;
    if (remainingCalls <= 0) {
      addMessage('assistant', 'Rate limit reached. You have 5 calls per day. Try again tomorrow.');
      return;
    }

    const concept = inputValue;
    setLoading(true);
    addMessage('user', `Explain: ${concept}`);
    setInputValue('');

    try {
      const result = await explainConcept(
        selectedLearnerId!,
        concept,
        currentTrack ? `${currentTrack.trackId} track` : 'cloud architecture'
      );

      if (result.success && result.content) {
        addMessage('assistant', result.content);
        setRemainingCalls((prev) => Math.max(0, prev - 1));
      } else {
        const fallback = getFallbackSuggestion('concept');
        addMessage('assistant', `${result.error}\n\n📌 Quick tip: ${fallback}`);
      }
    } catch (error) {
      addMessage('assistant', 'Error explaining concept. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateQuestions = async () => {
    if (!inputValue.trim()) return;
    if (remainingCalls <= 0) {
      addMessage('assistant', 'Rate limit reached. You have 5 calls per day. Try again tomorrow.');
      return;
    }

    const topic = inputValue;
    setLoading(true);
    addMessage('user', `Generate practice questions for: ${topic}`);
    setInputValue('');

    try {
      const result = await generatePracticeQuestions(selectedLearnerId!, topic, 'Intermediate');

      if (result.success && result.content) {
        addMessage('assistant', result.content);
        setRemainingCalls((prev) => Math.max(0, prev - 1));
      } else {
        const fallback = getFallbackSuggestion('questions');
        addMessage('assistant', `${result.error}\n\n📌 Quick tip: ${fallback}`);
      }
    } catch (error) {
      addMessage('assistant', 'Error generating questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1E3B] p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-[#F8FAFC] mb-2">Your AI Mentor</h1>
          <p className="text-[#B6C2D6]">Get personalized guidance powered by Gemini AI</p>

          {/* API Status */}
          <div className="mt-4 flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${geminiAvailable ? 'bg-[#22C55E]' : 'bg-[#FF6B6B]'}`} />
            <span className="text-sm text-[#B6C2D6]">
              {geminiAvailable ? 'Gemini AI Ready' : 'AI features unavailable (API key not configured)'} • {remainingCalls} calls remaining today
            </span>
          </div>
        </motion.div>

        {/* Quick Actions */}
        {!chatMode && messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="grid md:grid-cols-3 gap-4 mb-8"
          >
            <button
              onClick={() => {
                setChatMode('plan');
                handleGeneratePlan();
              }}
              disabled={!geminiAvailable || remainingCalls === 0}
              className="bg-[#0F274A] rounded-lg p-6 border border-[rgba(255,255,255,0.08)] hover:border-[#4DA3FF] transition disabled:opacity-50 text-left"
            >
              <Zap className="text-[#4DA3FF] mb-3" size={24} />
              <h3 className="text-lg font-semibold text-[#F8FAFC] mb-2">Today's Plan</h3>
              <p className="text-sm text-[#B6C2D6]">Get a personalized learning plan for today</p>
            </button>

            <button
              onClick={() => setChatMode('explain')}
              disabled={!geminiAvailable || remainingCalls === 0}
              className="bg-[#0F274A] rounded-lg p-6 border border-[rgba(255,255,255,0.08)] hover:border-[#4DA3FF] transition disabled:opacity-50 text-left"
            >
              <BookOpen className="text-[#4DA3FF] mb-3" size={24} />
              <h3 className="text-lg font-semibold text-[#F8FAFC] mb-2">Explain Concept</h3>
              <p className="text-sm text-[#B6C2D6]">Ask me to explain any cloud topic</p>
            </button>

            <button
              onClick={() => setChatMode('questions')}
              disabled={!geminiAvailable || remainingCalls === 0}
              className="bg-[#0F274A] rounded-lg p-6 border border-[rgba(255,255,255,0.08)] hover:border-[#4DA3FF] transition disabled:opacity-50 text-left"
            >
              <Code className="text-[#4DA3FF] mb-3" size={24} />
              <h3 className="text-lg font-semibold text-[#F8FAFC] mb-2">Practice Questions</h3>
              <p className="text-sm text-[#B6C2D6]">Generate questions to test your knowledge</p>
            </button>
          </motion.div>
        )}

        {/* Chat Interface */}
        {(chatMode || messages.length > 0) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[#0F274A] rounded-lg border border-[rgba(255,255,255,0.08)] flex flex-col h-[600px]"
          >
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 && (
                <div className="flex items-center justify-center h-full text-center">
                  <div>
                    <MessageSquare size={48} className="text-[#B6C2D6] mx-auto mb-2 opacity-50" />
                    <p className="text-[#B6C2D6]">Start a conversation with your AI mentor</p>
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-md p-4 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-[#4DA3FF] text-[#0B1E3B]'
                        : 'bg-[#0B1E3B] text-[#F8FAFC] border border-[#4DA3FF]/50'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                  </div>
                </motion.div>
              ))}

              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-[#0B1E3B] text-[#F8FAFC] p-4 rounded-lg flex items-center gap-2 border border-[#4DA3FF]/50">
                    <Loader size={16} className="animate-spin" />
                    <span>Thinking...</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input Area */}
            {(chatMode === 'explain' || chatMode === 'questions') && (
              <div className="border-t border-[rgba(255,255,255,0.08)] p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !loading) {
                        if (chatMode === 'explain') {
                          handleExplainConcept();
                        } else if (chatMode === 'questions') {
                          handleGenerateQuestions();
                        }
                      }
                    }}
                    placeholder={
                      chatMode === 'explain' ? 'What concept should I explain?' : 'What topic should I test you on?'
                    }
                    className="flex-1 bg-[#0B1E3B] border border-[#4DA3FF] rounded-lg px-4 py-2 text-[#F8FAFC] placeholder-[#B6C2D6]"
                    disabled={loading}
                  />
                  <button
                    onClick={chatMode === 'explain' ? handleExplainConcept : handleGenerateQuestions}
                    disabled={loading || !inputValue.trim() || remainingCalls === 0}
                    className="px-4 py-2 bg-[#4DA3FF] text-[#0B1E3B] rounded-lg font-semibold hover:bg-[#3d8ae6] transition disabled:opacity-50"
                  >
                    Send
                  </button>
                </div>
              </div>
            )}

            {/* Reset Button */}
            {messages.length > 0 && (
              <div className="border-t border-[rgba(255,255,255,0.08)] p-4">
                <button
                  onClick={() => {
                    setMessages([]);
                    setChatMode(null);
                    setInputValue('');
                  }}
                  className="w-full px-4 py-2 border border-[#B6C2D6] text-[#B6C2D6] rounded-lg hover:bg-[#B6C2D6]/10 transition text-sm"
                >
                  Start New Conversation
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-8 bg-[#0B1E3B] rounded-lg p-4 border border-[#4DA3FF]/20"
        >
          <p className="text-xs text-[#B6C2D6]">
            <strong>💡 Tip:</strong> Your AI mentor can help you learn faster and stay motivated. You have {remainingCalls} calls
            remaining today. Use them wisely! Each call resets daily.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
