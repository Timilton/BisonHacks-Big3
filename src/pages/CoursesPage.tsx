import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Check, Filter } from 'lucide-react';
import { useDemoStore } from '../store/DemoStore';
import { useAppContext } from '../store/AppContext';

export const CoursesPage: React.FC = () => {
  const { courses, completeCourse, getCourseCompletionsByLearnerId } = useDemoStore();
  const { selectedLearnerId } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [scoreInput, setScoreInput] = useState<number>(85);

  const completions = useMemo(
    () => (selectedLearnerId ? getCourseCompletionsByLearnerId(selectedLearnerId) : []),
    [selectedLearnerId, getCourseCompletionsByLearnerId]
  );

  const completedCourseIds = useMemo(() => new Set(completions.map((c) => c.courseId)), [completions]);

  const categories = useMemo(
    () => ['All', ...new Set(courses.map((c) => c.category))],
    [courses]
  );

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const categoryMatch = selectedCategory === 'All' || course.category === selectedCategory;
      const difficultyMatch = selectedDifficulty === 'All' || course.difficulty === selectedDifficulty;
      return categoryMatch && difficultyMatch;
    });
  }, [courses, selectedCategory, selectedDifficulty]);

  const handleMarkComplete = (course: any) => {
    setSelectedCourse(course);
    setScoreInput(85);
    setShowCompleteModal(true);
  };

  const handleSubmitCompletion = () => {
    if (selectedLearnerId && selectedCourse && scoreInput >= 0 && scoreInput <= 100) {
      completeCourse(selectedLearnerId, selectedCourse.id, scoreInput);
      setShowCompleteModal(false);
      setSelectedCourse(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1E3B] p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-[#F8FAFC] mb-2">Cloud Courses</h1>
          <p className="text-[#B6C2D6]">Browse and complete 30+ cloud courses across all specializations</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-2 gap-6 mb-8"
        >
          {/* Category Filter */}
          <div className="bg-[#0F274A] rounded-lg p-4 border border-[rgba(255,255,255,0.08)]">
            <label className="flex items-center gap-2 text-[#F8FAFC] font-semibold mb-3">
              <Filter size={18} /> Category
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                    selectedCategory === cat
                      ? 'bg-[#4DA3FF] text-[#0B1E3B]'
                      : 'bg-[#0B1E3B] text-[#B6C2D6] border border-[rgba(255,255,255,0.08)] hover:border-[#4DA3FF]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Filter */}
          <div className="bg-[#0F274A] rounded-lg p-4 border border-[rgba(255,255,255,0.08)]">
            <label className="flex items-center gap-2 text-[#F8FAFC] font-semibold mb-3">
              <Filter size={18} /> Difficulty
            </label>
            <div className="flex flex-wrap gap-2">
              {['All', 'Beginner', 'Intermediate', 'Advanced'].map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                    selectedDifficulty === diff
                      ? 'bg-[#4DA3FF] text-[#0B1E3B]'
                      : 'bg-[#0B1E3B] text-[#B6C2D6] border border-[rgba(255,255,255,0.08)] hover:border-[#4DA3FF]'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Course Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCourses.map((course, index) => {
            const isCompleted = completedCourseIds.has(course.id);
            const completion = completions.find((c) => c.courseId === course.id);

            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-[#0F274A] rounded-lg p-6 border border-[rgba(255,255,255,0.08)] hover:border-[#4DA3FF] transition group"
              >
                <div className="flex items-start justify-between mb-3">
                  <BookOpen className="text-[#4DA3FF]" size={24} />
                  {isCompleted && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-[#22C55E]/20 rounded-lg">
                      <Check size={16} className="text-[#22C55E]" />
                      <span className="text-xs text-[#22C55E] font-semibold">Completed</span>
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-[#F8FAFC] mb-2">{course.title}</h3>
                <p className="text-sm text-[#B6C2D6] mb-4 line-clamp-2">{course.description}</p>

                {/* Metadata */}
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[#B6C2D6]">Provider:</span>
                    <span className="text-[#4DA3FF] font-medium">{course.provider}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#B6C2D6]">Hours:</span>
                    <span className="text-[#F8FAFC]">{course.estimatedHours}h</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#B6C2D6]">Level:</span>
                    <span
                      className={`font-medium ${
                        course.difficulty === 'Beginner'
                          ? 'text-[#4DA3FF]'
                          : course.difficulty === 'Intermediate'
                            ? 'text-[#FFB800]'
                            : 'text-[#FF6B6B]'
                      }`}
                    >
                      {course.difficulty}
                    </span>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <p className="text-xs text-[#B6C2D6] font-semibold mb-2">Skills Gained:</p>
                  <div className="flex flex-wrap gap-1">
                    {course.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-[#4DA3FF]/20 text-[#4DA3FF] rounded text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Score */}
                {isCompleted && completion && (
                  <div className="bg-[#0B1E3B] rounded-lg p-3 mb-4 border border-[#22C55E]/30">
                    <p className="text-xs text-[#B6C2D6] mb-1">Your Score</p>
                    <p className="text-2xl font-bold text-[#22C55E]">{completion.score}%</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <a
                    href={course.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 px-4 py-2 bg-[#4DA3FF]/20 text-[#4DA3FF] rounded-lg font-medium text-sm hover:bg-[#4DA3FF]/30 transition text-center"
                  >
                    View Course
                  </a>
                  {!isCompleted && (
                    <button
                      onClick={() => handleMarkComplete(course)}
                      className="flex-1 px-4 py-2 bg-[#22C55E] text-[#0B1E3B] rounded-lg font-medium text-sm hover:bg-[#16a34a] transition"
                    >
                      Mark Complete
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Complete Course Modal */}
      {showCompleteModal && selectedCourse && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="bg-[#0F274A] rounded-lg p-8 max-w-md w-full border border-[#4DA3FF]"
          >
            <h2 className="text-2xl font-bold text-[#F8FAFC] mb-2">Complete Course</h2>
            <p className="text-[#B6C2D6] mb-6">{selectedCourse.title}</p>

            <div className="bg-[#0B1E3B] rounded-lg p-4 mb-6">
              <label className="text-sm text-[#B6C2D6] mb-2 block font-semibold">Your Score (0-100)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={scoreInput}
                onChange={(e) => setScoreInput(Math.min(100, Math.max(0, Number(e.target.value))))}
                className="w-full bg-[#0B1E3B] border border-[#4DA3FF] rounded-lg px-4 py-3 text-[#F8FAFC] text-center text-2xl font-bold"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowCompleteModal(false)}
                className="flex-1 px-4 py-3 border border-[#B6C2D6] text-[#B6C2D6] rounded-lg font-semibold hover:bg-[#B6C2D6]/10 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitCompletion}
                className="flex-1 px-4 py-3 bg-[#22C55E] text-[#0B1E3B] rounded-lg font-semibold hover:bg-[#16a34a] transition"
              >
                Submit
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};
