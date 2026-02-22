// Gemini AI Service for SkillSprint
// Handles AI-powered mentoring and recommendations with rate limiting

const API_KEY = (import.meta as any).env?.VITE_GEMINI_API_KEY || '';
const RATE_LIMIT_PER_DAY = 5;
const STORAGE_KEY_PREFIX = 'skillsprint_gemini_';

interface GeminiResponse {
  success: boolean;
  content?: string;
  error?: string;
}

// Rate limiter: track API calls per user per day
const getRateLimitKey = (userId: string): string => `${STORAGE_KEY_PREFIX}${userId}_calls`;

const checkRateLimit = (userId: string): boolean => {
  if (!API_KEY) {
    console.warn('Gemini API key not configured');
    return false;
  }

  const today = new Date().toDateString();
  const key = `${getRateLimitKey(userId)}_date`;
  const callsKey = getRateLimitKey(userId);

  const storedDate = localStorage.getItem(key);
  const storedCalls = parseInt(localStorage.getItem(callsKey) || '0', 10);

  if (storedDate !== today) {
    // Reset for new day
    localStorage.setItem(key, today);
    localStorage.setItem(callsKey, '0');
    return true;
  }

  return storedCalls < RATE_LIMIT_PER_DAY;
};

const incrementCallCount = (userId: string): void => {
  const callsKey = getRateLimitKey(userId);
  const current = parseInt(localStorage.getItem(callsKey) || '0', 10);
  localStorage.setItem(callsKey, String(current + 1));
};

