import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Users, BookOpen, Briefcase } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0B1E3B]">
      {/* Navigation Header */}
      <nav className="fixed top-0 w-full z-50 bg-[#0B1E3B]/95 backdrop-blur border-b border-[rgba(255,255,255,0.08)]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo_skill_sprint.png" alt="SkillSprint Logo" className="w-8 h-8" />
            <span className="font-bold text-xl text-[#F8FAFC]">SkillSprint</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('features')} className="text-[#B6C2D6] hover:text-[#F8FAFC] transition">Pricing</button>
            <button onClick={() => scrollToSection('solutions')} className="text-[#B6C2D6] hover:text-[#F8FAFC] transition">Solutions</button>
            <button onClick={() => scrollToSection('contact')} className="text-[#B6C2D6] hover:text-[#F8FAFC] transition">Contact</button>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={handleLogin} className="px-4 py-2 text-[#F8FAFC] hover:text-[#4DA3FF] transition text-sm">
              Log In
            </button>
            <button onClick={handleLogin} className="px-4 py-2 bg-[#4DA3FF] text-[#0B1E3B] rounded-lg font-medium hover:bg-[#3d8ae6] transition text-sm">
              Create Account
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 pt-32 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[#F8FAFC]">
            Become unreplaceable by learning high demand skills.<br />
            <span className="bg-gradient-to-r from-[#4DA3FF] to-[#22C55E] bg-clip-text text-transparent">
              Get Recruiter Visibility while at it.
            </span>
          </h1>
          <p className="text-xl text-[#B6C2D6] max-w-2xl mx-auto mb-8">
            SkillSprint turns your learning journey into job opportunities. Master cloud technologies through structured tracks, showcase your skills, and connect directly with hiring managers.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-16">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogin}
              className="px-8 py-4 bg-[#4DA3FF] text-[#0B1E3B] rounded-lg font-semibold hover:bg-[#3d8ae6] transition flex items-center justify-center gap-2"
            >
              Enter Demo <ArrowRight size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogin}
              className="px-8 py-4 border border-[#4DA3FF] text-[#4DA3FF] rounded-lg font-semibold hover:bg-[#4DA3FF]/10 transition"
            >
              Try Recruiter Portal
            </motion.button>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="rounded-lg bg-[#0F274A] p-6 border border-[rgba(255,255,255,0.08)]">
              <div className="text-3xl font-bold text-[#4DA3FF] mb-2">30+</div>
              <div className="text-[#B6C2D6]">Curated Courses</div>
            </div>
            <div className="rounded-lg bg-[#0F274A] p-6 border border-[rgba(255,255,255,0.08)]">
              <div className="text-3xl font-bold text-[#22C55E] mb-2">10</div>
              <div className="text-[#B6C2D6]">Learning Tracks</div>
            </div>
            <div className="rounded-lg bg-[#0F274A] p-6 border border-[rgba(255,255,255,0.08)]">
              <div className="text-3xl font-bold text-[#F8FAFC] mb-2">25+</div>
              <div className="text-[#B6C2D6]">Active Learners</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-6 md:px-8 py-20 border-t border-[rgba(255,255,255,0.08)]">
        <h2 className="text-4xl font-bold text-[#F8FAFC] mb-16 text-center">For Learners</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-[#0F274A] rounded-lg p-8 border border-[rgba(255,255,255,0.08)]"
          >
            <BookOpen className="text-[#4DA3FF] mb-4" size={32} />
            <h3 className="text-xl font-semibold text-[#F8FAFC] mb-3">Structured Learning</h3>
            <p className="text-[#B6C2D6]">Master technical skills through multi-stage tracks with carefully curated courses and real-world projects.</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-[#0F274A] rounded-lg p-8 border border-[rgba(255,255,255,0.08)]"
          >
            <Zap className="text-[#22C55E] mb-4" size={32} />
            <h3 className="text-xl font-semibold text-[#F8FAFC] mb-3">AI Mentoring</h3>
            <p className="text-[#B6C2D6]">Get personalized guidance from Gemini AI-powered mentor to accelerate your learning and stay motivated.</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-[#0F274A] rounded-lg p-8 border border-[rgba(255,255,255,0.08)]"
          >
            <Briefcase className="text-[#FF6B6B] mb-4" size={32} />
            <h3 className="text-xl font-semibold text-[#F8FAFC] mb-3">Job Matching</h3>
            <p className="text-[#B6C2D6]">Reach a high level and become visible to recruiters. Get matched with opportunities aligned with your skills.</p>
          </motion.div>
        </div>

        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogin}
            className="px-8 py-3 bg-[#4DA3FF] text-[#0B1E3B] rounded-lg font-semibold hover:bg-[#3d8ae6] transition"
          >
            Start Learning → 
          </motion.button>
        </div>
      </section>

      {/* For Recruiters Section */}
      <section id="solutions" className="max-w-7xl mx-auto px-6 md:px-8 py-20 border-t border-[rgba(255,255,255,0.08)]">
        <h2 className="text-4xl font-bold text-[#F8FAFC] mb-16 text-center">For Recruiters</h2>
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-[#0F274A] rounded-lg p-8 border border-[rgba(255,255,255,0.08)]"
          >
            <Users className="text-[#4DA3FF] mb-4" size={32} />
            <h3 className="text-xl font-semibold text-[#F8FAFC] mb-3">Talent Database</h3>
            <p className="text-[#B6C2D6]">Access a curated pool of cloud-skilled learners. Filter by track progress, skills, and specialization to find your perfect match.</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-[#0F274A] rounded-lg p-8 border border-[rgba(255,255,255,0.08)]"
          >
            <Zap className="text-[#22C55E] mb-4" size={32} />
            <h3 className="text-xl font-semibold text-[#F8FAFC] mb-3">AI Recommendations</h3>
            <p className="text-[#B6C2D6]">Let AI rank and recommend top candidates based on job requirements and learner capabilities.</p>
          </motion.div>
        </div>

        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogin}
            className="px-8 py-3 bg-[#22C55E] text-[#0B1E3B] rounded-lg font-semibold hover:bg-[#16a34a] transition"
          >
            Browse Talent →
          </motion.button>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-20 border-t border-[rgba(255,255,255,0.08)]">
        <h2 className="text-4xl font-bold text-[#F8FAFC] mb-16 text-center">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-[#4DA3FF] text-[#0B1E3B] rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">1</div>
            <h3 className="text-xl font-semibold text-[#F8FAFC] mb-2">Choose Your Track</h3>
            <p className="text-[#B6C2D6]">Pick from 10 Company specializations (Cloud Developer, DevOps, Data Engineer, Security Specialist, ML Engineer etc.)</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-[#4DA3FF] text-[#0B1E3B] rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">2</div>
            <h3 className="text-xl font-semibold text-[#F8FAFC] mb-2">Complete Different Stages</h3>
            <p className="text-[#B6C2D6]">Master each stage with courses, projects, and skills verification. See job pay range for each stage. Reach Advanced stages to become recruiter-visible.</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-[#4DA3FF] text-[#0B1E3B] rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">3</div>
            <h3 className="text-xl font-semibold text-[#F8FAFC] mb-2">Get Hired</h3>
            <p className="text-[#B6C2D6]">Connect with companies looking for your skills. Apply to matched jobs or receive direct recruiter outreach.</p>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-20 border-t border-[rgba(255,255,255,0.08)]">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-[#F8FAFC] mb-6">Ready to Skill Up?</h2>
          <p className="text-[#B6C2D6] mb-8 text-lg">Join SkillSprint today and turn your cloud learning into career opportunities.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogin}
            className="px-12 py-4 bg-[#4DA3FF] text-[#0B1E3B] rounded-lg font-semibold hover:bg-[#3d8ae6] transition text-lg"
          >
            Get Started Free → 
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-[rgba(255,255,255,0.08)] mt-20 py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-8 text-center text-[#B6C2D6]">
          <p>© 2024 SkillSprint. Turning learning into opportunities.</p>
        </div>
      </footer>
    </div>
  );
};