// Call Gemini API
const callGeminiAPI = async (prompt: string): Promise<GeminiResponse> => {
  if (!API_KEY) {
    return {
      success: false,
      error: 'Gemini API key not configured. Please set VITE_GEMINI_API_KEY environment variable.',
    };
  }

  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': API_KEY,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      return {
        success: false,
        error: `API error: ${response.statusText}`,
      };
    }

    const data = await response.json();

    if (data.candidates && data.candidates.length > 0) {
      const content = data.candidates[0].content.parts[0].text;
      return {
        success: true,
        content,
      };
    }

    return {
      success: false,
      error: 'No content generated',
    };
  } catch (error) {
    console.error('Gemini API error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

// Generate personalized today's learning plan
export const generateTodaysPlan = async (userId: string, trackName: string, currentStage: number, completedCourses: number): Promise<GeminiResponse> => {
  if (!checkRateLimit(userId)) {
    return {
      success: false,
      error: `Rate limit reached. You have 5 calls per day. Try again tomorrow.`,
    };
  }

  const prompt = `You are a cloud learning coach. Create a brief, actionable learning plan for TODAY for a learner on the "${trackName}" track at Stage ${currentStage} who has completed ${completedCourses} courses.

Provide:
1. One specific learning goal (2-3 sentences)
2. Two recommended activities (with time estimates)
3. One tip for staying motivated

Keep it concise and practical.`;

  const result = await callGeminiAPI(prompt);
  if (result.success) {
    incrementCallCount(userId);
  }
  return result;
};

// Explain a technical concept
export const explainConcept = async (userId: string, concept: string, context: string): Promise<GeminiResponse> => {
  if (!checkRateLimit(userId)) {
    return {
      success: false,
      error: `Rate limit reached. You have 5 calls per day. Try again tomorrow.`,
    };
  }

  const prompt = `You are a cloud technology expert. Explain the concept of "${concept}" in the context of ${context}.

Provide:
1. Simple definition (1-2 sentences)
2. Key points (bullet list, 3-4 items)
3. Real-world example in cloud computing
4. Common misconceptions to avoid

Keep explanations beginner-friendly.`;

  const result = await callGeminiAPI(prompt);
  if (result.success) {
    incrementCallCount(userId);
  }
  return result;
};

// Generate practice questions
export const generatePracticeQuestions = async (userId: string, topic: string, difficulty: string): Promise<GeminiResponse> => {
  if (!checkRateLimit(userId)) {
    return {
      success: false,
      error: `Rate limit reached. You have 5 calls per day. Try again tomorrow.`,
    };
  }

  const prompt = `You are a cloud certification exam prep coach. Generate practice questions for "${topic}" at ${difficulty} level.

Create:
1. Three multiple-choice questions (with 4 options each)
2. One hands-on scenario question
3. Answer key with brief explanations

Focus on practical, real-world scenarios.`;

  const result = await callGeminiAPI(prompt);
  if (result.success) {
    incrementCallCount(userId);
  }
  return result;
};

// Recommend top learners for a job (for recruiters)
export const recommendLearnersForJob = async (companyId: string, jobTitle: string, requiredSkills: string[], learnerData: any[]): Promise<GeminiResponse> => {
  if (!checkRateLimit(companyId)) {
    return {
      success: false,
      error: `Rate limit reached. You have 5 calls per day. Try again tomorrow.`,
    };
  }

  const learnerSummaries = learnerData
    .slice(0, 10)
    .map((l, i) => `${i + 1}. ${l.name} - Skills: ${l.allSkills.join(', ')} - Avg Score: ${l.avgScore}/100`)
    .join('\n');

  const prompt = `You are a tech recruiter. Review these learner profiles and recommend the top 3 best matches for a "${jobTitle}" position requiring: ${requiredSkills.join(', ')}.

Learner Profiles:
${learnerSummaries}

For each recommended learner, provide:
1. Why they're a good fit
2. Strengths relative to the job
3. Areas they could grow in
4. Recommended onboarding focused on their gaps`;

  const result = await callGeminiAPI(prompt);
  if (result.success) {
    incrementCallCount(companyId);
  }
  return result;
};

// Get AI insights for learner profile
export const getLearnerProfileInsights = async (userId: string, skills: string[], avgScore: number, completedTracks: number): Promise<GeminiResponse> => {
  if (!checkRateLimit(userId)) {
    return {
      success: false,
      error: `Rate limit reached. You have 5 calls per day. Try again tomorrow.`,
    };
  }

  const prompt = `You are a career coach analyzing a cloud learner's profile.

Learner Stats:
- Skills: ${skills.join(', ')}
- Average Score: ${avgScore}/100
- Completed Tracks: ${completedTracks}

Provide:
1. Career readiness assessment (Junior/Mid/Senior level)
2. Top 3 job roles they're qualified for
3. 2 skill gaps to address for career growth
4. 1-2 networking or certification recommendations

Be encouraging but realistic.`;

  const result = await callGeminiAPI(prompt);
  if (result.success) {
    incrementCallCount(userId);
  }
  return result;
};

// Check remaining API calls for user
export const getRemainingCalls = (userId: string): number => {
  const today = new Date().toDateString();
  const key = `${getRateLimitKey(userId)}_date`;
  const callsKey = getRateLimitKey(userId);

  const storedDate = localStorage.getItem(key);
  const storedCalls = parseInt(localStorage.getItem(callsKey) || '0', 10);

  if (storedDate !== today) {
    return RATE_LIMIT_PER_DAY;
  }

  return Math.max(0, RATE_LIMIT_PER_DAY - storedCalls);
};

// Get API availability status
export const isGeminiAvailable = (): boolean => {
  return !!API_KEY;
};

// Graceful fallback suggestions when API unavailable
export const getFallbackSuggestion = (type: string): string => {
  const suggestions: Record<string, string> = {
    plan: 'Focus on completing the current stage courses first, then take the next course in your track. Set aside 2 hours daily for focused study.',
    concept: 'Review the course materials on this topic, check the official documentation, and watch related video tutorials in the course library.',
    questions: 'Try the practice quizzes in the course modules, and review the assessment questions at the end of each stage.',
    insights: 'Keep tracking your progress in completed courses and stages. As you complete more tracks, your career options will expand.',
    recommend: 'Manually review learner profiles and skills to identify candidates whose completed courses align with job requirements.',
  };

  return suggestions[type] || 'Please try again later. The AI service is temporarily unavailable.';
};
